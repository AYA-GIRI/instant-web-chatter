import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Copy,
  Check,
  Sparkles,
  Loader2,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { streamChat } from "@/utils/chatStream";

// Тип сообщения в диалоге обсуждения
type DialogMessage = {
  role: "user" | "assistant";
  content: string;
};

// Типы для заданий практикума
type PromptTask = {
  id: string;
  title: string;
  description: string;
  example: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
};

// Результат проверки
type VerificationResult = {
  passed: boolean;
  feedback: string;
  suggestions: string[];
};

// Задания практикума по промптам
const promptTasks: PromptTask[] = [
  {
    id: "1",
    title: "Базовый промпт",
    description: "Напишите промпт, который попросит ChatGPT объяснить концепцию машинного обучения простыми словами для школьника.",
    example: "Объясни [тема] простыми словами, как будто рассказываешь [аудитория]. Используй [формат/аналогии].",
    hint: "Укажите целевую аудиторию и желаемый формат ответа",
    difficulty: "easy",
  },
  {
    id: "2",
    title: "Промпт с контекстом",
    description: "Создайте промпт для генерации маркетингового текста. Включите роль, контекст и конкретные требования к результату.",
    example: "Ты - [роль]. Твоя задача - [задача]. Контекст: [контекст]. Требования: [список требований].",
    hint: "Определите роль AI, дайте контекст задачи и чёткие критерии успеха",
    difficulty: "medium",
  },
  {
    id: "3",
    title: "Chain-of-Thought промпт",
    description: "Напишите промпт, который заставит модель рассуждать пошагово при решении логической задачи.",
    example: "Реши задачу пошагово. Сначала [шаг 1], затем [шаг 2]. Объясни своё рассуждение на каждом этапе.",
    hint: "Используйте фразы типа 'давай подумаем пошагово' или 'объясни свои рассуждения'",
    difficulty: "medium",
  },
  {
    id: "4",
    title: "Few-shot промпт",
    description: "Создайте промпт с примерами (few-shot learning) для классификации отзывов на позитивные и негативные.",
    example: "Классифицируй отзыв. Примеры:\nОтзыв: 'Отличный товар!' -> Позитивный\nОтзыв: 'Ужасное качество' -> Негативный\nОтзыв: [новый отзыв] -> ?",
    hint: "Дайте 2-3 примера с ответами перед основным заданием",
    difficulty: "hard",
  },
];

