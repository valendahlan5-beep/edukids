import type { AIEntry, Chapter, Database, Grade, Question, User } from '../types'
import { normalizeText, shuffle } from './utils'

interface AIResult {
  text: string
  suggestions: string[]
}

const unsafePatterns = [
  /\b(bunuh|membunuh|bunuh diri|senjata|narkoba|miras|alkohol|porno|seks|telanjang|kekerasan|sadis|darah|perang)\b/i,
  /\b(cara membuat bom|racun|mencuri|menipu|meretas|hack)\b/i,
]

const mathWords: [RegExp, string][] = [
  [/\bditambah\b|\btambah\b|\bplus\b/g, '+'],
  [/\bdikurangi\b|\bkurang\b|\bmin\b/g, '-'],
  [/\bdikali\b|\bkali\b|\bper\b/g, '*'],
  [/\bdibagi\b|\bbagi\b/g, '/'],
  [/\bpangkat\b/g, '^'],
]

function safeEvaluate(expression: string): number | null {
  const tokens = expression.match(/\d+(?:\.\d+)?|[+\-*/^%()]/g)
  if (!tokens) return null
  let pos = 0
  const peek = () => tokens[pos]
  const consume = () => tokens[pos++]
  const parseExpression = (): number => {
    let left = parseTerm()
    while (peek() === '+' || peek() === '-') {
      const op = consume()
      const right = parseTerm()
      left = op === '+' ? left + right : left - right
    }
    return left
  }
  const parseTerm = (): number => {
    let left = parseFactor()
    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const op = consume()
      const right = parseFactor()
      left = op === '*' ? left * right : op === '/' ? left / right : left % right
    }
    return left
  }
  const parseFactor = (): number => {
    if (peek() === '-') {
      consume()
      return -parseFactor()
    }
    if (peek() === '+') {
      consume()
      return parseFactor()
    }
    if (peek() === '(') {
      consume()
      const value = parseExpression()
      if (peek() === ')') consume()
      return value
    }
    const token = consume()
    return Number(token)
  }
  try {
    const result = parseExpression()
    if (pos !== tokens.length || !Number.isFinite(result)) return null
    return result
  } catch {
    return null
  }
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value)
  return String(Math.round(value * 10000) / 10000).replace('.', ',')
}

function findMath(question: string): string | null {
  let text = question.toLowerCase().replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, '.')
  mathWords.forEach(([pattern, symbol]) => {
    text = text.replace(pattern, symbol)
  })
  const candidates = text.match(/[\d(][\d+\-*/^%().\s]*\d/g)
  if (!candidates) return null
  const candidate = candidates
    .map((c) => c.trim())
    .filter((c) => /[+\-*/^%]/.test(c))
    .sort((a, b) => b.length - a.length)[0]
  return candidate ?? null
}

function explainMath(expression: string, result: number) {
  const compact = expression.replace(/\s+/g, ' ')
  return `Aku bantu hitung, ya! 🧮\n\nSoal: ${compact}\nHasilnya: **${formatNumber(result)}**\n\nLangkahnya:\n• Kerjakan operasi di dalam tanda kurung terlebih dahulu.\n• Setelah itu, selesaikan perkalian atau pembagian dari kiri ke kanan.\n• Terakhir, jumlahkan atau kurangkan.\n\nCoba hitung sekali lagi dengan caramu sendiri supaya makin paham. Kalau ada soal lain, tulis saja! ✨`
}

function practiceQuestions(questions: Question[], grade: Grade, subjectName?: string) {
  const pool = shuffle(questions.filter((q) => q.grade === grade && (q.type === 'pg' || q.type === 'cerita')))
  const chosen = pool.slice(0, 3)
  if (!chosen.length) {
    return `Belum ada soal untuk kelas ${grade}. Coba pilih pelajaran lain, ya.`
  }
  const lines = chosen.map((q, i) => {
    const options = q.options?.map((o, idx) => `${String.fromCharCode(65 + idx)}. ${o}`).join('\n') ?? ''
    return `${i + 1}. ${q.text}\n${options}`
  })
  const keys = chosen
    .map((q, i) => `${i + 1}. Jawaban: **${q.answer}** — ${q.explanation}`)
    .join('\n')
  return `Siap! Ini 3 soal latihan${subjectName ? ` ${subjectName}` : ''} untuk kelas ${grade}. Coba kerjakan dulu tanpa melihat kunci, ya! 💪\n\n${lines.join('\n\n')}\n\n---\n**Kunci dan pembahasan:**\n${keys}\n\nKalau ada yang belum kamu pahami, tanya bagian mana yang sulit. Aku jelaskan langkah-langkahnya. 😊`
}

