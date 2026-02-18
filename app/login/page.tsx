"use client";

import Link from "next/link";
import { useState } from "react";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LoginPageContent = () => {
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
        <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl shadow-2xl shadow-primary/5 p-8 md:p-12 flex flex-col items-center text-center">

            {/* Brand Logo */}
            <div className="mb-10 flex flex-col items-center gap-2">
                <div className="size-12 bg-primary rounded-full flex items-center justify-center text-[#f4f1ea] mb-2">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                        <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                </div>
                <h2 className="text-primary dark:text-white text-xl font-bold tracking-tight uppercase">KanvasKita</h2>
            </div>

            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="font-serif text-4xl md:text-5xl text-primary dark:text-white font-medium leading-tight mb-3">Selamat Datang Kembali</h1>
                <p className="text-primary/60 dark:text-white/60 text-base font-normal">Kelola undangan digital Anda dengan elegan.</p>
            </div>

            {/* Login Form */}
            <form className="w-full space-y-5 mb-6 text-left">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-primary dark:text-white ml-1">Email atau Username</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="nama@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-primary/20 dark:border-white/20 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400 text-charcoal dark:text-white"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label htmlFor="password" className="text-sm font-medium text-primary dark:text-white">Password</label>
                        <Link href="#" className="text-xs text-primary/60 dark:text-white/60 hover:text-primary dark:hover:text-white hover:underline transition-colors">Lupa Password?</Link>
                    </div>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg border border-primary/20 dark:border-white/20 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400 text-charcoal dark:text-white"
                    />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-lg bg-primary text-white font-bold tracking-wide shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:translate-y-[-1px] active:translate-y-[0px]">
                    Masuk
                </button>
            </form>

            {/* Separator */}
            <div className="mb-6 flex w-full items-center gap-4">
                <div className="h-[1px] flex-1 bg-primary/10 dark:bg-white/10"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 dark:text-white/30 whitespace-nowrap">Atau masuk dengan</span>
                <div className="h-[1px] flex-1 bg-primary/10 dark:bg-white/10"></div>
            </div>

            {/* Google Login */}
            <div className="w-full">
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg border border-primary/10 dark:border-white/10 bg-white/50 dark:bg-white/5 py-3.5 px-6 transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="size-5 border-2 border-primary border-t-transparent animate-spin rounded-full"></div>
                    ) : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4.24 3.22 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                        </svg>
                    )}
                    <span className="text-sm font-medium text-primary dark:text-white">
                        {loading ? 'Sedang memproses...' : 'Google'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default function LoginPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Back Button */}
            <div className="absolute top-8 left-8 z-30">
                <Link href="/" className="flex items-center gap-2 text-primary/60 dark:text-white/60 hover:text-primary dark:hover:text-white transition-colors group">
                    <div className="p-2 rounded-full bg-white/50 dark:bg-black/20 border border-primary/10 dark:border-white/10 group-hover:bg-white dark:group-hover:bg-white/10 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Kembali</span>
                </Link>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f4f1ea]/40 via-white to-background-light dark:from-background-dark dark:via-background-dark dark:to-background-dark/50"></div>
                <img
                    alt="Soft focus high-key wedding stationery and flowers"
                    className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwpryE_SQFbiSJcVeCWtbCdhymtcGknOzgw2uLzuoYIpuyjjIFq50mU4P5IE2o32c_18PCO8Aqs0L2WmtJfz_uJ8aspefwcu-LVT3noVZAiFufTsa3kZhvotoRP_GzEDZDuab5IlrKFFuaKXKKmfo_x2rCT5zR8s2-IcU5dkljoW6aOyQfA_E2j6BkNb7KKGA5Owep7JFEHYeEvLIgL2In1dvf2tmF8ECqobMgI2W3GgXN7_WZjGw1QsN-SHCaMzsqgG4-AUbnWXaw"
                />
            </div>

            {/* Main Content Container */}
            <main className="relative z-10 w-full max-w-[440px] px-6">
                {/* Login Card */}
                <LoginPageContent />

                {/* Footer */}
                <footer className="mt-8 flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-6 text-xs font-medium text-primary/40 dark:text-white/40 uppercase tracking-widest">
                        <Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Syarat & Ketentuan</Link>
                        <span className="size-1 rounded-full bg-primary/20 dark:bg-white/20"></span>
                        <Link href="#" className="hover:text-primary dark:hover:text-white transition-colors">Kebijakan Privasi</Link>
                    </div>
                    <p className="text-[11px] text-primary/30 dark:text-white/30 uppercase tracking-[0.15em]">
                        © 2024 KanvasKita | Butuh bantuan? <Link href="#" className="underline">Hubungi kami</Link>
                    </p>
                </footer>
            </main>

            {/* Support Floating Button */}
            <div className="fixed bottom-8 right-8 z-20">
                <button className="flex size-12 items-center justify-center rounded-full bg-primary text-[#f4f1ea] shadow-xl transition-transform hover:scale-110 active:scale-95">
                    <HelpCircle className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
