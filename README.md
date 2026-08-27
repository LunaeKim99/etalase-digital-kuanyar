# Ruang Digital Potensi dan Karya Desa Kuanyar

Platform digital untuk mempromosikan potensi Desa Kuanyar — profil desa, UMKM, pertanian, berita, dan informasi kontak.

---

## Fitur

| Halaman | Fungsi |
|---------|--------|
| **Beranda** | Tampilan utama dengan statistik desa, UMKM unggulan, dan berita terkini |
| **Profil Desa** | Sejarah, visi & misi, demografi, fasilitas, dan lokasi desa |
| **Potensi Desa** | UMKM dan sektor pertanian desa |
| **Berita & Galeri** | Informasi dan kegiatan desa beserta album foto |
| **Kontak** | Alamat kantor desa dan peta lokasi |

---

## Akses Admin

Panel admin digunakan untuk mengelola konten website (UMKM, pertanian, berita, galeri, profil desa).

**URL Admin:**  
`https://etalase-kuanyar.vercel.app/admin/login`

**Akun default (setelah setup awal):**  
- Email: `admin@kuanyar.desa.id`  
- Password: *(sesuai yang ditetapkan saat setup)*

> **Penting:** Segera ganti password default setelah login pertama.

---

## Panduan Singkat Admin

### Login
1. Buka `/admin/login`
2. Masukkan email dan password
3. Klik **Masuk**

### Upload Gambar
Gambar diunggah langsung dari komputer: klik area upload atau drag & drop file (JPG, PNG, WebP — maks 4 MB). Gambar otomatis dikonversi ke **WebP** dan di-resize sebelum disimpan, jadi tidak perlu edit foto terlebih dahulu.

### Mengelola UMKM
1. Masuk menu **Potensi Desa › UMKM**
2. Klik **Tambah UMKM** untuk menambah data baru
3. Tambahkan foto UMKM di halaman detail (bisa beberapa foto sekaligus, atur urutan dengan tombol panah)
4. Klik ikon pensil untuk mengedit, ikon tempat sampah untuk menghapus

### Mengelola Pertanian
1. Masuk menu **Potensi Desa › Pertanian**
2. Klik **Tambah** untuk menambah data sektor pertanian
3. Tambahkan foto dan data sektor (komoditas, musim tanam) di halaman detail

### Mengelola Berita & Galeri
1. Masuk menu **Berita & Galeri**
2. **Berita**: klik **Tambah Berita**, lengkapi judul, isi, dan gambar sampul
3. **Galeri**: klik **Upload Gambar**, pilih album, lalu unggah beberapa foto sekaligus — urutan bisa diatur dengan tombol panah

### Mengelola Profil Desa
1. Masuk menu **Profil Desa**
2. Edit informasi profil (sejarah, visi-misi, demografi, dll)
3. Klik **Simpan**

### Logout
Klik tombol **Keluar** di sidebar.

---

## Teknologi

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Hono API
- Database: Turso (SQLite cloud)
- Media: Upload gambar dengan konversi otomatis ke WebP (sharp) + Vercel Blob
- Hosting: Vercel

---

## Kontak & Bantuan

Untuk bantuan teknis atau pertanyaan mengenai website:

- **Pengembang:** LunaeKim99
- **Repository:** [github.com/LunaeKim99/etalase-digital-kuanyar](https://github.com/LunaeKim99/etalase-digital-kuanyar)

---

## Catatan Penting

- **Jangan bagikan** kredensial admin kepada pihak yang tidak berwenang
- **Ganti password** secara berkala untuk keamanan
- **Backup data** dilakukan secara otomatis oleh Turso
- Website dapat diakses 24/7 melalui Vercel

---

**Dibangun untuk Desa Kuanyar**
