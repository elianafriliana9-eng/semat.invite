# Logika Builder & Manajemen State

Builder adalah inti dari pengalaman pembuatan undangan di Semat.invite. Builder memungkinkan pengguna untuk menyesuaikan undangan mereka secara real-time dengan pratinjau berdampingan.

## 🏗 Arsitektur Komponen

Builder terdiri dari tiga bagian utama:

1. **`BuilderNavbar`**: Menangani tindakan global seperti menyimpan, undo/redo (jika diimplementasikan), dan beralih antara mode Edit dan Bagikan (Share).
2. **`EditorPanel`**: Sidebar kiri yang berisi tab dan formulir untuk mengedit berbagai bagian (Mempelai, Acara, RSVP, dll.).
3. **`PreviewRenderer`**: Panel kanan yang merender tema yang dipilih berdasarkan state saat ini. Panel ini mendukung peralihan antara tampilan seluler (mobile) dan desktop.

## 🧠 Manajemen State dengan Zustand

Kami menggunakan [Zustand](https://github.com/pmndrs/zustand) untuk mengelola state builder. Hal ini memberikan beberapa manfaat dibandingkan state React standar:

- **Akses Global:** Komponen apa pun dapat dengan mudah membaca atau memperbarui data undangan.
- **Performa:** Pembaruan berbasis selector Zustand memastikan bahwa hanya komponen yang perlu dirender ulang yang benar-benar melakukannya.
- **Sinkronisasi Real-time:** Perubahan di `EditorPanel` langsung tercermin di `PreviewRenderer`.

### Store `useBuilderStore`

Didefinisikan di `store/builderStore.ts`, store ini mengelola:

- `data`: Objek `InvitationData` (sumber kebenaran JSON).
- `invitationId`: ID undangan yang sedang diedit.
- Fungsi `updateX`: Fungsi granular untuk memperbarui bagian tertentu dari data (misalnya, `updateCouple`, `addEvent`, `updateMusic`).

## 💾 Persistensi & Debouncing

Untuk memastikan integritas data dan UI yang lancar:

- **Simpan Otomatis (Auto-save):** Builder secara otomatis menyimpan perubahan ke Supabase.
- **Debounce:** Operasi penyimpanan didebounce untuk mencegah panggilan API yang berlebihan saat pengguna sedang mengetik.
- **Pemuatan Awal:** Saat builder dibuka, ia mengambil JSON yang ada dari Supabase dan menginisialisasi store Zustand melalui `setInitialData`.

## 🖼 Penanganan Aset

`EditorPanel` menyertakan logika unggah file yang terintegrasi melalui Supabase Storage:

- **Gambar:** Foto profil, item galeri, dan gambar cerita diunggah ke folder `assets/profiles`.
- **Musik:** File audio diunggah ke folder `assets/music`.
- **URL Publik:** Setelah diunggah, URL publik disimpan ke dalam data JSON undangan.
