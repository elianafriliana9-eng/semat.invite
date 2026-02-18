"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error('Error logging in with Google:', error);
            alert('Gagal melakukan login dengan Google. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            {/* Welcome Header */}
            <div className="text-center mb-8">
                <h1 className="font-serif text-3xl md:text-4xl text-primary dark:text-white font-medium leading-tight mb-3">
                    Selamat Datang
                </h1>
                <p className="text-primary/60 dark:text-white/50 text-sm leading-relaxed">
                    Masuk untuk mengelola undangan digital Anda dengan elegan dan mudah.
                </p>
            </div>

            {/* Google Login Button — Primary CTA */}
            <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary text-white py-4 px-6 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

                {loading ? (
                    <div className="size-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                ) : (
                    <svg className="h-5 w-5 relative z-10" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#93b3ae"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#8cc5a2"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#f3e5d8"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4.24 3.22 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#e8a898"></path>
                    </svg>
                )}
                <span className="text-sm font-semibold relative z-10 tracking-wide">
                    {loading ? 'Sedang memproses...' : 'Masuk dengan Google'}
                </span>
            </button>

            {/* Separator */}
            <div className="my-6 flex w-full items-center gap-4">
                <div className="h-px flex-1 bg-primary/10 dark:bg-white/10"></div>
            </div>

            {/* Register Link */}
            <div className="text-center">
                <p className="text-sm text-primary/50 dark:text-white/40">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-primary dark:text-white font-semibold hover:underline transition-colors">
                        Daftar di sini
                    </Link>
                </p>
            </div>

            {/* Trust Indicator */}
            <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-primary/40 dark:text-white/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span className="text-xs font-medium">Login aman & terenkripsi</span>
                </div>
                <p className="text-[11px] text-primary/30 dark:text-white/25 text-center leading-relaxed">
                    Dengan masuk, Anda menyetujui <Link href="#" className="underline hover:text-primary/50 dark:hover:text-white/40 transition-colors">Syarat & Ketentuan</Link> dan <Link href="#" className="underline hover:text-primary/50 dark:hover:text-white/40 transition-colors">Kebijakan Privasi</Link> kami.
                </p>
            </div>
        </AuthLayout>
    );
}
