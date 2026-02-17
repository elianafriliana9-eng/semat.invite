import { Facebook, Instagram, Mail, Sparkles } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary pt-16 pb-8 border-t border-white/5 relative z-10 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="text-secondary w-6 h-6" />
                            <span className="font-serif font-bold text-xl">Semat.invite</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Platform undangan pernikahan digital yang mengutamakan estetika dan kemudahan penggunaan.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif mb-6 text-lg">Produk</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-secondary transition-colors">Tema Undangan</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Fitur RSVP</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">WhatsApp Sender</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Harga</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif mb-6 text-lg">Perusahaan</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-secondary transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Karir</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Kontak</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif mb-6 text-lg">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-secondary transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Kebijakan Privasi</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">© 2024 Semat.invite. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs text-gray-400">System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
