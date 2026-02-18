"use client";

import Link from "next/link";
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Edit,
    FileText,
    RotateCcw,
    LogOut,
    Settings,
    User,
    ClipboardList,
    Loader2,
    Eye,
    Trash2
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [invitations, setInvitations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                fetchInvitations(user.id);
                fetchProfile(user.id);
            } else {
                router.push('/login'); // Redirect to login if no user
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

            // Optimistic update
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

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans transition-colors duration-200">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white dark:bg-[#202423] border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">S</div>
                                <span className="font-semibold text-xl tracking-tight text-primary dark:text-gray-100">Semat.invite</span>
                            </Link>
                        </div>
                        {/* User Profile & Actions */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end mr-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Halo, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Free Plan</span>
                            </div>
                            <div className="relative group">
                                <button className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        {user?.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#202423] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 border border-gray-100 dark:border-gray-800">
                                    {userProfile?.role === 'admin' && (
                                        <Link href="/dashboard/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-primary font-bold hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <Settings className="w-4 h-4" /> Admin Panel
                                        </Link>
                                    )}
                                    <Link href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <User className="w-4 h-4" /> Your Profile
                                    </Link>
                                    <Link href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <Settings className="w-4 h-4" /> Settings
                                    </Link>
                                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                    <button onClick={handleSignOut} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <LogOut className="w-4 h-4" /> Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Toolbar: Search & Filter */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Workspace</h1>
                        <div className="flex w-full sm:w-auto gap-3">
                            <div className="relative w-full sm:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="text-gray-400 w-4 h-4" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-[#202423] text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                                    placeholder="Search projects..."
                                    type="text"
                                />
                            </div>
                            <button className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-[#202423] hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Grid System */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {/* New Project Card */}
                        <button
                            onClick={handleCreateNew}
                            className="group relative flex flex-col items-center justify-center h-full min-h-[320px] rounded-xl border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center transition-all duration-300 mb-4">
                                <Plus className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">New Project</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create a new invitation</p>
                        </button>

                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-white dark:bg-[#202423] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse h-[320px]">
                                    <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-t-xl"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                                        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded mt-4"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            invitations.map((inv) => (
                                <div key={inv.id} className="group bg-white dark:bg-[#202423] rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full min-h-[320px]">
                                    {/* Thumbnail */}
                                    <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden group-hover:opacity-95 transition-opacity">
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
                                            // Try theme thumbnail, then first gallery image, then fallback icon
                                            const imgSrc = thumb?.src || inv.content?.gallery?.[0]?.url;
                                            const imgAlt = thumb?.alt || 'Invitation Preview';
                                            return imgSrc ? (
                                                <img alt={imgAlt} className="w-full h-full object-cover" src={imgSrc} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <ImageIcon className="w-12 h-12 opacity-20" />
                                                </div>
                                            );
                                        })()}
                                        <div className="absolute top-3 right-3">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inv.is_published ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                                {inv.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Content */}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate max-w-[150px]" title={inv.slug}>
                                                    {inv.slug}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        Updated {new Date(inv.updated_at).toLocaleDateString()}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                        <Eye className="w-3 h-3" />
                                                        <span>{inv.views_count || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative group/menu">
                                                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                                {/* Card Dropdown Menu */}
                                                <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-[#202423] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 transform origin-top-right z-30 border border-gray-100 dark:border-gray-800">
                                                    <button
                                                        onClick={() => handleDelete(inv.id, inv.slug)}
                                                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" /> Delete Project
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-auto pt-4 flex gap-2">
                                            <Link
                                                href={`/dashboard/builder?id=${inv.id}`}
                                                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-[#3a5652] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                                            >
                                                <Edit className="w-3.5 h-3.5 mr-1.5" />
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/dashboard/rsvp/${inv.id}`}
                                                className="inline-flex justify-center items-center px-4 py-2 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-[#202423] hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
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

                    {!isLoading && invitations.length === 0 && (
                        <div className="mt-20 text-center py-12">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-10 h-10 text-gray-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Belum ada proyek</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                Mulai buat undangan digital pertama Anda dengan klik tombol "New Project" di atas.
                            </p>
                        </div>
                    )}

                    {/* Footer area */}
                    {invitations.length > 0 && (
                        <div className="mt-12 text-center">
                            <p className="text-sm text-gray-400 dark:text-gray-600">Showing {invitations.length} projects</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function ImageIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    )
}
