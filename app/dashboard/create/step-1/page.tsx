"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardingStep1() {
    const [groomName, setGroomName] = useState("");
    const [brideName, setBrideName] = useState("");

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-primary dark:text-gray-100 min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-primary antialiased relative overflow-hidden">

            {/* Top Navigation / Progress */}
            <header className="w-full pt-12 px-8 flex flex-col items-center justify-center relative z-20">
                <div className="w-full max-w-2xl flex items-center justify-between mb-4 text-sm tracking-widest opacity-60 font-sans">
                    <span>LANGKAH 1 DARI 3</span>
                    <span className="italic">Detail Pasangan</span>
                </div>
                {/* Elegant thin progress bar */}
                <div className="w-full max-w-2xl h-[1px] bg-gray-300 dark:bg-gray-700 relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "33%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute left-0 top-0 h-full bg-primary"
                    ></motion.div>
                    {/* Decorative dots for steps */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-center w-full px-6 py-12 relative z-10">
                {/* Decorative Background Element (Subtle floral/leaf hint) */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="w-full max-w-3xl relative z-10 text-center">
                    {/* Welcome Header */}
                    <div className="mb-16 space-y-4">
                        <span className="inline-block px-3 py-1 rounded-full border border-primary/30 text-xs font-medium tracking-wider text-primary bg-primary/5 mb-4 font-sans">
                            KanvasKita
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-primary dark:text-white">
                            Siapakah yang <span className="italic text-primary-light">berbahagia?</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto leading-relaxed font-sans">
                            Mari mulai perjalanan ini dengan menuliskan nama indah kalian berdua.
                        </p>
                    </div>

                    {/* Inputs Container */}
                    <div className="space-y-12 md:space-y-16">
                        {/* Groom Input */}
                        <div className="group relative w-full max-w-xl mx-auto">
                            <label
                                className="block text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 uppercase text-left group-focus-within:text-primary transition-colors font-sans"
                                htmlFor="groom-name"
                            >
                                Mempelai Pria
                            </label>
                            <div className="relative pb-2 border-b border-gray-200 dark:border-gray-700">
                                <input
                                    id="groom-name"
                                    type="text"
                                    value={groomName}
                                    onChange={(e) => setGroomName(e.target.value)}
                                    placeholder="Nama Lengkap Pria"
                                    className="w-full bg-transparent border-none p-0 text-3xl md:text-4xl text-primary dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:ring-0 text-center font-serif italic transition-all duration-300 focus:outline-none"
                                />
                                <div className="absolute bottom-[-1px] left-0 h-[2px] bg-primary w-0 group-focus-within:w-full transition-all duration-500 ease-out"></div>
                            </div>
                        </div>

                        {/* Ampersand Divider */}
                        <div className="relative flex items-center justify-center py-2">
                            <span className="text-5xl md:text-6xl text-primary/20 font-serif italic">&</span>
                        </div>

                        {/* Bride Input */}
                        <div className="group relative w-full max-w-xl mx-auto">
                            <label
                                className="block text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 uppercase text-left group-focus-within:text-primary transition-colors font-sans"
                                htmlFor="bride-name"
                            >
                                Mempelai Wanita
                            </label>
                            <div className="relative pb-2 border-b border-gray-200 dark:border-gray-700">
                                <input
                                    id="bride-name"
                                    type="text"
                                    value={brideName}
                                    onChange={(e) => setBrideName(e.target.value)}
                                    placeholder="Nama Lengkap Wanita"
                                    className="w-full bg-transparent border-none p-0 text-3xl md:text-4xl text-primary dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:ring-0 text-center font-serif italic transition-all duration-300 focus:outline-none"
                                />
                                <div className="absolute bottom-[-1px] left-0 h-[2px] bg-primary w-0 group-focus-within:w-full transition-all duration-500 ease-out"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <footer className="w-full px-8 pb-10 pt-4 flex justify-center sticky bottom-0 z-30">
                <div className="w-full max-w-4xl flex items-center justify-between">
                    {/* Back Button (Ghost) */}
                    <Link href="/dashboard" className="group flex items-center gap-2 px-6 py-3 rounded-full text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors duration-300 font-sans">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm tracking-widest font-medium uppercase">Kembali</span>
                    </Link>

                    {/* Continue Button (Primary Solid) */}
                    <Link href="/dashboard/create/step-2" className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-white rounded-full overflow-hidden shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] font-sans">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        <span className="relative text-sm tracking-widest font-bold uppercase">Lanjutkan</span>
                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </footer>
        </div>
    );
}
