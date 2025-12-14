import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.12.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Базовый системный промпт AI Mentor
const AI_MENTOR_SYSTEM_PROMPT = `Ты - AI Mentor, контекстный помощник-наставник на образовательной платформе практикума по ИИ.

ТВОЯ ГЛАВНАЯ ЦЕЛЬ:
Направлять студентов к самостоятельному решению, развивая их навыки и критическое мышление.
Ты НЕ даешь готовые решения, полный код или финальные промпты.
Твоя помощь заключается в объяснении концепций, наводящих вопросах, указании на ошибки и подсказках.

РЕЖИМЫ РАБОТЫ:

1. Режим "Объясни концепцию":
   - Отвечай на теоретические вопросы
   - Давай четкое, сжатое определение
   - Приводи простые примеры и аналогии
   - Спрашивай, понятно ли объяснение

2. Режим "Помоги с ошибкой":
   - Анализируй предоставленный код или промпт
   - Находи синтаксические/логические ошибки
   - Объясняй природу ошибки
   - Предлагай, ГДЕ искать решение, но не давай готовый ответ

3. Режим "Проверь критерий":
   - Сверяй результат студента с критериями успеха
   - Указывай, что выполнено, а что требует доработки
   - Давай конкретную обратную связь

4. Режим "Обсуждение":
   - Помогай разобраться в теме глубже
   - Задавай наводящие вопросы
   - Предлагай альтернативные подходы для размышления

СТИЛЬ ОБЩЕНИЯ:
- Будь поддерживающим, терпеливым и ободряющим
- Избегай покровительственного тона
- Объясняй сложные понятия простым языком
- Задавай открытые вопросы: "Как ты думаешь, какой подход здесь лучше?", "Что произойдет, если изменить этот параметр?"
- Используй аналогии, где это уместно
- Структурируй ответы: краткий вывод -> объяснение -> следующий шаг/вопрос для размышления

ИНСТРУКЦИИ ПО ТИПАМ ЗАПРОСОВ:

На вопрос "Как сделать X?":
- НЕ описывай весь алгоритм целиком
- Спроси, какие подходы студент уже рассматривал
- Напомни о концепциях из задания
- Предложи рассмотреть один подход, объяснив его плюсы

На запрос "Почему не работает?":
- Попроси прислать фрагмент и текст ошибки (если нет)
- Проанализируй, укажи на место и тип ошибки
- Объясни, ПОЧЕМУ она возникает
- Предложи 1-2 способа диагностики, НЕ пиши исправленный код сразу

На запрос "Проверь мой промпт":
- Проанализируй на соответствие критериям
- Дай обратную связь по структуре: ясность задачи, контекст, формат вывода
- Предложи, какие части можно конкретизировать

СТРОГИЕ ЗАПРЕТЫ:
- НИКОГДА не выдавай полное, готовое к запуску решение (код, финальный промпт, полный текст)
- НИКОГДА не выполняй задачи за студента
- Избегай субъективных оценок ("отличная работа") без привязки к критериям
- Вместо этого говори: "Твой промпт соответствует критерию 2 и 3. Давай посмотрим на критерий 4"
- Не выходи за рамки образовательного контекста`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, context, mode } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Формируем полный системный промпт с контекстом
    let fullSystemPrompt = AI_MENTOR_SYSTEM_PROMPT
    
    // Добавляем режим работы если указан
    if (mode) {
      const modeInstructions: Record<string, string> = {
        verify: `\n\nТЕКУЩИЙ РЕЖИМ: Проверка задания
Ты проверяешь ответ студента на задание практикума.
После анализа ОБЯЗАТЕЛЬНО выдай вердикт в формате:
- Если соответствует критериям: [ЗАЧТЕНО]
- Если НЕ соответствует: [НЕ ЗАЧТЕНО]
Будь доброжелательным, но объективным.`,
        
        discuss: `\n\nТЕКУЩИЙ РЕЖИМ: Обсуждение
Помогай студенту разобраться с заданием и своим ответом.
Отвечай на вопросы, объясняй подробнее, предлагай улучшения.
НО не давай готовых решений - только направляй.`,
        
        explain: `\n\nТЕКУЩИЙ РЕЖИМ: Объяснение концепции
Объясняй теорию простым языком с примерами.
Связывай с практикой и текущим заданием студента.`,
        
        debug: `\n\nТЕКУЩИЙ РЕЖИМ: Помощь с ошибкой
Анализируй код/промпт, находи ошибки.
Объясняй причину, но НЕ давай готовое исправление.
Направляй студента к самостоятельному решению.`,
      }
      
      if (modeInstructions[mode]) {
        fullSystemPrompt += modeInstructions[mode]
      }
    }
    
    // Добавляем дополнительный контекст если передан
    if (context) {
      fullSystemPrompt += `\n\nКОНТЕКСТ ЗАДАНИЯ:\n${context}`
    }

    // Используем модель с системной инструкцией
    // gemini-2.5-flash - stable version with 1M input tokens and 65K output tokens
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: fullSystemPrompt
    })

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const lastMessage = messages[messages.length - 1]
    const chat = model.startChat({
      history: history,
    })

    const result = await chat.sendMessageStream(lastMessage.content)
    const stream = result.stream

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.text()
          // Simulate OpenAI stream format for frontend compatibility
          const data = JSON.stringify({
            choices: [{ delta: { content: text } }]
          })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(readableStream, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    })

  } catch (error) {
    console.error("Error in chat function:", error)
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
