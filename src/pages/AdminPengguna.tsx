import { useState } from 'react'
import { useStore } from '../lib/store'
import { Card, PageHeader } from '../components/UI'

export default function AdminPengguna() {
  const { db, updateUser, toast } = useStore()
  const [roleFilter, setRoleFilter] = useState('all')
  const [search, setSearch] = useState('')
  const users = db.users.filter((u) => (roleFilter === 'all' || u.role === roleFilter) && (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())))

  return (
    <div className="space-y-5">
      <PageHeader title="Pengguna" subtitle="Kelola akun siswa, orang tua, guru, dan admin." emoji="👥" />
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'siswa', 'orangtua', 'guru', 'admin'].map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)} className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${roleFilter === r ? 'bg-brand-600 text-white' : 'bg-white text-slate-500'}`}>
              {r === 'all' ? 'Semua' : r}
            </button>
          ))}
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="ml-auto rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold" />
        </div>
      </Card>
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Kelas</th>
              <th className="px-4 py-3 text-left">Poin</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-bold text-slate-700">{u.avatar} {u.name}</td>
                <td className="px-4 py-3 text-slate-500">{u.email}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-600">{u.role}</span></td>
                <td className="px-4 py-3 text-slate-500">{u.grade ?? '-'}</td>
                <td className="px-4 py-3 text-slate-500">{u.points}</td>
                <td className="px-4 py-3">
                  <button onClick={() => { updateUser(u.id, { points: u.points + 50 }); toast('Poin +50 ditambahkan.', 'success') }} className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-600">+50 poin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}