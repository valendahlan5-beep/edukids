import type {
  Activity,
  Attempt,
  Chapter,
  Database,
  GameScore,
  Grade,
  Progress,
  Question,
  Schedule,
  User,
} from '../types'
import { subjects } from './subjects'
import { gameDefs } from './games'
import { dictionary } from './dictionary'
import { aiKnowledge } from './aiKnowledge'
import grade1 from './grades/grade1'
import grade2 from './grades/grade2'
import grade3 from './grades/grade3'
import grade4 from './grades/grade4'
import grade5 from './grades/grade5'
import grade6 from './grades/grade6'
import { daysAgoKey, shuffle, todayKey } from '../lib/utils'

const gradeSeeds = [grade1, grade2, grade3, grade4, grade5, grade6]

function iso(date: string, hour = 15, minute = 30) {
  return `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`
}

export function buildCurriculum() {
  const chapters: Chapter[] = []
  const questions: Question[] = []

  gradeSeeds.flat().forEach((seed) => {
    const questionIds: string[] = []
    seed.questions.forEach((q, index) => {
      const id = `${seed.id}-q${index + 1}`
      const points = q.type === 'menjodohkan' ? 15 : q.type === 'cerita' ? 12 : 10
      questions.push({
        id,
        chapterId: seed.id,
        subjectId: seed.subjectId,
        grade: seed.grade,
        semester: seed.semester,
        type: q.type,
        text: q.text,
        options: q.options,
        answer: q.answer ?? '',
        pairs: q.pairs,
        explanation: q.explanation,
        story: q.story,
        points,
        difficulty: index === 2 ? 'sulit' : index === 1 ? 'sedang' : 'mudah',
      })
      questionIds.push(id)
    })
    const { questions: _omit, ...rest } = seed
    chapters.push({ ...rest, questionIds })
  })

  return { chapters, questions }
}

const { chapters, questions } = buildCurriculum()

export const demoAccount = {
  siswa: { email: 'budi@edukids.id', password: '123456' },
  orangtua: { email: 'orangtua@edukids.id', password: '123456' },
  guru: { email: 'guru@edukids.id', password: 'guru123' },
  admin: { email: 'admin@edukids.id', password: 'admin123' },
}

function makeUsers(): User[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'u-admin',
      name: 'Admin EduKids',
      email: 'admin@edukids.id',
      password: 'admin123',
      role: 'admin',
      avatar: '🧑‍💼',
      frame: 'frame-juara',
      school: 'EduKids Indonesia',
      points: 0,
      stars: 0,
      streak: 0,
      lastActiveDate: todayKey(),
      badges: [],
      timeLimitMinutes: 0,
      dailyGoalMinutes: 30,
      inventory: [],
      createdAt: now,
    },
    {
      id: 'u-guru',
      name: 'Bu Rina Wulandari',
      email: 'guru@edukids.id',
      password: 'guru123',
      role: 'guru',
      avatar: '👩‍🏫',
      frame: 'frame-pelangi',
      school: 'SD Negeri Panunggangan 3',
      points: 0,
      stars: 0,
      streak: 0,
      lastActiveDate: todayKey(),
      badges: [],
      timeLimitMinutes: 0,
      dailyGoalMinutes: 30,
      inventory: [],
      createdAt: now,
    },
    {
      id: 'u-parent',
      name: 'Bapak Andi Santoso',
      email: 'orangtua@edukids.id',
      password: '123456',
      role: 'orangtua',
      avatar: '👨',
      frame: 'frame-bintang',
      school: 'SD Negeri Panunggangan 3',
      points: 0,
      stars: 0,
      streak: 0,
      lastActiveDate: todayKey(),
      badges: [],
      timeLimitMinutes: 0,
      dailyGoalMinutes: 30,
      inventory: [],
      createdAt: now,
    },
    {
      id: 'u-budi',
      name: 'Budi Santoso',
      email: 'budi@edukids.id',
      password: '123456',
      role: 'siswa',
      grade: 3,
      avatar: '🧑‍🚀',
      frame: 'frame-bintang',
      parentId: 'u-parent',
      school: 'SD Negeri Panunggangan 3',
      points: 2450,
      stars: 38,
      streak: 5,
      lastActiveDate: todayKey(),
      badges: ['first-step', 'bookworm', 'quiz-rookie', 'streak-3', 'star-collector', 'gamer'],
      timeLimitMinutes: 60,
      dailyGoalMinutes: 30,
      inventory: ['frame-bintang'],
      createdAt: now,
    },
    {
      id: 'u-siti',
      name: 'Siti Rahma',
      email: 'siti@edukids.id',
      password: '123456',
      role: 'siswa',
      grade: 5,
      avatar: '👧',
      frame: 'frame-pelangi',
      parentId: 'u-parent',
      school: 'SD Negeri Panunggangan 3',
      points: 3120,
      stars: 47,
      streak: 7,
      lastActiveDate: todayKey(),
      badges: ['first-step', 'bookworm', 'materi-master', 'quiz-rookie', 'quiz-champion', 'streak-3', 'streak-7', 'star-collector', 'level-up'],
      timeLimitMinutes: 90,
      dailyGoalMinutes: 45,
      inventory: ['frame-bintang', 'frame-pelangi'],
      createdAt: now,
    },
    {
      id: 'u-andi',
      name: 'Andi Pratama',
      email: 'andi@edukids.id',
      password: '123456',
      role: 'siswa',
      grade: 1,
      avatar: '🦊',
      frame: 'none',
      parentId: 'u-parent',
      school: 'SD Negeri Panunggangan 3',
      points: 120,
      stars: 3,
      streak: 1,
      lastActiveDate: todayKey(),
      badges: ['first-step'],
      timeLimitMinutes: 45,
      dailyGoalMinutes: 20,
      inventory: [],
      createdAt: now,
    },
  ]
}

