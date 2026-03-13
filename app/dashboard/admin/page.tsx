"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Music, 
  Palette, 
  Settings, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  Loader2, 
  Globe,
  DollarSign,
  LayoutDashboard,
  Users,
  Activity,
  PlayCircle,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface MusicTrack {
    id: string;
    title: string;
    url: string;
    is_active: boolean;
}

interface ThemeTemplate {
    id: string;
    name: string;
    description?: string;
    preview_image?: string;
    price: number;
    is_active: boolean;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'music' | 'themes' | 'settings'>('overview');
    const [music, setMusic] = useState<MusicTrack[]>([]);
    const [themes, setThemes] = useState<ThemeTemplate[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [settings, setSettings] = useState<any>(null);
    const [stats, setStats] = useState({ users: 0, music: 0, themes: 0 });
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
    }, [router]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [musicRes, themeRes, settingsRes, usersRes] = await Promise.all([
                supabase.from('master_music').select('*').order('created_at', { ascending: false }),
                supabase.from('master_themes').select('*').order('name'),
                supabase.from('app_settings').select('*'),
                supabase.from('profiles').select('id', { count: 'exact', head: true })
            ]);

            setMusic(musicRes.data || []);
            setThemes(themeRes.data || []);
            
            if (settingsRes.data) {
                const config = settingsRes.data.find(s => s.key === 'global_config');
                setSettings(config?.value || {});
            }

