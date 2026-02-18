"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setError('Semua field wajib diisi.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password minimal 6 karakter.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });
            if (error) throw error;
            setSuccess(true);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan saat mendaftar.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setGoogleLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error('Error registering with Google:', error);
            alert('Gagal melakukan registrasi dengan Google. Silakan coba lagi.');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <AuthLayout>
            {/* Welcome Header */}
            <div className="text-center mb-6">
                <h1 className="font-serif text-3xl md:text-4xl text-primary dark:text-white font-medium leading-tight mb-2">
                    Buat Akun Baru
                </h1>
                <p className="text-primary/60 dark:text-white/50 text-sm leading-relaxed">
                    Daftar gratis dan mulai buat undangan digital pertamamu.
                </p>
            </div>

            {/* Success state */}
            {success ? (
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-serif text-xl text-primary dark:text-white mb-2">Registrasi Berhasil!</h3>
                    <p className="text-sm text-primary/60 dark:text-white/50 mb-6">
                        Kami telah mengirim email verifikasi ke <strong className="text-primary dark:text-white">{formData.email}</strong>. Silakan cek inbox Anda.
                    </p>
                    <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-primary text-white py-3 px-8 text-sm font-semibold hover:bg-primary/90 transition-all shadow-md">
                        Kembali ke Login
                    </Link>
                </div>
            ) : (
                <>
                    {/* Google Register Button */}
                    <button
                        onClick={handleGoogleRegister}
                        disabled={googleLoading || loading}
                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-primary/15 dark:border-white/15 bg-white/60 dark:bg-white/5 py-3.5 px-6 transition-all duration-300 hover:bg-white/90 dark:hover:bg-white/10 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>

                        {googleLoading ? (
                            <div className="size-5 border-2 border-primary dark:border-white border-t-transparent animate-spin rounded-full"></div>
                        ) : (
                            <svg className="h-5 w-5 relative z-10" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                        )}
                        <span className="text-sm font-medium text-primary dark:text-white relative z-10">
                            {googleLoading ? 'Sedang memproses...' : 'Daftar dengan Google'}
                        </span>
                    </button>

                    {/* Separator */}
                    <div className="my-5 flex w-full items-center gap-4">
                        <div className="h-px flex-1 bg-primary/10 dark:bg-white/10"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 dark:text-white/30 whitespace-nowrap">Atau daftar dengan email</span>
                        <div className="h-px flex-1 bg-primary/10 dark:bg-white/10"></div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleEmailRegister} className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-primary dark:text-white ml-1">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama lengkap"
                                className="w-full px-4 py-3 rounded-xl border border-primary/15 dark:border-white/15 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-white/20 focus:border-primary/30 transition-all placeholder:text-gray-400 text-charcoal dark:text-white text-sm backdrop-blur-sm"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-primary dark:text-white ml-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="nama@email.com"
                                className="w-full px-4 py-3 rounded-xl border border-primary/15 dark:border-white/15 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-white/20 focus:border-primary/30 transition-all placeholder:text-gray-400 text-charcoal dark:text-white text-sm backdrop-blur-sm"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-primary dark:text-white ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Minimal 6 karakter"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-primary/15 dark:border-white/15 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-white/20 focus:border-primary/30 transition-all placeholder:text-gray-400 text-charcoal dark:text-white text-sm backdrop-blur-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || googleLoading}
                            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary text-white py-3.5 px-6 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md mt-2"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                            {loading && (
                                <div className="size-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                            )}
                            <span className="text-sm font-semibold relative z-10 tracking-wide">
                                {loading ? 'Mendaftarkan akun...' : 'Buat Akun'}
                            </span>
                        </button>
                    </form>

                    {/* Separator */}
                    <div className="my-5 flex w-full items-center gap-4">
                        <div className="h-px flex-1 bg-primary/10 dark:bg-white/10"></div>
                    </div>

                    {/* Already have account link */}
                    <div className="text-center">
                        <p className="text-sm text-primary/50 dark:text-white/40">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="text-primary dark:text-white font-semibold hover:underline transition-colors">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>

                    {/* Trust Indicator */}
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 text-primary/40 dark:text-white/30">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            <span className="text-xs font-medium">Registrasi aman & terenkripsi</span>
                        </div>
                        <p className="text-[11px] text-primary/30 dark:text-white/25 text-center leading-relaxed">
                            Dengan mendaftar, Anda menyetujui <Link href="#" className="underline hover:text-primary/50 dark:hover:text-white/40 transition-colors">Syarat & Ketentuan</Link> dan <Link href="#" className="underline hover:text-primary/50 dark:hover:text-white/40 transition-colors">Kebijakan Privasi</Link> kami.
                        </p>
                    </div>
                </>
            )}
        </AuthLayout>
    );
}
