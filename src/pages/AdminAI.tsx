import { useState } from 'react'
import { useStore } from '../lib/store'
import { subjects } from '../data/subjects'
import { Card, Modal, PageHeader } from '../components/UI'
import type { AIEntry } from '../types'

export default function AdminAI() {
  const { db, saveAIEntry, deleteAIEntry } = useStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<AIEntry | null>(null)

  const newEntry = (): AIEntry => ({ id: `ai_${Date.now()}`, keywords: [], title: 'Topik Baru', answer: 'Penjelasan.', example: '', subjectId: undefined })

  const save = () => { if (editing) { saveAIEntry(editing); setOpen(false); setEditing(null) } }

  return (
    <div className="space-y-5">
      <PageHeader title="Konten AI Tutor" subtitle="Kelola pengetahuan yang digunakan AI Guru Pintar." emoji="🤖" actions={
        <button onClick={() => { setEditing(newEntry()); setOpen(true) }} className="rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white">+ Entri Baru</button>
      } />
      <div className="space-y-2">
        {db.aiKnowledge.map((a) => (
          <Card key={a.id} className="flex items-start gap-3 p-3">
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">{a.title}</p>
              <p className="text-[11px] font-semibold text-slate-400">{a.keywords.join(', ')}</p>
            </div>
            <button onClick={() => { setEditing({ ...a }); setOpen(true) }} className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-600">Edit</button>
            <button onClick={() => deleteAIEntry(a.id)} className="rounded-lg bg-rose-50 px-2 py-1 text-xs font-bold text-rose-600">Hapus</button>
          </Card>
        ))}
      </div>
      <Modal open={open} onClose={() => { setOpen(false); setEditing(null) }} title="Edit Pengetahuan AI" wide>
        {editing && (
          <div className="space-y-3">
            <div>
              <label className="label">Judul</label>
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Kata Kunci (satu per baris)</label>
              <textarea value={editing.keywords.join('\n')} onChange={(e) => setEditing({ ...editing, keywords: e.target.value.split('\n').filter(Boolean) })} className="input" rows={3} />
            </div>
            <div>
              <label className="label">Mata Pelajaran (opsional)</label>
              <select value={editing.subjectId ?? ''} onChange={(e) => setEditing({ ...editing, subjectId: (e.target.value || undefined) as any })} className="input">
                <option value="">-- tidak spesifik --</option>
                {subjects.map((s) => <option key={s.id} value={s.id}>{s.short}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Jawaban</label>
              <textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} className="input" rows={5} />
            </div>
            <div>
              <label className="label">Contoh</label>
              <textarea value={editing.example ?? ''} onChange={(e) => setEditing({ ...editing, example: e.target.value })} className="input" rows={2} />
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