            setStats({
                users: usersRes.count || 0,
                music: musicRes.data?.length || 0,
                themes: themeRes.data?.length || 0
            });
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setIsLoading(false);
        }
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
        const url = prompt("Masukkan URL File MP3:");
        if (!title || !url) return;

        const { data, error } = await supabase.from('master_music').insert({ title, url }).select().single();
        if (!error && data) {
            setMusic([data, ...music]);
            setStats(prev => ({ ...prev, music: prev.music + 1 }));
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#111111]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-[#1A1A1A] dark:text-white" />
                    <p className="text-sm text-gray-500 font-medium animate-pulse">Memuat panel admin...</p>
                </div>
            </div>
        );
    }

    const NavItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: React.ElementType, label: string }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                activeTab === id 
                    ? 'text-[#1A1A1A] dark:text-white font-semibold' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
        >
            {activeTab === id && (
                <motion.div 
                    layoutId="admin-active-tab"
                    className="absolute inset-0 bg-white dark:bg-[#202423] shadow-sm rounded-xl border border-gray-200 dark:border-gray-800"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            <Icon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#111111] font-sans text-gray-900 dark:text-gray-100 flex flex-col md:flex-row">
            
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-gray-50 dark:bg-[#161817] border-r border-gray-200 dark:border-gray-800 flex flex-col md:h-screen sticky top-0 md:fixed z-20">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="font-serif font-bold text-lg leading-tight uppercase tracking-tight">KanvasKita</h2>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Admin Console</p>
                        </div>
                    </Link>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
                    <NavItem id="music" icon={Music} label="Music Library" />
                    <NavItem id="themes" icon={Palette} label="Themes" />
                    <NavItem id="settings" icon={Settings} label="Settings" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl">
                <AnimatePresence mode="wait">
                    
                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <motion.section 
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-3xl font-serif font-bold uppercase tracking-tight">Overview</h1>
                                <p className="text-gray-500 mt-1">System status and key metrics.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Total Users", value: stats.users, icon: Users, color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
                                    { label: "Active Themes", value: stats.themes, icon: Palette, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
                                    { label: "Audio Tracks", value: stats.music, icon: Music, color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" },
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-white dark:bg-[#202423] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
                                        <div className={`p-4 rounded-xl ${stat.color}`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                            <p className="text-3xl font-bold font-serif">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="bg-white dark:bg-[#202423] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                    <Activity className="w-5 h-5 text-gray-400" />
                                    System Activity
                                </h3>
                                <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
                                    <p className="text-sm text-gray-400 italic">No recent critical activity to display.</p>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* MUSIC TAB */}
                    {activeTab === 'music' && (
                        <motion.section 
                            key="music"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-serif font-bold uppercase tracking-tight">Music Library</h1>
                                    <p className="text-gray-500 mt-1">Manage background audio tracks for invitations.</p>
                                </div>
                                <button 
                                    onClick={handleAddMusic}
                                    className="bg-[#1A1A1A] hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-[#1A1A1A] px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-md transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Add Track
                                </button>
                            </div>

                            <div className="bg-white dark:bg-[#202423] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-gray-800">
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-16">Play</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Track Title</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest hidden sm:table-cell">Source URL</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-32">Status</th>
                                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-24 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {music.map((m) => (
                                                <tr key={m.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                                    <td className="p-4">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-[#1A1A1A] dark:group-hover:text-white transition-colors cursor-pointer">
                                                            <PlayCircle className="w-5 h-5" />
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <p className="font-bold text-sm text-gray-900 dark:text-white">{m.title}</p>
                                                    </td>
                                                    <td className="p-4 hidden sm:table-cell">
                                                        <p className="text-xs text-gray-500 truncate max-w-xs">{m.url}</p>
                                                    </td>
                                                    <td className="p-4">
                                                        <button 
                                                            onClick={() => handleToggleMusic(m.id, m.is_active)}
                                                            disabled={isSaving === m.id}
                                                            className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${
                                                                m.is_active 
                                                                    ? 'border-green-200 bg-green-50 text-green-600 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400' 
                                                                    : 'border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                                            }`}
                                                        >
                                                            {m.is_active ? 'Active' : 'Inactive'}
                                                        </button>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {music.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="p-8 text-center text-gray-500 text-sm">No music tracks found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* THEMES TAB */}
                    {activeTab === 'themes' && (
                        <motion.section 
                            key="themes"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-3xl font-serif font-bold uppercase tracking-tight">Theme Catalog</h1>
                                <p className="text-gray-500 mt-1">Manage invitation templates and adjust pricing.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {themes.map((t, idx) => (
                                    <motion.div 
                                        key={t.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white dark:bg-[#202423] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col group"
                                    >
                                        <div className="h-40 bg-gray-100 dark:bg-black relative overflow-hidden">
                                            {t.preview_image ? (
                                                <img src={t.preview_image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-700">
                                                    <ImageIcon className="w-8 h-8" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-2 py-1 rounded text-[8px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${t.is_active ? 'bg-green-500/90 text-white' : 'bg-black/50 text-white'}`}>
                                                    {t.is_active ? 'Active' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                            <div>
                                                <h3 className="font-bold text-lg leading-tight">{t.name}</h3>
                                                <p className="text-xs text-gray-500 font-mono mt-1">{t.id}</p>
                                                {t.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed">{t.description}</p>}
                                            </div>
                                            
                                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 block">Price (IDR)</label>
                                                <div className="flex items-center bg-gray-50 dark:bg-[#161817] border border-gray-200 dark:border-gray-700 rounded-xl px-3 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors">
                                                    <DollarSign className="w-4 h-4 text-gray-400" />
                                                    <input 
                                                        type="number" 
                                                        defaultValue={t.price}
                                                        onBlur={(e) => handleUpdateThemePrice(t.id, parseInt(e.target.value))}
                                                        className="w-full bg-transparent py-2.5 px-2 outline-none text-sm font-semibold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <motion.section 
                            key="settings"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-3xl font-serif font-bold uppercase tracking-tight">App Settings</h1>
                                <p className="text-gray-500 mt-1">Configure global application parameters.</p>
                            </div>

                            <div className="bg-white dark:bg-[#202423] p-12 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                                <Globe className="w-16 h-16 mx-auto mb-6 text-gray-200 dark:text-gray-800" />
                                <h3 className="text-xl font-bold mb-2">Advanced Configuration</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-8">Visual settings editor is currently under development. Global parameters must be updated directly via the database for now.</p>
                                
                                <div className="text-left bg-gray-50 dark:bg-[#161817] p-4 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
                                    <pre className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                                        {JSON.stringify(settings, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </motion.section>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}

