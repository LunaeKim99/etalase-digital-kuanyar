# Etalase Digital Desa Kuanyar

Platform digital untuk mempromosikan potensi Desa Kuanyar — profil desa, UMKM, produk unggulan, berita, dan informasi kontak.

---

## Fitur

| Halaman | Fungsi |
|---------|--------|
| **Beranda** | Tampilan utama dengan statistik desa, UMKM unggulan, dan berita terkini |
| **Profil Desa** | Sejarah, visi & misi, demografi, fasilitas, dan lokasi desa |
| **UMKM** | Daftar pelaku UMKM desa beserta kontak WhatsApp |
| **Produk** | Katalog produk UMKM |
| **Berita & Galeri** | Informasi dan kegiatan desa |
| **Kontak** | Alamat kantor desa dan peta lokasi |

---

## Akses Admin

Panel admin digunakan untuk mengelola konten website (UMKM, produk, berita, profil desa).

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

### Mengelola UMKM
1. Masuk menu **UMKM**
2. Klik **Tambah UMKM** untuk menambah data baru
3. Klik ikon pensil untuk mengedit, ikon tempat sampah untuk menghapus

### Mengelola Produk
1. Masuk menu **Produk**
2. Klik **Tambah Produk** untuk menambah produk baru
3. Pilih UMKM pemilik produk
4. Lengkapi informasi produk (nama, harga, stok, foto)

### Mengelola Berita & Galeri
1. Masuk menu **Berita & Galeri**
2. Klik **Tambah Berita** untuk membuat konten baru
3. Tambahkan judul, isi berita, kategori, dan gambar pendukung

### Mengelola Profil Desa
1. Masuk menu **Profil Desa**
2. Edit informasi profil (sejarah, visi-misi, demografi, dll)
3. Klik **Simpan**

### Logout
Klik tombol **Keluar** di pojok kiri bawah sidebar.

---

## Struktur Konten

Website menampilkan informasi dalam struktur berikut:

- **Profil Desa** — Informasi resmi desa
- **UMKM** — Data pelaku usaha mikro kecil menengah
- **Produk** — Katalog produk UMKM
- **Berita** — Kegiatan dan informasi terkini
- **Kontak** — Informasi kontak dan lokasi

---

## Teknologi

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Hono API
- Database: Turso (SQLite cloud)
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
