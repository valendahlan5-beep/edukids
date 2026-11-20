import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Gamepad2,
  GraduationCap,
  Heart,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
} from 'lucide-react'
import { Mascot } from '../components/Mascot'
import { Button, Card, Pill } from '../components/UI'
import { useStore } from '../lib/store'
import { subjects } from '../data/subjects'
import { demoAccount } from '../data/seed'
import { homePathFor } from '../components/Layout'
import { useState } from 'react'

export default function Landing() {
  const { user, login, toast } = useStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState('')

  const quickLogin = (role: keyof typeof demoAccount) => {
    setLoading(role)
    const account = demoAccount[role]
    const result = login(account.email, account.password)
    setLoading('')
    if (result.ok) {
      toast('Selamat datang kembali!', 'success')
      navigate(homePathFor(result.user?.role))
    } else {
      toast(result.error ?? 'Gagal masuk', 'error')
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-white/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="./logo.svg" alt="EduKids" className="h-10 w-10 rounded-2xl shadow-md" />
            <div>
              <p className="font-display text-xl font-extrabold leading-none text-slate-900">
                Edu<span className="text-brand-600">Kids</span>
              </p>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-400">Sahabat Belajar</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-extrabold text-slate-500 md:flex">
            <a href="#fitur" className="hover:text-brand-600">Fitur</a>
            <a href="#pelajaran" className="hover:text-brand-600">Mata Pelajaran</a>
            <a href="#untuk-siapa" className="hover:text-brand-600">Untuk Siapa</a>
            <a href="#akun-demo" className="hover:text-brand-600">Coba Demo</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Button size="sm" onClick={() => navigate(homePathFor(user.role))} icon={ArrowRight}>
                Lanjut Belajar
              </Button>
            ) : (
              <>
                <Button size="sm" variant="ghost" onClick={() => navigate('/masuk')}>
                  Masuk
                </Button>
                <Button size="sm" onClick={() => navigate('/daftar')}>
                  Daftar Gratis
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-sun-200/40 blur-3xl" />
        <div className="absolute -right-16 top-32 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="relative z-10">
            <Pill tone="sun" className="mb-4 px-4 py-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" /> Kurikulum Merdeka SD Kelas 1–6
            </Pill>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl">
              Belajar jadi <span className="relative whitespace-nowrap text-brand-600">seru<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M2 8c20-6 50-6 96-2" stroke="#fbbf24" strokeWidth="6" fill="none" strokeLinecap="round" /></svg></span> setiap hari!
            </h1>
            <p className="mt-5 max-w-lg text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
              EduKids menemani anak SD belajar semua mata pelajaran dengan materi lengkap, kuis interaktif, game edukasi,
              dan AI Guru Pintar yang ramah anak. Orang tua juga bisa memantau perkembangan belajar.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => navigate(user ? homePathFor(user.role) : '/daftar')} icon={ArrowRight}>
                {user ? 'Lanjutkan Belajar' : 'Mulai Belajar Gratis'}
              </Button>
              <Button size="lg" variant="outline" onClick={() => quickLogin('siswa')} loading={loading === 'siswa'} icon={PlayCircle}>
                Coba Demo Siswa
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-extrabold text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-mint-500" /> 9 mata pelajaran</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-mint-500" /> Kelas 1–6</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-mint-500" /> Gratis untuk dicoba</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-4 rotate-3 rounded-[3rem] bg-sun-300/50" />
            <div className="relative rounded-[3rem] border-4 border-white bg-gradient-to-br from-brand-500 via-brand-600 to-indigo-700 p-6 shadow-2xl">
              <div className="flex items-center justify-between rounded-2xl bg-white/15 px-3 py-2 text-[10px] font-extrabold text-white/90">
                <span>🎓 Ruang Belajar</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-sun-300 text-sun-300" /> 1.240 bintang terkumpul</span>
              </div>
              <div className="mt-4 flex justify-center">
                <Mascot size={240} className="animate-float sticker-shadow" />
              </div>
              <div className="mt-2 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sun-100 text-xl">🏆</div>
                  <div className="flex-1">
                    <p className="text-xs font-extrabold text-slate-800">Hebat, Budi!</p>
                    <p className="text-[11px] font-semibold text-slate-400">Kamu menyelesaikan 3 materi hari ini</p>
                  </div>
                  <span className="rounded-full bg-mint-50 px-2 py-1 text-[10px] font-extrabold text-mint-600">+75 poin</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {['🔢', '📖', '🔬'].map((emoji, i) => (
                    <div key={i} className="rounded-xl bg-slate-50 p-2 text-center">
                      <span className="text-lg">{emoji}</span>
                      <div className="mt-1 h-1 rounded-full bg-brand-100"><div className="h-1 rounded-full bg-brand-500" style={{ width: `${70 + i * 8}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -left-5 top-24 rotate-[-8deg] rounded-2xl bg-white px-3 py-2 text-xs font-extrabold text-slate-700 shadow-lg animate-float">
                ⚡ Kuis kilat +20
              </div>
              <div className="absolute -right-4 bottom-28 rotate-6 rounded-2xl bg-sun-300 px-3 py-2 text-xs font-extrabold text-slate-900 shadow-lg">
                🌟 3 bintang!
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-4 shadow-soft sm:grid-cols-4">
            {[
              { value: '108+', label: 'Materi kurikulum', emoji: '📚' },
              { value: '300+', label: 'Soal interaktif', emoji: '📝' },
              { value: '9', label: 'Game edukasi', emoji: '🎮' },
              { value: '24/7', label: 'AI Guru Pintar', emoji: '🤖' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl">{stat.emoji}</p>
                <p className="font-display text-2xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pelajaran" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-8 text-center">
          <Pill tone="brand" className="mb-3">Mata Pelajaran Lengkap</Pill>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">Semua pelajaran ada di sini</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold text-slate-500">
            Dari Matematika sampai Bahasa Daerah, semuanya disusun sesuai kurikulum SD Indonesia.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Card key={subject.id} className="flex items-center gap-4 p-4" hover onClick={() => navigate('/masuk')}>
              <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.color} text-2xl shadow-md`}>
                {subject.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-base font-bold text-slate-800">{subject.short}</h3>
                <p className="line-clamp-1 text-xs font-semibold text-slate-400">{subject.tagline}</p>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300" />
            </Card>
          ))}
        </div>
      </section>

      <section id="fitur" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <Pill tone="mint" className="mb-3">Fitur Andalan</Pill>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">Belajar, bermain, dan dipantau dalam satu aplikasi</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpen, emoji: '📖', title: 'Materi lengkap kelas 1–6', desc: 'Setiap bab berisi penjelasan sederhana, ilustrasi, rangkuman, audio, dan evaluasi.', color: 'bg-brand-50 text-brand-600' },
              { icon: Bot, emoji: '🤖', title: 'AI Guru Pintar', desc: 'Kiki menjelaskan langkah-langkah, membuat latihan soal, dan menjawab pertanyaan dengan sabar.', color: 'bg-violet-50 text-violet-600' },
              { icon: Gamepad2, emoji: '🎮', title: '9 game edukasi', desc: 'Tebak gambar, puzzle, susun huruf, petualangan soal, dan game seru lainnya.', color: 'bg-coral-50 text-coral-600' },
              { icon: Trophy, emoji: '🏆', title: 'Level, bintang, dan badge', desc: 'Kumpulkan poin, jaga streak harian, dan tukar hadiah virtual di toko hadiah.', color: 'bg-sun-50 text-sun-600' },
              { icon: Users, emoji: '👨‍👩‍👧', title: 'Dashboard orang tua', desc: 'Pantau nilai, waktu belajar, materi yang belum selesai, dan atur batas waktu layar.', color: 'bg-mint-50 text-mint-600' },
              { icon: ShieldCheck, emoji: '🛡️', title: 'Aman dan ramah anak', desc: 'Tidak ada iklan, konten dewasa, atau komentar terbuka. Fokus penuh untuk belajar.', color: 'bg-rose-50 text-rose-600' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-slate-100 p-5 transition hover:shadow-md">
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-800">{feature.title}</h3>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="untuk-siapa" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <Pill tone="coral" className="mb-3">Satu Aplikasi, Tiga Peran</Pill>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">Untuk anak, orang tua, dan guru</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { emoji: '🧒', title: 'Untuk Anak', points: ['Belajar sambil bermain', 'Materi sesuai kelasnya', 'AI Kiki siap membantu', 'Hadiah dan badge keren'], color: 'from-brand-500 to-blue-600' },
            { emoji: '👨‍👩‍👧', title: 'Untuk Orang Tua', points: ['Laporan mingguan & bulanan', 'Pantau nilai dan waktu belajar', 'Atur batas waktu layar', 'Tahu materi yang belum selesai'], color: 'from-mint-500 to-emerald-600' },
            { emoji: '👩‍🏫', title: 'Untuk Guru', points: ['Kelola materi dan bank soal', 'Pantau progres siswa', 'Siapkan ujian dengan mudah', 'Materi siap pakai di kelas'], color: 'from-coral-400 to-orange-600' },
          ].map((role) => (
            <div key={role.title} className="overflow-hidden rounded-3xl bg-white shadow-soft">
              <div className={`bg-gradient-to-br ${role.color} p-5 text-white`}>
                <span className="text-4xl">{role.emoji}</span>
                <h3 className="mt-2 font-display text-xl font-bold">{role.title}</h3>
              </div>
              <ul className="space-y-2 p-5">
                {role.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-mint-500" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="akun-demo" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-6 text-white sm:p-10">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-sun-400/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Pill tone="sun" className="mb-3">Coba Langsung</Pill>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Masuk sebagai akun demo</h2>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-relaxed text-slate-300">
                Ingin melihat semua fitur? Gunakan akun demo di bawah. Data sudah terisi materi, nilai, dan aktivitas
                belajar agar Anda bisa langsung menjelajahi dashboard siswa, orang tua, guru, dan admin.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { role: 'siswa' as const, label: 'Siswa', emoji: '🧑‍🚀', desc: 'Budi · Kelas 3' },
                  { role: 'orangtua' as const, label: 'Orang Tua', emoji: '👨', desc: 'Pak Andi' },
                  { role: 'guru' as const, label: 'Guru', emoji: '👩‍🏫', desc: 'Bu Rina' },
                  { role: 'admin' as const, label: 'Admin', emoji: '🧑‍💼', desc: 'Admin' },
                ].map((account) => (
                  <button
                    key={account.role}
                    onClick={() => quickLogin(account.role)}
                    disabled={loading === account.role}
                    className="rounded-2xl bg-white/10 p-3 text-left ring-1 ring-white/10 transition hover:bg-white/20 disabled:opacity-60"
                  >
                    <span className="text-2xl">{account.emoji}</span>
                    <p className="mt-1 text-sm font-extrabold">{account.label}</p>
                    <p className="text-[10px] font-semibold text-slate-400">{account.desc}</p>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] font-semibold text-slate-400">
                Siswa: budi@edukids.id / 123456 · Orang tua: orangtua@edukids.id / 123456
              </p>
            </div>
            <div className="flex justify-center">
              <Mascot size={220} mood="wink" className="animate-float" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
          <div className="bg-gradient-to-br from-brand-600 to-indigo-700 p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Profil Sekolah</h2>
            <p className="mt-1 text-sm font-semibold text-blue-100">SD Negeri Panunggangan 3 — Sekolah Dasar Negeri di Kota Tangerang, Banten.</p>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="space-y-2 text-sm font-semibold text-slate-600">
              <p><span className="font-extrabold text-slate-800">Nama:</span> SD Negeri Panunggangan 3</p>
              <p><span className="font-extrabold text-slate-800">NPSN:</span> 20606564</p>
              <p><span className="font-extrabold text-slate-800">Status & Akreditasi:</span> Negeri | Akreditasi A</p>
              <p><span className="font-extrabold text-slate-800">Alamat:</span> Jl. Gunung Sari No. 4 RT. 02/08, Panunggangan Barat, Kec. Cibodas, Kota Tangerang, Banten 15139</p>
            </div>
            <div className="space-y-2 text-sm font-semibold text-slate-600">
              <p><span className="font-extrabold text-slate-800">Telepon:</span> 0857-1940-2118</p>
              <p><span className="font-extrabold text-slate-800">Email:</span> sdnpantricibodas@gmail.com</p>
              <p><span className="font-extrabold text-slate-800">Luas Tanah:</span> 600 m²</p>
              <p><span className="font-extrabold text-slate-800">Lokasi:</span> Jl. Gunung Sari No. 4, RT. 002/RW. 008, Kel. Panunggangan Barat, Kec. Cibodas, Kota Tangerang, Banten</p>
            </div>
          </div>
          <div className="border-t border-slate-100 px-6 py-4">
            <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Tautan Terkait</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold">
              <a href="https://www.google.com/search?q=SD+NEGERI+PANUNGGANGAN+3" target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Profil resmi di SD NEGERI PANUNGGANGAN 3</a>
              <a href="https://www.google.com/search?q=SDN+Panunggangan+3+Cibodas+Kota+Tangerang" target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Akun resmi di SDN Panunggangan 3 Cibodas Kota Tangerang</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
          <div>
            <p className="font-display text-lg font-extrabold text-slate-800">EduKids · Sahabat Belajar Anak Indonesia</p>
            <p className="text-xs font-semibold text-slate-400">Dibuat dengan <Heart className="inline h-3 w-3 text-rose-500" /> untuk anak Indonesia.</p>
            <p className="text-xs font-semibold text-slate-400">Pembuat: michael jawir</p>
          </div>
          <div className="flex gap-4 text-xs font-extrabold text-slate-500">
            <Link to="/masuk" className="hover:text-brand-600">Masuk</Link>
            <Link to="/daftar" className="hover:text-brand-600">Daftar</Link>
            <a href="#fitur" className="hover:text-brand-600">Fitur</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
