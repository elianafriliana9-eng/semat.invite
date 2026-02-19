"use client";

import React, { useRef, useEffect, useState } from "react";
import { useBuilderStore, InvitationData } from "@/store/builderStore";
import { motion, AnimatePresence } from "framer-motion";
import {
    Music,
    MapPin,
    Heart,
    Share2,
    Globe,
    Instagram,
    Camera,
    Calendar,
    Clock,
    Shirt,
    Menu,
    ChevronDown
} from "lucide-react";

interface AksaraTemplateProps {
    data: InvitationData;
    guestName?: string;
}

const COLORS = {
    primary: "#fada38",
    backgroundLight: "#f8f8f5",
    backgroundDark: "#181711",
    cardGlass: "rgba(35, 32, 15, 0.4)",
};

export default function AksaraTemplate({ data, guestName }: AksaraTemplateProps) {
    const { isMusicPlaying, setMusicPlaying } = useBuilderStore();
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Dynamic Data Mapping
    const groomName = data?.couple?.groom?.name || "Aditya";
    const groomFullName = data?.couple?.groom?.fullName || "Aditya Prasetya";
    const groomFather = data?.couple?.groom?.fatherName || "Hardjo Mulyono";
    const groomMother = data?.couple?.groom?.motherName || "Siti Aminah";

    const brideName = data?.couple?.bride?.name || "Kirana";
    const brideFullName = data?.couple?.bride?.fullName || "Kirana Putri";
    const brideFather = data?.couple?.bride?.fatherName || "Bambang Wijaya";
    const brideMother = data?.couple?.bride?.motherName || "Dewi Sartika";

    const mainEvent = data?.events?.[0];
    const eventDateFormatted = mainEvent?.date ? new Date(mainEvent.date).toLocaleDateString("en-US", {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : "Saturday, 24 August 2024";

    const eventLocation = mainEvent?.locationName || "Bali";

    const heroImage = data?.gallery?.[0]?.url || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop";
    const groomImage = data?.couple?.groom?.photo || "https://lh3.googleusercontent.com/aida-public/AB6AXuDQRNmU_aIOh8IMhRa48dV8TNAprhI95eTmNqYD8V2JX8lqKM2T8Mmk_YLcqLMbEuCAS4zxWTWGdvfPaA6EU7PVe4I5ZgHs4rWbYFIOlT31Q8iM2WXv96amlyrMfS4NAgEZFKmg688pa0_YYwP7r5KhlOexxHZ81uB3AfHLOUJ2oqC9ep8OiYDkCw8D1DND_J4orvoUKKspMn0Dyo3lUYRNk28135lvUVtSrw-UCLjt5VzHOVOeQs3c_7DJvqjZpSSEhWoWyNXEW9c";
    const brideImage = data?.couple?.bride?.photo || "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJblwnLIlmdVUNiHZOFkToI4Ba5MewZ8K7UxmJMtWjU_hcP8yxbD1J0g6CImCWO8PCL9VV5x8OgNiIrErmREuaHbBXwhgo8Us_HTv99Kcr82z-eECGuiHL-LSub9lxdrde-81FRWUBBpKQv3RgCU9PlTrHtDys4Bxj62SN18PWIKaijvRbVq1jP7dJiv1dI61qdudfjAkwYuO3XkmmZtA4Bo4SYnh6dnBCvCSFTOp1uizB_pOO6swc0Dok4_y9rrOTmmT1SZzFz0";

    const handleOpen = () => {
        setIsOpen(true);
        if (data.music?.enabled) {
            setMusicPlaying(true);
        }
    };

    // Music Logic
    useEffect(() => {
        if (data.music?.enabled && data.music?.url) {
            if (!audioRef.current) {
                audioRef.current = new Audio(data.music.url);
                audioRef.current.loop = true;
            } else if (audioRef.current.src !== data.music.url) {
                audioRef.current.pause();
                audioRef.current.src = data.music.url;
            }

            if (isMusicPlaying) {
                audioRef.current.play().catch(() => { });
            } else {
                audioRef.current.pause();
            }
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [data.music?.url, data.music?.enabled, isMusicPlaying]);

    useEffect(() => {
        return () => {
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    return (
        <div className={`bg-background-dark text-white font-display selection:bg-primary selection:text-background-dark min-h-screen ${!isOpen ? "h-screen overflow-hidden" : "overflow-x-hidden"}`}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
                
                .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
                .font-serif { font-family: 'Cormorant Garamond', serif; }
                
                .glass-card {
                    background: rgba(35, 32, 15, 0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(250, 218, 56, 0.1);
                }
                
                @keyframes kenburns {
                    0% { transform: scale(1.1); }
                    100% { transform: scale(1.2); }
                }
                .animate-kenburns {
                    animation: kenburns 20s ease-in-out infinite alternate;
                }

                .scroll-indicator::after {
                    content: '';
                    width: 1px;
                    height: 60px;
                    background: linear-gradient(to bottom, #fada38, transparent);
                    display: block;
                    margin: 10px auto;
                }
            `}</style>

            {/* ═══════════ SPLASH SCREEN (ENVELOPE) ═══════════ */}
            <AnimatePresence mode="wait">
                {!isOpen && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-dark overflow-hidden"
                    >
                        {/* Background for Splash */}
                        <div className="absolute inset-0 z-0">
                            <div
                                className="w-full h-full bg-cover bg-center brightness-[0.2]"
                                style={{ backgroundImage: `url('${heroImage}')` }}
                            />
                            <div className="absolute inset-0 bg-background-dark/40"></div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative z-10 text-center px-6 max-w-2xl space-y-12"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Heart className="w-8 h-8 text-primary mx-auto" style={{ color: COLORS.primary }} />
                                </motion.div>
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-primary/60 font-medium block" style={{ color: `${COLORS.primary}99` }}>The Wedding Of</span>
                                <h1 className="font-serif text-5xl md:text-8xl text-white italic leading-tight">
                                    {groomName} & {brideName}
                                </h1>
                            </div>

                            {guestName && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                    className="space-y-3 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Dear Honorable Guest:</p>
                                    <h3 className="text-2xl font-serif text-primary" style={{ color: COLORS.primary }}>{guestName}</h3>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleOpen}
                                className="group relative px-12 py-4 bg-primary text-background-dark rounded-full overflow-hidden transition-all shadow-[0_10px_30px_rgba(250,218,56,0.3)] font-display"
                                style={{ backgroundColor: COLORS.primary }}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 text-[10px] uppercase tracking-[0.5em] font-black flex items-center gap-3">
                                    Open Invitation
                                </span>
                            </motion.button>
                        </motion.div>

                        <div className="absolute bottom-8 text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold font-display">
                            Cinematic Experience
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════ MAIN CONTENT ═══════════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        {/* Navigation Overlay */}
                        <motion.nav
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-transparent backdrop-blur-sm lg:backdrop-blur-none transition-all"
                        >
                            <div className="flex items-center gap-2">
                                <Heart className="text-primary w-6 h-6" style={{ color: COLORS.primary }} />
                                <h1 className="text-xl font-bold tracking-widest uppercase">Aksara</h1>
                            </div>
                            <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-widest uppercase font-display">
                                <a className="hover:text-primary transition-colors" href="#story">Our Story</a>
                                <a className="hover:text-primary transition-colors" href="#events">The Event</a>
                                <a className="hover:text-primary transition-colors" href="#gallery">Gallery</a>
                                <button className="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform" style={{ backgroundColor: COLORS.primary }}>
                                    RSVP NOW
                                </button>
                            </div>
                            <div className="md:hidden">
                                <Menu className="w-6 h-6" />
                            </div>
                        </motion.nav>

                        <main className="relative z-10 w-full flex flex-col items-center">
                            {/* Hero Section */}
                            <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-4 overflow-hidden" id="hero">
                                {/* Hero Background with Ken Burns */}
                                <div className="absolute inset-0 z-0">
                                    <motion.div
                                        initial={{ scale: 1.2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="w-full h-full bg-cover bg-center animate-kenburns"
                                        style={{
                                            backgroundImage: `url('${heroImage}')`,
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark/40 via-transparent to-background-dark"></div>
                                    <div className="absolute inset-0 bg-background-dark/20"></div>
                                </div>

                                <div className="relative z-10">
                                    <h2 className="font-serif text-5xl md:text-8xl italic mb-4 opacity-90 leading-tight">
                                        {groomName} & {brideName}
                                    </h2>
                                    <p className="text-primary tracking-[0.3em] uppercase text-sm md:text-base font-light mb-12" style={{ color: COLORS.primary }}>
                                        The Beginning of Forever
                                    </p>
                                    <div className="scroll-indicator animate-bounce mt-20">
                                        <p className="text-[10px] tracking-widest uppercase opacity-50">Scroll to unfold</p>
                                    </div>
                                </div>
                            </section>

                            {/* Our Story Section */}
                            <section id="story" className="max-w-4xl w-full px-6 py-24 space-y-24">
                                <div className="glass-card p-10 md:p-16 rounded-xl text-center space-y-8">
                                    <Heart className="w-10 h-10 text-primary mx-auto" style={{ color: COLORS.primary }} />
                                    <h3 className="font-serif text-4xl md:text-5xl border-b pb-6" style={{ borderColor: `${COLORS.primary}33` }}>Our Story</h3>
                                    <div className="space-y-6 text-lg leading-relaxed font-light opacity-90 text-left md:text-center italic font-serif">
                                        {data.story && data.story.length > 0 ? (
                                            data.story.map((item, idx) => (
                                                <p key={item.id || idx}>"{item.description}"</p>
                                            ))
                                        ) : (
                                            <>
                                                <p>"It started with a single word, a simple greeting in a crowded room. We didn't know then that our paths were being woven into a single tapestry by the stars."</p>
                                                <p>From late-night conversations under the Jakarta skyline to quiet walks along the shores of Bali, every chapter of our journey has been defined by a deep understanding and a shared vision of a future filled with grace.</p>
                                                <p>Today, we invite you to witness the most significant chapter yet—the moment we commit our lives to one another in the presence of God and those we hold dear.</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="pt-8 flex justify-center">
                                        <div className="w-24 h-px bg-primary/30"></div>
                                    </div>
                                </div>
                            </section>

                            {/* Couple Profile Section (Cinematic Cards) */}
                            <section className="max-w-6xl w-full px-6 py-24 space-y-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {/* Groom */}
                                    <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center space-y-4">
                                        <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-4">
                                            <img src={groomImage} className="w-full h-full object-cover" alt={groomFullName} />
                                        </div>
                                        <h4 className="font-serif text-3xl">{groomFullName}</h4>
                                        <p className="text-primary text-xs uppercase tracking-widest font-bold" style={{ color: COLORS.primary }}>The Groom</p>
                                        <div className="pt-4 border-t border-white/10 w-full italic text-white/60 text-sm font-display">
                                            <p>Son of Mr. & Mrs. {groomFather}</p>
                                        </div>
                                    </div>
                                    {/* Bride */}
                                    <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center space-y-4">
                                        <div className="w-full aspect-[4/5] overflow-hidden rounded-lg mb-4">
                                            <img src={brideImage} className="w-full h-full object-cover" alt={brideFullName} />
                                        </div>
                                        <h4 className="font-serif text-3xl">{brideFullName}</h4>
                                        <p className="text-primary text-xs uppercase tracking-widest font-bold" style={{ color: COLORS.primary }}>The Bride</p>
                                        <div className="pt-4 border-t border-white/10 w-full italic text-white/60 text-sm font-display">
                                            <p>Daughter of Mr. & Mrs. {brideFather}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Wedding Event Section */}
                            <section id="events" className="max-w-6xl w-full px-6 py-24">
                                <h2 className="font-serif text-4xl md:text-5xl text-center mb-16 italic text-primary" style={{ color: COLORS.primary }}>The Wedding Celebration</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {data.events?.map((event, idx) => (
                                        <div key={event.id || idx} className="glass-card rounded-xl overflow-hidden group">
                                            <div className="h-64 overflow-hidden relative">
                                                <img
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    src={idx === 0
                                                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAgOts3GzZhnhb1a2ointXXEyDfOpSdEst9wD_cmLcHmY1aifm99J8U_AJVfiqnBZjJZ6nQKHDV7cQN73WjJp8OkWHWwVGOVe0jjdrywx3J2qafTQwO1tAyM_ZPcIviuGCIxCO7gIFBgzsuacTbWDUnq-LJVwdQ3J-EQcRkr2anKMNODbz42qoggaGFG1usTP0rmNDjRHE_Lh0F-XWNir3gTcWRGSaQ4heS_cFOyXx351fu7oA_DcU9EYcLDKjRZtQu5_OG9dg35W8"
                                                        : "https://lh3.googleusercontent.com/aida-public/AB6AXuBLUEnJJLNcdxe1YNyLiRvfbhs2t1-PAjYbYtjlTRIqAlnTpn5pf-h8pJ38Spq3Jmr-zFEZ4Lctb3vDvIpzTkMCsAYvS4Kl7o5ZVnJVfBjYSMFh9jcUFrE75e45OBwb1QMAHFx6uirHruEsiYNipum7fnX5RXnntQ_Vi9E_iqOh-EYGZpu--z9w9eFp6HKCbGTHcthypQ2UFA4h6FOHTfqZaGzNClEotcSYp-6t3vD5MQhLaQokUhbHly-mpLD8zffOM1WT7v7gUgE"
                                                    }
                                                    alt={event.title}
                                                />
                                                <div className="absolute inset-0 bg-black/20"></div>
                                            </div>
                                            <div className="p-8 md:p-12 space-y-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-serif text-3xl mb-2">{event.title}</h4>
                                                        <p className="text-primary text-sm tracking-widest uppercase" style={{ color: COLORS.primary }}>
                                                            {idx === 0 ? "The Sacred Covenant" : "The Celebration"}
                                                        </p>
                                                    </div>
                                                    <Heart className="w-8 h-8 text-primary" style={{ color: COLORS.primary }} />
                                                </div>
                                                <div className="space-y-4 pt-4 border-t border-white/10 font-display">
                                                    <div className="flex items-center gap-4">
                                                        <Calendar className="w-5 h-5 opacity-60" />
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-widest opacity-50">Date</p>
                                                            <p className="font-medium text-sm">
                                                                {new Date(event.date).toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Clock className="w-5 h-5 opacity-60" />
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-widest opacity-50">Time</p>
                                                            <p className="font-medium text-sm">{event.startTime} - {event.endTime}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <MapPin className="w-5 h-5 opacity-60" />
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-widest opacity-50">Venue</p>
                                                            <p className="font-medium text-sm">{event.locationName}</p>
                                                            <p className="text-xs opacity-70 leading-relaxed">{event.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a
                                                    href={event.googleMapsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-lg font-bold uppercase tracking-widest text-xs font-display transition-all ${idx === 0
                                                        ? "border border-primary text-primary hover:bg-primary hover:text-background-dark"
                                                        : "bg-primary text-background-dark hover:brightness-110"
                                                        }`}
                                                    style={idx === 0 ? { borderColor: COLORS.primary, color: COLORS.primary } : { backgroundColor: COLORS.primary }}
                                                >
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{idx === 0 ? "View Location" : "Get Directions"}</span>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Map Section */}
                            <section className="w-full max-w-6xl px-6 pb-24">
                                <div className="glass-card h-96 rounded-xl overflow-hidden relative">
                                    <div className="absolute inset-0 bg-background-dark/20 z-10 pointer-events-none"></div>
                                    <div
                                        className="w-full h-full grayscale contrast-125 brightness-50 flex flex-col items-center justify-center space-y-4 p-8 bg-cover bg-center"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxkTpHwjKXc3r6j3pU8-lrlLzpj4U386z60S2yYpkHE_KNqw79d1x4leFw3k_hyj3kIrthdPEsYwxWpLSoRF8O3nW71GVVOiI39IUpK5a8jqDzcvt0PkvJusb6ESrbYrWAneWFJuMAqmcMU_7lptzifO991r_S1FMQ2uPQhyWjn7RSDv1lOwHBxoEjI7UmDVZQF99waElBuZ2sKrAXc6f1sGoO05QYKlIoVZ9ggUAe1TTvwiYfh0uC1BuviLxgIkhm0Zap0TY6FJo')" }}
                                    >
                                        <Globe className="text-primary w-16 h-16" style={{ color: COLORS.primary }} />
                                        <h5 className="font-serif text-3xl italic">Journey to {eventLocation}</h5>
                                        <p className="max-w-md text-center opacity-70 font-display">We are so excited to celebrate with you. Safe travels to the heart of the city.</p>
                                    </div>
                                </div>
                            </section>

                            {/* RSVP Section (Integrated) */}
                            {data.rsvp?.enabled && (
                                <section id="rsvp" className="max-w-4xl w-full px-6 pb-24">
                                    <div className="glass-card p-10 md:p-16 rounded-xl text-center space-y-8">
                                        <Share2 className="w-10 h-10 text-primary mx-auto" style={{ color: COLORS.primary }} />
                                        <h3 className="font-serif text-4xl md:text-5xl" style={{ color: COLORS.primary }}>R.S.V.P</h3>
                                        <div className="space-y-6 pt-8 max-w-lg mx-auto font-display">
                                            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-all" placeholder="Your Name" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/60 focus:border-primary outline-none transition-all">
                                                    <option>Will Attend</option>
                                                    <option>Regretfully Decline</option>
                                                </select>
                                                <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-all" placeholder="Number of Guests" type="number" />
                                            </div>
                                            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-all h-32" placeholder="Your Message / Wishes"></textarea>
                                            <button className="w-full py-4 rounded-lg bg-primary text-background-dark font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all font-display" style={{ backgroundColor: COLORS.primary }}>
                                                Submit RSVP
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Footer */}
                            <footer className="w-full py-20 flex flex-col items-center border-t border-white/5 bg-background-dark/80 backdrop-blur-md">
                                <div className="mb-10 flex items-center gap-3">
                                    <div className="h-px w-20 bg-primary/30"></div>
                                    <p className="font-serif text-2xl italic">{groomName[0]} & {brideName[0]}</p>
                                    <div className="h-px w-20 bg-primary/30"></div>
                                </div>
                                <p className="text-xs tracking-[0.4em] uppercase opacity-40 mb-2 font-display">#AksaraMenjadiNyata</p>
                                <p className="text-[10px] tracking-widest opacity-20 font-display">© 2024 AKSARA Wedding Invitation. All rights reserved.</p>
                            </footer>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
