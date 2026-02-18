"use client";

import { ThemeProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Music } from "lucide-react";
import { Countdown } from "./shared/Countdown";
import { GuestBook } from "./shared/GuestBook";

// ─── NUSA Organic Theme ───
// A modern organic wedding theme with warm terracotta tones,
// organic blob shapes, and nature-inspired aesthetics.

const NUSA_PRIMARY = "#e63f19";
const NUSA_BG_LIGHT = "#f8f6f6";
const NUSA_BG_DARK = "#211411";
const NUSA_TEXT = "#181211";
const NUSA_NEUTRAL = "#886963";

// Hero fallback image
const HERO_FALLBACK =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTk7qizA7D9mGvbfYK_RpXz4lwtcA71Lrc0W780INbS-yOUvC8i6vLyJzI5R5ez75YUWmIw6VauGjbjpnZGcqgmBkpWu5Y0I8QpVUAtTnfWbCKdknDO7VwC74dooRhAvmSU4AQuY9eUpKVG1e3jltDtP5UIDFmwaG5bcoSzgRaHOGD2yfaQC8_GUGCoFiXlqNDB5rtHOdIsafseO0miaASCFdKIdgrFyBZnTYjK8gnbzaTfdu-M4TIDlvlf7yIYzVFOzQE6RelTCI";

