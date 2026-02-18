"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Check, Heart } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex relative overflow-hidden font-sans">
            {/* Back Button */}
            <div className="absolute top-6 left-6 z-30">
                <Link href="/" className="flex items-center gap-2 text-white/70 lg:text-primary/60 dark:text-white/60 hover:text-white lg:hover:text-primary dark:hover:text-white transition-colors group">
                    <div className="p-2 rounded-full bg-white/20 lg:bg-white/50 dark:bg-black/20 border border-white/20 lg:border-primary/10 dark:border-white/10 group-hover:bg-white/30 lg:group-hover:bg-white dark:group-hover:bg-white/10 transition-all backdrop-blur-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Kembali</span>
                </Link>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/*  LEFT PANEL — Decorative (hidden on mobile) */}
            {/* ═══════════════════════════════════════════ */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    alt="Wedding decoration background"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8OIxAXCvHWtTq74JdV5f3s9Sg9YZf4OBV0BPhPQpnpVZ6I7FgtQfLA1JYbpITPLbtOlHr9MfmDLPJtO2JKWHjRWcSIjwwAKRDsFc08B88dxePtNuvIuGqYWxSo_wCmUpI3MsJfZikpsD2b6K_TLrxK9v7ZgzYE1Gr2_G9Acy9AbYGMujPevENqIRP_1fRni4YuGrd-R114J1rOSfgNQuLDEeQyiOVFetk6cWOxQkYT0S2_pjYO20M8Z75wVe0LEUKGlrYfpiFC1Gu"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary-light/70"></div>

                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[350px] h-[350px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 px-16 max-w-lg text-center">
                    {/* Brand */}
                    <div className="flex items-center justify-center gap-2 mb-10">
                        <Sparkles className="text-secondary w-6 h-6" />
                        <span className="font-serif font-bold text-2xl text-white tracking-tight">
                            Kanvas<span className="text-white/60">Kita</span>
                        </span>
                    </div>

                    <h2 className="font-serif text-4xl xl:text-5xl text-white leading-tight mb-6 text-balance">
                        Elegan dalam Sematan, Abadi dalam Ingatan
                    </h2>
                    <p className="text-white/60 text-base leading-relaxed mb-12">
                        Platform undangan pernikahan digital premium. Momen istimewamu, dipersembahkan dengan sentuhan personal yang berkelas.
                    </p>

                    {/* Floating Widgets */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 animate-float shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-400/20 text-green-300 p-2 rounded-full">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-white">RSVP Confirmed</p>
                                    <p className="text-[10px] text-white/50">Putri & Partner (+1)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 animate-float shadow-lg" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-3">
                                <div className="bg-secondary/20 text-secondary p-2 rounded-full">
                                    <Heart className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-white">2,000+ Couples</p>
                                    <p className="text-[10px] text-white/50">Telah bergabung</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent"></div>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/*  RIGHT PANEL — Form Content                */}
            {/* ═══════════════════════════════════════════ */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative min-h-screen py-12">
                {/* Mobile-only decorative top */}
                <div className="lg:hidden absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-[300px] h-[300px] bg-secondary/30 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-[250px] h-[250px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                </div>

                {/* Card Container */}
                <main className="relative z-10 w-full max-w-[420px] px-6">
                    <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-primary/5 p-8 md:p-10">

                        {/* Brand Logo (mobile only) */}
                        <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                            <Sparkles className="text-primary dark:text-white w-5 h-5" />
                            <span className="font-serif font-bold text-xl text-primary dark:text-white tracking-tight">
                                Kanvas<span className="text-primary/60 dark:text-white/60">Kita</span>
                            </span>
                        </div>

                        {/* Page-specific content (login form / register form) */}
                        {children}
                    </div>

                    {/* Footer */}
                    <footer className="mt-6 text-center">
                        <p className="text-[11px] text-primary/30 dark:text-white/30 uppercase tracking-[0.15em]">
                            © 2024 KanvasKita | <Link href="#" className="underline hover:text-primary/50 transition-colors">Hubungi kami</Link>
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}
