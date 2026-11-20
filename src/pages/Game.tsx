import { useEffect, useMemo, useState } from 'react'
import { pictureQuiz, englishWords, scrambleWords, matchPairs, wordBank } from '../data/games'
import { useStore } from '../lib/store'
import { cx, shuffle } from '../lib/utils'
import { Card, EmptyState, PageHeader } from '../components/UI'

const GAMES = [
  { id: 'tebak-gambar', name: 'Tebak Gambar', emoji: '🖼️', desc: 'Tebak nama benda dari emoji.' },
  { id: 'puzzle', name: 'Puzzle Edukasi', emoji: '🧩', desc: 'Susun angka 1–8.' },
  { id: 'tebak-kata', name: 'Tebak Kata', emoji: '🔤', desc: 'Tebak kata rahasia.' },
  { id: 'kuis-cepat', name: 'Kuis Kilat', emoji: '⚡', desc: 'Soal dalam 60 detik.' },
  { id: 'berhitung-cepat', name: 'Berhitung Cepat', emoji: '🧮', desc: 'Hitung secepat kilat.' },
  { id: 'susun-huruf', name: 'Susun Huruf', emoji: '🔡', desc: 'Acak huruf jadi kata.' },
  { id: 'mencocokkan', name: 'Mencocokkan Gambar', emoji: '🃏', desc: 'Temukan pasangan.' },
  { id: 'english-game', name: 'English Match', emoji: '🌍', desc: 'Kosakata Inggris.' },
  { id: 'petualangan', name: 'Petualangan Soal', emoji: '🗺️', desc: '5 tantangan soal.' },
]

