import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Play, Pause, Volume2 } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, gradeLabel } from '../lib/utils'
import { subjectMap } from '../data/subjects'
import { subjects } from '../data/subjects'
import { Card, PageHeader } from '../components/UI'

export default function Video() {
  const { user, db } = useStore()
  const [subjectFilter, setSubjectFilter] = useState<string>('all')
  const [gradeFilter, setGradeFilter] = useState<number>(user?.grade ?? 3)
  const [playing, setPlaying] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const chapters = db.chapters
    .filter((c) => (subjectFilter === 'all' || c.subjectId === subjectFilter) && c.grade === gradeFilter)
    .sort((a, b) => a.order - b.order)

  const toggle = (id: string) => {
    if (playing === id) { setPlaying(null); return }
    setPlaying(id); setProgress(0)
    const t = setInterval(() => {
      setProgress((p) => { if (p >= 100) { clearInterval(t); setPlaying(null); return 100 } return p + 2 })
    }, 200)
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Video Belajar" subtitle="Tonton penjelasan materi dalam bentuk video pendek yang menyenangkan." emoji="🎬" />

      <div className="flex flex-wrap items-center gap-3">
        <select value={gradeFilter} onChange={(e) => setGradeFilter(Number(e.target.value))} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
          {[1, 2, 3, 4, 5, 6].map((g) => <option key={g} value={g}>Kelas {g}</option>)}
        </select>
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
          <option value="all">Semua Pelajaran</option>
          {subjects.map((s) => <option key={s.id} value={s.id}>{s.short}</option>)}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c) => {
          const s = subjectMap[c.subjectId]
          const isPlaying = playing === c.id
          return (
            <Card key={c.id} className="overflow-hidden p-0">
              <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${s.color}`}>
                <span className="text-5xl">{c.emoji}</span>
                <button
                  onClick={() => toggle(c.id)}
                  className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg hover:scale-105"
                  aria-label={isPlaying ? 'Jeda' : 'Putar'}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30">
                    <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">{s.short} · {c.minutes} menit</p>
                <h3 className="mt-1 font-display text-base font-bold text-slate-800">{c.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs font-semibold text-slate-500">{c.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400"><Volume2 className="h-3.5 w-3.5" /> Audio narasi tersedia</span>
                  <Link to={`/materi/${c.id}`} className="text-xs font-extrabold text-brand-600">Baca materi →</Link>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      {chapters.length === 0 && <div className="card p-8 text-center text-sm font-semibold text-slate-500">Tidak ada video untuk filter ini.</div>}
    </div>
  )
}