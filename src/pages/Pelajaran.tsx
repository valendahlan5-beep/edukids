import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, ChevronRight, Search } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, gradeLabel } from '../lib/utils'
import { subjects } from '../data/subjects'
import { Card, PageHeader, SearchInput, Tabs } from '../components/UI'

export default function Pelajaran() {
  const { user, db } = useStore()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [gradeFilter, setGradeFilter] = useState<string>(user?.grade ? String(user.grade) : 'all')

  const gradeTabs = [
    { id: 'all', label: 'Semua Kelas' },
    ...[1, 2, 3, 4, 5, 6].map((g) => ({ id: String(g), label: `Kelas ${g}` })),
  ]

  const filteredSubjects = subjects.filter((s) => {
    if (query && !s.name.toLowerCase().includes(query.toLowerCase()) && !s.short.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-5">
      <PageHeader title="Semua Pelajaran" subtitle="Pilih mata pelajaran untuk melihat materi per kelas dan semester." emoji="📚" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Cari mata pelajaran..." className="sm:max-w-xs" />
      </div>

      <Tabs items={gradeTabs} value={gradeFilter} onChange={setGradeFilter} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.map((subject) => {
          const chapters = db.chapters.filter((c) => c.subjectId === subject.id && (gradeFilter === 'all' || c.grade === Number(gradeFilter)))
          const done = db.progress.filter((p) => p.userId === user?.id && p.completed && chapters.some((c) => c.id === p.chapterId)).length
          return (
            <Card key={subject.id} className="p-4" hover onClick={() => navigate(`/pelajaran/${subject.id}${gradeFilter !== 'all' ? `?grade=${gradeFilter}` : ''}`)}>
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.color} text-2xl shadow-md`}>
                  {subject.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-base font-bold text-slate-800">{subject.name}</h3>
                  <p className="line-clamp-1 text-xs font-semibold text-slate-400">{subject.tagline}</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-500">
                    {chapters.length} materi · {done} selesai
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300" />
              </div>
            </Card>
          )
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="card p-8 text-center text-sm font-semibold text-slate-500">Tidak ada pelajaran yang cocok.</div>
      )}
    </div>
  )
}