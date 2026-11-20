export type Role = 'siswa' | 'orangtua' | 'guru' | 'admin'
export type Grade = 1 | 2 | 3 | 4 | 5 | 6
export type Semester = 1 | 2

export type SubjectId =
  | 'agama'
  | 'pancasila'
  | 'bindo'
  | 'matematika'
  | 'ipas'
  | 'inggris'
  | 'seni'
  | 'pjok'
  | 'mulok'

export type QuestionType =
  | 'pg'
  | 'benar-salah'
  | 'isian'
  | 'menjodohkan'
  | 'susun-kata'
  | 'hitung'
  | 'cerita'

export interface Subject {
  id: SubjectId
  name: string
  short: string
  emoji: string
  tagline: string
  color: string
  soft: string
  text: string
  border: string
  grades: Grade[]
}

export interface ChapterSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  example?: string
}

export interface RawQuestion {
  type: QuestionType
  text: string
  options?: string[]
  answer: string
  pairs?: [string, string][]
  explanation: string
  story?: string
}

export interface ChapterSeed {
  id: string
  subjectId: SubjectId
  grade: Grade
  semester: Semester
  order: number
  title: string
  emoji: string
  description: string
  objectives: string[]
  sections: ChapterSection[]
  summary: string[]
  minutes: number
  questions: RawQuestion[]
}

export interface Chapter extends Omit<ChapterSeed, 'questions'> {
  questionIds: string[]
}

export interface Question {
  id: string
  chapterId: string
  subjectId: SubjectId
  grade: Grade
  semester: Semester
  type: QuestionType
  text: string
  options?: string[]
  answer: string
  pairs?: [string, string][]
  explanation: string
  story?: string
  points: number
  difficulty: 'mudah' | 'sedang' | 'sulit'
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: Role
  grade?: Grade
  avatar: string
  frame: string
  parentId?: string
  school: string
  points: number
  stars: number
  streak: number
  lastActiveDate: string
  badges: string[]
  timeLimitMinutes: number
  dailyGoalMinutes: number
  inventory: string[]
  createdAt: string
}

export type AttemptKind =
  | 'kuis-bab'
  | 'latihan'
  | 'ujian-mapel'
  | 'uts'
  | 'uas'
  | 'kenaikan'
  | 'harian'
  | 'game'

export interface Attempt {
  id: string
  userId: string
  kind: AttemptKind
  title: string
  subjectId?: SubjectId
  chapterId?: string
  grade: Grade
  questionIds: string[]
  answers: Record<string, string | string[]>
  correct: number
  total: number
  score: number
  stars: number
  pointsEarned: number
  durationSec: number
  createdAt: string
}

export interface Progress {
  userId: string
  chapterId: string
  completed: boolean
  readAt: string
  minutes: number
}

export interface Activity {
  id: string
  userId: string
  date: string
  minutes: number
  kind: 'materi' | 'kuis' | 'ujian' | 'game' | 'ai' | 'video'
  label: string
  createdAt: string
}

export interface Schedule {
  id: string
  userId: string
  day: number
  time: string
  subjectId: SubjectId
  note: string
}

export interface Reward {
  id: string
  name: string
  emoji: string
  cost: number
  type: 'frame' | 'avatar' | 'sticker'
  description: string
}

export interface Redemption {
  id: string
  userId: string
  rewardId: string
  createdAt: string
}

export interface GameScore {
  id: string
  userId: string
  gameId: string
  score: number
  points: number
  createdAt: string
}

export interface GameDef {
  id: string
  name: string
  emoji: string
  description: string
  howto: string
  color: string
  points: number
  active: boolean
  minutes: number
}

export interface DictionaryEntry {
  word: string
  meaning: string
  example: string
  level: string
}

export interface AIEntry {
  id: string
  keywords: string[]
  title: string
  answer: string
  example?: string
  subjectId?: SubjectId
}

export interface ChatMessage {
  id: string
  userId: string
  role: 'user' | 'ai'
  text: string
  createdAt: string
  suggestions?: string[]
}

export interface DailyChallenge {
  userId: string
  date: string
  questionIds: string[]
  completed: boolean
  score: number
}

export interface Settings {
  appName: string
  schoolName: string
  allowLeaderboard: boolean
  dailyChallengePoints: number
  maxQuestionsPerExam: number
  announcement: string
}

export interface Database {
  version: number
  users: User[]
  subjects: Subject[]
  chapters: Chapter[]
  questions: Question[]
  attempts: Attempt[]
  progress: Progress[]
  activity: Activity[]
  schedules: Schedule[]
  rewards: Reward[]
  redemptions: Redemption[]
  gameScores: GameScore[]
  games: GameDef[]
  dictionary: DictionaryEntry[]
  aiKnowledge: AIEntry[]
  chat: ChatMessage[]
  dailyChallenges: DailyChallenge[]
  settings: Settings
}

export interface BadgeDef {
  id: string
  name: string
  emoji: string
  description: string
  check: (s: BadgeStats) => boolean
}

export interface BadgeStats {
  chaptersDone: number
  quizzesDone: number
  perfectQuizzes: number
  gamesPlayed: number
  streak: number
  points: number
  stars: number
  mathChapters: number
  aiMessages: number
}

export interface QuizQuestionResult {
  question: Question
  userAnswer: string | string[]
  isCorrect: boolean
  earned: number
}
