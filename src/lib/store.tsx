import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type {
  AIEntry,
  Attempt,
  AttemptKind,
  BadgeStats,
  Chapter,
  ChatMessage,
  Database,
  GameDef,
  Grade,
  Question,
  Role,
  Schedule,
  Settings,
  Subject,
  User,
} from '../types'
import { createSeedDatabase } from '../data/seed'
import { badges } from '../data/badges'
import { daysBetween, scoreToStars, todayKey, uid } from './utils'

const DB_KEY = 'edukids_db_v1'
const USER_KEY = 'edukids_current_user'

type ToastType = 'success' | 'error' | 'info' | 'reward'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  role: Extract<Role, 'siswa' | 'orangtua'>
  grade?: Grade
  parentEmail?: string
  school?: string
}

interface AttemptPayload {
  kind: AttemptKind
  title: string
  subjectId?: Subject['id']
  chapterId?: string
  grade: Grade
  questionIds: string[]
  answers: Record<string, string | string[]>
  correct: number
  total: number
  durationSec: number
}

interface StoreValue {
  db: Database
  user: User | null
  children: User[]
  toasts: Toast[]
  toast: (message: string, type?: ToastType) => void
  dismissToast: (id: string) => void
  login: (email: string, password: string) => { ok: boolean; error?: string; user?: User }
  register: (payload: RegisterPayload) => { ok: boolean; error?: string; user?: User }
  logout: () => void
  updateUser: (id: string, patch: Partial<User>) => void
  updateProfile: (patch: Partial<User>) => void
  changePassword: (oldPassword: string, newPassword: string) => { ok: boolean; error?: string }
  completeChapter: (chapterId: string, minutes: number) => void
  recordReading: (chapterId: string, minutes: number) => void
  saveAttempt: (payload: AttemptPayload) => Attempt
  recordGame: (gameId: string, score: number, points: number, minutes?: number) => void
  addSchedule: (schedule: Omit<Schedule, 'id'>) => void
  deleteSchedule: (id: string) => void
  addChild: (payload: { name: string; email: string; password: string; grade: Grade }) => { ok: boolean; error?: string }
  setChildLimit: (childId: string, minutes: number) => void
  resetChildProgress: (childId: string) => void
  redeemReward: (rewardId: string) => { ok: boolean; error?: string }
  ensureDailyChallenge: (userId: string) => void
  completeDailyChallenge: (score: number, total: number, answers: Record<string, string | string[]>) => void
  addChat: (role: 'user' | 'ai', text: string, suggestions?: string[]) => void
  clearChat: () => void
  saveSubject: (subject: Subject) => void
  deleteSubject: (id: string) => void
  saveChapter: (chapter: Chapter) => void
  deleteChapter: (id: string) => void
  saveQuestion: (question: Question) => void
  deleteQuestion: (id: string) => void
  saveGame: (game: GameDef) => void
  saveAIEntry: (entry: AIEntry) => void
  deleteAIEntry: (id: string) => void
  saveSettings: (settings: Settings) => void
  exportData: () => string
  importData: (json: string) => { ok: boolean; error?: string }
  resetData: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

function loadDb(): Database {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (!raw) return createSeedDatabase()
    const parsed = JSON.parse(raw) as Database
    if (!parsed.users?.length || !parsed.chapters?.length || !parsed.subjects?.length) {
      return createSeedDatabase()
    }
    if (!parsed.games) parsed.games = createSeedDatabase().games
    if (!parsed.dailyChallenges) parsed.dailyChallenges = []
    if (!parsed.redemptions) parsed.redemptions = []
    return parsed
  } catch {
    return createSeedDatabase()
  }
}

function clone(db: Database): Database {
  return JSON.parse(JSON.stringify(db)) as Database
}

