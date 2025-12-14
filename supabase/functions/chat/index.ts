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
    const { messages } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    // Using gemini-2.5-flash - stable version with 1M input tokens and 65K output tokens
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Convert messages to Gemini format
    // Gemini expects history + last message. 
    // Simplified mapping:
    // user -> user
    // assistant -> model

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
          // data: {"choices":[{"delta":{"content":"..."}}]}
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
