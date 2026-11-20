import { Navigate, Route, Routes } from 'react-router-dom'
import { useStore } from './lib/store'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'

// Student pages
import Beranda from './pages/Beranda'
import Pelajaran from './pages/Pelajaran'
import PelajaranDetail from './pages/PelajaranDetail'
import Materi from './pages/Materi'
import Kelas from './pages/Kelas'
import Video from './pages/Video'
import Kuis from './pages/Kuis'
import Game from './pages/Game'
import AI from './pages/AI'
import Prestasi from './pages/Prestasi'
import Jadwal from './pages/Jadwal'
import Alat from './pages/Alat'
import Profil from './pages/Profil'
import ProgressDashboard from './pages/ProgressDashboard'

// Parent
import OrangTua from './pages/OrangTua'

// Teacher & Admin
import Guru from './pages/Guru'
import Admin from './pages/Admin'
import AdminPengguna from './pages/AdminPengguna'
import AdminMateri from './pages/AdminMateri'
import AdminSoal from './pages/AdminSoal'
import AdminGame from './pages/AdminGame'
import AdminAI from './pages/AdminAI'
import AdminLaporan from './pages/AdminLaporan'
import AdminPengaturan from './pages/AdminPengaturan'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useStore()
  if (!user) return <Navigate to="/masuk" replace />
  return children
}

function RoleGuard({ allow, children }: { allow: string[]; children: JSX.Element }) {
  const { user } = useStore()
  if (!user) return <Navigate to="/masuk" replace />
  if (!allow.includes(user.role)) return <Navigate to={user.role === 'siswa' ? '/beranda' : user.role === 'orangtua' ? '/orangtua' : user.role === 'guru' ? '/guru' : '/admin'} replace />
  return children
}

export default function App() {
  const { user } = useStore()
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === 'siswa' ? '/beranda' : user.role === 'orangtua' ? '/orangtua' : user.role === 'guru' ? '/guru' : '/admin'} replace /> : <Landing />} />
      <Route path="/masuk" element={<Login />} />
      <Route path="/daftar" element={<Register />} />

      <Route element={<RequireAuth><Layout /></RequireAuth>}>
        {/* student */}
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/pelajaran" element={<Pelajaran />} />
        <Route path="/pelajaran/:subjectId" element={<PelajaranDetail />} />
        <Route path="/materi/:chapterId" element={<Materi />} />
        <Route path="/kelas" element={<Kelas />} />
        <Route path="/video" element={<Video />} />
        <Route path="/kuis" element={<Kuis />} />
        <Route path="/game" element={<Game />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/prestasi" element={<Prestasi />} />
        <Route path="/progress" element={<ProgressDashboard />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/alat" element={<Alat />} />
        <Route path="/profil" element={<Profil />} />

        {/* parent */}
        <Route path="/orangtua" element={<RoleGuard allow={['orangtua', 'admin']}><OrangTua /></RoleGuard>} />

        {/* teacher */}
        <Route path="/guru" element={<RoleGuard allow={['guru', 'admin']}><Guru /></RoleGuard>} />

        {/* admin */}
        <Route path="/admin" element={<RoleGuard allow={['admin']}><Admin /></RoleGuard>} />
        <Route path="/admin/pengguna" element={<RoleGuard allow={['admin']}><AdminPengguna /></RoleGuard>} />
        <Route path="/admin/materi" element={<RoleGuard allow={['admin', 'guru']}><AdminMateri /></RoleGuard>} />
        <Route path="/admin/soal" element={<RoleGuard allow={['admin', 'guru']}><AdminSoal /></RoleGuard>} />
        <Route path="/admin/game" element={<RoleGuard allow={['admin']}><AdminGame /></RoleGuard>} />
        <Route path="/admin/ai" element={<RoleGuard allow={['admin']}><AdminAI /></RoleGuard>} />
        <Route path="/admin/laporan" element={<RoleGuard allow={['admin', 'guru']}><AdminLaporan /></RoleGuard>} />
        <Route path="/admin/pengaturan" element={<RoleGuard allow={['admin']}><AdminPengaturan /></RoleGuard>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}