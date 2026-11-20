import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Brain, CalendarDays, Flame, Gamepad2, Sparkles, Star, Trophy } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, greet, levelInfo, percent } from '../lib/utils'
import { subjectMap } from '../data/subjects'
import { Mascot } from '../components/Mascot'
import { Avatar, Button, Card, ProgressBar, SectionHeader, StatTile } from '../components/UI'

export default function Beranda() {
  const { user, db, ensureDailyChallenge } = useStore()
  const navigate = useNavigate()
  if (!user) return null

  const level = levelInfo(user.points)
  const done = useMemo(() => new Set(db.progress.filter((p) => p.userId === user.id && p.completed).map((p) => p.chapterId)), [db.progress, user.id])
  const totalChapters = db.chapters.filter((c) => c.grade === user.grade).length
  const doneCount = db.chapters.filter((c) => c.grade === user.grade && done.has(c.id)).length
  const recent = db.attempts.filter((a) => a.userId === user.id).slice(0, 4)
  const nextChapters = db.chapters.filter((c) => c.grade === user.grade && !done.has(c.id)).sort((a, b) => a.order - b.order).slice(0, 4)
  const todayMinutes = db.activity.filter((a) => a.userId === user.id && a.date === new Date().toISOString().slice(0, 10)).reduce((s, a) => s + a.minutes, 0)

  useMemo(() => { if (user.id) ensureDailyChallenge(user.id) }, [user.id, ensureDailyChallenge])

  const challenge = db.dailyChallenges.find((c) => c.userId === user.id && c.date === new Date().toISOString().slice(0, 10))

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-indigo-700 p-6 text-white shadow-soft sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-100">{greet(user.name)}</p>
            <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
              Siap belajar hari ini? 🚀
            </h1>
            <p className="mt-1 max-w-md text-sm font-semibold text-blue-100">
              Kamu sudah menyelesaikan {doneCount} dari {totalChapters} materi di {user.grade && `Kelas ${user.grade}`}. Ayo lanjutkan!
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-extrabold">Lv.{level.level} {level.title}</span>
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-extrabold">🔥 {user.streak} hari streak</span>
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-extrabold">⏱️ {todayMinutes} menit hari ini</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <Mascot size={150} mood="happy" className="animate-float" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={BookOpen} label="Materi Selesai" value={`${doneCount}/${totalChapters}`} sub="kemajuan kurikulum" color="bg-brand-50 text-brand-600" />
        <StatTile icon={Star} label="Bintang" value={user.stars} sub="dari kuis & ujian" color="bg-sun-50 text-sun-600" />
        <StatTile icon={Trophy} label="Poin" value={user.points.toLocaleString('id-ID')} sub={`Level ${level.level}`} color="bg-mint-50 text-mint-600" />
        <StatTile icon={Flame} label="Streak" value={`${user.streak} hari`} sub="belajar berturut-turut" color="bg-coral-50 text-coral-600" />
      </div>

      <Card className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-extrabold text-slate-700">Menuju level berikutnya</p>
          <p className="text-xs font-bold text-slate-400">{level.current}/{level.next} poin</p>
        </div>
        <ProgressBar value={level.percent} color="bg-brand-500" showPercent />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <SectionHeader title="Tantangan Harian" subtitle="5 soal acak sesuai kelasmu" emoji="🌟" action={() => navigate('/kuis')} actionLabel="Kerjakan" />
          {challenge ? (
            <div className="rounded-2xl bg-sun-50 p-4">
              <p className="text-sm font-extrabold text-sun-700">
                {challenge.completed ? '✅ Sudah selesai hari ini!' : 'Belum dikerjakan. Ayo ambil bonus 50 poin!'}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {challenge.completed ? `Nilai: ${challenge.score}. Besok ada tantangan baru.` : 'Selesaikan 5 soal untuk mendapat poin tambahan.'}
              </p>
              {!challenge.completed && (
                <Button size="sm" className="mt-3" onClick={() => navigate('/kuis?tab=harian')}>Mulai Tantangan</Button>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Belum ada tantangan. Coba refresh.</p>
          )}
        </Card>

        <Card className="p-5">
          <SectionHeader title="Rekomendasi Materi" subtitle="Materi yang belum kamu selesaikan" emoji="📚" action={() => navigate('/pelajaran')} actionLabel="Semua" />
          <div className="space-y-2">
            {nextChapters.length === 0 && <p className="text-sm text-slate-500">Semua materi kelasmu sudah selesai. Hebat! 🎉</p>}
            {nextChapters.map((c) => {
              const s = subjectMap[c.subjectId]
              return (
                <Link key={c.id} to={`/materi/${c.id}`} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 hover:bg-slate-50">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-lg`}>{c.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-slate-800">{c.title}</p>
                    <p className="truncate text-xs font-semibold text-slate-400">{s.short} · {c.minutes} menit</p>
                  </div>
                  <Sparkles className="h-4 w-4 text-slate-300" />
                </Link>
              )
            })}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <SectionHeader title="Riwayat Nilai Terakhir" subtitle="Kuis dan ujian yang baru kamu kerjakan" emoji="📝" action={() => navigate('/prestasi')} actionLabel="Lihat semua" />
        {recent.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada riwayat. Yuk kerjakan kuis pertamamu!</p>
        ) : (
          <div className="space-y-2">
            {recent.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${a.score >= 80 ? 'bg-mint-50' : a.score >= 60 ? 'bg-sun-50' : 'bg-rose-50'}`}>
                  {a.score >= 80 ? '🌟' : a.score >= 60 ? '👍' : '💪'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-slate-800">{a.title}</p>
                  <p className="text-xs font-semibold text-slate-400">{new Date(a.createdAt).toLocaleDateString('id-ID')} · {a.correct}/{a.total} benar</p>
                </div>
                <span className="font-display text-lg font-bold text-slate-900">{a.score}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button variant="soft" onClick={() => navigate('/game')} icon={Gamepad2}>Game Edukasi</Button>
        <Button variant="soft" onClick={() => navigate('/ai')} icon={Brain}>Tanya Kiki</Button>
        <Button variant="soft" onClick={() => navigate('/jadwal')} icon={CalendarDays}>Jadwal</Button>
        <Button variant="soft" onClick={() => navigate('/alat')} icon={BookOpen}>Alat Belajar</Button>
      </div>
    </div>
  )
}