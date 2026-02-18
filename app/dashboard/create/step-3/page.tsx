"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Info, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardingStep3() {
    const [selectedTheme, setSelectedTheme] = useState<string | null>("minimal");

    const themes = [
        {
            id: "modern-luxury",
            name: "Modern Luxury",
            description: "Klasik, mewah, dan abadi.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqkMW8Hy_JZ7ThmGf_gr2Jakw1-NPcXqXNe6Etjlo15ecZO_MEzXhav-WbLk8PSXwfMhUsHM2_bmWihaw86gouTtnjgSySpOZ_7MoEOaKd9WnARKTN8urvdIK-qOaTsjynTJvbBxT_BINJs5XaJ6YIDELxl9dj856_Ui5Igr4N_HxOCeoHCZdSehl82xw4aX7nsBByJftnOLcbvn_Z-oxoyHAFfTdlN-Mwv3tlpVgekZW-aqRzwQeSqYMnGchIWcCYLDBYXg9okMuE",
            badge: "Most Popular"
        },
        {
            id: "nusa-organic",
            name: "Nusa Organic",
            description: "Hangat, organik, dan penuh warna alam.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTk7qizA7D9mGvbfYK_RpXz4lwtcA71Lrc0W780INbS-yOUvC8i6vLyJzI5R5ez75YUWmIw6VauGjbjpnZGcqgmBkpWu5Y0I8QpVUAtTnfWbCKdknDO7VwC74dooRhAvmSU4AQuY9eUpKVG1e3jltDtP5UIDFmwaG5bcoSzgRaHOGD2yfaQC8_GUGCoFiXlqNDB5rtHOdIsafseO0miaASCFdKIdgrFyBZnTYjK8gnbzaTfdu-M4TIDlvlf7yIYzVFOzQE6RelTCI",
            badge: "New"
        },
        {
            id: "minimal",
            name: "Minimal",
            description: "Sederhana, bersih, dan modern.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAliaUTZWbTkzK-K2B0owNUbnYrb39pEfVQ6T8xukxB2HaARBNAacB3ZhatIp0KHsILFsazZihJPWzh0-tC5xQdcjqa0-WlwbSENXiXjbe0CCI9xwzYZRUNa8RjXQASa_SEcP7iWOGUMPmsWOvYSGVRpopjRDFiAxBWlqtpSZcaAj9HYxto3Zsh3qA1aueme8cmbjeUP3RimHshnvX-2vMP79pNU7ase1O5jpBUD9RsoHEZC1wKuN430pBMB8Xy9bw_Z8MugOodyC3G",
            badge: "Terpilih"
        },
        {
            id: "traditional",
            name: "Traditional",
            description: "Kaya budaya, hangat, dan autentik.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6B_nP-09zWD3_BOw56RZVD--NGY0Z9AC6Q254_2rfzUTuLFfLxHKYbikOM0hMq-2aK-SmaAynRQptwkBr4tM0Dp1FpM4tSWxPdcoKeQ0REAO65LJymnIgN7PSfM-KmCWJYnPxu-JIeZ6PDd4yag1fyeIr0rbcfzCTnzmqyiwSYTZNaag8iMhSywiNHlQKjVU0QiVl_VJgKSsXZWIRcidMcfcXuswkM6Cvx_C_UveN-d920GVd-h57K0J-5g6DHCCL-OQNPfeIYP6O",
            badge: null
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-primary dark:text-gray-100 min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-primary antialiased relative overflow-hidden">

            {/* Top Navigation / Progress */}
            <header className="w-full pt-12 px-8 flex flex-col items-center justify-center relative z-20">
                <div className="w-full max-w-2xl flex items-center justify-between mb-4 text-sm tracking-widest opacity-60 font-sans">
                    <div className="flex gap-8">
                        <span className="opacity-50">profil</span>
                        <span className="opacity-50">TANGGAL</span>
                        <span className="font-bold text-primary dark:text-white">TEMA</span>
                    </div>
                </div>
                {/* Elegant thin progress bar */}
                <div className="w-full max-w-2xl h-[1px] bg-gray-300 dark:bg-gray-700 relative">
                    <motion.div
                        initial={{ width: "66%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute left-0 top-0 h-full bg-primary"
                    ></motion.div>
                    {/* Decorative dots for steps */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-2 h-2 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-2 h-2 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                </div>
            </header>


            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center px-6 py-12 relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="font-serif text-3xl lg:text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
                        Pilih Tema Undangan Anda
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed font-sans">
                        Sentuhan akhir untuk momen spesial Anda. Pilih gaya yang paling merepresentasikan cerita cinta kalian.
                    </p>
                </div>

                {/* Theme Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedTheme(theme.id)}
                        >
                            {/* Selection Ring/Indicator */}
                            <div className={`absolute -inset-1 rounded-2xl transition duration-500 blur-sm 
                        ${selectedTheme === theme.id ? 'bg-primary opacity-50' : 'bg-gradient-to-tr from-primary to-transparent opacity-0 group-hover:opacity-100'}
                     `}></div>

                            <div className={`relative h-[500px] w-full bg-white dark:bg-[#1a2c2a] rounded-xl overflow-hidden transition-all duration-300 border 
                        ${selectedTheme === theme.id ? 'border-primary shadow-[0_0_15px_-3px_rgba(48,232,208,0.3)] transform -translate-y-2' : 'border-gray-100 dark:border-gray-800 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2'}
                    `}>
                                <img
                                    src={theme.image}
                                    alt={theme.name}
                                    className={`h-full w-full object-cover object-center transition-transform duration-700 
                                ${selectedTheme === theme.id ? '' : 'group-hover:scale-105'}
                            `}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center">
                                    {theme.badge && (
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-2 border 
                                    ${selectedTheme === theme.id && theme.id === 'minimal' ? 'bg-primary text-white border-primary' : 'bg-white/20 backdrop-blur-sm text-white border-white/30'}
                                `}>
                                            {theme.badge}
                                        </span>
                                    )}

                                    <h3 className="text-2xl font-normal text-white mb-1 font-serif">{theme.name}</h3>
                                    <p className={`text-gray-200 text-sm font-light transition-opacity duration-300 transform font-sans
                                ${selectedTheme === theme.id ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'}
                            `}>
                                        {theme.description}
                                    </p>

                                    {/* Checkmark Circle */}
                                    <div className={`mt-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                ${selectedTheme === theme.id ? 'bg-primary border-primary shadow-lg transform scale-110' : 'border-2 border-white/50 group-hover:border-primary group-hover:bg-primary'}
                            `}>
                                        <Check className={`w-4 h-4 text-white ${selectedTheme === theme.id ? '' : 'opacity-0 group-hover:opacity-100'}`} />
                                    </div>
                                </div>
                            </div>
                            {/* Selection Label Badge for Active Item */}
                            {selectedTheme === theme.id && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-20 font-sans tracking-wide">
                                    TERPILIH
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400 font-sans">
                    <Info className="w-4 h-4" />
                    <span>Anda dapat mengubah tema ini nanti di pengaturan.</span>
                </div>

            </main>

            {/* Bottom Navigation */}
            <footer className="w-full px-8 pb-10 pt-4 flex justify-center sticky bottom-0 z-30">
                <div className="w-full max-w-4xl flex items-center justify-between">
                    {/* Back Button (Ghost) */}
                    <Link href="/dashboard/create/step-2" className="group flex items-center gap-2 px-6 py-3 rounded-full text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors duration-300 font-sans">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm tracking-widest font-medium uppercase">Kembali</span>
                    </Link>

                    {/* Continue Button (Primary Solid) */}
                    <Link href="/dashboard/builder" className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-white rounded-full overflow-hidden shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] font-sans">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        <span className="relative text-sm tracking-widest font-bold uppercase">Selesai & Lanjutkan</span>
                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </footer>
        </div>
    );
}