function statsFor(db: Database, userId: string): BadgeStats {
  const progress = db.progress.filter((p) => p.userId === userId && p.completed)
  const user = db.users.find((u) => u.id === userId)
  const attempts = db.attempts.filter((a) => a.userId === userId)
  const chapterMap = new Map(db.chapters.map((c) => [c.id, c]))
  return {
    chaptersDone: progress.length,
    quizzesDone: attempts.length,
    perfectQuizzes: attempts.filter((a) => a.score === 100).length,
    gamesPlayed: db.gameScores.filter((g) => g.userId === userId).length,
    streak: user?.streak ?? 0,
    points: user?.points ?? 0,
    stars: user?.stars ?? 0,
    mathChapters: progress.filter((p) => chapterMap.get(p.chapterId)?.subjectId === 'matematika').length,
    aiMessages: db.chat.filter((c) => c.userId === userId && c.role === 'user').length,
  }
}

function applyBadges(db: Database, userId: string): string[] {
  const user = db.users.find((u) => u.id === userId)
  if (!user) return []
  const stats = statsFor(db, userId)
  const earned: string[] = []
  badges.forEach((badge) => {
    if (!user.badges.includes(badge.id) && badge.check(stats)) {
      user.badges.push(badge.id)
      earned.push(badge.name)
    }
  })
  return earned
}

