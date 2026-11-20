import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookOpen, CheckCircle2, ClipboardCheck, Clock, Play, RotateCcw, Trophy } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, isAnswerCorrect, shuffle } from '../lib/utils'
import { subjectMap, subjects } from '../data/subjects'
import { Card, EmptyState, PageHeader, Tabs } from '../components/UI'

type Tab = 'bab' | 'latihan' | 'mapel' | 'uts' | 'uas' | 'kenaikan' | 'harian'

const TABS: { id: Tab; label: string }[] = [
  { id: 'bab', label: 'Kuis Bab' },
  { id: 'latihan', label: 'Latihan Soal' },
  { id: 'mapel', label: 'Ujian Mapel' },
  { id: 'uts', label: 'UTS' },
  { id: 'uas', label: 'UAS' },
  { id: 'kenaikan', label: 'Kenaikan Kelas' },
  { id: 'harian', label: 'Tantangan Harian' },
]

export default function Kuis() {
  const { user, db, saveAttempt, completeDailyChallenge } = useStore()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState<Tab>((searchParams.get('tab') as Tab) || 'bab')
  const [chapterId, setChapterId] = useState(searchParams.get('chapter') || '')
  const [subjectId, setSubjectId] = useState('')
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [startedAt, setStartedAt] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  // timer
  useEffect(() => {
    if (!started || finished) return
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [started, finished])

  const grade = user?.grade ?? 3

  const buildQuestions = (kind: Tab) => {
    let pool: any[] = []
    if (kind === 'bab') {
      const ch = db.chapters.find((c) => c.id === chapterId)
      if (!ch) return []
      pool = db.questions.filter((q) => q.chapterId === chapterId)
    } else if (kind === 'latihan') {
      pool = db.questions.filter((q) => q.grade === grade && (!subjectId || q.subjectId === subjectId))
      pool = shuffle(pool).slice(0, 8)
    } else if (kind === 'mapel') {
      if (!subjectId) return []
      pool = db.questions.filter((q) => q.grade === grade && q.subjectId === subjectId)
      pool = shuffle(pool).slice(0, Math.min(12, pool.length))
    } else if (kind === 'uts' || kind === 'uas') {
      pool = db.questions.filter((q) => q.grade === grade)
      // spread across subjects
      const bySub: Record<string, any[]> = {}
      pool.forEach((q) => { (bySub[q.subjectId] ||= []).push(q) })
      const selected: any[] = []
      subjects.forEach((s) => {
        const arr = shuffle(bySub[s.id] || [])
        selected.push(...arr.slice(0, 2))
      })
      pool = shuffle(selected).slice(0, 15)
    } else if (kind === 'kenaikan') {
      pool = db.questions.filter((q) => q.grade === grade)
      pool = shuffle(pool).slice(0, 20)
    } else if (kind === 'harian') {
      const ch = db.dailyChallenges.find((c) => c.userId === user?.id && c.date === new Date().toISOString().slice(0, 10))
      if (!ch) return []
      pool = ch.questionIds.map((id) => db.questions.find((q) => q.id === id)).filter(Boolean)
    }
    return pool
  }

  const start = () => {
    const qs = buildQuestions(tab)
    if (!qs.length) return
    setQuestions(qs)
    setAnswers({})
    setFinished(false)
    setElapsed(0)
    setStartedAt(Date.now())
    setStarted(true)
  }

  const reset = () => {
    setStarted(false); setFinished(false); setQuestions([]); setAnswers({}); setElapsed(0)
  }

  const setAnswer = (qid: string, value: string | string[]) => setAnswers((a) => ({ ...a, [qid]: value }))

  const submit = () => {
    let correct = 0
    questions.forEach((q) => {
      if (isAnswerCorrect(q, answers[q.id] ?? (q.type === 'menjodohkan' ? [] : ''))) correct++
    })
    const kindMap: Record<Tab, string> = { bab: 'kuis-bab', latihan: 'latihan', mapel: 'ujian-mapel', uts: 'uts', uas: 'uas', kenaikan: 'kenaikan', harian: 'harian' }
    const titleMap: Record<Tab, string> = { bab: 'Kuis Bab', latihan: 'Latihan Soal', mapel: `Ujian ${subjectMap[subjectId]?.short ?? ''}`, uts: 'Ujian Tengah Semester', uas: 'Ujian Akhir Semester', kenaikan: 'Ujian Kenaikan Kelas', harian: 'Tantangan Harian' }
    if (tab === 'harian') {
      const score = questions.length ? Math.round((correct / questions.length) * 100) : 0
      completeDailyChallenge(score, questions.length, answers)
    } else {
      saveAttempt({
        kind: kindMap[tab] as any,
        title: titleMap[tab],
        subjectId: tab === 'mapel' || tab === 'bab' ? (tab === 'bab' ? db.chapters.find((c) => c.id === chapterId)?.subjectId : subjectId) as any : undefined,
        chapterId: tab === 'bab' ? chapterId : undefined,
        grade,
        questionIds: questions.map((q) => q.id),
        answers,
        correct,
        total: questions.length,
        durationSec: elapsed,
      })
    }
    setFinished(true)
  }

  const correctCount = questions.filter((q) => isAnswerCorrect(q, answers[q.id] ?? '')).length
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0

  if (!started) {
    return (
      <div className="space-y-5">
        <PageHeader title="Kuis & Ujian" subtitle="Uji pemahamanmu dengan berbagai jenis soal dan ujian." emoji="📝" />
        <Tabs items={TABS.map((t) => ({ id: t.id, label: t.label }))} value={tab} onChange={(v) => { setTab(v as Tab); reset() }} />

        <Card className="p-5">
          {tab === 'bab' && (
            <div className="space-y-3">
              <label className="label">Pilih materi (bab)</label>
              <select value={chapterId} onChange={(e) => setChapterId(e.target.value)} className="input">
                <option value="">-- pilih materi --</option>
                {db.chapters.filter((c) => c.grade === grade).sort((a, b) => a.title.localeCompare(b.title)).map((c) => (
                  <option key={c.id} value={c.id}>{subjectMap[c.subjectId]?.short} · {c.title}</option>
                ))}
              </select>
            </div>
          )}
          {(tab === 'latihan' || tab === 'mapel') && (
            <div className="space-y-3">
              <label className="label">{tab === 'mapel' ? 'Pilih mata pelajaran' : 'Filter mata pelajaran (opsional)'}</label>
              <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="input">
                <option value="">{tab === 'mapel' ? '-- pilih --' : 'Semua pelajaran'}</option>
                {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          )}
          {(tab === 'uts' || tab === 'uas' || tab === 'kenaikan') && (
            <p className="text-sm font-semibold text-slate-500">
              Soal akan diambil dari berbagai mata pelajaran Kelas {grade}. Siapkan dirimu, ya!
            </p>
          )}
          {tab === 'harian' && (
            <p className="text-sm font-semibold text-slate-500">
              {db.dailyChallenges.find((c) => c.userId === user?.id && c.date === new Date().toISOString().slice(0, 10))?.completed
                ? 'Tantangan hari ini sudah selesai. Besok ada tantangan baru! 🌟'
                : '5 soal acak sesuai kelasmu. Selesaikan untuk bonus poin!'}
            </p>
          )}

          <div className="mt-4">
            <button
              onClick={start}
              disabled={(tab === 'bab' && !chapterId) || (tab === 'mapel' && !subjectId) || (tab === 'harian' && db.dailyChallenges.find((c) => c.userId === user?.id && c.date === new Date().toISOString().slice(0, 10))?.completed)}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              <Play className="h-4 w-4" /> Mulai
            </button>
          </div>
        </Card>

        {/* history */}
        <Card className="p-5">
          <h3 className="font-display text-base font-bold text-slate-800">Riwayat Ujian</h3>
          <div className="mt-3 space-y-2">
            {db.attempts.filter((a) => a.userId === user?.id).slice(0, 8).map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-lg">{a.score >= 80 ? '🌟' : a.score >= 60 ? '👍' : '💪'}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-700">{a.title}</p>
                  <p className="text-[10px] font-semibold text-slate-400">{new Date(a.createdAt).toLocaleDateString('id-ID')} · {a.correct}/{a.total}</p>
                </div>
                <span className="font-display text-lg font-bold text-slate-900">{a.score}</span>
              </div>
            ))}
            {db.attempts.filter((a) => a.userId === user?.id).length === 0 && <p className="text-sm text-slate-500">Belum ada riwayat.</p>}
          </div>
        </Card>
      </div>
    )
  }

  // running / finished
  return (
    <div className="space-y-5">
      <PageHeader title={finished ? 'Hasil Ujian' : 'Sedang Mengerjakan'} subtitle={`${questions.length} soal · ${elapsed}s`} emoji="📝" />
      {!finished ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-600">Jawab semua soal, lalu kirim.</p>
            <span className="flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600"><Clock className="h-3.5 w-3.5" /> {elapsed}s</span>
          </div>
          <div className="space-y-4">
            {questions.map((q, i) => (
              <QuestionCard key={q.id} q={q} index={i} answer={answers[q.id]} onAnswer={(v) => setAnswer(q.id, v)} />
            ))}
          </div>
          <div className="sticky bottom-4 flex justify-end">
            <button onClick={submit} className="rounded-2xl bg-mint-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg hover:bg-mint-600">
              Kirim Jawaban ✅
            </button>
          </div>
        </>
      ) : (
        <ResultView questions={questions} answers={answers} score={score} onRetry={reset} />
      )}
    </div>
  )
}

