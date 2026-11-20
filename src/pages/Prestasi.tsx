import { useMemo } from 'react'
import { Award, Medal, Star, Trophy } from 'lucide-react'
import { useStore } from '../lib/store'
import { cx, levelInfo } from '../lib/utils'
import { badges } from '../data/badges'
import { subjectMap } from '../data/subjects'
import { Card, PageHeader, ProgressBar } from '../components/UI'

export default function Prestasi() {
  const { user, db, redeemReward, toast } = useStore()
  if (!user) return null
  const level = levelInfo(user.points)
  const earned = new Set(user.badges)
  const attempts = db.attempts.filter((a) => a.userId === user.id)
  const bestBySubject: Record<string, number> = {}
  attempts.forEach((a) => { if (a.subjectId && (!bestBySubject[a.subjectId] || a.score > bestBySubject[a.subjectId])) bestBySubject[a.subjectId] = a.score })

  return (
    <div className="space-y-5">
      <PageHeader title="Prestasi Saya" subtitle="Level, bintang, badge, dan riwayat nilai." emoji="🏆" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">🚀</div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">Lv.{level.level}</p>
          <p className="text-xs font-bold text-slate-500">{level.title}</p>
          <div className="mt-2"><ProgressBar value={level.percent} color="bg-brand-500" showPercent /></div>
        </Card>
        <Card className="p-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sun-50 text-2xl">⭐</div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">{user.stars}</p>
          <p className="text-xs font-bold text-slate-500">Total Bintang</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-50 text-2xl">🪙</div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">{user.points.toLocaleString('id-ID')}</p>
          <p className="text-xs font-bold text-slate-500">Total Poin</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-coral-50 text-2xl">🏅</div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">{earned.size}/{badges.length}</p>
          <p className="text-xs font-bold text-slate-500">Badge Terkumpul</p>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Badge Prestasi</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => {
            const has = earned.has(b.id)
            return (
              <div key={b.id} className={cx('flex items-center gap-3 rounded-2xl border p-3', has ? 'border-mint-200 bg-mint-50' : 'border-slate-100 bg-slate-50 opacity-60')}>
                <span className="text-2xl">{b.emoji}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">{b.name}</p>
                  <p className="truncate text-[11px] font-semibold text-slate-500">{b.description}</p>
                </div>
                {has && <span className="ml-auto text-mint-500">✅</span>}
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Nilai Terbaik per Mata Pelajaran</h3>
        <div className="mt-3 space-y-2">
          {Object.entries(bestBySubject).length === 0 && <p className="text-sm text-slate-500">Belum ada nilai.</p>}
          {Object.entries(bestBySubject).map(([sid, score]) => (
            <div key={sid} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
              <span className="text-xl">{subjectMap[sid]?.emoji ?? '📘'}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700">{subjectMap[sid]?.short ?? sid}</p>
                <ProgressBar value={score} color="bg-brand-500" height="h-1.5" />
              </div>
              <span className="font-display text-lg font-bold text-slate-900">{score}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Riwayat Nilai</h3>
        <div className="mt-3 space-y-2">
          {attempts.length === 0 && <p className="text-sm text-slate-500">Belum ada riwayat.</p>}
          {attempts.slice(0, 20).map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-lg">{a.score >= 80 ? '🌟' : a.score >= 60 ? '👍' : '💪'}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-700">{a.title}</p>
                <p className="text-[10px] font-semibold text-slate-400">{new Date(a.createdAt).toLocaleDateString('id-ID')} · {a.correct}/{a.total} benar · {Math.round(a.durationSec / 60)} menit</p>
              </div>
              <span className="font-display text-lg font-bold text-slate-900">{a.score}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Toko Hadiah</h3>
        <p className="text-xs font-semibold text-slate-500">Tukar poinmu dengan hadiah virtual.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {db.rewards.map((r) => {
            const owned = user.inventory.includes(r.id) || (r.type === 'frame' && user.frame === r.id)
            return (
              <div key={r.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                <span className="text-2xl">{r.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-700">{r.name}</p>
                  <p className="text-[11px] font-semibold text-slate-400">{r.cost} poin</p>
                </div>
                <button
                  onClick={() => { const res = redeemReward(r.id); if (!res.ok) toast(res.error ?? '', 'error') }}
                  disabled={owned || user.points < r.cost}
                  className="rounded-xl bg-brand-600 px-3 py-1.5 text-xs font-extrabold text-white disabled:opacity-40"
                >
                  {owned ? 'Dimiliki' : 'Tukar'}
                </button>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
