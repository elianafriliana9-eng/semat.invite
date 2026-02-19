"use client";

import Link from "next/link";
import {
    LayoutTemplate,
    Users,
    Music2,
    MapPin,
    Heart,
    Gift,
    Share2,
    Smartphone,
    Eye,
    BookOpen,
    ArrowRight,
    CheckCheck,
    Sparkles,
} from "lucide-react";

const features = [
    {
        icon: LayoutTemplate,
        title: "Modular Builder",
        desc: "Editor drag-and-drop intuitif. Kustomisasi setiap bagian undangan sesuai selera — tanpa coding, hasilnya selalu elegan.",
        accent: "primary",
        size: "large",
    },
    {
        icon: Users,
        title: "RSVP Real-Time",
        desc: "Pantau konfirmasi kehadiran secara langsung. Ekspor daftar tamu ke spreadsheet dengan satu klik.",
        accent: "green",
        size: "normal",
    },
    {
        icon: Music2,
        title: "Musik Latar",
        desc: "Sematkan lagu favorit sebagai pengiring. Kontrol play/pause langsung dari dalam undangan.",
        accent: "secondary",
        size: "normal",
    },
    {
        icon: MapPin,
        title: "Lokasi & Maps",
        desc: "Tampilkan detail venue beserta integrasi Google Maps agar tamu mudah menemukan lokasi.",
        accent: "rose",
        size: "normal",
    },
    {
        icon: Heart,
        title: "Love Story",
        desc: "Ceritakan perjalanan cinta Anda dalam timeline visual yang menyentuh hati — momen pertama bertemu hingga lamaran.",
        accent: "primary",
        size: "normal",
    },
    {
        icon: Gift,
        title: "Digital Gift",
        desc: "Cantumkan nomor rekening atau dompet digital untuk hadiah, dengan UI bersih dan elegan.",
        accent: "amber",
        size: "normal",
    },
    {
        icon: Share2,
        title: "Bagikan via Link",
        desc: "Setiap undangan punya link unik siap disebarkan via WhatsApp, media sosial, atau email.",
        accent: "primary",
        size: "normal",
    },
    {
        icon: Smartphone,
        title: "Mobile-First",
        desc: "Didesain untuk layar smartphone. Setiap tema responsif sempurna di semua ukuran perangkat.",
        accent: "secondary",
        size: "normal",
    },
    {
        icon: BookOpen,
        title: "Galeri Foto",
        desc: "Upload galeri foto pra-nikah langsung ke undangan. Kenangan yang memperindah setiap halaman.",
        accent: "green",
        size: "normal",
    },
];

const accentMap: Record<string, { bg: string; icon: string; badge: string }> = {
    primary: {
        bg: "bg-primary/8 dark:bg-primary/15",
        icon: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
        badge: "bg-primary/10 text-primary dark:bg-white/10 dark:text-white",
    },
    secondary: {
        bg: "bg-secondary/20 dark:bg-secondary/10",
        icon: "bg-secondary/40 text-primary",
        badge: "bg-secondary/40 text-primary",
    },
    green: {
        bg: "bg-green-50 dark:bg-green-900/10",
        icon: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        badge: "bg-green-100 text-green-600",
    },
    rose: {
        bg: "bg-rose-50 dark:bg-rose-900/10",
        icon: "bg-rose-100 text-rose-500 dark:bg-rose-900/30 dark:text-rose-400",
        badge: "bg-rose-100 text-rose-500",
    },
    amber: {
        bg: "bg-amber-50 dark:bg-amber-900/10",
        icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
        badge: "bg-amber-100 text-amber-600",
    },
};

