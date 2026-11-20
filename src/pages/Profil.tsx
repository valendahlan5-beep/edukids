import { useState } from 'react'
import { User as UserIcon, KeyRound, Save } from 'lucide-react'
import { useStore } from '../lib/store'
import { avatarChoices, frameChoices } from '../data/badges'
import { levelInfo } from '../lib/utils'
import { Avatar, Card, PageHeader } from '../components/UI'

export default function Profil() {
  const { user, updateProfile, changePassword, toast } = useStore()
  const [name, setName] = useState(user?.name ?? '')
  const [avatar, setAvatar] = useState(user?.avatar ?? '🐼')
  const [frame, setFrame] = useState(user?.frame ?? 'none')
  const [school, setSchool] = useState(user?.school ?? '')
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  if (!user) return null
  const level = levelInfo(user.points)

  const save = () => {
    updateProfile({ name: name.trim() || user.name, avatar, frame, school })
  }

  const changePw = () => {
    const res = changePassword(oldPw, newPw)
    if (res.ok) { toast('Password berhasil diubah.', 'success'); setOldPw(''); setNewPw('') }
    else toast(res.error ?? 'Gagal', 'error')
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Profil Saya" subtitle="Kelola identitas dan pengaturan akunmu." emoji="👤" />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="p-5 text-center">
          <Avatar emoji={avatar} frame={frame} size="xl" className="mx-auto" />
          <p className="mt-3 font-display text-lg font-bold text-slate-800">{user.name}</p>
          <p className="text-xs font-semibold text-slate-500">{user.role} · {user.grade ? `Kelas ${user.grade}` : ''}</p>
          <p className="mt-2 text-xs font-bold text-brand-600">Lv.{level.level} {level.title}</p>
          <p className="text-xs font-semibold text-slate-400">{user.points} poin · {user.stars} bintang · {user.streak} hari streak</p>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Informasi Dasar</h3>
            <div className="mt-3 space-y-3">
              <div>
                <label className="label">Nama Lengkap</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Sekolah</label>
                <input value={school} onChange={(e) => setSchool(e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Avatar</label>
                <div className="flex flex-wrap gap-2">
                  {avatarChoices.map((a) => (
                    <button key={a} onClick={() => setAvatar(a)} className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 text-xl ${avatar === a ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}>{a}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Bingkai</label>
                <div className="flex flex-wrap gap-2">
                  {frameChoices.map((f) => (
                    <button key={f.id} onClick={() => setFrame(f.id)} className={`flex items-center gap-1 rounded-xl border-2 px-3 py-1.5 text-xs font-bold ${frame === f.id ? 'border-brand-500 bg-brand-50' : 'border-slate-200'}`}>
                      {f.emoji} {f.name}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={save} className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700">
                <Save className="h-4 w-4" /> Simpan Perubahan
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-display text-base font-bold text-slate-800">Ganti Password</h3>
            <div className="mt-3 space-y-3">
              <input type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} placeholder="Password lama" className="input" />
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Password baru" className="input" />
              <button onClick={changePw} className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 hover:border-brand-300">
                <KeyRound className="h-4 w-4" /> Ubah Password
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}