function QuestionCard({ q, index, answer, onAnswer }: { q: any; index: number; answer: any; onAnswer: (v: any) => void }) {
  const subject = subjectMap[q.subjectId]
  return (
    <Card className="p-5">
      {q.story && (
        <div className="mb-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-600">
          <span className="font-extrabold text-slate-700">Cerita: </span>{q.story}
        </div>
      )}
      <p className="font-display text-base font-bold text-slate-800">
        <span className="mr-2 text-brand-600">{index + 1}.</span>{q.text}
      </p>

      {(q.type === 'pg' || q.type === 'cerita' || q.type === 'benar-salah') && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(q.options ?? []).map((opt: string) => (
            <button
              key={opt}
              onClick={() => onAnswer(opt)}
              className={cx('rounded-2xl border-2 px-4 py-2.5 text-left text-sm font-bold transition', answer === opt ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200')}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {(q.type === 'isian' || q.type === 'hitung') && (
        <input
          value={answer ?? ''}
          onChange={(e) => onAnswer(e.target.value)}
          className="input mt-3"
          placeholder={q.type === 'hitung' ? 'Ketik angka jawaban...' : 'Ketik jawaban...'}
        />
      )}

      {q.type === 'menjodohkan' && (
        <div className="mt-3 space-y-2">
          {(q.pairs ?? []).map((pair: [string, string], i: number) => {
            const current = Array.isArray(answer) ? answer[i] : (answer?.split('||')[i] ?? '')
            const rightOptions = (q.pairs ?? []).map((p: [string, string]) => p[1])
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1 rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">{pair[0]}</div>
                <span className="text-slate-400">→</span>
                <select
                  value={current}
                  onChange={(e) => {
                    const arr = Array.isArray(answer) ? [...answer] : (q.pairs ?? []).map((_: any, idx: number) => (answer?.split('||')[idx] ?? ''))
                    arr[i] = e.target.value
                    onAnswer(arr)
                  }}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold"
                >
                  <option value="">Pilih...</option>
                  {rightOptions.map((r: string) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            )
          })}
        </div>
      )}

      {q.type === 'susun-kata' && (
        <SusunKata q={q} answer={answer} onAnswer={onAnswer} />
      )}
    </Card>
  )
}

function SusunKata({ q, answer, onAnswer }: { q: any; answer: any; onAnswer: (v: any) => void }) {
  const words: string[] = q.options ?? []
  const selected: string[] = Array.isArray(answer) ? answer : (typeof answer === 'string' && answer ? answer.split(' ') : [])
  const remaining = words.filter((w, i) => {
    const usedCount = selected.filter((s) => s === w).length
    const totalCount = words.filter((x) => x === w).length
    return usedCount < totalCount
  })
  return (
    <div className="mt-3 space-y-3">
      <div className="flex min-h-[44px] flex-wrap gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-2">
        {selected.length === 0 && <span className="text-xs font-semibold text-slate-400">Klik kata di bawah untuk menyusun...</span>}
        {selected.map((w, i) => (
          <button key={i} onClick={() => onAnswer(selected.filter((_, idx) => idx !== i))} className="rounded-xl bg-brand-600 px-3 py-1.5 text-sm font-bold text-white">
            {w}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {remaining.map((w, i) => (
          <button key={i} onClick={() => onAnswer([...selected, w])} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 hover:border-brand-300">
            {w}
          </button>
        ))}
      </div>
    </div>
  )
}

function ResultView({ questions, answers, score, onRetry }: { questions: any[]; answers: any; score: number; onRetry: () => void }) {
  const correct = questions.filter((q) => isAnswerCorrect(q, answers[q.id] ?? '')).length
  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        <div className="text-5xl">{score >= 80 ? '🏆' : score >= 60 ? '👍' : '💪'}</div>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-slate-900">{score}</h2>
        <p className="text-sm font-semibold text-slate-500">{correct} dari {questions.length} benar</p>
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700">
            <RotateCcw className="h-4 w-4" /> Ulangi
          </button>
        </div>
      </Card>
      <div className="space-y-3">
        {questions.map((q, i) => {
          const userAns = answers[q.id]
          const ok = isAnswerCorrect(q, userAns ?? '')
          return (
            <Card key={q.id} className={cx('p-4', ok ? 'border-mint-200' : 'border-rose-200')}>
              <div className="flex items-start gap-2">
                <span className={cx('mt-0.5 text-lg', ok ? 'text-mint-500' : 'text-rose-500')}>{ok ? '✅' : '❌'}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{i + 1}. {q.text}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">Jawabanmu: <span className="font-bold">{Array.isArray(userAns) ? userAns.join(', ') : (userAns || '-')}</span></p>
                  <p className="text-xs font-semibold text-mint-600">Kunci: {q.answer}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{q.explanation}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}