function chaptersFor(grade: Grade) {
  return chapters.filter((c) => c.grade === grade).sort((a, b) => a.order - b.order)
}

function makeDemoLearning(): {
  progress: Progress[]
  attempts: Attempt[]
  activity: Activity[]
  gameScores: GameScore[]
} {
  const progress: Progress[] = []
  const attempts: Attempt[] = []
  const activity: Activity[] = []
  const gameScores: GameScore[] = []

  const demos: { userId: string; grade: Grade; count: number; base: number }[] = [
    { userId: 'u-budi', grade: 3, count: 7, base: 74 },
    { userId: 'u-siti', grade: 5, count: 11, base: 81 },
    { userId: 'u-andi', grade: 1, count: 2, base: 68 },
  ]

  demos.forEach((demo, demoIndex) => {
    const pool = chaptersFor(demo.grade)
    pool.slice(0, demo.count).forEach((chapter, i) => {
      progress.push({
        userId: demo.userId,
        chapterId: chapter.id,
        completed: true,
        readAt: iso(daysAgoKey(demo.count - i + 1), 16, 10),
        minutes: 12 + (i % 4) * 3,
      })
    })

    const attemptPool = pool.slice(0, Math.min(pool.length, 8))
    attemptPool.forEach((chapter, i) => {
      if (!chapter.questionIds.length) return
      const score = Math.min(100, demo.base + ((i * 7 + demoIndex * 3) % 26))
      const total = chapter.questionIds.length
      const correct = Math.round((score / 100) * total)
      attempts.push({
        userId: demo.userId,
        id: `demo-attempt-${demo.userId}-${i}`,
        kind: i % 3 === 0 ? 'kuis-bab' : i % 3 === 1 ? 'latihan' : 'ujian-mapel',
        title: `Kuis ${chapter.title}`,
        subjectId: chapter.subjectId,
        chapterId: chapter.id,
        grade: demo.grade,
        questionIds: chapter.questionIds,
        answers: {},
        correct,
        total,
        score,
        stars: score >= 90 ? 3 : score >= 70 ? 2 : 1,
        pointsEarned: correct * 10,
        durationSec: 180 + i * 40,
        createdAt: iso(daysAgoKey(demo.count - i + 2), 17, 5),
      })
    })

    for (let d = 13; d >= 0; d--) {
      const active = (d + demoIndex) % 7 !== 3
      if (!active) continue
      const minutes = 12 + ((d * 7 + demoIndex * 5) % 38)
      activity.push({
        id: `demo-act-${demo.userId}-${d}`,
        userId: demo.userId,
        date: daysAgoKey(d),
        minutes,
        kind: d % 4 === 0 ? 'kuis' : d % 5 === 0 ? 'game' : d % 3 === 0 ? 'video' : 'materi',
        label:
          d % 4 === 0
            ? 'Mengerjakan kuis latihan'
            : d % 5 === 0
              ? 'Bermain game edukasi'
              : d % 3 === 0
                ? 'Menonton video pembelajaran'
                : 'Membaca materi pelajaran',
        createdAt: iso(daysAgoKey(d), 15, 20 + (d % 30)),
      })
    }

    gameScores.push(
      {
        id: `demo-game-${demo.userId}-1`,
        userId: demo.userId,
        gameId: 'kuis-cepat',
        score: 8 + demoIndex,
        points: 20,
        createdAt: iso(daysAgoKey(2), 16, 45),
      },
      {
        id: `demo-game-${demo.userId}-2`,
        userId: demo.userId,
        gameId: 'tebak-gambar',
        score: 7 + demoIndex,
        points: 15,
        createdAt: iso(daysAgoKey(5), 14, 10),
      },
    )
  })

  return { progress, attempts, activity, gameScores }
}

