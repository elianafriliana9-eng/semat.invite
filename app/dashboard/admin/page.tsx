"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Music, 
  Palette, 
  Settings, 
  Plus, 
  Trash2, 
  Save, 
  ChevronLeft, 
  Loader2, 
  ToggleLeft as Toggle,
  ToggleRight as ToggleActive,
  Globe,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'music' | 'themes' | 'settings'>('music');
    const [music, setMusic] = useState<any[]>([]);
    const [themes, setThemes] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (!profile || profile.role !== 'admin') {
                router.push('/dashboard');
                return;
            }

            fetchData();
        };
        checkAuth();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const { data: musicData } = await supabase.from('master_music').select('*').order('created_at', { ascending: false });
        const { data: themeData } = await supabase.from('master_themes').select('*').order('name');
        const { data: settingsData } = await supabase.from('app_settings').select('*');

        setMusic(musicData || []);
        setThemes(themeData || []);
        if (settingsData) {
            const config = settingsData.find(s => s.key === 'global_config');
            setSettings(config?.value || {});
        }
        setIsLoading(false);
    };

    const handleToggleMusic = async (id: string, currentStatus: boolean) => {
        setIsSaving(id);
        const { error } = await supabase.from('master_music').update({ is_active: !currentStatus }).eq('id', id);
        if (!error) {
            setMusic(music.map(m => m.id === id ? { ...m, is_active: !currentStatus } : m));
        }
        setIsSaving(null);
    };

    const handleUpdateThemePrice = async (id: string, newPrice: number) => {
        setIsSaving(id);
        const { error } = await supabase.from('master_themes').update({ price: newPrice }).eq('id', id);
        if (!error) {
            setThemes(themes.map(t => t.id === id ? { ...t, price: newPrice } : t));
        }
        setIsSaving(null);
    };

    const handleAddMusic = async () => {
        const title = prompt("Masukkan Judul Lagu:");
        const url = prompt("Masukkan URL File MP3 (Saran: Unggah ke Storage Supabase dahulu):");
        if (!title || !url) return;

        const { data, error } = await supabase.from('master_music').insert({ title, url }).select().single();
        if (!error && data) {
            setMusic([data, ...music]);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark font-sans">
            {/* Header */}
            <header className="bg-white dark:bg-[#202423] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Master Data</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <aside className="w-full lg:w-64 space-y-2">
                        <button 
                            onClick={() => setActiveTab('music')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'music' ? 'bg-primary text-white shadow-lg' : 'hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                        >
                            <Music className="w-5 h-5" />
                            <span className="font-semibold">Manajemen Musik</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('themes')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'themes' ? 'bg-primary text-white shadow-lg' : 'hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                        >
                            <Palette className="w-5 h-5" />
                            <span className="font-semibold">Manajemen Tema</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg' : 'hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                        >
                            <Settings className="w-5 h-5" />
                            <span className="font-semibold">Pengaturan Global</span>
                        </button>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 bg-white dark:bg-[#202423] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                        {activeTab === 'music' && (
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold">Daftar Lagu Rekomendasi</h2>
                                    <button 
                                        onClick={handleAddMusic}
                                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                                    >
                                        <Plus className="w-4 h-4" /> Tambah Lagu
                                    </button>
                                </div>

                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {music.map((m) => (
                                        <div key={m.id} className="py-4 flex items-center justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm truncate">{m.title}</h3>
                                                <p className="text-xs text-gray-500 truncate">{m.url}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleToggleMusic(m.id, m.is_active)}
                                                    disabled={isSaving === m.id}
                                                    className={`p-2 rounded-lg transition-colors ${m.is_active ? 'text-green-500 bg-green-50' : 'text-gray-400 bg-gray-50'}`}
                                                >
                                                    {m.is_active ? <ToggleActive className="w-5 h-5" /> : <Toggle className="w-5 h-5" />}
                                                </button>
                                                <button className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === 'themes' && (
                            <section className="space-y-6">
                                <h2 className="text-lg font-bold">Katalog Tema & Harga</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {themes.map((t) => (
                                        <div key={t.id} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold">{t.name}</h3>
                                                    <span className="text-[10px] uppercase font-bold text-gray-400">{t.id}</span>
                                                </div>
                                                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {t.is_active ? 'AKTIF' : 'NONAKTIF'}
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-gray-500">Harga Tema (Rp)</label>
                                                <div className="flex gap-2">
                                                    <div className="flex-1 flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3">
                                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                                        <input 
                                                            type="number" 
                                                            defaultValue={t.price}
                                                            onBlur={(e) => handleUpdateThemePrice(t.id, parseInt(e.target.value))}
                                                            className="w-full bg-transparent py-2 outline-none text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === 'settings' && (
                            <section className="space-y-6 text-center py-20 opacity-40 italic">
                                <Globe className="w-12 h-12 mx-auto mb-4" />
                                <p>Pengaturan global belum dikonfigurasi secara visual.</p>
                                <p className="text-sm">Config: {JSON.stringify(settings)}</p>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
