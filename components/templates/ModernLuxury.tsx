import { MapPin, Calendar, Clock, Heart } from "lucide-react";
import React from "react";
import { Countdown } from "@/components/themes/shared/Countdown";

// Google Fonts link should be added in the Layout or HEAD of the page
// <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />

export default function ModernLuxuryTemplate() {
    return (
        <div className="font-serif antialiased min-h-screen flex items-center justify-center p-4 md:p-8 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea0e93367b5?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-fixed relative text-[#171b1a]">
            {/* Backdrop Blur Overlay */}
            <div className="absolute inset-0 bg-[#2d4340]/20 backdrop-blur-md"></div>

            {/* Mobile Container Wrapper */}
            <div className="relative w-full max-w-[400px] bg-[#F9F9F7] dark:bg-[#171b1a] shadow-2xl rounded-3xl overflow-hidden border border-[#2d4340]/10 dark:border-[#2d4340]/30 h-[850px] flex flex-col">
                {/* Status Bar Simulation (Optional Aesthetic Touch) */}
                <div className="absolute top-0 w-full h-6 bg-gradient-to-b from-black/20 to-transparent z-50 pointer-events-none"></div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide scroll-smooth">
                    {/* Hero Section */}
                    <section className="relative h-[65%] w-full flex flex-col justify-end items-center text-center">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                alt="Elegant couple holding hands"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Y9IynjW_BE9WNDXvtTUXokgYEt3YNqrQQerTkAXXubs2m65t3gKDKw9OTDsQwmTAIfaLYyHGGLk1UX_9X8LXOkvCn1r-hY5Gx8KqXE9GD_BRZop_U18dgCuN_rPYW3B8Lzg4s_4PK6i4mIY7dELVncNH8R_qA0HSaCzQ0eymFzq_Kg8QzZOLfVUCLVYb7aDudy2vv__9TX0ox9k_f6aGdPbmPNUIrs2ElTCPHoMGlamu90r2sMV5c_mXLcUdEt_8N4kZkMXkpZWP"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#2d4340]/10 via-[#2d4340]/20 to-[#2d4340]/90"></div>
                        </div>
                        {/* Hero Content */}
                        <div className="relative z-10 w-full px-6 pb-12 pt-20 flex flex-col items-center">
                            <span className="text-white/80 uppercase tracking-[0.3em] text-[10px] mb-4">The Wedding Of</span>
                            <h1 className="text-5xl text-[#D4AF37] font-normal leading-tight mb-2 drop-shadow-md font-serif">
                                Sarah<br /><span className="text-3xl text-white italic">&</span><br />James
                            </h1>
                            <div className="mt-8 flex flex-col items-center space-y-2">
                                <div className="h-px w-12 bg-[#D4AF37]/60"></div>
                                <p className="text-white/90 text-sm tracking-widest uppercase">October 14, 2024</p>
                                <p className="text-white/70 text-xs tracking-wide">Napa Valley, California</p>
                            </div>
                        </div>
                    </section>

                    {/* Save The Date / Countdown Section */}
                    <section className="bg-[#F9F9F7] dark:bg-[#171b1a] py-12 px-6 text-center relative">
                        {/* Decorative Element */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F9F9F7] dark:bg-[#171b1a] p-3 rounded-full border border-[#2d4340]/10">
                            <Heart className="text-[#D4AF37] w-5 h-5 fill-current" />
                        </div>
                        <h2 className="text-[#2d4340] dark:text-gray-200 text-xl font-light italic mb-8 font-serif">Save the Date</h2>

                        {/* Countdown Grid */}
                        <div className="mb-10 relative">
                            <Countdown targetDate="2024-10-14T00:00:00" />
                        </div>

                        <p className="text-[#263836]/70 dark:text-gray-400 text-sm leading-relaxed max-w-[280px] mx-auto font-light">
                            We invite you to share in our joy and celebrate our love amidst the vineyards.
                        </p>
                    </section>

                    {/* Details Section */}
                    <section className="px-8 py-4 mb-8">
                        <div className="bg-white dark:bg-[#212f2d]/50 p-6 rounded-xl border border-[#2d4340]/5 shadow-sm space-y-6">
                            <div className="flex items-start space-x-4">
                                <Calendar className="text-[#2d4340]/40 mt-1 w-5 h-5" />
                                <div>
                                    <h3 className="text-[#263836] dark:text-white text-sm font-semibold uppercase tracking-wider mb-1">When</h3>
                                    <p className="text-[#263836]/70 dark:text-gray-300 text-sm">Saturday, October 14th, 2024</p>
                                    <p className="text-[#263836]/50 dark:text-gray-400 text-xs mt-1">Ceremony starts at 4:00 PM</p>
                                </div>
                            </div>
                            <div className="h-px w-full bg-[#2d4340]/5 dark:bg-white/5"></div>
                            <div className="flex items-start space-x-4">
                                <MapPin className="text-[#2d4340]/40 mt-1 w-5 h-5" />
                                <div>
                                    <h3 className="text-[#263836] dark:text-white text-sm font-semibold uppercase tracking-wider mb-1">Where</h3>
                                    <p className="text-[#263836]/70 dark:text-gray-300 text-sm">The Glass House Estate</p>
                                    <p className="text-[#263836]/50 dark:text-gray-400 text-xs mt-1">123 Vineyard Lane, St. Helena, CA</p>
                                    {/* Small Map Placeholder */}
                                    <div className="mt-3 w-full h-24 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                                        <img
                                            alt="Map view"
                                            className="w-full h-full object-cover opacity-80 grayscale"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuFGxQgJljmv0wiYztuyTaf-nk2ZFvNLP-c83bKLKJKM-pN-klAQwqq47h2IBM3ScSeTaRo5JdPkuXXoPYBW_mTOeFibgkyjdeG_e6kyUjE08Cs9MoyOcCPE9y261999qLHrh2eVvDsfbq8s1KSQpeINWBMd0PQwDr076JmlQQQKNZMu1FkXIhKjKdqOEwNWiYTG91K50pFVt8QBzn0m3bVQi6mZce00WKZqvtIkqPGRjOCogPR1vOKEXtST7-9kcnyk3Zmj_p_6XZ"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs bg-white/90 dark:bg-black/70 px-2 py-1 rounded shadow text-[#2d4340]">View Map</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* RSVP Section */}
                    <section className="px-6 pb-16">
                        <div className="text-center mb-8">
                            <span className="text-xs tracking-[0.2em] text-[#D4AF37] uppercase mb-2 block">Répondez s'il vous plaît</span>
                            <h2 className="text-2xl text-[#2d4340] dark:text-white font-serif">Join Us</h2>
                        </div>
                        <form className="space-y-8">
                            {/* Name Input */}
                            <div className="group relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder=" "
                                    className="peer w-full border-b border-[#2d4340]/20 dark:border-white/20 bg-transparent py-2 text-[#212f2d] dark:text-white focus:border-[#D4AF37] focus:outline-none placeholder-transparent transition-colors duration-300 focus:ring-0"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-0 -top-3.5 text-xs text-[#2d4340]/50 dark:text-white/50 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2d4340]/40 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#D4AF37]"
                                >
                                    Full Name
                                </label>
                            </div>

                            {/* Attendance Radio */}
                            <div className="space-y-3">
                                <span className="text-xs uppercase tracking-widest text-[#2d4340]/50 dark:text-white/50 block mb-2">Will you be attending?</span>
                                <div className="flex space-x-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input type="radio" name="attendance" value="yes" className="peer sr-only" />
                                        <div className="rounded-lg border border-[#2d4340]/10 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-center transition-all peer-checked:border-[#D4AF37] peer-checked:bg-[#2d4340]/5 dark:peer-checked:bg-[#D4AF37]/10">
                                            <span className="block text-sm text-[#263836] dark:text-gray-200">Joyfully Accept</span>
                                        </div>
                                    </label>
                                    <label className="flex-1 cursor-pointer">
                                        <input type="radio" name="attendance" value="no" className="peer sr-only" />
                                        <div className="rounded-lg border border-[#2d4340]/10 dark:border-white/10 bg-white dark:bg-white/5 p-3 text-center transition-all peer-checked:border-[#2d4340] peer-checked:bg-[#2d4340]/5 dark:peer-checked:bg-[#2d4340]/20">
                                            <span className="block text-sm text-[#263836] dark:text-gray-200">Regretfully Decline</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Guest Count */}
                            <div className="group relative">
                                <select
                                    id="guests"
                                    name="guests"
                                    className="w-full border-b border-[#2d4340]/20 dark:border-white/20 bg-transparent py-2 text-[#212f2d] dark:text-white focus:border-[#D4AF37] focus:outline-none appearance-none cursor-pointer focus:ring-0"
                                >
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                </select>
                                <div className="absolute right-0 top-2 pointer-events-none text-[#2d4340]/40 dark:text-white/40">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </div>
                                <label htmlFor="guests" className="absolute left-0 -top-3.5 text-xs text-[#2d4340]/50 dark:text-white/50">Total Guests</label>
                            </div>

                            {/* Dietary Requirements */}
                            <div className="group relative mt-4">
                                <input
                                    type="text"
                                    id="diet"
                                    name="diet"
                                    placeholder=" "
                                    className="peer w-full border-b border-[#2d4340]/20 dark:border-white/20 bg-transparent py-2 text-[#212f2d] dark:text-white focus:border-[#D4AF37] focus:outline-none placeholder-transparent transition-colors duration-300 focus:ring-0"
                                />
                                <label
                                    htmlFor="diet"
                                    className="absolute left-0 -top-3.5 text-xs text-[#2d4340]/50 dark:text-white/50 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#2d4340]/40 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#D4AF37]"
                                >
                                    Dietary Requirements (Optional)
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="button"
                                    className="w-full bg-[#2d4340] hover:bg-[#263836] text-white dark:bg-[#D4AF37] dark:text-[#212f2d] py-4 rounded-lg uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-[0.99]"
                                >
                                    Send RSVP
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="mt-12 text-center pb-8">
                            <p className="text-[#2d4340]/40 dark:text-white/30 text-[10px] uppercase tracking-widest">KanvasKita</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