function touchUser(user: User) {
  const today = todayKey()
  if (user.lastActiveDate !== today) {
    const diff = user.lastActiveDate ? daysBetween(user.lastActiveDate, today) : 0
    user.streak = diff === 1 ? user.streak + 1 : 1
    user.lastActiveDate = today
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Database>(() => loadDb())
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(USER_KEY)
    } catch {
      return null
    }
  })
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Record<string, number>>({})

  useEffect(() => {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(db))
    } catch (error) {
      console.warn('Gagal menyimpan data lokal', error)
    }
  }, [db])

  useEffect(() => {
    try {
      if (currentUserId) localStorage.setItem(USER_KEY, currentUserId)
      else localStorage.removeItem(USER_KEY)
    } catch {
      /* ignore */
    }
  }, [currentUserId])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = uid('toast')
    setToasts((prev) => [...prev.slice(-3), { id, message, type }])
    timers.current[id] = window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4200)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const user = useMemo(
    () => db.users.find((u) => u.id === currentUserId) ?? null,
    [db.users, currentUserId],
  )

  const childUsers = useMemo(
    () => (user ? db.users.filter((u) => u.parentId === user.id) : []),
    [db.users, user],
  )

  const commit = useCallback((updater: (draft: Database) => void) => {
    setDb((prev) => {
      const next = clone(prev)
      updater(next)
      return next
    })
  }, [])

  const login = useCallback(
    (email: string, password: string) => {
      const normalized = email.trim().toLowerCase()
      const found = db.users.find((u) => u.email.toLowerCase() === normalized)
      if (!found) return { ok: false, error: 'Email belum terdaftar. Periksa kembali, ya.' }
      if (found.password !== password) return { ok: false, error: 'Password belum tepat. Coba lagi, ya.' }
      setCurrentUserId(found.id)
      commit((draft) => {
        const target = draft.users.find((u) => u.id === found.id)
        if (target) {
          touchUser(target)
          target.points += 5
        }
        applyBadges(draft, found.id)
      })
      return { ok: true, user: found }
    },
    [db.users, commit],
  )

  const register = useCallback(
    (payload: RegisterPayload) => {
      const normalized = payload.email.trim().toLowerCase()
      if (!payload.name.trim()) return { ok: false, error: 'Nama tidak boleh kosong.' }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return { ok: false, error: 'Format email belum benar.' }
      if (payload.password.length < 6) return { ok: false, error: 'Password minimal 6 karakter.' }
      if (db.users.some((u) => u.email.toLowerCase() === normalized)) {
        return { ok: false, error: 'Email sudah digunakan. Silakan masuk atau gunakan email lain.' }
      }
      const parent = payload.parentEmail
        ? db.users.find((u) => u.email.toLowerCase() === payload.parentEmail?.trim().toLowerCase() && u.role === 'orangtua')
        : undefined
      const newUser: User = {
        id: uid('u'),
        name: payload.name.trim(),
        email: normalized,
        password: payload.password,
        role: payload.role,
        grade: payload.role === 'siswa' ? payload.grade : undefined,
        avatar: payload.role === 'siswa' ? '🐼' : '👨‍👩‍👧',
        frame: 'none',
        parentId: parent?.id,
        school: payload.school?.trim() || 'SD Negeri Panunggangan 3',
        points: 0,
        stars: 0,
        streak: 1,
        lastActiveDate: todayKey(),
        badges: [],
        timeLimitMinutes: payload.role === 'siswa' ? 60 : 0,
        dailyGoalMinutes: payload.role === 'siswa' ? 30 : 30,
        inventory: [],
        createdAt: new Date().toISOString(),
      }
      commit((draft) => {
        draft.users.push(newUser)
      })
      setCurrentUserId(newUser.id)
      return { ok: true, user: newUser }
    },
    [db.users, commit],
  )

  const logout = useCallback(() => {
    setCurrentUserId(null)
  }, [])

  const updateUser = useCallback(
    (id: string, patch: Partial<User>) => {
      commit((draft) => {
        const target = draft.users.find((u) => u.id === id)
        if (target) Object.assign(target, patch)
      })
    },
    [commit],
  )

  const updateProfile = useCallback(
    (patch: Partial<User>) => {
      if (!user) return
      updateUser(user.id, patch)
      toast('Profil berhasil diperbarui.', 'success')
    },
    [user, updateUser, toast],
  )

  const changePassword = useCallback(
    (oldPassword: string, newPassword: string) => {
      if (!user) return { ok: false, error: 'Kamu belum masuk.' }
      if (user.password !== oldPassword) return { ok: false, error: 'Password lama tidak sesuai.' }
      if (newPassword.length < 6) return { ok: false, error: 'Password baru minimal 6 karakter.' }
      updateUser(user.id, { password: newPassword })
      return { ok: true }
    },
    [user, updateUser],
  )

  const completeChapter = useCallback(
    (chapterId: string, minutes: number) => {
      if (!user) return
      let earnedBadges: string[] = []
      let alreadyDone = false
      commit((draft) => {
        const target = draft.users.find((u) => u.id === user.id)
        if (!target) return
        touchUser(target)
        const chapter = draft.chapters.find((c) => c.id === chapterId)
        if (!chapter) return
        const existing = draft.progress.find((p) => p.userId === user.id && p.chapterId === chapterId)
        alreadyDone = Boolean(existing?.completed)
        if (existing) {
          existing.completed = true
          existing.readAt = new Date().toISOString()
          existing.minutes += Math.max(1, Math.round(minutes))
        } else {
          draft.progress.push({
            userId: user.id,
            chapterId,
            completed: true,
            readAt: new Date().toISOString(),
            minutes: Math.max(1, Math.round(minutes)),
          })
        }
        if (!alreadyDone) {
          target.points += 25
        }
        draft.activity.push({
          id: uid('act'),
          userId: user.id,
          date: todayKey(),
          minutes: Math.max(1, Math.round(minutes)),
          kind: 'materi',
          label: `Menyelesaikan materi ${chapter.title}`,
          createdAt: new Date().toISOString(),
        })
        earnedBadges = applyBadges(draft, user.id)
      })
      if (!alreadyDone) {
        toast('Materi selesai! +25 poin untukmu 🎉', 'reward')
      } else {
        toast('Progres bacaanmu diperbarui.', 'info')
      }
      if (earnedBadges.length) toast(`Badge baru: ${earnedBadges.join(', ')}! 🏅`, 'reward')
    },
    [user, commit, toast],
  )

  const recordReading = useCallback(
    (chapterId: string, minutes: number) => {
      if (!user) return
      commit((draft) => {
        const target = draft.users.find((u) => u.id === user.id)
        if (!target) return
        touchUser(target)
        const existing = draft.progress.find((p) => p.userId === user.id && p.chapterId === chapterId)
        if (existing) {
          existing.minutes += Math.max(0, Math.round(minutes))
          existing.readAt = new Date().toISOString()
        } else {
          draft.progress.push({
            userId: user.id,
            chapterId,
            completed: false,
            readAt: new Date().toISOString(),
            minutes: Math.max(0, Math.round(minutes)),
          })
        }
        if (minutes >= 1) {
          draft.activity.push({
            id: uid('act'),
            userId: user.id,
            date: todayKey(),
            minutes: Math.round(minutes),
            kind: 'materi',
            label: 'Membaca materi pelajaran',
            createdAt: new Date().toISOString(),
          })
        }
      })
    },
    [user, commit],
  )

  const saveAttempt = useCallback(
    (payload: AttemptPayload) => {
      const score = payload.total ? Math.round((payload.correct / payload.total) * 100) : 0
      const stars = scoreToStars(score)
      const bonus = score === 100 ? 30 : score >= 90 ? 15 : 0
      const pointsEarned = payload.correct * 10 + bonus
      const attempt: Attempt = {
        id: uid('att'),
        userId: user?.id ?? '',
        kind: payload.kind,
        title: payload.title,
        subjectId: payload.subjectId,
        chapterId: payload.chapterId,
        grade: payload.grade,
        questionIds: payload.questionIds,
        answers: payload.answers,
        correct: payload.correct,
        total: payload.total,
        score,
        stars,
        pointsEarned,
        durationSec: payload.durationSec,
        createdAt: new Date().toISOString(),
      }
      if (!user) return attempt
      let newBadges: string[] = []
      commit((draft) => {
        const target = draft.users.find((u) => u.id === user.id)
        if (!target) return
        touchUser(target)
        target.points += pointsEarned
        if (payload.kind !== 'harian') target.stars += stars
        draft.attempts.unshift(attempt)
        draft.activity.push({
          id: uid('act'),
          userId: user.id,
          date: todayKey(),
          minutes: Math.max(1, Math.round(payload.durationSec / 60)),
          kind: payload.kind === 'kuis-bab' || payload.kind === 'latihan' ? 'kuis' : 'ujian',
          label: payload.title,
          createdAt: new Date().toISOString(),
        })
        newBadges = applyBadges(draft, user.id)
      })
      if (newBadges.length) toast(`Badge baru: ${newBadges.join(', ')}! 🏅`, 'reward')
      return attempt
    },
    [user, commit, toast],
  )

  const recordGame = useCallback(
    (gameId: string, score: number, points: number, minutes = 2) => {
      if (!user) return
      let newBadges: string[] = []
      commit((draft) => {
        const target = draft.users.find((u) => u.id === user.id)
        const game = draft.games.find((g) => g.id === gameId)
        if (!target) return
        touchUser(target)
        target.points += points
        if (score >= 5) target.stars += 1
        draft.gameScores.unshift({
          id: uid('gs'),
          userId: user.id,
          gameId,
          score,
          points,
          createdAt: new Date().toISOString(),
        })
        draft.activity.push({
          id: uid('act'),
          userId: user.id,
          date: todayKey(),
          minutes: Math.max(1, Math.round(minutes)),
          kind: 'game',
          label: `Bermain ${game?.name ?? 'game edukasi'}`,
          createdAt: new Date().toISOString(),
        })
        newBadges = applyBadges(draft, user.id)
      })
      toast(`Hebat! Kamu mendapat ${points} poin dari game 🎮`, 'reward')
      if (newBadges.length) toast(`Badge baru: ${newBadges.join(', ')}! 🏅`, 'reward')
    },
    [user, commit, toast],
  )

  const addSchedule = useCallback(
    (schedule: Omit<Schedule, 'id'>) => {
      commit((draft) => {
        draft.schedules.push({ ...schedule, id: uid('sch') })
      })
      toast('Jadwal belajar ditambahkan.', 'success')
    },
    [commit, toast],
  )

  const deleteSchedule = useCallback(
    (id: string) => {
      commit((draft) => {
        draft.schedules = draft.schedules.filter((s) => s.id !== id)
      })
      toast('Jadwal dihapus.', 'info')
    },
    [commit, toast],
  )

  const addChild = useCallback(
    (payload: { name: string; email: string; password: string; grade: Grade }) => {
      if (!user || user.role !== 'orangtua') return { ok: false, error: 'Hanya akun orang tua yang dapat menambah anak.' }
      const normalized = payload.email.trim().toLowerCase()
      if (db.users.some((u) => u.email.toLowerCase() === normalized)) {
        return { ok: false, error: 'Email sudah digunakan.' }
      }
      if (payload.password.length < 6) return { ok: false, error: 'Password minimal 6 karakter.' }
      const child: User = {
        id: uid('u'),
        name: payload.name.trim(),
        email: normalized,
        password: payload.password,
        role: 'siswa',
        grade: payload.grade,
        avatar: '🐨',
        frame: 'none',
        parentId: user.id,
        school: user.school,
        points: 0,
        stars: 0,
        streak: 1,
        lastActiveDate: todayKey(),
        badges: [],
        timeLimitMinutes: 60,
        dailyGoalMinutes: 30,
        inventory: [],
        createdAt: new Date().toISOString(),
      }
      commit((draft) => {
        draft.users.push(child)
      })
      toast(`Akun ${child.name} berhasil dibuat.`, 'success')
      return { ok: true }
    },
    [user, db.users, commit, toast],
  )

  const setChildLimit = useCallback(
    (childId: string, minutes: number) => {
      commit((draft) => {
        const child = draft.users.find((u) => u.id === childId)
        if (child) child.timeLimitMinutes = Math.max(0, minutes)
      })
      toast('Batas waktu belajar diperbarui.', 'success')
    },
    [commit, toast],
  )

  const resetChildProgress = useCallback(
    (childId: string) => {
      commit((draft) => {
        draft.progress = draft.progress.filter((p) => p.userId !== childId)
        draft.attempts = draft.attempts.filter((a) => a.userId !== childId)
        draft.activity = draft.activity.filter((a) => a.userId !== childId)
        draft.gameScores = draft.gameScores.filter((g) => g.userId !== childId)
        const child = draft.users.find((u) => u.id === childId)
        if (child) {
          child.points = 0
          child.stars = 0
          child.badges = []
        }
      })
      toast('Progres anak berhasil direset.', 'info')
    },
    [commit, toast],
  )

  const redeemReward = useCallback(
    (rewardId: string) => {
      if (!user) return { ok: false, error: 'Kamu belum masuk.' }
      const reward = db.rewards.find((r) => r.id === rewardId)
      if (!reward) return { ok: false, error: 'Hadiah tidak ditemukan.' }
      const owned = user.inventory.includes(rewardId) || (reward.type === 'frame' && user.frame === rewardId)
      if (owned) return { ok: false, error: 'Hadiah ini sudah kamu miliki.' }
      if (user.points < reward.cost) return { ok: false, error: 'Poinmu belum cukup. Terus belajar dan kumpulkan poin, ya!' }
      commit((draft) => {
        const target = draft.users.find((u) => u.id === user.id)
        if (!target) return
        target.points -= reward.cost
        target.inventory.push(reward.id)
        if (reward.type === 'frame') target.frame = reward.id
        if (reward.type === 'avatar') target.avatar = reward.emoji
        draft.redemptions.push({
          id: uid('red'),
          userId: user.id,
          rewardId,
          createdAt: new Date().toISOString(),
        })
      })
      toast(`Hadiah "${reward.name}" berhasil ditukar! ${reward.emoji}`, 'reward')
      return { ok: true }
    },
    [user, db.rewards, commit, toast],
  )

  const ensureDailyChallenge = useCallback(
    (userId: string) => {
      const today = todayKey()
      if (db.dailyChallenges.some((c) => c.userId === userId && c.date === today)) return
      const target = db.users.find((u) => u.id === userId)
      if (!target?.grade) return
      const pool = db.questions.filter((q) => q.grade === target.grade)
      const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, 5)
      if (!selected.length) return
      commit((draft) => {
        draft.dailyChallenges.push({
          userId,
          date: today,
          questionIds: selected.map((q) => q.id),
          completed: false,
          score: 0,
        })
      })
    },
    [db.dailyChallenges, db.users, db.questions, commit],
  )

  const completeDailyChallenge = useCallback(
    (score: number, total: number, answers: Record<string, string | string[]>) => {
      if (!user?.grade) return
      const today = todayKey()
      const challenge = db.dailyChallenges.find((c) => c.userId === user.id && c.date === today)
      if (!challenge) return
      const correct = Math.round((score / 100) * total)
      const attempt: Attempt = {
        id: uid('att'),
        userId: user.id,
        kind: 'harian',
        title: 'Tantangan Belajar Harian',
        grade: user.grade,
        questionIds: challenge.questionIds,
        answers,
        correct,
        total,
        score,
        stars: scoreToStars(score),
        pointsEarned: correct * 5,
        durationSec: 0,
        createdAt: new Date().toISOString(),
      }
      let newBadges: string[] = []
      commit((draft) => {
        const target = draft.users.find((u) => u.id === user.id)
        const ch = draft.dailyChallenges.find((c) => c.userId === user.id && c.date === today)
        const settings = draft.settings
        if (!target || !ch) return
        touchUser(target)
        ch.completed = true
        ch.score = score
        target.points += correct * 5 + (score >= 60 ? settings.dailyChallengePoints : 0)
        draft.attempts.unshift(attempt)
        draft.activity.push({
          id: uid('act'),
          userId: user.id,
          date: today,
          minutes: 5,
          kind: 'kuis',
          label: 'Tantangan belajar harian',
          createdAt: new Date().toISOString(),
        })
        newBadges = applyBadges(draft, user.id)
      })
      toast(score >= 60 ? `Tantangan selesai! +${correct * 5 + 50} poin 🎉` : 'Tantangan selesai. Besok coba lagi, ya!', 'reward')
      if (newBadges.length) toast(`Badge baru: ${newBadges.join(', ')}! 🏅`, 'reward')
    },
    [user, db.dailyChallenges, commit, toast],
  )

  const addChat = useCallback(
    (role: 'user' | 'ai', text: string, suggestions?: string[]) => {
      if (!user) return
      const message: ChatMessage = {
        id: uid('chat'),
        userId: user.id,
        role,
        text,
        createdAt: new Date().toISOString(),
        suggestions,
      }
      commit((draft) => {
        draft.chat.push(message)
        if (role === 'user') {
          const target = draft.users.find((u) => u.id === user.id)
          if (target) {
            touchUser(target)
            target.points += 1
          }
          draft.activity.push({
            id: uid('act'),
            userId: user.id,
            date: todayKey(),
            minutes: 1,
            kind: 'ai',
            label: 'Bertanya kepada AI Guru Pintar',
            createdAt: new Date().toISOString(),
          })
          applyBadges(draft, user.id)
        }
      })
    },
    [user, commit],
  )

  const clearChat = useCallback(() => {
    if (!user) return
    commit((draft) => {
      draft.chat = draft.chat.filter((c) => c.userId !== user.id)
    })
  }, [user, commit])

  const saveSubject = useCallback(
    (subject: Subject) => {
      commit((draft) => {
        const idx = draft.subjects.findIndex((s) => s.id === subject.id)
        if (idx >= 0) draft.subjects[idx] = subject
        else draft.subjects.push(subject)
      })
      toast('Mata pelajaran disimpan.', 'success')
    },
    [commit, toast],
  )

  const deleteSubject = useCallback(
    (id: string) => {
      commit((draft) => {
        draft.subjects = draft.subjects.filter((s) => s.id !== id)
        const chapterIds = draft.chapters.filter((c) => c.subjectId === id).map((c) => c.id)
        draft.chapters = draft.chapters.filter((c) => c.subjectId !== id)
        draft.questions = draft.questions.filter((q) => q.subjectId !== id)
        draft.progress = draft.progress.filter((p) => !chapterIds.includes(p.chapterId))
      })
      toast('Mata pelajaran dan materinya dihapus.', 'info')
    },
    [commit, toast],
  )

  const saveChapter = useCallback(
    (chapter: Chapter) => {
      commit((draft) => {
        const idx = draft.chapters.findIndex((c) => c.id === chapter.id)
        if (idx >= 0) draft.chapters[idx] = chapter
        else draft.chapters.push(chapter)
      })
      toast('Materi berhasil disimpan.', 'success')
    },
    [commit, toast],
  )

  const deleteChapter = useCallback(
    (id: string) => {
      commit((draft) => {
        draft.chapters = draft.chapters.filter((c) => c.id !== id)
        draft.questions = draft.questions.filter((q) => q.chapterId !== id)
        draft.progress = draft.progress.filter((p) => p.chapterId !== id)
      })
      toast('Materi dihapus.', 'info')
    },
    [commit, toast],
  )

  const saveQuestion = useCallback(
    (question: Question) => {
      commit((draft) => {
        const idx = draft.questions.findIndex((q) => q.id === question.id)
        if (idx >= 0) draft.questions[idx] = question
        else {
          draft.questions.push(question)
          const chapter = draft.chapters.find((c) => c.id === question.chapterId)
          if (chapter && !chapter.questionIds.includes(question.id)) chapter.questionIds.push(question.id)
        }
      })
      toast('Soal berhasil disimpan.', 'success')
    },
    [commit, toast],
  )

  const deleteQuestion = useCallback(
    (id: string) => {
      commit((draft) => {
        draft.questions = draft.questions.filter((q) => q.id !== id)
        draft.chapters.forEach((c) => {
          c.questionIds = c.questionIds.filter((qid) => qid !== id)
        })
      })
      toast('Soal dihapus.', 'info')
    },
    [commit, toast],
  )

  const saveGame = useCallback(
    (game: GameDef) => {
      commit((draft) => {
        const idx = draft.games.findIndex((g) => g.id === game.id)
        if (idx >= 0) draft.games[idx] = game
        else draft.games.push(game)
      })
      toast('Pengaturan game disimpan.', 'success')
    },
    [commit, toast],
  )

  const saveAIEntry = useCallback(
    (entry: AIEntry) => {
      commit((draft) => {
        const idx = draft.aiKnowledge.findIndex((a) => a.id === entry.id)
        if (idx >= 0) draft.aiKnowledge[idx] = entry
        else draft.aiKnowledge.push(entry)
      })
      toast('Pengetahuan AI disimpan.', 'success')
    },
    [commit, toast],
  )

  const deleteAIEntry = useCallback(
    (id: string) => {
      commit((draft) => {
        draft.aiKnowledge = draft.aiKnowledge.filter((a) => a.id !== id)
      })
      toast('Pengetahuan AI dihapus.', 'info')
    },
    [commit, toast],
  )

  const saveSettings = useCallback(
    (settings: Settings) => {
      commit((draft) => {
        draft.settings = settings
      })
      toast('Pengaturan aplikasi disimpan.', 'success')
    },
    [commit, toast],
  )

  const exportData = useCallback(() => JSON.stringify(db, null, 2), [db])

  const importData = useCallback(
    (json: string) => {
      try {
        const parsed = JSON.parse(json) as Database
        if (!parsed.users || !parsed.chapters || !parsed.questions) {
          return { ok: false, error: 'Struktur data tidak dikenali.' }
        }
        setDb(parsed)
        toast('Data berhasil dipulihkan dari cadangan.', 'success')
        return { ok: true }
      } catch {
        return { ok: false, error: 'File cadangan tidak valid.' }
      }
    },
    [toast],
  )

  const resetData = useCallback(() => {
    const fresh = createSeedDatabase()
    setDb(fresh)
    setCurrentUserId(fresh.users[0].id)
    toast('Data aplikasi dikembalikan ke kondisi awal.', 'info')
  }, [toast])

  const value: StoreValue = {
    db,
    user,
    children: childUsers,
    toasts,
    toast,
    dismissToast,
    login,
    register,
    logout,
    updateUser,
    updateProfile,
    changePassword,
    completeChapter,
    recordReading,
    saveAttempt,
    recordGame,
    addSchedule,
    deleteSchedule,
    addChild,
    setChildLimit,
    resetChildProgress,
    redeemReward,
    ensureDailyChallenge,
    completeDailyChallenge,
    addChat,
    clearChat,
    saveSubject,
    deleteSubject,
    saveChapter,
    deleteChapter,
    saveQuestion,
    deleteQuestion,
    saveGame,
    saveAIEntry,
    deleteAIEntry,
    saveSettings,
    exportData,
    importData,
    resetData,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore harus digunakan di dalam StoreProvider')
  return ctx
}

export function useCurrentUser() {
  const { user } = useStore()
  return user
}
