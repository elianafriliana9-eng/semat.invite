"use client";

import { ThemeProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Countdown } from "./shared/Countdown";
import { GuestBook } from "./shared/GuestBook";
import { useBuilderStore } from "@/store/builderStore";

export default function ModernLuxury({ data, id, isPreview, guestName }: ThemeProps) {
  const { couple, events } = data;
  const { isMusicPlaying, setMusicPlaying } = useBuilderStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get primary event date for countdown
  const primaryEvent = events[0];
  const countdownTarget = primaryEvent?.date && primaryEvent?.startTime
    ? `${primaryEvent.date}T${primaryEvent.startTime}:00`
    : null;

  // Music Logic
  const [isOpen, setIsOpen] = useState(isPreview || false);
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
      } else if (audioRef.current.src !== data.music.url) {
        audioRef.current.pause();
        audioRef.current.src = data.music.url;
      }

      if (isMusicPlaying) {
        audioRef.current.play().catch(() => {
           // Silently handle autoplay block
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
      alert("Mode Preview: Konfirmasi tidak disimpan ke database.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const attendance = formData.get("attendance") as string;
    const guests_count = parseInt(formData.get("guests_count") as string || "1");
    const message = formData.get("message") as string;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("rsvps").insert({
        invitation_id: id,
        name,
        phone,
        attendance,
        guests_count,
        message
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

  return (
    <div className={`min-h-screen bg-[#FDFCFB] text-[#2D423F] font-serif overflow-x-hidden select-none relative ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`${isPreview ? 'absolute' : 'fixed'} inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFCFB] px-6 text-center`}
          >
            {/* Background Texture/Pattern for Splash */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 relative"
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#A89A82] font-semibold block">The Wedding of</span>
                <h1 className="text-5xl md:text-7xl font-light italic text-[#2D423F] leading-tight">
                  {couple.groom.name} & {couple.bride.name}
                </h1>
              </div>

              {guestName && (
                <div className="space-y-2 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#A89A82] font-medium">Kepada Yth:</p>
                  <h3 className="text-2xl font-light italic">{guestName}</h3>
                </div>
              )}

              <div className="w-12 h-[1px] bg-[#A89A82]/30 mx-auto" />

              <button
                onClick={handleOpen}
                className="group relative px-10 py-4 bg-[#2D423F] text-[#F3E5D8] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
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

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-xs uppercase tracking-[0.6em] font-sans text-[#A89A82] mb-4 block">The Wedding of</span>
            <h1 className="text-4xl md:text-6xl font-light leading-none tracking-tight">
              {couple.groom.name || "Groom"} <br />
              <span className="text-3xl md:text-5xl font-serif text-[#A89A82] italic opacity-40">&</span> <br />
              {couple.bride.name || "Bride"}
            </h1>
          </motion.div>

          <div className="h-[1px] w-20 bg-[#A89A82] mx-auto opacity-50"></div>

          <p className="font-sans text-sm tracking-[0.5em] uppercase">
            {events[0]?.date ? new Date(events[0].date).toLocaleDateString('id-ID', { dateStyle: 'long' }) : 'Save the Date'}
          </p>

          <div className="pt-4">
            {countdownTarget && <Countdown targetDate={countdownTarget} />}
          </div>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="grid md:grid-cols-[1fr,60px,1fr] gap-12 items-center">

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative mx-auto w-64 h-64 group">
              <div className="absolute -inset-4 border border-[#A89A82]/10 rounded-full"></div>
              <div className="absolute inset-0 border border-[#A89A82]/30 rounded-full"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl bg-[#F8F6F3]">
                {couple.groom.photo ? (
                  <img
                    src={couple.groom.photo}
                    alt={couple.groom.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#A89A82]/30 text-xs italic">Photo of Groom</div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-light italic text-[#2D423F]">
                {couple.groom.fullName || couple.groom.name || "Nama Pengantin Pria"}
              </h2>
              <div className="space-y-2">
                <p className="font-sans text-[11px] tracking-[0.2em] text-[#A89A82] uppercase font-bold">Putra Dari</p>
                <p className="font-sans text-sm text-[#2D423F]/70 leading-relaxed italic">
                  Bapak {couple.groom.fatherName || "..."} <br />
                  & Ibu {couple.groom.motherName || "..."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider "&" */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#A89A82]/40 to-transparent"></div>
            <span className="text-4xl font-light italic text-[#A89A82] opacity-40">&</span>
            <div className="w-[1px] h-20 bg-gradient-to-t from-transparent via-[#A89A82]/40 to-transparent"></div>
          </div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative mx-auto w-64 h-64 group">
              <div className="absolute -inset-4 border border-[#A89A82]/10 rounded-full"></div>
              <div className="absolute inset-0 border border-[#A89A82]/30 rounded-full"></div>
              <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl bg-[#F8F6F3]">
                {couple.bride.photo ? (
                  <img
                    src={couple.bride.photo}
                    alt={couple.bride.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#A89A82]/30 text-xs italic">Photo of Bride</div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-light italic text-[#2D423F]">
                {couple.bride.fullName || couple.bride.name || "Nama Pengantin Wanita"}
              </h2>
              <div className="space-y-2">
                <p className="font-sans text-[11px] tracking-[0.2em] text-[#A89A82] uppercase font-bold">Putri Dari</p>
                <p className="font-sans text-sm text-[#2D423F]/70 leading-relaxed italic">
                  Bapak {couple.bride.fatherName || "..."} <br />
                  & Ibu {couple.bride.motherName || "..."}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Our Story Section */}
      {data.story && data.story.length > 0 && (
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#A89A82] font-semibold mb-4 block">Our Journey</span>
              <h2 className="text-5xl font-light italic text-[#2D423F]">Kisah Cinta Kami</h2>
              <div className="h-[1px] w-24 bg-[#A89A82] mx-auto mt-8 opacity-30"></div>
            </motion.div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#A89A82]/30 to-transparent -translate-x-1/2" />

              <div className="space-y-20">
                {data.story.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                      <div className="space-y-4">
                        {item.image && (
                          <div className={`aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white ${idx % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-[300px]`}>
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <span className="font-sans text-[10px] uppercase tracking-widest text-[#A89A82] font-bold">{item.date}</span>
                          <h3 className="text-2xl font-light italic text-[#2D423F]">{item.title}</h3>
                          <p className="font-sans text-sm text-[#243532]/70 leading-relaxed font-light">{item.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FDFCFB] border-2 border-[#A89A82] rounded-full z-10" />

                    {/* Empty Space for the other side */}
                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      <section className="py-24 px-6 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-light mb-4 text-[#2D423F]">Waktu & Tempat</h2>
            <div className="h-[1px] w-20 bg-[#A89A82] mx-auto opacity-30"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 shadow-sm border border-[#A89A82]/10 text-center space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-2xl font-light text-[#2D423F]">{event.title}</h3>
                  <div className="h-[1px] w-12 bg-[#A89A82] mx-auto opacity-20"></div>
                </div>

                <div className="font-sans text-sm tracking-widest space-y-1 uppercase text-[#2D423F]/80">
                  <p className="font-bold">{event.date ? new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal Belum Ada'}</p>
                  <p className="text-gray-500">Pukul {event.startTime} - {event.endTime === '12:00' ? 'Selesai' : event.endTime} WIB</p>
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-lg text-[#2D423F] leading-tight">{event.locationName || 'Nama Lokasi'}</p>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">{event.address || 'Alamat lengkap akan muncul di sini.'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#A89A82] block mb-4 font-bold">Memories</span>
            <h2 className="text-5xl font-light mb-4 text-[#2D423F] italic">Our Happy Moments</h2>
            <div className="h-[1px] w-24 bg-[#A89A82] mx-auto mt-8 opacity-30"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallery.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-[#A89A82]/10 rounded-2xl flex flex-col items-center justify-center opacity-30">
                <p className="font-sans text-sm italic">Gallery will appear here when you add photos.</p>
              </div>
            )}
            {data.gallery.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`overflow-hidden bg-gray-100 rounded-lg ${idx % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'
                  }`}
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Gift Section */}
      {data.gifts && data.gifts.length > 0 && (
        <section className="py-24 px-6 bg-[#FDFCFB]">
          <div className="max-w-4xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-light mb-4 text-[#2D423F] italic">Kado Digital</h2>
              <div className="h-[1px] w-20 bg-[#A89A82] mx-auto opacity-30 mb-6"></div>
              <p className="font-sans text-sm text-gray-500 max-w-sm mx-auto">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat disalurkan melalui:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.gifts.map((gift) => (
                <div
                  key={gift.id}
                  className="bg-white p-10 shadow-sm border border-[#A89A82]/10 text-center space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#A89A82] font-bold">{gift.bankName}</span>
                    <h3 className="text-2xl font-light text-[#2D423F] italic">{gift.accountHolder}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#F8F6F3] py-4 px-6 rounded-lg text-lg font-sans tracking-wider border border-[#A89A82]/5 text-[#2D423F]">
                      {gift.accountNumber}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(gift.accountNumber);
                        alert(`Nomor rekening ${gift.bankName} berhasil disalin!`);
                      }}
                      className="text-[10px] uppercase tracking-widest text-[#A89A82] font-semibold border-b border-[#A89A82]/20 pb-1"
                    >
                      Salin Nomor Rekening
                    </button>
                  </div>

                  {gift.qrCode && (
                    <div className="pt-4 flex flex-col items-center gap-4">
                      <div className="w-32 h-32 p-2 bg-white border border-[#A89A82]/10 rounded-xl">
                        <img src={gift.qrCode} alt="QR Code" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">Scan QR untuk donasi</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {data.rsvp?.enabled && (
        <section className="py-24 px-6 bg-[#F8F6F3]">
          <div className="max-w-xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-light mb-4 text-[#2D423F] italic">RSVP</h2>
              <div className="h-[1px] w-20 bg-[#A89A82] mx-auto opacity-30 mb-6"></div>
              <p className="font-sans text-sm text-gray-500 max-w-sm mx-auto">
                Merupakan suatu kehormatan bagi kami jika Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.
              </p>
            </motion.div>

            {isSubmitted ? (
              <div className="bg-white p-12 shadow-sm border border-[#A89A82]/10 text-center space-y-4">
                <div className="w-16 h-16 bg-[#2D423F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#F3E5D8] text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-light text-[#2D423F] italic">Terima Kasih!</h3>
                <p className="font-sans text-sm text-gray-500">Konfirmasi kehadiran Anda telah kami terima.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[10px] uppercase tracking-widest text-[#A89A82] font-semibold border-b border-[#A89A82]/20 pb-1"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            ) : (
              <form
                className="space-y-6 bg-white p-8 md:p-12 shadow-sm border border-[#A89A82]/10"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#A89A82] font-semibold">Nama Lengkap</label>
                  <input
                    name="name"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-[#FDFCFB] border-b border-[#A89A82]/20 py-3 px-1 outline-none focus:border-[#2D423F] font-sans transition-all disabled:opacity-50"
                    placeholder="Masukkan nama Anda..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#A89A82] font-semibold">Nomor WhatsApp</label>
                  <input
                    name="phone"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-[#FDFCFB] border-b border-[#A89A82]/20 py-3 px-1 outline-none focus:border-[#2D423F] font-sans transition-all disabled:opacity-50"
                    placeholder="Contoh: 08123456789"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-[#A89A82] font-semibold">Konfirmasi Kehadiran</label>
                  <div className="flex gap-4">
                    {['Hadir', 'Tidak Hadir'].map((status) => (
                      <label key={status} className="flex-1 cursor-pointer">
                        <input type="radio" name="attendance" value={status} className="hidden peer" defaultChecked={status === 'Hadir'} disabled={isSubmitting} />
                        <div className="text-center py-3 border border-[#A89A82]/10 font-sans text-sm peer-checked:bg-[#2D423F] peer-checked:text-[#F3E5D8] transition-all peer-disabled:opacity-50 text-[#2D423F]">
                          {status}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {data.rsvp.showGuestsCount && (
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#A89A82] font-semibold">Jumlah Tamu</label>
                    <select name="guests_count" disabled={isSubmitting} className="w-full bg-[#FDFCFB] border-b border-[#A89A82]/20 py-3 px-1 outline-none focus:border-[#2D423F] font-sans disabled:opacity-50">
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Orang</option>)}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#A89A82] font-semibold">Ucapan & Doa</label>
                  <textarea
                    name="message"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-[#FDFCFB] border-b border-[#A89A82]/20 py-3 px-1 outline-none focus:border-[#2D423F] font-sans min-h-[100px] resize-none disabled:opacity-50"
                    placeholder="Berikan ucapan selamat Anda..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2D423F] text-[#F3E5D8] py-4 font-sans text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#1A2B29] transition-all shadow-md group disabled:opacity-50"
                >
                  {isSubmitting ? "Mengirim..." : (
                    <>
                      Kirim Konfirmasi
                      <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Guest Book Section */}
            {data.rsvp.showGuestBook && (
              <div className="pt-12 border-t border-[#A89A82]/10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-[#2D423F] italic mb-2">Ucapan & Doa</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#A89A82]">Konfirmasi Kehadiran Tamu</p>
                </div>
                <GuestBook invitationId={id} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Placeholder for other sections */}
      <section className="py-20 text-center opacity-30">
        <p className="italic font-sans text-sm">More sections coming soon...</p>
      </section>
    </div>
  );
}
