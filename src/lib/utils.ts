import type { Grade, Question, SubjectId, User } from '../types'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`
}

export function todayKey(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

export function daysAgoKey(n: number) {
  return todayKey(-n)
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', opts ?? { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateTime(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  if (m <= 0) return `${s} detik`
  return `${m} menit ${s.toString().padStart(2, '0')} detik`
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} menit`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} jam ${m} menit` : `${h} jam`
}

export const levelTitles = [
  'Petualang Baru',
  'Penjelajah Ilmu',
  'Pembelajar Hebat',
  'Bintang Kelas',
  'Juara Ceria',
  'Legenda EduKids',
]

export function levelInfo(points: number) {
  const step = 300
  const level = Math.max(1, Math.floor(points / step) + 1)
  const current = points % step
  const percent = Math.round((current / step) * 100)
  const title = levelTitles[Math.min(level - 1, levelTitles.length - 1)]
  return { level, title, current, next: step, percent, toNext: step - current }
}

export function scoreToStars(score: number) {
  if (score >= 90) return 3
  if (score >= 70) return 2
  if (score >= 50) return 1
  return 0
}

export function starsLabel(stars: number) {
  return '⭐'.repeat(Math.max(0, stars)) + '☆'.repeat(Math.max(0, 3 - stars))
}

export function gradeLabel(grade?: Grade | number) {
  return grade ? `Kelas ${grade}` : 'Semua Kelas'
}

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s+*/^%.,:=<>!\-|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function normalizeAnswer(value: string) {
  return normalizeText(value)
    .replace(/[.,]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function isAnswerCorrect(question: Question, answer: string | string[]) {
  if (question.type === 'menjodohkan') {
    const values = Array.isArray(answer) ? answer : String(answer).split('||')
    return question.pairs?.every((pair, i) => normalizeAnswer(values[i] ?? '') === normalizeAnswer(pair[1])) ?? false
  }
  if (question.type === 'susun-kata') {
    const value = Array.isArray(answer) ? answer.join(' ') : answer
    return normalizeAnswer(value) === normalizeAnswer(question.answer)
  }
  const raw = Array.isArray(answer) ? answer.join(' ') : answer
  const accepted = question.answer.split('|').map((a) => normalizeAnswer(a))
  const value = normalizeAnswer(raw)
  if (question.type === 'hitung' || question.type === 'isian') {
    const numeric = Number(value.replace(',', '.'))
    if (!Number.isNaN(numeric) && accepted.some((a) => !Number.isNaN(Number(a)) && Number(a) === numeric)) {
      return true
    }
  }
  return accepted.includes(value)
}

export function shuffle<T>(items: T[], seed?: number): T[] {
  const arr = [...items]
  let s = seed ?? Math.floor(Math.random() * 100000)
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function pickRandom<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, count)
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function percent(value: number, total: number) {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

export function greet(name: string) {
  const hour = new Date().getHours()
  const time = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam'
  return `${time}, ${name}!`
}

export function displayName(user: User) {
  return user.name.split(' ')[0]
}

export const subjectShort: Record<SubjectId, string> = {
  agama: 'Agama',
  pancasila: 'Pancasila',
  bindo: 'B. Indonesia',
  matematika: 'Matematika',
  ipas: 'IPAS',
  inggris: 'B. Inggris',
  seni: 'Seni Budaya',
  pjok: 'PJOK',
  mulok: 'Muatan Lokal',
}

export function daysBetween(a: string, b: string) {
  const d1 = new Date(a + 'T00:00:00')
  const d2 = new Date(b + 'T00:00:00')
  return Math.round((d2.getTime() - d1.getTime()) / 86400000)
}

export function studyStreak(dates: string[]) {
  const unique = [...new Set(dates)].sort().reverse()
  if (!unique.length) return 0
  const today = todayKey()
  const yesterday = daysAgoKey(1)
  if (unique[0] !== today && unique[0] !== yesterday) return 0
  let streak = 1
  let cursor = unique[0]
  for (let i = 1; i < unique.length; i++) {
    const expected = new Date(cursor + 'T00:00:00')
    expected.setDate(expected.getDate() - 1)
    const key = expected.toISOString().slice(0, 10)
    if (unique[i] === key) {
      streak++
      cursor = key
    } else if (unique[i] !== cursor) {
      break
    }
  }
  return streak
}

export function downloadFile(filename: string, content: string, type = 'application/json') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text
}
