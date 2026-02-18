"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
    Loader2,
    RefreshCw,
    ChevronLeft,
    Download,
    Search,
    Users,
    CheckCircle2,
    XCircle,
    Trash2,
    MessageSquare,
    Check
} from "lucide-react";
import Link from "next/link";

interface RSVPTableProps {
    invitationId: string;
    showBack?: boolean;
}

export function RSVPTable({ invitationId, showBack = false }: RSVPTableProps) {
    const [rsvps, setRsvps] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterAttendance, setFilterAttendance] = useState<"all" | "Hadir" | "Tidak Hadir">("all");

    const fetchRsvps = async () => {
        if (!invitationId) return;
        setIsLoading(true);

        try {
            const { data, error } = await supabase
                .from('rsvps')
                .select('*')
                .eq('invitation_id', invitationId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRsvps(data || []);
        } catch (error) {
            console.error('Error fetching RSVPs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleCheckIn = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('rsvps')
                .update({ is_checked_in: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            setRsvps(prev => prev.map(item => item.id === id ? { ...item, is_checked_in: !currentStatus } : item));
        } catch (error) {
            console.error('Error toggling check-in:', error);
            alert("Gagal memperbarui status check-in. Pastikan kolom 'is_checked_in' sudah ada di database.");
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

    const exportToCSV = () => {
        if (rsvps.length === 0) return;

        const headers = ["Nama Tamu", "Status Kehadiran", "Jumlah Tamu", "Telepon", "Pesan/Ucapan", "Check-in", "Waktu Konfirmasi"];
        const rows = rsvps.map(rsvp => [
            rsvp.name,
            rsvp.attendance === 'yes' || rsvp.attendance === 'Hadir' ? 'Hadir' : 'Tidak Hadir',
            rsvp.guests_count || 1,
            rsvp.phone || '-',
            `"${(rsvp.message || '-').replace(/"/g, '""')}"`,
            rsvp.is_checked_in ? 'Ya' : 'Tidak',
            new Date(rsvp.created_at).toLocaleString('id-ID')
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `RSVP_Pro_${invitationId}.csv`);
        link.click();
    };

    useEffect(() => {
        fetchRsvps();
    }, [invitationId]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {showBack && (
                        <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">RSVP Management Pro</h2>
                        <p className="text-sm text-gray-500">Kelola daftar tamu dan konfirmasi kehadiran secara profesional.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={exportToCSV}
                        disabled={rsvps.length === 0 || isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#202423] border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50"
                    >
                        <Download className="w-4 h-4 text-primary" />
                        Export
                    </button>
                    <button
                        onClick={fetchRsvps}
                        className="p-2 bg-white dark:bg-[#202423] border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#202423] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Konfirmasi</span>
                        <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-white dark:bg-[#202423] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hadir</span>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{stats.hadirCount}</p>
                        <span className="text-xs text-gray-400">({stats.totalGuests} orang)</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#202423] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Berhalangan</span>
                        <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-2xl font-bold">{stats.tidakHadir}</p>
                </div>
                <div className="bg-white dark:bg-[#202423] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sudah Check-in</span>
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold">
                        {rsvps.filter(r => r.is_checked_in).length}
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari nama tamu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#202423] border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={filterAttendance}
                        onChange={(e) => setFilterAttendance(e.target.value as any)}
                        className="px-4 py-2 bg-white dark:bg-[#202423] border border-gray-200 dark:border-gray-800 rounded-lg outline-none text-sm focus:border-primary"
                    >
                        <option value="all">Semua Kehadiran</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                    </select>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-[#202423] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Informasi Tamu</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Kehadiran</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Pesan / Ucapan</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Waktu</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Check-in</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {isLoading && rsvps.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary/40" />
                                        <p className="text-xs text-gray-400">Menarik data dari server...</p>
                                    </td>
                                </tr>
                            ) : filteredRsvps.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center text-gray-400 italic text-sm">
                                        {searchTerm || filterAttendance !== 'all' ? 'Tidak ada data yang cocok dengan pencarian.' : 'Belum ada konfirmasi tamu.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredRsvps.map((rsvp) => (
                                    <tr key={rsvp.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{rsvp.name}</span>
                                                <span className="text-[10px] text-gray-400 font-mono tracking-tighter">{rsvp.phone || 'Tanpa Telepon'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className={`inline-flex items-center w-fit px-2 py-0.5 rounded-full text-[9px] font-black tracking-tighter ${rsvp.attendance === 'yes' || rsvp.attendance === 'Hadir'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                                                    }`}>
                                                    {rsvp.attendance === 'yes' || rsvp.attendance === 'Hadir' ? 'HADIR' : 'ABSEN'}
                                                </span>
                                                <span className="text-[9px] text-gray-500 ml-1 font-medium">{rsvp.guests_count || 1} Person</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-[200px] line-clamp-2" title={rsvp.message}>
                                                {rsvp.message || '-'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-[10px] text-gray-400">
                                            {new Date(rsvp.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleCheckIn(rsvp.id, rsvp.is_checked_in)}
                                                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${rsvp.is_checked_in ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                                            >
                                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${rsvp.is_checked_in ? 'left-[22px]' : 'left-0.5'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {rsvp.phone && (
                                                    <a
                                                        href={`https://wa.me/${rsvp.phone.replace(/[^0-9]/g, '')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 hover:bg-green-100 dark:hover:bg-green-900/30 rounded text-green-600 transition-colors"
                                                        title="WhatsApp Tamu"
                                                    >
                                                        <MessageSquare className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => deleteRSVP(rsvp.id)}
                                                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 transition-colors"
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
                <div className="bg-gray-50/50 dark:bg-gray-800/30 px-6 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 font-medium">© 2026 KanvasKita - Pro Dashboard</span>
                    <span className="text-[10px] text-gray-400 font-medium">Menampilkan {filteredRsvps.length} dari {rsvps.length} data</span>
                </div>
            </div>
        </div>
    );
}
