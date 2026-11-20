import type { ChapterSeed } from '../../types'

const grade2: ChapterSeed[] = [
  {
    id: 'g2-agama-1',
    subjectId: 'agama',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'Mengenal Kitab Suci dan Tempat Ibadah',
    emoji: '🕌',
    description: 'Mengenal kitab suci dan tempat ibadah agama yang ada di Indonesia.',
    objectives: [
      'Menyebutkan kitab suci beberapa agama di Indonesia',
      'Menjodohkan agama dengan tempat ibadahnya',
      'Membiasakan sikap menghormati tempat ibadah agama lain',
    ],
    sections: [
      {
        heading: 'Kitab Suci',
        paragraphs: [
          'Setiap agama memiliki kitab suci yang menjadi pedoman hidup. Umat Islam memiliki Alquran.',
          'Umat Kristen dan Katolik memiliki Alkitab. Umat Hindu memiliki Weda, umat Buddha memiliki Tripitaka, dan umat Konghucu memiliki kitab Si Shu.',
        ],
        bullets: [
          'Islam: Alquran',
          'Kristen dan Katolik: Alkitab',
          'Hindu: Weda',
          'Buddha: Tripitaka',
        ],
      },
      {
        heading: 'Tempat Ibadah',
        paragraphs: [
          'Setiap agama punya tempat ibadah. Umat Islam beribadah di masjid, umat Kristen dan Katolik di gereja, umat Hindu di pura, umat Buddha di vihara, dan umat Konghucu di kelenteng.',
          'Kita menjaga ketenangan saat melewati tempat ibadah. Menghormati tempat ibadah agama lain adalah tanda hidup rukun.',
        ],
        example: 'Saat melewati masjid, Beni berjalan pelan dan tidak berteriak. Ia menghormati orang yang sedang beribadah.',
      },
    ],
    summary: [
      'Setiap agama memiliki kitab suci sebagai pedoman hidup.',
      'Tempat ibadah setiap agama berbeda, seperti masjid, gereja, pura, vihara, dan kelenteng.',
      'Menghormati tempat ibadah agama lain membuat hidup rukun.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Tempat ibadah umat Hindu adalah ...',
        options: ['pura', 'masjid', 'vihara'],
        answer: 'pura',
        explanation: 'Umat Hindu beribadah di pura, sedangkan masjid untuk umat Islam dan vihara untuk umat Buddha.',
      },
      {
        type: 'menjodohkan',
        text: 'Jodohkan tempat ibadah dengan agamanya.',
        answer: '',
        pairs: [
          ['Masjid', 'Islam'],
          ['Gereja', 'Kristen'],
          ['Vihara', 'Buddha'],
        ],
        explanation: 'Masjid dipakai umat Islam, gereja umat Kristen, dan vihara umat Buddha.',
      },
      {
        type: 'benar-salah',
        text: 'Setiap agama memiliki kitab suci yang mengajarkan kebaikan.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Semua kitab suci mengajarkan kebaikan dan menjadi pedoman hidup umatnya.',
      },
    ],
  },
  {
    id: 'g2-agama-2',
    subjectId: 'agama',
    grade: 2,
    semester: 2,
    order: 2,
    title: 'Jujur, Disiplin, dan Percaya Diri',
    emoji: '🌟',
    description: 'Membiasakan sikap jujur, disiplin, dan percaya diri setiap hari.',
    objectives: [
      'Menjelaskan arti sikap jujur',
      'Menyebutkan contoh sikap disiplin di sekolah',
      'Menunjukkan sikap percaya diri tanpa sombong',
    ],
    sections: [
      {
        heading: 'Jujur dan Disiplin',
        paragraphs: [
          'Jujur berarti berkata dan berbuat sesuai kenyataan. Jika melakukan kesalahan, kita berani mengakui.',
          'Disiplin berarti menaati aturan dan tepat waktu. Kita bangun pagi, mengerjakan tugas, dan tidak menunda.',
        ],
        bullets: [
          'Mengakui kesalahan',
          'Tidak berbohong',
          'Datang tepat waktu',
          'Mengerjakan tugas',
        ],
      },
      {
        heading: 'Percaya Diri',
        paragraphs: [
          'Percaya diri berarti yakin pada kemampuan sendiri. Kita berani bertanya, menjawab, dan tampil di depan kelas.',
          'Percaya diri bukan berarti sombong. Kita tetap mendengarkan pendapat teman dan mau belajar.',
        ],
        example: 'Sari lupa membawa buku. Ia berkata jujur kepada guru, lalu meminjam buku teman dengan izin.',
      },
    ],
    summary: [
      'Jujur berarti berkata benar dan berani mengakui kesalahan.',
      'Disiplin berarti menaati aturan dan datang tepat waktu.',
      'Percaya diri membuat kita berani tampil, tetapi tetap rendah hati.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Sikap mengakui kesalahan termasuk perilaku ...',
        options: ['jujur', 'sombong', 'malas'],
        answer: 'jujur',
        explanation: 'Mengakui kesalahan adalah ciri perilaku jujur karena berkata sesuai kenyataan.',
      },
      {
        type: 'isian',
        text: 'Datang ke sekolah tepat waktu menunjukkan sikap ...',
        answer: 'disiplin',
        explanation: 'Disiplin berarti menaati aturan waktu, termasuk datang tepat waktu ke sekolah.',
      },
      {
        type: 'cerita',
        story: 'Doni lupa mengerjakan PR. Saat ditanya guru, ia mengaku belum mengerjakan dan berjanji akan menyusul.',
        text: 'Sikap Doni menunjukkan ...',
        options: ['kejujuran', 'kecurangan', 'kesombongan'],
        answer: 'kejujuran',
        explanation: 'Doni berkata benar tentang PR-nya, jadi ia menunjukkan sikap jujur.',
      },
    ],
  },
  {
    id: 'g2-pancasila-1',
    subjectId: 'pancasila',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'Hidup Rukun di Rumah dan Sekolah',
    emoji: '🤝',
    description: 'Membiasakan hidup rukun dengan keluarga dan teman di sekolah.',
    objectives: [
      'Menjelaskan arti hidup rukun',
      'Menyebutkan contoh hidup rukun di rumah dan di sekolah',
      'Membiasakan sikap menghormati perbedaan teman',
    ],
    sections: [
      {
        heading: 'Rukun di Rumah',
        paragraphs: [
          'Hidup rukun berarti hidup damai dan saling menghormati. Di rumah, kita membantu orang tua dan tidak bertengkar dengan saudara.',
          'Jika ada masalah, kita bicarakan dengan tenang. Meminta maaf lebih baik daripada memendam marah.',
        ],
        bullets: [
          'Saling membantu',
          'Berbicara dengan lembut',
          'Meminta maaf jika salah',
        ],
      },
      {
        heading: 'Rukun di Sekolah',
        paragraphs: [
          'Di sekolah, kita berteman dengan semua orang tanpa membeda-bedakan. Kita tidak mengejek nama atau bentuk tubuh teman.',
          'Kerja sama membuat pekerjaan cepat selesai. Saat piket kelas, kita bekerja bersama dengan senang hati.',
        ],
        example: 'Saat piket, Rina menyapu dan Bayu menata meja. Kelas menjadi bersih dan mereka senang.',
      },
    ],
    summary: [
      'Hidup rukun berarti hidup damai dan saling menghormati.',
      'Rukun di sekolah ditunjukkan dengan berteman tanpa membeda-bedakan.',
      'Kerja sama dan saling memaafkan membuat hidup rukun terjaga.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Hidup rukun artinya hidup ...',
        options: ['damai dan saling menghormati', 'saling mengejek', 'sendiri-sendiri'],
        answer: 'damai dan saling menghormati',
        explanation: 'Hidup rukun berarti hidup damai, saling menghormati, dan saling membantu.',
      },
      {
        type: 'benar-salah',
        text: 'Menertawakan nama teman adalah contoh hidup rukun.',
        options: ['Benar', 'Salah'],
        answer: 'Salah',
        explanation: 'Menertawakan nama teman menyakiti hati, jadi bukan contoh hidup rukun.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['rukun', 'kelas', 'Di', 'harus', 'kita', 'hidup'],
        answer: 'Di kelas kita harus hidup rukun',
        explanation: 'Kalimat itu mengingatkan bahwa hidup rukun harus dilakukan di kelas.',
      },
    ],
  },
  {
    id: 'g2-pancasila-2',
    subjectId: 'pancasila',
    grade: 2,
    semester: 2,
    order: 2,
    title: 'Musyawarah Sederhana',
    emoji: '🗣️',
    description: 'Belajar bermusyawarah untuk mengambil keputusan bersama dengan adil.',
    objectives: [
      'Menjelaskan arti musyawarah',
      'Menyebutkan cara bermusyawarah yang baik',
      'Menerima hasil musyawarah dengan lapang dada',
    ],
    sections: [
      {
        heading: 'Musyawarah di Rumah',
        paragraphs: [
          'Musyawarah adalah berdiskusi untuk mengambil keputusan bersama. Semua orang boleh menyampaikan pendapat.',
          'Contohnya, keluarga berdiskusi menentukan tempat liburan. Ayah, ibu, dan anak memberi usul.',
        ],
        bullets: [
          'Semua boleh berpendapat',
          'Dengarkan pendapat orang lain',
          'Jangan memotong pembicaraan',
        ],
      },
      {
        heading: 'Musyawarah di Kelas',
        paragraphs: [
          'Di kelas, musyawarah dilakukan saat memilih ketua kelas atau menentukan permainan. Kita bisa memilih dengan cara voting.',
          'Hasil musyawarah harus diterima dengan lapang dada. Yang tidak terpilih tetap membantu yang terpilih.',
        ],
        example: 'Kelas memilih ketua kelas. Ada dua calon. Setelah dihitung, calon dengan suara terbanyak menang, dan semua menerima hasilnya.',
      },
    ],
    summary: [
      'Musyawarah adalah berdiskusi untuk mengambil keputusan bersama.',
      'Semua peserta boleh berpendapat dan harus saling mendengarkan.',
      'Hasil musyawarah diterima dengan lapang dada.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'cerita',
        story: 'Kelompok Rani ingin bermain saat istirahat. Rani mengusulkan bermain lompat tali, sedangkan teman lain ingin bermain kelereng. Mereka berdiskusi dan akhirnya sepakat bermain kelereng hari ini dan lompat tali besok.',
        text: 'Apa yang dilakukan kelompok Rani?',
        options: ['Bermusyawarah', 'Bertengkar', 'Bermain sendiri'],
        answer: 'Bermusyawarah',
        explanation: 'Mereka berdiskusi dan membuat kesepakatan bersama, itulah musyawarah.',
      },
      {
        type: 'pg',
        text: 'Cara memilih ketua kelas dengan suara terbanyak disebut ...',
        options: ['voting', 'menyontek', 'mengejek'],
        answer: 'voting',
        explanation: 'Voting adalah pemungutan suara untuk memilih, dan yang suaranya terbanyak menang.',
      },
      {
        type: 'isian',
        text: 'Saat teman berbicara, kita harus ... pendapatnya.',
        answer: 'mendengarkan',
        explanation: 'Mendengarkan pendapat teman adalah cara bermusyawarah yang sopan dan adil.',
      },
    ],
  },
  {
    id: 'g2-bindo-1',
    subjectId: 'bindo',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'Kalimat dan Tanda Baca',
    emoji: '✍️',
    description: 'Menulis kalimat sederhana dengan huruf kapital dan tanda baca yang tepat.',
    objectives: [
      'Menulis awal kalimat dan nama dengan huruf kapital',
      'Menggunakan titik, tanda tanya, dan tanda seru dengan tepat',
      'Membaca kalimat dengan intonasi yang sesuai',
    ],
    sections: [
      {
        heading: 'Huruf Kapital',
        paragraphs: [
          'Kalimat dimulai dengan huruf kapital. Nama orang, nama kota, dan nama hari juga ditulis dengan huruf kapital.',
          'Contohnya, "Budi pergi ke Bandung pada hari Senin." Huruf B, B pada Bandung, dan S pada Senin ditulis kapital.',
        ],
        bullets: [
          'Awal kalimat',
          'Nama orang',
          'Nama kota',
          'Nama hari',
        ],
      },
      {
        heading: 'Tanda Baca',
        paragraphs: [
          'Kalimat berita diakhiri dengan titik. Kalimat tanya diakhiri dengan tanda tanya.',
          'Kalimat perintah atau seruan diakhiri dengan tanda seru. Untuk jeda dalam kalimat, kita memakai koma.',
        ],
        example: '"Siapa namamu?" tanya guru. "Namaku Sinta!" jawab Sinta dengan senang.',
      },
    ],
    summary: [
      'Huruf kapital dipakai pada awal kalimat dan nama orang, kota, atau hari.',
      'Titik mengakhiri kalimat berita, tanda tanya untuk pertanyaan, dan tanda seru untuk seruan.',
      'Koma dipakai untuk jeda di tengah kalimat.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Kalimat tanya diakhiri dengan tanda ...',
        options: ['tanya (?)', 'titik (.)', 'seru (!)'],
        answer: 'tanya (?)',
        explanation: 'Kalimat tanya berisi pertanyaan sehingga diakhiri tanda tanya (?).',
      },
      {
        type: 'benar-salah',
        text: 'Nama hari ditulis dengan huruf kecil di awal.',
        options: ['Benar', 'Salah'],
        answer: 'Salah',
        explanation: 'Nama hari adalah kata khusus sehingga ditulis dengan huruf kapital, seperti Senin.',
      },
      {
        type: 'isian',
        text: 'Huruf pertama pada awal kalimat ditulis dengan huruf ...',
        answer: 'kapital',
        explanation: 'Setiap kalimat dimulai dengan huruf kapital sesuai aturan penulisan.',
      },
    ],
  },
  {
    id: 'g2-bindo-2',
    subjectId: 'bindo',
    grade: 2,
    semester: 2,
    order: 2,
    title: 'Dongeng Nusantara: Malin Kundang',
    emoji: '🌊',
    description: 'Membaca dongeng Malin Kundang dan mengambil pesan tentang hormat kepada orang tua.',
    objectives: [
      'Menceritakan kembali kisah Malin Kundang secara urut',
      'Menyebutkan pesan moral cerita Malin Kundang',
      'Menjelaskan sikap yang baik kepada orang tua',
    ],
    sections: [
      {
        heading: 'Cerita Malin Kundang',
        paragraphs: [
          'Malin Kundang tinggal bersama ibunya di Sumatera Barat. Ia pergi merantau untuk mengubah nasib.',
          'Setelah lama, Malin menjadi kaya dan kembali dengan kapal besar. Sayangnya, ia malu mengakui ibunya yang sederhana.',
        ],
        bullets: [
          'Dari Sumatera Barat',
          'Malin pergi merantau',
          'Malin menjadi kaya',
          'Ia malu pada ibunya',
        ],
      },
      {
        heading: 'Pesan Cerita',
        paragraphs: [
          'Ibu Malin sedih karena tidak diakui. Ia berdoa, lalu kapal Malin berubah menjadi batu.',
          'Dongeng ini mengajarkan kita untuk menghormati orang tua. Kita tidak boleh sombong setelah berhasil.',
        ],
        example: 'Batu Malin Kundang dipercaya berada di pantai Air Manis, Padang. Banyak orang datang untuk melihatnya.',
      },
    ],
    summary: [
      'Malin Kundang adalah dongeng dari Sumatera Barat.',
      'Malin dikutuk menjadi batu karena malu mengakui ibunya.',
      'Cerita ini mengajarkan hormat kepada orang tua dan tidak sombong.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'cerita',
        story: 'Malin Kundang menjadi kaya dan kembali ke kampung. Ia melihat ibunya, tetapi pura-pura tidak mengenalinya.',
        text: 'Mengapa Malin berpura-pura tidak mengenali ibunya?',
        options: ['Karena ia malu kepada ibunya', 'Karena ibunya pergi', 'Karena ia lupa rumahnya'],
        answer: 'Karena ia malu kepada ibunya',
        explanation: 'Malin malu karena ibunya sederhana, padahal ia sudah menjadi kaya.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['orang', 'hormati', 'Kita', 'tua', 'harus'],
        answer: 'Kita harus hormati orang tua',
        explanation: 'Kalimat itu berisi pesan utama dongeng Malin Kundang.',
      },
      {
        type: 'pg',
        text: 'Cerita Malin Kundang berasal dari ...',
        options: ['Sumatera Barat', 'Jawa Timur', 'Sulawesi Selatan'],
        answer: 'Sumatera Barat',
        explanation: 'Malin Kundang adalah dongeng masyarakat Sumatera Barat.',
      },
    ],
  },
  {
    id: 'g2-matematika-1',
    subjectId: 'matematika',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'Nilai Tempat dan Membandingkan Bilangan',
    emoji: '🔢',
    description: 'Mengenal nilai tempat puluhan dan satuan serta membandingkan bilangan.',
    objectives: [
      'Menentukan nilai tempat puluhan dan satuan',
      'Menulis bilangan dari bentuk puluhan dan satuan',
      'Membandingkan dua bilangan dengan tanda >, <, atau =',
    ],
    sections: [
      {
        heading: 'Nilai Tempat',
        paragraphs: [
          'Bilangan dua angka terdiri dari puluhan dan satuan. Pada bilangan 34, angka 3 menempati puluhan dan angka 4 menempati satuan.',
          'Jadi 34 sama dengan 3 puluhan ditambah 4 satuan, atau 30 + 4.',
        ],
        bullets: [
          '34: 3 puluhan, 4 satuan',
          '50: 5 puluhan, 0 satuan',
          '27: 2 puluhan, 7 satuan',
        ],
      },
      {
        heading: 'Membandingkan Bilangan',
        paragraphs: [
          'Kita membandingkan bilangan dengan melihat nilai tempatnya. Bandingkan puluhan terlebih dahulu, lalu satuan.',
          'Lambang ">" berarti lebih besar, "<" berarti lebih kecil, dan "=" berarti sama dengan.',
        ],
        example: '45 dan 39: puluhan 4 lebih besar dari 3, jadi 45 > 39. Sedangkan 28 dan 28 ditulis 28 = 28.',
      },
    ],
    summary: [
      'Bilangan dua angka terdiri dari puluhan dan satuan.',
      'Nilai tempat dibaca dari kiri, puluhan lebih dulu daripada satuan.',
      'Membandingkan bilangan dimulai dari angka puluhannya.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'hitung',
        text: 'Bilangan 5 puluhan + 8 satuan = ...',
        answer: '58',
        explanation: '5 puluhan bernilai 50, ditambah 8 satuan menjadi 58.',
      },
      {
        type: 'pg',
        text: 'Bilangan yang lebih besar dari 47 adalah ...',
        options: ['52', '39', '21'],
        answer: '52',
        explanation: '52 memiliki puluhan 5, lebih besar daripada puluhan 4 pada 47.',
      },
      {
        type: 'benar-salah',
        text: 'Pada bilangan 81, angka 1 menempati tempat satuan.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Pada 81, angka 8 menempati puluhan dan angka 1 menempati satuan.',
      },
    ],
  },
  {
    id: 'g2-matematika-2',
    subjectId: 'matematika',
    grade: 2,
    semester: 2,
    order: 2,
    title: 'Perkalian dan Pembagian Dasar',
    emoji: '✖️',
    description: 'Mengenal perkalian sebagai penjumlahan berulang dan pembagian sebagai pembagian sama banyak.',
    objectives: [
      'Menjelaskan perkalian sebagai penjumlahan berulang',
      'Menghitung perkalian sederhana',
      'Menyelesaikan pembagian dengan membagi sama banyak',
    ],
    sections: [
      {
        heading: 'Perkalian',
        paragraphs: [
          'Perkalian adalah penjumlahan berulang. 3 × 4 berarti 4 + 4 + 4 = 12.',
          'Kita bisa membayangkan tiga kelompok, masing-masing berisi empat benda.',
        ],
        example: 'Ada 3 piring, tiap piring berisi 2 kue. Jumlah kue 3 × 2 = 6.',
      },
      {
        heading: 'Pembagian',
        paragraphs: [
          'Pembagian adalah membagi benda menjadi beberapa kelompok sama banyak. Lambangnya adalah tanda bagi.',
          'Contohnya, 8 kelereng dibagi 2 anak. Setiap anak mendapat 4 kelereng, ditulis 8 ÷ 2 = 4.',
        ],
        bullets: [
          '12 ÷ 3 = 4',
          '10 ÷ 5 = 2',
          '6 ÷ 2 = 3',
        ],
      },
    ],
    summary: [
      'Perkalian adalah penjumlahan angka yang sama secara berulang.',
      'Pembagian membagi benda menjadi kelompok yang sama banyak.',
      'Perkalian dan pembagian saling berkaitan, misalnya 3 × 4 = 12 dan 12 ÷ 4 = 3.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'hitung',
        text: '4 × 5 = ...',
        answer: '20',
        explanation: '4 × 5 berarti 5 + 5 + 5 + 5, hasilnya 20.',
      },
      {
        type: 'cerita',
        story: 'Ibu membeli 3 bungkus permen. Setiap bungkus berisi 6 permen.',
        text: 'Berapa jumlah permen seluruhnya?',
        options: ['18', '9', '12'],
        answer: '18',
        explanation: 'Tiga bungkus berisi enam permen, jadi 3 × 6 = 18.',
      },
      {
        type: 'isian',
        text: '12 ÷ 4 = ...',
        answer: '3',
        explanation: 'Dua belas dibagi empat kelompok sama banyak menghasilkan tiga setiap kelompok.',
      },
    ],
  },
  {
    id: 'g2-ipas-1',
    subjectId: 'ipas',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'Hewan dan Tumbuhan di Sekitar Kita',
    emoji: '🐾',
    description: 'Mengenal bagian tumbuhan dan kebutuhan hewan serta tumbuhan di sekitar.',
    objectives: [
      'Menyebutkan bagian-bagian tumbuhan dan kegunaannya',
      'Menjelaskan kebutuhan hewan agar tetap hidup',
      'Menunjukkan cara merawat hewan dan tumbuhan di sekitar',
    ],
    sections: [
      {
        heading: 'Bagian Tumbuhan',
        paragraphs: [
          'Tumbuhan punya akar, batang, daun, bunga, dan buah. Akar menyerap air dari tanah dan menahan tumbuhan agar tidak mudah tumbang.',
          'Batang mengangkut air ke daun. Daun menjadi tempat tumbuhan membuat makanan dengan bantuan sinar matahari.',
        ],
        bullets: [
          'Akar: menyerap air',
          'Batang: mengangkut air',
          'Daun: membuat makanan',
          'Bunga: alat perkembangbiakan',
        ],
      },
      {
        heading: 'Hewan di Sekitar Kita',
        paragraphs: [
          'Hewan di sekitar kita bermacam-macam. Ada hewan yang makan tumbuhan, seperti sapi dan kelinci, ada juga yang makan daging, seperti kucing.',
          'Hewan butuh makanan, air, dan tempat tinggal. Kita harus merawat hewan peliharaan dengan baik.',
        ],
        example: 'Kelinci peliharaan Dita makan wortel dan sayuran. Kandangnya dibersihkan setiap hari.',
      },
    ],
    summary: [
      'Bagian tumbuhan adalah akar, batang, daun, bunga, dan buah.',
      'Akar menyerap air, batang mengangkut air, dan daun membuat makanan.',
      'Hewan butuh makanan, air, dan tempat tinggal yang layak.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Bagian tumbuhan yang menyerap air dari tanah adalah ...',
        options: ['akar', 'daun', 'bunga'],
        answer: 'akar',
        explanation: 'Akar berada di dalam tanah dan bertugas menyerap air untuk tumbuhan.',
      },
      {
        type: 'menjodohkan',
        text: 'Jodohkan bagian tumbuhan dengan kegunaannya.',
        answer: '',
        pairs: [
          ['Akar', 'Menyerap air'],
          ['Daun', 'Membuat makanan'],
          ['Batang', 'Mengangkut air'],
        ],
        explanation: 'Akar menyerap air, batang mengangkut air, dan daun membuat makanan.',
      },
      {
        type: 'isian',
        text: 'Tumbuhan membutuhkan sinar ... untuk membuat makanan.',
        answer: 'matahari',
        explanation: 'Daun membuat makanan dengan bantuan sinar matahari.',
      },
    ],
  },
  {
    id: 'g2-ipas-2',
    subjectId: 'ipas',
    grade: 2,
    semester: 2,
    order: 2,
    title: 'Cuaca dan Musim di Indonesia',
    emoji: '☀️',
    description: 'Mengenal jenis cuaca dan dua musim yang ada di Indonesia.',
    objectives: [
      'Menyebutkan jenis-jenis cuaca',
      'Menjelaskan ciri musim hujan dan musim kemarau',
      'Memilih pakaian dan perlengkapan sesuai cuaca',
    ],
    sections: [
      {
        heading: 'Cuaca',
        paragraphs: [
          'Cuaca adalah keadaan udara pada suatu tempat dalam waktu singkat. Cuaca bisa cerah, berawan, hujan, atau berangin.',
          'Cuaca mudah berubah. Pagi hari mungkin cerah, siang hari bisa hujan.',
        ],
        bullets: [
          'Cerah',
          'Berawan',
          'Hujan',
          'Berangin',
        ],
      },
      {
        heading: 'Musim di Indonesia',
        paragraphs: [
          'Indonesia memiliki dua musim, yaitu musim hujan dan musim kemarau. Musim hujan biasanya sekitar bulan Oktober sampai Maret.',
          'Musim kemarau biasanya sekitar bulan April sampai September. Saat kemarau, udara lebih kering dan hujan jarang turun.',
        ],
        example: 'Saat musim hujan, Rina membawa payung ke sekolah. Saat kemarau, ia membawa topi dan botol air.',
      },
    ],
    summary: [
      'Cuaca adalah keadaan udara dalam waktu singkat dan mudah berubah.',
      'Indonesia memiliki dua musim, yaitu musim hujan dan musim kemarau.',
      'Perlengkapan seperti payung atau topi disesuaikan dengan cuaca.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Indonesia memiliki ... musim.',
        options: ['dua', 'tiga', 'empat'],
        answer: 'dua',
        explanation: 'Indonesia memiliki dua musim, yaitu musim hujan dan musim kemarau.',
      },
      {
        type: 'benar-salah',
        text: 'Saat musim kemarau, hujan sering turun setiap hari.',
        options: ['Benar', 'Salah'],
        answer: 'Salah',
        explanation: 'Musim kemarau ditandai udara kering dan hujan jarang turun.',
      },
      {
        type: 'cerita',
        story: 'Langit gelap dan angin bertiup kencang. Tidak lama kemudian air hujan turun deras.',
        text: 'Cuaca saat itu adalah ...',
        options: ['hujan', 'cerah', 'berawan'],
        answer: 'hujan',
        explanation: 'Air turun deras dari langit adalah ciri cuaca hujan.',
      },
    ],
  },
  {
    id: 'g2-inggris-1',
    subjectId: 'inggris',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'My Family and My House',
    emoji: '🏡',
    description: 'Mengenal anggota keluarga dan ruangan di rumah dalam bahasa Inggris.',
    objectives: [
      'Menyebutkan anggota keluarga dalam bahasa Inggris',
      'Menyebutkan nama ruangan di rumah',
      'Menggunakan kalimat sederhana untuk memperkenalkan keluarga',
    ],
    sections: [
      {
        heading: 'My Family',
        paragraphs: [
          'My family is at home. I have a father, a mother, a brother, and a sister.',
          'My grandfather and grandmother also come to visit. I love my family very much.',
        ],
        bullets: [
          'Father: ayah',
          'Mother: ibu',
          'Brother: saudara laki-laki',
          'Sister: saudara perempuan',
        ],
      },
      {
        heading: 'My House',
        paragraphs: [
          'My house has many rooms. There is a living room, a bedroom, a kitchen, and a bathroom.',
          'We watch television in the living room. We sleep in the bedroom and cook in the kitchen.',
        ],
        example: 'This is my bedroom. It has a bed, a table, and a lamp. I study here every night.',
      },
    ],
    summary: [
      'Anggota keluarga dalam bahasa Inggris adalah father, mother, brother, dan sister.',
      'Ruangan rumah adalah living room, bedroom, kitchen, dan bathroom.',
      'Kalimat this is my ... dipakai untuk menunjukkan anggota keluarga atau ruangan.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'We cook in the ...',
        options: ['kitchen', 'bedroom', 'bathroom'],
        answer: 'kitchen',
        explanation: 'Kitchen adalah dapur, tempat kita memasak makanan.',
      },
      {
        type: 'menjodohkan',
        text: 'Jodohkan kata bahasa Inggris dengan artinya.',
        answer: '',
        pairs: [
          ['Father', 'Ayah'],
          ['Mother', 'Ibu'],
          ['Sister', 'Saudara perempuan'],
        ],
        explanation: 'Father artinya ayah, mother artinya ibu, dan sister artinya saudara perempuan.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['is', 'My', 'mother', 'This'],
        answer: 'This is my mother',
        explanation: 'Kalimat untuk memperkenalkan ibu adalah this is my mother.',
      },
    ],
  },
  {
    id: 'g2-inggris-2',
    subjectId: 'inggris',
    grade: 2,
    semester: 2,
    order: 2,
    title: 'Fruits and Vegetables',
    emoji: '🍎',
    description: 'Mengenal nama buah dan sayur dalam bahasa Inggris beserta warnanya.',
    objectives: [
      'Menyebutkan nama buah dalam bahasa Inggris',
      'Menyebutkan nama sayur dalam bahasa Inggris',
      'Menjelaskan warna buah dan sayur dengan kalimat sederhana',
    ],
    sections: [
      {
        heading: 'Fruits',
        paragraphs: [
          'Fruits are good for our body. Some fruits are apple, banana, mango, and orange.',
          'An apple is red or green. A banana is yellow, and an orange is orange.',
        ],
        bullets: [
          'Apple: apel',
          'Banana: pisang',
          'Mango: mangga',
          'Orange: jeruk',
        ],
      },
      {
        heading: 'Vegetables',
        paragraphs: [
          'Vegetables are also healthy. We eat carrot, spinach, potato, and cucumber.',
          'Carrot is orange and crunchy. Spinach is green and full of vitamins.',
        ],
        example: 'At breakfast, Dina eats a banana and drinks milk. At lunch, she eats spinach and carrot soup.',
      },
    ],
    summary: [
      'Nama buah dalam bahasa Inggris adalah apple, banana, mango, dan orange.',
      'Nama sayur adalah carrot, spinach, potato, dan cucumber.',
      'Buah dan sayur baik untuk tubuh dan memiliki warna yang berbeda.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'The banana is ...',
        options: ['yellow', 'blue', 'purple'],
        answer: 'yellow',
        explanation: 'Pisang berwarna kuning, dan kuning dalam bahasa Inggris adalah yellow.',
      },
      {
        type: 'isian',
        text: 'In English, "bayam" is ...',
        answer: 'spinach',
        explanation: 'Bayam dalam bahasa Inggris disebut spinach.',
      },
      {
        type: 'benar-salah',
        text: 'Carrot is a fruit.',
        options: ['Benar', 'Salah'],
        answer: 'Salah',
        explanation: 'Carrot atau wortel adalah sayur, bukan buah.',
      },
    ],
  },
  {
    id: 'g2-seni-1',
    subjectId: 'seni',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'Warna dan Pola',
    emoji: '🎨',
    description: 'Mengenal warna primer, campuran warna, dan pola berulang.',
    objectives: [
      'Menyebutkan tiga warna primer',
      'Menjelaskan hasil campuran dua warna primer',
      'Membuat pola warna atau bentuk yang berulang',
    ],
    sections: [
      {
        heading: 'Warna Primer dan Campuran',
        paragraphs: [
          'Warna primer adalah merah, kuning, dan biru. Warna ini tidak dibuat dari campuran warna lain.',
          'Jika dicampur, warna primer menghasilkan warna baru. Merah dicampur kuning menjadi oranye, biru dicampur kuning menjadi hijau.',
        ],
        bullets: [
          'Merah + kuning = oranye',
          'Biru + kuning = hijau',
          'Merah + biru = ungu',
        ],
      },
      {
        heading: 'Pola dalam Karya Seni',
        paragraphs: [
          'Pola adalah susunan bentuk atau warna yang berulang teratur. Contohnya merah, biru, merah, biru.',
          'Pola membuat karya seni terlihat rapi dan menarik. Kita bisa membuat pola dengan bentuk hati, bintang, dan lingkaran.',
        ],
        example: 'Rina mewarnai gelang dengan pola merah-kuning-merah-kuning. Gelangnya terlihat rapi dan indah.',
      },
    ],
    summary: [
      'Warna primer adalah merah, kuning, dan biru.',
      'Campuran warna primer menghasilkan warna baru seperti oranye, hijau, dan ungu.',
      'Pola adalah susunan warna atau bentuk yang berulang teratur.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Warna yang dihasilkan dari campuran biru dan kuning adalah ...',
        options: ['hijau', 'oranye', 'ungu'],
        answer: 'hijau',
        explanation: 'Biru dicampur kuning menghasilkan warna hijau.',
      },
      {
        type: 'isian',
        text: 'Warna primer terdiri dari merah, kuning, dan ...',
        answer: 'biru',
        explanation: 'Tiga warna primer adalah merah, kuning, dan biru.',
      },
      {
        type: 'benar-salah',
        text: 'Pola adalah susunan warna atau bentuk yang berulang teratur.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Pola dibuat dengan pengulangan yang teratur sehingga terlihat rapi.',
      },
    ],
  },
  {
    id: 'g2-seni-2',
    subjectId: 'seni',
    grade: 2,
    semester: 2,
    order: 2,
    title: 'Kolase dari Daun Kering',
    emoji: '🍂',
    description: 'Membuat karya kolase dari daun kering dengan langkah yang rapi.',
    objectives: [
      'Menjelaskan arti kolase',
      'Menyebutkan bahan dan alat untuk membuat kolase',
      'Membuat kolase dari daun kering secara berurutan',
    ],
    sections: [
      {
        heading: 'Mengenal Kolase',
        paragraphs: [
          'Kolase adalah karya seni yang dibuat dengan menempel bahan pada gambar. Bahannya bisa kertas, biji-bijian, atau daun kering.',
          'Daun kering dipilih karena mudah ditempel dan berwarna alami.',
        ],
        bullets: [
          'Bahan: daun kering',
          'Alat: lem dan kertas',
          'Hasil: gambar tempelan',
        ],
      },
      {
        heading: 'Membuat Kolase',
        paragraphs: [
          'Langkah pertama, kumpulkan daun kering lalu bersihkan. Setelah itu, susun daun di atas kertas sesuai gambar yang diinginkan.',
          'Tempel daun dengan lem sedikit demi sedikit. Terakhir, jemur karya agar lem cepat kering.',
        ],
        example: 'Dita membuat gambar kupu-kupu. Sayapnya ditempel dengan daun kering berwarna cokelat, dan tubuhnya dari ranting kecil.',
      },
    ],
    summary: [
      'Kolase adalah karya seni dengan menempel bahan pada gambar.',
      'Bahan kolase bisa daun kering, biji-bijian, atau kertas.',
      'Langkah membuat kolase: mengumpulkan, menyusun, menempel, lalu mengeringkan.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Bahan utama kolase pada bab ini adalah ...',
        options: ['daun kering', 'air', 'pasir basah'],
        answer: 'daun kering',
        explanation: 'Bab ini membahas kolase yang dibuat dengan menempel daun kering.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['daun', 'kolase', 'Membuat', 'dari', 'kering'],
        answer: 'Membuat kolase dari daun kering',
        explanation: 'Kalimat itu menyebutkan kegiatan dan bahan utama kolase.',
      },
      {
        type: 'cerita',
        story: 'Bayu mengumpulkan daun kering, lalu menempelkannya pada kertas membentuk gambar ikan.',
        text: 'Karya yang dibuat Bayu disebut ...',
        options: ['kolase', 'lagu', 'tarian'],
        answer: 'kolase',
        explanation: 'Karya yang dibuat dengan menempel bahan seperti daun kering disebut kolase.',
      },
    ],
  },
  {
    id: 'g2-pjok-1',
    subjectId: 'pjok',
    grade: 2,
    semester: 1,
    order: 1,
    title: 'Gerak Keseimbangan dan Kelincahan',
    emoji: '🤸',
    description: 'Melatih keseimbangan tubuh dan kelincahan melalui permainan sederhana.',
    objectives: [
      'Mempraktikkan gerak keseimbangan dengan satu kaki',
      'Melakukan lari zigzag untuk melatih kelincahan',
      'Menjelaskan manfaat pemanasan sebelum berlatih',
    ],
    sections: [
      {
        heading: 'Gerak Keseimbangan',
        paragraphs: [
          'Keseimbangan adalah kemampuan menjaga tubuh tetap stabil. Kita bisa berdiri dengan satu kaki sambil merentangkan tangan.',
          'Latihan keseimbangan juga bisa dilakukan dengan berjalan di garis lurus. Lakukan dengan pelan agar tidak terjatuh.',
        ],
        bullets: [
          'Berdiri satu kaki',
          'Berjalan di garis lurus',
          'Merentangkan tangan',
        ],
      },
      {
        heading: 'Gerak Kelincahan',
        paragraphs: [
          'Kelincahan adalah kemampuan mengubah arah dengan cepat. Kita bisa berlari zigzag di antara cone.',
          'Latihan kelincahan membuat tubuh gesit. Lakukan pemanasan dahulu dan minum air setelah berlatih.',
        ],
        example: 'Anak-anak berlari zigzag melewati lima cone. Mereka tidak menyentuh cone dan kembali ke garis start.',
      },
    ],
    summary: [
      'Keseimbangan dilatih dengan berdiri satu kaki atau berjalan di garis lurus.',
      'Kelincahan dilatih dengan lari zigzag dan permainan yang mengubah arah.',
      'Pemanasan dilakukan sebelum berlatih agar tubuh tidak cedera.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Berdiri dengan satu kaki melatih ...',
        options: ['keseimbangan', 'kecepatan membaca', 'kekuatan menulis'],
        answer: 'keseimbangan',
        explanation: 'Berdiri satu kaki membuat tubuh harus menjaga keseimbangan agar tidak jatuh.',
      },
      {
        type: 'benar-salah',
        text: 'Berlari zigzag melatih kelincahan.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Lari zigzag melatih tubuh mengubah arah dengan cepat, itulah kelincahan.',
      },
      {
        type: 'hitung',
        text: 'Ada 6 cone di lapangan. Guru mengambil 2 cone. Berapa cone yang tersisa?',
        answer: '4',
        explanation: 'Enam cone diambil dua, sisanya 6 - 2 = 4 cone.',
      },
    ],
  },
]

export default grade2
