import { useMemo } from 'react'
import { Users, BookOpen, ClipboardCheck, TrendingUp } from 'lucide-react'
import { useStore } from '../lib/store'
import { Card, PageHeader } from '../components/UI'

export default function Guru() {
  const { user, db } = useStore()
  const students = db.users.filter((u) => u.role === 'siswa' && u.school === user?.school)
  const avgPoints = students.length ? Math.round(students.reduce((s, u) => s + u.points, 0) / students.length) : 0
  const totalAttempts = db.attempts.filter((a) => students.some((s) => s.id === a.userId)).length

  return (
    <div className="space-y-5">
      <PageHeader title="Dashboard Guru" subtitle="Pantau siswa dan kelola materi & soal." emoji="👩‍🏫" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-bold uppercase text-slate-400">Jumlah Siswa</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{students.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-bold uppercase text-slate-400">Rata-rata Poin</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{avgPoints}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-bold uppercase text-slate-400">Total Ujian</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{totalAttempts}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-bold uppercase text-slate-400">Materi Tersedia</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{db.chapters.length}</p>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Daftar Siswa</h3>
        <div className="mt-3 space-y-2">
          {students.map((s) => {
            const attempts = db.attempts.filter((a) => a.userId === s.id)
            const avg = attempts.length ? Math.round(attempts.reduce((x, a) => x + a.score, 0) / attempts.length) : 0
            return (
              <div key={s.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <span className="text-2xl">{s.avatar}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700">{s.name}</p>
                  <p className="text-[11px] font-semibold text-slate-400">Kelas {s.grade} · {s.points} poin · {s.streak} hari streak</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold text-slate-900">{avg}</p>
                  <p className="text-[10px] font-semibold text-slate-400">rata-rata</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="p-4" hover>
          <a href="#/admin/materi" className="block">
            <BookOpen className="h-6 w-6 text-brand-600" />
            <p className="mt-2 font-display text-base font-bold text-slate-800">Kelola Materi</p>
            <p className="text-xs font-semibold text-slate-500">Tambah/edit materi kurikulum.</p>
          </a>
        </Card>
        <Card className="p-4" hover>
          <a href="#/admin/soal" className="block">
            <ClipboardCheck className="h-6 w-6 text-mint-600" />
            <p className="mt-2 font-display text-base font-bold text-slate-800">Bank Soal</p>
            <p className="text-xs font-semibold text-slate-500">Kelola soal dan kuis.</p>
          </a>
        </Card>
      </div>
    </div>
  )
}