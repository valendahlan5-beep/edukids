import { useMemo } from 'react'
import { useStore } from '../lib/store'
import { subjectMap } from '../data/subjects'
import { Card, PageHeader } from '../components/UI'

export default function AdminLaporan() {
  const { db } = useStore()
  const totalMinutes = db.activity.reduce((s, a) => s + a.minutes, 0)
  const byKind = useMemo(() => {
    const m: Record<string, number> = {}
    db.activity.forEach((a) => { m[a.kind] = (m[a.kind] ?? 0) + a.minutes })
    return m
  }, [db.activity])

  const bySubject = useMemo(() => {
    const m: Record<string, number> = {}
    db.attempts.forEach((a) => { if (a.subjectId) m[a.subjectId] = (m[a.subjectId] ?? 0) + 1 })
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }, [db.attempts])

  return (
    <div className="space-y-5">
      <PageHeader title="Laporan Aktivitas" subtitle="Pantau aktivitas belajar pengguna." emoji="📊" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Total Pengguna</p><p className="mt-1 font-display text-2xl font-extrabold">{db.users.length}</p></Card>
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Total Aktivitas</p><p className="mt-1 font-display text-2xl font-extrabold">{db.activity.length}</p></Card>
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Total Menit Belajar</p><p className="mt-1 font-display text-2xl font-extrabold">{totalMinutes}</p></Card>
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Total Ujian</p><p className="mt-1 font-display text-2xl font-extrabold">{db.attempts.length}</p></Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Aktivitas per Jenis</h3>
        <div className="mt-3 space-y-2">
          {Object.entries(byKind).map(([k, v]) => (
            <div key={k} className="flex items-center gap-3">
              <span className="w-24 text-sm font-bold text-slate-600">{k}</span>
              <div className="flex-1 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-brand-500" style={{ width: `${Math.min(100, (v / Math.max(1, totalMinutes)) * 100)}%` }} />
              </div>
              <span className="text-xs font-bold text-slate-500">{v} menit</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Ujian per Mata Pelajaran</h3>
        <div className="mt-3 space-y-2">
          {bySubject.map(([sid, count]) => (
            <div key={sid} className="flex items-center gap-3">
              <span className="w-32 text-sm font-bold text-slate-600">{subjectMap[sid]?.short ?? sid}</span>
              <div className="flex-1 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-mint-500" style={{ width: `${Math.min(100, count * 5)}%` }} />
              </div>
              <span className="text-xs font-bold text-slate-500">{count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Aktivitas Terbaru</h3>
        <div className="mt-3 space-y-2">
          {db.activity.slice(0, 15).map((a) => {
            const u = db.users.find((x) => x.id === a.userId)
            return (
              <div key={a.id} className="flex items-center gap-2 rounded-xl border border-slate-100 p-2.5 text-sm">
                <span>{u?.avatar ?? '👤'}</span>
                <span className="flex-1 font-bold text-slate-700">{u?.name} · {a.label}</span>
                <span className="text-[11px] text-slate-400">{a.date} · {a.minutes}m</span>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}