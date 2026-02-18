"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, Eye, ArrowLeft, Star } from "lucide-react";
import { themeShowcaseData, THEME_CATEGORIES, type ThemeShowcaseItem } from "@/lib/themeShowcaseData";

export default function ThemesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("Semua");
    const [previewTheme, setPreviewTheme] = useState<ThemeShowcaseItem | null>(null);

    // Lock body scroll when preview modal is open
    useEffect(() => {
        if (previewTheme) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [previewTheme]);

    const filteredThemes = activeCategory === "Semua"
        ? themeShowcaseData
        : themeShowcaseData.filter((t) => t.category === activeCategory);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display selection:bg-primary/30 transition-colors duration-300">
            {/* Decorative Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-secondary/30 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen" />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 glass-panel border-b-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="text-primary dark:text-white w-5 h-5" />
                            <span className="font-serif font-bold text-xl text-primary dark:text-white tracking-tight">
                                Semat<span className="text-primary/60 dark:text-white/60">.invite</span>
                            </span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Header */}
            <section className="pt-16 pb-8 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-white/10 text-primary dark:text-white text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
                        <Star className="w-3 h-3 mr-2 fill-current" />
                        Koleksi Eksklusif
                    </div>
                    <h1 className="font-serif text-4xl lg:text-5xl font-medium text-primary dark:text-white tracking-tight mb-4">
                        Galeri Tema Premium
                    </h1>
                    <p className="text-primary/60 dark:text-white/60 font-light leading-relaxed max-w-lg mx-auto">
                        Jelajahi koleksi desain undangan digital yang dikurasi dengan sentuhan elegan.
                        Setiap tema dirancang untuk momen spesial Anda.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-12">
                <div className="flex justify-center gap-2 flex-wrap">
                    {THEME_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 text-primary/70 dark:text-white/70 hover:bg-white dark:hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Theme Grid */}
            <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-24">
                {filteredThemes.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-primary/40 dark:text-white/40 font-light">Belum ada tema dalam kategori ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredThemes.map((theme) => (
                            <div
                                key={theme.id}
                                className="group glass-panel rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={theme.thumbnail}
                                        alt={theme.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {theme.isNew && (
                                            <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                                                Baru
                                            </span>
                                        )}
                                        {theme.isPremium && (
                                            <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                                                Premium
                                            </span>
                                        )}
                                    </div>

                                    {/* Category badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm text-primary/70 dark:text-white/70 text-[10px] font-semibold uppercase tracking-wider border border-white/40 dark:border-white/10">
                                            {theme.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-serif text-lg font-medium text-primary dark:text-white mb-1">
                                        {theme.name}
                                    </h3>
                                    <p className="text-primary/50 dark:text-white/50 text-sm font-light leading-relaxed mb-5 line-clamp-2">
                                        {theme.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {theme.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-0.5 rounded-full bg-secondary/40 dark:bg-white/5 text-primary/60 dark:text-white/50 text-[10px] font-medium uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Preview Button */}
                                    <button
                                        onClick={() => setPreviewTheme(theme)}
                                        className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full text-white bg-primary hover:bg-primary-light shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Lihat Preview
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="py-6 text-center border-t border-primary/5 dark:border-white/5">
                <p className="text-[11px] text-primary/30 dark:text-white/20 font-light tracking-wider">
                    &copy; {new Date().getFullYear()} Semat.invite &mdash; Elegan dalam Sematan, Abadi dalam Ingatan
                </p>
            </footer>

            {/* ═══════════ MOBILE PREVIEW POPUP ═══════════ */}
            {previewTheme && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-8"
                    onClick={() => setPreviewTheme(null)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

                    {/* Modal Content */}
                    <div
                        className="relative z-10 flex flex-col items-center w-full max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button — safely above the phone */}
                        <button
                            onClick={() => setPreviewTheme(null)}
                            className="self-end mb-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all shrink-0"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Phone Frame — responsive: max 70vh height, maintains 9:19 aspect */}
                        <div
                            className="relative w-full rounded-[40px] border-[6px] border-gray-700 bg-black shadow-2xl shadow-black/60 overflow-hidden shrink"
                            style={{ aspectRatio: "9/19", maxHeight: "70vh" }}
                        >
                            {/* Dynamic Island / Notch */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-gray-800 rounded-full z-20" />

                            {/* Side button accents */}
                            <div className="absolute -right-[8px] top-[100px] w-[3px] h-[50px] bg-gray-600 rounded-r-sm" />
                            <div className="absolute -left-[8px] top-[80px] w-[3px] h-[30px] bg-gray-600 rounded-l-sm" />
                            <div className="absolute -left-[8px] top-[120px] w-[3px] h-[50px] bg-gray-600 rounded-l-sm" />

                            {/* Iframe */}
                            <iframe
                                src={previewTheme.previewUrl}
                                className="w-full h-full border-0 bg-white"
                                title={`Preview ${previewTheme.name}`}
                            />
                        </div>

                        {/* Theme Info — below the frame */}
                        <div className="text-center mt-5 shrink-0">
                            <h3 className="font-serif text-lg font-medium text-white mb-1">{previewTheme.name}</h3>
                            <p className="text-white/50 text-xs font-light">{previewTheme.category} &middot; Tap untuk interaksi</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
