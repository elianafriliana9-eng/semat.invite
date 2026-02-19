"use client";

import React, { useRef, useEffect, useState } from "react";
import { Heart, MapPin, Music } from "lucide-react";
import { useBuilderStore, InvitationData } from "@/store/builderStore";
import { motion, AnimatePresence } from "framer-motion";

// Theme Colors
const COLORS = {
    primary: "#ddb098",
    backgroundLight: "#f8f7f6",
    backgroundDark: "#1e1714",
    dustyRose: "#e2c2b9",
    mutedGrey: "#a8a29e",
};

interface SenandikaTemplateProps {
    data: InvitationData;
    guestName?: string;
}

export default function SenandikaTemplate({ data, guestName }: SenandikaTemplateProps) {
    const { isMusicPlaying, setMusicPlaying } = useBuilderStore();
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Dynamic Data
    const groomName = data?.couple?.groom?.name || "Arya";
    const brideName = data?.couple?.bride?.name || "Nirmana";
    const firstEvent = data?.events?.[0];

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
    const date = firstEvent?.date ? new Date(firstEvent.date) : new Date("2024-12-12");
    const formattedDate = date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).replace(/\//g, " . "); // 12 . 12 . 2024 format

    // Use gallery image or fallback
    const coupleImage = data?.gallery?.[0]?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDXN_kIPmI4M0j-BFBK-JG-tUupTCO64fMuhTu9S4-3CcDmSQflH3gu8xm803ViaMBbCcjHhIlZdj9SiO0eSyqglPGgDYE0vW1AWF1MhPyLDR811m4y-4gdciNgxY-ndxjxFbGUDDeYeXg9ym1VLyeUo_vjVjMfg9KdAxvufnk3dGO-JGAlAKcpelVIKE2zMadOkaYtbh7npDh67b6MLNYQ_e24Hbti_29xOpgqTUlNVNvzEIMoms5NupimcguTiQDb4gPi05NRjBM";

    return (
        <div className={`font-sans antialiased min-h-screen text-[#181310] transition-colors duration-500 ${!isOpen ? "h-screen overflow-hidden" : "overflow-x-hidden"}`}
            style={{
                backgroundColor: COLORS.backgroundLight,
                fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
        >
            {/* Fonts Injection (Temporary for Preview) */}
            <style jsx global>{`
                .font-serif-italic {
                    font-family: 'Cormorant Garamond', serif;
                    font-style: italic;
                }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>

            {/* ═══════════ SPLASH SCREEN (ENVELOPE) ═══════════ */}
            <AnimatePresence mode="wait">
                {!isOpen && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f8f7f6] overflow-hidden"
                    >
                        {/* Background Detail */}
                        <div className="absolute inset-0 z-0">
                            <div
                                className="w-full h-full bg-cover bg-center opacity-[0.15] scale-110 blur-sm"
                                style={{ backgroundImage: `url('${coupleImage}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f6] via-transparent to-[#f8f7f6]"></div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1.2 }}
                            className="relative z-10 text-center px-6 max-w-xl flex flex-col items-center"
                        >
                            <div className="mb-12 space-y-6">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Heart className="w-6 h-6 mx-auto" style={{ color: COLORS.primary }} />
                                </motion.div>
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold opacity-40 block">The Wedding Invitation Of</span>
                                    <h1 className="font-serif-italic text-5xl md:text-7xl leading-tight" style={{ color: COLORS.primary }}>
                                        {groomName} & {brideName}
                                    </h1>
                                </div>
                            </div>

                            {guestName && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.5, duration: 1 }}
                                    className="mb-12 p-8 rounded-2xl border bg-white/50 backdrop-blur-sm space-y-3"
                                    style={{ borderColor: `${COLORS.primary}33` }}
                                >
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Dear our honorable guest:</p>
                                    <h3 className="text-2xl font-semibold tracking-wide text-[#1e1714]">{guestName}</h3>
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleOpen}
                                className="flex items-center gap-3 px-10 py-4 text-white rounded-full text-[11px] font-bold tracking-[0.3em] uppercase hover:opacity-90 transition-all shadow-xl shadow-[#ddb098]/20"
                                style={{ backgroundColor: COLORS.primary }}
                            >
                                <Music className="w-4 h-4" />
                                Open Invitation
                            </motion.button>
                        </motion.div>

                        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
                            <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Best viewed on mobile</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════ MAIN CONTENT ═══════════ */}
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        >

                            {/* Navigation */}
                            <nav className="fixed top-0 left-0 w-full z-50 bg-[#f8f7f6]/80 dark:bg-[#1e1714]/80 backdrop-blur-md border-b"
                                style={{ borderColor: `${COLORS.primary}1A` }} // 10% opacity
                            >
                                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Heart className="w-6 h-6 fill-current" style={{ color: COLORS.primary }} />
                                        <span className="text-sm font-bold tracking-[0.3em] uppercase">Senandika</span>
                                    </div>
                                    <div className="hidden md:flex items-center gap-12 text-[11px] font-semibold tracking-[0.2em] uppercase">
                                        <a className="hover:text-[#ddb098] transition-colors" href="#hero">Intro</a>
                                        <a className="hover:text-[#ddb098] transition-colors" href="#story">Our Story</a>
                                        <a className="hover:text-[#ddb098] transition-colors" href="#">Gallery</a>
                                        <a className="hover:text-[#ddb098] transition-colors" href="#">RSVP</a>
                                    </div>
                                    <button className="text-white px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all shadow-sm"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        Save the Date
                                    </button>
                                </div>
                            </nav>

                            {/* Hero Section */}
                            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden" id="hero">
                                {/* Background Accents */}
                                <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ backgroundColor: COLORS.primary }}></div>
                                <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ backgroundColor: COLORS.mutedGrey }}></div>

                                <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">
                                    {/* Save the Date Title */}
                                    <div className="animate-float mb-12">
                                        <h2 className="text-xs md:text-sm font-medium tracking-[0.5em] uppercase mb-6 opacity-80" style={{ color: COLORS.mutedGrey }}>
                                            Announcing our Union
                                        </h2>
                                        <h1 className="font-serif-italic text-6xl md:text-9xl leading-none" style={{ color: COLORS.primary }}>
                                            Save the Date
                                        </h1>
                                    </div>

                                    {/* Couple Portrait */}
                                    <div className="relative group">
                                        <div className="absolute inset-0 border rounded-full -m-4 animate-pulse" style={{ borderColor: `${COLORS.primary}4D` }}></div>
                                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-[#1e1714] shadow-2xl transition-transform duration-700 group-hover:scale-105">
                                            <img
                                                alt="Couple Portrait"
                                                className="w-full h-full object-cover grayscale-[20%] sepia-[10%] group-hover:grayscale-0 transition-all duration-700"
                                                src={coupleImage}
                                            />
                                        </div>
                                    </div>

                                    {/* Couple Names & Date */}
                                    <div className="mt-12 text-center">
                                        <p className="text-2xl md:text-3xl font-light tracking-wide text-[#444] dark:text-[#ccc]">
                                            {groomName} <span className="italic font-serif mx-2" style={{ color: COLORS.primary }}>&</span> {brideName}
                                        </p>
                                        <div className="mt-6 flex items-center justify-center gap-4">
                                            <div className="h-[1px] w-12 opacity-30" style={{ backgroundColor: COLORS.mutedGrey }}></div>
                                            <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: COLORS.mutedGrey }}>
                                                {formattedDate}
                                            </p>
                                            <div className="h-[1px] w-12 opacity-30" style={{ backgroundColor: COLORS.mutedGrey }}></div>
                                        </div>
                                    </div>

                                    {/* Scroll Indicator */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Scroll</span>
                                        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-transparent"
                                            style={{ backgroundImage: `linear-gradient(to bottom, ${COLORS.primary}, transparent)` }}
                                        ></div>
                                    </div>
                                </div>
                            </section>

                            {/* Event Section */}
                            <section className="py-20 px-4 max-w-5xl mx-auto w-full">
                                {/* Section Heading */}
                                <div className="text-center mb-16 space-y-4">
                                    <p className="font-bold tracking-[0.3em] text-xs uppercase" style={{ color: COLORS.primary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Join Our Celebration</p>
                                    <h1 className="text-5xl md:text-7xl leading-none" style={{ color: "#333333", fontFamily: "'Cormorant Garamond', serif" }}>The Wedding Event</h1>
                                    <div className="w-12 h-[1px] mx-auto mt-6" style={{ backgroundColor: COLORS.primary }}></div>
                                </div>

                                {/* Events Grid */}
                                <div className="w-full grid md:grid-cols-2 gap-12 md:gap-0 relative">
                                    {/* Vertical Divider (Desktop) */}
                                    <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-[0.5px] bg-[#333333]/10"></div>

                                    {data.events?.map((event, index) => (
                                        <div key={event.id || index} className="flex flex-col items-center text-center px-8 md:px-16 space-y-8">
                                            {/* Mobile Divider for 2nd item */}
                                            {index > 0 && <div className="md:hidden h-[1px] w-full bg-[#333333]/10 my-8"></div>}

                                            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm bg-[#efefef] relative group">
                                                <img
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    src={index === 0
                                                        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDXWG0THRO9j9c60NUL6UuQW0522TmfZTxmFTrpvq-T-hJuOjIpzTGiZNiJWlAK4jcopjNOvgLg6oFmNbQrEpTkbmRXfX7D5ygyDDI3G7-WlDNNFnr5--IiNm99iXAj93MPQtw9B0wQAS8NkC2c2KLpzlsx9-nofTQW-pt-laFS4puDyp49Kq0nC6IRJmmzeqONo70fWXfFxJX-2Qv6-BEQAHnhqreEBbulhB7lkS_R6eFdTcpG8nSOUgbc-Amokk-zFgkoCrF3rEA"
                                                        : "https://lh3.googleusercontent.com/aida-public/AB6AXuDW4hLFEBCjSGJ8KbB5wAY8rnuQOpr6GRyVXTArtf85bF1mXN3wxbIWPzcnH31oXWVT0uVPTpXULETf24pw5my-R5KSezI4EZs7E88VGfbzmlIMD1wWkciR4c0Iyfqvr78NlX2N_1eNp5WZrmr3dSVOg_wMtJilM2KnvJK5at69AtHz1hvgddc_MZlbZgXrDMY5L6Sa8WEKVEe-WMaLjBrsacuofxUC0IYI-nFdHkReWyvzrLq09BAd1fjFHBMR59DZINCbXcfYJzM"
                                                    }
                                                />
                                                <div className="absolute inset-0 bg-black/5"></div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-4xl" style={{ color: "#333333", fontFamily: "'Cormorant Garamond', serif" }}>{event.title}</h3>

                                                <div className="space-y-1">
                                                    <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: COLORS.primary }}>Date & Time</p>
                                                    <p className="text-sm md:text-base text-[#333333]/70">
                                                        {new Date(event.date).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </p>
                                                    <p className="text-sm md:text-base text-[#333333]/70">
                                                        {event.startTime} - {event.endTime} WIB
                                                    </p>
                                                </div>

                                                <div className="h-[1px] w-16 mx-auto bg-[#333333]/10"></div>

                                                <div className="space-y-1">
                                                    <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: COLORS.primary }}>Venue</p>
                                                    <p className="font-semibold text-[#333333]">{event.locationName}</p>
                                                    <p className="text-sm text-[#333333]/70 leading-relaxed max-w-xs mx-auto">
                                                        {event.address}
                                                    </p>
                                                </div>

                                                {event.googleMapsUrl && (
                                                    <div className="pt-4">
                                                        <a
                                                            href={event.googleMapsUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex items-center gap-2 mx-auto text-xs uppercase tracking-widest font-bold border-b pb-1 hover:opacity-80 transition-all"
                                                            style={{ borderColor: COLORS.primary, color: "#333333" }}
                                                        >
                                                            <MapPin className="w-4 h-4" />
                                                            View Map
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Fallback if no events */}
                                    {(!data.events || data.events.length === 0) && (
                                        <div className="col-span-2 text-center text-gray-400 italic py-12">
                                            Belum ada acara yang ditambahkan.
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Note */}
                                <div className="mt-24 text-center">
                                    <p className="text-2xl italic max-w-lg mx-auto leading-relaxed text-[#333333]/60" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                        "Two souls but with a single thought, two hearts that beat as one."
                                    </p>
                                </div>
                            </section>

                            {/* Story Section */}
                            {data.story && data.story.length > 0 && (
                                <section className="py-32 px-6 md:px-0" id="story">
                                    <div className="max-w-4xl mx-auto">
                                        <div className="grid md:grid-cols-12 gap-16 items-center">
                                            <div className="md:col-span-12 text-center mb-16">
                                                <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold" style={{ color: COLORS.primary }}>Our Story</h2>
                                                <div className="w-16 h-[1px] mx-auto" style={{ backgroundColor: COLORS.primary }}></div>
                                            </div>
                                            <div className="md:col-span-10 md:col-start-2 px-8">
                                                <blockquote className="text-3xl md:text-4xl leading-relaxed text-center mb-20 italic" style={{ color: "#333333", fontFamily: "'Cormorant Garamond', serif" }}>
                                                    "{data.story[0].description}"
                                                </blockquote>
                                            </div>
                                            {data.story[0].image && (
                                                <div className="md:col-span-12 px-4">
                                                    <div className="w-full aspect-[21/9] overflow-hidden rounded-xl shadow-sm" style={{ backgroundColor: COLORS.dustyRose }}>
                                                        <img
                                                            alt="Our Story"
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                                            src={data.story[0].image}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Location Section */}
                            {data.events && data.events.length > 0 && (
                                <section className="py-32" id="location">
                                    <div className="max-w-6xl mx-auto px-6">
                                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                                            <div className="lg:col-span-5">
                                                <h2 className="text-5xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Location Details</h2>
                                                <p className="leading-relaxed mb-8 text-[#333333]/70">
                                                    The celebration will be held at {data.events[0].locationName}. We have provided a map to help you find the venue easily.
                                                </p>
                                                <div className="space-y-6">
                                                    <div className="flex items-start gap-4">
                                                        <MapPin className="w-6 h-6 mt-1" style={{ color: COLORS.primary }} />
                                                        <div>
                                                            <h4 className="font-bold text-sm uppercase tracking-wider">{data.events[0].locationName}</h4>
                                                            <p className="text-[#333333]/60">{data.events[0].address}</p>
                                                        </div>
                                                    </div>
                                                    {data.events[0].googleMapsUrl && (
                                                        <a
                                                            href={data.events[0].googleMapsUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center px-8 py-4 text-white rounded-lg hover:opacity-90 transition-all font-semibold tracking-wide"
                                                            style={{ backgroundColor: COLORS.primary }}
                                                        >
                                                            Open in Google Maps
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-7">
                                                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white grayscale hover:grayscale-0 transition-all duration-700">
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        frameBorder="0"
                                                        scrolling="no"
                                                        marginHeight={0}
                                                        marginWidth={0}
                                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(data.events[0].locationName + " " + data.events[0].address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* RSVP Section */}
                            {data.rsvp?.enabled && (
                                <section className="py-32" id="rsvp" style={{ backgroundColor: `${COLORS.primary}0D` }}>
                                    <div className="max-w-2xl mx-auto px-6 text-center">
                                        <h2 className="text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Confirm Attendance</h2>
                                        <p className="mb-12 text-[#333333]/60">Please let us know if you can join us on our special day.</p>

                                        <form className="space-y-6 text-left bg-white p-10 rounded-3xl border shadow-sm" style={{ borderColor: `${COLORS.primary}1A` }}>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest font-bold px-1" style={{ color: COLORS.primary }}>Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    className="w-full px-4 py-3 border-b-2 bg-transparent outline-none transition-all placeholder:text-[#333333]/30 focus:border-[#ddb098]"
                                                    style={{ borderColor: `${COLORS.primary}1A` }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest font-bold px-1" style={{ color: COLORS.primary }}>Attendance</label>
                                                <select
                                                    className="w-full px-4 py-3 border-b-2 bg-transparent outline-none transition-all focus:border-[#ddb098]"
                                                    style={{ borderColor: `${COLORS.primary}1A` }}
                                                >
                                                    <option>Yes, I will attend</option>
                                                    <option>I am unable to attend</option>
                                                </select>
                                            </div>
                                            {data.rsvp.showGuestsCount && (
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest font-bold px-1" style={{ color: COLORS.primary }}>Number of Guests</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="5"
                                                        defaultValue="1"
                                                        className="w-full px-4 py-3 border-b-2 bg-transparent outline-none transition-all focus:border-[#ddb098]"
                                                        style={{ borderColor: `${COLORS.primary}1A` }}
                                                    />
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                className="w-full py-4 text-white font-bold uppercase tracking-[0.3em] text-xs rounded-xl hover:opacity-90 transition-all mt-8"
                                                style={{ backgroundColor: "#1A1A1B" }}
                                            >
                                                Send RSVP
                                            </button>
                                        </form>
                                    </div>
                                </section>
                            )}

                            {/* Footer */}
                            <footer className="py-20 text-center px-6">
                                <div className="max-w-xl mx-auto">
                                    <h2 className="text-3xl mb-8 italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.primary }}>"Until our paths cross in eternity."</h2>
                                    <div className="w-12 h-[1px] mx-auto mb-12" style={{ backgroundColor: `${COLORS.primary}4D` }}></div>
                                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2 text-[#333333]/40">Designed for</p>
                                    <p className="text-sm font-bold tracking-widest uppercase">{groomName} & {brideName}</p>
                                    <p className="text-xs mt-8 text-[#333333]/30">© 2024 SENANDIKA — All Rights Reserved</p>
                                </div>
                            </footer>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    );
}