export function Features() {
    return (
        <section className="py-24 bg-background-light dark:bg-background-dark relative z-10 overflow-hidden" id="features">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-secondary/20 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/60 dark:border-white/10 text-primary dark:text-secondary text-xs font-semibold tracking-widest uppercase mb-5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Fitur Lengkap
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-primary dark:text-white mb-4 leading-tight">
                        Semua yang Anda butuhkan,<br />
                        <span className="text-primary/60 dark:text-secondary/80">dalam satu platform</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                        Dari undangan hingga manajemen tamu — semuanya terpadu dengan desain yang tak tertandingi.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[180px]">

                    {/* Card 1: Builder — large (2 cols, 2 rows) */}
                    <div className="lg:col-span-2 lg:row-span-2 bg-white dark:bg-[#1e2420] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
                        {/* Decorative mockup */}
                        <div className="absolute right-0 bottom-0 w-3/5 h-4/5 overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-white dark:to-[#1e2420] z-10" />
                            {/* Mock builder UI */}
                            <div className="absolute top-6 right-4 w-full h-full bg-gray-50 dark:bg-white/5 rounded-tl-2xl border-l border-t border-gray-200 dark:border-white/10 p-4 group-hover:-translate-x-2 group-hover:-translate-y-1 transition-transform duration-500">
                                <div className="flex gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <LayoutTemplate className="w-5 h-5 text-primary/40" />
                                    </div>
                                    <div className="h-16 rounded-lg bg-secondary/30 border border-secondary/40" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="h-2 rounded bg-gray-200 dark:bg-white/10 w-3/4" />
                                    <div className="h-2 rounded bg-gray-200 dark:bg-white/10 w-1/2" />
                                    <div className="h-2 rounded bg-primary/20 w-2/3" />
                                </div>
                                {/* palette */}
                                <div className="flex gap-1.5 mt-4">
                                    {["bg-primary", "bg-secondary", "bg-rose-300", "bg-green-300", "bg-amber-300"].map((c, i) => (
                                        <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-white dark:border-[#1e2420]`} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 h-full flex flex-col justify-between relative z-10">
                            <div>
                                <div className="w-11 h-11 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary dark:text-secondary mb-5">
                                    <LayoutTemplate className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-serif text-primary dark:text-white mb-2">Modular Builder</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
                                    Editor intuitif tanpa coding. Kustomisasi setiap elemen — warna, foto, teks, musik — dan lihat hasilnya secara real-time.
                                </p>
                            </div>
                            <Link href="/login" className="inline-flex items-center gap-1.5 text-primary dark:text-secondary text-sm font-medium group-hover:gap-3 transition-all">
                                Coba Sekarang <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: RSVP Tracker */}
                    <div className="bg-primary text-white rounded-2xl overflow-hidden shadow-lg relative group hover:scale-[1.02] transition-transform duration-300">
                        <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full blur-2xl -mr-8 -mt-8" />
                        <div className="p-6 h-full flex flex-col">
                            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                                <Users className="w-4 h-4" />
                            </div>
                            <h3 className="font-serif text-lg mb-1">RSVP Real-Time</h3>
                            <p className="text-white/60 text-xs mb-auto leading-relaxed">Pantau konfirmasi kehadiran tamu secara langsung.</p>

                            {/* Mini stat */}
                            <div className="mt-4 flex items-end gap-1.5 h-14">
                                {[40, 70, 55, 90, 65, 100].map((h, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-t-sm transition-all ${i === 5 ? "bg-secondary shadow-[0_0_12px_rgba(243,229,216,0.4)]" : "bg-white/20"}`}
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-white/40 mt-1">
                                <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span className="text-secondary">Sab</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Theme Gallery */}
                    <Link href="/themes" className="lg:col-span-1 bg-secondary/20 dark:bg-secondary/5 rounded-2xl overflow-hidden border border-secondary/30 dark:border-white/5 relative group hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                        <div className="absolute inset-0 flex">
                            <div className="w-1/2 h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0jMdhybYnGAOChNikMukWmpRsGWEe0tIUjVuqAt2QV7CrdpnKCqzJgMC_-I-Mwy9eNNbQUgCt8z1c1G8XtAOIzP3Pvp5v2PmCVYXsyV3zcaB9eO1trORPNBeuj-nydVThLTljza5H6bS8lbBx-8ZMIogsBTFnh9nykttyY5uPSOwYGyovB1Uvd3cIM08lCfBzYFRTnHJm24eOj7C76Yzz38eyZOPTu0sRIHCmXuLzJrXFLc0zTh1CH4G4JtnGKKEV5YlDL2abDmU-')" }}
                            />
                            <div className="w-1/2 h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKsS7qV-tlqhbldGd7_8cndu0_EMknyrlusS59YbKaPPurSRZuuUdUW1ScleqI7vy79BOSwcra0uTVWYNEe6wKTZZEdVre2SPPbnGzpq4Rgy9T7rMf6L483iolwQlAhxMdDGq953aqnnO8E0zR5mpaPcQC1QIuZTX8C5VCwieNlip1eoP_SKNL3L7eVw3Rz80X0hfT-eWOre5QpDs60amqfhvQ0tN9-kIuG0QCr08snhrF4TRQuKyhVdfEHBp_A_OPm5m9gXjCLRQr')" }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                            <div className="text-white">
                                <p className="text-[10px] opacity-60 uppercase tracking-widest mb-1">Koleksi Tema</p>
                                <h3 className="font-serif text-base font-medium leading-tight">Galeri Premium</h3>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white ml-auto opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>

                    {/* Card 4: Music */}
                    <div className="bg-white dark:bg-[#1e2420] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all p-6 flex flex-col group">
                        <div className="w-9 h-9 bg-secondary/40 text-primary rounded-lg flex items-center justify-center mb-3">
                            <Music2 className="w-4 h-4" />
                        </div>
                        <h3 className="font-serif text-primary dark:text-white text-base mb-1">Musik Latar</h3>
                        <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed mb-auto">Sematkan lagu sebagai pengiring undangan digital Anda.</p>
                        {/* Mini waveform */}
                        <div className="mt-4 flex items-end gap-[3px] h-8">
                            {[6, 14, 9, 18, 7, 12, 16, 8, 14, 6, 11, 17].map((h, i) => (
                                <div key={i} className="flex-1 bg-secondary/60 rounded-full group-hover:bg-primary/40 transition-colors duration-300" style={{ height: h }} />
                            ))}
                        </div>
                    </div>

                    {/* Card 5: Love Story */}
                    <div className="bg-white dark:bg-[#1e2420] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all p-6 flex flex-col group">
                        <div className="w-9 h-9 bg-rose-100 text-rose-500 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg flex items-center justify-center mb-3">
                            <Heart className="w-4 h-4" />
                        </div>
                        <h3 className="font-serif text-primary dark:text-white text-base mb-1">Love Story</h3>
                        <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed mb-auto">Timeline visual perjalanan cinta Anda yang menyentuh hati.</p>
                        {/* Timeline decoration */}
                        <div className="mt-4 relative pl-4 border-l-2 border-rose-100 dark:border-rose-900/30 space-y-1.5">
                            {["Pertama Bertemu", "Kencan Pertama", "Melamar"].map((ev, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="absolute left-[-5px] w-2 h-2 rounded-full bg-rose-300" />
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500">{ev}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 6: Location */}
                    <div className="bg-white dark:bg-[#1e2420] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all p-6 flex flex-col group">
                        <div className="w-9 h-9 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg flex items-center justify-center mb-3">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <h3 className="font-serif text-primary dark:text-white text-base mb-1">Lokasi & Maps</h3>
                        <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed mb-auto">Detail venue + integrasi Google Maps langsung dari undangan.</p>
                        {/* Map mockup */}
                        <div className="mt-4 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center gap-2">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Buka di Google Maps →</span>
                        </div>
                    </div>

                    {/* Card 7: Digital Gift (wide, 2 cols) */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl overflow-hidden shadow-lg relative group hover:shadow-xl transition-all duration-300 p-6 flex items-center gap-6">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Gift className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-xl mb-1">Digital Gift & Rekening</h3>
                            <p className="text-white/70 text-sm">Tampilkan nomor rekening bank atau dompet digital untuk mempermudah tamu memberi hadiah.</p>
                        </div>
                        {/* Bank card deco */}
                        <div className="flex-shrink-0 hidden sm:block">
                            <div className="w-32 h-20 rounded-xl bg-white/10 border border-white/20 p-3 backdrop-blur-sm group-hover:-rotate-3 transition-transform duration-300">
                                <div className="text-[9px] text-white/50 mb-2">BCA / GoPay</div>
                                <div className="text-xs font-mono text-white tracking-wider">•••• 4821</div>
                                <div className="mt-2 text-[9px] text-white/60">a/n Raka & Putri</div>
                            </div>
                        </div>
                    </div>

                    {/* Card 8: Share */}
                    <div className="bg-white dark:bg-[#1e2420] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all p-6 flex flex-col group">
                        <div className="w-9 h-9 bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary rounded-lg flex items-center justify-center mb-3">
                            <Share2 className="w-4 h-4" />
                        </div>
                        <h3 className="font-serif text-primary dark:text-white text-base mb-1">Bagikan via Link</h3>
                        <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed mb-auto">Link unik untuk setiap undangan, siap di-share ke WhatsApp atau sosmed.</p>
                        {/* WhatsApp chat bubble */}
                        <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-lg rounded-tl-none p-2.5 border border-green-100 dark:border-green-900/30">
                            <p className="text-[10px] text-gray-600 dark:text-gray-300 line-clamp-1">"Halo Budi, kami mengundang kehadiranmu... 💌"</p>
                            <div className="flex justify-end items-center gap-1 mt-1">
                                <span className="text-[9px] text-gray-400">10:42</span>
                                <CheckCheck className="w-2.5 h-2.5 text-blue-500" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
