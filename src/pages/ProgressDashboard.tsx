import React from 'react'
import { useStore } from '../lib/store'
import { useCurrentUser } from '../lib/store'
import { StatTile } from '../components/UI'
import { ProgressBar } from '../components/UI'
import { Card } from '../components/UI'
import { formatMinutes } from '../lib/utils'
import { cx } from '../lib/utils'
import { Book, File, Zap, Star } from 'lucide-react'

export default function StudentProgressDashboard() {
  const { user, db } = useStore()
  const currentUser = useCurrentUser()

  if (!user) return null

  // Compute progress stats - all logic moved here, OUTSIDE JSX
  const progress = db.progress.filter((p) => p.userId === user.id && p.completed)
  const attempts = db.attempts.filter((a) => a.userId === user.id)
  const activity = db.activity
    .filter((a) => a.userId === user.id)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10)

  // Pre-compute all values that will be used in JSX
  const totalChapters = db.chapters.filter((c) => c.grade === user.grade).length
  const chaptersDone = progress.length
  const quizzesDone = attempts.length
  const perfectQuizzes = attempts.filter((a) => a.score === 100).length
  const gamesPlayed = db.gameScores.filter((g) => g.userId === user.id).length
  const streak = user.streak
  const points = user.points
  const stars = user.stars
  const mathChapters = progress.filter((p) => {
    const chapter = db.chapters.find((c) => c.id === p.chapterId)
    return chapter?.subjectId === 'matematika'
  }).length

  // Pre-compute percentage
  const completionPercentage = totalChapters > 0 ? (chaptersDone / totalChapters) * 100 : 0

  // Pre-compute average quiz score
  let avgScore = 0
  if (attempts.length > 0) {
    const totalScore = attempts.reduce(
      (sum, a) => sum + a.score,
      0,
    ) / attempts.length
    avgScore = Math.round(totalScore)
  }

  // Pre-recent activity
  const recentActivity = activity.map((act) => ({
    id: act.id,
    kind: act.kind,
    label: act.label,
    minutes: act.minutes,
    date: act.date,
  }))

  // Pre-recent attempts
  const recentAttempts = attempts
    .slice(0, 5)
    .map((att) => ({
      id: att.id,
      kind: att.kind,
      title: att.title || 'Kuis',
      score: att.score,
      correct: att.correct,
      total: att.total,
    }))

  return (
    <div className='min-h-screen bg-slate-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <Card className='mb-6'>
          <div className='p-5'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='flex-shrink-0 rounded-2xl bg-gradient-to-br from-brand-500 to-sun-50 p-2'>
                <svg className='h-6 w-6 text-brand-600' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                  <circle cx='9' cy='21' r='1' />
                  <path d='M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8' />
                  <circle cx='19' cy='9' r='1' />
                </svg>
              </div>
              <div>
                <h2 className='font-display text-2xl font-bold text-slate-900'>
                  Progress Saya, {user.name}
                </h2>
                <p className='text-sm text-slate-500'>Kelas {user.grade}</p>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              <StatTile
                icon={Book}
                label='Materi Selesai'
                value={chaptersDone.toLocaleString('id-ID')}
                sub={`dari ${totalChapters} materi`}
                color='bg-brand-50 text-brand-700'
              />
              <StatTile
                icon={File}
                label='Kuis Dikerjakan'
                value={quizzesDone.toLocaleString('id-ID')}
                sub='kuis & ujian'
                color='bg-sun-500 text-sun-600'
              />
              <StatTile
                icon={Zap}
                label='Streak Belajar'
                value={streak}
                sub='hari berturut-turut'
                color='bg-coral-500 text-coral-600'
              />
              <StatTile
                icon={Star}
                label='Bintang Didapat'
                value={stars}
                sub='total bintang'
                color='bg-mint-500 text-mint-600'
              />
            </div>

            {/* Progress Bars */}
            <div className='grid grid-cols-2 gap-3 mt-4'>
              {/* Chapter Completion Bar */}
              <Card>
                <div className='p-4'>
                  <h3 className='font-semibold text-slate-700 mb-2'>Kompletesi Materi</h3>
                  <ProgressBar
                    value={completionPercentage}
                    color='bg-brand-500'
                    label='Persentase completion'
                    showPercent
                  />
                  <p className='mt-2 text-xs text-slate-500'>
                    {chaptersDone} dari {totalChapters} materi {completionPercentage.toFixed(
                      1,
                    )}% selesai</p>
                </div>
              </Card>

              {/* Quiz Accuracy Bar */}
              <Card>
                <div className='p-4'>
                  <h3 className='font-semibold text-slate-700 mb-2'>Akurasi Kuis</h3>
                  <ProgressBar
                    value={avgScore}
                    color='bg-mint-500'
                    label='Rata-rata skor'
                    showPercent
                  />
                  <p className='mt-2 text-xs text-slate-500'>
                    {avgScore}% rata-rata skor kuis</p>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className='mt-6'>
          <div className='p-5'>
            <h3 className='font-display text-xl font-bold text-slate-900 mb-4'>
              Aktivitas Terbaru
            </h3>
            {recentActivity.length === 0 ? (
              <p className='text-slate-400 text-center py-8'>
                Belum ada aktivitas. Mulai dengan menyelesaikan materi! 📖
              </p>
            ) : (
              <div className='space-y-2'>
                {recentActivity.map((act) => {
                  const kindLabels: Record<string, string> = {
                    materi: 'Membaca Materi',
                    kuis: 'Mengerjakan Kuis',
                    ujian: 'Mengerjakan Ujian',
                    game: 'Bermain Game',
                    ai: 'Bertanya AI',
                    video: 'Menonton Video',
                  }

                  const kindColors: Record<string, string> = {
                    materi: 'bg-brand-50',
                    kuis: 'bg-sun-50',
                    game: 'bg-mint-50',
                    ai: 'bg-violet-50',
                    video: 'bg-orange-50',
                  }

                  const date = act.date
                    ? new Date(act.date + 'T16:10:00.000Z')
                    : new Date()

                  return (
                    <div
                      key={act.id}
                      className='flex items-start gap-2 px-2 py-1 rounded bg-slate-50'
                    >
                      <span className={cx(
                        'rounded-md flex-shrink-0 items-center justify-center',
                        kindColors[act.kind] || 'bg-slate-200',
                      )}>
                        <span className='text-xs font-bold'>
                          {kindLabels[act.kind]?.charAt(0) ?? '•'}
                        </span>
                      </span>
                      <span className='text-xs text-slate-600'>
                        {act.label}
                        <br />
                        {act.date} · {act.minutes} menit
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Card>

        {/* Recent Quiz Results */}
        <Card className='mt-6'>
          <div className='p-5'>
            <h3 className='font-display text-xl font-bold text-slate-900 mb-4'>
              Hasil Kuis Terbaru
            </h3>
            {recentAttempts.length === 0 ? (
              <p className='text-slate-400 text-center py-8'>
                Belum ada hasil kuis. Kerjakan kuis untuk mendapatkan skor! 📝
              </p>
            ) : (
              <div className='space-y-2'>
                {recentAttempts.map((att) => {
                  const stars = Math.min(3, Math.ceil(att.score / 35))
                  const isPerfect = att.score === 100

                  return (
                    <div
                      key={att.id}
                      className='flex items-center gap-2 px-2 py-1 rounded bg-slate-50'
                    >
                      <span className='w-6 h-6 rounded-flex flex-shrink-0 items-center justify-center'>
                        <span className='text-xs font-bold'>
                          {att.correct}/{att.total}
                        </span>
                      </span>
                      <span className='text-xs text-slate-600'>
                        {att.title} · {att.score}% · {stars} bintang
                      </span>
                      {isPerfect && (
                        <span className='text-xs text-green-600 font-bold'>
                          🏆 Semula!
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Card>

        {/* Badge Progress Overview */}
        <Card className='mt-6'>
          <div className='p-5'>
            <h3 className='font-display text-xl font-bold text-slate-900 mb-4'>
              Progres Badge
            </h3>
            <p className='text-slate-500 mb-3'>
              Lengkapi materi dan kuis untuk membuka badge-badge khusus!
            </p>
            <div className='grid grid-cols-3 gap-2'>
              {/* Example badge cards - can be expanded */}
              <div>
                <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold margin-auto mb-2'>
                  1️⃣
                </div>
                <p className='text-xs text-center font-medium text-slate-700'>Langkah Pertama</p>
                <p className='text-xs text-slate-400 center'>Selesaikan 1 materi</p>
              </div>
              <div>
                <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-sun-500 to-sun-600 flex items-center justify-center text-white text-xs font-bold margin-auto mb-2'>
                  2️⃣
                </div>
                <p className='text-xs text-center font-medium text-slate-700'>Kutu Buku</p>
                <p className='text-xs text-slate-400 center'>Selesaikan 5 materi</p>
              </div>
              <div>
                <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold margin-auto mb-2'>
                  3️⃣
                </div>
                <p className='text-xs text-center font-medium text-slate-700'>Pahlawan Matematika</p>
                <p className='text-xs text-slate-400 center'>Selesaikan 4 materi Matematika</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}