export default function NusaOrganic({ data, id, isPreview, guestName }: ThemeProps) {
    const { couple, events } = data;

    // ─── State ───
    const [isOpen, setIsOpen] = useState(isPreview || false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Primary event for countdown
    const primaryEvent = events[0];
    const countdownTarget =
        primaryEvent?.date && primaryEvent?.startTime
            ? `${primaryEvent.date}T${primaryEvent.startTime}:00`
            : null;

    // ─── Music Logic ───
    const handleOpen = () => {
        setIsOpen(true);
        if (data.music?.enabled && audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.log("Autoplay blocked:", err));
        }
    };

    useEffect(() => {
        if (data.music?.enabled && data.music?.url) {
            if (!audioRef.current) {
                audioRef.current = new Audio(data.music.url);
                audioRef.current.loop = true;
            } else if (audioRef.current.src !== data.music.url) {
                const wasPlaying = isPlaying;
                audioRef.current.pause();
                audioRef.current.src = data.music.url;
                if (wasPlaying) {
                    audioRef.current.play().catch(() => setIsPlaying(false));
                }
            }
        } else if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [data.music?.url, data.music?.enabled]);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() =>
                    alert("Klik di mana saja pada layar terlebih dahulu untuk mengizinkan musik diputar.")
                );
        }
    };

    // ─── RSVP Submit ───
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) {
            alert("Mode Preview: Konfirmasi tidak disimpan ke database.");
            return;
        }
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const attendance = formData.get("attendance") as string;
        const guests_count = parseInt((formData.get("guests_count") as string) || "1");
        const message = formData.get("message") as string;

        setIsSubmitting(true);
        try {
            const { error } = await supabase.from("rsvps").insert({
                invitation_id: id,
                name,
                phone,
                attendance,
                guests_count,
                message,
            });
            if (error) throw error;
            setIsSubmitted(true);
        } catch (err) {
            console.error(err);
            alert("Gagal mengirim RSVP. Pastikan tabel rsvps sudah dibuat di Supabase.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Helper: Format date ───
    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    // Couple initials for navbar
    const groomInitial = (couple.groom.name || "G")[0]?.toUpperCase() || "G";
    const brideInitial = (couple.bride.name || "B")[0]?.toUpperCase() || "B";

    // Hero background
    const heroImage = data.gallery?.[0]?.url || HERO_FALLBACK;

    return (
        <div
            className={`min-h-screen font-sans antialiased overflow-x-hidden relative ${!isOpen ? "h-screen overflow-hidden" : ""}`}
            style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                backgroundColor: NUSA_BG_LIGHT,
                color: NUSA_TEXT,
            }}
        >
            {/* ═══════════ SPLASH SCREEN ═══════════ */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`${isPreview ? "absolute" : "fixed"} inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center`}
                        style={{ backgroundColor: NUSA_BG_LIGHT }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6 relative"
                        >
                            <div className="space-y-4">
                                <span
                                    className="text-[10px] uppercase tracking-[0.4em] font-semibold block"
                                    style={{ color: NUSA_NEUTRAL }}
                                >
                                    The Wedding of
                                </span>
                                <h1
                                    className="text-5xl md:text-7xl font-light leading-tight"
                                    style={{ fontFamily: "'Playfair Display', serif", color: NUSA_TEXT }}
                                >
                                    <span className="italic">{couple.groom.name || "Groom"}</span>
                                    <span style={{ color: NUSA_PRIMARY }}> & </span>
                                    <span className="italic">{couple.bride.name || "Bride"}</span>
                                </h1>
                            </div>

                            {guestName && (
                                <div className="space-y-2 pt-4">
                                    <p
                                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                        style={{ color: NUSA_NEUTRAL }}
                                    >
                                        Kepada Yth:
                                    </p>
                                    <h3
                                        className="text-2xl font-light italic"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {guestName}
                                    </h3>
                                </div>
                            )}

                            <div className="w-12 h-[1px] mx-auto" style={{ backgroundColor: `${NUSA_NEUTRAL}40` }} />

                            <button
                                onClick={handleOpen}
                                className="group relative px-10 py-4 text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
                                style={{ backgroundColor: NUSA_PRIMARY }}
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-3">
                                    Buka Undangan
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════ FLOATING NAVBAR ═══════════ */}
            <header className={`${isPreview ? "absolute" : "fixed"} top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
                    <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                    >
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: NUSA_PRIMARY }}
                        >
                            <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-bold leading-tight tracking-tight uppercase text-white">
                            {groomInitial} & {brideInitial}
                        </h2>
                    </div>
                </div>
            </header>

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/30 z-10" />
                    <div
                        className="w-full h-full bg-cover bg-center scale-105"
                        style={{ backgroundImage: `url('${heroImage}')` }}
                    />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isOpen ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="relative z-20 text-center px-6 max-w-4xl mx-auto"
                >
                    <div className="mb-6">
                        <span
                            className="inline-block px-4 py-1 rounded-full text-white text-sm font-medium tracking-widest uppercase"
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            The Wedding of
                        </span>
                    </div>

                    <h1
                        className={`text-white mb-8 leading-tight ${isPreview ? 'text-4xl' : 'text-6xl md:text-8xl lg:text-9xl'}`}
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {couple.groom.name || "Groom"}{" "}
                        <span className="italic font-normal" style={{ color: NUSA_PRIMARY }}>
                            &
                        </span>{" "}
                        {couple.bride.name || "Bride"}
                    </h1>

                    <div className="flex flex-col items-center gap-6">
                        <p className={`text-white/90 font-light tracking-[0.2em] uppercase ${isPreview ? 'text-sm' : 'text-lg md:text-xl'}`}>
                            {primaryEvent?.date
                                ? formatDate(primaryEvent.date)
                                : "Save the Date"}
                        </p>

                        {/* Countdown */}
                        {countdownTarget && (
                            <div className="mt-2">
                                <Countdown targetDate={countdownTarget} />
                            </div>
                        )}

                        <button
                            className="group relative flex items-center gap-2 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
                            style={{
                                backgroundColor: NUSA_PRIMARY,
                                boxShadow: `0 10px 25px -5px ${NUSA_PRIMARY}33`,
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span className="font-bold tracking-wide">Save the Date</span>
                        </button>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                    <span className="text-white/60 text-[10px] uppercase tracking-widest">Scroll Down</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* ═══════════ COUPLE / MEMPELAI SECTION ═══════════ */}
            <section className={`relative px-6 overflow-hidden ${isPreview ? 'py-16' : 'py-24 md:py-32'}`}>
                {/* Abstract Decoration */}
                <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl"
                    style={{ backgroundColor: `${NUSA_PRIMARY}0D` }}
                />
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 rounded-full -ml-48 -mb-48 blur-3xl"
                    style={{ backgroundColor: `${NUSA_PRIMARY}0D` }}
                />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2
                            className={`mb-4 ${isPreview ? 'text-3xl' : 'text-4xl md:text-5xl'}`}
                            style={{ fontFamily: "'Playfair Display', serif", color: NUSA_TEXT }}
                        >
                            Mempelai
                        </h2>
                        <div
                            className="w-20 h-1 mx-auto rounded-full mb-6"
                            style={{ backgroundColor: NUSA_PRIMARY }}
                        />
                        <p
                            className="max-w-xl mx-auto leading-relaxed"
                            style={{ color: NUSA_NEUTRAL }}
                        >
                            Dengan memohon rahmat-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk
                            menghadiri pernikahan kami.
                        </p>
                    </motion.div>

                    {/* Couple Grid */}
                    <div className={`grid grid-cols-1 items-center ${isPreview ? 'gap-12' : 'md:grid-cols-2 gap-16 md:gap-24'}`}>
                        {/* Groom */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="relative mb-10">
                                {/* Organic blob background */}
                                <div
                                    className="absolute inset-0 transform -rotate-6 scale-110 group-hover:rotate-12 transition-transform duration-700"
                                    style={{
                                        backgroundColor: `${NUSA_PRIMARY}1A`,
                                        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                                    }}
                                />
                                <div className={`relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl ${isPreview ? 'w-48 h-64' : 'w-64 h-80 md:w-72 md:h-96'}`}>
                                    {couple.groom.photo ? (
                                        <img
                                            src={couple.groom.photo}
                                            alt={couple.groom.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 italic text-sm">
                                            Photo of Groom
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3
                                    className={isPreview ? 'text-xl' : 'text-3xl'}
                                    style={{ fontFamily: "'Playfair Display', serif", color: NUSA_PRIMARY }}
                                >
                                    {couple.groom.fullName || couple.groom.name || "Nama Mempelai Pria"}
                                </h3>
                                <div className="space-y-1">
                                    <p
                                        className="text-sm uppercase tracking-widest"
                                        style={{ color: NUSA_NEUTRAL }}
                                    >
                                        Putra Dari
                                    </p>
                                    <p className="font-bold text-lg">
                                        Bp. {couple.groom.fatherName || "..."} & Ibu{" "}
                                        {couple.groom.motherName || "..."}
                                    </p>
                                </div>
                                {couple.groom.instagram && (
                                    <a
                                        className="inline-flex items-center gap-2 transition-colors"
                                        style={{ color: NUSA_PRIMARY }}
                                        href={`https://instagram.com/${couple.groom.instagram.replace("@", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                        <span className="text-sm font-semibold">@{couple.groom.instagram.replace("@", "")}</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        {/* Bride */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="relative mb-10">
                                {/* Organic blob alt background */}
                                <div
                                    className="absolute inset-0 transform rotate-12 scale-110 group-hover:-rotate-6 transition-transform duration-700"
                                    style={{
                                        backgroundColor: `${NUSA_PRIMARY}1A`,
                                        borderRadius: "30% 70% 70% 30% / 50% 60% 40% 50%",
                                    }}
                                />
                                <div className={`relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl ${isPreview ? 'w-48 h-64' : 'w-64 h-80 md:w-72 md:h-96'}`}>
                                    {couple.bride.photo ? (
                                        <img
                                            src={couple.bride.photo}
                                            alt={couple.bride.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 italic text-sm">
                                            Photo of Bride
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3
                                    className={isPreview ? 'text-xl' : 'text-3xl'}
                                    style={{ fontFamily: "'Playfair Display', serif", color: NUSA_PRIMARY }}
                                >
                                    {couple.bride.fullName || couple.bride.name || "Nama Mempelai Wanita"}
                                </h3>
                                <div className="space-y-1">
                                    <p
                                        className="text-sm uppercase tracking-widest"
                                        style={{ color: NUSA_NEUTRAL }}
                                    >
                                        Putri Dari
                                    </p>
                                    <p className="font-bold text-lg">
                                        Bp. {couple.bride.fatherName || "..."} & Ibu{" "}
                                        {couple.bride.motherName || "..."}
                                    </p>
                                </div>
                                {couple.bride.instagram && (
                                    <a
                                        className="inline-flex items-center gap-2 transition-colors"
                                        style={{ color: NUSA_PRIMARY }}
                                        href={`https://instagram.com/${couple.bride.instagram.replace("@", "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                        <span className="text-sm font-semibold">@{couple.bride.instagram.replace("@", "")}</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════ EVENTS SECTION ═══════════ */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span
                        className="font-bold tracking-[0.2em] text-xs uppercase mb-3 block"
                        style={{ color: NUSA_PRIMARY }}
                    >
                        Invitation
                    </span>
                    <h2 className={`font-black mb-4 ${isPreview ? 'text-3xl' : 'text-5xl md:text-6xl'}`}>The Big Day</h2>
                    <p
                        className="text-lg max-w-xl mx-auto italic font-light"
                        style={{ color: NUSA_NEUTRAL }}
                    >
                        &ldquo;A modern organic celebration of love and new beginnings.&rdquo;
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="h-[1px] w-24" style={{ backgroundColor: `${NUSA_PRIMARY}4D` }} />
                    </div>
                </motion.div>

                {events.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed rounded-2xl opacity-30" style={{ borderColor: `${NUSA_PRIMARY}1A` }}>
                        <p className="text-sm italic">Events will appear here when you add them.</p>
                    </div>
                ) : (
                    <div className={`grid gap-8 items-start ${isPreview ? 'grid-cols-1' : 'md:grid-cols-2 gap-12'}`}>
                        {events.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className={`bg-white rounded-xl shadow-sm flex flex-col items-center text-center ${isPreview ? 'p-6' : 'p-10'}`}
                                style={{ border: `1px solid ${NUSA_PRIMARY}0D` }}
                            >
                                {/* Icon */}
                                <div className="mb-6" style={{ color: NUSA_PRIMARY }}>
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                                <p className="font-semibold mb-6" style={{ color: NUSA_PRIMARY }}>
                                    {event.startTime} — {event.endTime === "12:00" ? "Selesai" : event.endTime}
                                </p>

                                <div className="space-y-4 text-sm leading-relaxed" style={{ color: NUSA_NEUTRAL }}>
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 opacity-60" style={{ color: NUSA_PRIMARY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <span>{event.date ? formatDate(event.date) : "Tanggal belum diatur"}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 opacity-60" style={{ color: NUSA_PRIMARY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        <span>{event.locationName || "Lokasi belum diatur"}</span>
                                    </div>
                                    <p className="px-8">{event.address || "Alamat lengkap akan muncul di sini."}</p>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all"
                                        style={{
                                            border: `1px solid ${NUSA_PRIMARY}33`,
                                            color: NUSA_PRIMARY,
                                        }}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        Add to Calendar
                                    </button>
                                    {event.googleMapsUrl && (
                                        <a
                                            href={event.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all"
                                            style={{
                                                border: `1px solid ${NUSA_PRIMARY}33`,
                                                color: NUSA_PRIMARY,
                                            }}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            Maps
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* ═══════════ GALLERY SECTION ═══════════ */}
            <section className="py-24" style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`flex flex-col justify-between mb-12 ${isPreview ? '' : 'md:flex-row md:items-end'}`}
                    >
                        <div>
                            <span
                                className="font-bold tracking-[0.2em] text-xs uppercase mb-3 block"
                                style={{ color: NUSA_PRIMARY }}
                            >
                                Gallery
                            </span>
                            <h2 className="text-4xl font-black">Our Moments</h2>
                        </div>
                        <p className={`max-w-md mt-4 text-sm ${isPreview ? '' : 'md:mt-0'}`} style={{ color: NUSA_NEUTRAL }}>
                            Captured memories from our journey together, leading up to the most special day of our
                            lives.
                        </p>
                    </motion.div>

                    {data.gallery.length === 0 ? (
                        <div
                            className="text-center py-20 border-2 border-dashed rounded-2xl opacity-30"
                            style={{ borderColor: `${NUSA_PRIMARY}1A` }}
                        >
                            <p className="text-sm italic">Gallery will appear here when you add photos.</p>
                        </div>
                    ) : (
                        <div className={`grid gap-3 ${isPreview ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4 gap-4'}`}>
                            {data.gallery.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`aspect-[3/4] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 group relative ${!isPreview && idx % 2 === 1 ? "md:mt-12" : ""}`}
                                >
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        style={{ backgroundColor: `${NUSA_PRIMARY}33` }}
                                    />
                                    <img
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={item.url}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════ DIGITAL GIFT SECTION ═══════════ */}
            {data.gifts && data.gifts.length > 0 && (
                <section className="py-24 px-6" style={{ backgroundColor: NUSA_BG_LIGHT }}>
                    <div className="max-w-4xl mx-auto space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h2
                                className="text-4xl font-light mb-4 italic"
                                style={{ fontFamily: "'Playfair Display', serif", color: NUSA_TEXT }}
                            >
                                Kado Digital
                            </h2>
                            <div className="h-[1px] w-20 mx-auto opacity-30 mb-6" style={{ backgroundColor: NUSA_PRIMARY }} />
                            <p className="text-sm max-w-sm mx-auto" style={{ color: NUSA_NEUTRAL }}>
                                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin
                                memberikan tanda kasih, dapat disalurkan melalui:
                            </p>
                        </motion.div>

                        <div className={`grid grid-cols-1 gap-6 ${isPreview ? '' : 'md:grid-cols-2 gap-8'}`}>
                            {data.gifts.map((gift) => (
                                <div
                                    key={gift.id}
                                    className={`bg-white shadow-sm text-center space-y-6 ${isPreview ? 'p-6' : 'p-10'}`}
                                    style={{ border: `1px solid ${NUSA_PRIMARY}1A` }}
                                >
                                    <div className="space-y-1">
                                        <span
                                            className="text-[10px] uppercase tracking-widest font-bold"
                                            style={{ color: NUSA_NEUTRAL }}
                                        >
                                            {gift.bankName}
                                        </span>
                                        <h3
                                            className="text-2xl font-light italic"
                                            style={{ fontFamily: "'Playfair Display', serif", color: NUSA_TEXT }}
                                        >
                                            {gift.accountHolder}
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div
                                            className="py-4 px-6 rounded-lg text-lg tracking-wider"
                                            style={{
                                                backgroundColor: NUSA_BG_LIGHT,
                                                border: `1px solid ${NUSA_PRIMARY}0D`,
                                                color: NUSA_TEXT,
                                            }}
                                        >
                                            {gift.accountNumber}
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(gift.accountNumber);
                                                alert(`Nomor rekening ${gift.bankName} berhasil disalin!`);
                                            }}
                                            className="text-[10px] uppercase tracking-widest font-semibold pb-1"
                                            style={{
                                                color: NUSA_NEUTRAL,
                                                borderBottom: `1px solid ${NUSA_NEUTRAL}33`,
                                            }}
                                        >
                                            Salin Nomor Rekening
                                        </button>
                                    </div>

                                    {gift.qrCode && (
                                        <div className="pt-4 flex flex-col items-center gap-4">
                                            <div
                                                className="w-32 h-32 p-2 bg-white rounded-xl"
                                                style={{ border: `1px solid ${NUSA_PRIMARY}1A` }}
                                            >
                                                <img src={gift.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                                Scan QR untuk donasi
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════ RSVP SECTION ═══════════ */}
            {data.rsvp?.enabled && (
                <section className="py-24 px-6 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`rounded-3xl relative overflow-hidden ${isPreview ? 'p-8' : 'p-12 md:p-20'}`}
                        style={{ backgroundColor: `${NUSA_PRIMARY}0D` }}
                    >
                        {/* Decorative bg icon */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="w-[120px] h-[120px]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>

                        <h2 className="text-3xl font-black mb-4">Will you join us?</h2>
                        <p className="mb-10 max-w-sm mx-auto" style={{ color: NUSA_NEUTRAL }}>
                            Please let us know if you can make it to our special celebration.
                        </p>

                        {isSubmitted ? (
                            <div className="space-y-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                    style={{ backgroundColor: NUSA_PRIMARY }}
                                >
                                    <span className="text-white text-2xl">✓</span>
                                </div>
                                <h3
                                    className="text-2xl font-light italic"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Terima Kasih!
                                </h3>
                                <p className="text-sm" style={{ color: NUSA_NEUTRAL }}>
                                    Konfirmasi kehadiran Anda telah kami terima.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-[10px] uppercase tracking-widest font-semibold pb-1"
                                    style={{ color: NUSA_PRIMARY, borderBottom: `1px solid ${NUSA_PRIMARY}33` }}
                                >
                                    Kirim Pesan Lainnya
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6 max-w-lg mx-auto text-left" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: NUSA_NEUTRAL }}>
                                        Nama Lengkap
                                    </label>
                                    <input
                                        name="name"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-white rounded-xl border px-4 py-3 outline-none transition-all disabled:opacity-50"
                                        style={{ borderColor: `${NUSA_PRIMARY}1A` }}
                                        placeholder="Masukkan nama Anda..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: NUSA_NEUTRAL }}>
                                        Nomor WhatsApp
                                    </label>
                                    <input
                                        name="phone"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-white rounded-xl border px-4 py-3 outline-none transition-all disabled:opacity-50"
                                        style={{ borderColor: `${NUSA_PRIMARY}1A` }}
                                        placeholder="Contoh: 08123456789"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: NUSA_NEUTRAL }}>
                                        Konfirmasi Kehadiran
                                    </label>
                                    <div className="flex gap-4">
                                        {["Hadir", "Tidak Hadir"].map((status) => (
                                            <label key={status} className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="attendance"
                                                    value={status}
                                                    className="hidden peer"
                                                    defaultChecked={status === "Hadir"}
                                                    disabled={isSubmitting}
                                                />
                                                <div
                                                    className="text-center py-3 rounded-xl text-sm transition-all peer-checked:text-white peer-disabled:opacity-50"
                                                    style={{
                                                        border: `1px solid ${NUSA_PRIMARY}1A`,
                                                    }}
                                                >
                                                    <style>{`
                            input[name="attendance"]:checked + div {
                              background-color: ${NUSA_PRIMARY} !important;
                              color: white !important;
                            }
                          `}</style>
                                                    {status}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {data.rsvp.showGuestsCount && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: NUSA_NEUTRAL }}>
                                            Jumlah Tamu
                                        </label>
                                        <select
                                            name="guests_count"
                                            disabled={isSubmitting}
                                            className="w-full bg-white rounded-xl border px-4 py-3 outline-none disabled:opacity-50"
                                            style={{ borderColor: `${NUSA_PRIMARY}1A` }}
                                        >
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <option key={n} value={n}>
                                                    {n} Orang
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: NUSA_NEUTRAL }}>
                                        Ucapan & Doa
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-white rounded-xl border px-4 py-3 outline-none min-h-[100px] resize-none disabled:opacity-50"
                                        style={{ borderColor: `${NUSA_PRIMARY}1A` }}
                                        placeholder="Berikan ucapan selamat Anda..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-white py-4 rounded-xl text-xs uppercase tracking-[0.3em] font-bold transition-all shadow-md disabled:opacity-50"
                                    style={{ backgroundColor: NUSA_PRIMARY }}
                                >
                                    {isSubmitting ? "Mengirim..." : "RSVP Now →"}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Guest Book */}
                    {data.rsvp.showGuestBook && (
                        <div className="pt-12 mt-12" style={{ borderTop: `1px solid ${NUSA_PRIMARY}1A` }}>
                            <div className="text-center mb-8">
                                <h3
                                    className="text-2xl font-light italic mb-2"
                                    style={{ fontFamily: "'Playfair Display', serif", color: NUSA_TEXT }}
                                >
                                    Ucapan & Doa
                                </h3>
                                <p className="text-[10px] uppercase tracking-widest" style={{ color: NUSA_NEUTRAL }}>
                                    Konfirmasi Kehadiran Tamu
                                </p>
                            </div>
                            <GuestBook invitationId={id} />
                        </div>
                    )}
                </section>
            )}

            {/* ═══════════ FOOTER ═══════════ */}
            <footer className="py-12 px-6 text-center" style={{ borderTop: `1px solid ${NUSA_PRIMARY}0D` }}>
                <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
                    <div className="h-[1px] w-24" style={{ backgroundColor: `${NUSA_PRIMARY}4D` }} />
                    <svg className="w-5 h-5" style={{ color: NUSA_PRIMARY }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <div className="h-[1px] w-24" style={{ backgroundColor: `${NUSA_PRIMARY}4D` }} />
                </div>
                <p className="text-xs" style={{ color: NUSA_NEUTRAL }}>
                    © {new Date().getFullYear()} NUSA Wedding — Crafted with KanvasKita
                </p>
            </footer>

            {/* ═══════════ FLOATING MUSIC CONTROLLER ═══════════ */}
            {data.music?.enabled && (
                <div className={`${isPreview ? "absolute" : "fixed"} bottom-8 left-8 z-[100]`}>
                    <button
                        onClick={toggleMusic}
                        className="relative flex items-center justify-center w-12 h-12 text-white rounded-full shadow-2xl hover:scale-110 transition-transform group"
                        style={{ backgroundColor: NUSA_PRIMARY }}
                    >
                        {/* Pulsing Aura */}
                        {isPlaying && (
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full -z-10"
                                style={{ backgroundColor: NUSA_PRIMARY }}
                            />
                        )}

                        <AnimatePresence mode="wait">
                            {isPlaying ? (
                                <motion.div
                                    key="playing"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="flex items-end gap-[2px] h-3"
                                >
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [4, 12, 4] }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                                ease: "easeInOut",
                                            }}
                                            className="w-1 bg-white rounded-full"
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="paused"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="relative"
                                >
                                    <Music className="w-5 h-5" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white/80 stroke-current stroke-2 fill-none">
                                            <line x1="24" y1="0" x2="0" y2="24" />
                                        </svg>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            )}
        </div>
    );
}
