import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.12.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    // Попробуем получить список моделей через API
    // Gemini API не имеет прямого endpoint для списка моделей,
    // но мы можем попробовать использовать известные модели
    
    const knownModels = [
      'gemini-2.0-flash',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-pro',
      'gemini-pro-vision',
    ]

    const availableModels: any[] = []

    // Проверяем каждую модель
    for (const modelName of knownModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        // Пробуем сделать простой запрос для проверки доступности
        const result = await model.generateContent('test')
        availableModels.push({
          id: modelName,
          available: true,
        })
      } catch (error: any) {
        // Модель недоступна или ошибка
        if (!error.message?.includes('not found') && !error.message?.includes('not available')) {
          availableModels.push({
            id: modelName,
            available: false,
            error: error.message,
          })
        }
      }
    }

    return new Response(
      JSON.stringify({
        models: availableModels,
        note: 'Это список известных моделей Gemini. Проверьте актуальный список на https://ai.google.dev/models',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error("Error listing models:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