function searchChapters(db: Database, text: string, grade: Grade): { chapter: Chapter; score: number }[] {
  const words = normalizeText(text)
    .split(' ')
    .filter((w) => w.length > 3)
  if (!words.length) return []
  return db.chapters
    .map((chapter) => {
      const haystack = normalizeText(
        `${chapter.title} ${chapter.description} ${chapter.objectives.join(' ')} ${chapter.sections
          .map((s) => `${s.heading} ${s.paragraphs.join(' ')}`)
          .join(' ')} ${chapter.summary.join(' ')}`,
      )
      let score = 0
      words.forEach((word) => {
        if (haystack.includes(word)) score += 2
        if (normalizeText(chapter.title).includes(word)) score += 4
      })
      if (chapter.grade === grade) score += 1
      return { chapter, score }
    })
    .filter((item) => item.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function entryMatch(entry: AIEntry, normalized: string) {
  return entry.keywords.reduce((score, keyword) => {
    if (normalized.includes(normalizeText(keyword))) return score + 3
    const parts = normalizeText(keyword).split(' ')
    if (parts.every((p) => normalized.includes(p))) return score + 2
    return score
  }, 0)
}

function chapterAnswer(chapter: Chapter) {
  const firstSection = chapter.sections[0]
  const secondSection = chapter.sections[1]
  const points = chapter.summary.slice(0, 3).map((s) => `• ${s}`).join('\n')
  return `Tentu! Kita belajar tentang **${chapter.title}** (${chapter.subjectId === 'matematika' ? 'Matematika' : chapter.subjectId === 'ipas' ? 'IPAS' : chapter.subjectId === 'bindo' ? 'Bahasa Indonesia' : 'pelajaran ini'}), ya. 📖\n\n${firstSection ? firstSection.paragraphs.join(' ') : chapter.description}\n\n${secondSection ? `**${secondSection.heading}**\n${secondSection.paragraphs.join(' ')}` : ''}\n\n**Yang perlu diingat:**\n${points}\n\n${firstSection?.example ? `Contoh: ${firstSection.example}\n\n` : ''}Mau aku buatkan latihan soal tentang ${chapter.title.toLowerCase()}? Atau kamu bisa membuka materinya di menu Pelajaran. 😊`
}

export function answerAI(question: string, db: Database, user: User): AIResult {
  const q = question.trim()
  const normalized = normalizeText(q)
  const grade = user.grade ?? 3
  const fallbackSuggestions = ['Jelaskan materi kelas ' + grade, 'Buatkan 3 soal latihan', 'Bantu aku berhitung', 'Rekomendasi materi untukku']

  if (!q) {
    return {
      text: 'Hai! Tulis pertanyaanmu, ya. Aku bisa membantu menjelaskan materi, membuat latihan soal, atau menghitung bersama. 😊',
      suggestions: fallbackSuggestions,
    }
  }

  if (unsafePatterns.some((pattern) => pattern.test(q))) {
    return {
      text: 'Aku hanya bisa membantu pelajaran sekolah, ya. Kalau ada hal yang membuatmu sedih atau tidak nyaman, ceritakan kepada orang tua atau gurumu. Mereka akan membantumu. 🤗\n\nSekarang, mau belajar apa? Aku siap menemani.',
      suggestions: ['Aku mau belajar matematika', 'Buatkan soal latihan', 'Ceritakan tips belajar'],
    }
  }

  if (/^(hai|halo|hello|hi|selamat pagi|selamat siang|selamat sore|selamat malam|assalamualaikum|pagi|siang|sore|malam)\b/.test(normalized)) {
    return {
      text: `Hai, ${user.name.split(' ')[0]}! 👋 Aku Kiki, AI Guru Pintar EduKids. Aku senang bisa belajar bersamamu. Kamu mau bertanya tentang pelajaran apa hari ini? Kamu juga bisa minta aku membuat soal latihan atau menjelaskan langkah mengerjakan soal.`,
      suggestions: fallbackSuggestions,
    }
  }

  if (/(siapa kamu|kamu siapa|namamu|apa itu edukids|bisa apa)/.test(normalized)) {
    return {
      text: `Aku **Kiki**, AI Guru Pintar di EduKids. 🤖✨\n\nAku bisa:\n• Menjelaskan materi pelajaran dengan bahasa sederhana\n• Memberi contoh soal dan langkah mengerjakannya\n• Membuat latihan soal sesuai kelasmu\n• Membantu berhitung\n• Memberi rekomendasi materi\n\nAku tidak akan memberi jawaban tanpa penjelasan, karena kamu perlu memahami caranya. Yuk, mulai belajar!`,
      suggestions: fallbackSuggestions,
    }
  }

  const expression = findMath(q)
  if (expression && /[+\-*/^%]/.test(expression)) {
    const result = safeEvaluate(expression)
    if (result !== null) {
      return { text: explainMath(expression, result), suggestions: ['Beri soal serupa', 'Jelaskan cara menghitung pecahan', 'Buatkan latihan berhitung'] }
    }
  }

  if (/(buatkan|buat|minta|kasih).*(soal|latihan)|latihan soal|contoh soal|soal kelas|kuis/.test(normalized)) {
    const subject = db.subjects.find((s) => normalized.includes(normalizeText(s.short)) || normalized.includes(normalizeText(s.name)))
    const subjectNames: Record<string, string> = {
      matematika: 'Matematika',
      bindo: 'Bahasa Indonesia',
      ipas: 'IPAS',
      inggris: 'Bahasa Inggris',
      pancasila: 'Pendidikan Pancasila',
      agama: 'Agama',
      seni: 'Seni Budaya',
      pjok: 'PJOK',
      mulok: 'Muatan Lokal',
    }
    return {
      text: practiceQuestions(db.questions, grade, subject ? subjectNames[subject.id] : undefined),
      suggestions: ['Jelaskan jawaban nomor 1', 'Buatkan soal lagi', 'Materi apa yang harus aku pelajari?'],
    }
  }

  if (/(rekomendasi|saran|materi apa|belajar apa|selanjutnya)/.test(normalized)) {
    const done = new Set(db.progress.filter((p) => p.userId === user.id && p.completed).map((p) => p.chapterId))
    const next = db.chapters
      .filter((c) => c.grade === grade && !done.has(c.id))
      .sort((a, b) => a.order - b.order)
      .slice(0, 3)
    if (!next.length) {
      return {
        text: 'Wah, kamu sudah menyelesaikan semua materi untuk kelasmu! 🎉 Coba ulangi kuis atau ujian untuk menguatkan ingatan, atau mainkan game edukasi. Kamu luar biasa!',
        suggestions: ['Buatkan soal ujian', 'Buka game edukasi', 'Lihat prestasiku'],
      }
    }
    return {
      text: `Aku punya rekomendasi materi untukmu, ${user.name.split(' ')[0]}! 📚\n\n${next
        .map((c, i) => `${i + 1}. **${c.title}** — ${c.description} (${c.minutes} menit)`)
        .join('\n')}\n\nMulai dari yang paling kamu penasaran, ya. Setelah membaca, kerjakan kuis baba untuk menguji pemahamanmu. Aku bisa bantu kalau ada bagian yang sulit.`,
      suggestions: [`Jelaskan ${next[0].title}`, 'Buatkan 3 soal latihan', 'Atur jadwal belajarku'],
    }
  }

  const ranked = db.aiKnowledge
    .map((entry) => ({ entry, score: entryMatch(entry, normalized) }))
    .sort((a, b) => b.score - a.score)
  if (ranked[0]?.score >= 3) {
    const entry = ranked[0].entry
    return {
      text: `**${entry.title}**\n\n${entry.answer}\n\n${entry.example ? `Contoh: ${entry.example}\n\n` : ''}Mau aku jelaskan lebih lanjut atau buatkan soal latihan tentang ${entry.title.toLowerCase()}? 😊`,
      suggestions: [`Buatkan soal ${entry.title}`, 'Jelaskan lebih sederhana', 'Materi terkait apa lagi?'],
    }
  }

  const chapters = searchChapters(db, q, grade)
  if (chapters.length) {
    const match = chapters[0].chapter
    return {
      text: chapterAnswer(match),
      suggestions: [`Buatkan soal ${match.title}`, 'Jelaskan dengan lebih sederhana', 'Lihat materi lain'],
    }
  }

  if (/(terima kasih|makasih|thanks|thank you)/.test(normalized)) {
    return {
      text: 'Sama-sama! 😊 Senang bisa membantu. Terus semangat belajar, ya. Setiap usaha kecilmu hari ini membuatmu makin hebat besok. Sampai jumpa di pelajaran berikutnya!',
      suggestions: fallbackSuggestions,
    }
  }

  return {
    text: `Hmm, aku belum menemukan penjelasan yang pas untuk pertanyaan itu. 🤔 Coba tulis lebih spesifik, misalnya nama pelajaran atau topiknya, ya. Contoh: "jelaskan pecahan" atau "apa itu fotosintesis".\n\nAku juga bisa membuat latihan soal sesuai kelas ${grade}, membantu berhitung, atau memberi rekomendasi materi.`,
    suggestions: fallbackSuggestions,
  }
}
