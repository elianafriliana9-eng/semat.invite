"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Heart, MapPin, Music, Calendar, Users, Send, ChevronDown, Sparkles } from "lucide-react";
import { useBuilderStore, InvitationData } from "@/store/builderStore";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";

// RONA Theme Colors
const COLORS = {
    primary: "#ddb098", // Muted Gold
    dustyRose: "#F0E0DF",
    softSage: "#D8E2DC",
    cream: "#FFFCF9",
    textDark: "#4a4440",
    textMuted: "#8a827e",
};

interface RonaTemplateProps {
    data: InvitationData;
    guestName?: string;
}

// --- Floating Elements Components ---

const FloatingClouds = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
            <motion.div
                animate={{ x: ["-10%", "10%"], y: ["0%", "5%", "0%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[10%] -left-[20%] w-[800px] h-[400px] rounded-[100%] bg-gradient-to-r from-transparent via-[#F0E0DF]/30 to-transparent blur-[80px]"
            />
            <motion.div
                animate={{ x: ["5%", "-5%"], y: ["0%", "-5%", "0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[20%] -right-[10%] w-[600px] h-[300px] rounded-[100%] bg-gradient-to-r from-transparent via-[#D8E2DC]/30 to-transparent blur-[60px]"
            />
        </div>
    );
};

const GracefulBirds = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: "-10vw", y: 100 + i * 150, opacity: 0 }}
                    animate={{
                        x: "110vw",
                        y: [100 + i * 150, 80 + i * 150, 100 + i * 150],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 25 + i * 5,
                        repeat: Infinity,
                        delay: i * 8,
                        ease: "linear"
                    }}
                    className="absolute"
                >
                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 10C5 5 15 5 20 10C25 5 35 5 40 10" stroke={COLORS.textMuted} strokeWidth="1" strokeLinecap="round" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

const FallingDetails = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`petal-${i}`}
                    initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0, rotate: 0 }}
                    animate={{
                        y: "110vh",
                        x: (Math.random() * 100 - 10) + "vw",
                        opacity: [0, 0.6, 0.6, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear"
                    }}
                    className="absolute"
                >
                    <div className="w-4 h-4 rounded-tl-full rounded-br-full" style={{ backgroundColor: i % 2 === 0 ? COLORS.dustyRose : "white", opacity: 0.5 }} />
                </motion.div>
            ))}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`dust-${i}`}
                    initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 15,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                    className="absolute w-1 h-1 rounded-full bg-yellow-200/40 blur-[1px]"
                />
            ))}
        </div>
    );
};

