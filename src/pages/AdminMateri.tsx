import { useState } from 'react'
import { useStore } from '../lib/store'
import { subjectMap, subjects } from '../data/subjects'
import { Card, Modal, PageHeader } from '../components/UI'
import type { Chapter } from '../types'

export default function AdminMateri() {
  const { db, saveChapter, deleteChapter } = useStore()
  const [editing, setEditing] = useState<Chapter | null>(null)
  const [open, setOpen] = useState(false)
  const [filterSubject, setFilterSubject] = useState('all')
  const [filterGrade, setFilterGrade] = useState('all')

  const chapters = db.chapters.filter((c) => (filterSubject === 'all' || c.subjectId === filterSubject) && (filterGrade === 'all' || c.grade === Number(filterGrade)))

  const newChapter = (): Chapter => ({
    id: `ch_${Date.now()}`,
    subjectId: 'bindo',
    grade: 1,
    semester: 1,
    order: db.chapters.length + 1,
    title: 'Materi Baru',
    emoji: '📘',
    description: 'Deskripsi materi.',
    objectives: ['Tujuan 1'],
    sections: [{ heading: 'Pengantar', paragraphs: ['Paragraf penjelasan.'], bullets: [] }],
    summary: ['Rangkuman.'],
    minutes: 10,
    questionIds: [],
  })

  const save = () => { if (editing) { saveChapter(editing); setOpen(false); setEditing(null) } }

  return (
    <div className="space-y-5">
      <PageHeader title="Materi & Kurikulum" subtitle="Tambah, edit, dan hapus materi pembelajaran." emoji="📚" actions={
        <button onClick={() => { setEditing(newChapter()); setOpen(true) }} className="rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white">+ Materi Baru</button>
      } />

      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold">
            <option value="all">Semua Mapel</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.short}</option>)}
          </select>
          <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold">
            <option value="all">Semua Kelas</option>
            {[1,2,3,4,5,6].map((g) => <option key={g} value={g}>Kelas {g}</option>)}
          </select>
        </div>
      </Card>

      <div className="space-y-2">
        {chapters.map((c) => (
          <Card key={c.id} className="flex items-center gap-3 p-3">
            <span className="text-xl">{c.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-700">{c.title}</p>
              <p className="text-[11px] font-semibold text-slate-400">{subjectMap[c.subjectId]?.short} · Kelas {c.grade} · Sem {c.semester} · {c.questionIds.length} soal</p>
            </div>
            <button onClick={() => { setEditing({ ...c }); setOpen(true) }} className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-600">Edit</button>
            <button onClick={() => deleteChapter(c.id)} className="rounded-lg bg-rose-50 px-2 py-1 text-xs font-bold text-rose-600">Hapus</button>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setEditing(null) }} title="Edit Materi" wide>
        {editing && (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label">Judul</label>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" />
              </div>
              <div>
                <label className="label">Emoji</label>
                <input value={editing.emoji} onChange={(e) => setEditing({ ...editing, emoji: e.target.value })} className="input" />
              </div>
              <div>
                <label className="label">Mata Pelajaran</label>
                <select value={editing.subjectId} onChange={(e) => setEditing({ ...editing, subjectId: e.target.value as any })} className="input">
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.short}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Kelas</label>
                <select value={editing.grade} onChange={(e) => setEditing({ ...editing, grade: Number(e.target.value) as any })} className="input">
                  {[1,2,3,4,5,6].map((g) => <option key={g} value={g}>Kelas {g}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Semester</label>
                <select value={editing.semester} onChange={(e) => setEditing({ ...editing, semester: Number(e.target.value) as any })} className="input">
                  <option value={1}>1</option><option value={2}>2</option>
                </select>
              </div>
              <div>
                <label className="label">Durasi (menit)</label>
                <input type="number" value={editing.minutes} onChange={(e) => setEditing({ ...editing, minutes: Number(e.target.value) })} className="input" />
              </div>
            </div>
            <div>
              <label className="label">Deskripsi</label>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="input" rows={2} />
            </div>
            <div>
              <label className="label">Tujuan (satu per baris)</label>
              <textarea value={editing.objectives.join('\n')} onChange={(e) => setEditing({ ...editing, objectives: e.target.value.split('\n').filter(Boolean) })} className="input" rows={3} />
            </div>
            <div>
              <label className="label">Rangkuman (satu per baris)</label>
              <textarea value={editing.summary.join('\n')} onChange={(e) => setEditing({ ...editing, summary: e.target.value.split('\n').filter(Boolean) })} className="input" rows={3} />
            </div>
            <div>
              <label className="label">Bagian (JSON)</label>
              <textarea value={JSON.stringify(editing.sections, null, 2)} onChange={(e) => { try { setEditing({ ...editing, sections: JSON.parse(e.target.value) }) } catch { /* ignore */ } }} className="input font-mono text-xs" rows={8} />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => { setOpen(false); setEditing(null) }} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600">Batal</button>
              <button onClick={save} className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-extrabold text-white">Simpan</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}