import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from 'lucide-react'
import { Mascot } from '../components/Mascot'
import { Button, Card, Pill } from '../components/UI'
import { useStore } from '../lib/store'
import { demoAccount } from '../data/seed'
import { homePathFor } from '../components/Layout'

const demoList = [
  { role: 'siswa' as const, label: 'Siswa', desc: 'Budi · Kelas 3', emoji: '🧑‍🚀' },
  { role: 'orangtua' as const, label: 'Orang Tua', desc: 'Pak Andi', emoji: '👨' },
  { role: 'guru' as const, label: 'Guru', desc: 'Bu Rina', emoji: '👩‍🏫' },
  { role: 'admin' as const, label: 'Admin', desc: 'Admin EduKids', emoji: '🧑‍💼' },
]

export default function Login() {
  const { login, toast } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = login(email, password)
    setLoading(false)
    if (result.ok) {
      toast(`Selamat datang, ${result.user?.name.split(' ')[0]}!`, 'success')
      navigate(homePathFor(result.user?.role))
    } else {
      setError(result.error ?? 'Gagal masuk.')
    }
  }

  const quick = (role: keyof typeof demoAccount) => {
    const account = demoAccount[role]
    setEmail(account.email)
    setPassword(account.password)
    const result = login(account.email, account.password)
    if (result.ok) {
      toast(`Masuk sebagai ${result.user?.name}`, 'success')
      navigate(homePathFor(result.user?.role))
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 p-10 text-white lg:flex">
        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-sun-300/20 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2">
          <img src="./logo.svg" alt="" className="h-10 w-10 rounded-2xl" />
          <span className="font-display text-2xl font-extrabold">EduKids</span>
        </Link>
        <div className="relative">
          <Mascot size={210} className="mb-4 animate-float" />
          <h2 className="font-display text-4xl font-extrabold leading-tight">Belajar hari ini,<br />bersinar esok hari. ✨</h2>
          <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-blue-100">
            Masuk untuk melanjutkan petualangan belajarmu. Ada materi baru, kuis seru, dan Kiki yang siap membantu!
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">📚 108+ materi</span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">🎮 9 game</span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">🤖 AI Guru</span>
          </div>
        </div>
        <p className="relative text-[11px] font-semibold text-blue-200">
          “Anakku jadi semangat belajar setiap hari. Laporannya juga mudah dipahami.” — Ibu Sari, orang tua siswa
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-400 hover:text-brand-600 lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
          </Link>
          <Pill tone="brand" className="mb-3"><Sparkles className="h-3.5 w-3.5" /> Selamat datang kembali</Pill>
          <h1 className="font-display text-3xl font-extrabold text-slate-900">Masuk ke EduKids</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">Lanjutkan belajar dengan akunmu atau coba akun demo.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-11"
                  placeholder="nama@email.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-11 pr-11"
                  placeholder="Minimal 6 karakter"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                  aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <div className="rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-600">{error}</div>}
            <Button type="submit" size="lg" block loading={loading} icon={ArrowRight}>
              Masuk
            </Button>
          </form>
          <p className="mt-4 text-center text-sm font-semibold text-slate-500">
            Belum punya akun? <Link to="/daftar" className="link">Daftar gratis</Link>
          </p>

          <Card className="mt-6 p-4">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-400">Masuk cepat dengan akun demo</p>
            <div className="grid grid-cols-2 gap-2">
              {demoList.map((account) => (
                <button
                  key={account.role}
                  onClick={() => quick(account.role)}
                  className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50"
                >
                  <span className="text-xl">{account.emoji}</span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-extrabold text-slate-700">{account.label}</span>
                    <span className="block truncate text-[10px] font-semibold text-slate-400">{account.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
