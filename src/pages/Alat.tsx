import { useMemo, useState } from 'react'
import { Calculator, Search, Layers } from 'lucide-react'
import { useStore } from '../lib/store'
import { Card, PageHeader, Tabs } from '../components/UI'

export default function Alat() {
  const { db } = useStore()
  const [tab, setTab] = useState('kamus')
  const [q, setQ] = useState('')
  const [calc, setCalc] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const entries = useMemo(() => {
    if (!q) return db.dictionary
    return db.dictionary.filter((d) => d.word.toLowerCase().includes(q.toLowerCase()) || d.meaning.toLowerCase().includes(q.toLowerCase()))
  }, [db.dictionary, q])

  const calcResult = (() => {
    try {
      // eslint-disable-next-line no-eval
      const r = Function(`"use strict"; return (${calc.replace(/[^0-9+\-*/().% ]/g, '')})`)()
      return Number.isFinite(r) ? r : null
    } catch { return null }
  })()

  const flashcards = db.dictionary.map((d) => ({ front: d.word, back: d.meaning }))

  return (
    <div className="space-y-5">
      <PageHeader title="Alat Belajar" subtitle="Kamus pintar, kalkulator edukasi, dan flashcard." emoji="🧰" />
      <Tabs items={[{ id: 'kamus', label: 'Kamus Pintar' }, { id: 'kalkulator', label: 'Kalkulator' }, { id: 'flashcard', label: 'Flashcard' }]} value={tab} onChange={setTab} />

      {tab === 'kamus' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kata..." className="input pl-10" />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {entries.map((d) => (
              <Card key={d.word} className="p-4">
                <p className="font-display text-base font-bold text-slate-800">{d.word}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{d.meaning}</p>
                <p className="mt-1 text-[11px] font-semibold italic text-slate-400">Contoh: {d.example}</p>
                <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-500">{d.level}</span>
              </Card>
            ))}
          </div>
          {entries.length === 0 && <div className="card p-6 text-center text-sm text-slate-500">Kata tidak ditemukan.</div>}
        </div>
      )}

      {tab === 'kalkulator' && (
        <Card className="mx-auto max-w-md p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-600"><Calculator className="h-4 w-4" /> Kalkulator Edukasi</div>
          <input value={calc} onChange={(e) => setCalc(e.target.value)} placeholder="Contoh: 24 + 17 * 3" className="input mb-3 text-center text-xl font-mono" />
          <div className="grid grid-cols-4 gap-2">
            {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','+','C'].map((k) => (
              <button key={k} onClick={() => k === 'C' ? setCalc('') : setCalc((c) => c + k)}
                className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-50">
                {k}
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-brand-50 p-4 text-center">
            <p className="text-xs font-bold text-slate-500">Hasil</p>
            <p className="font-display text-3xl font-extrabold text-brand-600">{calcResult ?? '—'}</p>
          </div>
        </Card>
      )}

      {tab === 'flashcard' && (
        <div className="mx-auto max-w-md space-y-4">
          <Card className="flex h-48 cursor-pointer items-center justify-center p-6 text-center" onClick={() => setFlipped((f) => !f)}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{flipped ? 'Arti' : 'Kata'}</p>
              <p className="mt-2 font-display text-2xl font-extrabold text-slate-800">
                {flipped ? flashcards[cardIndex]?.back : flashcards[cardIndex]?.front}
              </p>
              <p className="mt-3 text-xs font-semibold text-slate-400">Klik untuk membalik</p>
            </div>
          </Card>
          <div className="flex items-center justify-between">
            <button onClick={() => { setCardIndex((i) => Math.max(0, i - 1)); setFlipped(false) }} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-extrabold text-slate-600">← Sebelumnya</button>
            <span className="text-xs font-bold text-slate-400">{cardIndex + 1}/{flashcards.length}</span>
            <button onClick={() => { setCardIndex((i) => Math.min(flashcards.length - 1, i + 1)); setFlipped(false) }} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-extrabold text-slate-600">Berikutnya →</button>
          </div>
        </div>
      )}
    </div>
  )
}