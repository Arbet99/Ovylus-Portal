export type Category = "Berita AI" | "Video AI" | "Automation" | "Belajar AI";
export type Article = {
  id: string;
  title: string;
  description: string;
  category: Category;
  topic: string;
  visual: string;
  label: string;
  meta: string;
  author: string;
  source: string;
  paragraphs: string[];
  videoId?: string;
};

export const navItems = [
  "Beranda",
  "Berita AI",
  "Video AI",
  "Automation",
  "Belajar AI",
  "Kreator",
] as const;
export const topics = [
  "Semua",
  "Model AI",
  "Tools",
  "Bisnis",
  "Riset",
  "Regulasi",
];

// Sample editorial copy for the interactive design. These are not live news reports.
export const articles: Article[] = [
  {
    id: "era-agent",
    title: "Apa itu AI agent dan bagaimana cara kerjanya?",
    description:
      "AI agent dapat menyusun langkah dan menggunakan alat untuk menjalankan tugas. Pelajari contohnya, cara kerjanya, dan batas kemampuannya.",
    category: "Berita AI",
    topic: "Model AI",
    visual: "robot",
    label: "PANDUAN AI",
    meta: "3 menit baca",
    author: "Redaksi Ovylus",
    source: "https://www.anthropic.com/research/building-effective-agents",
    paragraphs: [
      "Selama ini, kita terbiasa memberi pertanyaan lalu menunggu jawaban. AI agent membawa pola interaksi yang berbeda: sistem dapat menggunakan alat, menyusun langkah, dan menjalankan bagian dari sebuah pekerjaan dengan batas yang kita tentukan.",
      "Bayangkan proses merangkum dokumen, menyiapkan draf, dan memeriksa informasi pendukung. Dalam alur yang dirancang dengan baik, beberapa langkah ini dapat saling terhubung. Namun, kemampuan tersebut tetap bergantung pada model, akses alat, kualitas data, dan pengawasan manusia.",
      "Mulailah dari tugas yang kecil dan mudah diperiksa. Tentukan kapan agent harus berhenti, tindakan mana yang membutuhkan persetujuan, serta cara mengukur hasilnya. Nilai sebenarnya datang dari alur kerja yang dapat dipercaya, bukan sekadar banyaknya langkah otomatis.",
      "Catatan editorial: tulisan ini adalah konten contoh untuk desain Ovylus Portal, bukan laporan berita terkini. Tautan sumber menyediakan bacaan lanjutan tentang pola membangun agent.",
    ],
  },
  {
    id: "reasoning",
    title: "Bagaimana model AI menyelesaikan soal yang rumit?",
    description:
      "Kenali model reasoning: model AI yang dirancang untuk menyelesaikan masalah dalam beberapa langkah.",
    category: "Berita AI",
    topic: "Model AI",
    visual: "hand",
    label: "MODEL AI",
    meta: "2 menit baca",
    author: "Redaksi Ovylus",
    source: "https://platform.openai.com/docs/guides/reasoning",
    paragraphs: [
      "Model reasoning dirancang untuk mengalokasikan proses komputasi pada persoalan yang membutuhkan beberapa langkah. Pendekatan ini dapat membantu pada tugas seperti pemrograman, matematika, dan perencanaan.",
      "Lebih banyak proses tidak selalu berarti jawaban yang benar. Tetap periksa fakta, ukur hasil pada tugas nyata, dan pertimbangkan waktu serta biaya. Pilih kemampuan sesuai kebutuhan, bukan hanya label model terbaru.",
      "Ini adalah contoh editorial. Dokumentasi sumber menjelaskan kemampuan dan batas penggunaan model reasoning secara lebih rinci.",
    ],
  },
  {
    id: "creative-tools",
    title: "Memilih alat AI untuk desain dan pembuatan konten",
    description:
      "Bandingkan alat pembuat gambar berdasarkan kebutuhan, kualitas hasil, dan izin penggunaan aset.",
    category: "Berita AI",
    topic: "Tools",
    visual: "studio",
    label: "ALAT KREATIF",
    meta: "2 menit baca",
    author: "Redaksi Ovylus",
    source: "https://www.adobe.com/products/firefly.html",
    paragraphs: [
      "Tools generatif dapat membantu mengeksplorasi komposisi, warna, dan alternatif visual dengan lebih cepat. Peran kreator tetap penting dalam menentukan konsep, menyunting hasil, serta menjaga konsistensi identitas.",
      "Mulailah dengan brief yang jelas. Tentukan format, audiens, dan batasan merek sebelum mencoba berbagai alat. Bandingkan hasil berdasarkan kebutuhan nyata dan periksa ketentuan penggunaan aset.",
      "Artikel contoh ini tidak memberikan peringkat atau rekomendasi berbayar. Tautan sumber menuju salah satu alat kreatif untuk eksplorasi lebih lanjut.",
    ],
  },
  {
    id: "small-models",
    title: "Kapan model AI berukuran kecil lebih cocok digunakan?",
    description:
      "Ukuran model memengaruhi kebutuhan memori, kecepatan, dan biaya. Ini yang perlu dipertimbangkan.",
    category: "Berita AI",
    topic: "Riset",
    visual: "chip",
    label: "RISET",
    meta: "2 menit baca",
    author: "Redaksi Ovylus",
    source: "https://huggingface.co/docs/transformers/index",
    paragraphs: [
      "Ukuran model hanyalah salah satu faktor yang menentukan kecocokan sebuah sistem. Untuk tugas tertentu, model lebih kecil bisa menjadi pilihan menarik karena kebutuhan memori dan waktu responsnya.",
      "Evaluasi tetap perlu dilakukan menggunakan data yang mewakili kondisi penggunaan. Pertimbangkan akurasi, perangkat yang tersedia, lisensi, dan biaya pemeliharaan sebelum membuat keputusan.",
      "Konten ini adalah contoh editorial tentang efisiensi model. Dokumentasi Transformers dapat menjadi titik awal untuk mempelajari berbagai arsitektur dan cara menjalankannya.",
    ],
  },
  {
    id: "ai-governance",
    title: "Siapa yang bertanggung jawab atas penggunaan AI?",
    description:
      "Transparansi, privasi, dan tanggung jawab dalam membangun produk berbasis AI.",
    category: "Berita AI",
    topic: "Regulasi",
    visual: "governance",
    label: "REGULASI",
    meta: "2 menit baca",
    author: "Redaksi Ovylus",
    source: "https://www.nist.gov/itl/ai-risk-management-framework",
    paragraphs: [
      "Tata kelola membantu tim menentukan bagaimana sistem AI dikembangkan, digunakan, dan dievaluasi. Ruang lingkupnya mencakup dokumentasi, perlindungan data, serta pembagian tanggung jawab.",
      "Kerangka manajemen risiko dapat menjadi bahan diskusi untuk menetapkan proses yang sesuai dengan konteks organisasi. Kebutuhan hukum berbeda di setiap wilayah dan harus diperiksa secara terpisah.",
      "Tulisan ini adalah contoh pengantar, bukan nasihat hukum. Sumber NIST menyediakan kerangka yang dapat dipelajari lebih lanjut.",
    ],
  },
  {
    id: "llm-video",
    title: "Mengenal model bahasa besar bersama Andrej Karpathy",
    description:
      "Pengantar LLM dari Andrej Karpathy, dengan rangkuman berbahasa Indonesia.",
    category: "Video AI",
    topic: "Model AI",
    visual: "studio",
    label: "PENJELASAN LENGKAP",
    meta: "59 menit",
    author: "Andrej Karpathy",
    source: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    videoId: "zjkBMFhNj_g",
    paragraphs: [
      "Video berbahasa Inggris ini memperkenalkan large language model, proses pelatihan, dan cara memikirkan kemampuannya. Cocok untuk mendapatkan gambaran umum sebelum masuk ke pembahasan teknis.",
      "Judul dan ringkasan berbahasa Indonesia disusun sebagai contoh kurasi Ovylus. Video tetap milik kreator aslinya dan diputar melalui YouTube.",
    ],
  },
  {
    id: "neural-video",
    title: "Apa yang sebenarnya dipelajari neural network?",
    description:
      "Lihat bagaimana jaringan saraf belajar mengenali angka dari contoh gambar.",
    category: "Video AI",
    topic: "Riset",
    visual: "network",
    label: "PENJELASAN VISUAL",
    meta: "19 menit",
    author: "3Blue1Brown",
    source: "https://www.youtube.com/watch?v=aircAruvnKk",
    videoId: "aircAruvnKk",
    paragraphs: [
      "Melalui contoh pengenalan angka, video berbahasa Inggris ini memperlihatkan bagaimana jaringan saraf menyusun representasi dari data. Visualisasinya membantu membangun intuisi tentang bobot, lapisan, dan aktivasi.",
      "Ringkasan ini merupakan contoh kurasi untuk desain portal. Buka video aslinya untuk penjelasan lengkap dari 3Blue1Brown.",
    ],
  },
  {
    id: "attention-video",
    title: "Bagaimana AI mengenali hubungan antarkata?",
    description:
      "Video tentang attention, mekanisme yang membantu model menentukan bagian teks yang relevan.",
    category: "Video AI",
    topic: "Riset",
    visual: "chrome",
    label: "CARA KERJA AI",
    meta: "26 menit",
    author: "3Blue1Brown",
    source: "https://www.youtube.com/watch?v=eMlx5fFNoYc",
    videoId: "eMlx5fFNoYc",
    paragraphs: [
      "Attention membantu model menghubungkan bagian-bagian informasi yang relevan dalam sebuah konteks. Video berbahasa Inggris ini menggambarkan mekanismenya melalui visualisasi matematika.",
      "Konten ini merupakan contoh kurasi, dengan judul dan ringkasan berbahasa Indonesia. Video aslinya tersedia melalui sumber yang ditautkan.",
    ],
  },
  {
    id: "workflow",
    title: "Mencatat formulir ke spreadsheet secara otomatis",
    description:
      "Pelajari alur sederhana di n8n: terima formulir, catat data, lalu kirim pemberitahuan.",
    category: "Automation",
    topic: "Bisnis",
    visual: "workflow",
    label: "N8N · PEMULA",
    meta: "3 menit baca",
    author: "Ovylus Lab",
    source: "https://docs.n8n.io/try-it-out/tutorial-first-workflow/",
    paragraphs: [
      "Pilih satu proses berulang dengan masukan dan hasil yang jelas, misalnya mencatat formulir masuk ke spreadsheet. Tulis langkah manualnya terlebih dahulu agar bagian yang perlu diotomatisasi terlihat.",
      "Dalam n8n, pilih pemicu (trigger), tambahkan langkah (node) untuk mengolah data, lalu hubungkan tujuan akhirnya. Uji menggunakan data contoh dan periksa setiap output sebelum mengaktifkan workflow.",
      "Tambahkan penanganan error dan pertimbangkan akses data. Untuk tahap pertama, hindari tindakan yang sulit dibatalkan. Dokumentasi sumber menyediakan tutorial resmi langkah demi langkah.",
    ],
  },
  {
    id: "research-flow",
    title: "Meringkas dokumen tanpa kehilangan sumbernya",
    description:
      "Susun alur membaca dan meringkas dokumen, lalu periksa setiap ringkasan dengan sumber aslinya.",
    category: "Automation",
    topic: "Tools",
    visual: "workspace",
    label: "ALUR KERJA · MENENGAH",
    meta: "2 menit baca",
    author: "Ovylus Lab",
    source: "https://docs.n8n.io/advanced-ai/",
    paragraphs: [
      "Mulailah dengan kumpulan dokumen yang boleh Anda gunakan. Pisahkan tahap ekstraksi, peringkasan, dan pemeriksaan agar asal informasi tetap dapat dilacak.",
      "Sertakan referensi dokumen pada setiap ringkasan dan gunakan pemeriksaan manusia sebelum hasil dibagikan. Ringkasan otomatis dapat melewatkan konteks atau menghasilkan klaim yang tidak didukung.",
      "Ini adalah konsep workflow untuk eksplorasi. Sambungan layanan dan kredensial perlu disiapkan sendiri saat menerapkannya.",
    ],
  },
  {
    id: "business-flow",
    title: "Memilih tugas bisnis yang bisa diotomatisasi",
    description:
      "Mulai dari pencatatan data atau pengingat internal. Bandingkan waktu yang dihemat dengan biaya perawatannya.",
    category: "Automation",
    topic: "Bisnis",
    visual: "chip",
    label: "PANDUAN BISNIS",
    meta: "2 menit baca",
    author: "Ovylus Lab",
    source: "https://docs.n8n.io/workflows/",
    paragraphs: [
      "Petakan pekerjaan yang sering berulang, memakan waktu, dan memiliki aturan yang cukup jelas. Pencatatan data atau pengingat internal bisa menjadi awal yang sederhana.",
      "Hitung waktu yang dihemat sekaligus biaya pemeliharaan dan potensi kesalahan. Otomatisasi yang berguna seharusnya mempermudah pekerjaan tim dan tetap mudah dipantau.",
      "Contoh ini ditujukan untuk membantu menyusun ide, bukan menjanjikan hasil bisnis tertentu.",
    ],
  },
  {
    id: "ai-basics",
    title: "Dasar AI: istilah, cara kerja, dan keterbatasannya",
    description:
      "Pahami istilah penting, cara kerja, dan batas kemampuan AI dalam panduan pengantar.",
    category: "Belajar AI",
    topic: "Model AI",
    visual: "robot",
    label: "PEMULA",
    meta: "3 menit baca",
    author: "Ovylus Academy",
    source: "https://www.elementsofai.com/",
    paragraphs: [
      "Artificial intelligence adalah bidang luas yang mencakup berbagai pendekatan untuk menjalankan tugas yang biasanya membutuhkan kecerdasan manusia. Machine learning mempelajari pola dari data, sementara model generatif dapat menghasilkan konten baru berdasarkan pola yang dipelajari.",
      "Keluaran yang terlihat meyakinkan belum tentu benar. Bias data, keterbatasan konteks, dan kesalahan prediksi perlu dipahami saat menggunakan sistem AI.",
      "Coba satu tugas sederhana, tulis harapan Anda, lalu bandingkan hasilnya. Untuk belajar lebih terstruktur, sumber Elements of AI menyediakan materi pengantar.",
    ],
  },
  {
    id: "prompting",
    title: "Cara menulis instruksi yang jelas untuk AI",
    description:
      "Belajar menyusun instruksi dengan konteks, contoh, dan format hasil yang jelas.",
    category: "Belajar AI",
    topic: "Tools",
    visual: "terminal",
    label: "PEMULA",
    meta: "2 menit baca",
    author: "Ovylus Academy",
    source: "https://platform.openai.com/docs/guides/prompt-engineering",
    paragraphs: [
      "Prompt yang berguna menjelaskan tugas, konteks, batasan, dan bentuk hasil yang diharapkan. Misalnya, mintalah ringkasan tiga poin untuk pembaca pemula daripada sekadar meminta ringkasan.",
      "Gunakan contoh jika format yang Anda inginkan sulit dijelaskan. Uji dengan beberapa masukan yang berbeda dan revisi instruksinya berdasarkan masalah yang muncul.",
      "Instruksi yang baik membantu mengarahkan model, tetapi tidak menghilangkan kebutuhan untuk memeriksa fakta dan menilai kualitas hasil.",
    ],
  },
  {
    id: "first-agent",
    title: "Langkah awal merancang AI agent",
    description:
      "Kenali hubungan model, tools, memori, dan aturan berhenti sebelum membangun agent.",
    category: "Belajar AI",
    topic: "Bisnis",
    visual: "workflow",
    label: "MENENGAH",
    meta: "3 menit baca",
    author: "Ovylus Academy",
    source: "https://www.anthropic.com/research/building-effective-agents",
    paragraphs: [
      "Mulailah dengan tujuan yang sempit dan dapat diukur. Sebuah agent tidak harus mengerjakan banyak hal sekaligus; kemampuan memilih alat yang tepat untuk satu tugas sudah menjadi awal yang baik.",
      "Tentukan masukan, alat yang boleh digunakan, batas jumlah langkah, dan kondisi yang memerlukan bantuan manusia. Simpan catatan proses agar kesalahan dapat ditelusuri.",
      "Uji dengan skenario normal dan skenario gagal. Artikel sumber membahas pola agent dan kapan workflow yang lebih sederhana justru lebih sesuai.",
    ],
  },
];

export const creators = [
  {
    name: "Andrej Karpathy",
    role: "Model bahasa & pemrograman AI",
    initials: "AK",
    color: "orange",
    url: "https://www.youtube.com/@AndrejKarpathy",
    mark: "PENGAJAR AI",
  },
  {
    name: "3Blue1Brown",
    role: "Matematika lewat penjelasan visual",
    initials: "3B",
    color: "black",
    url: "https://www.youtube.com/@3blue1brown",
    mark: "BELAJAR VISUAL",
  },
  {
    name: "Hugging Face",
    role: "Model terbuka & panduan praktik",
    initials: "HF",
    color: "gray",
    url: "https://huggingface.co/learn",
    mark: "KOMUNITAS",
  },
];
