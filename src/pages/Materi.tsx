import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Headphones, ListChecks, PlayCircle, Volume2 } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx } from '../lib/utils'
import { subjectMap } from '../data/subjects'
import { Card, PageHeader, ProgressBar } from '../components/UI'

export default function Materi() {
  const { chapterId } = useParams()
  const { db, user, completeChapter, recordReading } = useStore()
  const chapter = db.chapters.find((c) => c.id === chapterId)
  const subject = chapter ? subjectMap[chapter.subjectId] : undefined
  const [reading, setReading] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const done = db.progress.some((p) => p.userId === user?.id && p.chapterId === chapterId && p.completed)

  useEffect(() => {
    if (!reading) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [reading])

  useEffect(() => {
    return () => {
      if (seconds > 0 && chapterId) recordReading(chapterId, seconds / 60)
    }
  }, [seconds, chapterId, recordReading])

  if (!chapter || !subject) return <div className="card p-6">Materi tidak ditemukan.</div>

  const questions = db.questions.filter((q) => q.chapterId === chapter.id)

  const speak = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text)
        u.lang = 'id-ID'
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(u)
      }
    } catch { /* ignore */ }
  }

  const handleComplete = () => {
    completeChapter(chapter.id, Math.max(1, Math.round(seconds / 60) || chapter.minutes))
    setReading(false)
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={chapter.title}
        subtitle={`${subject.name} · Kelas ${chapter.grade} · Semester ${chapter.semester}`}
        emoji={chapter.emoji}
        back="/pelajaran"
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {chapter.minutes} menit</span>
              <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {questions.length} soal</span>
              {done && <span className="rounded-full bg-mint-50 px-2 py-0.5 text-mint-600">✅ Selesai</span>}
            </div>
            <h2 className="mt-3 font-display text-lg font-bold text-slate-800">Tujuan Pembelajaran</h2>
            <ul className="mt-2 space-y-1.5">
              {chapter.objectives.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm font-semibold text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-mint-500" /> {o}
                </li>
              ))}
            </ul>
          </Card>

          {chapter.sections.map((section, i) => (
            <Card key={i} className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-slate-800">{section.heading}</h3>
                <button
                  onClick={() => speak(section.paragraphs.join(' ') + ' ' + (section.bullets?.join('. ') ?? '') + ' ' + (section.example ?? ''))}
                  className="flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-600 hover:bg-brand-100"
                >
                  <Volume2 className="h-3.5 w-3.5" /> Dengarkan
                </button>
              </div>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mb-2 text-sm font-semibold leading-relaxed text-slate-600">{p}</p>
              ))}
              {section.bullets && (
                <ul className="mt-2 space-y-1 rounded-2xl bg-slate-50 p-3">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm font-semibold text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" /> {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.example && (
                <div className="mt-3 rounded-2xl bg-sun-50 p-3">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-sun-600">Contoh</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">{section.example}</p>
                </div>
              )}
            </Card>
          ))}

          <Card className="p-5">
            <h3 className="font-display text-lg font-bold text-slate-800">Rangkuman</h3>
            <ul className="mt-2 space-y-1.5">
              {chapter.summary.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm font-semibold text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint-500" /> {s}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-lg font-bold text-slate-800">Evaluasi Bab</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">Uji pemahamanmu dengan {questions.length} soal.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to={`/kuis?chapter=${chapter.id}`} className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700">
                <PlayCircle className="h-4 w-4" /> Kerjakan Kuis Bab
              </Link>
              {!done && (
                <button onClick={handleComplete} className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 hover:border-brand-300">
                  <CheckCircle2 className="h-4 w-4" /> Tandai Selesai
                </button>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Progress Baca</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {reading ? `Sedang dibaca... ${seconds} detik` : 'Klik mulai untuk mencatat waktu baca.'}
            </p>
            <div className="mt-3 flex gap-2">
              {!reading ? (
                <button onClick={() => setReading(true)} className="btn-primary btn-sm">Mulai Baca</button>
              ) : (
                <>
                  <button onClick={() => setReading(false)} className="btn-outline btn-sm">Jeda</button>
                  <button onClick={handleComplete} className="btn-mint btn-sm">Selesai & Simpan</button>
                </>
              )}
            </div>
            {done && <p className="mt-2 text-xs font-bold text-mint-600">Materi ini sudah selesai ✅</p>}
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Dengarkan Seluruh Materi</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">Fitur baca dengan suara untuk membantu pemahaman.</p>
            <button
              onClick={() => speak(`${chapter.title}. ${chapter.sections.map((s) => s.paragraphs.join(' ')).join(' ')}`)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700"
            >
              <Headphones className="h-4 w-4" /> Putar Audio
            </button>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Lanjut ke Materi Lain</h3>
            <div className="mt-3 space-y-2">
              {db.chapters.filter((c) => c.subjectId === chapter.subjectId && c.grade === chapter.grade && c.id !== chapter.id).slice(0, 4).map((c) => (
                <Link key={c.id} to={`/materi/${c.id}`} className="block rounded-xl border border-slate-100 p-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">
                  {c.emoji} {c.title}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}