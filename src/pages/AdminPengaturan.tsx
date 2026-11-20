import { useState } from 'react'
import { useStore } from '../lib/store'
import { Card, PageHeader } from '../components/UI'

export default function AdminPengaturan() {
  const { db, saveSettings, exportData, importData, resetData, toast } = useStore()
  const [settings, setSettings] = useState(db.settings)
  const [importText, setImportText] = useState('')

  return (
    <div className="space-y-5">
      <PageHeader title="Pengaturan Aplikasi" subtitle="Atur pengaturan global dan cadangkan data." emoji="⚙️" />

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Pengaturan</h3>
        <div className="mt-3 space-y-3">
          <div>
            <label className="label">Nama Aplikasi</label>
            <input value={settings.appName} onChange={(e) => setSettings({ ...settings, appName: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Nama Sekolah</label>
            <input value={settings.schoolName} onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Pengumuman</label>
            <textarea value={settings.announcement} onChange={(e) => setSettings({ ...settings, announcement: e.target.value })} className="input" rows={2} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={settings.allowLeaderboard} onChange={(e) => setSettings({ ...settings, allowLeaderboard: e.target.checked })} />
            <span className="text-sm font-bold text-slate-600">Aktifkan papan peringkat</span>
          </div>
          <div>
            <label className="label">Poin Tantangan Harian</label>
            <input type="number" value={settings.dailyChallengePoints} onChange={(e) => setSettings({ ...settings, dailyChallengePoints: Number(e.target.value) })} className="input" />
          </div>
          <button onClick={() => { saveSettings(settings); toast('Pengaturan disimpan.', 'success') }} className="rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white">Simpan</button>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-base font-bold text-slate-800">Cadangkan & Pulihkan Data</h3>
        <div className="mt-3 space-y-3">
          <button onClick={() => { const data = exportData(); const blob = new Blob([data], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'edukids-backup.json'; a.click(); URL.revokeObjectURL(url) }} className="rounded-2xl bg-mint-500 px-4 py-2.5 text-sm font-extrabold text-white">Unduh Cadangan</button>
          <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Tempel JSON cadangan di sini..." className="input font-mono text-xs" rows={4} />
          <button onClick={() => { const res = importData(importText); toast(res.ok ? 'Data dipulihkan.' : (res.error ?? 'Gagal'), res.ok ? 'success' : 'error') }} className="rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white">Pulihkan</button>
        </div>
      </Card>

      <Card className="border-rose-200 p-5">
        <h3 className="font-display text-base font-bold text-rose-600">Zona Berbahaya</h3>
        <p className="text-xs font-semibold text-slate-500">Mengembalikan data ke kondisi awal. Semua perubahan akan hilang.</p>
        <button onClick={() => { if (confirm('Yakin reset semua data?')) resetData() }} className="mt-3 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-extrabold text-white">Reset Data</button>
      </Card>
    </div>
  )
}