import type { ChapterSeed } from '../../types'

const grade1: ChapterSeed[] = [
  {
    id: 'g1-agama-1',
    subjectId: 'agama',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Aku dan Keluargaku: Kasih Sayang dalam Keluarga',
    emoji: '👨‍👩‍👧',
    description: 'Mengenal anggota keluarga dan cara menunjukkan kasih sayang setiap hari.',
    objectives: [
      'Menyebutkan anggota keluarga yang ada di rumah',
      'Menjelaskan cara menunjukkan kasih sayang kepada keluarga',
      'Membiasakan sikap santun dan mau membantu di rumah',
    ],
    sections: [
      {
        heading: 'Anggota Keluargaku',
        paragraphs: [
          'Di rumah aku tinggal bersama keluarga. Ada ayah, ibu, kakak, dan adik. Ada juga kakek dan nenek yang sering datang berkunjung.',
          'Setiap anggota keluarga punya peran. Ayah dan ibu bekerja mencari nafkah dan merawat kami. Kakak membantu adik belajar, dan adik menghibur dengan tingkah lucunya.',
        ],
        bullets: [
          'Ayah bekerja dan melindungi keluarga',
          'Ibu merawat dan menyiapkan makanan',
          'Kakak membantu adik belajar',
          'Adik menghibur dengan senyumnya',
        ],
      },
      {
        heading: 'Kasih Sayang yang Bisa Aku Tunjukkan',
        paragraphs: [
          'Kasih sayang tidak harus berupa hadiah. Aku bisa menunjukkan kasih sayang dengan pelukan, senyum, dan kata-kata yang lembut.',
          'Aku juga membantu pekerjaan rumah yang ringan, seperti merapikan tempat tidur dan meletakkan piring kotor ke wastafel. Orang tua senang melihat anak yang mau membantu.',
        ],
        example: 'Pagi hari, aku membantu ibu menyiapkan meja makan. Ibu tersenyum dan berkata, "Terima kasih, sayang."',
      },
    ],
    summary: [
      'Keluarga terdiri dari ayah, ibu, kakak, adik, kakek, dan nenek.',
      'Kasih sayang ditunjukkan dengan kata lembut, pelukan, dan bantuan kecil.',
      'Membantu orang tua membuat keluarga bahagia.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Siapa yang merawat dan menyiapkan makanan di rumah?',
        options: ['Ibu', 'Tetangga', 'Guru'],
        answer: 'Ibu',
        explanation: 'Ibu merawat keluarga dan menyiapkan makanan, seperti yang dijelaskan pada bagian anggota keluarga.',
      },
      {
        type: 'benar-salah',
        text: 'Membantu merapikan tempat tidur adalah cara menunjukkan kasih sayang kepada keluarga.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Membantu pekerjaan ringan di rumah menunjukkan rasa sayang dan meringankan pekerjaan orang tua.',
      },
      {
        type: 'isian',
        text: 'Aku mengucapkan ... ketika ibu memberiku makanan.',
        answer: 'terima kasih',
        explanation: 'Mengucapkan terima kasih adalah tanda sopan santun dan syukur atas kebaikan orang lain.',
      },
    ],
  },
  {
    id: 'g1-agama-2',
    subjectId: 'agama',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Berbuat Baik dan Sopan Santun',
    emoji: '😊',
    description: 'Belajar berkata sopan dan berbuat baik kepada orang di sekitar kita.',
    objectives: [
      'Menyebutkan tiga kata sopan yang sering dipakai',
      'Menjelaskan contoh perbuatan baik di rumah dan di sekolah',
      'Membiasakan berbuat baik tanpa harus diminta',
    ],
    sections: [
      {
        heading: 'Tiga Kata Ajaib',
        paragraphs: [
          'Ada tiga kata ajaib yang membuat hati orang lain senang. Kata itu adalah maaf, tolong, dan terima kasih.',
          'Kita mengucapkan tolong saat membutuhkan bantuan. Kita mengucapkan terima kasih setelah dibantu, dan maaf saat melakukan kesalahan.',
        ],
        bullets: [
          'Tolong, saat meminta bantuan',
          'Terima kasih, saat menerima bantuan',
          'Maaf, saat berbuat salah',
        ],
      },
      {
        heading: 'Berbuat Baik Setiap Hari',
        paragraphs: [
          'Berbuat baik tidak perlu menunggu diminta. Aku bisa meminjamkan pensil kepada teman yang lupa membawa alat tulis.',
          'Di rumah, aku membantu ibu membawa belanjaan. Di sekolah, aku membuang sampah ke tempat sampah dan tidak mengganggu teman yang sedang belajar.',
        ],
        example: 'Temanmu menjatuhkan buku. Kamu memungutnya dan mengembalikannya sambil berkata, "Ini bukumu."',
      },
    ],
    summary: [
      'Tiga kata ajaib adalah maaf, tolong, dan terima kasih.',
      'Berbuat baik bisa dilakukan di rumah dan di sekolah.',
      'Menolong teman membuat hati senang dan pertemanan semakin erat.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Kata yang diucapkan saat meminta bantuan adalah ...',
        options: ['Tolong', 'Maaf', 'Terima kasih'],
        answer: 'Tolong',
        explanation: 'Kata tolong dipakai saat kita membutuhkan bantuan orang lain.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['aku', 'membantu', 'sudah', 'Terima', 'kasih'],
        answer: 'Terima kasih sudah membantu aku',
        explanation: 'Kalimat terima kasih diucapkan setelah seseorang membantu kita.',
      },
      {
        type: 'cerita',
        story: 'Saat istirahat, Dina melihat temannya berdiri sendirian. Dina menghampiri dan mengajaknya bermain lompat tali bersama.',
        text: 'Sikap Dina menunjukkan ...',
        options: ['berbuat baik kepada teman', 'membiarkan teman sedih', 'bermain sendirian'],
        answer: 'berbuat baik kepada teman',
        explanation: 'Dina menghampiri dan mengajak temannya bermain, itu adalah perbuatan baik.',
      },
    ],
  },
  {
    id: 'g1-pancasila-1',
    subjectId: 'pancasila',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Mengenal Simbol dan Sila Pancasila',
    emoji: '🦅',
    description: 'Mengenal lambang Garuda Pancasila dan lima sila yang menjadi dasar negara.',
    objectives: [
      'Menyebutkan lambang negara Indonesia',
      'Menjodohkan simbol dengan sila Pancasila',
      'Menjelaskan arti sila pertama sampai sila kelima dengan sederhana',
    ],
    sections: [
      {
        heading: 'Lambang Negara Kita',
        paragraphs: [
          'Negara Indonesia punya lambang bernama Garuda Pancasila. Burung Garuda memegang pita bertuliskan "Bhinneka Tunggal Ika".',
          'Di dada Garuda ada lima simbol. Setiap simbol mewakili satu sila Pancasila. Simbol padi dan kapas ada di bagian kiri bawah.',
        ],
        bullets: [
          'Bintang untuk sila pertama',
          'Rantai untuk sila kedua',
          'Pohon beringin untuk sila ketiga',
          'Kepala banteng untuk sila keempat',
        ],
      },
      {
        heading: 'Arti Lima Sila',
        paragraphs: [
          'Sila pertama, Ketuhanan Yang Maha Esa, mengajarkan kita beriman dan beribadah. Sila kedua, Kemanusiaan yang adil dan beradab, mengajarkan kita bersikap baik kepada semua orang.',
          'Sila ketiga, Persatuan Indonesia, mengajarkan kita menjaga kerukunan. Sila keempat mengajarkan musyawarah, dan sila kelima mengajarkan keadilan untuk semua.',
        ],
        example: 'Saat teman berbeda agama beribadah, kita menghormatinya. Itu contoh pengamalan sila pertama.',
      },
    ],
    summary: [
      'Lambang negara Indonesia adalah Garuda Pancasila.',
      'Pancasila memiliki lima sila dengan simbol yang berbeda.',
      'Simbol bintang, rantai, pohon beringin, kepala banteng, serta padi dan kapas mewakili sila satu sampai lima.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'menjodohkan',
        text: 'Jodohkan simbol dengan sila yang sesuai.',
        answer: '',
        pairs: [
          ['Bintang', 'Sila pertama'],
          ['Rantai', 'Sila kedua'],
          ['Pohon beringin', 'Sila ketiga'],
        ],
        explanation: 'Bintang melambangkan sila pertama, rantai sila kedua, dan pohon beringin sila ketiga.',
      },
      {
        type: 'benar-salah',
        text: 'Lambang negara Indonesia adalah Garuda Pancasila.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Garuda Pancasila adalah lambang negara Indonesia yang memegang pita Bhinneka Tunggal Ika.',
      },
      {
        type: 'pg',
        text: 'Simbol sila kelima Pancasila adalah ...',
        options: ['Padi dan kapas', 'Bintang', 'Kepala banteng'],
        answer: 'Padi dan kapas',
        explanation: 'Padi dan kapas melambangkan sila kelima, yaitu Keadilan sosial bagi seluruh rakyat Indonesia.',
      },
    ],
  },
  {
    id: 'g1-pancasila-2',
    subjectId: 'pancasila',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Aturan di Rumah dan di Sekolah',
    emoji: '🏠',
    description: 'Mengenal aturan sederhana di rumah dan di sekolah agar hidup tertib dan nyaman.',
    objectives: [
      'Menyebutkan contoh aturan di rumah',
      'Menyebutkan contoh aturan di sekolah',
      'Menjelaskan manfaat menaati aturan',
    ],
    sections: [
      {
        heading: 'Aturan di Rumah',
        paragraphs: [
          'Di rumah ada aturan yang membuat semua anggota keluarga nyaman. Contohnya bangun pagi, merapikan tempat tidur, dan meminta izin sebelum pergi.',
          'Aturan juga mengajarkan sopan santun. Kita mengetuk pintu sebelum masuk kamar dan meminta izin saat ingin meminjam barang.',
        ],
        bullets: [
          'Bangun pagi dan merapikan tempat tidur',
          'Meminta izin sebelum keluar rumah',
          'Mengetuk pintu sebelum masuk kamar',
        ],
      },
      {
        heading: 'Aturan di Sekolah',
        paragraphs: [
          'Di sekolah ada aturan yang harus dipatuhi semua murid. Kita datang tepat waktu, memakai seragam rapi, dan mengantre dengan sabar.',
          'Saat ingin bertanya, kita mengangkat tangan dan menunggu dipanggil guru. Kita juga tidak berlarian di kelas agar tidak menabrak teman.',
        ],
        example: 'Bel berbunyi. Semua murid langsung masuk kelas dan duduk rapi tanpa saling mendorong.',
      },
    ],
    summary: [
      'Aturan di rumah membuat keluarga hidup tertib dan nyaman.',
      'Aturan di sekolah membuat belajar berjalan aman dan teratur.',
      'Aturan ditaati dengan ikhlas, bukan karena takut dihukum.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Saat ingin bertanya kepada guru, sebaiknya kita ...',
        options: ['mengangkat tangan', 'berteriak', 'berlari ke depan'],
        answer: 'mengangkat tangan',
        explanation: 'Mengangkat tangan adalah cara sopan meminta izin bertanya di kelas.',
      },
      {
        type: 'isian',
        text: 'Kita ... pintu sebelum masuk kamar.',
        answer: 'mengetuk',
        explanation: 'Mengetuk pintu menunjukkan sopan santun dan menghormati orang di dalam kamar.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['kelas', 'tidak', 'Di', 'berlari', 'boleh'],
        answer: 'Di kelas tidak boleh berlari',
        explanation: 'Berlari di kelas berbahaya karena bisa menabrak teman atau meja.',
      },
    ],
  },
  {
    id: 'g1-bindo-1',
    subjectId: 'bindo',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Mengenal Huruf dan Suku Kata',
    emoji: '🔤',
    description: 'Mengenal huruf vokal dan konsonan serta membaca kata melalui suku kata.',
    objectives: [
      'Membedakan huruf vokal dan huruf konsonan',
      'Menghitung jumlah suku kata dalam kata',
      'Membaca kata sederhana dengan lafal yang jelas',
    ],
    sections: [
      {
        heading: 'Huruf Vokal dan Konsonan',
        paragraphs: [
          'Huruf dalam abjad ada dua macam, yaitu huruf vokal dan huruf konsonan. Huruf vokal adalah a, i, u, e, o.',
          'Huruf konsonan adalah huruf selain vokal, seperti b, c, d, dan k. Jika digabung, huruf-huruf itu membentuk kata.',
        ],
        bullets: [
          'Huruf vokal: a, i, u, e, o',
          'Huruf konsonan: b, c, d, k, m, dan lainnya',
        ],
      },
      {
        heading: 'Membaca Suku Kata',
        paragraphs: [
          'Kata terdiri dari suku kata. Kata "mama" terdiri dari dua suku kata, yaitu ma dan ma.',
          'Kita bisa bertepuk tangan setiap kali mengucapkan satu suku kata. Cara ini membuat membaca menjadi mudah dan menyenangkan.',
        ],
        example: 'Kata "buku" punya dua suku kata. Kata "sepatu" punya tiga suku kata.',
      },
    ],
    summary: [
      'Huruf vokal adalah a, i, u, e, o.',
      'Huruf konsonan adalah huruf selain huruf vokal.',
      'Suku kata adalah potongan bunyi dalam kata, seperti ma-ma pada kata mama.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Huruf berikut yang termasuk huruf vokal adalah ...',
        options: ['a', 'b', 'k'],
        answer: 'a',
        explanation: 'Huruf a termasuk vokal, sedangkan b dan k adalah huruf konsonan.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['suku', 'kata', 'Buku', 'dua', 'punya'],
        answer: 'Buku punya dua suku kata',
        explanation: 'Kata buku diucapkan bu-ku, jadi terdiri dari dua suku kata.',
      },
      {
        type: 'isian',
        text: 'Kata "sepatu" terdiri dari ... suku kata.',
        answer: '3',
        explanation: 'Kata sepatu diucapkan se-pa-tu, sehingga ada tiga suku kata.',
      },
    ],
  },
  {
    id: 'g1-bindo-2',
    subjectId: 'bindo',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Membaca Cerita Bergambar',
    emoji: '📚',
    description: 'Membaca cerita bergambar dengan memperhatikan gambar dan urutan cerita.',
    objectives: [
      'Mengamati gambar untuk memahami isi cerita',
      'Membaca cerita bergambar dari awal sampai akhir',
      'Menceritakan ulang isi cerita dengan bahasa sendiri',
    ],
    sections: [
      {
        heading: 'Mengamati Gambar Cerita',
        paragraphs: [
          'Cerita bergambar memiliki gambar dan tulisan. Gambar membantu kita memahami isi cerita.',
          'Sebelum membaca, kita bisa melihat gambarnya dahulu. Kita menebak siapa tokohnya dan apa yang sedang terjadi.',
        ],
        bullets: [
          'Perhatikan tokoh dalam gambar',
          'Amati kegiatan yang dilakukan tokoh',
          'Baca tulisan dari kiri ke kanan',
        ],
      },
      {
        heading: 'Menceritakan Ulang',
        paragraphs: [
          'Setelah membaca, kita bisa menceritakan ulang isi cerita dengan bahasa sendiri. Mulailah dari awal cerita, lalu bagian tengah, dan akhir.',
          'Saat menceritakan, gunakan suara yang jelas dan wajah yang ceria. Teman-teman akan senang mendengarkan.',
        ],
        example: 'Cerita "Kancil dan Buaya": Kancil ingin menyeberang sungai. Ia meminta buaya berbaris, lalu Kancil melompat di atas punggung mereka.',
      },
    ],
    summary: [
      'Gambar pada cerita membantu kita menebak isi cerita.',
      'Cerita dibaca dan diceritakan sesuai urutan dari awal sampai akhir.',
      'Menceritakan ulang melatih keberanian dan kemampuan berbicara.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'cerita',
        story: 'Pagi itu Rara melihat kucing kecil mengeong di depan rumah. Rara memberi kucing itu susu. Kucing itu minum dengan lahap lalu tidur di dekat Rara.',
        text: 'Apa yang dilakukan Rara kepada kucing?',
        options: ['Memberi susu', 'Mengusir kucing', 'Membiarkan kucing'],
        answer: 'Memberi susu',
        explanation: 'Pada cerita disebutkan Rara memberi kucing itu susu sampai kucing minum dengan lahap.',
      },
      {
        type: 'benar-salah',
        text: 'Gambar dalam cerita bergambar membantu kita memahami isi cerita.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Gambar menunjukkan tokoh dan kejadian sehingga isi cerita lebih mudah dipahami.',
      },
      {
        type: 'pg',
        text: 'Saat menceritakan ulang, kita mulai dari ...',
        options: ['awal cerita', 'akhir cerita', 'tengah cerita saja'],
        answer: 'awal cerita',
        explanation: 'Cerita diceritakan berurutan, dimulai dari awal lalu tengah dan akhir.',
      },
    ],
  },
  {
    id: 'g1-matematika-1',
    subjectId: 'matematika',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Mengenal Bilangan 1–20',
    emoji: '🔢',
    description: 'Membaca, menulis, dan mengurutkan bilangan 1 sampai 20.',
    objectives: [
      'Membaca dan menulis lambang bilangan 1 sampai 20',
      'Mengurutkan bilangan dari yang terkecil ke terbesar',
      'Membandingkan dua bilangan dengan tepat',
    ],
    sections: [
      {
        heading: 'Membaca dan Menulis Bilangan',
        paragraphs: [
          'Bilangan dimulai dari 1, 2, 3, dan seterusnya sampai 20. Setiap bilangan punya lambang dan nama.',
          'Kita bisa menghitung benda di sekitar untuk mengenal bilangan. Misalnya menghitung lima pensil atau sepuluh kelereng.',
        ],
        bullets: [
          '1 dibaca satu',
          '2 dibaca dua',
          '10 dibaca sepuluh',
          '20 dibaca dua puluh',
        ],
      },
      {
        heading: 'Urutan dan Perbandingan Bilangan',
        paragraphs: [
          'Bilangan yang letaknya lebih ke kanan pada garis bilangan nilainya lebih besar. Bilangan 15 lebih besar daripada 9.',
          'Kita juga bisa mengurutkan bilangan dari yang terkecil ke terbesar. Contohnya 3, 7, 11, 16.',
        ],
        example: 'Ada 12 buku di meja. Setelah dihitung lagi dengan teliti, jumlahnya tetap 12.',
      },
    ],
    summary: [
      'Bilangan 1 sampai 20 memiliki lambang dan nama.',
      'Bilangan dapat diurutkan dari terkecil ke terbesar.',
      'Semakin ke kanan pada garis bilangan, nilainya semakin besar.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'hitung',
        text: 'Bilangan berapa yang datang setelah 12?',
        answer: '13',
        explanation: 'Urutan bilangan setelah 12 adalah 13, karena 13 lebih besar satu dari 12.',
      },
      {
        type: 'pg',
        text: 'Bilangan yang paling besar adalah ...',
        options: ['18', '7', '4'],
        answer: '18',
        explanation: 'Dari pilihan 18, 7, dan 4, bilangan 18 memiliki nilai paling besar.',
      },
      {
        type: 'benar-salah',
        text: 'Bilangan 20 dibaca dua puluh.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Lambang 20 terdiri dari angka 2 puluhan dan 0 satuan, dibaca dua puluh.',
      },
    ],
  },
  {
    id: 'g1-matematika-2',
    subjectId: 'matematika',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Penjumlahan dan Pengurangan sampai 20',
    emoji: '➕',
    description: 'Berlatih menjumlah dan mengurang bilangan sampai 20 melalui cerita sehari-hari.',
    objectives: [
      'Menjelaskan arti tanda tambah dan tanda kurang',
      'Menghitung penjumlahan sampai 20',
      'Menyelesaikan soal cerita pengurangan sampai 20',
    ],
    sections: [
      {
        heading: 'Penjumlahan',
        paragraphs: [
          'Penjumlahan berarti menggabungkan dua kelompok benda. Lambangnya adalah tanda tambah (+).',
          'Contohnya, 5 apel ditambah 3 apel menjadi 8 apel. Kita menulisnya 5 + 3 = 8.',
        ],
        example: 'Ada 7 permen di toples. Ibu menambahkan 4 permen lagi. Sekarang ada 11 permen.',
      },
      {
        heading: 'Pengurangan',
        paragraphs: [
          'Pengurangan berarti mengambil sebagian benda dari suatu kelompok. Lambangnya adalah tanda kurang (-).',
          'Contohnya, 9 pensil diambil 4 pensil, sisa 5 pensil. Kita menulisnya 9 - 4 = 5.',
        ],
        bullets: [
          'Tambah (+) membuat jumlah bertambah',
          'Kurang (-) membuat jumlah berkurang',
          'Hasilnya tidak lebih dari 20',
        ],
      },
    ],
    summary: [
      'Penjumlahan menggabungkan benda dan memakai tanda +.',
      'Pengurangan mengambil benda dan memakai tanda -.',
      'Soal cerita dapat diselesaikan dengan menghitung benda satu per satu.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'hitung',
        text: '8 + 6 = ...',
        answer: '14',
        explanation: 'Delapan ditambah enam sama dengan empat belas.',
      },
      {
        type: 'cerita',
        story: 'Rio membawa 15 kelereng. Ia memberikan 5 kelereng kepada adiknya.',
        text: 'Berapa kelereng Rio sekarang?',
        options: ['10', '20', '5'],
        answer: '10',
        explanation: 'Kelereng Rio berkurang karena diberikan, jadi 15 - 5 = 10.',
      },
      {
        type: 'isian',
        text: '12 - 4 = ...',
        answer: '8',
        explanation: 'Dua belas diambil empat menyisakan delapan.',
      },
    ],
  },
  {
    id: 'g1-ipas-1',
    subjectId: 'ipas',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Tubuhku dan Lima Indra',
    emoji: '👀',
    description: 'Mengenal bagian tubuh dan lima indra yang membantu kita mengenal dunia.',
    objectives: [
      'Menyebutkan bagian utama tubuh manusia',
      'Menjodohkan indra dengan kegunaannya',
      'Menjelaskan cara merawat tubuh dengan sederhana',
    ],
    sections: [
      {
        heading: 'Bagian Tubuhku',
        paragraphs: [
          'Tubuh kita terdiri dari kepala, badan, tangan, dan kaki. Setiap bagian punya kegunaan.',
          'Kepala untuk berpikir dan melihat. Tangan untuk memegang, dan kaki untuk berjalan.',
        ],
        bullets: [
          'Kepala: berpikir dan melihat',
          'Tangan: memegang dan menulis',
          'Kaki: berjalan dan berlari',
        ],
      },
      {
        heading: 'Lima Indra',
        paragraphs: [
          'Kita punya lima indra. Mata untuk melihat, telinga untuk mendengar, hidung untuk membau, lidah untuk mengecap, dan kulit untuk meraba.',
          'Indra membantu kita mengenal lingkungan. Kita bisa merasakan gula itu manis dan jeruk itu asam dengan lidah.',
        ],
        example: 'Saat mencium aroma roti, hidungku membau. Saat memegang es, kulitku merasa dingin.',
      },
    ],
    summary: [
      'Bagian utama tubuh adalah kepala, badan, tangan, dan kaki.',
      'Lima indra adalah mata, telinga, hidung, lidah, dan kulit.',
      'Setiap indra memiliki kegunaan yang berbeda.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Indra untuk mendengar adalah ...',
        options: ['telinga', 'mata', 'hidung'],
        answer: 'telinga',
        explanation: 'Telinga adalah indra pendengar yang menangkap suara di sekitar kita.',
      },
      {
        type: 'menjodohkan',
        text: 'Jodohkan indra dengan kegunaannya.',
        answer: '',
        pairs: [
          ['Mata', 'Melihat'],
          ['Lidah', 'Mengecap'],
          ['Kulit', 'Meraba'],
        ],
        explanation: 'Mata untuk melihat, lidah untuk mengecap rasa, dan kulit untuk meraba.',
      },
      {
        type: 'benar-salah',
        text: 'Kita menggunakan hidung untuk membau.',
        options: ['Benar', 'Salah'],
        answer: 'Benar',
        explanation: 'Hidung adalah indra pembau yang menangkap aroma di sekitar kita.',
      },
    ],
  },
  {
    id: 'g1-ipas-2',
    subjectId: 'ipas',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Makhluk Hidup di Sekitarku',
    emoji: '🌱',
    description: 'Mengenal ciri makhluk hidup serta hewan dan tumbuhan di sekitar rumah.',
    objectives: [
      'Menyebutkan ciri-ciri makhluk hidup',
      'Membedakan makhluk hidup dan benda mati',
      'Menjelaskan kebutuhan tumbuhan dan hewan',
    ],
    sections: [
      {
        heading: 'Ciri Makhluk Hidup',
        paragraphs: [
          'Makhluk hidup bisa bernapas, makan, tumbuh, dan bergerak. Manusia, hewan, dan tumbuhan adalah makhluk hidup.',
          'Batu dan meja bukan makhluk hidup karena tidak bernapas dan tidak tumbuh.',
        ],
        bullets: [
          'Bernapas',
          'Makan dan minum',
          'Tumbuh besar',
          'Bergerak',
        ],
      },
      {
        heading: 'Hewan dan Tumbuhan di Sekitar',
        paragraphs: [
          'Di sekitar rumah ada banyak hewan, seperti ayam, kucing, dan kupu-kupu. Ada juga tumbuhan, seperti pohon mangga dan bunga mawar.',
          'Tumbuhan butuh air dan sinar matahari agar tumbuh. Hewan butuh makanan dan tempat tinggal.',
        ],
        example: 'Kucingku minum susu setiap pagi. Pohon mangga di halaman disiram setiap sore.',
      },
    ],
    summary: [
      'Makhluk hidup bernapas, makan, tumbuh, dan bergerak.',
      'Manusia, hewan, dan tumbuhan termasuk makhluk hidup.',
      'Tumbuhan butuh air dan sinar matahari, hewan butuh makanan dan tempat tinggal.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Berikut yang termasuk makhluk hidup adalah ...',
        options: ['pohon mangga', 'batu', 'meja'],
        answer: 'pohon mangga',
        explanation: 'Pohon mangga bernapas dan tumbuh, sedangkan batu dan meja adalah benda mati.',
      },
      {
        type: 'isian',
        text: 'Tumbuhan membutuhkan ... dan sinar matahari agar tumbuh.',
        answer: 'air',
        explanation: 'Air diserap akar dan diperlukan tumbuhan bersama sinar matahari untuk tumbuh.',
      },
      {
        type: 'cerita',
        story: 'Setiap sore Sinta menyiram bunga di pot. Bunga itu tumbuh subur dan berwarna cerah.',
        text: 'Mengapa bunga Sinta tumbuh subur?',
        options: ['Karena disiram setiap sore', 'Karena tidak pernah disiram', 'Karena diletakkan di lemari'],
        answer: 'Karena disiram setiap sore',
        explanation: 'Bunga tumbuh subur karena kebutuhan airnya terpenuhi dengan disiram setiap sore.',
      },
    ],
  },
  {
    id: 'g1-inggris-1',
    subjectId: 'inggris',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Greetings and My Name',
    emoji: '👋',
    description: 'Belajar menyapa dan memperkenalkan diri dalam bahasa Inggris.',
    objectives: [
      'Menyebutkan sapaan bahasa Inggris sesuai waktu',
      'Memperkenalkan nama diri dengan kalimat sederhana',
      'Menjawab pertanyaan how are you dengan tepat',
    ],
    sections: [
      {
        heading: 'Greetings',
        paragraphs: [
          'In English, we say "good morning" in the morning. We say "good afternoon" in the afternoon and "good evening" in the evening.',
          'We can also say "hello" or "hi" to our friends. "Good night" is said before sleeping.',
        ],
        bullets: [
          'Good morning: selamat pagi',
          'Good afternoon: selamat siang',
          'Good evening: selamat malam',
          'Good night: selamat tidur',
        ],
      },
      {
        heading: 'My Name Is ...',
        paragraphs: [
          'To introduce ourselves, we say "My name is ...". We can ask a friend, "What is your name?"',
          'If someone asks "How are you?", we can answer "I am fine, thank you."',
        ],
        example: '"Hello, my name is Bima. What is your name?" "Hi, my name is Sari. I am fine, thank you."',
      },
    ],
    summary: [
      'Sapaan bahasa Inggris disesuaikan dengan waktu, seperti good morning dan good night.',
      'Kita memperkenalkan diri dengan kalimat my name is ...',
      'Pertanyaan how are you dijawab dengan I am fine, thank you.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'We say "..." in the morning.',
        options: ['Good morning', 'Good night', 'Good evening'],
        answer: 'Good morning',
        explanation: 'Good morning berarti selamat pagi dan dipakai pada waktu pagi hari.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['name', 'My', 'Bima', 'is'],
        answer: 'My name is Bima',
        explanation: 'Kalimat untuk memperkenalkan nama adalah my name is diikuti nama.',
      },
      {
        type: 'menjodohkan',
        text: 'Jodohkan sapaan bahasa Inggris dengan artinya.',
        answer: '',
        pairs: [
          ['Hello', 'Halo'],
          ['Good night', 'Selamat tidur'],
          ['Good afternoon', 'Selamat siang'],
        ],
        explanation: 'Hello artinya halo, good night untuk menjelang tidur, dan good afternoon untuk siang hari.',
      },
    ],
  },
  {
    id: 'g1-inggris-2',
    subjectId: 'inggris',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Numbers and Colors',
    emoji: '🌈',
    description: 'Mengenal angka dan warna dalam bahasa Inggris melalui benda di sekitar.',
    objectives: [
      'Menyebutkan angka satu sampai sepuluh dalam bahasa Inggris',
      'Menyebutkan nama warna dalam bahasa Inggris',
      'Menggunakan angka dan warna untuk menjelaskan benda',
    ],
    sections: [
      {
        heading: 'Numbers',
        paragraphs: [
          'We count from one to ten. One, two, three, four, five, six, seven, eight, nine, ten.',
          'We can count our fingers. One hand has five fingers.',
        ],
        bullets: [
          'One, two, three, four, five',
          'Six, seven, eight, nine, ten',
        ],
      },
      {
        heading: 'Colors',
        paragraphs: [
          'There are many colors. Red is merah, blue is biru, yellow is kuning, and green is hijau.',
          'We can see colors everywhere. The leaf is green and the sky is blue.',
        ],
        example: 'My bag is blue. My pencil is yellow. I have three red apples.',
      },
    ],
    summary: [
      'Angka satu sampai sepuluh dalam bahasa Inggris adalah one sampai ten.',
      'Warna dasar dalam bahasa Inggris adalah red, blue, yellow, dan green.',
      'Angka dan warna bisa dipakai untuk menjelaskan benda di sekitar.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'The color of the leaf is ...',
        options: ['green', 'red', 'blue'],
        answer: 'green',
        explanation: 'Daun berwarna hijau, dan hijau dalam bahasa Inggris adalah green.',
      },
      {
        type: 'hitung',
        text: 'How many fingers are on two hands?',
        answer: '10',
        explanation: 'Satu tangan punya lima jari, jadi dua tangan berjumlah sepuluh jari.',
      },
      {
        type: 'benar-salah',
        text: '"Merah" in English is blue.',
        options: ['Benar', 'Salah'],
        answer: 'Salah',
        explanation: 'Merah dalam bahasa Inggris adalah red, sedangkan blue artinya biru.',
      },
    ],
  },
  {
    id: 'g1-seni-1',
    subjectId: 'seni',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Menggambar Bentuk Sederhana',
    emoji: '🖍️',
    description: 'Mengenal garis dan bentuk dasar untuk menggambar dengan rapi.',
    objectives: [
      'Menyebutkan macam-macam garis dalam menggambar',
      'Mengenal bentuk dasar lingkaran, persegi, dan segitiga',
      'Menyusun bentuk dasar menjadi gambar sederhana',
    ],
    sections: [
      {
        heading: 'Macam-Macam Garis',
        paragraphs: [
          'Gambar dimulai dari garis. Ada garis lurus, garis lengkung, dan garis zigzag.',
          'Garis lurus bisa dibuat dengan penggaris. Garis lengkung dibuat dengan gerakan tangan yang lembut.',
        ],
        bullets: [
          'Garis lurus',
          'Garis lengkung',
          'Garis zigzag',
        ],
      },
      {
        heading: 'Bentuk Dasar',
        paragraphs: [
          'Dari garis, kita bisa membuat bentuk dasar. Ada lingkaran, persegi, persegi panjang, dan segitiga.',
          'Bentuk dasar bisa disusun menjadi gambar. Lingkaran bisa menjadi matahari, dan segitiga bisa menjadi atap rumah.',
        ],
        example: 'Gambarlah persegi untuk badan rumah, segitiga untuk atap, dan persegi kecil untuk pintu.',
      },
    ],
    summary: [
      'Garis terdiri dari garis lurus, lengkung, dan zigzag.',
      'Bentuk dasar gambar adalah lingkaran, persegi, persegi panjang, dan segitiga.',
      'Bentuk dasar dapat disusun menjadi gambar benda di sekitar.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Bentuk yang memiliki tiga sisi adalah ...',
        options: ['segitiga', 'lingkaran', 'persegi'],
        answer: 'segitiga',
        explanation: 'Segitiga memiliki tiga sisi, sedangkan lingkaran tidak bersudut dan persegi punya empat sisi.',
      },
      {
        type: 'benar-salah',
        text: 'Garis zigzag berbentuk lurus dan rapi seperti penggaris.',
        options: ['Benar', 'Salah'],
        answer: 'Salah',
        explanation: 'Garis zigzag berkelok tajam ke kiri dan ke kanan, bukan lurus seperti penggaris.',
      },
      {
        type: 'isian',
        text: 'Bentuk bulat yang tidak memiliki sudut disebut ...',
        answer: 'lingkaran',
        explanation: 'Lingkaran adalah bentuk bulat tanpa sudut dan tanpa sisi lurus.',
      },
    ],
  },
  {
    id: 'g1-seni-2',
    subjectId: 'seni',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Menyanyi dan Bergerak Bersama',
    emoji: '🎵',
    description: 'Bernyanyi dan bergerak mengikuti irama bersama teman-teman.',
    objectives: [
      'Menyanyikan lagu anak dengan suara yang jelas',
      'Mengikuti irama lagu dengan gerakan tubuh',
      'Bergerak dengan hati-hati agar tidak menabrak teman',
    ],
    sections: [
      {
        heading: 'Bernyanyi Bersama',
        paragraphs: [
          'Bernyanyi bersama membuat hati senang. Kita menyanyi dengan suara yang jelas dan tidak terlalu keras.',
          'Kita bisa menyanyikan lagu anak, seperti "Burung Kakak Tua" dan "Naik Delman".',
        ],
        bullets: [
          'Bernyanyi dengan suara jelas',
          'Dengarkan tempo lagu',
          'Satu suara bersama teman',
        ],
      },
      {
        heading: 'Bergerak Mengikuti Irama',
        paragraphs: [
          'Tubuh kita bisa bergerak mengikuti irama lagu. Kita bertepuk tangan, menghentakkan kaki, dan menganggukkan kepala.',
          'Gerakan harus dilakukan dengan hati-hati agar tidak menabrak teman. Beri jarak yang cukup saat bergerak.',
        ],
        example: 'Saat lagu cepat, kita bertepuk tangan cepat. Saat lagu lambat, gerakan kita juga lambat.',
      },
    ],
    summary: [
      'Bernyanyi bersama dilakukan dengan suara jelas dan kompak.',
      'Gerakan tubuh mengikuti tempo lagu, cepat atau lambat.',
      'Bergerak dengan hati-hati menjaga keselamatan semua teman.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Saat menyanyi bersama, kita sebaiknya ...',
        options: ['menyanyi dengan suara jelas', 'berteriak paling keras', 'menutup telinga teman'],
        answer: 'menyanyi dengan suara jelas',
        explanation: 'Suara yang jelas membuat nyanyian terdengar bagus tanpa mengganggu telinga teman.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['irama', 'mengikuti', 'Kami', 'bergerak'],
        answer: 'Kami bergerak mengikuti irama',
        explanation: 'Kalimat itu menjelaskan bahwa gerakan tubuh mengikuti irama lagu.',
      },
      {
        type: 'cerita',
        story: 'Di kelas, Bu Guru memutar lagu lambat. Anak-anak mengikuti gerakan dengan tenang.',
        text: 'Bagaimana gerakan yang sesuai dengan lagu lambat?',
        options: ['Gerakan lambat', 'Gerakan sangat cepat', 'Gerakan sambil berlari'],
        answer: 'Gerakan lambat',
        explanation: 'Gerakan mengikuti tempo lagu, jadi lagu lambat diiringi gerakan lambat.',
      },
    ],
  },
  {
    id: 'g1-pjok-1',
    subjectId: 'pjok',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Gerak Dasar Berjalan dan Berlari',
    emoji: '🏃',
    description: 'Berlatih berjalan dan berlari dengan sikap tubuh yang benar dan aman.',
    objectives: [
      'Mempraktikkan berjalan dengan sikap tubuh tegak',
      'Membedakan gerak berjalan dan berlari',
      'Membiasakan pemanasan sebelum berlari',
    ],
    sections: [
      {
        heading: 'Berjalan dengan Benar',
        paragraphs: [
          'Berjalan dilakukan dengan kaki bergantian. Pandangan ke depan dan badan tegak.',
          'Kita berjalan di tempat yang aman, tidak sambil mendorong teman.',
        ],
        bullets: [
          'Badan tegak',
          'Pandangan ke depan',
          'Langkah kaki bergantian',
        ],
      },
      {
        heading: 'Berlari dengan Aman',
        paragraphs: [
          'Berlari lebih cepat daripada berjalan. Saat berlari, kedua kaki melayang sebentar dari tanah.',
          'Kita berlari di lapangan, bukan di kelas. Sebelum berlari, lakukan pemanasan agar otot tidak kaku.',
        ],
        example: 'Guru meniup peluit. Anak-anak berlari pelan menuju garis finis tanpa saling mendorong.',
      },
    ],
    summary: [
      'Berjalan memakai langkah kaki bergantian dengan badan tegak.',
      'Berlari lebih cepat dan kedua kaki sempat melayang.',
      'Pemanasan dilakukan sebelum berlari agar tubuh aman.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Sebelum berlari, kita sebaiknya melakukan ...',
        options: ['pemanasan', 'tidur', 'makan besar'],
        answer: 'pemanasan',
        explanation: 'Pemanasan membuat otot siap bergerak sehingga tidak mudah cedera.',
      },
      {
        type: 'benar-salah',
        text: 'Berlari sebaiknya dilakukan di dalam kelas.',
        options: ['Benar', 'Salah'],
        answer: 'Salah',
        explanation: 'Berlari dilakukan di lapangan atau halaman agar aman dan tidak menabrak barang di kelas.',
      },
      {
        type: 'isian',
        text: 'Saat berjalan, pandangan kita diarahkan ke ...',
        answer: 'depan',
        explanation: 'Pandangan ke depan membantu kita melihat jalan dan menghindari tabrakan.',
      },
    ],
  },
  {
    id: 'g1-pjok-2',
    subjectId: 'pjok',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Main Aman, Tubuh Sehat',
    emoji: '🛡️',
    description: 'Bermain dengan aman dan menjaga kebersihan agar tubuh tetap sehat.',
    objectives: [
      'Menyebutkan cara bermain yang aman',
      'Menjelaskan kebiasaan menjaga kebersihan tubuh',
      'Menerapkan cuci tangan sebelum makan',
    ],
    sections: [
      {
        heading: 'Bermain dengan Aman',
        paragraphs: [
          'Bermain itu menyenangkan, tetapi harus aman. Kita tidak mendorong teman dan tidak bermain di jalan raya.',
          'Sebelum bermain, periksa tempat bermain. Hindari tempat yang licin atau banyak benda tajam.',
        ],
        bullets: [
          'Tidak mendorong teman',
          'Bermain di tempat yang aman',
          'Memakai alas kaki',
        ],
      },
      {
        heading: 'Menjaga Tubuh Sehat',
        paragraphs: [
          'Tubuh sehat dimulai dari kebiasaan kecil. Kita mandi dua kali sehari, menggosok gigi, dan mencuci tangan sebelum makan.',
          'Kita juga perlu makan makanan bergizi, minum air putih, dan tidur cukup.',
        ],
        example: 'Setelah bermain di halaman, Doni mencuci tangan dengan sabun sebelum makan siang.',
      },
    ],
    summary: [
      'Bermain aman dilakukan di tempat yang lapang dan tidak mendorong teman.',
      'Cuci tangan dengan sabun sebelum makan agar kuman hilang.',
      'Tidur cukup, makan bergizi, dan minum air putih menjaga tubuh sehat.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Tempat yang aman untuk bermain adalah ...',
        options: ['lapangan', 'jalan raya', 'pinggir jurang'],
        answer: 'lapangan',
        explanation: 'Lapangan luas dan jauh dari kendaraan sehingga aman untuk bermain.',
      },
      {
        type: 'menjodohkan',
        text: 'Jodohkan alat dengan kegunaannya.',
        answer: '',
        pairs: [
          ['Sabun', 'Mencuci tangan'],
          ['Sikat gigi', 'Menggosok gigi'],
          ['Air putih', 'Menghilangkan haus'],
        ],
        explanation: 'Sabun untuk mencuci tangan, sikat gigi untuk menggosok gigi, dan air putih untuk diminum.',
      },
      {
        type: 'cerita',
        story: 'Rudi bermain bola di jalan raya. Tiba-tiba ada sepeda motor lewat.',
        text: 'Apa yang seharusnya dilakukan Rudi?',
        options: ['Bermain di lapangan', 'Tetap bermain di jalan', 'Bermain di malam hari'],
        answer: 'Bermain di lapangan',
        explanation: 'Jalan raya berbahaya karena banyak kendaraan, jadi bermain sebaiknya di lapangan.',
      },
    ],
  },
  {
    id: 'g1-mulok-1',
    subjectId: 'mulok',
    grade: 1,
    semester: 1,
    order: 1,
    title: 'Mengenal Bahasa Daerahku',
    emoji: '🏝️',
    description: 'Mengenal bahasa daerah di Indonesia dan beberapa contoh sapaan.',
    objectives: [
      'Menyebutkan contoh bahasa daerah di Indonesia',
      'Mengenal sapaan khas daerah',
      'Menjelaskan pentingnya menjaga bahasa daerah',
    ],
    sections: [
      {
        heading: 'Bahasa Daerah di Indonesia',
        paragraphs: [
          'Indonesia punya banyak bahasa daerah. Ada bahasa Jawa, Sunda, Bali, Batak, Bugis, dan masih banyak lagi.',
          'Bahasa daerah dipakai untuk berbicara dengan keluarga dan tetangga di daerah kita.',
        ],
        bullets: [
          'Bahasa Jawa',
          'Bahasa Sunda',
          'Bahasa Bali',
        ],
      },
      {
        heading: 'Contoh Sapaan',
        paragraphs: [
          'Setiap daerah punya sapaan khas. Di Jawa, orang menyapa "Sugeng enjing" yang artinya selamat pagi.',
          'Di Sunda, sapaan "Sampurasun" dijawab dengan "Rampes". Sapaan ini menunjukkan keramahan.',
        ],
        example: '"Sampurasun!" kata Dita. "Rampes!" jawab temannya sambil tersenyum.',
      },
    ],
    summary: [
      'Indonesia memiliki banyak bahasa daerah, seperti Jawa, Sunda, dan Bali.',
      'Setiap daerah memiliki sapaan khas yang menunjukkan keramahan.',
      'Menjaga bahasa daerah berarti menjaga budaya warisan nenek moyang.',
    ],
    minutes: 10,
    questions: [
      {
        type: 'pg',
        text: 'Sapaan "Sampurasun" berasal dari bahasa ...',
        options: ['Sunda', 'Jawa', 'Bali'],
        answer: 'Sunda',
        explanation: 'Sampurasun adalah sapaan khas Sunda yang dijawab dengan rampes.',
      },
      {
        type: 'isian',
        text: 'Bahasa yang dipakai untuk berbicara dengan keluarga di daerah disebut bahasa ...',
        answer: 'daerah',
        explanation: 'Bahasa daerah dipakai sehari-hari oleh masyarakat di suatu daerah.',
      },
      {
        type: 'susun-kata',
        text: 'Susunlah kata-kata berikut menjadi kalimat yang benar.',
        options: ['bahasa', 'Banyak', 'di', 'daerah', 'Indonesia'],
        answer: 'Banyak bahasa daerah di Indonesia',
        explanation: 'Kalimat itu menyatakan bahwa Indonesia memiliki banyak bahasa daerah.',
      },
    ],
  },
  {
    id: 'g1-mulok-2',
    subjectId: 'mulok',
    grade: 1,
    semester: 2,
    order: 2,
    title: 'Lagu dan Permainan Tradisional',
    emoji: '🎲',
    description: 'Mengenal lagu dan permainan tradisional Indonesia yang seru dan mendidik.',
    objectives: [
      'Menyebutkan contoh lagu tradisional dan daerah asalnya',
      'Menyebutkan contoh permainan tradisional',
      'Menjelaskan sikap sportif saat bermain',
    ],
    sections: [
      {
        heading: 'Lagu Tradisional',
        paragraphs: [
          'Indonesia punya banyak lagu tradisional. Lagu "Cublak-Cublak Suweng" berasal dari Jawa, dan "Ampar-Ampar Pisang" dari Kalimantan Selatan.',
          'Lagu tradisional sering dinyanyikan sambil bermain. Syairnya sederhana dan mudah diingat.',
        ],
        bullets: [
          'Cublak-Cublak Suweng dari Jawa',
          'Ampar-Ampar Pisang dari Kalimantan Selatan',
          'Soleram dari Riau',
        ],
      },
      {
        heading: 'Permainan Tradisional',
        paragraphs: [
          'Permainan tradisional dimainkan bersama teman. Ada engklek, congklak, lompat tali, dan gobak sodor.',
          'Permainan ini melatih ketangkasan dan kerja sama. Kita harus bermain dengan sportif dan tidak curang.',
        ],
        example: 'Anak-anak bermain engklek di halaman. Mereka melompat dari kotak satu ke kotak berikutnya dengan satu kaki.',
      },
    ],
    summary: [
      'Lagu tradisional berasal dari berbagai daerah di Indonesia.',
      'Permainan tradisional seperti engklek dan congklak dimainkan bersama teman.',
      'Bermain sportif berarti menaati aturan dan tidak curang.',
    ],
    minutes: 12,
    questions: [
      {
        type: 'pg',
        text: 'Permainan yang dimainkan dengan melompati kotak-kotak di tanah adalah ...',
        options: ['engklek', 'congklak', 'kelereng'],
        answer: 'engklek',
        explanation: 'Engklek dimainkan dengan melompati kotak-kotak yang digambar di tanah.',
      },
      {
        type: 'menjodohkan',
        text: 'Jodohkan permainan dengan alat atau gerakannya.',
        answer: '',
        pairs: [
          ['Engklek', 'Melompat kotak'],
          ['Congklak', 'Biji dan papan'],
          ['Lompat tali', 'Tali panjang'],
        ],
        explanation: 'Engklek memakai kotak di tanah, congklak memakai papan dan biji, lompat tali memakai tali panjang.',
      },
      {
        type: 'cerita',
        story: 'Saat bermain gobak sodor, Andi menyentuh teman dengan keras sampai teman terjatuh.',
        text: 'Apa yang sebaiknya dilakukan Andi?',
        options: ['Bermain dengan hati-hati', 'Mengulangi lagi', 'Marah kepada teman'],
        answer: 'Bermain dengan hati-hati',
        explanation: 'Bermain harus menjaga keselamatan teman, jadi sentuhan dilakukan dengan hati-hati.',
      },
    ],
  },
]

export default grade1
