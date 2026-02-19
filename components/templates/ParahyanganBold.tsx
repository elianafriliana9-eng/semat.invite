"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    Calendar,
    MapPin,
    Clock,
    Music,
    Volume2,
    VolumeX,
    Heart,
    ChevronDown,
    Gift,
    Send,
    Instagram
} from "lucide-react";
import { useBuilderStore } from "@/store/builderStore";
import { useSearchParams } from "next/navigation";

// --- Constants & Aesthetic Tokens ---

const COLORS = {
    ivory: "#FDF5E6",
    softCream: "#FFF9F0",
    champagneGold: "#E7D192",
    mutedGold: "#A68D4C",
    charcoal: "#424242",
    softSage: "#D1D5C0" // Used ONLY for tiny icons, not backgrounds
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
    }
};

// --- Sub-components ---

const SectionContainer = ({ children, className = "", variant = "ivory" }: { children: React.ReactNode, className?: string, variant?: "ivory" | "cream" }) => {
    return (
        <section className={`relative min-h-screen flex flex-col items-center justify-center p-6 py-24 overflow-hidden ${className}`}>
            {/* Background Layer */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 ${variant === "ivory" ? 'bg-[#FDF5E6]' : 'bg-[#FFF9F0]'}`}>
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
                        style={{
                            backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
                            backgroundRepeat: 'repeat'
                        }}
                    />
                </div>

                {/* Cultural Motifs as ultra-soft watermarks */}
                <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] -mr-32 -mt-32">
                    <svg viewBox="0 0 100 100" fill="#A68D4C" className="w-full h-full">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                    </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.02] -ml-20 -mb-20 rotate-45">
                    <svg viewBox="0 0 100 100" fill="#A68D4C" className="w-full h-full">
                        <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                    </svg>
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-20 w-full max-w-md mx-auto">
                {children}
            </div>
        </section>
    );
};

const ContentCard = ({ children, className = "", delay = 0, noBorder = false }: { children: React.ReactNode, className?: string, delay?: number, noBorder?: boolean }) => {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay }}
            className={`
                relative bg-white/95 backdrop-blur-sm shadow-[0_10px_40px_rgba(166,141,76,0.08)] 
                ${!noBorder ? 'border-[1px] border-[#E7D192]/40 rounded-sm' : ''} p-10 md:p-12
                ${className}
            `}
        >
            {!noBorder && (
                <>
                    {/* Refined Gold Accents */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#E7D192]/60" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#E7D192]/60" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#E7D192]/60" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#E7D192]/60" />
                </>
            )}
            {children}
        </motion.div>
    );
};

const SigerCrown = ({ className = "", color = "#A68D4C" }: { className?: string, color?: string }) => (
    <div className={`flex flex-col items-center justify-center mb-8 ${className}`}>
        <div className="w-24 h-16 relative">
            <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ color }}>
                <path d="M60 10C45 10 35 20 20 35C15 40 25 40 25 40L30 30C30 30 40 20 60 20C80 20 90 30 90 30L95 40C95 40 105 40 100 35C85 20 75 10 60 10Z" fill="currentColor" opacity="0.8" />
                <path d="M60 5C63 5 65 7 65 10C65 13 63 15 60 15C57 15 55 13 55 10C55 7 57 5 60 5Z" fill="currentColor" />
                <circle cx="60" cy="35" r="8" stroke="currentColor" strokeWidth="1" />
                <path d="M25 50L15 65M95 50L105 65" stroke="currentColor" strokeWidth="1" />
                <path d="M60 50V75" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>
        <div className="h-[0.5px] w-12 mt-1 opacity-20" style={{ backgroundColor: color }} />
    </div>
);

// --- Main Template ---

interface ParahyanganBoldProps {
    data: any;
    guestName?: string;
}

export default function ParahyanganBold({ data, guestName }: ParahyanganBoldProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { isMusicPlaying, setMusicPlaying } = useBuilderStore();
    const searchParams = useSearchParams();
    const to = guestName || searchParams.get('to') || "Tamu Undangan";

    useEffect(() => {
        if (isOpen && !isMusicPlaying) {
            setMusicPlaying(true);
        }
    }, [isOpen]);

    return (
        <div className="min-h-screen bg-[#FDF5E6] font-sans text-[#424242] selection:bg-[#E7D192] selection:text-white">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');
                
                h1, h2, h3, .font-serif {
                    font-family: 'Cormorant Garamond', serif;
                    letter-spacing: 0.02em;
                }
                
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
            `}</style>

            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        key="envelope"
                        exit={{ opacity: 0, scale: 1.05, transition: { duration: 1.5, ease: "easeInOut" } }}
                        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
                    >
                        {/* Soft Envelope Background */}
                        <div className="absolute inset-0 bg-[#FDF5E6]">
                            <div className="absolute inset-0 opacity-[0.05]"
                                style={{
                                    backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                                    backgroundRepeat: 'repeat'
                                }}
                            />
                            {/* Texture accent */}
                            <div className="absolute inset-0 bg-[#E7D192] opacity-[0.03]" />
                        </div>

                        {/* Envelope Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10 w-full max-w-sm px-6 text-center"
                        >
                            <ContentCard className="!p-16 !shadow-xl !bg-white/98">
                                <SigerCrown />
                                <p className="text-[10px] uppercase tracking-[0.4em] text-[#A68D4C] mb-8 font-medium">Bujangga Manik</p>
                                <h1 className="text-4xl font-light mb-6 tracking-tight leading-tight text-[#424242]">
                                    {data.couple.groom.name} & {data.couple.bride.name}
                                </h1>
                                <div className="h-[0.5px] w-12 bg-[#E7D192] mx-auto mb-10 opacity-30" />

                                <div className="space-y-3 mb-12">
                                    <p className="text-[9px] text-[#A68D4C] uppercase tracking-[0.2em]">Kahatur Kasadayana</p>
                                    <h4 className="text-xl font-medium tracking-tight text-[#424242]">{to}</h4>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setIsOpen(true)}
                                    className="px-10 py-4 bg-[#A68D4C] text-white rounded-sm text-[9px] font-bold uppercase tracking-[0.4em] shadow-md hover:shadow-lg transition-all"
                                >
                                    Buka Undangan
                                </motion.button>
                            </ContentCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Main Content --- */}
            {isOpen && (
                <main className="relative">
                    {/* Hero Section */}
                    <SectionContainer variant="ivory" className="!min-h-[110vh]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-center"
                        >
                            <SigerCrown />
                            <p className="text-[10px] uppercase tracking-[0.6em] text-[#A68D4C] mb-10 font-medium">Pun Sapantesna</p>
                            <h1 className="text-5xl md:text-6xl font-light mb-10 leading-[1.2] text-[#424242]">
                                {data.couple.groom.name}<br />
                                <span className="text-2xl font-serif text-[#E7D192] italic block my-6">- & -</span>
                                {data.couple.bride.name}
                            </h1>
                            <p className="text-lg font-serif italic text-[#A68D4C] tracking-wide">
                                {new Date(data.events[0]?.date || Date.now()).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#A68D4C]"
                        >
                            <ChevronDown className="w-5 h-5 opacity-20" />
                        </motion.div>
                    </SectionContainer>

                    {/* Verse Section */}
                    <SectionContainer variant="cream" className="!min-h-0 !py-32">
                        <ContentCard className="text-center italic !bg-white/98 !border-none !shadow-lg max-w-sm">
                            <Heart className="w-4 h-4 mx-auto mb-8 text-[#E7D192] opacity-40" />
                            <p className="text-base leading-relaxed text-[#555] font-light">
                                "Silih asah, silih asuh, silih asih. Di antara tanda kekuasaan-Nya diciptakan-Nya bagimu pasangan untuk membina sakinah, mawaddah, wa rahmah..."
                            </p>
                            <div className="mt-8 flex items-center justify-center gap-4 opacity-50">
                                <div className="h-[0.5px] w-6 bg-[#A68D4C]" />
                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A68D4C]">
                                    Ar-Rum: 21
                                </p>
                                <div className="h-[0.5px] w-6 bg-[#A68D4C]" />
                            </div>
                        </ContentCard>
                    </SectionContainer>

                    {/* The Couple Section */}
                    <SectionContainer variant="ivory" className="!py-40">
                        <div className="space-y-48">
                            {/* Groom */}
                            <motion.div
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative mb-12">
                                    <div className="absolute -inset-2 border border-[#E7D192]/20" />
                                    <div className="w-[240px] md:w-[280px] aspect-[4/5] bg-[#fff] overflow-hidden shadow-xl relative z-10">
                                        <img src={data.couple.groom.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?private=1"} alt="Groom" className="w-full h-full object-cover grayscale-[30%]" />
                                    </div>
                                </div>
                                <div className="text-center space-y-3">
                                    <h2 className="text-3xl font-medium text-[#424242]">{data.couple.groom.fullName}</h2>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#A68D4C]">Putra ti</p>
                                    <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                                        Bapa {data.couple.groom.fatherName}<br />
                                        & Ibu {data.couple.groom.motherName}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bride */}
                            <motion.div
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative mb-12">
                                    <div className="absolute -inset-2 border border-[#E7D192]/20" />
                                    <div className="w-[240px] md:w-[280px] aspect-[4/5] bg-[#fff] overflow-hidden shadow-xl relative z-10">
                                        <img src={data.couple.bride.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?private=1"} alt="Bride" className="w-full h-full object-cover grayscale-[30%]" />
                                    </div>
                                </div>
                                <div className="text-center space-y-3">
                                    <h2 className="text-3xl font-medium text-[#424242]">{data.couple.bride.fullName}</h2>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#A68D4C]">Putri ti</p>
                                    <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
                                        Bapa {data.couple.bride.fatherName}<br />
                                        & Ibu {data.couple.bride.motherName}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </SectionContainer>

                    {/* Events Section */}
                    <SectionContainer variant="cream" className="!py-40">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl font-light text-[#424242] mb-4 italic">Runtuyan Acara</h2>
                            <div className="h-[0.5px] w-8 bg-[#A68D4C] mx-auto opacity-30" />
                        </div>

                        <div className="space-y-12 w-full max-w-sm">
                            {data.events.map((event: any, idx: number) => (
                                <ContentCard key={event.id} delay={idx * 0.2} className="!p-12 !bg-white/99">
                                    <h3 className="text-2xl font-medium text-[#424242] mb-8 italic">{event.title}</h3>

                                    <div className="space-y-6 text-center">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-[#555]">
                                                {new Date(event.date).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-[10px] text-[#A68D4C] uppercase tracking-[0.1em]">{event.startTime} - {event.endTime === '23:59' ? 'Selesai' : event.endTime} WIB</p>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100 space-y-2">
                                            <p className="text-xs font-bold text-[#424242] uppercase tracking-[0.2em]">{event.locationName}</p>
                                            <p className="text-[11px] text-gray-400 italic font-light">{event.address}</p>
                                        </div>

                                        <button className="mt-6 px-8 py-3 border border-[#E7D192] text-[#A68D4C] text-[8px] font-bold uppercase tracking-[0.3em] hover:bg-[#FDF5E6] transition-all">
                                            Petunjuk Lokasi
                                        </button>
                                    </div>
                                </ContentCard>
                            ))}
                        </div>
                    </SectionContainer>

                    {/* Gallery Section */}
                    <SectionContainer variant="ivory" className="!py-40">
                        <div className="text-center mb-24">
                            <h2 className="text-4xl font-light text-[#424242] mb-4 italic">Sawala Galeri</h2>
                            <div className="h-[0.5px] w-8 bg-[#A68D4C] mx-auto opacity-30" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {data.gallery.map((img: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative overflow-hidden aspect-[4/5] bg-white p-1 shadow-sm"
                                >
                                    <img src={img.url} alt={`Gallery ${idx}`} className="w-full h-full object-cover grayscale-[20%]" />
                                </motion.div>
                            ))}
                        </div>
                    </SectionContainer>

                    {/* RSVP & Gift Section */}
                    <SectionContainer variant="cream" className="!py-40">
                        <div className="w-full space-y-12">
                            <ContentCard className="!p-12">
                                <h2 className="text-3xl font-medium text-[#424242] mb-8 italic text-center">Konfirmasi Kehadiran</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#A68D4C]">Nami Lengkap</label>
                                        <input className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#E7D192] transition-all text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#A68D4C]">Katerangan</label>
                                        <select className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#E7D192] transition-all text-xs">
                                            <option>Hadir</option>
                                            <option>Teu Tiasa Hadir</option>
                                        </select>
                                    </div>
                                    <button className="w-full bg-[#424242] text-white py-4 text-[9px] font-bold uppercase tracking-[0.4em] mt-8">
                                        Kirim Konfirmasi
                                    </button>
                                </div>
                            </ContentCard>

                            <div className="text-center pt-16 space-y-8">
                                <Gift className="w-5 h-5 mx-auto text-[#A68D4C] opacity-30" />
                                <h2 className="text-3xl font-medium text-[#424242] italic">Tanda Kasih</h2>
                                <p className="text-xs text-gray-400 italic leading-relaxed px-6 font-light">
                                    Hapunten upami hoyong masihan tanda kasih, tiasa dikintunkeun ngalangkungan:
                                </p>
                                <div className="space-y-3 px-6">
                                    {data.giftAccounts.map((account: any) => (
                                        <div key={account.id} className="bg-white/50 p-6 border border-gray-100">
                                            <p className="text-[8px] uppercase tracking-[0.4em] text-[#A68D4C] mb-2 font-bold">{account.bankName}</p>
                                            <p className="text-lg font-medium text-[#424242] tracking-wider mb-1">{account.accountNumber}</p>
                                            <p className="text-[9px] text-gray-400 uppercase font-medium">A.N {account.accountHolder}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SectionContainer>

                    {/* Footer */}
                    <footer className="bg-[#FDF5E6] py-32 px-6 text-center overflow-hidden">
                        <div className="space-y-8">
                            <SigerCrown />
                            <h2 className="text-4xl font-light text-[#424242] italic">
                                {data.couple.groom.name} & {data.couple.bride.name}
                            </h2>
                            <p className="text-[9px] uppercase tracking-[0.5em] text-[#A68D4C] font-semibold">Hatur Nuhun</p>
                            <div className="pt-24 opacity-20 text-[8px] tracking-[0.3em] uppercase font-bold text-[#424242]">
                                Created by KanvasKita
                            </div>
                        </div>
                    </footer>

                    {/* Music Control */}
                    <button
                        onClick={() => setMusicPlaying(!isMusicPlaying)}
                        className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-white/90 text-[#A68D4C] rounded-full flex items-center justify-center shadow-lg border border-[#E7D192]/20"
                    >
                        {isMusicPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                </main>
            )}
        </div>
    );
}
