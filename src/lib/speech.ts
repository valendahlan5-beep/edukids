let currentUtterance: SpeechSynthesisUtterance | null = null

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function pickVoice() {
  if (!speechSupported()) return undefined
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((v) => v.lang?.toLowerCase() === 'id-id') ??
    voices.find((v) => v.lang?.toLowerCase().startsWith('id')) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith('ms')) ??
    undefined
  )
}

export interface SpeakOptions {
  rate?: number
  pitch?: number
  onEnd?: () => void
  onStart?: () => void
}

export function speak(text: string, options: SpeakOptions = {}) {
  if (!speechSupported()) return false
  window.speechSynthesis.cancel()
  const clean = text
    .replace(/\*\*/g, '')
    .replace(/[#*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!clean) return false
  const utterance = new SpeechSynthesisUtterance(clean)
  utterance.lang = 'id-ID'
  utterance.rate = options.rate ?? 0.92
  utterance.pitch = options.pitch ?? 1.05
  const voice = pickVoice()
  if (voice) utterance.voice = voice
  utterance.onstart = () => options.onStart?.()
  utterance.onend = () => {
    currentUtterance = null
    options.onEnd?.()
  }
  utterance.onerror = () => {
    currentUtterance = null
    options.onEnd?.()
  }
  currentUtterance = utterance
  window.speechSynthesis.speak(utterance)
  return true
}

export function stopSpeaking() {
  if (!speechSupported()) return
  window.speechSynthesis.cancel()
  currentUtterance = null
}

export function isSpeaking() {
  return Boolean(currentUtterance) && speechSupported() && window.speechSynthesis.speaking
}

export function buildChapterNarration(chapter: {
  title: string
  description: string
  objectives: string[]
  sections: { heading: string; paragraphs: string[]; bullets?: string[]; example?: string }[]
  summary: string[]
}) {
  const parts: string[] = []
  parts.push(`Materi ${chapter.title}. ${chapter.description}`)
  parts.push(`Tujuan belajar kita: ${chapter.objectives.join('. ')}.`)
  chapter.sections.forEach((section) => {
    parts.push(section.heading)
    parts.push(section.paragraphs.join(' '))
    if (section.bullets?.length) parts.push(section.bullets.join('. '))
    if (section.example) parts.push(`Contoh: ${section.example}`)
  })
  parts.push(`Rangkuman. ${chapter.summary.join('. ')}`)
  return parts.join('. ')
}
