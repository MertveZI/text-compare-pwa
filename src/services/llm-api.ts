import type { ComparisonResult } from '@/types'

const API_URL = import.meta.env.VITE_LLM_API_URL || '/v1'
const MODEL = import.meta.env.VITE_LLM_MODEL || 'qwen3.8-27b-turbo-fable-cold-fusion-735-882-heretic-uncensored-neo-coder-max-mtp'

function buildPrompt(text1: string, text2: string): string {
  return `Сравни два текста и верни результат в JSON формате: {"summary": "...", "similarity": 0-100, "differences": ["...", "..."]}.

Текст 1:
${text1}

Текст 2:
${text2}

Верни только JSON, без дополнительного текста.`
}

function parseResponse(content: string): ComparisonResult {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        summary: parsed.summary || 'Нет сводки',
        similarity: typeof parsed.similarity === 'number' ? parsed.similarity : 0,
        differences: parsed.differences || []
      }
    }
  } catch (e) {
    // If JSON parsing fails, return raw content as summary
  }
  return {
    summary: content,
    similarity: 0,
    differences: []
  }
}

export async function compare(text1: string, text2: string): Promise<ComparisonResult> {
  const response = await fetch(`${API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'Ты — эксперт по сравнению текстов. Сравнивай тексты по смыслу, структуре и содержанию.'
        },
        {
          role: 'user',
          content: buildPrompt(text1, text2)
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || 'Нет ответа от модели'
  return parseResponse(content)
}
