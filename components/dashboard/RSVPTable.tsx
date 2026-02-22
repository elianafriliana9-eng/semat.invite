"use client";

import { useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
    Loader2,
    Search,
    Users,
    CheckCircle2,
    XCircle,
    Trash2,
    MessageSquare,
    UserCheck
} from "lucide-react";

interface RSVPTableProps {
    invitationId: string;
    showBack?: boolean;
    rsvps: any[];
    isLoading: boolean;
    onRefresh: () => void;
    setRsvps: React.Dispatch<React.SetStateAction<any[]>>;
}

export function RSVPTable({ 
    invitationId, 
    showBack = false, 
    rsvps, 
    isLoading, 
    onRefresh, 
    setRsvps 
}: RSVPTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterAttendance, setFilterAttendance] = useState<"all" | "Hadir" | "Tidak Hadir">("all");

    const toggleCheckIn = async (id: string, currentStatus: boolean) => {
        try {
            const { error, count } = await supabase
                .from('rsvps')
                .update({ is_checked_in: !currentStatus })
                .eq('id', id)
                .select(); // Menggunakan select() untuk memastikan data terupdate bisa dicheck

            if (error) throw error;
            
            // Verifikasi apakah ada baris yang benar-benar terupdate
            // Sebagaimana diatur oleh kebijakan RLS, update mungkin "sukses" tapi tidak mengubah baris apapun
            const updatedData = await supabase.from('rsvps').select('is_checked_in').eq('id', id).single();
            
            if (updatedData.data?.is_checked_in === !currentStatus) {
                setRsvps(prev => prev.map(item => item.id === id ? { ...item, is_checked_in: !currentStatus } : item));
            } else {
                throw new Error("Data tidak berubah di database. Pastikan kebijakan RLS (Row Level Security) mengizinkan UPDATE.");
            }
        } catch (error: any) {
            console.error('Error toggling check-in:', error);
            alert(`Gagal memperbarui status: ${error.message || 'Error tidak diketahui'}`);
        }
    };

    const deleteRSVP = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus konfirmasi ini?")) return;

        try {
            const { error } = await supabase
                .from('rsvps')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setRsvps(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting RSVP:', error);
        }
    };

    const stats = useMemo(() => {
        const total = rsvps.length;
        const hadirCount = rsvps.filter(r => r.attendance === 'yes' || r.attendance === 'Hadir').length;
        const totalGuests = rsvps
            .filter(r => r.attendance === 'yes' || r.attendance === 'Hadir')
            .reduce((acc, curr) => acc + (curr.guests_count || 1), 0);
        const tidakHadir = total - hadirCount;

        return { total, hadirCount, totalGuests, tidakHadir };
    }, [rsvps]);

    const filteredRsvps = useMemo(() => {
        return rsvps.filter(rsvp => {
            const matchesSearch = (rsvp.name || "").toLowerCase().includes(searchTerm.toLowerCase());
            const status = rsvp.attendance === 'yes' || rsvp.attendance === 'Hadir' ? 'Hadir' : 'Tidak Hadir';
            const matchesFilter = filterAttendance === 'all' || status === filterAttendance;
            return matchesSearch && matchesFilter;
        });
    }, [rsvps, searchTerm, filterAttendance]);


    return (
        <div className="space-y-8">

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel rounded-2xl p-5 space-y-3 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-semibold text-primary/50 dark:text-white/50 uppercase tracking-wider">Total Konfirmasi</span>
                        <div className="w-8 h-8 rounded-full bg-blue-100/60 dark:bg-blue-500/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-serif font-medium text-primary dark:text-white">{stats.total}</p>
                </div>
                <div className="glass-panel rounded-2xl p-5 space-y-3 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-semibold text-primary/50 dark:text-white/50 uppercase tracking-wider">Total Hadir</span>
                        <div className="w-8 h-8 rounded-full bg-green-100/60 dark:bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-serif font-medium text-primary dark:text-white">{stats.hadirCount}</p>
                        <span className="text-xs text-primary/40 dark:text-white/40 font-light">({stats.totalGuests} orang)</span>
                    </div>
                </div>
                <div className="glass-panel rounded-2xl p-5 space-y-3 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-semibold text-primary/50 dark:text-white/50 uppercase tracking-wider">Berhalangan</span>
                        <div className="w-8 h-8 rounded-full bg-red-100/60 dark:bg-red-500/10 flex items-center justify-center">
                            <XCircle className="w-4 h-4 text-red-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-serif font-medium text-primary dark:text-white">{stats.tidakHadir}</p>
                </div>
                <div className="glass-panel rounded-2xl p-5 space-y-3 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-semibold text-primary/50 dark:text-white/50 uppercase tracking-wider">Sudah Check-in</span>
                        <div className="w-8 h-8 rounded-full bg-secondary/60 dark:bg-secondary/20 flex items-center justify-center">
                            <UserCheck className="w-4 h-4 text-primary dark:text-secondary" />
                        </div>
                    </div>
                    <p className="text-3xl font-serif font-medium text-primary dark:text-white">
                        {rsvps.filter(r => r.is_checked_in).length}
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-primary/40 dark:text-white/40 w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Cari nama tamu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-11 pr-4 py-2.5 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-full text-primary dark:text-white placeholder-primary/40 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 text-sm transition-all duration-300 shadow-sm"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'Hadir', 'Tidak Hadir'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setFilterAttendance(filter)}
                            className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                                filterAttendance === filter
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 text-primary/70 dark:text-white/70 hover:bg-white dark:hover:bg-white/10'
                            }`}
                        >
                            {filter === 'all' ? 'Semua' : filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Container */}
            <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-primary/[0.03] dark:bg-white/[0.03] border-b border-primary/5 dark:border-white/5">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-primary/40 dark:text-white/40">Informasi Tamu</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-primary/40 dark:text-white/40">Kehadiran</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-primary/40 dark:text-white/40">Pesan / Ucapan</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-primary/40 dark:text-white/40">Waktu</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-primary/40 dark:text-white/40">Check-in</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-primary/40 dark:text-white/40">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5 dark:divide-white/5">
                            {isLoading && rsvps.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary/30 dark:text-white/30" />
                                        <p className="text-xs text-primary/40 dark:text-white/40 font-light">Menarik data dari server...</p>
                                    </td>
                                </tr>
                            ) : filteredRsvps.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center">
                                        <div className="w-16 h-16 bg-secondary/30 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Users className="w-7 h-7 text-primary/20 dark:text-white/20" />
                                        </div>
                                        <p className="text-sm text-primary/40 dark:text-white/40 font-light">
                                            {searchTerm || filterAttendance !== 'all' ? 'Tidak ada data yang cocok dengan pencarian.' : 'Belum ada konfirmasi tamu.'}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredRsvps.map((rsvp) => (
                                    <tr key={rsvp.id} className="hover:bg-primary/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-secondary/40 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-bold text-primary dark:text-white uppercase">
                                                        {(rsvp.name || '?').charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-primary dark:text-white capitalize">{rsvp.name}</span>
                                                    <span className="text-[10px] text-primary/40 dark:text-white/40 font-light">{rsvp.phone || 'Tanpa Telepon'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className={`inline-flex items-center w-fit px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${rsvp.attendance === 'yes' || rsvp.attendance === 'Hadir'
                                                        ? 'bg-green-100/60 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                                        : 'bg-red-100/60 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                                                    }`}>
                                                    {rsvp.attendance === 'yes' || rsvp.attendance === 'Hadir' ? 'HADIR' : 'ABSEN'}
                                                </span>
                                                <span className="text-[10px] text-primary/40 dark:text-white/40 font-light">{rsvp.guests_count || 1} Orang</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-primary/60 dark:text-white/50 leading-relaxed max-w-[200px] line-clamp-2 font-light" title={rsvp.message}>
                                                {rsvp.message || <span className="italic text-primary/30 dark:text-white/20">Tidak ada pesan</span>}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[11px] text-primary/40 dark:text-white/40 font-light">
                                                {new Date(rsvp.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleCheckIn(rsvp.id, rsvp.is_checked_in)}
                                                className={`w-11 h-6 rounded-full relative transition-all duration-300 ${rsvp.is_checked_in ? 'bg-primary shadow-inner' : 'bg-primary/15 dark:bg-white/10'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${rsvp.is_checked_in ? 'left-[24px]' : 'left-1'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {rsvp.phone && (
                                                    <a
                                                        href={`https://wa.me/${rsvp.phone.replace(/[^0-9]/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 hover:bg-green-100/60 dark:hover:bg-green-500/10 rounded-full text-green-600 transition-all"
                                                        title="WhatsApp Tamu"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => deleteRSVP(rsvp.id)}
                                                    className="p-2 hover:bg-red-100/60 dark:hover:bg-red-500/10 rounded-full text-red-500 transition-all"
                                                    title="Hapus Konfirmasi"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="bg-primary/[0.02] dark:bg-white/[0.02] px-6 py-3 border-t border-primary/5 dark:border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-primary/30 dark:text-white/25 font-light tracking-wider">© {new Date().getFullYear()} KanvasKita</span>
                    <span className="text-[10px] text-primary/30 dark:text-white/25 font-light">Menampilkan {filteredRsvps.length} dari {rsvps.length} data</span>
                </div>
            </div>
        </div>
    );
}
