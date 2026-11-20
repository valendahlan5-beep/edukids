import { useMemo, useState } from 'react'
import { Clock, TrendingUp, ShieldCheck, Users } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, formatMinutes, percent } from '../lib/utils'
import { subjectMap } from '../data/subjects'
import { Card, PageHeader, ProgressBar } from '../components/UI'

export default function OrangTua() {
  const { user, db, children, addChild, setChildLimit, resetChildProgress } = useStore()
  const [selectedChild, setSelectedChild] = useState(children[0]?.id ?? '')
  const [newChild, setNewChild] = useState({ name: '', email: '', password: '', grade: 3 as 1 | 2 | 3 | 4 | 5 | 6 })
  const [limit, setLimit] = useState(60)
  const [showAdd, setShowAdd] = useState(false)

  const child = db.users.find((u) => u.id === selectedChild) ?? children[0]
  const childProgress = useMemo(() => child ? db.progress.filter((p) => p.userId === child.id) : [], [db.progress, child])
  const childAttempts = useMemo(() => child ? db.attempts.filter((a) => a.userId === child.id) : [], [db.attempts, child])
  const childActivity = useMemo(() => child ? db.activity.filter((a) => a.userId === child.id) : [], [db.activity, child])
  const todayMinutes = childActivity.filter((a) => a.date === new Date().toISOString().slice(0, 10)).reduce((s, a) => s + a.minutes, 0)
  const totalMinutes = childActivity.reduce((s, a) => s + a.minutes, 0)
  const completedChapters = childProgress.filter((p) => p.completed).length
  const totalChapters = child ? db.chapters.filter((c) => c.grade === child.grade).length : 0
  const avgScore = childAttempts.length ? Math.round(childAttempts.reduce((s, a) => s + a.score, 0) / childAttempts.length) : 0

  const handleAdd = () => {
    const res = addChild(newChild)
    if (res.ok) { setShowAdd(false); setNewChild({ name: '', email: '', password: '', grade: 3 }) }
  }

  if (!user) return null

  return (
    <div className="space-y-5">
      <PageHeader title="Dashboard Orang Tua" subtitle="Pantau perkembangan belajar anak Anda." emoji="👨‍👩‍👧" />

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-slate-600">Pilih anak:</span>
          {children.map((c) => (
            <button key={c.id} onClick={() => { setSelectedChild(c.id); setLimit(c.timeLimitMinutes) }}
              className={cx('rounded-full px-3 py-1.5 text-xs font-extrabold', selectedChild === c.id ? 'bg-brand-600 text-white' : 'bg-white text-slate-500')}>
              {c.name}
            </button>
          ))}
          <button onClick={() => setShowAdd(true)} className="rounded-full bg-mint-500 px-3 py-1.5 text-xs font-extrabold text-white">+ Tambah Anak</button>
        </div>
      </Card>

      {showAdd && (
        <Card className="p-5">
          <h3 className="font-display text-base font-bold text-slate-800">Tambah Akun Anak</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input value={newChild.name} onChange={(e) => setNewChild({ ...newChild, name: e.target.value })} placeholder="Nama anak" className="input" />
            <input value={newChild.email} onChange={(e) => setNewChild({ ...newChild, email: e.target.value })} placeholder="Email" className="input" />
            <input value={newChild.password} onChange={(e) => setNewChild({ ...newChild, password: e.target.value })} placeholder="Password" className="input" />
            <select value={newChild.grade} onChange={(e) => setNewChild({ ...newChild, grade: Number(e.target.value) as any })} className="input">
              {[1, 2, 3, 4, 5, 6].map((g) => <option key={g} value={g}>Kelas {g}</option>)}
            </select>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={handleAdd} className="rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white">Simpan</button>
            <button onClick={() => setShowAdd(false)} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-extrabold text-slate-600">Batal</button>
          </div>
        </Card>
      )}

      {child && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Kelas</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{child.grade}</p>
              <p className="text-xs font-semibold text-slate-500">{child.name}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Materi Selesai</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{completedChapters}/{totalChapters}</p>
              <div className="mt-2"><ProgressBar value={percent(completedChapters, totalChapters)} color="bg-brand-500" height="h-1.5" /></div>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Rata-rata Nilai</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{avgScore}</p>
              <p className="text-xs font-semibold text-slate-500">{childAttempts.length} ujian</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Waktu Belajar Hari Ini</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{formatMinutes(todayMinutes)}</p>
              <p className="text-xs font-semibold text-slate-500">Total {formatMinutes(totalMinutes)}</p>
            </Card>
          </div>

          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Batas Waktu Layar</h3>
            <p className="text-xs font-semibold text-slate-500">Atur batas waktu belajar harian untuk {child.name}.</p>
            <div className="mt-3 flex items-center gap-3">
              <input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="input w-24 py-2" />
              <span className="text-sm font-semibold text-slate-500">menit/hari</span>
              <button onClick={() => setChildLimit(child.id, limit)} className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-extrabold text-white">Simpan</button>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Materi yang Belum Selesai</h3>
            <div className="mt-3 space-y-2">
              {db.chapters.filter((c) => c.grade === child.grade && !childProgress.some((p) => p.chapterId === c.id && p.completed)).slice(0, 8).map((c) => (
                <div key={c.id} className="flex items-center gap-2 rounded-xl border border-slate-100 p-2.5">
                  <span>{c.emoji}</span>
                  <span className="flex-1 text-sm font-bold text-slate-700">{c.title}</span>
                  <span className="text-[11px] font-semibold text-slate-400">{subjectMap[c.subjectId]?.short}</span>
                </div>
              ))}
              {db.chapters.filter((c) => c.grade === child.grade && !childProgress.some((p) => p.chapterId === c.id && p.completed)).length === 0 && (
                <p className="text-sm text-slate-500">Semua materi selesai! 🎉</p>
              )}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Riwayat Nilai</h3>
            <div className="mt-3 space-y-2">
              {childAttempts.slice(0, 10).map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-2.5">
                  <span>{a.score >= 80 ? '🌟' : a.score >= 60 ? '👍' : '💪'}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-700">{a.title}</p>
                    <p className="text-[10px] font-semibold text-slate-400">{new Date(a.createdAt).toLocaleDateString('id-ID')} · {a.correct}/{a.total}</p>
                  </div>
                  <span className="font-display text-lg font-bold text-slate-900">{a.score}</span>
                </div>
              ))}
              {childAttempts.length === 0 && <p className="text-sm text-slate-500">Belum ada riwayat.</p>}
            </div>
          </Card>

          <div className="flex justify-end">
            <button onClick={() => resetChildProgress(child.id)} className="rounded-xl border border-rose-200 px-4 py-2 text-xs font-extrabold text-rose-600 hover:bg-rose-50">
              Reset Progres Anak
            </button>
          </div>
        </>
      )}
    </div>
  )
}