export default function Game() {
  const { user, db, recordGame } = useStore()
  const [selected, setSelected] = useState<string | null>(null)
  const [finishedScore, setFinishedScore] = useState<number | null>(null)

  const handleFinish = (gameId: string, score: number, points: number) => {
    recordGame(gameId, score, points, 2)
    setFinishedScore(score)
  }

  if (selected) {
    return (
      <div className="space-y-4">
        <button onClick={() => { setSelected(null); setFinishedScore(null) }} className="text-sm font-extrabold text-brand-600">← Kembali ke daftar game</button>
        {finishedScore !== null && (
          <div className="card p-4 text-center">
            <p className="font-display text-2xl font-extrabold text-slate-900">Skor: {finishedScore}</p>
            <p className="text-sm font-semibold text-slate-500">Poin sudah ditambahkan ke akunmu 🎉</p>
          </div>
        )}
        <GameRunner gameId={selected} questions={db.questions.filter((q) => q.grade === (user?.grade ?? 3))} onFinish={(score, points) => handleFinish(selected, score, points)} />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Game Edukasi" subtitle="Belajar sambil bermain. Kumpulkan poin dan bintang!" emoji="🎮" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g) => {
          const def = db.games.find((x) => x.id === g.id)
          return (
            <Card key={g.id} className="p-4" hover onClick={() => { setSelected(g.id); setFinishedScore(null) }}>
              <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${def?.color ?? 'from-brand-400 to-indigo-500'} text-2xl text-white shadow-md`}>
                {g.emoji}
              </div>
              <h3 className="font-display text-base font-bold text-slate-800">{g.name}</h3>
              <p className="mt-1 text-xs font-semibold text-slate-500">{g.desc}</p>
              <p className="mt-2 text-[11px] font-bold text-slate-400">{def?.points ?? 15} poin · {def?.minutes ?? 2} menit</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function GameRunner({ gameId, questions, onFinish }: { gameId: string; questions: any[]; onFinish: (score: number, points: number) => void }) {
  switch (gameId) {
    case 'tebak-gambar': return <TebakGambar onFinish={onFinish} />
    case 'puzzle': return <Puzzle onFinish={onFinish} />
    case 'tebak-kata': return <TebakKata onFinish={onFinish} />
    case 'kuis-cepat': return <KuisCepat questions={questions} onFinish={onFinish} />
    case 'berhitung-cepat': return <BerhitungCepat onFinish={onFinish} />
    case 'susun-huruf': return <SusunHuruf onFinish={onFinish} />
    case 'mencocokkan': return <Mencocokkan onFinish={onFinish} />
    case 'english-game': return <EnglishGame onFinish={onFinish} />
    case 'petualangan': return <Petualangan questions={questions} onFinish={onFinish} />
    default: return <div>Game tidak ditemukan.</div>
  }
}

// ---- individual games ----

function TebakGambar({ onFinish }: { onFinish: (s: number, p: number) => void }) {
  const [items] = useState(() => shuffle(pictureQuiz).slice(0, 10))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const done = i >= items.length
  useEffect(() => { if (done) onFinish(score, score * 2 + 5) }, [done, score, onFinish])
  if (done) return <div className="card p-6 text-center"><p className="font-display text-2xl font-bold">Selesai! Skor {score}/{items.length}</p></div>
  const item = items[i]
  return (
    <Card className="p-6 text-center">
      <p className="text-sm font-bold text-slate-500">Soal {i + 1}/{items.length}</p>
      <div className="my-4 text-7xl">{item.emoji}</div>
      <p className="mb-4 font-display text-lg font-bold text-slate-800">Apa nama benda/hewan ini?</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {item.options.map((o) => (
          <button key={o} onClick={() => { if (o === item.answer) setScore((s) => s + 1); setI((x) => x + 1) }}
            className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300">
            {o}
          </button>
        ))}
      </div>
    </Card>
  )
}

function Puzzle({ onFinish }: { onFinish: (s: number, p: number) => void }) {
  const [tiles, setTiles] = useState(() => shuffle([1, 2, 3, 4, 5, 6, 7, 8, 0]))
  const [moves, setMoves] = useState(0)
  const solved = tiles.every((t, i) => t === (i === 8 ? 0 : i + 1))
  useEffect(() => { if (solved && moves > 0) onFinish(1, 25) }, [solved, moves, onFinish])
  const move = (idx: number) => {
    const empty = tiles.indexOf(0)
    const can = [idx - 1, idx + 1, idx - 3, idx + 3].includes(empty) && !(idx % 3 === 0 && empty === idx - 1) && !(idx % 3 === 2 && empty === idx + 1)
    if (!can) return
    const next = [...tiles]; [next[idx], next[empty]] = [next[empty], next[idx]]; setTiles(next); setMoves((m) => m + 1)
  }
  return (
    <Card className="p-6">
      <p className="mb-3 text-center text-sm font-bold text-slate-500">Geser kotak ke ruang kosong. Langkah: {moves}</p>
      <div className="mx-auto grid w-64 grid-cols-3 gap-2">
        {tiles.map((t, i) => (
          <button key={i} onClick={() => move(i)} className={`flex h-20 items-center justify-center rounded-2xl text-2xl font-extrabold ${t === 0 ? 'bg-slate-100' : 'bg-brand-600 text-white shadow-md'}`}>
            {t === 0 ? '' : t}
          </button>
        ))}
      </div>
      {solved && moves > 0 && <p className="mt-4 text-center font-display text-xl font-bold text-mint-600">🎉 Berhasil!</p>}
    </Card>
  )
}

function TebakKata({ onFinish }: { onFinish: (s: number, p: number) => void }) {
  const words = ['PELANGI', 'GAJAH', 'BUKU', 'MANGGA', 'SEKOLAH']
  const [word] = useState(() => words[Math.floor(Math.random() * words.length)])
  const [guessed, setGuessed] = useState<string[]>([])
  const [wrong, setWrong] = useState(0)
  const maxWrong = 6
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const display = word.split('').map((l) => (guessed.includes(l) ? l : '_')).join(' ')
  const won = word.split('').every((l) => guessed.includes(l))
  const lost = wrong >= maxWrong
  useEffect(() => { if (won) onFinish(1, 20); if (lost) onFinish(0, 0) }, [won, lost, onFinish])
  const guess = (l: string) => {
    if (guessed.includes(l) || won || lost) return
    setGuessed((g) => [...g, l])
    if (!word.includes(l)) setWrong((w) => w + 1)
  }
  return (
    <Card className="p-6 text-center">
      <p className="text-sm font-bold text-slate-500">Kesalahan: {wrong}/{maxWrong}</p>
      <div className="my-4 font-mono text-3xl font-extrabold tracking-widest text-slate-800">{display}</div>
      {won && <p className="mb-3 text-mint-600 font-bold">🎉 Kamu menang!</p>}
      {lost && <p className="mb-3 text-rose-600 font-bold">Kata: {word}</p>}
      <div className="flex flex-wrap justify-center gap-1.5">
        {letters.map((l) => (
          <button key={l} onClick={() => guess(l)} disabled={guessed.includes(l)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-brand-50 disabled:opacity-40">
            {l}
          </button>
        ))}
      </div>
    </Card>
  )
}

function KuisCepat({ questions, onFinish }: { questions: any[]; onFinish: (s: number, p: number) => void }) {
  const pool = useMemo(() => shuffle(questions).slice(0, 15), [questions])
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(60)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (done) return
    const t = setInterval(() => setTime((x) => { if (x <= 1) { setDone(true); return 0 } return x - 1 }), 1000)
    return () => clearInterval(t)
  }, [done])
  useEffect(() => { if (done) onFinish(score, score * 3) }, [done, score, onFinish])
  useEffect(() => { if (i >= pool.length) setDone(true) }, [i, pool.length])
  if (done) return <div className="card p-6 text-center"><p className="font-display text-2xl font-bold">Waktu habis! Skor {score}</p></div>
  const q = pool[i]
  if (!q) return null
  return (
    <Card className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-500">Soal {i + 1}</span>
        <span className="rounded-full bg-coral-50 px-3 py-1 text-xs font-extrabold text-coral-600">⏱️ {time}s</span>
      </div>
      <p className="mb-3 font-display text-base font-bold text-slate-800">{q.text}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {(q.options ?? ['Benar', 'Salah']).map((o: string) => (
          <button key={o} onClick={() => { if (o === q.answer) setScore((s) => s + 1); setI((x) => x + 1) }}
            className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300">
            {o}
          </button>
        ))}
      </div>
    </Card>
  )
}

function BerhitungCepat({ onFinish }: { onFinish: (s: number, p: number) => void }) {
  const [problems] = useState(() => Array.from({ length: 15 }, () => {
    const a = Math.floor(Math.random() * 20) + 1
    const b = Math.floor(Math.random() * 20) + 1
    const ops = ['+', '-', '*']
    const op = ops[Math.floor(Math.random() * ops.length)]
    const ans = op === '+' ? a + b : op === '-' ? a - b : a * b
    return { a, b, op, ans, expr: `${a} ${op} ${b}` }
  }))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [input, setInput] = useState('')
  const [time, setTime] = useState(60)
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (done) return
    const t = setInterval(() => setTime((x) => { if (x <= 1) { setDone(true); return 0 } return x - 1 }), 1000)
    return () => clearInterval(t)
  }, [done])
  useEffect(() => { if (done) onFinish(score, score * 2) }, [done, score, onFinish])
  useEffect(() => { if (i >= problems.length) setDone(true) }, [i, problems.length])
  if (done) return <div className="card p-6 text-center"><p className="font-display text-2xl font-bold">Selesai! Skor {score}/{problems.length}</p></div>
  const p = problems[i]
  const check = () => {
    if (Number(input) === p.ans) setScore((s) => s + 1)
    setInput(''); setI((x) => x + 1)
  }
  return (
    <Card className="p-6 text-center">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-500">Soal {i + 1}/{problems.length}</span>
        <span className="rounded-full bg-coral-50 px-3 py-1 text-xs font-extrabold text-coral-600">⏱️ {time}s</span>
      </div>
      <p className="my-4 font-display text-3xl font-extrabold text-slate-800">{p.expr} = ?</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && check()} className="input mb-3 text-center text-xl" autoFocus />
      <button onClick={check} className="rounded-2xl bg-brand-600 px-6 py-2.5 text-sm font-extrabold text-white">Jawab</button>
    </Card>
  )
}

function SusunHuruf({ onFinish }: { onFinish: (s: number, p: number) => void }) {
  const [items] = useState(() => shuffle(scrambleWords).slice(0, 8))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [input, setInput] = useState('')
  const done = i >= items.length
  useEffect(() => { if (done) onFinish(score, score * 3) }, [done, score, onFinish])
  if (done) return <div className="card p-6 text-center"><p className="font-display text-2xl font-bold">Selesai! Skor {score}/{items.length}</p></div>
  const item = items[i]
  const scrambled = shuffle(item.word.split('')).join('')
  const check = () => {
    if (input.toUpperCase().replace(/\s/g, '') === item.word.replace(/\s/g, '')) setScore((s) => s + 1)
    setInput(''); setI((x) => x + 1)
  }
  return (
    <Card className="p-6 text-center">
      <p className="text-sm font-bold text-slate-500">Soal {i + 1}/{items.length}</p>
      <p className="my-2 text-xs font-semibold text-slate-400">Petunjuk: {item.hint}</p>
      <p className="my-4 font-mono text-3xl font-extrabold tracking-widest text-brand-600">{scrambled}</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && check()} className="input mb-3 text-center" autoFocus />
      <button onClick={check} className="rounded-2xl bg-brand-600 px-6 py-2.5 text-sm font-extrabold text-white">Cek</button>
    </Card>
  )
}

function Mencocokkan({ onFinish }: { onFinish: (s: number, p: number) => void }) {
  const pairs = useMemo(() => shuffle(matchPairs).slice(0, 6), [])
  const cards = useMemo(() => shuffle([...pairs.map((p) => ({ id: p.name, type: 'name', value: p.name })), ...pairs.map((p) => ({ id: p.name, type: 'emoji', value: p.emoji }))]), [pairs])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)
  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped.map((i) => cards[i])
      if (a.id === b.id && a.type !== b.type) {
        setMatched((m) => new Set(m).add(a.id)); setFlipped([])
      } else {
        const t = setTimeout(() => setFlipped([]), 800)
        return () => clearTimeout(t)
      }
    }
  }, [flipped, cards])
  useEffect(() => { if (matched.size === pairs.length) onFinish(matched.size, 20) }, [matched, pairs, onFinish])
  return (
    <Card className="p-6">
      <p className="mb-3 text-center text-sm font-bold text-slate-500">Pasangan ditemukan: {matched.size}/{pairs.length} · Langkah: {moves}</p>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {cards.map((c, i) => {
          const isFlipped = flipped.includes(i) || matched.has(c.id)
          return (
            <button key={i} onClick={() => { if (isFlipped || flipped.length === 2) return; setFlipped((f) => [...f, i]); setMoves((m) => m + 1) }}
              className={`flex h-16 items-center justify-center rounded-xl text-xl font-bold ${isFlipped ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {isFlipped ? c.value : '?'}
            </button>
          )
        })}
      </div>
    </Card>
  )
}

