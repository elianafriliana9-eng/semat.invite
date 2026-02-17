import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="py-20 relative z-10">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
                    {/* Background Blobs */}
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Siap merangkai kisahmu?</h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                        Buat undangan digital pertamamu secara gratis hari ini. Tidak perlu kartu kredit.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-secondary text-primary hover:bg-white text-base py-6 px-8 rounded-full font-semibold shadow-lg shadow-black/20">
                            Buat Undangan Sekarang
                        </Button>
                        <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white text-base py-6 px-8 rounded-full">
                            Lihat Contoh
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
