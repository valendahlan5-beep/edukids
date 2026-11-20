import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  BookOpen,
  Bot,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  Coins,
  Flame,
  Gamepad2,
  GraduationCap,
  Home,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Menu,
  PlayCircle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useStore } from '../lib/store'
import { Avatar, Pill } from './UI'
import { cx, formatMinutes, gradeLabel, todayKey, truncate } from '../lib/utils'
import { Mascot } from './Mascot'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const studentNav: NavItem[] = [
  { to: '/beranda', label: 'Beranda', icon: Home },
  { to: '/pelajaran', label: 'Semua Pelajaran', icon: BookOpen },
  { to: '/kelas', label: 'Kelas Saya', icon: GraduationCap },
  { to: '/video', label: 'Video Belajar', icon: PlayCircle },
  { to: '/kuis', label: 'Kuis & Ujian', icon: ClipboardCheck },
  { to: '/game', label: 'Game Edukasi', icon: Gamepad2 },
  { to: '/ai', label: 'AI Guru Pintar', icon: Bot },
  { to: '/prestasi', label: 'Prestasi Saya', icon: Trophy },
  { to: '/jadwal', label: 'Jadwal Belajar', icon: CalendarDays },
  { to: '/alat', label: 'Alat Belajar', icon: Wrench },
  { to: '/profil', label: 'Profil', icon: User },
]

const parentNav: NavItem[] = [
  { to: '/orangtua', label: 'Dashboard Orang Tua', icon: LayoutDashboard },
  { to: '/profil', label: 'Profil', icon: User },
]

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Ringkasan', icon: LayoutDashboard, end: true },
  { to: '/admin/pengguna', label: 'Pengguna', icon: Users },
  { to: '/admin/materi', label: 'Materi & Kurikulum', icon: LibraryBig },
  { to: '/admin/soal', label: 'Bank Soal', icon: ClipboardCheck },
  { to: '/admin/game', label: 'Game Edukasi', icon: Gamepad2 },
  { to: '/admin/ai', label: 'Konten AI Tutor', icon: Bot },
  { to: '/admin/laporan', label: 'Laporan', icon: Trophy },
  { to: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
]

const teacherNav: NavItem[] = [
  { to: '/guru', label: 'Dashboard Guru', icon: LayoutDashboard },
  { to: '/admin/materi', label: 'Materi & Kurikulum', icon: LibraryBig },
  { to: '/admin/soal', label: 'Bank Soal', icon: ClipboardCheck },
  { to: '/admin/laporan', label: 'Laporan Siswa', icon: Trophy },
  { to: '/profil', label: 'Profil', icon: User },
]

export function homePathFor(role?: string) {
  if (role === 'orangtua') return '/orangtua'
  if (role === 'admin') return '/admin'
  if (role === 'guru') return '/guru'
  return '/beranda'
}

