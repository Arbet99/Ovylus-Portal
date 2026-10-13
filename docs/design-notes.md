# Revisi editorial Ovylus Portal

Revisi ini menggabungkan brief awal KINETIC dengan `DESIGN.md`, `code.html`, dan screenshot tambahan dari pemilik repository. Lampiran digunakan sebagai referensi visual. Skrip eksternal pada HTML referensi tidak dijalankan atau dimasukkan ke aplikasi.

## Tata letak

- Hero gelap memisahkan penjelasan artikel dan gambar, dengan tiga pilihan artikel yang dapat dipilih pengguna.
- Poster vertikal dipakai untuk artikel. Bagian video menggunakan latar hitam dan deretan horizontal dengan cuplikan kartu berikutnya.
- Automation memakai tiga contoh alur kerja, dengan diagram kecil yang menggambarkan isi panduan.
- Panduan belajar berupa daftar berurutan; kreator berupa direktori kanal asli.
- Bagian penutup membantu memilih bacaan berdasarkan kebutuhan. Pilihan tersebut langsung mengubah rekomendasi yang dapat dibuka.
- Space Grotesk dipakai untuk judul dan Plus Jakarta Sans untuk teks. Font dimuat dari aset lokal. Warna oranye tetap `#FF4000`, dengan teks hitam pada tombol oranye untuk keterbacaan.

## Bahasa dan isi

Judul menyebutkan topik atau pekerjaan secara langsung. Contoh: “Mencatat formulir ke spreadsheet secara otomatis”, bukan slogan tentang produktivitas. Istilah teknis dijelaskan di ringkasan atau artikel. Teks dibuat ringkas, tetapi tetap menyampaikan apa yang bisa dipelajari.

Klaim berita, tanggal publikasi, nama kreator fiktif, jumlah pembaca, dan angka pengikut pada referensi tidak diperlakukan sebagai fakta. Artikel tetap berlabel contoh. Kanal video dan sumber bacaan mengarah ke penyedia aslinya. Tidak ada formulir langganan atau tombol ikuti yang menyatakan tindakan tersimpan ke server.

## Gerakan dan interaksi

- Poster sedikit membesar di dalam bingkainya; tombol baca muncul saat hover.
- Gambar hero merespons gerakan kursor dengan kemiringan maksimal sekitar dua derajat, lalu kembali saat kursor keluar. Efek ini tidak diterapkan pada perangkat sentuh.
- Bagian halaman muncul dengan perpindahan singkat saat masuk layar.
- Bookmark memberikan umpan balik visual dan menyimpan pilihan di browser.
- Diagram automation merespons hover, dan panah tombol menunjukkan arah aksi.
- Deretan video memiliki kontrol mundur/maju dengan status nonaktif di ujung daftar. Pengguna tetap dapat menggulir langsung.
- Pengaturan reduced motion mematikan transisi dekoratif, perpindahan gulir halus, dan efek kemiringan.

Semua judul dan konten tetap dapat diakses tanpa mengandalkan efek hover. Dialog mendukung tombol Escape dan mengembalikan fokus ke tombol yang membukanya.
