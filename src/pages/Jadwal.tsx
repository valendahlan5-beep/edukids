import { useState } from 'react'
import { CalendarDays, Plus, Trash2 } from 'lucide-react'
import { useStore } from '../lib/store'
import { subjectMap, subjects } from '../data/subjects'
import { Card, PageHeader } from '../components/UI'

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

export default function Jadwal() {
  const { user, db, addSchedule, deleteSchedule } = useStore()
  const [day, setDay] = useState(1)
  const [time, setTime] = useState('16:00')
  const [subjectId, setSubjectId] = useState('matematika')
  const [note, setNote] = useState('')

  const mine = db.schedules.filter((s) => s.userId === user?.id).sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))

  const add = () => {
    if (!user) return
    addSchedule({ userId: user.id, day, time, subjectId: subjectId as any, note: note || 'Belajar' })
    setNote('')
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Jadwal Belajar" subtitle="Atur waktu belajar setiap hari agar lebih disiplin." emoji="📅" />

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Tambah Jadwal</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="input py-2.5">
            {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
          </select>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input py-2.5" />
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="input py-2.5">
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.short}</option>)}
          </select>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Catatan" className="input py-2.5" />
        </div>
        <button onClick={add} className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> Tambah
        </button>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DAYS.map((d, i) => {
          const items = mine.filter((s) => s.day === i)
          if (!items.length) return null
          return (
            <Card key={i} className="p-4">
              <h4 className="font-display text-base font-bold text-slate-800">{d}</h4>
              <div className="mt-2 space-y-2">
                {items.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 rounded-xl border border-slate-100 p-2.5">
                    <span className="text-lg">{subjectMap[s.subjectId]?.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-700">{subjectMap[s.subjectId]?.short}</p>
                      <p className="text-[11px] font-semibold text-slate-400">{s.time} · {s.note}</p>
                    </div>
                    <button onClick={() => deleteSchedule(s.id)} className="text-slate-400 hover:text-rose-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
      {mine.length === 0 && <div className="card p-8 text-center text-sm font-semibold text-slate-500">Belum ada jadwal. Tambahkan jadwal belajarmu!</div>}
    </div>
  )
}