export default function RonaTemplate({ data, guestName }: RonaTemplateProps) {
    const { isMusicPlaying, setMusicPlaying } = useBuilderStore();
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleOpen = () => {
        setIsOpen(true);
        if (data.music?.enabled) {
            setMusicPlaying(true);
        }
    };

    useEffect(() => {
        if (data.music?.enabled && data.music?.url) {
            if (!audioRef.current) {
                audioRef.current = new Audio(data.music.url);
                audioRef.current.loop = true;
            }
            if (isMusicPlaying) {
                audioRef.current.play().catch(() => { });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMusicPlaying, data.music?.enabled, data.music?.url]);

    // Typography & Scroll Animations
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: "easeInOut" }
        }
    };

    return (
        <div className={`selection:bg-[#F0E0DF] selection:text-[#4a4440] transition-all duration-1000 ${!isOpen ? "h-screen overflow-hidden" : "min-h-screen"}`}
            style={{ backgroundColor: COLORS.cream, color: COLORS.textDark, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
                
                .font-serif { font-family: 'Cormorant Garamond', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
                
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #FFFCF9; }
                ::-webkit-scrollbar-thumb { background: #D8E2DC; border-radius: 10px; }

                .watercolor-mask {
                    mask-image: radial-gradient(circle, black 40%, transparent 80%);
                }
            `}</style>

            {/* Background Layers */}
            <FloatingClouds />
            <GracefulBirds />
            <FallingDetails />

            <AnimatePresence mode="wait">
                {!isOpen && (
                    <motion.div
                        key="rona-envelope"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-[#FFFCF9]/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="max-w-md w-full"
                        >
                            <span className="font-serif italic text-xl text-[#8a827e] tracking-[0.2em] block mb-6">KanvasKita Presents</span>
                            <div className="w-16 h-[1px] bg-[#ddb098] mx-auto mb-8" />

                            <h2 className="font-serif italic text-sm uppercase tracking-[0.4em] text-[#8a827e] mb-4">The Wedding of</h2>
                            <h1 className="font-serif text-5xl md:text-6xl text-[#4a4440] mb-12 flex flex-col gap-2">
                                <span>{data.couple.groom.name}</span>
                                <span className="italic text-4xl">&</span>
                                <span>{data.couple.bride.name}</span>
                            </h1>

                            <div className="space-y-2 mb-12">
                                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8a827e]">Special Invitation for:</p>
                                <p className="font-serif italic text-3xl text-[#4a4440]">{guestName || "Our Beloved Guest"}</p>
                            </div>

                            <button
                                onClick={handleOpen}
                                className="group relative bg-[#ddb098] text-white px-10 py-4 rounded-full font-sans font-bold tracking-[0.3em] text-[10px] uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#ddb098]/30"
                            >
                                <span className="relative z-10">Buka Undangan</span>
                                <div className="absolute inset-0 bg-[#4a4440] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            {isOpen && (
                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="min-h-screen flex flex-col items-center justify-center py-24 px-8 text-center relative">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="max-w-4xl w-full"
                        >
                            <h1 className="font-serif text-6xl md:text-8xl text-[#4a4440] mb-12 flex flex-col gap-4">
                                <span>{data.couple.groom.fullName}</span>
                                <span className="font-serif italic text-4xl">&</span>
                                <span>{data.couple.bride.fullName}</span>
                            </h1>

                            <div className="relative inline-block mt-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-12 pointer-events-none opacity-40"
                                >
                                    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#D8E2DC]">
                                        <circle cx="50" cy="50" r="45" strokeDasharray="5 15" />
                                    </svg>
                                </motion.div>
                                <div className="w-64 h-80 md:w-80 md:h-[400px] rounded-t-full overflow-hidden border-8 border-[#F0E0DF] shadow-2xl relative z-10">
                                    <img
                                        src={data.gallery[0]?.url || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"}
                                        alt="Couple"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Quote Section */}
                    <section className="py-32 px-8 text-center relative overflow-hidden bg-[#D8E2DC]/10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0E0DF]/20 rounded-full blur-[100px]" />
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="max-w-2xl mx-auto relative z-10"
                        >
                            <Sparkles className="w-8 h-8 text-[#ddb098] mx-auto mb-8 opacity-40" />
                            <p className="font-serif italic text-2xl md:text-3xl text-[#4a4440] leading-relaxed">
                                "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
                            </p>
                            <div className="mt-8 font-sans text-[10px] tracking-[0.4em] uppercase text-[#8a827e]">— Maya Angelou</div>
                        </motion.div>
                    </section>

                    {/* The Couple */}
                    <section className="py-40 px-8 relative overflow-hidden">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-center font-serif text-4xl md:text-5xl text-[#4a4440] mb-24 italic">Groom & Bride</h2>

                            <div className="grid md:grid-cols-2 gap-24 items-center">
                                {/* Groom */}
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="text-center space-y-8"
                                >
                                    <div className="relative inline-block">
                                        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-[12px] border-white shadow-xl relative z-10 watercolor-mask">
                                            <img src={data.couple.groom.photo} alt={data.couple.groom.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D8E2DC]/50 rounded-full blur-2xl z-0" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-serif text-4xl text-[#4a4440]">{data.couple.groom.fullName}</h3>
                                        <p className="text-sm font-sans text-[#8a827e] tracking-widest uppercase">The Groom</p>
                                        <div className="w-12 h-[1px] bg-[#ddb098] mx-auto" />
                                        <div className="text-sm text-[#8a827e] italic font-serif">
                                            Son of {data.couple.groom.fatherName} & {data.couple.groom.motherName}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bride */}
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="text-center space-y-8"
                                >
                                    <div className="relative inline-block">
                                        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-[12px] border-white shadow-xl relative z-10 watercolor-mask">
                                            <img src={data.couple.bride.photo} alt={data.couple.bride.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#F0E0DF]/50 rounded-full blur-2xl z-0" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-serif text-4xl text-[#4a4440]">{data.couple.bride.fullName}</h3>
                                        <p className="text-sm font-sans text-[#8a827e] tracking-widest uppercase">The Bride</p>
                                        <div className="w-12 h-[1px] bg-[#ddb098] mx-auto" />
                                        <div className="text-sm text-[#8a827e] italic font-serif">
                                            Daughter of {data.couple.bride.fatherName} & {data.couple.bride.motherName}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Event Details */}
                    <section className="py-40 px-8 bg-[#F0E0DF]/10 relative">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="text-center mb-24"
                            >
                                <h2 className="font-serif text-4xl md:text-5xl text-[#4a4440] italic mb-6">Wedding Ceremony</h2>
                                <p className="text-[#8a827e] tracking-[0.2em] font-sans text-xs uppercase">Join us in celebrating our union</p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {data.events.map((event, idx) => (
                                    <motion.div
                                        key={event.id}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={fadeUp}
                                        className="bg-white p-12 rounded-[40px] shadow-sm border border-[#D8E2DC]/30 text-center flex flex-col items-center gap-8 group hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="p-4 bg-[#D8E2DC]/30 rounded-full group-hover:scale-110 transition-transform duration-500">
                                            {idx === 0 ? <Heart className="text-[#ddb098] w-6 h-6" /> : <MapPin className="text-[#ddb098] w-6 h-6" />}
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="font-serif text-3xl text-[#4a4440] italic">{event.title}</h3>
                                            <div className="w-8 h-[1px] bg-[#ddb098] mx-auto" />
                                            <div className="space-y-2">
                                                <p className="font-sans text-sm font-bold tracking-widest text-[#4a4440]">
                                                    {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                                <p className="text-sm text-[#8a827e] tracking-wide">{event.startTime} - {event.endTime}</p>
                                            </div>
                                            <div className="pt-4">
                                                <p className="font-bold text-xs uppercase tracking-widest mb-1 text-[#4a4440]">{event.locationName}</p>
                                                <p className="text-xs text-[#8a827e] leading-relaxed">{event.address}</p>
                                            </div>
                                        </div>
                                        <button className="text-[10px] items-center gap-2 font-bold uppercase tracking-[0.3em] text-[#ddb098] border-b border-[#ddb098] pb-1 hover:text-[#4a4440] hover:border-[#4a4440] transition-colors">
                                            Check Maps
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* RSVP */}
                    <section className="py-40 px-8 relative bg-white">
                        <div className="absolute inset-0 z-0 opacity-10">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path fill={COLORS.dustyRose} d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z" />
                            </svg>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="max-w-xl mx-auto bg-[#F0E0DF]/20 backdrop-blur-xl border border-white p-12 rounded-[50px] shadow-2xl relative z-10"
                        >
                            <h2 className="font-serif text-4xl text-center text-[#4a4440] italic mb-12">Will You Join Us?</h2>

                            <form className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8a827e] ml-4">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white/50 border-none px-6 py-4 rounded-full font-sans text-sm focus:ring-2 focus:ring-[#D8E2DC] transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8a827e] ml-4">Number of Guests</label>
                                    <select className="w-full bg-white/50 border-none px-6 py-4 rounded-full font-sans text-sm focus:ring-2 focus:ring-[#D8E2DC] transition-all outline-none">
                                        <option>1 Person</option>
                                        <option>2 Persons</option>
                                    </select>
                                </div>
                                <button className="w-full bg-[#4a4440] text-white py-5 rounded-full font-sans font-bold tracking-[0.4em] text-[10px] uppercase hover:bg-black transition-all shadow-lg active:scale-95">
                                    Send RSVP
                                </button>
                            </form>
                        </motion.div>
                    </section>

                    {/* Footer */}
                    <footer className="py-24 px-8 text-center relative border-t border-[#D8E2DC]/30">
                        <div className="max-w-md mx-auto space-y-8">
                            <Heart className="w-6 h-6 text-[#F0E0DF] mx-auto animate-pulse" />
                            <h3 className="font-serif italic text-3xl text-[#4a4440]">Thank You</h3>
                            <p className="text-[#8a827e] text-[10px] uppercase tracking-[0.4em]">Designed by KanvasKita</p>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
}
