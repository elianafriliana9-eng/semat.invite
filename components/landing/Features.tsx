import Link from "next/link";
import { Grid, Users, MessageCircle, ArrowRight, Type, CheckCheck } from "lucide-react";

export function Features() {
    return (
        <section className="py-24 bg-background-light dark:bg-background-dark relative z-10" id="features">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-primary dark:text-white mb-4">Fitur Eksklusif</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Dirancang untuk kemudahan dan estetika. Mengatur undangan pernikahan kini seindah hari pernikahannya.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
                    {/* Feature 1: Modular Builder */}
                    <div className="md:col-span-2 row-span-1 bg-white dark:bg-primary/20 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all group relative">
                        <div className="p-8 h-full flex flex-col justify-between z-10 relative">
                            <div>
                                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-primary mb-4">
                                    <Grid className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-serif text-primary dark:text-white mb-2">Modular Builder</h3>
                                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                                    Drag & drop komponen premium semudah menyusun puzzle. Kustomisasi tanpa batas untuk mencerminkan kepribadian Anda.
                                </p>
                            </div>
                            <div className="mt-4">
                                <Link href="/login">
                                    <span className="text-primary dark:text-secondary font-medium text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform cursor-pointer">
                                        Coba Demo <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Decorative UI Preview */}
                        <div className="absolute top-1/2 right-[-50px] w-2/3 h-full bg-background-light dark:bg-background-dark rounded-tl-2xl shadow-xl border-l border-t border-gray-200 dark:border-white/10 p-4 transition-transform group-hover:translate-x-[-10px] duration-500">
                            <div className="flex gap-2 mb-4">
                                <div className="w-full h-24 bg-gray-200 dark:bg-white/5 rounded-lg border-2 border-dashed border-primary/20"></div>
                                <div className="w-full h-24 bg-primary/10 rounded-lg border border-primary/30 flex items-center justify-center text-primary">
                                    <Type className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-gray-200 dark:bg-white/10 rounded"></div>
                                <div className="h-2 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: RSVP Tracker */}
                    <div className="col-span-1 row-span-1 bg-primary text-white rounded-2xl overflow-hidden shadow-lg relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="p-8 h-full flex flex-col">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-serif mb-2">RSVP Tracker</h3>
                            <p className="text-white/70 text-sm mb-6">Pantau kehadiran tamu secara real-time dengan analitik mendalam.</p>

                            {/* Chart Decoration */}
                            <div className="mt-auto flex items-end gap-2 h-24">
                                <div className="w-1/4 h-[40%] bg-white/20 rounded-t-sm animate-pulse"></div>
                                <div className="w-1/4 h-[70%] bg-white/40 rounded-t-sm"></div>
                                <div className="w-1/4 h-[50%] bg-white/30 rounded-t-sm"></div>
                                <div className="w-1/4 h-[90%] bg-secondary rounded-t-sm shadow-[0_0_15px_rgba(243,229,216,0.5)]"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-white/50 mt-2">
                                <span>Pending</span>
                                <span className="text-secondary font-bold">Hadir</span>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: WhatsApp Blast */}
                    <div className="col-span-1 row-span-1 bg-white dark:bg-primary/20 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all group">
                        <div className="p-8 h-full flex flex-col">
                            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-serif text-primary dark:text-white mb-2">WhatsApp Blast</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                                Kirim undangan personal ke ratusan kontak hanya dengan satu klik.
                            </p>

                            {/* Chat Decoration */}
                            <div className="mt-auto bg-green-50 dark:bg-green-900/20 p-3 rounded-lg rounded-tl-none border border-green-100 dark:border-green-900/30">
                                <p className="text-xs text-charcoal dark:text-gray-200 line-clamp-2">
                                    "Halo Om Budi, kami mengundang Anda untuk hadir di pernikahan kami..."
                                </p>
                                <div className="flex justify-end items-center gap-1 mt-2">
                                    <span className="text-[10px] text-gray-400">10:42</span>
                                    <CheckCheck className="w-3 h-3 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 4: Theme Gallery */}
                    <Link href="/themes" className="md:col-span-2 row-span-1 bg-secondary/20 dark:bg-secondary/5 rounded-2xl overflow-hidden border border-secondary/30 dark:border-white/5 shadow-sm hover:shadow-md transition-all relative group cursor-pointer">
                        <div className="absolute inset-0 flex">
                            <div
                                className="w-1/3 h-full bg-cover bg-center border-r border-white/20 grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0jMdhybYnGAOChNikMukWmpRsGWEe0tIUjVuqAt2QV7CrdpnKCqzJgMC_-I-Mwy9eNNbQUgCt8z1c1G8XtAOIzP3Pvp5v2PmCVYXsyV3zcaB9eO1trORPNBeuj-nydVThLTljza5H6bS8lbBx-8ZMIogsBTFnh9nykttyY5uPSOwYGyovB1Uvd3cIM08lCfBzYFRTnHJm24eOj7C76Yzz38eyZOPTu0sRIHCmXuLzJrXFLc0zTh1CH4G4JtnGKKEV5YlDL2abDmU-')" }}
                            >
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">Botanical</div>
                            </div>
                            <div
                                className="w-1/3 h-full bg-cover bg-center border-r border-white/20 grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKsS7qV-tlqhbldGd7_8cndu0_EMknyrlusS59YbKaPPurSRZuuUdUW1ScleqI7vy79BOSwcra0uTVWYNEe6wKTZZEdVre2SPPbnGzpq4Rgy9T7rMf6L483iolwQlAhxMdDGq953aqnnO8E0zR5mpaPcQC1QIuZTX8C5VCwieNlip1eoP_SKNL3L7eVw3Rz80X0hfT-eWOre5QpDs60amqfhvQ0tN9-kIuG0QCr08snhrF4TRQuKyhVdfEHBp_A_OPm5m9gXjCLRQr')" }}
                            >
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">Modern</div>
                            </div>
                            <div
                                className="w-1/3 h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1HFi-5OMxAk0Elj6pmh0oun-dm4lUKbTl-JUIlbJQOd2dsoMEdtQzarvh4axQTuC0h24OybOY4gHGfsnoHwarqhT19eKnr61BfHkQwVGnBQim7bw2wH6zhaRIlUvxjliZfP2nuOL0nAFdgK--a9jaTV1JkBvkT8CwN59qcZ-GmBVmofy00gQ2PunmSm5CrWJ3fUlu1rnc7NnTtIUIcFzKQeyCa4ONuqhnr06bunk9DJy5mF5JPAKWcLJrQUMdHg8K4l7MzpH9p5u2')" }}
                            >
                                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">Classic</div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <div className="text-white flex items-end justify-between w-full">
                                <div>
                                    <h3 className="text-2xl font-serif mb-1">Galeri Tema Premium</h3>
                                    <p className="text-sm opacity-80">Desain kurasi eksklusif siap pakai.</p>
                                </div>
                                <span className="text-sm font-medium flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                                    Jelajahi Galeri →
                                </span>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
