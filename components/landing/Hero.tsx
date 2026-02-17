import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-transparent dark:from-background-dark/95 dark:via-background-dark/80 dark:to-transparent z-10"></div>
                <img
                    alt="Blurred wedding reception background"
                    className="w-full h-full object-cover blur-sm opacity-60 dark:opacity-40"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcnXm_kENlSZC4SUUB6RsKqQYoqtHhvtPfLZApCfun0S7L7p5gzATKh48eClTvT2StPsChB9y2S6QE7lnf_8feXIZ_ta03ZVHu8jjbK6DNHqFNfJQoIhlRbm7GBdD6TOezqKVHvNSuzs8bMnf6KSQiXg6F3Q_svTWVBuvaeRTC1-338T9g-PARjqPgcpBrRU73MGvObgCfGk5kFAPT0x9fJMtmxvC105F4bqgMscyJzaT9u1BU7BUPuLI-hGYqxYqaDVSr4i6_Vd-o"
                />
            </div>

            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-secondary/40 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Text Content */}
                    <div className="max-w-2xl z-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-white/10 text-primary dark:text-white text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-primary dark:bg-secondary mr-2"></span>
                            Undangan Digital Premium
                        </div>
                        <h1 className="font-serif text-5xl lg:text-7xl font-medium text-primary dark:text-white leading-[1.1] mb-6 tracking-tight text-balance drop-shadow-sm">
                            Elegan dalam Sematan, Abadi dalam Ingatan
                        </h1>
                        <p className="text-lg text-charcoal/80 dark:text-gray-200 mb-10 leading-relaxed max-w-lg font-light drop-shadow-sm">
                            Platform undangan pernikahan digital premium. Buat momen bahagiamu tampil berkelas tanpa batas dengan desain yang dikurasi para ahli.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <Link href="/login" className="w-full sm:w-auto">
                                <button className="group relative flex items-center justify-center gap-3 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/20 hover:bg-white dark:hover:bg-white/20 text-primary dark:text-white px-8 py-4 rounded-full transition-all duration-300 shadow-glass hover:shadow-lg w-full overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                    {/* Google Icon SVG */}
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                    </svg>
                                    <span className="font-medium relative z-10">Stitch with Google</span>
                                </button>
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button className="px-8 py-6 rounded-full text-base w-full shadow-md">
                                    Mulai Buat (Gratis)
                                </Button>
                            </Link>
                        </div>

                        {/* Social Proof Avatars */}
                        <div className="mt-8 flex items-center gap-4 text-sm text-charcoal/80 dark:text-gray-300">
                            <div className="flex -space-x-2">
                                {[
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDGnZ9Fp6Vryz3c8DDHfaumag_wE3jMUkeuDnch3RPju48f_gvsmhI5H1yEfe9dx4_4e4cLV7f8f3R2bigNWcbtiYgA_ebBE6Z7xuxYZHXOKWMUWoQOzWC3iCkjYWEVOUoJ0sjc0tQgV3cgaZKpFo6AnyBM6qfNQhe7QVjwkIeQ5o2W4CitRVfXsjVntgIRG8Yp-RpC8iYLPVOznLQH1Oex-6FVh5liemNbpAGmV9U04aObkkHlVgCg_FEvz1AUPSkwVJD_8DyZRU3t",
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjDey29Xm9SngvOJSyyG1xjhQ6yHkvGj6Iu1d67ZfELk_gCyGGGjoIzG5ufgt2vtwpzfSuA8ip4NZAyaXOzaqkBcLNxBQrkLf8uswXUtWxjcXLhmqEMk3LgywTQnM6DoPVsTX6LgyT04jWy-K_9S--CFW7H1L9uLXs-a__qU7R5y3IreOhbaK5jGQWTTxUxxrOfd1fqEtv6R2Bn_35c0EH8yGtN9_28QpZqGlvsAK6N65PxyBzKu1rwT0Q1Rk9hTHNIgDRFfK6Lb9A",
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBMojA7Un-XDNMieiRJQIWjPP6fSS20pV9vWw4ttTAZy8RY0rnt4iYEauJ5E-6EIC3a2mJMwDKuZa0198Ivx8idMlEbaOMpocgNX8b_zGVBndRHYqOB9jIGamkX3NU69KlukmO58bkhM0BgOqCaPYuW5nXhlAM6e9qle1maS19et1BthPGokzcBDWDtkhYgl9Hsy6L_MjvjZeaS3EL9pZCpK5f4UulAguZ5o03YndLGTwTOvLNCpTheB3KS2SO25Ailu0DPFX5Ht_Zb"
                                ].map((src, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-gray-200" style={{ backgroundImage: `url('${src}')`, backgroundSize: 'cover' }}></div>
                                ))}
                            </div>
                            <p className="font-medium">Join 2,000+ happy couples</p>
                        </div>
                    </div>

                    {/* Floating Phone Card */}
                    <div className="relative flex justify-center lg:justify-end z-10 perspective-1000">
                        <div className="relative w-[300px] h-[600px] bg-charcoal rounded-[3rem] shadow-2xl border-8 border-charcoal overflow-hidden animate-float transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out">
                            <div className="absolute inset-0 bg-white overflow-hidden">
                                <div
                                    className="h-2/5 w-full bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8OIxAXCvHWtTq74JdV5f3s9Sg9YZf4OBV0BPhPQpnpVZ6I7FgtQfLA1JYbpITPLbtOlHr9MfmDLPJtO2JKWHjRWcSIjwwAKRDsFc08B88dxePtNuvIuGqYWxSo_wCmUpI3MsJfZikpsD2b6K_TLrxK9v7ZgzYE1Gr2_G9Acy9AbYGMujPevENqIRP_1fRni4YuGrd-R114J1rOSfgNQuLDEeQyiOVFetk6cWOxQkYT0S2_pjYO20M8Z75wVe0LEUKGlrYfpiFC1Gu')" }}
                                >
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                                <div className="p-6 text-center space-y-4 bg-white relative -mt-6 rounded-t-3xl h-full">
                                    <span className="block w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4"></span>
                                    <h3 className="font-serif text-2xl text-primary">Sarah & Dimas</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Undangan Pernikahan</p>
                                    <div className="py-4">
                                        <div className="w-16 h-px bg-primary/20 mx-auto"></div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-charcoal">Sabtu, 24 Agustus 2024</p>
                                        <p className="text-xs text-gray-500">Pukul 10.00 WIB - Selesai</p>
                                    </div>
                                    <div className="space-y-1 mt-4">
                                        <p className="text-sm font-medium text-charcoal">The Ritz-Carlton</p>
                                        <p className="text-xs text-gray-500">Pacific Place, Jakarta</p>
                                    </div>
                                    <button className="w-full mt-6 bg-primary text-white text-xs py-3 rounded-full font-medium shadow-lg shadow-primary/20">
                                        RSVP Sekarang
                                    </button>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-[2.5rem]"></div>
                        </div>

                        {/* Floating Widgets */}
                        <div className="absolute top-1/4 -right-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-glass animate-float" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-charcoal dark:text-white">RSVP Confirmed</p>
                                    <p className="text-[10px] text-gray-500">Putri & Partner (+1)</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-1/4 -left-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-glass animate-float" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-3">
                                <div className="bg-secondary/50 text-primary p-2 rounded-full">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-charcoal dark:text-white">Tema Premium</p>
                                    <p className="text-[10px] text-gray-500">Applied: Classic Cream</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
