"use client";

import Link from "next/link";
import {
    Search,
    Plus,
    MoreVertical,
    Edit,
    FileText,
    LogOut,
    Settings,
    User,
    ClipboardList,
    Loader2,
    Eye,
    Trash2,
    Sparkles,
    Crown
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [invitations, setInvitations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                fetchInvitations(user.id);
                fetchProfile(user.id);
            } else {
                router.push('/login');
            }
        };
        getSession();
    }, []);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (!error && data) {
            setUserProfile(data);
        }
    };

    const fetchInvitations = async (userId: string) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('invitations')
                .select('*')
                .eq('user_id', userId)
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setInvitations(data || []);
        } catch (error: any) {
            console.error('Error fetching invitations:', error.message || error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, slug: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus undangan "${slug}"? Tindakan ini tidak dapat dibatalkan.`)) {
            return;
        }

        try {
            const { error } = await supabase
                .from('invitations')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setInvitations(prev => prev.filter(inv => inv.id !== id));
        } catch (error: any) {
            console.error('Error deleting invitation:', error.message || error);
            alert('Gagal menghapus undangan.');
        }
    };

    const handleCreateNew = () => {
        router.push('/dashboard/builder');
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    const filteredInvitations = invitations.filter(inv =>
        inv.slug?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display selection:bg-primary/30 transition-colors duration-300">
            {/* Decorative Background Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-secondary/30 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-screen"></div>
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 glass-panel border-b-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="text-primary dark:text-white w-5 h-5" />
                            <span className="font-serif font-bold text-xl text-primary dark:text-white tracking-tight">
                                Kanvas<span className="text-primary/60 dark:text-white/60">Kita</span>
                            </span>
                        </Link>

                        {/* User Profile & Actions */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end mr-1">
                                <span className="text-sm font-medium text-primary dark:text-white">{displayName}</span>
                                <span className="text-[10px] font-semibold text-primary/50 dark:text-white/50 uppercase tracking-wider">Free Plan</span>
                            </div>
                            <div className="relative group">
                                <button className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
                                    <div className="h-10 w-10 rounded-full bg-secondary/60 dark:bg-white/10 flex items-center justify-center border-2 border-white/60 dark:border-white/20 overflow-hidden shadow-sm">
                                        {user?.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-primary dark:text-white" />
                                        )}
                                    </div>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                                    {userProfile?.role === 'admin' && (
                                        <Link href="/dashboard/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary dark:text-white font-semibold hover:bg-primary/5 dark:hover:bg-white/5 transition-colors">
                                            <Crown className="w-4 h-4" /> Admin Panel
                                        </Link>
                                    )}
                                    <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary/80 dark:text-white/80 hover:bg-primary/5 dark:hover:bg-white/5 transition-colors">
                                        <User className="w-4 h-4" /> Profil Saya
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary/80 dark:text-white/80 hover:bg-primary/5 dark:hover:bg-white/5 transition-colors">
                                        <Settings className="w-4 h-4" /> Pengaturan
                                    </Link>
                                    <div className="border-t border-primary/10 dark:border-white/10 my-1.5 mx-3"></div>
                                    <button onClick={handleSignOut} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                        <LogOut className="w-4 h-4" /> Keluar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                    {/* Hero Header Section */}
                    <div className="mb-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-white/10 text-primary dark:text-white text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-primary dark:bg-secondary mr-2"></span>
                            Workspace
                        </div>
                        <h1 className="font-serif text-3xl lg:text-4xl font-medium text-primary dark:text-white tracking-tight mb-2">
                            Selamat datang, {displayName}
                        </h1>
                        <p className="text-primary/60 dark:text-white/60 font-light max-w-lg">
                            Kelola dan buat undangan digital premium Anda. Setiap desain dikurasi dengan sentuhan elegan.
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div className="relative w-full sm:w-72">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-primary/40 dark:text-white/40 w-4 h-4" />
                            </div>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-11 pr-4 py-2.5 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-full text-primary dark:text-white placeholder-primary/40 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 text-sm transition-all duration-300 shadow-sm"
                                placeholder="Cari undangan..."
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Grid System */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {/* New Project Card */}
                        <button
                            onClick={handleCreateNew}
                            className="group relative flex flex-col items-center justify-center h-full min-h-[360px] rounded-2xl border-2 border-dashed border-primary/20 dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 hover:bg-white/50 dark:hover:bg-white/5 backdrop-blur-sm transition-all duration-500 focus:outline-none"
                        >
                            <div className="w-16 h-16 rounded-full bg-secondary/50 dark:bg-white/10 group-hover:bg-primary group-hover:scale-110 text-primary group-hover:text-white flex items-center justify-center transition-all duration-500 mb-4 shadow-sm">
                                <Plus className="w-7 h-7" />
                            </div>
                            <h3 className="font-serif text-lg font-medium text-primary dark:text-white group-hover:text-primary transition-colors">Proyek Baru</h3>
                            <p className="text-xs text-primary/50 dark:text-white/50 mt-1 font-light">Mulai buat undangan baru</p>
                        </button>

                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="glass-panel rounded-2xl animate-pulse h-[360px] overflow-hidden">
                                    <div className="h-52 bg-secondary/30 dark:bg-white/5"></div>
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-secondary/40 dark:bg-white/10 rounded-full w-3/4"></div>
                                        <div className="h-3 bg-secondary/30 dark:bg-white/5 rounded-full w-1/2"></div>
                                        <div className="h-10 bg-secondary/30 dark:bg-white/5 rounded-full mt-4"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            filteredInvitations.map((inv) => (
                                <div key={inv.id} className="group glass-panel rounded-2xl hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full min-h-[360px] hover:-translate-y-1">
                                    {/* Thumbnail */}
                                    <div className="relative h-52 bg-secondary/20 dark:bg-white/5 overflow-hidden">
                                        {(() => {
                                            const themeId = inv.content?.themeId || inv.theme_id || '';
                                            const themeThumbnails: Record<string, { src: string; alt: string }> = {
                                                'modern-luxury': {
                                                    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqkMW8Hy_JZ7ThmGf_gr2Jakw1-NPcXqXNe6Etjlo15ecZO_MEzXhav-WbLk8PSXwfMhUsHM2_bmWihaw86gouTtnjgSySpOZ_7MoEOaKd9WnARKTN8urvdIK-qOaTsjynTJvbBxT_BINJs5XaJ6YIDELxl9dj856_Ui5Igr4N_HxOCeoHCZdSehl82xw4aX7nsBByJftnOLcbvn_Z-oxoyHAFfTdlN-Mwv3tlpVgekZW-aqRzwQeSqYMnGchIWcCYLDBYXg9okMuE',
                                                    alt: 'Modern Luxury Theme',
                                                },
                                                'nusa-organic': {
                                                    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTk7qizA7D9mGvbfYK_RpXz4lwtcA71Lrc0W780INbS-yOUvC8i6vLyJzI5R5ez75YUWmIw6VauGjbjpnZGcqgmBkpWu5Y0I8QpVUAtTnfWbCKdknDO7VwC74dooRhAvmSU4AQuY9eUpKVG1e3jltDtP5UIDFmwaG5bcoSzgRaHOGD2yfaQC8_GUGCoFiXlqNDB5rtHOdIsafseO0miaASCFdKIdgrFyBZnTYjK8gnbzaTfdu-M4TIDlvlf7yIYzVFOzQE6RelTCI',
                                                    alt: 'Nusa Organic Theme',
                                                },
                                            };
                                            const thumb = themeThumbnails[themeId];
                                            const imgSrc = thumb?.src || inv.content?.gallery?.[0]?.url;
                                            const imgAlt = thumb?.alt || 'Invitation Preview';
                                            return imgSrc ? (
                                                <img alt={imgAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={imgSrc} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-full bg-secondary/30 dark:bg-white/10 flex items-center justify-center">
                                                        <Sparkles className="w-7 h-7 text-primary/30 dark:text-white/20" />
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        {/* Status badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${inv.is_published
                                                ? 'bg-primary/90 text-white shadow-sm'
                                                : 'bg-white/80 dark:bg-white/10 text-primary/70 dark:text-white/70 border border-white/40 dark:border-white/10'
                                                }`}>
                                                {inv.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-serif text-base font-medium text-primary dark:text-white truncate" title={inv.slug}>
                                                    {inv.slug}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <p className="text-[11px] text-primary/40 dark:text-white/40 font-light">
                                                        {new Date(inv.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-[11px] text-primary/40 dark:text-white/40">
                                                        <Eye className="w-3 h-3" />
                                                        <span>{inv.views_count || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Menu */}
                                            <div className="relative group/menu">
                                                <button className="text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white p-1.5 rounded-full hover:bg-primary/5 dark:hover:bg-white/10 transition-all">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                                <div className="absolute right-0 top-full mt-1 w-40 glass-panel rounded-xl py-1.5 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 transform origin-top-right z-30">
                                                    <button
                                                        onClick={() => handleDelete(inv.id, inv.slug)}
                                                        className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" /> Hapus Proyek
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-auto pt-4 flex gap-2">
                                            <Link
                                                href={`/dashboard/builder?id=${inv.id}`}
                                                className="flex-1 inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium rounded-full text-white bg-primary hover:bg-primary-light shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                            >
                                                <Edit className="w-3.5 h-3.5 mr-1.5" />
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/dashboard/rsvp/${inv.id}`}
                                                className="inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium rounded-full text-primary dark:text-white bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-white/10 hover:bg-white dark:hover:bg-white/20 shadow-sm transition-all duration-300"
                                                title="Lihat RSVP"
                                            >
                                                <ClipboardList className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Empty State */}
                    {!isLoading && invitations.length === 0 && (
                        <div className="mt-16 text-center py-12">
                            <div className="w-24 h-24 bg-secondary/30 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-10 h-10 text-primary/30 dark:text-white/20" />
                            </div>
                            <h2 className="font-serif text-2xl font-medium text-primary dark:text-white mb-2">Belum ada proyek</h2>
                            <p className="text-primary/50 dark:text-white/50 max-w-sm mx-auto font-light leading-relaxed">
                                Mulai buat undangan digital pertama Anda. Klik tombol &ldquo;Proyek Baru&rdquo; untuk memulai.
                            </p>
                        </div>
                    )}

                    {/* Footer area */}
                    {filteredInvitations.length > 0 && (
                        <div className="mt-12 text-center">
                            <p className="text-xs text-primary/30 dark:text-white/20 font-light tracking-wider uppercase">
                                {filteredInvitations.length} proyek ditemukan
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center border-t border-primary/5 dark:border-white/5">
                <p className="text-[11px] text-primary/30 dark:text-white/20 font-light tracking-wider">
                    &copy; {new Date().getFullYear()} KanvasKita &mdash; Elegan dalam Sematan, Abadi dalam Ingatan
                </p>
            </footer>
        </div>
    );
}
