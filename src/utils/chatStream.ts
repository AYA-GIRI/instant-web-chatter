type Message = { role: "user" | "assistant"; content: string };

// Режимы работы AI Mentor
export type MentorMode = "verify" | "discuss" | "explain" | "debug" | "general";

// Контекст для AI Mentor
export type MentorContext = {
  mode?: MentorMode;
  taskTitle?: string;
  taskDescription?: string;
  taskDifficulty?: "easy" | "medium" | "hard";
  userAnswer?: string;
  successCriteria?: string[];
  previousFeedback?: string;
};

// Формирует строку контекста из объекта
function buildContextString(context: MentorContext): string {
  const parts: string[] = [];
  
  if (context.taskTitle) {
    parts.push(`Задание: ${context.taskTitle}`);
  }
  
  if (context.taskDescription) {
    parts.push(`Описание задания: ${context.taskDescription}`);
  }
  
  if (context.taskDifficulty) {
    const difficultyLabels = {
      easy: "Начальный (будь более снисходительным)",
      medium: "Средний",
      hard: "Продвинутый (требуй полного владения техникой)"
    };
    parts.push(`Уровень сложности: ${difficultyLabels[context.taskDifficulty]}`);
  }
  
  if (context.userAnswer) {
    parts.push(`Ответ студента:\n${context.userAnswer}`);
  }
  
  if (context.successCriteria && context.successCriteria.length > 0) {
    parts.push(`Критерии успеха:\n- ${context.successCriteria.join('\n- ')}`);
  }
  
  if (context.previousFeedback) {
    parts.push(`Предыдущая обратная связь:\n${context.previousFeedback}`);
  }
  
  return parts.join('\n\n');
}

export async function streamChat({
  messages,
  context,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  context?: MentorContext;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}) {
  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

  // Подготавливаем данные для API
  const requestBody: {
    messages: Message[];
    context?: string;
    mode?: MentorMode;
  } = { messages };

  // Добавляем контекст и режим если переданы
  if (context) {
    if (context.mode) {
      requestBody.mode = context.mode;
    }
    
    const contextString = buildContextString(context);
    if (contextString) {
      requestBody.context = contextString;
    }
  }

  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${resp.status}`);
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // Ignore parse errors for remaining buffer
        }
      }
    }

    onDone();
  } catch (error) {
    onError(error instanceof Error ? error : new Error("Unknown error"));
  }
}
