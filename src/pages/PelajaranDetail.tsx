import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BookOpen, ChevronRight, Filter } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, gradeLabel } from '../lib/utils'
import { subjectMap } from '../data/subjects'
import { Card, PageHeader, Tabs } from '../components/UI'

export default function PelajaranDetail() {
  const { subjectId } = useParams()
  const [searchParams] = useSearchParams()
  const { user, db } = useStore()
  const navigate = useNavigate()
  const subject = subjectId ? subjectMap[subjectId] : undefined
  const [grade, setGrade] = useState<number>(Number(searchParams.get('grade')) || user?.grade || 1)
  const [semester, setSemester] = useState<string>('all')

  const chapters = useMemo(() => {
    if (!subjectId) return []
    return db.chapters
      .filter((c) => c.subjectId === subjectId && c.grade === grade && (semester === 'all' || c.semester === Number(semester)))
      .sort((a, b) => a.order - b.order)
  }, [db.chapters, subjectId, grade, semester])

  const done = new Set(db.progress.filter((p) => p.userId === user?.id && p.completed).map((p) => p.chapterId))

  if (!subject) return <div className="card p-6">Pelajaran tidak ditemukan.</div>

  return (
    <div className="space-y-5">
      <PageHeader title={subject.name} subtitle={subject.tagline} emoji={subject.emoji} back="/pelajaran" />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
          <Filter className="h-3.5 w-3.5" />
          <select value={grade} onChange={(e) => setGrade(Number(e.target.value))} className="bg-transparent outline-none">
            {[1, 2, 3, 4, 5, 6].map((g) => <option key={g} value={g}>Kelas {g}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          {['all', '1', '2'].map((s) => (
            <button
              key={s}
              onClick={() => setSemester(s)}
              className={cx('rounded-full px-3 py-1.5 text-xs font-extrabold', semester === s ? 'bg-brand-600 text-white' : 'bg-white text-slate-500')}
            >
              {s === 'all' ? 'Semua Semester' : `Semester ${s}`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {chapters.length === 0 && (
          <div className="card p-8 text-center text-sm font-semibold text-slate-500">Belum ada materi untuk filter ini.</div>
        )}
        {chapters.map((c, idx) => (
          <Link key={c.id} to={`/materi/${c.id}`} className="card card-hover flex items-center gap-4 p-4">
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.color} text-xl text-white shadow-md`}>
              {c.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-500">Bab {idx + 1}</span>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-extrabold text-brand-600">Semester {c.semester}</span>
                {done.has(c.id) && <span className="rounded-full bg-mint-50 px-2 py-0.5 text-[10px] font-extrabold text-mint-600">Selesai</span>}
              </div>
              <h3 className="mt-1 font-display text-base font-bold text-slate-800">{c.title}</h3>
              <p className="line-clamp-2 text-xs font-semibold text-slate-500">{c.description}</p>
              <p className="mt-1 text-[11px] font-bold text-slate-400">⏱️ {c.minutes} menit · {c.questionIds.length} soal</p>
            </div>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-300" />
          </Link>
        ))}
      </div>
    </div>
  )
}