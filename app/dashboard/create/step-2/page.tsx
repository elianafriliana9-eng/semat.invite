"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardingStep2() {
    const [selectedDate, setSelectedDate] = useState<number | null>(14);
    const [currentMonth, setCurrentMonth] = useState("Oktober 2024");

    // Mock days generation for October 2024 (Stariting on Sunday)
    // 30, 1, 2...
    const days = [
        { day: 29, current: false }, { day: 30, current: false },
        { day: 1, current: true }, { day: 2, current: true }, { day: 3, current: true }, { day: 4, current: true }, { day: 5, current: true },
        { day: 6, current: true }, { day: 7, current: true }, { day: 8, current: true }, { day: 9, current: true }, { day: 10, current: true }, { day: 11, current: true }, { day: 12, current: true },
        { day: 13, current: true }, { day: 14, current: true }, { day: 15, current: true }, { day: 16, current: true }, { day: 17, current: true }, { day: 18, current: true }, { day: 19, current: true },
        { day: 20, current: true }, { day: 21, current: true }, { day: 22, current: true }, { day: 23, current: true }, { day: 24, current: true }, { day: 25, current: true }, { day: 26, current: true },
        { day: 27, current: true }, { day: 28, current: true }, { day: 29, current: true }, { day: 30, current: true }, { day: 31, current: true }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-primary dark:text-gray-100 min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-primary antialiased relative overflow-hidden">

            {/* Top Navigation / Progress */}
            <header className="w-full pt-12 px-8 flex flex-col items-center justify-center relative z-20">
                <div className="w-full max-w-2xl flex items-center justify-between mb-4 text-sm tracking-widest opacity-60 font-sans">
                    <div className="flex gap-8">
                        <span className="opacity-50">profil</span>
                        <span className="font-bold text-primary dark:text-white">TANGGAL</span>
                        <span className="opacity-50">TEMA</span>
                    </div>
                </div>
                {/* Elegant thin progress bar */}
                <div className="w-full max-w-2xl h-[1px] bg-gray-300 dark:bg-gray-700 relative">
                    <motion.div
                        initial={{ width: "33%" }}
                        animate={{ width: "66%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute left-0 top-0 h-full bg-primary"
                    ></motion.div>
                    {/* Decorative dots for steps */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-2 h-2 rounded-full bg-primary ring-4 ring-background-light dark:ring-background-dark"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
            </header>


            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-center w-full px-6 py-12 relative z-10">
                {/* Headline */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-light text-center mb-4 text-gray-800 dark:text-white leading-tight">
                        Kapan acara spesial<br />ini berlangsung?
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light text-center max-w-md mx-auto font-sans">
                        Pilih tanggal pernikahan Anda untuk kami siapkan hitungan mundur yang elegan.
                    </p>
                </div>

                {/* Calendar Component Card */}
                <div className="bg-white/80 dark:bg-black/30 w-full max-w-md rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] p-8 border border-white/50 dark:border-white/10 backdrop-blur-sm relative z-20">
                    {/* Manual Input Fallback (Minimalist Line) */}
                    <div className="mb-8 relative group">
                        <label className="absolute -top-3 left-0 text-xs font-medium text-primary uppercase tracking-wider bg-white/80 dark:bg-black/30 px-1 font-sans" htmlFor="date-input">Tanggal Terpilih</label>
                        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-2 group-focus-within:border-primary transition-colors">
                            <Calendar className="text-gray-400 w-5 h-5 mr-3" />
                            <input className="w-full bg-transparent border-none p-0 text-lg font-medium text-gray-800 dark:text-white focus:ring-0 cursor-default font-serif" id="date-input" placeholder="Pilih tanggal dibawah" readOnly type="text" value={`Sabtu, ${selectedDate} Oktober 2024`} />
                            <Edit2 className="text-primary w-5 h-5" />
                        </div>
                    </div>

                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="text-center">
                            <span className="block text-xl font-medium text-gray-800 dark:text-white font-serif">{currentMonth}</span>
                        </div>
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-2 mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider font-sans">{day}</div>
                        ))}
                    </div>

                    {/* Dates Grid */}
                    <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-sm font-sans" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                        {days.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => item.current && setSelectedDate(item.day)}
                                disabled={!item.current}
                                className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300
                            ${!item.current ? 'text-gray-300 dark:text-gray-700 cursor-default' : ''}
                            ${item.current && selectedDate === item.day ? 'bg-primary text-white shadow-lg shadow-primary/40 transform scale-110 font-bold' : ''}
                            ${item.current && selectedDate !== item.day ? 'text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:scale-105' : ''}
                        `}
                            >
                                {item.day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">

                    {/* Soft gradient blob top right */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                    {/* Soft gradient blob bottom left */}
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                </div>

            </main>

            {/* Bottom Navigation */}
            <footer className="w-full px-8 pb-10 pt-4 flex justify-center sticky bottom-0 z-30">
                <div className="w-full max-w-4xl flex items-center justify-between">
                    {/* Back Button (Ghost) */}
                    <Link href="/dashboard/create/step-1" className="group flex items-center gap-2 px-6 py-3 rounded-full text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors duration-300 font-sans">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm tracking-widest font-medium uppercase">Kembali</span>
                    </Link>

                    {/* Continue Button (Primary Solid) */}
                    <Link href="/dashboard/create/step-3" className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-white rounded-full overflow-hidden shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] font-sans">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        <span className="relative text-sm tracking-widest font-bold uppercase">Lanjutkan</span>
                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </footer>
        </div>
    );
}
