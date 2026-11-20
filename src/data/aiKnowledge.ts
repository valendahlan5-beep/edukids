import type { AIEntry } from '../types'

export const aiKnowledge: AIEntry[] = [
  {
    id: 'ai-pancasila',
    keywords: ['pancasila', 'sila', 'dasar negara'],
    title: 'Pancasila',
    subjectId: 'pancasila',
    answer:
      'Pancasila adalah dasar negara Indonesia. Ada lima sila: (1) Ketuhanan yang Maha Esa, (2) Kemanusiaan yang adil dan beradab, (3) Persatuan Indonesia, (4) Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan, dan (5) Keadilan sosial bagi seluruh rakyat Indonesia. Dalam kehidupan sehari-hari, kita bisa mengamalkannya dengan menghormati teman yang berbeda agama, gotong royong, dan ikut musyawarah.',
    example: 'Contoh sederhana: memilih ketua kelas dengan pemungutan suara adalah pengamalan sila ke-4.',
  },
  {
    id: 'ai-fotosintesis',
    keywords: ['fotosintesis', 'tumbuhan membuat makanan', 'klorofil'],
    title: 'Fotosintesis',
    subjectId: 'ipas',
    answer:
      'Fotosintesis adalah proses tumbuhan hijau membuat makanan. Tumbuhan menyerap air dari akar, mengambil karbon dioksida dari udara, lalu dengan bantuan cahaya matahari dan klorofil (zat hijau daun) menghasilkan glukosa (gula) dan oksigen. Karena itu, tumbuhan disebut produsen dalam rantai makanan, dan kita mendapat oksigen dari tumbuhan.',
    example: 'Daun yang terkena sinar matahari akan menghasilkan oksigen pada siang hari.',
  },
  {
    id: 'ai-pecahan',
    keywords: ['pecahan', 'pembilang', 'penyebut', 'setengah'],
    title: 'Pecahan',
    subjectId: 'matematika',
    answer:
      'Pecahan menunjukkan bagian dari keseluruhan. Pada pecahan 1/2, angka 1 disebut pembilang dan 2 disebut penyebut. Untuk menjumlahkan pecahan dengan penyebut sama, jumlahkan pembilangnya saja. Untuk pecahan dengan penyebut berbeda, samakan penyebutnya dengan KPK terlebih dahulu.',
    example: '1/4 + 2/4 = 3/4. Untuk 1/2 + 1/3, samakan penyebut menjadi 6: 3/6 + 2/6 = 5/6.',
  },
  {
    id: 'ai-kpk-fpb',
    keywords: ['kpk', 'fpb', 'kelipatan', 'faktor persekutuan'],
    title: 'KPK dan FPB',
    subjectId: 'matematika',
    answer:
      'KPK adalah Kelipatan Persekutuan Terkecil, sedangkan FPB adalah Faktor Persekutuan Terbesar. Cara mudah: tulis faktorisasi prima kedua bilangan. KPK = hasil kali semua faktor prima dengan pangkat terbesar. FPB = hasil kali faktor prima yang sama dengan pangkat terkecil.',
    example: '12 = 2² × 3 dan 18 = 2 × 3². KPK = 2² × 3² = 36, sedangkan FPB = 2 × 3 = 6.',
  },
  {
    id: 'ai-siklus-air',
    keywords: ['siklus air', 'hujan', 'penguapan', 'evaporasi', 'kondensasi'],
    title: 'Siklus Air',
    subjectId: 'ipas',
    answer:
      'Siklus air adalah perputaran air di bumi. Air laut dan sungai menguap karena panas matahari (evaporasi), uap itu naik dan mendingin membentuk awan (kondensasi), lalu turun sebagai hujan (presipitasi). Air hujan meresap ke tanah, masuk ke sungai, dan kembali ke laut. Proses ini berulang terus dan menjaga persediaan air di bumi.',
    example: 'Embun di pagi hari adalah bagian dari siklus air, yaitu uap air yang mengembun.',
  },
  {
    id: 'ai-ekosistem',
    keywords: ['ekosistem', 'rantai makanan', 'produsen', 'konsumen', 'pengurai'],
    title: 'Ekosistem dan Rantai Makanan',
    subjectId: 'ipas',
    answer:
      'Ekosistem adalah hubungan antara makhluk hidup dan lingkungannya. Di dalamnya ada produsen (tumbuhan hijau), konsumen (hewan pemakan tumbuhan atau hewan lain), dan pengurai (bakteri dan jamur). Rantai makanan menunjukkan perpindahan energi, misalnya padi → tikus → ular → elang. Jika satu bagian hilang, keseimbangan ekosistem bisa terganggu.',
    example: 'Rantai makanan di sawah: padi → belalang → katak → ular.',
  },
  {
    id: 'ai-tata-surya',
    keywords: ['tata surya', 'planet', 'matahari', 'bumi', 'mars', 'jupiter'],
    title: 'Tata Surya',
    subjectId: 'ipas',
    answer:
      'Tata surya adalah matahari beserta semua benda langit yang mengelilinginya karena gaya gravitasi. Ada delapan planet: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus. Matahari adalah bintang dan sumber energi utama bagi kehidupan di Bumi. Bumi menempati urutan ketiga dari matahari.',
    example: 'Jupiter adalah planet terbesar, sedangkan Merkurius adalah planet terdekat dari matahari.',
  },
  {
    id: 'ai-listrik',
    keywords: ['listrik', 'rangkaian', 'arus', 'konduktor', 'isolator'],
    title: 'Listrik',
    subjectId: 'ipas',
    answer:
      'Listrik adalah bentuk energi yang membuat alat elektronik bekerja. Rangkaian listrik ada dua: seri (satu jalur, jika satu lampu mati semua mati) dan paralel (cabang, lampu lain tetap menyala). Bahan yang dapat menghantarkan listrik disebut konduktor (tembaga, besi), sedangkan yang tidak menghantarkan disebut isolator (karet, plastik). Listrik bisa berbahaya, jadi selalu hati-hati saat menggunakan stopkontak.',
    example: 'Lampu di rumah biasanya dipasang paralel agar bisa dinyalakan sendiri-sendiri.',
  },
  {
    id: 'ai-pantun',
    keywords: ['pantun', 'sampiran', 'isi pantun', 'puisi lama'],
    title: 'Pantun',
    subjectId: 'bindo',
    answer:
      'Pantun adalah puisi lama yang terdiri dari empat baris. Baris pertama dan kedua disebut sampiran, baris ketiga dan keempat disebut isi. Sajaknya a-b-a-b. Pantun biasanya berisi nasihat, jenaka, cinta, atau teka-teki. Cara membuat pantun: tentukan isi pesan, buat dua baris isi yang bersajak, lalu buat sampiran yang bunyi akhirnya sama dengan isi.',
    example:
      'Rajin belajar setiap hari, / agar kelak menjadi juara. / Jangan malas menuntut ilmu, / ilmu adalah harta berharga.',
  },
  {
    id: 'ai-teks',
    keywords: ['teks', 'narasi', 'deskripsi', 'eksposisi', 'prosedur', 'laporan'],
    title: 'Jenis Teks',
    subjectId: 'bindo',
    answer:
      'Beberapa jenis teks yang kita pelajari: teks narasi menceritakan urutan peristiwa (cerita), deskripsi menggambarkan sesuatu dengan detail, eksposisi menjelaskan informasi atau pendapat, prosedur berisi langkah-langkah, laporan menyajikan hasil pengamatan, dan argumentasi meyakinkan pembaca. Setiap teks punya tujuan dan ciri kebahasaan sendiri.',
    example: 'Resep membuat es buah adalah contoh teks prosedur karena berisi langkah-langkah.',
  },
  {
    id: 'ai-inggris-greeting',
    keywords: ['greeting', 'sapaan', 'how are you', 'good morning', 'perkenalan'],
    title: 'Greetings and Introductions',
    subjectId: 'inggris',
    answer:
      'Sapaan dalam bahasa Inggris: Good morning (pagi), Good afternoon (siang/sore), Good evening (malam), Good night (sebelum tidur), dan How are you? (apa kabar?). Jawab dengan "I am fine, thank you" atau "I am good". Untuk memperkenalkan diri: "My name is ...", "I am ... years old", "I live in ...".',
    example: 'A: Good morning! How are you? B: Good morning! I am fine, thank you.',
  },
  {
    id: 'ai-bilangan-bulat',
    keywords: ['bilangan bulat', 'negatif', 'positif', 'garis bilangan'],
    title: 'Bilangan Bulat',
    subjectId: 'matematika',
    answer:
      'Bilangan bulat terdiri dari bilangan negatif, nol, dan bilangan positif. Pada garis bilangan, semakin ke kanan nilainya semakin besar. Aturan hitung: positif + positif = positif, negatif + negatif = negatif, sedangkan positif + negatif dikurangi dan memakai tanda bilangan yang lebih besar. Mengurangi bilangan negatif sama dengan menambah.',
    example: '5 + (-8) = -3 dan (-4) - (-6) = -4 + 6 = 2.',
  },
  {
    id: 'ai-volume',
    keywords: ['volume', 'kubus', 'balok', 'bangun ruang'],
    title: 'Volume Bangun Ruang',
    subjectId: 'matematika',
    answer:
      'Volume mengukur isi bangun ruang. Volume kubus = s × s × s. Volume balok = panjang × lebar × tinggi. Volume prisma = luas alas × tinggi. Untuk tabung = π × r² × t. Satuan volume contohnya cm³ atau liter. Ingat: 1 liter = 1.000 cm³ dan 1 m³ = 1.000 liter.',
    example: 'Kubus dengan sisi 4 cm memiliki volume 4 × 4 × 4 = 64 cm³.',
  },
  {
    id: 'ai-toleransi',
    keywords: ['toleransi', 'menghargai perbedaan', 'rukun', 'keberagaman'],
    title: 'Toleransi dan Kerukunan',
    subjectId: 'agama',
    answer:
      'Toleransi adalah sikap menghargai perbedaan, baik agama, suku, budaya, maupun pendapat. Kita bisa berteman dengan siapa saja tanpa membeda-bedakan. Toleransi bukan berarti menyamakan semua hal, tetapi saling menghormati dan tidak memaksakan kehendak. Hidup rukun membuat lingkungan aman dan menyenangkan.',
    example: 'Menghormati teman yang sedang beribadah adalah contoh toleransi.',
  },
  {
    id: 'ai-gotong-royong',
    keywords: ['gotong royong', 'kerja sama', 'kebersamaan'],
    title: 'Gotong Royong',
    subjectId: 'pancasila',
    answer:
      'Gotong royong berarti bekerja bersama-sama untuk kepentingan bersama. Contohnya membersihkan kelas, membangun jembatan desa, atau membantu tetangga yang terkena musibah. Gotong royong mencerminkan sila ke-3 Pancasila, yaitu Persatuan Indonesia. Manfaatnya pekerjaan cepat selesai dan hubungan pertemanan makin erat.',
    example: 'Kerja bakti membersihkan selokan sekolah adalah gotong royong.',
  },
  {
    id: 'ai-jujur',
    keywords: ['jujur', 'kejujuran', 'disiplin', 'tanggung jawab'],
    title: 'Jujur dan Tanggung Jawab',
    subjectId: 'agama',
    answer:
      'Jujur berarti mengatakan dan melakukan sesuatu sesuai kebenaran. Disiplin berarti menaati aturan dan tepat waktu. Tanggung jawab berarti menyelesaikan tugas dengan sungguh-sungguh dan berani menerima akibatnya. Ketiga sikap ini membuat orang lain percaya kepada kita.',
    example: 'Mengakui kesalahan karena lupa mengerjakan PR lebih baik daripada berbohong.',
  },
  {
    id: 'ai-olahraga',
    keywords: ['olahraga', 'kebugaran', 'pemanasan', 'senam', 'sehat'],
    title: 'Kebugaran Jasmani',
    subjectId: 'pjok',
    answer:
      'Kebugaran jasmani adalah kemampuan tubuh melakukan aktivitas tanpa merasa cepat lelah. Cara meningkatkannya: rutin bergerak 30–60 menit setiap hari, melakukan pemanasan sebelum olahraga, pendinginan setelahnya, serta tidur cukup 8–10 jam. Jangan lupa minum air putih dan makan makanan bergizi. Olahraga yang menyenangkan membuat tubuh sehat dan pikiran segar.',
    example: 'Sebelum berlari, lakukan pemanasan berupa peregangan selama 5 menit.',
  },
  {
    id: 'ai-batik',
    keywords: ['batik', 'motif', 'seni rupa', 'karya seni'],
    title: 'Motif Batik Nusantara',
    subjectId: 'seni',
    answer:
      'Batik adalah seni menghias kain khas Indonesia. Motif batik dibuat dengan lilin dan pewarna. Setiap daerah punya motif khas, misalnya Parang dari Yogyakarta, Kawung dari Jawa Tengah, dan Mega Mendung dari Cirebon. Motif batik sering mengandung makna, seperti keberanian, kesabaran, atau kemakmuran. UNESCO mengakui batik sebagai warisan budaya takbenda pada tahun 2009.',
    example: 'Motif Mega Mendung berbentuk awan dan melambangkan ketenangan.',
  },
  {
    id: 'ai-bahasa-daerah',
    keywords: ['bahasa daerah', 'muatan lokal', 'budaya daerah', 'lagu daerah'],
    title: 'Bahasa dan Budaya Daerah',
    subjectId: 'mulok',
    answer:
      'Indonesia memiliki banyak bahasa daerah, seperti Jawa, Sunda, Minang, Bugis, dan Dayak. Bahasa daerah adalah kekayaan budaya yang perlu dilestarikan. Kita bisa mempelajarinya melalui percakapan sehari-hari, lagu daerah, cerita rakyat, dan permainan tradisional. Menghargai bahasa daerah tidak berarti melupakan Bahasa Indonesia sebagai bahasa persatuan.',
    example: 'Lagu "Gundul-Gundul Pacul" berasal dari Jawa Tengah dan berisi nasihat.',
  },
  {
    id: 'ai-belajar',
    keywords: ['cara belajar', 'tips belajar', 'fokus', 'malas', 'hafalan'],
    title: 'Tips Belajar Efektif',
    answer:
      'Tips belajar yang ampuh: (1) belajar sedikit-sedikit tetapi rutin, (2) buat jadwal dan target kecil, (3) baca materi lalu ceritakan dengan kata-katamu sendiri, (4) kerjakan latihan soal, (5) istirahat 5–10 menit setelah 25 menit belajar, dan (6) tidur cukup. Belajar sambil bermain boleh, asal waktunya diatur. Kalau belum paham, jangan malu bertanya kepada guru, orang tua, atau AI Guru Pintar.',
    example: 'Belajar 20 menit setiap hari lebih baik daripada belajar 3 jam sekali seminggu.',
  },
  {
    id: 'ai-motivasi',
    keywords: ['semangat', 'tidak bisa', 'susah', 'menyerah', 'gagal'],
    title: 'Tetap Semangat',
    answer:
      'Tidak bisa hari ini bukan berarti tidak bisa selamanya. Coba pecah pelajaran menjadi bagian kecil, mulai dari yang paling mudah. Rayakan usaha kecilmu, dan ingat bahwa salah itu bagian dari belajar. Kamu boleh beristirahat, tapi jangan menyerah. Kiki dan seluruh tim EduKids percaya kamu bisa!',
    example: 'Kalau soal matematika sulit, coba tulis yang diketahui dulu, lalu cari yang ditanya.',
  },
  {
    id: 'ai-aman-internet',
    keywords: ['internet aman', 'data pribadi', 'orang asing', 'password'],
    title: 'Aman Menggunakan Internet',
    answer:
      'Saat menggunakan internet: jangan bagikan alamat rumah, nomor telepon, atau password kepada siapa pun. Jangan berbicara dengan orang asing tanpa sepengetahuan orang tua. Jika ada iklan atau tautan aneh, jangan diklik. Ceritakan kepada orang tua atau guru jika ada sesuatu yang membuatmu tidak nyaman. Internet bermanfaat jika digunakan dengan aman dan bijak.',
    example: 'Password rahasiamu tidak boleh dibagikan, bahkan kepada teman dekat.',
  },
  {
    id: 'ai-tata-krama',
    keywords: ['sopan santun', 'tata krama', 'terima kasih', 'permisi', 'maaf'],
    title: 'Sopan Santun',
    answer:
      'Sopan santun adalah perilaku baik saat berinteraksi dengan orang lain. Contohnya mengucapkan "tolong" saat meminta bantuan, "terima kasih" setelah dibantu, "maaf" jika berbuat salah, dan "permisi" saat lewat di depan orang. Kita juga menghormati orang tua dan guru, serta mendengarkan saat orang lain berbicara.',
    example: '"Bu, permisi. Boleh saya bertanya?" adalah kalimat sopan.',
  },
  {
    id: 'ai-cuaca',
    keywords: ['cuaca', 'musim', 'hujan', 'kemarau', 'iklim'],
    title: 'Cuaca dan Musim',
    subjectId: 'ipas',
    answer:
      'Cuaca adalah keadaan udara pada waktu dan tempat tertentu, bisa berubah setiap hari. Musim adalah keadaan cuaca yang berlangsung lama. Indonesia memiliki musim hujan dan musim kemarau. Saat musim hujan, kita perlu membawa payung dan menjaga kesehatan. Saat kemarau, kita harus hemat air.',
    example: 'Langit mendung dan angin kencang sering menjadi tanda akan turun hujan.',
  },
  {
    id: 'ai-pencernaan',
    keywords: ['pencernaan', 'lambung', 'usus', 'makanan', 'organ'],
    title: 'Sistem Pencernaan Manusia',
    subjectId: 'ipas',
    answer:
      'Urutan pencernaan makanan: mulut (dikunyah dan dicampur air liur) → kerongkongan → lambung (dicerna dengan asam lambung) → usus halus (menyerap sari makanan) → usus besar (menyerap air) → anus. Makanan sehat dan dikunyah dengan baik membantu pencernaan bekerja lancar. Jangan lupa minum air dan makan sayur serta buah.',
    example: 'Nasi yang dikunyah lama akan terasa manis karena air liur mengubah zat tepung menjadi gula.',
  },
  {
    id: 'ai-hak-kewajiban',
    keywords: ['hak', 'kewajiban', 'tanggung jawab', 'aturan'],
    title: 'Hak dan Kewajiban',
    subjectId: 'pancasila',
    answer:
      'Hak adalah sesuatu yang kita terima, sedangkan kewajiban adalah sesuatu yang harus kita lakukan. Contoh hak siswa: mendapat pelajaran dan diperlakukan dengan adil. Contoh kewajiban siswa: mengerjakan tugas, menaati aturan sekolah, dan menghormati guru. Hak dan kewajiban harus dijalankan seimbang agar hidup tertib dan nyaman.',
    example: 'Kita berhak bermain di halaman sekolah, tetapi wajib menjaga kebersihannya.',
  },
  {
    id: 'ai-bilangan-cacah',
    keywords: ['bilangan cacah', 'nilai tempat', 'ribuan', 'ratusan', 'puluhan'],
    title: 'Nilai Tempat Bilangan',
    subjectId: 'matematika',
    answer:
      'Setiap angka dalam bilangan memiliki nilai tempat. Contoh 3.452: angka 3 bernilai 3.000 (ribuan), 4 bernilai 400 (ratusan), 5 bernilai 50 (puluhan), dan 2 bernilai 2 (satuan). Memahami nilai tempat membantu kita membaca, menulis, membandingkan, dan menghitung bilangan besar dengan benar.',
    example: 'Pada 2.708, angka 7 menempati ratusan sehingga nilainya 700.',
  },
  {
    id: 'ai-keliling-luas',
    keywords: ['keliling', 'luas', 'persegi', 'segitiga', 'lingkaran'],
    title: 'Keliling dan Luas',
    subjectId: 'matematika',
    answer:
      'Keliling adalah jumlah panjang semua sisi, sedangkan luas adalah ukuran daerah di dalam bangun. Persegi: keliling = 4 × s, luas = s × s. Persegi panjang: keliling = 2 × (p + l), luas = p × l. Segitiga: keliling = jumlah ketiga sisi, luas = ½ × alas × tinggi. Lingkaran: keliling = 2πr, luas = πr².',
    example: 'Persegi panjang 8 cm × 5 cm memiliki keliling 26 cm dan luas 40 cm².',
  },
  {
    id: 'ai-norma',
    keywords: ['norma', 'aturan', 'adat', 'hukum'],
    title: 'Norma dalam Masyarakat',
    subjectId: 'pancasila',
    answer:
      'Norma adalah aturan yang mengatur perilaku manusia dalam masyarakat. Ada norma agama (perintah dan larangan agama), norma kesusilaan (hati nurani), norma kesopanan (adat kebiasaan), dan norma hukum (aturan negara yang wajib dipatuhi). Norma membuat kehidupan tertib, aman, dan harmonis.',
    example: 'Mengantre dengan tertib adalah penerapan norma kesopanan.',
  },
  {
    id: 'ai-wujud-zat',
    keywords: ['wujud zat', 'padat', 'cair', 'gas', 'menguap', 'membeku'],
    title: 'Wujud Zat dan Perubahannya',
    subjectId: 'ipas',
    answer:
      'Zat memiliki tiga wujud: padat (bentuk dan volume tetap), cair (volume tetap, bentuk mengikuti wadah), dan gas (bentuk dan volume berubah memenuhi ruang). Perubahan wujud: mencair (padat → cair), membeku (cair → padat), menguap (cair → gas), mengembun (gas → cair), menyublim (padat → gas), dan mengkristal (gas → padat).',
    example: 'Es batu mencair karena menerima panas dari lingkungan.',
  },
  {
    id: 'ai-demokrasi',
    keywords: ['demokrasi', 'musyawarah', 'pemilihan', 'voting'],
    title: 'Musyawarah dan Demokrasi',
    subjectId: 'pancasila',
    answer:
      'Musyawarah adalah berdiskusi bersama untuk mengambil keputusan. Dalam musyawarah, semua pendapat didengar, lalu dicari kesepakatan. Jika kesepakatan tidak tercapai, bisa dilakukan pemungutan suara (voting). Musyawarah adalah pengamalan sila ke-4 Pancasila. Hasil musyawarah harus dilaksanakan dengan tanggung jawab.',
    example: 'Memilih ketua kelas dengan voting adalah contoh demokrasi sederhana.',
  },
  {
    id: 'ai-english-numbers',
    keywords: ['numbers', 'angka bahasa inggris', 'one two three', 'colors', 'warna'],
    title: 'Numbers and Colors',
    subjectId: 'inggris',
    answer:
      'Numbers: one (1), two (2), three (3), four (4), five (5), six (6), seven (7), eight (8), nine (9), ten (10). Colors: red (merah), blue (biru), yellow (kuning), green (hijau), orange (oranye), purple (ungu), pink (merah muda), brown (cokelat), black (hitam), white (putih). Gunakan "I have two red apples" untuk menyebut dua apel merah.',
    example: 'The sun is yellow and the sky is blue.',
  },
]
