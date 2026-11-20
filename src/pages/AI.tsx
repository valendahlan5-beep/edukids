import { useEffect, useRef, useState } from 'react'
import { Bot, Send, Sparkles, Trash2 } from 'lucide-react'
import { useStore } from '../lib/store'
import { answerAI } from '../lib/aiEngine'
import { Card, PageHeader } from '../components/UI'
import { Mascot } from '../components/Mascot'

export default function AI() {
  const { user, db, addChat, clearChat } = useStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const messages = db.chat.filter((c) => c.userId === user?.id)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length, loading])

  const send = (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || !user) return
    addChat('user', q)
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const result = answerAI(q, db, user)
      addChat('ai', result.text, result.suggestions)
      setLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-4">
      <PageHeader title="AI Guru Pintar" subtitle="Tanya Kiki tentang pelajaran. Kiki menjelaskan langkah-langkah, bukan sekadar jawaban." emoji="🤖" />

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <Card className="flex h-[60vh] flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Mascot size={120} mood="happy" />
                <p className="mt-3 font-display text-lg font-bold text-slate-800">Hai! Aku Kiki 👋</p>
                <p className="text-sm font-semibold text-slate-500">Tanya aku tentang pelajaran, minta contoh soal, atau minta bantuan berhitung.</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed ${m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {m.role === 'ai' && <div className="mb-1 flex items-center gap-1.5 text-xs font-extrabold text-brand-600"><Bot className="h-3.5 w-3.5" /> Kiki</div>}
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {m.suggestions && m.role === 'ai' && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <button key={s} onClick={() => send(s)} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-brand-600 hover:bg-brand-50">{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500">Kiki sedang berpikir... 🤔</div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="border-t border-slate-100 p-3">
            <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tulis pertanyaanmu..." className="input py-2.5" />
              <button type="submit" disabled={loading || !input.trim()} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Card>

        <div className="space-y-3">
          <Card className="p-4">
            <h3 className="font-display text-sm font-bold text-slate-800">Contoh pertanyaan</h3>
            <div className="mt-2 space-y-1.5">
              {['Jelaskan pecahan sederhana', 'Apa itu fotosintesis?', 'Buatkan 3 soal kelas ' + (user?.grade ?? 3), 'Hitung 24 + 17', 'Rekomendasi materi untukku', 'Tips belajar efektif'].map((s) => (
                <button key={s} onClick={() => send(s)} className="block w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-left text-xs font-bold text-slate-600 hover:bg-brand-50">
                  {s}
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="font-display text-sm font-bold text-slate-800">Kiki siap membantu</h3>
            <ul className="mt-2 space-y-1 text-xs font-semibold text-slate-500">
              <li>• Menjelaskan materi dengan sederhana</li>
              <li>• Memberi contoh soal + langkah</li>
              <li>• Membuat latihan soal</li>
              <li>• Membantu berhitung</li>
              <li>• Memberi rekomendasi materi</li>
            </ul>
            <button onClick={() => clearChat()} className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50">
              <Trash2 className="h-3.5 w-3.5" /> Hapus riwayat chat
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}