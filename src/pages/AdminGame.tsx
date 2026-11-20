import { useStore } from '../lib/store'
import { Card, PageHeader } from '../components/UI'

export default function AdminGame() {
  const { db, saveGame, toast } = useStore()
  return (
    <div className="space-y-5">
      <PageHeader title="Game Edukasi" subtitle="Kelola game yang tersedia untuk siswa." emoji="🎮" />
      <div className="space-y-2">
        {db.games.map((g) => (
          <Card key={g.id} className="flex items-center gap-3 p-3">
            <span className="text-2xl">{g.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">{g.name}</p>
              <p className="text-[11px] font-semibold text-slate-400">{g.description}</p>
            </div>
            <input type="number" value={g.points} onChange={(e) => saveGame({ ...g, points: Number(e.target.value) })} className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold" />
            <button
              onClick={() => { saveGame({ ...g, active: !g.active }); toast(g.active ? 'Game dinonaktifkan.' : 'Game diaktifkan.', 'info') }}
              className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${g.active ? 'bg-mint-500 text-white' : 'bg-slate-200 text-slate-600'}`}
            >
              {g.active ? 'Aktif' : 'Nonaktif'}
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}