function makeSchedules(): Schedule[] {
  return [
    { id: 'sch-1', userId: 'u-budi', day: 1, time: '16:00', subjectId: 'matematika', note: 'Latihan perkalian' },
    { id: 'sch-2', userId: 'u-budi', day: 2, time: '16:30', subjectId: 'bindo', note: 'Membaca cerita' },
    { id: 'sch-3', userId: 'u-budi', day: 3, time: '15:30', subjectId: 'ipas', note: 'Belajar siklus air' },
    { id: 'sch-4', userId: 'u-budi', day: 4, time: '16:00', subjectId: 'inggris', note: 'Kosakata baru' },
    { id: 'sch-5', userId: 'u-budi', day: 5, time: '15:00', subjectId: 'seni', note: 'Menggambar' },
    { id: 'sch-6', userId: 'u-siti', day: 1, time: '17:00', subjectId: 'ipas', note: 'Sistem pencernaan' },
    { id: 'sch-7', userId: 'u-siti', day: 2, time: '17:00', subjectId: 'matematika', note: 'Pecahan' },
    { id: 'sch-8', userId: 'u-siti', day: 3, time: '16:30', subjectId: 'pancasila', note: 'Musyawarah' },
    { id: 'sch-9', userId: 'u-siti', day: 4, time: '17:00', subjectId: 'bindo', note: 'Teks nonfiksi' },
  ]
}

export function createSeedDatabase(): Database {
  const demo = makeDemoLearning()
  const dailyChallengeQuestions = shuffle(
    questions.filter((q) => q.grade === 3),
  ).slice(0, 5)

  return {
    version: 1,
    users: makeUsers(),
    subjects,
    chapters,
    questions,
    attempts: demo.attempts,
    progress: demo.progress,
    activity: demo.activity,
    schedules: makeSchedules(),
    rewards: [
      { id: 'frame-bintang', name: 'Bingkai Bintang', emoji: '⭐', cost: 300, type: 'frame', description: 'Bingkai emas berkilau untuk profilmu.' },
      { id: 'frame-pelangi', name: 'Bingkai Pelangi', emoji: '🌈', cost: 400, type: 'frame', description: 'Warna pelangi ceria di sekitar avatar.' },
      { id: 'frame-roket', name: 'Bingkai Roket', emoji: '🚀', cost: 500, type: 'frame', description: 'Untuk kamu yang suka menjelajah ilmu.' },
      { id: 'frame-juara', name: 'Bingkai Juara', emoji: '🏆', cost: 700, type: 'frame', description: 'Bingkai spesial para juara kelas.' },
      { id: 'avatar-kucing', name: 'Avatar Kucing', emoji: '🐱', cost: 250, type: 'avatar', description: 'Avatar kucing lucu untuk profilmu.' },
      { id: 'avatar-naga', name: 'Avatar Naga', emoji: '🐲', cost: 600, type: 'avatar', description: 'Avatar naga pemberani yang keren.' },
      { id: 'avatar-astronot', name: 'Avatar Astronot', emoji: '🧑‍🚀', cost: 450, type: 'avatar', description: 'Siap menjelajah luar angkasa ilmu.' },
      { id: 'avatar-unicorn', name: 'Avatar Unicorn', emoji: '🦄', cost: 550, type: 'avatar', description: 'Avatar unicorn penuh imajinasi.' },
      { id: 'sticker-api', name: 'Stiker Semangat', emoji: '🔥', cost: 150, type: 'sticker', description: 'Stiker api semangat belajar.' },
      { id: 'sticker-bintang', name: 'Stiker Bintang', emoji: '🌟', cost: 200, type: 'sticker', description: 'Stiker bintang untuk koleksimu.' },
    ],
    redemptions: [],
    gameScores: demo.gameScores,
    games: gameDefs,
    dictionary,
    aiKnowledge,
    chat: [
      {
        id: 'welcome-chat',
        userId: 'u-budi',
        role: 'ai',
        text: 'Hai, Budi! Aku Kiki, AI Guru Pintar kamu. Mau belajar apa hari ini? Kamu bisa bertanya tentang pelajaran, minta contoh soal, atau minta aku menjelaskan langkah-langkah mengerjakan soal. 😊',
        createdAt: new Date().toISOString(),
        suggestions: ['Jelaskan pecahan sederhana', 'Buatkan 3 soal kelas 3', 'Apa itu siklus air?'],
      },
    ],
    dailyChallenges: [
      {
        userId: 'u-budi',
        date: todayKey(),
        questionIds: dailyChallengeQuestions.map((q) => q.id),
        completed: false,
        score: 0,
      },
    ],
    settings: {
      appName: 'EduKids SDN Panunggangan 3',
      schoolName: 'SD Negeri Panunggangan 3',
      allowLeaderboard: true,
      dailyChallengePoints: 50,
      maxQuestionsPerExam: 20,
      announcement: 'Selamat datang di EduKids SDN Panunggangan 3! Jangan lupa kerjakan tantangan harian untuk mendapat 50 poin tambahan. 🌟',
    },
  }
}
