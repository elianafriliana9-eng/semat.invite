import { CheckCircle2, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
    return (
        <section className="py-24 bg-white dark:bg-background-dark/50 relative z-10" id="pricing">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-white mb-4">
                        Pilih Paket Kebahagiaanmu
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Investasi terbaik untuk kenangan yang abadi. Pilih paket yang sesuai dengan kebutuhan pernikahan impianmu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {/* Starter Card */}
                    <div className="bg-background-light dark:bg-white/5 p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-xl font-serif text-primary dark:text-white mb-2">Starter</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-primary dark:text-white">Gratis</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                1 Undangan Digital
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                Template Dasar
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                RSVP Standar
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                                Aktif 7 Hari
                            </li>
                        </ul>
                        <button className="w-full py-3.5 px-6 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all">
                            Mulai Sekarang
                        </button>
                    </div>

                    {/* Premium Card */}
                    <div className="relative bg-white dark:bg-primary/40 p-8 rounded-[2rem] border-2 border-primary shadow-xl scale-105 z-20 flex flex-col glass-panel">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] uppercase tracking-widest font-bold py-1.5 px-4 rounded-full">
                            Paling Populer
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-serif text-primary dark:text-white mb-2">Premium</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-primary dark:text-white">IDR 499k</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200">
                                <Sparkles className="text-primary w-5 h-5 flex-shrink-0" />
                                Semua Fitur Starter
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200">
                                <Sparkles className="text-primary w-5 h-5 flex-shrink-0" />
                                Custom Domain
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200">
                                <Sparkles className="text-primary w-5 h-5 flex-shrink-0" />
                                WhatsApp Blast
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200">
                                <Sparkles className="text-primary w-5 h-5 flex-shrink-0" />
                                Musik & Galeri Tanpa Batas
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-200 font-bold">
                                <Sparkles className="text-primary w-5 h-5 flex-shrink-0" />
                                Aktif Selamanya
                            </li>
                        </ul>
                        <button className="w-full py-4 px-6 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-light transition-all">
                            Pilih Paket
                        </button>
                    </div>

                    {/* Agency Card */}
                    <div className="bg-background-light dark:bg-white/5 p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-xl font-serif text-primary dark:text-white mb-2">Agency</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-primary dark:text-white">Custom</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Building2 className="text-primary w-5 h-5 flex-shrink-0" />
                                White-Label Dashboard
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Building2 className="text-primary w-5 h-5 flex-shrink-0" />
                                Bulk Credits
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Building2 className="text-primary w-5 h-5 flex-shrink-0" />
                                Laporan Analitik
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <Building2 className="text-primary w-5 h-5 flex-shrink-0" />
                                Prioritas Support
                            </li>
                        </ul>
                        <button className="w-full py-3.5 px-6 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all">
                            Hubungi Kami
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
