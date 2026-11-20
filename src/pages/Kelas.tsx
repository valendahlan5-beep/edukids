import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, GraduationCap, PlayCircle, Sparkles } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, gradeLabel } from '../lib/utils'
import { subjectMap } from '../data/subjects'
import { Card, PageHeader, ProgressBar } from '../components/UI'

export default function Kelas() {
  const { user, db } = useStore()
  const navigate = useNavigate()
  if (!user?.grade) return null
  const grade = user.grade
  const chapters = db.chapters.filter((c) => c.grade === grade).sort((a, b) => a.subjectId.localeCompare(b.subjectId) || a.order - b.order)
  const done = new Set(db.progress.filter((p) => p.userId === user.id && p.completed).map((p) => p.chapterId))

  const bySubject = useMemo(() => {
    const map: Record<string, typeof chapters> = {}
    chapters.forEach((c) => { (map[c.subjectId] ||= []).push(c) })
    return map
  }, [chapters])

  return (
    <div className="space-y-5">
      <PageHeader title={`Kelas Saya — Kelas ${grade}`} subtitle="Materi sesuai kelas dan semester yang sedang kamu pelajari." emoji="🎓" />

      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 text-2xl text-white">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <p className="font-display text-lg font-bold text-slate-800">Kelas {grade}</p>
            <p className="text-xs font-semibold text-slate-500">{chapters.length} materi · {done.size} selesai · {Math.round((done.size / Math.max(1, chapters.length)) * 100)}% kemajuan</p>
            <div className="mt-2"><ProgressBar value={(done.size / Math.max(1, chapters.length)) * 100} color="bg-brand-500" /></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(bySubject).map(([sid, list]) => {
          const s = subjectMap[sid]
          const doneCount = list.filter((c) => done.has(c.id)).length
          return (
            <Card key={sid} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-lg text-white`}>{s.emoji}</div>
                  <div>
                    <p className="font-display text-base font-bold text-slate-800">{s.short}</p>
                    <p className="text-xs font-semibold text-slate-400">{doneCount}/{list.length} selesai</p>
                  </div>
                </div>
                <button onClick={() => navigate(`/pelajaran/${sid}`)} className="text-xs font-extrabold text-brand-600">Lihat semua</button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {list.map((c) => (
                  <Link key={c.id} to={`/materi/${c.id}`} className="flex items-center gap-2 rounded-xl border border-slate-100 p-3 hover:bg-slate-50">
                    <span className="text-lg">{c.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-700">{c.title}</p>
                      <p className="text-[10px] font-semibold text-slate-400">Sem {c.semester} · {c.minutes} menit {done.has(c.id) && '· ✅'}</p>
                    </div>
                    <PlayCircle className="h-4 w-4 text-slate-300" />
                  </Link>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}