const PromptPracticum = () => {
  const { toast } = useToast();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userPrompts, setUserPrompts] = useState<Record<string, string>>({});
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  
  // Состояния для проверки
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  
  // Состояния для обсуждения
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [discussionMessages, setDiscussionMessages] = useState<DialogMessage[]>([]);
  const [discussionInput, setDiscussionInput] = useState("");
  const [isDiscussionLoading, setIsDiscussionLoading] = useState(false);
  const discussionEndRef = useRef<HTMLDivElement>(null);

  const currentTask = promptTasks[currentTaskIndex];
  
  // Прокрутка к последнему сообщению в обсуждении
  useEffect(() => {
    discussionEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [discussionMessages]);
  const userPrompt = userPrompts[currentTask.id] || "";

  // Обработчик изменения промпта
  const handlePromptChange = (value: string) => {
    setUserPrompts((prev) => ({
      ...prev,
      [currentTask.id]: value,
    }));
  };

  // Парсинг ответа AI для извлечения вердикта
  const parseVerificationResult = (response: string): VerificationResult => {
    // Ищем вердикт в ответе
    const passPatterns = [
      /\[VERDICT:\s*PASS\]/i,
      /\[ЗАЧТЕНО\]/i,
      /ВЕРДИКТ:\s*ЗАЧТЕНО/i,
      /---\s*ЗАЧТЕНО\s*---/i,
    ];
    
    const failPatterns = [
      /\[VERDICT:\s*FAIL\]/i,
      /\[НЕ ЗАЧТЕНО\]/i,
      /ВЕРДИКТ:\s*НЕ ЗАЧТЕНО/i,
      /---\s*НЕ ЗАЧТЕНО\s*---/i,
    ];

    const passed = passPatterns.some(pattern => pattern.test(response));
    const failed = failPatterns.some(pattern => pattern.test(response));

    // Извлекаем рекомендации (строки начинающиеся с - или *)
    const suggestions: string[] = [];
    const suggestionMatches = response.match(/^[\-\*]\s+.+$/gm);
    if (suggestionMatches) {
      suggestions.push(...suggestionMatches.slice(0, 3).map(s => s.replace(/^[\-\*]\s+/, '')));
    }

    // Очищаем ответ от маркеров вердикта для отображения
    let feedback = response
      .replace(/\[VERDICT:\s*(PASS|FAIL)\]/gi, '')
      .replace(/\[(ЗАЧТЕНО|НЕ ЗАЧТЕНО)\]/gi, '')
      .replace(/ВЕРДИКТ:\s*(ЗАЧТЕНО|НЕ ЗАЧТЕНО)/gi, '')
      .replace(/---\s*(ЗАЧТЕНО|НЕ ЗАЧТЕНО)\s*---/gi, '')
      .trim();

    return {
      passed: passed && !failed,
      feedback,
      suggestions,
    };
  };

  // Отправить на проверку AI
  const handleSubmitForVerification = async () => {
    if (userPrompt.trim().length < 20) {
      toast({
        title: "Промпт слишком короткий",
        description: "Напишите более развёрнутый промпт (минимум 20 символов)",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setAiResponse("");
    setVerificationResult(null);
    setShowResultDialog(true);

    // Формируем системный промпт для проверки
    const verificationPrompt = `Ты - эксперт по промпт-инжинирингу. Проверь ответ студента на задание практикума.

ЗАДАНИЕ: ${currentTask.title}
ОПИСАНИЕ: ${currentTask.description}
УРОВЕНЬ СЛОЖНОСТИ: ${currentTask.difficulty === 'easy' ? 'Начальный' : currentTask.difficulty === 'medium' ? 'Средний' : 'Продвинутый'}

ОТВЕТ СТУДЕНТА:
${userPrompt}

КРИТЕРИИ ОЦЕНКИ:
1. Промпт должен соответствовать заданию
2. Промпт должен быть чётким и понятным
3. Промпт должен использовать технику, указанную в задании
4. Для начального уровня - достаточно базового соответствия
5. Для среднего уровня - нужна структура и контекст
6. Для продвинутого уровня - нужно полное владение техникой

ИНСТРУКЦИИ:
1. Кратко проанализируй промпт (2-3 предложения)
2. Укажи что хорошо (1-2 пункта)
3. Укажи что можно улучшить (1-2 пункта, если есть)
4. В конце ОБЯЗАТЕЛЬНО напиши вердикт в формате:

Если промпт соответствует заданию: [ЗАЧТЕНО]
Если промпт НЕ соответствует заданию: [НЕ ЗАЧТЕНО]

Будь доброжелательным, но объективным. Для начального уровня будь более снисходительным.`;

    let fullResponse = "";

    try {
      await streamChat({
        messages: [{ role: "user", content: verificationPrompt }],
        onDelta: (chunk) => {
          fullResponse += chunk;
          setAiResponse(fullResponse);
        },
        onDone: () => {
          setIsVerifying(false);
          const result = parseVerificationResult(fullResponse);
          setVerificationResult(result);
          
          if (result.passed) {
            // Задание зачтено
            setCompletedTasks((prev) => new Set([...prev, currentTask.id]));
          }
        },
        onError: (error) => {
          console.error("Verification error:", error);
          setIsVerifying(false);
          toast({
            title: "Ошибка проверки",
            description: "Не удалось проверить задание. Попробуйте ещё раз.",
            variant: "destructive",
          });
          setShowResultDialog(false);
        },
      });
    } catch (error) {
      console.error(error);
      setIsVerifying(false);
      setShowResultDialog(false);
    }
  };

  // Закрыть диалог и перейти к следующему заданию (если зачтено)
  const handleCloseDialog = () => {
    setShowResultDialog(false);
    setShowDiscussion(false);
    setDiscussionMessages([]);
    setDiscussionInput("");
    if (verificationResult?.passed && currentTaskIndex < promptTasks.length - 1) {
      setTimeout(() => {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setShowHint(false);
      }, 300);
    }
  };

  // Начать обсуждение - инициализировать контекст
  const handleStartDiscussion = () => {
    // Инициализируем историю с контекстом задания и ответа
    const initialMessages: DialogMessage[] = [
      {
        role: "user",
        content: `Контекст для обсуждения:

ЗАДАНИЕ: ${currentTask.title}
ОПИСАНИЕ: ${currentTask.description}

МОЙ ОТВЕТ (промпт):
${userPrompt}

РЕЗУЛЬТАТ ПРОВЕРКИ:
${aiResponse}

---
Я хочу обсудить это задание и свой ответ.`,
      },
      {
        role: "assistant",
        content: "Отлично! Я готов обсудить ваш промпт и ответить на вопросы. Что именно вас интересует? Могу объяснить подробнее замечания, предложить альтернативные варианты или помочь улучшить промпт.",
      },
    ];
    setDiscussionMessages(initialMessages);
    setShowDiscussion(true);
  };

  // Отправить сообщение в обсуждении
  const handleSendDiscussionMessage = async () => {
    if (!discussionInput.trim() || isDiscussionLoading) return;

    const userMessage = discussionInput.trim();
    setDiscussionInput("");
    
    // Добавляем сообщение пользователя
    const newMessages: DialogMessage[] = [
      ...discussionMessages,
      { role: "user", content: userMessage },
    ];
    setDiscussionMessages(newMessages);
    setIsDiscussionLoading(true);

    let assistantContent = "";

    try {
      // Формируем системный контекст
      const systemContext = `Ты - эксперт по промпт-инжинирингу. Ты помогаешь студенту разобраться с заданием практикума.

Контекст:
- Задание: ${currentTask.title}
- Описание: ${currentTask.description}
- Ответ студента: ${userPrompt}
- Результат проверки: ${verificationResult?.passed ? "Зачтено" : "Не зачтено"}

Отвечай кратко и по делу. Помогай улучшить понимание промпт-инжиниринга.`;

      const messagesForApi = [
        { role: "user" as const, content: systemContext },
        ...newMessages.map(m => ({ role: m.role, content: m.content })),
      ];

      await streamChat({
        messages: messagesForApi,
        onDelta: (chunk) => {
          assistantContent += chunk;
          setDiscussionMessages([
            ...newMessages,
            { role: "assistant", content: assistantContent },
          ]);
        },
        onDone: () => {
          setIsDiscussionLoading(false);
        },
        onError: (error) => {
          console.error("Discussion error:", error);
          setIsDiscussionLoading(false);
          toast({
            title: "Ошибка",
            description: "Не удалось отправить сообщение",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error(error);
      setIsDiscussionLoading(false);
    }
  };

  // Обработка Enter в поле обсуждения
  const handleDiscussionKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendDiscussionMessage();
    }
  };

  // Копирование примера
  const handleCopyExample = () => {
    navigator.clipboard.writeText(currentTask.example);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2000);
  };

  // Получение цвета сложности
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/10 text-green-600 border-green-500/30";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "hard":
        return "bg-red-500/10 text-red-600 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Легко";
      case "medium":
        return "Средне";
      case "hard":
        return "Сложно";
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Навигация назад */}
          <Link
            to="/practicum"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к практикумам
          </Link>

          {/* Заголовок */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex h-16 w-16 rounded-2xl bg-primary items-center justify-center shadow-lg">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
              Практикум: Написание промптов
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Научитесь создавать эффективные промпты для ChatGPT и других LLM
            </p>
          </div>

          {/* Прогресс */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Задание {currentTaskIndex + 1} из {promptTasks.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Зачтено: {completedTasks.size} из {promptTasks.length}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(completedTasks.size / promptTasks.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Навигация по заданиям */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {promptTasks.map((task, index) => (
              <button
                key={task.id}
                onClick={() => {
                  setCurrentTaskIndex(index);
                  setShowHint(false);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all ${
                  currentTaskIndex === index
                    ? "bg-primary text-primary-foreground border-primary"
                    : completedTasks.has(task.id)
                    ? "bg-green-500/10 text-green-600 border-green-500/30"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {completedTasks.has(task.id) && <CheckCircle2 className="h-4 w-4" />}
                  {index + 1}. {task.title}
                </span>
              </button>
            ))}
          </div>

          {/* Карточка задания */}
          <Card className="glass-panel border-white/40 mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-heading flex items-center gap-3">
                    {currentTask.title}
                    {completedTasks.has(currentTask.id) && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </CardTitle>
                  <div className="mt-2">
                    <Badge className={getDifficultyColor(currentTask.difficulty)}>
                      {getDifficultyLabel(currentTask.difficulty)}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-base mt-4">
                {currentTask.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Пример структуры промпта */}
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Пример структуры:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyExample}
                    className="h-8 px-2"
                  >
                    {copiedExample ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <code className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {currentTask.example}
                </code>
              </div>

              {/* Подсказка */}
              {showHint && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 animate-in fade-in">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      {currentTask.hint}
                    </p>
                  </div>
                </div>
              )}

              {/* Поле для ввода промпта */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Ваш промпт:
                </label>
                <Textarea
                  placeholder="Напишите свой промпт здесь..."
                  value={userPrompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  className="min-h-[150px] resize-none"
                  disabled={isVerifying}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {userPrompt.length} символов (минимум 20)
                  </span>
                  {!showHint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-xs text-primary hover:underline"
                    >
                      Показать подсказку
                    </button>
                  )}
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex gap-4">
                <Button
                  onClick={handleSubmitForVerification}
                  className="flex-1 bg-accent hover:bg-accent/90"
                  disabled={isVerifying || completedTasks.has(currentTask.id)}
                >
                  {completedTasks.has(currentTask.id) ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Зачтено
                    </>
                  ) : isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Проверка...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Отправить на проверку
                    </>
                  )}
                </Button>
                {currentTaskIndex < promptTasks.length - 1 && !completedTasks.has(currentTask.id) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentTaskIndex(currentTaskIndex + 1);
                      setShowHint(false);
                    }}
                    disabled={isVerifying}
                  >
                    Пропустить
                  </Button>
                )}
                {completedTasks.has(currentTask.id) && currentTaskIndex < promptTasks.length - 1 && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentTaskIndex(currentTaskIndex + 1);
                      setShowHint(false);
                    }}
                  >
                    Далее
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Информация об успешном завершении */}
          {completedTasks.size === promptTasks.length && (
            <Card className="bg-green-500/10 border-green-500/30">
              <CardContent className="py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Поздравляем! Все задания зачтены!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Вы успешно освоили основы создания эффективных промптов
                </p>
                <Link to="/practicum">
                  <Button>Вернуться к практикумам</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Диалог результата проверки */}
      <Dialog open={showResultDialog} onOpenChange={(open) => {
        if (!open) {
          setShowDiscussion(false);
          setDiscussionMessages([]);
        }
        setShowResultDialog(open);
      }}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              {isVerifying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  Проверка задания...
                </>
              ) : showDiscussion ? (
                <>
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Обсуждение задания
                </>
              ) : verificationResult?.passed ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Задание зачтено!
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Требуется доработка
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {currentTask.title}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
            {/* Режим обсуждения */}
            {showDiscussion ? (
              <div className="space-y-4">
                {/* Сообщения обсуждения */}
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                  {discussionMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-accent text-white"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isDiscussionLoading && (
                    <div className="flex justify-start">
                      <div className="bg-secondary rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={discussionEndRef} />
                </div>

                {/* Поле ввода для обсуждения */}
                <div className="flex gap-2 pt-2 border-t">
                  <Input
                    value={discussionInput}
                    onChange={(e) => setDiscussionInput(e.target.value)}
                    onKeyPress={handleDiscussionKeyPress}
                    placeholder="Задайте вопрос..."
                    disabled={isDiscussionLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendDiscussionMessage}
                    size="icon"
                    disabled={isDiscussionLoading || !discussionInput.trim()}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Кнопка выхода из обсуждения */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowDiscussion(false)}
                    className="flex-1"
                  >
                    Назад к результату
                  </Button>
                  {verificationResult?.passed && (
                    <Button onClick={handleCloseDialog} className="flex-1">
                      {currentTaskIndex < promptTasks.length - 1 ? "Далее" : "Завершить"}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Режим просмотра результата */
              <div className="space-y-4">
                {/* Ответ AI */}
                <div className="bg-secondary/50 rounded-lg p-4 max-h-[35vh] overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap">
                    {aiResponse || "Анализирую ваш промпт..."}
                  </p>
                </div>

                {/* Результат после завершения проверки */}
                {!isVerifying && verificationResult && (
                  <div className={`rounded-lg p-4 ${
                    verificationResult.passed 
                      ? "bg-green-500/10 border border-green-500/30" 
                      : "bg-red-500/10 border border-red-500/30"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {verificationResult.passed ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-600">Зачтено</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="font-medium text-red-600">Не зачтено - попробуйте ещё раз</span>
                        </>
                      )}
                    </div>
                    {!verificationResult.passed && (
                      <p className="text-sm text-muted-foreground">
                        Доработайте промпт с учётом замечаний и отправьте на проверку снова.
                      </p>
                    )}
                  </div>
                )}

                {/* Кнопки */}
                {!isVerifying && (
                  <div className="flex gap-3 flex-wrap">
                    {verificationResult?.passed ? (
                      <>
                        <Button onClick={handleCloseDialog} className="flex-1">
                          {currentTaskIndex < promptTasks.length - 1 ? "К следующему заданию" : "Завершить"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleStartDiscussion}
                          className="flex-1"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Обсудить
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setShowResultDialog(false)} className="flex-1">
                          Доработать ответ
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleStartDiscussion}
                          className="flex-1"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Обсудить
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptPracticum;
