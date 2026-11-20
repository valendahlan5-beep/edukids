import type { BadgeDef } from '../types'

export const badges: BadgeDef[] = [
  {
    id: 'first-step',
    name: 'Langkah Pertama',
    emoji: '👣',
    description: 'Selesaikan materi pertamamu.',
    check: (s) => s.chaptersDone >= 1,
  },
  {
    id: 'bookworm',
    name: 'Kutu Buku',
    emoji: '📚',
    description: 'Selesaikan 5 materi pelajaran.',
    check: (s) => s.chaptersDone >= 5,
  },
  {
    id: 'materi-master',
    name: 'Master Materi',
    emoji: '🎓',
    description: 'Selesaikan 15 materi pelajaran.',
    check: (s) => s.chaptersDone >= 15,
  },
  {
    id: 'quiz-rookie',
    name: 'Pemain Kuis',
    emoji: '📝',
    description: 'Kerjakan kuis pertamamu.',
    check: (s) => s.quizzesDone >= 1,
  },
  {
    id: 'quiz-champion',
    name: 'Juara Kuis',
    emoji: '🏆',
    description: 'Dapatkan nilai 100 pada satu kuis.',
    check: (s) => s.perfectQuizzes >= 1,
  },
  {
    id: 'math-hero',
    name: 'Pahlawan Matematika',
    emoji: '🔢',
    description: 'Selesaikan 4 materi Matematika.',
    check: (s) => s.mathChapters >= 4,
  },
  {
    id: 'streak-3',
    name: 'Api Semangat',
    emoji: '🔥',
    description: 'Belajar 3 hari berturut-turut.',
    check: (s) => s.streak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Konsisten Hebat',
    emoji: '⚡',
    description: 'Belajar 7 hari berturut-turut.',
    check: (s) => s.streak >= 7,
  },
  {
    id: 'gamer',
    name: 'Sahabat Game',
    emoji: '🎮',
    description: 'Mainkan 5 game edukasi.',
    check: (s) => s.gamesPlayed >= 5,
  },
  {
    id: 'star-collector',
    name: 'Pemburu Bintang',
    emoji: '🌟',
    description: 'Kumpulkan 30 bintang.',
    check: (s) => s.stars >= 30,
  },
  {
    id: 'curious-mind',
    name: 'Pikiran Penasaran',
    emoji: '🤖',
    description: 'Bertanya 10 kali kepada AI Guru Pintar.',
    check: (s) => s.aiMessages >= 10,
  },
  {
    id: 'level-up',
    name: 'Naik Level',
    emoji: '🚀',
    description: 'Capai level 3.',
    check: (s) => s.points >= 600,
  },
  // Premium badges
  {
    id: 'knowledge-seeker',
    name: 'Penari Ilmu',
    emoji: '🦉',
    description: 'Kumpulkan 50 bintang.',
    check: (s) => s.stars >= 50,
  },
  {
    id: 'master-chapternavigator',
    name: 'Navigator Materi',
    emoji: '🗺️',
    description: 'Selesaikan 30 materi pelajaran.',
    check: (s) => s.chaptersDone >= 30,
  },
  {
    id: 'quiz-master',
    name: 'Master Kuis',
    emoji: '👑',
    description: 'Dapatkan 5 nilai 100 pada kuis.',
    check: (s) => s.perfectQuizzes >= 5,
  },
  {
    id: 'streak-14',
    name: 'Komitmen 2 Minggu',
    emoji: '📅',
    description: 'Belajar 14 hari berturut-turut.',
    check: (s) => s.streak >= 14,
  },
  {
    id: 'social-butterfly',
    name: 'Kucing Sosial',
    emoji: '🦋',
    description: 'Bagikan achievement ke luar.',
    check: (s) => false, // Feature for future social sharing
  },
  {
    id: 'early-bird',
    name: 'Pagi yang Prodktif',
    emoji: '🐦',
    description: 'Belajar sebelum pukul 08:00 pagi 5 kali.',
    check: (s) => false, // Feature for future time tracking
  },
  {
    id: 'perfect-semester',
    name: 'Semester Sempurna',
    emoji: '💯',
    description: 'Selesaikan semua materi semester 1 atau 2.',
    check: (s) => false, // Feature for future curriculum completion
  },
]

export const avatarChoices = [
  '🦊',
  '🐼',
  '🐯',
  '🐨',
  '🐸',
  '🐧',
  '🦁',
  '🐰',
  '🐙',
  '🦄',
  '🧒',
  '👧',
  '🧑‍🚀',
  '🕵️',
  '🧙',
  '👩‍🎓',
]

export const frameChoices = [
  { id: 'none', name: 'Tanpa Bingkai', emoji: '⭕', ring: 'ring-slate-200' },
  { id: 'frame-bintang', name: 'Bingkai Bintang', emoji: '⭐', ring: 'ring-sun-400' },
  { id: 'frame-pelangi', name: 'Bingkai Pelangi', emoji: '🌈', ring: 'ring-pink-400' },
  { id: 'frame-roket', name: 'Bingkai Roket', emoji: '🚀', ring: 'ring-brand-400' },
  { id: 'frame-juara', name: 'Bingkai Juara', emoji: '🏆', ring: 'ring-mint-500' },
]
