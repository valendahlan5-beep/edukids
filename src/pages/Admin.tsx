import { useMemo } from 'react'
import { Users, BookOpen, ClipboardCheck, Gamepad2, BarChart3, Settings, TrendingUp } from 'lucide-react'
import { useStore } from '../lib/store'
import { Card, PageHeader } from '../components/UI'

export default function Admin() {
  const { db } = useStore()
  const students = db.users.filter((u) => u.role === 'siswa').length
  const parents = db.users.filter((u) => u.role === 'orangtua').length
  const teachers = db.users.filter((u) => u.role === 'guru').length
  const attempts = db.attempts.length
  return (
    <div className="space-y-5">
      <PageHeader title="Ringkasan Admin" subtitle="Kelola seluruh konten dan pengguna EduKids." emoji="🛠️" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Siswa</p><p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{students}</p></Card>
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Orang Tua</p><p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{parents}</p></Card>
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Guru</p><p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{teachers}</p></Card>
        <Card className="p-4"><p className="text-xs font-bold uppercase text-slate-400">Total Soal</p><p className="mt-1 font-display text-2xl font-extrabold text-slate-900">{db.questions.length}</p></Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { to: '/admin/pengguna', icon: Users, title: 'Pengguna', desc: 'Kelola akun siswa, orang tua, guru.' },
          { to: '/admin/materi', icon: BookOpen, title: 'Materi & Kurikulum', desc: 'Tambah/edit materi.' },
          { to: '/admin/soal', icon: ClipboardCheck, title: 'Bank Soal', desc: 'Kelola soal dan kuis.' },
          { to: '/admin/game', icon: Gamepad2, title: 'Game Edukasi', desc: 'Aktifkan/nonaktifkan game.' },
          { to: '/admin/ai', icon: BarChart3, title: 'Konten AI Tutor', desc: 'Kelola pengetahuan AI.' },
          { to: '/admin/laporan', icon: TrendingUp, title: 'Laporan', desc: 'Lihat aktivitas pengguna.' },
          { to: '/admin/pengaturan', icon: Settings, title: 'Pengaturan', desc: 'Pengaturan aplikasi.' },
        ].map((item) => (
          <a key={item.to} href={`#${item.to}`} className="card card-hover block p-4">
            <item.icon className="h-6 w-6 text-brand-600" />
            <p className="mt-2 font-display text-base font-bold text-slate-800">{item.title}</p>
            <p className="text-xs font-semibold text-slate-500">{item.desc}</p>
          </a>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Statistik Konten</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold text-slate-400">Mata Pelajaran</p><p className="font-display text-xl font-bold">{db.subjects.length}</p></div>
          <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold text-slate-400">Materi</p><p className="font-display text-xl font-bold">{db.chapters.length}</p></div>
          <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold text-slate-400">Soal</p><p className="font-display text-xl font-bold">{db.questions.length}</p></div>
          <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold text-slate-400">Ujian Tercatat</p><p className="font-display text-xl font-bold">{attempts}</p></div>
        </div>
      </Card>
    </div>
  )
}