export default function Layout() {
  const { user, db, logout } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMobileOpen(false)
    setNotifOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const nav = user?.role === 'admin' ? adminNav : user?.role === 'guru' ? teacherNav : user?.role === 'orangtua' ? parentNav : studentNav
  const isStudent = user?.role === 'siswa'

  const todayMinutes = useMemo(() => {
    if (!user) return 0
    return db.activity
      .filter((a) => a.userId === user.id && a.date === todayKey())
      .reduce((sum, a) => sum + a.minutes, 0)
  }, [db.activity, user])

  const overLimit = Boolean(user && isStudent && user.timeLimitMinutes > 0 && todayMinutes >= user.timeLimitMinutes)
  const nearLimit = Boolean(
    user && isStudent && user.timeLimitMinutes > 0 && todayMinutes >= user.timeLimitMinutes * 0.8 && !overLimit,
  )

  const dailyChallenge = useMemo(
    () => db.dailyChallenges.find((c) => c.userId === user?.id && c.date === todayKey()),
    [db.dailyChallenges, user],
  )

  if (!user) return null

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link to={homePathFor(user.role)} className="flex items-center gap-2.5 px-3 py-1">
        <img src="./logo.svg" alt="EduKids" className="h-11 w-11 rounded-2xl shadow-md" />
        <div>
          <p className="font-display text-xl font-extrabold leading-none text-slate-900">
            Edu<span className="text-brand-600">Kids</span>
          </p>
          <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">SDN Panunggangan 3</p>
        </div>
      </Link>

      <div className="mx-2 mt-5 rounded-2xl bg-gradient-to-br from-brand-50 to-sun-50 p-3 ring-1 ring-brand-100/70">
        <div className="flex items-center gap-2.5">
          <Avatar emoji={user.avatar} frame={user.frame} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-slate-800">{user.name}</p>
            <p className="text-[11px] font-bold text-slate-500">
              {user.role === 'siswa'
                ? gradeLabel(user.grade)
                : user.role === 'orangtua'
                  ? 'Orang Tua'
                  : user.role === 'admin'
                    ? 'Administrator'
                    : 'Guru'}
            </p>
          </div>
        </div>
        {isStudent && (
          <div className="mt-2.5 flex items-center justify-between gap-1 text-[11px] font-extrabold">
            <span className="flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-sun-600">
              <Coins className="h-3 w-3" /> {user.points.toLocaleString('id-ID')}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-coral-500">
              <Star className="h-3 w-3 fill-current" /> {user.stars}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-orange-600">
              <Flame className="h-3 w-3" /> {user.streak}
            </span>
          </div>
        )}
      </div>

      <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cx(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-extrabold transition',
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-200'
                  : 'text-slate-500 hover:bg-brand-50 hover:text-brand-700',
              )
            }
          >
            <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mx-2 mb-3 rounded-2xl bg-slate-900 p-3 text-white">
        <div className="flex items-center gap-2">
          <Mascot size={38} withCap={false} />
          <p className="text-[11px] font-bold leading-snug">
            Butuh bantuan belajar? Tanya Kiki, AI Guru Pintar!
          </p>
        </div>
        <button
          onClick={() => navigate('/ai')}
          className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-white/15 py-1.5 text-[11px] font-extrabold hover:bg-white/25"
        >
          <Sparkles className="h-3 w-3" /> Tanya Kiki
        </button>
      </div>

      <button
        onClick={() => {
          logout()
          navigate('/')
        }}
        className="mx-2 mb-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
      >
        <LogOut className="h-[18px] w-[18px]" /> Keluar
      </button>
    </div>
  )

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-slate-100 bg-white/90 px-2 py-4 backdrop-blur lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] overflow-y-auto bg-white p-2 shadow-2xl animate-slideUp">
            <div className="flex justify-end p-2">
              <button onClick={() => setMobileOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}

      <div className="relative">
        <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-xl bg-slate-100 p-2 text-slate-600 lg:hidden"
                aria-label="Buka menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link to={homePathFor(user.role)} className="flex items-center gap-2 lg:hidden">
                <img src="./logo.svg" alt="EduKids" className="h-8 w-8 rounded-xl" />
                <span className="font-display text-lg font-extrabold text-slate-900">EduKids</span>
              </Link>
              <GlobalSearch />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {isStudent && (
                <>
                  <button
                    onClick={() => navigate('/jadwal')}
                    className="hidden items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-extrabold text-orange-600 sm:flex"
                  >
                    <Flame className="h-4 w-4" /> {user.streak} hari
                  </button>
                  <button
                    onClick={() => navigate('/prestasi')}
                    className="flex items-center gap-1.5 rounded-full bg-sun-50 px-3 py-1.5 text-xs font-extrabold text-sun-600"
                  >
                    <Coins className="h-4 w-4" /> {user.points.toLocaleString('id-ID')}
                  </button>
                  <button
                    onClick={() => navigate('/prestasi')}
                    className="hidden items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-extrabold text-pink-600 sm:flex"
                  >
                    <Star className="h-4 w-4 fill-current" /> {user.stars}
                  </button>
                </>
              )}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                  aria-label="Notifikasi"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-3xl border border-slate-100 bg-white p-3 shadow-2xl animate-pop">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-display text-sm font-bold text-slate-800">Notifikasi</p>
                      <Pill tone="brand">Hari ini</Pill>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-2xl bg-brand-50 p-3">
                        <p className="text-xs font-extrabold text-brand-700">📣 Pengumuman</p>
                        <p className="mt-1 text-[11px] font-semibold leading-relaxed text-slate-600">
                          {db.settings.announcement}
                        </p>
                      </div>
                      {isStudent && (
                        <button
                          onClick={() => navigate('/kuis')}
                          className="flex w-full items-center gap-2 rounded-2xl bg-sun-50 p-3 text-left hover:bg-sun-100"
                        >
                          <span className="text-xl">🌟</span>
                          <span className="flex-1">
                            <span className="block text-xs font-extrabold text-sun-600">Tantangan Harian</span>
                            <span className="block text-[11px] font-semibold text-slate-600">
                              {dailyChallenge?.completed ? 'Sudah selesai. Hebat!' : 'Selesaikan 5 soal untuk bonus poin!'}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </button>
                      )}
                      <div className="flex items-center gap-2 rounded-2xl bg-mint-50 p-3">
                        <span className="text-xl">🔥</span>
                        <p className="text-[11px] font-semibold text-slate-600">
                          {isStudent
                            ? `Streak belajarmu ${user.streak} hari. Pertahankan, ya!`
                            : 'Pantau perkembangan belajar anak secara rutin.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => navigate('/profil')} className="flex items-center gap-2 rounded-full p-0.5">
                <Avatar emoji={user.avatar} frame={user.frame} size="sm" />
                <span className="hidden text-left md:block">
                  <span className="block max-w-[120px] truncate text-xs font-extrabold text-slate-800">{user.name}</span>
                  <span className="block text-[10px] font-bold text-slate-400">
                    {user.role === 'siswa' ? gradeLabel(user.grade) : user.role}
                  </span>
                </span>
              </button>
            </div>
          </div>

          {isStudent && (overLimit || nearLimit) && (
            <div
              className={cx(
                'flex items-center gap-2 px-4 py-2 text-xs font-bold sm:px-6',
                overLimit ? 'bg-rose-50 text-rose-700' : 'bg-sun-50 text-sun-700',
              )}
            >
              <span>{overLimit ? '⏰' : '💡'}</span>
              <p className="flex-1">
                {overLimit
                  ? `Waktu belajar hari ini sudah ${formatMinutes(todayMinutes)}, melewati batas ${formatMinutes(user.timeLimitMinutes)} dari orang tua. Ayo istirahat dulu!`
                  : `Kamu sudah belajar ${formatMinutes(todayMinutes)} hari ini. Batas dari orang tua: ${formatMinutes(user.timeLimitMinutes)}.`}
              </p>
            </div>
          )}
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-5 sm:px-6 sm:pt-6 lg:pb-10">{<Outlet />}</main>
      </div>

      {isStudent && (
        <nav className="safe-bottom fixed bottom-0 left-0 right-0 z-30 border-t border-slate-100 bg-white/95 px-2 pb-1 pt-1.5 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-md items-center justify-around">
            {[
              { to: '/beranda', label: 'Beranda', icon: Home },
              { to: '/pelajaran', label: 'Pelajaran', icon: BookOpen },
              { to: '/kuis', label: 'Kuis', icon: ClipboardCheck },
              { to: '/game', label: 'Game', icon: Gamepad2 },
              { to: '/ai', label: 'AI Kiki', icon: Bot },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    'flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-extrabold',
                    isActive ? 'text-brand-600' : 'text-slate-400',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={cx('rounded-xl px-3 py-1', isActive && 'bg-brand-50')}>
                      <item.icon className="h-5 w-5" />
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}

function GlobalSearch() {
  const { db } = useStore()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const q = query.trim().toLowerCase()
  const chapters = q
    ? db.chapters
        .filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.objectives.some((o) => o.toLowerCase().includes(q)),
        )
        .slice(0, 4)
    : []
  const subjects = q
    ? db.subjects.filter((s) => s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)).slice(0, 2)
    : []

  return (
    <div className="relative hidden sm:block" ref={ref}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Cari materi, pelajaran, atau topik…"
        className="w-48 rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm font-semibold outline-none transition focus:w-72 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-100 lg:w-64"
      />
      {open && q && (
        <div className="absolute left-0 mt-2 w-80 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl animate-pop">
          {!chapters.length && !subjects.length ? (
            <p className="px-3 py-5 text-center text-xs font-semibold text-slate-400">
              Tidak ada hasil untuk “{query}”. Coba kata lain.
            </p>
          ) : (
            <>
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    navigate(`/pelajaran/${subject.id}`)
                    setOpen(false)
                    setQuery('')
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-slate-50"
                >
                  <span className="text-lg">{subject.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-xs font-extrabold text-slate-700">{subject.name}</span>
                    <span className="block text-[10px] font-bold text-slate-400">Mata pelajaran</span>
                  </span>
                </button>
              ))}
              {chapters.map((chapter) => {
                const subject = db.subjects.find((s) => s.id === chapter.subjectId)
                return (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      navigate(`/materi/${chapter.id}`)
                      setOpen(false)
                      setQuery('')
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-slate-50"
                  >
                    <span className="text-lg">{chapter.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-extrabold text-slate-700">{chapter.title}</span>
                      <span className="block truncate text-[10px] font-bold text-slate-400">
                        {subject?.short} · {gradeLabel(chapter.grade)} · Semester {chapter.semester}
                      </span>
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                  </button>
                )
              })}
              <div className="mt-1 border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    navigate(`/alat?tab=kamus&q=${encodeURIComponent(query)}`)
                    setOpen(false)
                    setQuery('')
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[11px] font-bold text-brand-600 hover:bg-brand-50"
                >
                  <Search className="h-3.5 w-3.5" /> Cari “{truncate(query, 24)}” di Kamus Pintar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
