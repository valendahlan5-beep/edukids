import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, GraduationCap, HeartHandshake, Sparkles } from 'lucide-react'
import { Mascot } from '../components/Mascot'
import { Button, Pill } from '../components/UI'
import { useStore } from '../lib/store'
import { homePathFor } from '../components/Layout'
import type { Grade } from '../types'
import { gradeLabel } from '../lib/utils'

export default function Register() {
  const { register, toast } = useStore()
  const navigate = useNavigate()
  const [role, setRole] = useState<'siswa' | 'orangtua'>('siswa')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [grade, setGrade] = useState<Grade>(1)
  const [parentEmail, setParentEmail] = useState('')
  const [school, setSchool] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = register({ name, email, password, role, grade, parentEmail, school })
    setLoading(false)
    if (result.ok) {
      toast(`Akun ${result.user?.name} berhasil dibuat. Selamat belajar!`, 'success')
      navigate(homePathFor(result.user?.role))
    } else {
      setError(result.error ?? 'Gagal mendaftar.')
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-gradient-to-br from-mint-500 via-mint-600 to-teal-700 p-10 text-white lg:flex">
        <Link to="/" className="relative flex items-center gap-2">
          <img src="./logo.svg" alt="" className="h-10 w-10 rounded-2xl" />
          <span className="font-display text-2xl font-extrabold">EduKids</span>
        </Link>
        <div className="relative">
          <Mascot size={200} className="mb-5 animate-float" />
          <h2 className="font-display text-4xl font-extrabold leading-tight">Petualangan belajar<br />dimulai di sini! 🚀</h2>
          <p className="mt-3 max-w-sm text-sm font-semibold leading-relaxed text-emerald-50">
            Buat akun gratis dan dapatkan akses ke semua materi, kuis, game edukasi, dan AI Guru Pintar.
          </p>
          <div className="mt-6 space-y-2">
            {['Materi lengkap kelas 1–6', 'Kuis dengan pembahasan otomatis', 'Laporan belajar untuk orang tua'].map((t) => (
              <p key={t} className="flex items-center gap-2 text-xs font-bold"><span className="text-sun-300">✓</span> {t}</p>
            ))}
          </div>
        </div>
        <p className="relative text-[11px] font-semibold text-emerald-100">Gratis. Tanpa iklan. Aman untuk anak.</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-400 hover:text-brand-600 lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
          </Link>
          <Pill tone="mint" className="mb-3"><Sparkles className="h-3.5 w-3.5" /> Gratis untuk semua</Pill>
          <h1 className="font-display text-3xl font-extrabold text-slate-900">Buat akun baru</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">Pilih peranmu, lalu isi data dengan lengkap.</p>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setRole('siswa')}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-extrabold transition ${role === 'siswa' ? 'bg-white text-brand-700 shadow' : 'text-slate-500'}`}
            >
              <GraduationCap className="h-4 w-4" /> Siswa
            </button>
            <button
              type="button"
              onClick={() => setRole('orangtua')}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-extrabold transition ${role === 'orangtua' ? 'bg-white text-mint-700 shadow' : 'text-slate-500'}`}
            >
              <HeartHandshake className="h-4 w-4" /> Orang Tua
            </button>
          </div>

          <form onSubmit={submit} className="mt-4 space-y-3.5">
            <div>
              <label className="label" htmlFor="name">{role === 'siswa' ? 'Nama lengkap anak' : 'Nama orang tua'}</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Contoh: Budi Santoso" required />
            </div>
            {role === 'siswa' && (
              <div>
                <label className="label" htmlFor="grade">Kelas</label>
                <select id="grade" value={grade} onChange={(e) => setGrade(Number(e.target.value) as Grade)} className="input">
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <option key={g} value={g}>{gradeLabel(g)}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="nama@email.com" required autoComplete="email" />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Minimal 6 karakter" required minLength={6} autoComplete="new-password" />
            </div>
            <div>
              <label className="label" htmlFor="school">Asal sekolah <span className="font-semibold text-slate-400">(opsional)</span></label>
              <input id="school" value={school} onChange={(e) => setSchool(e.target.value)} className="input" placeholder="SD Negeri Panunggangan 3" />
            </div>
            {role === 'siswa' && (
              <div>
                <label className="label" htmlFor="parent">Email orang tua <span className="font-semibold text-slate-400">(opsional)</span></label>
                <input id="parent" type="email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} className="input" placeholder="orangtua@email.com" />
                <p className="mt-1 text-[11px] font-semibold text-slate-400">Hubungkan akun agar orang tua bisa memantau perkembanganmu.</p>
              </div>
            )}
            {error && <div className="rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-600">{error}</div>}
            <Button type="submit" size="lg" block loading={loading} icon={ArrowRight}>
              Daftar Sekarang
            </Button>
            <p className="text-center text-[11px] font-semibold leading-relaxed text-slate-400">
              Dengan mendaftar, kamu menyetujui penggunaan data untuk keperluan belajar. Tidak ada iklan atau konten dewasa.
            </p>
          </form>
          <p className="mt-4 text-center text-sm font-semibold text-slate-500">
            Sudah punya akun? <Link to="/masuk" className="link">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
