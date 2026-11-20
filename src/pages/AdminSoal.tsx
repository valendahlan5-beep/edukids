import { useState } from 'react'
import { useStore } from '../lib/store'
import { subjectMap, subjects } from '../data/subjects'
import { Card, Modal, PageHeader } from '../components/UI'
import type { Question } from '../types'

export default function AdminSoal() {
  const { db, saveQuestion, deleteQuestion } = useStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Question | null>(null)
  const [filterSubject, setFilterSubject] = useState('all')
  const [filterGrade, setFilterGrade] = useState('all')

  const questions = db.questions.filter((q) => (filterSubject === 'all' || q.subjectId === filterSubject) && (filterGrade === 'all' || q.grade === Number(filterGrade)))

  const newQ = (): Question => ({
    id: `q_${Date.now()}`,
    chapterId: db.chapters[0]?.id ?? '',
    subjectId: 'bindo',
    grade: 1,
    semester: 1,
    type: 'pg',
    text: 'Pertanyaan baru',
    options: ['A', 'B', 'C'],
    answer: 'A',
    explanation: 'Penjelasan.',
    points: 10,
    difficulty: 'mudah',
  })

  const save = () => { if (editing) { saveQuestion(editing); setOpen(false); setEditing(null) } }

  return (
    <div className="space-y-5">
      <PageHeader title="Bank Soal" subtitle="Kelola soal untuk kuis dan ujian." emoji="📝" actions={
        <button onClick={() => { setEditing(newQ()); setOpen(true) }} className="rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white">+ Soal Baru</button>
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
        {questions.slice(0, 60).map((q) => (
          <Card key={q.id} className="flex items-start gap-3 p-3">
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">{q.text}</p>
              <p className="text-[11px] font-semibold text-slate-400">{subjectMap[q.subjectId]?.short} · Kelas {q.grade} · {q.type} · Kunci: {q.answer}</p>
            </div>
            <button onClick={() => { setEditing({ ...q }); setOpen(true) }} className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-600">Edit</button>
            <button onClick={() => deleteQuestion(q.id)} className="rounded-lg bg-rose-50 px-2 py-1 text-xs font-bold text-rose-600">Hapus</button>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setEditing(null) }} title="Edit Soal" wide>
        {editing && (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
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
                <label className="label">Tipe Soal</label>
                <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value as any })} className="input">
                  {['pg','benar-salah','isian','menjodohkan','susun-kata','hitung','cerita'].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Bab/Chapter ID</label>
                <select value={editing.chapterId} onChange={(e) => setEditing({ ...editing, chapterId: e.target.value })} className="input">
                  {db.chapters.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Kunci Jawaban</label>
                <input value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} className="input" />
              </div>
            </div>
            <div>
              <label className="label">Pertanyaan</label>
              <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className="input" rows={2} />
            </div>
            <div>
              <label className="label">Cerita (opsional)</label>
              <textarea value={editing.story ?? ''} onChange={(e) => setEditing({ ...editing, story: e.target.value })} className="input" rows={2} />
            </div>
            <div>
              <label className="label">Opsi (satu per baris, untuk PG/Benar-Salah/Cerita)</label>
              <textarea value={(editing.options ?? []).join('\n')} onChange={(e) => setEditing({ ...editing, options: e.target.value.split('\n') })} className="input" rows={3} />
            </div>
            <div>
              <label className="label">Pasangan Menjodohkan (JSON array of [kiri, kanan])</label>
              <textarea value={JSON.stringify(editing.pairs ?? [], null, 2)} onChange={(e) => { try { setEditing({ ...editing, pairs: JSON.parse(e.target.value) }) } catch {} }} className="input font-mono text-xs" rows={4} />
            </div>
            <div>
              <label className="label">Penjelasan</label>
              <textarea value={editing.explanation} onChange={(e) => setEditing({ ...editing, explanation: e.target.value })} className="input" rows={2} />
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