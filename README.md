# Semat.invite

> **Elegan dalam Sematan, Abadi dalam Ingatan**

Semat.invite adalah platform undangan digital premium yang dirancang untuk pasangan modern dan penyelenggara pernikahan (Wedding Organizer). Kami menawarkan pengalaman mewah yang terkurasi melalui desain elegan dan antarmuka pengguna yang mulus.

## 🚀 Teknologi

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Gaya (Styling):** [Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/)
- **Komponen UI:** [Shadcn UI](https://ui.shadcn.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Backend/DB/Auth:** [Supabase](https://supabase.com/)
- **Pembayaran:** [Midtrans](https://midtrans.com/)
- **Manajemen State:** [Zustand](https://zustand-demo.pmnd.rs/)

## 🛠 Memulai

### Prasyarat

- Node.js terinstal
- Akun dan proyek Supabase
- Akun Midtrans (untuk pembayaran)

### Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/elianafriliana9-eng/semat.invite.git
   cd semat.invite
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Konfigurasi variabel lingkungan:
   Buat file `.env.local` dengan variabel berikut:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   MIDTRANS_SERVER_KEY=your_midtrans_server_key
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## 📂 Struktur Proyek

- `app/`: Halaman dan rute Next.js App Router.
- `components/`: Komponen UI yang dapat digunakan kembali, modul builder, dan tema.
- `store/`: Store manajemen state Zustand.
- `lib/`: Fungsi utilitas dan konfigurasi pihak ketiga.
- `types/`: Definisi TypeScript.

## 📖 Dokumentasi

Untuk dokumentasi teknis yang lebih detail, silakan merujuk ke direktori `docs/`:

- [Ikhtisar Arsitektur](file:///d:/Projects/semat.invite/docs/ARCHITECTURE.md)
- [Panduan Pengembangan Tema](file:///d:/Projects/semat.invite/docs/THEMES.md)
- [Logika Builder](file:///d:/Projects/semat.invite/docs/BUILDER.md)
