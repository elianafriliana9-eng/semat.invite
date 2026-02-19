"use client";

import { ThemeProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Music, Volume2, VolumeX, MapPin, Calendar, Users, Heart, Sparkles } from "lucide-react";
import { Countdown } from "./shared/Countdown";
import { GuestBook } from "./shared/GuestBook";

import { useBuilderStore } from "@/store/builderStore";

// ─── KROMO INGGIL Theme (Javanese Modern) ───
// A royal Javanese wedding theme with deep navy, gold, and soga tones.
// Features Gunungan (Kayon) animations and Batik motifs.

const KROMO_NAVY = "#1a2634";
const KROMO_GOLD = "#C5A059";
const KROMO_SOGA = "#704214";
const KROMO_GOLD_LIGHT = "#E8D5B5";
const KROMO_BG = "#FDFCFB";

export default function KromoInggil({ data, id, isPreview, guestName }: ThemeProps) {
  const { couple, events } = data;
  const { isMusicPlaying, setMusicPlaying } = useBuilderStore();
  const [isOpen, setIsOpen] = useState(isPreview || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const primaryEvent = events[0];
  const countdownTarget = primaryEvent?.date && primaryEvent?.startTime
    ? `${primaryEvent.date}T${primaryEvent.startTime}:00`
    : null;

  // Music Logic Sync
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
        audioRef.current.play().catch((err) => {
           console.log("Autoplay blocked or play failed:", err);
        });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      alert("Mode Preview: Konfirmasi tidak disimpan.");
      return;
    }
    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("rsvps").insert({
        invitation_id: id,
        name: formData.get("name"),
        phone: formData.get("phone"),
        attendance: formData.get("attendance"),
        guests_count: parseInt(formData.get("guests_count") as string || "1"),
        message: formData.get("message"),
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim RSVP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });
    } catch { return dateStr; }
  };

  // Helper for Batik Pattern (CSS-based SVG pattern)
  const BatikParang = () => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply transition-opacity duration-1000" 
         style={{ 
           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 L60 0 M30 60 L60 30 M0 30 L30 0' stroke='%23C5A059' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
           backgroundSize: '80px 80px'
         }} />
  );

  // Falling Jasmine Particles
  const JasmineParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: -20, 
            rotate: 0, 
            opacity: 0 
          }}
          animate={{ 
            y: "110vh", 
            rotate: 360, 
            opacity: [0, 0.4, 0.4, 0] 
          }}
          transition={{ 
            duration: Math.random() * 5 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10 
          }}
          className="absolute"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#E8D5B5">
            <path d="M12 0c1.1 6.6 6.6 1.1 12 1.1-5.4 0-1.1 5.4-1.1 10.9 0-5.5 4.3-10.9 10.9-10.9-6.6 0-1.1-5.4-1.1-12 0 6.6-5.5 1.1-10.9 1.1 5.5 0 1.1 5.5 1.1 10.9 0-5.4-6.6-1.1-1.1-1.1z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );

  // Divider Component
  const GununganDivider = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center justify-center gap-4 opacity-10 py-12 ${className}`}>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A059]" />
        <svg width="40" height="60" viewBox="0 0 100 150" fill={KROMO_GOLD}>
            <path d="M50 0 C30 20, 10 60, 10 100 C10 130, 30 150, 50 150 C70 150, 90 130, 90 100 C90 60, 70 20, 50 0 Z" />
        </svg>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A059]" />
    </div>
  );

  return (
    <div className={`min-h-screen font-sans antialiased text-slate-800 bg-[#FDFCFB] selection:bg-[#C5A059]/30 ${!isOpen ? "h-screen overflow-hidden" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;600&display=swap');
        .font-javanese { font-family: 'Playfair Display', serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />

      {/* ═══════════ SPLASH SCREEN (WOW FACTOR) ═══════════ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`${isPreview ? "absolute" : "fixed"} inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a2634] overflow-hidden`}
          >
            <BatikParang />
            
            {/* Split Gunungan Animation */}
            <div className="absolute inset-0 flex pointer-events-none">
                {/* Left Half */}
                <motion.div 
                    initial={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
                    className="flex-1 h-full relative"
                >
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[500px] md:w-[500px] md:h-[800px] opacity-20">
                        <svg viewBox="0 0 100 200" fill={KROMO_GOLD} className="h-full w-full">
                            <path d="M100 0 C70 10, 40 40, 20 80 C10 120, 15 160, 20 200 L100 200 Z" />
                        </svg>
                    </div>
                </motion.div>

                {/* Right Half */}
                <motion.div 
                    initial={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
                    className="flex-1 h-full relative"
                >
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[500px] md:w-[500px] md:h-[800px] opacity-20">
                        <svg viewBox="0 0 100 200" fill={KROMO_GOLD} className="h-full w-full">
                            <path d="M0 0 C30 10, 60 40, 80 80 C90 120, 85 160, 80 200 L0 200 Z" />
                        </svg>
                    </div>
                    {/* Shadow Border */}
                    <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-r from-[#C5A059]/20 to-transparent" />
                </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10 text-center space-y-12 px-6"
            >
              <div className="space-y-6">
                <motion.div
                    animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto" />
                </motion.div>
                
                <div className="space-y-4">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.7em] text-[#C5A059] font-black block">Serat Undangan</span>
                    <h1 className="text-5xl md:text-8xl font-javanese text-white font-medium leading-[1.1] tracking-tight max-w-4xl mx-auto italic">
                    {couple.groom.name} <span className="text-[#C5A059]/40 font-normal">&</span> {couple.bride.name}
                    </h1>
                </div>
              </div>

              {guestName && (
                <div className="space-y-3 pt-6 bg-white/5 backdrop-blur-md p-8 rounded-[40px] border border-white/10 max-w-sm mx-auto">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#E8D5B5]/50 font-medium">Kahatur Dhumateng:</p>
                  <h3 className="text-2xl font-javanese text-[#E8D5B5] font-bold">{guestName}</h3>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="group relative px-16 py-5 bg-[#C5A059] text-[#1a2634] rounded-full overflow-hidden transition-all shadow-[0_20px_50px_rgba(197,160,89,0.4)]"
              >
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-xs uppercase tracking-[0.5em] font-black flex items-center gap-3">
                  Buka Serat
                </span>
              </motion.button>
            </motion.div>

            {/* Bottom Accent */}
            <div className="absolute bottom-8 text-[#C5A059]/40 text-[9px] uppercase tracking-[0.4em] font-bold">
                Royal Javanese Tradition
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <BatikParang />
      {isOpen && <JasmineParticles />}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#1a2634]/60 z-10" />
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src={data.gallery?.[0]?.url || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop"} 
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-20 text-center px-6 max-w-4xl"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
             <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto opacity-80" />
          </motion.div>

          <span className="text-[10px] uppercase tracking-[0.6em] text-[#C5A059] font-bold block mb-6">The Wedding of</span>
          
          <h1 className="font-javanese text-6xl md:text-9xl text-white mb-8 tracking-tighter leading-none">
            {couple.groom.name} <span className="italic block md:inline text-4xl md:text-6xl text-[#C5A059]/60 font-normal">&</span> {couple.bride.name}
          </h1>

          <div className="flex flex-col items-center gap-6">
            <p className="text-[#E8D5B5] font-light tracking-[0.4em] uppercase text-xs md:text-sm">
              {primaryEvent?.date ? formatDate(primaryEvent.date) : "Titi Mangsa"}
            </p>
            {countdownTarget && <Countdown targetDate={countdownTarget} />}
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <span className="text-white/40 text-[9px] uppercase tracking-[0.4em]">Miyos Semanten</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#C5A059] to-transparent animate-pulse" />
        </div>
      </section>

      <GununganDivider />

      {/* Couple Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-[#FDFCFB]">
        {/* Subtle Mandala/Gunungan Backgrounds */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#704214]/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <h2 className="font-javanese text-4xl md:text-5xl text-[#1a2634]">Sekar Mempelai</h2>
            <div className="w-12 h-[2px] bg-[#C5A059] mx-auto" />
            <p className="text-sm font-manrope text-slate-500 max-w-lg mx-auto italic">
              "Ngaturaken sedaya puja-puji syukur dhumateng Gusti Ingkang Maha Kuwaos."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8 group"
            >
              <div className="relative mx-auto w-64 h-80">
                <div className="absolute inset-0 bg-[#C5A059]/10 rounded-2xl transform rotate-6 group-hover:rotate-0 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[#1a2634]/5 rounded-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-100" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  {couple.groom.photo ? (
                    <img src={couple.groom.photo} alt={couple.groom.name} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 italic text-xs">Poto Kakung</div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-javanese text-3xl text-[#1a2634]">{couple.groom.fullName || couple.groom.name}</h3>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Putra Dalem</p>
                  <p className="text-sm text-slate-600">Bp. {couple.groom.fatherName || "..."} & Ibu {couple.groom.motherName || "..."}</p>
                </div>
              </div>
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8 group"
            >
              <div className="relative mx-auto w-64 h-80">
                <div className="absolute inset-0 bg-[#C5A059]/10 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[#1a2634]/5 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-100" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  {couple.bride.photo ? (
                    <img src={couple.bride.photo} alt={couple.bride.name} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 italic text-xs">Poto Putri</div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-javanese text-3xl text-[#1a2634]">{couple.bride.fullName || couple.bride.name}</h3>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Putri Dalem</p>
                  <p className="text-sm text-slate-600">Bp. {couple.bride.fatherName || "..."} & Ibu {couple.bride.motherName || "..."}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GununganDivider className="bg-[#1a2634]/5" />

      {/* Events Section */}
      <section className="py-32 px-6 bg-[#1a2634] relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#C5A059 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-javanese text-4xl text-white">Adicara Wigati</h2>
            <div className="w-12 h-[2px] bg-[#C5A059] mx-auto" />
            <p className="text-[#E8D5B5]/60 text-xs tracking-[0.3em] uppercase">Sacred Ceremonies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-[#C5A059]/20 p-8 rounded-3xl text-center space-y-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 flex items-center justify-center mx-auto">
                    <Calendar className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="font-javanese text-2xl text-white tracking-wide">{event.title}</h3>
                <div className="space-y-3 font-manrope">
                  <p className="text-[#C5A059] font-bold text-sm tracking-widest uppercase">{event.date ? formatDate(event.date) : "Tanggal Belum Ada"}</p>
                  <p className="text-white/60 text-sm italic">Tabuh {event.startTime} - {event.endTime === "12:00" ? 'Sampun Rampung' : event.endTime} WIB</p>
                  <div className="h-[1px] w-12 bg-white/10 mx-auto" />
                  <p className="text-white font-semibold text-base">{event.locationName}</p>
                  <p className="text-white/50 text-xs leading-relaxed max-w-[240px] mx-auto">{event.address}</p>
                </div>
                {event.googleMapsUrl && (
                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A059] text-[#1a2634] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Peta Lokasi
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-6 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 space-y-4">
              <h2 className="font-javanese text-4xl md:text-5xl text-[#1a2634]">Pepiling Tresna</h2>
              <div className="w-12 h-[2px] bg-[#C5A059] mx-auto" />
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em]">Our Gallery</p>
           </div>

           <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {data.gallery.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative overflow-hidden rounded-2xl group border-2 border-transparent hover:border-[#C5A059]/20 transition-all"
                >
                  <img src={item.url} alt="" className="w-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2634]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Gift Section */}
      {data.gifts && data.gifts.length > 0 && (
        <section className="py-32 px-6 bg-[#1a2634]/5 relative">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="font-javanese text-4xl text-[#1a2634]">Tanda Tresna</h2>
              <div className="w-12 h-[2px] bg-[#C5A059] mx-auto" />
              <p className="text-sm text-slate-500 max-w-sm mx-auto font-manrope">
                "Pandonga restu panjenengan sedaya sampun dados kabegjan dhumateng kita."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.gifts.map((gift) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 rounded-[40px] shadow-sm border border-[#C5A059]/10 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A059]/5 rounded-bl-[100px] transition-all group-hover:w-28 group-hover:h-28" />
                  <div className="space-y-6 relative z-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">{gift.bankName}</p>
                      <h4 className="font-javanese text-2xl text-[#1a2634] italic">{gift.accountHolder}</h4>
                    </div>
                    <div className="bg-[#1a2634]/5 py-5 px-6 rounded-2xl border border-[#1a2634]/5 text-lg font-black tracking-widest text-[#1a2634]/80">
                       {gift.accountNumber}
                    </div>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(gift.accountNumber);
                            alert(`Nomor rekening ${gift.bankName} sampun dipun salin!`);
                        }}
                        className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059] border-b-2 border-[#C5A059]/20 pb-1 hover:border-[#C5A059] transition-all"
                    >
                        Salin Rekening
                    </button>
                    {gift.qrCode && (
                       <div className="pt-4 flex flex-col items-center gap-4">
                          <img src={gift.qrCode} alt="QR Code" className="w-32 h-32 object-contain p-2 bg-white rounded-xl shadow-inner border border-[#C5A059]/10" />
                          <span className="text-[9px] uppercase tracking-widest text-slate-400">Pindhayekaken QR Code</span>
                       </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {data.rsvp?.enabled && (
        <section className="py-32 px-6">
          <div className="max-w-2xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="font-javanese text-4xl text-[#1a2634]">Konfirmasi Rawuh</h2>
              <div className="w-12 h-[2px] bg-[#C5A059] mx-auto" />
              <p className="text-sm text-slate-500 font-manrope italic">
                "Mugi kersaa paring konfirmasi palenggahan panjenengan sedaya."
              </p>
            </div>

            {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-white p-12 rounded-[50px] shadow-2xl shadow-[#C5A059]/10 border border-[#C5A059]/10 space-y-6"
               >
                  <div className="w-20 h-20 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="font-javanese text-3xl text-[#1a2634]">Matur Nuwun!</h3>
                  <p className="text-slate-500 font-manrope">Konfirmasi rawuh panjenengan sampun kita tampi kanthi gumbira.</p>
                  <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest border-b-2 border-[#C5A059]/20 pb-1">Ubah Konfirmasi</button>
               </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 md:p-14 rounded-[50px] shadow-2xl shadow-[#C5A059]/10 border border-[#C5A059]/5 text-left">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Asma Jangkep</label>
                  <input name="name" required disabled={isSubmitting} className="w-full bg-[#1a2634]/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#C5A059] transition-all outline-none font-manrope" placeholder="Asma panjenengan..." />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Nomor WhatsApp</label>
                  <input name="phone" required disabled={isSubmitting} className="w-full bg-[#1a2634]/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#C5A059] transition-all outline-none font-manrope" placeholder="08..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Palenggahan</label>
                    <select name="attendance" className="w-full bg-[#1a2634]/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#C5A059] outline-none font-manrope appearance-none">
                      <option value="Hadir">Insya Allah Rawuh</option>
                      <option value="Tidak Hadir">Mboten Saget Rawuh</option>
                    </select>
                  </div>
                  {data.rsvp.showGuestsCount && (
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Cacah Tamu</label>
                      <select name="guests_count" className="w-full bg-[#1a2634]/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#C5A059] outline-none font-manrope appearance-none">
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Orang</option>)}
                      </select>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Atur Sabda / Doa</label>
                  <textarea name="message" required disabled={isSubmitting} className="w-full bg-[#1a2634]/5 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#C5A059] transition-all outline-none font-manrope min-h-[120px]" placeholder="Paring dungo restu..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#C5A059] text-[#1a2634] rounded-2xl font-black uppercase tracking-[0.4em] text-xs hover:bg-[#B48E44] transition-all shadow-lg active:scale-95 disabled:opacity-50">
                  {isSubmitting ? "Ngirim..." : "Kirim Konfirmasi"}
                </button>
              </form>
            )}

            {data.rsvp.showGuestBook && (
               <div className="pt-20 border-t-2 border-[#C5A059]/10">
                  <h3 className="font-javanese text-3xl text-[#1a2634] mb-12 italic">Atur Sabda Welas Asih</h3>
                  <GuestBook invitationId={id} />
               </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-24 text-center px-6 bg-[#FDFCFB] border-t border-[#C5A059]/10">
        <div className="max-w-xl mx-auto space-y-8">
           <motion.div 
             animate={{ rotate: [0, 5, 0, -5, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="w-16 h-16 mx-auto opacity-20"
           >
              <svg viewBox="0 0 200 200" fill={KROMO_GOLD}><path d="M100 20 L160 160 L40 160 Z" /></svg>
           </motion.div>
           <h2 className="font-javanese text-3xl text-[#C5A059] italic leading-relaxed">
             "Ngaturaken samudraning pangaksama bilih kathah kalepatan."
           </h2>
           <div className="space-y-2 pt-10">
              <p className="text-[9px] uppercase tracking-[0.5em] font-manrope text-slate-400">Atur Memayu Hayuning Bawana</p>
              <p className="text-sm font-black text-[#1a2634] uppercase tracking-widest">{couple.groom.name} & {couple.bride.name}</p>
           </div>
           <p className="text-[10px] text-slate-300 font-manrope pt-12">© {new Date().getFullYear()} KROMO INGGIL by KanvasKita</p>
        </div>
      </footer>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