function EnglishGame({ onFinish }: { onFinish: (s: number, p: number) => void }) {
  const [items] = useState(() => shuffle(englishWords).slice(0, 8))
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const done = i >= items.length
  useEffect(() => { if (done) onFinish(score, score * 2 + 5) }, [done, score, onFinish])
  if (done) return <div className="card p-6 text-center"><p className="font-display text-2xl font-bold">Selesai! Skor {score}/{items.length}</p></div>
  const item = items[i]
  const options = shuffle([item.id, ...shuffle(englishWords.filter((w) => w.id !== item.id)).slice(0, 3).map((w) => w.id)])
  return (
    <Card className="p-6 text-center">
      <p className="text-sm font-bold text-slate-500">Soal {i + 1}/{items.length}</p>
      <div className="my-4 text-6xl">{item.emoji}</div>
      <p className="mb-4 font-display text-xl font-bold text-slate-800">{item.en}</p>
      <p className="mb-3 text-xs font-semibold text-slate-400">Pilih arti dalam Bahasa Indonesia:</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <button key={o} onClick={() => { if (o === item.id) setScore((s) => s + 1); setI((x) => x + 1) }}
            className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300">
            {o}
          </button>
        ))}
      </div>
    </Card>
  )
}

function Petualangan({ questions, onFinish }: { questions: any[]; onFinish: (s: number, p: number) => void }) {
  const pool = useMemo(() => shuffle(questions).slice(0, 5), [questions])
  const [i, setI] = useState(0)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => { if (done) onFinish(score, score * 6) }, [done, score, onFinish])
  useEffect(() => { if (i >= pool.length || lives <= 0) setDone(true) }, [i, lives, pool.length])
  if (done) return <div className="card p-6 text-center"><p className="font-display text-2xl font-bold">{lives <= 0 ? '💀 Nyawa habis!' : '🎉 Petualangan selesai!'}</p><p className="text-slate-500">Skor {score}/{pool.length}</p></div>
  const q = pool[i]
  if (!q) return null
  return (
    <Card className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-500">Tantangan {i + 1}/{pool.length}</span>
        <span className="text-sm font-bold text-rose-500">❤️ {lives}</span>
      </div>
      <p className="mb-3 font-display text-base font-bold text-slate-800">{q.text}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {(q.options ?? []).map((o: string) => (
          <button key={o} onClick={() => {
            if (o === q.answer) setScore((s) => s + 1); else setLives((l) => l - 1); setI((x) => x + 1)
          }} className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-brand-300">
            {o}
          </button>
        ))}
      </div>
    </Card>
  )
}