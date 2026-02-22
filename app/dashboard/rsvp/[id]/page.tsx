"use client";

import { RSVPTable } from "@/components/dashboard/RSVPTable";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowLeft, User, Settings, LogOut, Crown, Download, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { utils, writeFile } from "xlsx";

export default function RSVPDashboardPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [rsvps, setRsvps] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRsvps = async () => {
        if (!id) return;
        setIsLoading(true);

        try {
            const { data, error } = await supabase
                .from('rsvps')
                .select('*')
                .eq('invitation_id', id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRsvps(data || []);
        } catch (error) {
            console.error('Error fetching RSVPs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const exportToExcel = () => {
        if (rsvps.length === 0) return;

        const data = rsvps.map(rsvp => ({
            "Nama Tamu": rsvp.name,
            "Status Kehadiran": rsvp.attendance === 'yes' || rsvp.attendance === 'Hadir' ? 'Hadir' : 'Tidak Hadir',
            "Jumlah Tamu": rsvp.guests_count || 1,
            "Telepon": rsvp.phone || '-',
            "Pesan/Ucapan": rsvp.message || '-',
            "Check-in": rsvp.is_checked_in ? 'Ya' : 'Tidak',
            "Waktu Konfirmasi": new Date(rsvp.created_at).toLocaleString('id-ID')
        }));

        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "RSVP List");

        const wscols = [
            { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 40 }, { wch: 10 }, { wch: 25 },
        ];
        worksheet["!cols"] = wscols;

        writeFile(workbook, `RSVP_${id}.xlsx`);
    };

    useEffect(() => {
        const getSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                if (data) setUserProfile(data);
            }
        };
        getSession();
        fetchRsvps();
    }, [id]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

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
                    {/* Hero Header */}
                    <div className="mb-10">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/40 dark:border-white/10 text-primary dark:text-white text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm hover:bg-white dark:hover:bg-white/15 transition-all"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Kembali ke Dashboard
                        </Link>
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="font-serif text-3xl lg:text-4xl font-medium text-primary dark:text-white tracking-tight">
                                    RSVP Manager
                                </h1>
                                <p className="text-primary/60 dark:text-white/60 font-light max-w-lg mt-2">
                                    Kelola daftar tamu dan konfirmasi kehadiran undangan Anda.
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 pb-1">
                                <button
                                    onClick={exportToExcel}
                                    disabled={rsvps.length === 0 || isLoading}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-full text-xs font-semibold text-primary dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Download className="w-4 h-4" />
                                    Export Excel
                                </button>
                                <button
                                    onClick={fetchRsvps}
                                    disabled={isLoading}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-full text-xs font-semibold text-primary dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-sm disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RSVP Table */}
                    <RSVPTable 
                        invitationId={id} 
                        rsvps={rsvps} 
                        isLoading={isLoading} 
                        onRefresh={fetchRsvps}
                        setRsvps={setRsvps}
                    />
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
