import { trustedBy } from "@/lib/data";

export function SocialProof() {
    return (
        <div className="py-10 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5 relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
                    Dipercaya oleh perencana terbaik
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="font-serif text-xl font-bold text-primary dark:text-white">
                        VOGUE <span className="text-xs font-sans font-light">Wedding</span>
                    </span>
                    <span className="font-serif text-xl font-bold text-primary dark:text-white">
                        Bridestory
                    </span>
                    <span className="font-serif text-xl font-bold text-primary dark:text-white">
                        Weddingku
                    </span>
                    <span className="font-serif text-xl font-bold text-primary dark:text-white">
                        Harper's <span className="text-xs font-sans font-light">Bazaar</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
