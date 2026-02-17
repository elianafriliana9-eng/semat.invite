# Panduan Pengembangan Tema

Tema dalam Semat.invite adalah "mesin tampilan" untuk undangan. Tema adalah komponen React yang mengambil objek data JSON standar dan merendernya menjadi undangan yang indah dan interaktif.

## 📋 Struktur Tema

Tema biasanya berupa satu komponen React (seringkali dengan sub-komponen) yang terletak di `components/themes/`.

### Antarmuka `ThemeProps`

Setiap tema harus mengimplementasikan antarmuka `ThemeProps`:

```typescript
export interface ThemeProps {
  data: InvitationData;
  id?: string;
  isPreview?: boolean;
  guestName?: string;
}
```

### Logika yang Diperlukan

Tema bertanggung jawab untuk:

1. **Urutan Pembukaan:** Menangani layar splash "Buka Undangan".
2. **Musik:** Menggunakan `data.music` untuk memutar dan mengontrol audio latar belakang.
3. **Countdown:** Menghitung waktu tersisa hingga tanggal acara pertama.
4. **RSVP:** Menyediakan formulir bagi tamu untuk mengonfirmasi kehadiran dan menyimpannya ke Supabase.
5. **Buku Tamu:** Menampilkan pesan dari tamu lain.

## 🛠 Membuat Tema Baru

1. **Buat Komponen:** Buat file baru di `components/themes/` (misalnya, `VintageChic.tsx`).
2. **Daftarkan Tema:** Tambahkan tema Anda ke `themeRegistry` di `components/themes/index.tsx`.
3. **Implementasikan UI:** Gunakan Tailwind CSS dan Framer Motion untuk membangun bagian UI (Hero, Couple, Events, Gallery, dll.).
4. **Tangani Data:** Akses bidang dari prop `data` (Nama mempelai pria, Nama mempelai wanita, Daftar acara, dll.).

## 🎨 Praktik Terbaik

- **Mobile First:** Pastikan tata letak terlihat memukau di browser bawaan WhatsApp.
- **Micro-interactions:** Gunakan `framer-motion` untuk animasi masuk yang halus saat pengguna menggulir.
- **Pemuatan Aset:** Gunakan state placeholder untuk gambar yang mungkin membutuhkan waktu untuk dimuat.
- **Konsistensi Warna:** Ikuti filosofi desain "Luxury-Minimalist" proyek ini.

## 📖 Referensi Implementasi

Lihat [ModernLuxury.tsx](file:///d:/Projects/semat.invite/components/themes/ModernLuxury.tsx) untuk contoh lengkap tema yang siap produksi. File ini mencakup logika kompleks untuk sinkronisasi musik, penanganan RSVP, dan tata letak multi-bagian.
