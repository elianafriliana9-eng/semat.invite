"use client";

import { Trash2, Upload, Loader2, Link as LinkIcon, Copy, Check, ExternalLink, Music, Disc, Play, DollarSign, Image as ImageIcon } from "lucide-react";
import { useBuilderStore } from "@/store/builderStore";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { MUSIC_LIBRARY } from "@/lib/constants/music";

interface EditorPanelProps {
    activeTab: string;
}

export function EditorPanel({ activeTab }: EditorPanelProps) {
    const {
        data,
        invitationId,
        updateCouple,
        updateMusic,
        addStoryItem,
        removeStoryItem,
        updateStoryItem,
        addGiftAccount,
        removeGiftAccount,
        updateGiftAccount,
        addGalleryItem,
        removeGalleryItem
    } = useBuilderStore();
    const [isUploading, setIsUploading] = useState<string | null>(null); // 'music' | 'groom' | 'bride' | 'story-[id]' | 'gift-[id]' | 'gallery'
    const [musicLibrary, setMusicLibrary] = useState(MUSIC_LIBRARY);
    const [themeLibrary, setThemeLibrary] = useState<any[]>([]);

    // Hardcoded fallback themes (always available even without DB)
    const DEFAULT_THEMES = [
        {
            id: "modern-luxury",
            name: "Modern Luxury",
            description: "Klasik, mewah, dan abadi.",
            price: 0,
            preview_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqkMW8Hy_JZ7ThmGf_gr2Jakw1-NPcXqXNe6Etjlo15ecZO_MEzXhav-WbLk8PSXwfMhUsHM2_bmWihaw86gouTtnjgSySpOZ_7MoEOaKd9WnARKTN8urvdIK-qOaTsjynTJvbBxT_BINJs5XaJ6YIDELxl9dj856_Ui5Igr4N_HxOCeoHCZdSehl82xw4aX7nsBByJftnOLcbvn_Z-oxoyHAFfTdlN-Mwv3tlpVgekZW-aqRzwQeSqYMnGchIWcCYLDBYXg9okMuE",
            is_active: true,
        },
        {
            id: "nusa-organic",
            name: "Nusa Organic",
            description: "Hangat, organik, dan penuh warna alam.",
            price: 0,
            preview_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTk7qizA7D9mGvbfYK_RpXz4lwtcA71Lrc0W780INbS-yOUvC8i6vLyJzI5R5ez75YUWmIw6VauGjbjpnZGcqgmBkpWu5Y0I8QpVUAtTnfWbCKdknDO7VwC74dooRhAvmSU4AQuY9eUpKVG1e3jltDtP5UIDFmwaG5bcoSzgRaHOGD2yfaQC8_GUGCoFiXlqNDB5rtHOdIsafseO0miaASCFdKIdgrFyBZnTYjK8gnbzaTfdu-M4TIDlvlf7yIYzVFOzQE6RelTCI",
            is_active: true,
        },
        {
            id: "senandika",
            name: "Senandika",
            description: "Puitis, elegan, dan penuh makna romantis.",
            price: 0,
            preview_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXN_kIPmI4M0j-BFBK-JG-tUupTCO64fMuhTu9S4-3CcDmSQflH3gu8xm803ViaMBbCcjHhIlZdj9SiO0eSyqglPGgDYE0vW1AWF1MhPyLDR811m4y-4gdciNgxY-ndxjxFbGUDDeYeXg9ym1VLyeUo_vjVjMfg9KdAxvufnk3dGO-JGAlAKcpelVIKE2zMadOkaYtbh7npDh67b6MLNYQ_e24Hbti_29xOpgqTUlNVNvzEIMoms5NupimcguTiQDb4gPi05NRjBM",
            is_active: true,
        },
        {
            id: "kromo-inggil",
            name: "Kromo Inggil",
            description: "Keagungan budaya Jawa dengan elemen Gunungan dan Batik.",
            price: 0,
            preview_image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
            is_active: true,
        },
    ];

    useEffect(() => {
        const fetchMasterData = async () => {
            // Fetch Music
            const { data: dbMusic, error: musicError } = await supabase
                .from('master_music')
                .select('*')
                .eq('is_active', true);

            if (!musicError && dbMusic && dbMusic.length > 0) {
                setMusicLibrary(dbMusic);
            }

            // Fetch Themes
            const { data: dbThemes, error: themesError } = await supabase
                .from('master_themes')
                .select('*')
                .eq('is_active', true);

            if (!themesError && dbThemes && dbThemes.length > 0) {
                // Merge: DB themes take priority, then add defaults that aren't in DB
                const dbIds = new Set(dbThemes.map((t: any) => t.id));
                const merged = [
                    ...dbThemes,
                    ...DEFAULT_THEMES.filter(t => !dbIds.has(t.id))
                ];
                setThemeLibrary(merged);
            } else {
                // Fallback to hardcoded defaults
                setThemeLibrary(DEFAULT_THEMES);
            }
        };
        fetchMasterData();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'music' | 'groom' | 'bride' | string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validasi tipe file
        const isAudio = type === 'music';
        if (isAudio && !file.type.startsWith('audio/')) {
            alert('Harap pilih file audio (MP3).');
            return;
        }
        if (!isAudio && !file.type.startsWith('image/')) {
            alert('Harap pilih file gambar (JPG/PNG).');
            return;
        }

        // Validasi ukuran (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Ukuran file terlalu besar. Maksimal 5MB.');
            return;
        }

        setIsUploading(type);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const folder = isAudio ? 'music' : 'profiles';
            const filePath = `${folder}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('assets')
                .getPublicUrl(filePath);

            if (isAudio) {
                updateMusic({
                    url: publicUrl,
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    enabled: true
                });
            } else if (type === 'groom' || type === 'bride') {
                updateCouple(type as 'groom' | 'bride', { photo: publicUrl });
            } else if (type.startsWith('story-')) {
                const storyId = type.replace('story-', '');
                updateStoryItem(storyId, { image: publicUrl });
            } else if (type.startsWith('gift-')) {
                const giftId = type.replace('gift-', '');
                updateGiftAccount(giftId, { qrCode: publicUrl });
            } else if (type === 'gallery') {
                addGalleryItem({
                    url: publicUrl,
                    type: 'image'
                });
            }

            alert('Berhasil diunggah!');
        } catch (error: any) {
            console.error('Upload error:', error);
            alert(`Gagal mengunggah: ${error.message || 'Error tidak diketahui'}`);
        } finally {
            setIsUploading(null);
        }
    };

    return (
        <div className="w-[400px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#202423] overflow-y-auto p-6">
            <div className="space-y-6">
                {activeTab === 'couple' && (
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Informasi Pengantin</h2>
                            <p className="text-sm text-gray-500">Masukkan data detail pasangan pengantin.</p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <h3 className="text-sm font-bold text-[#A89A82] uppercase tracking-[0.2em]">Mempelai Pria</h3>

                            {/* Photo Upload Groom */}
                            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                                    {data.couple.groom.photo ? (
                                        <img src={data.couple.groom.photo} alt="Groom" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400"><Upload className="w-5 h-5" /></div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Foto Profil</label>
                                        <button
                                            onClick={() => document.getElementById('groom-photo-upload')?.click()}
                                            className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all"
                                        >
                                            {isUploading === 'groom' ? 'Mengunggah...' : 'Unggah Foto'}
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="groom-photo-upload"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e, 'groom')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Panggilan</label>
                                <input
                                    value={data.couple.groom.name}
                                    onChange={(e) => updateCouple('groom', { name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                    placeholder="Dika"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Lengkap</label>
                                <input
                                    value={data.couple.groom.fullName}
                                    onChange={(e) => updateCouple('groom', { fullName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                    placeholder="Dika Ramadhan"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-3">
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Ayah</label>
                                    <input
                                        value={data.couple.groom.fatherName}
                                        onChange={(e) => updateCouple('groom', { fatherName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary text-sm outline-none"
                                        placeholder="Ayah..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Ibu</label>
                                    <input
                                        value={data.couple.groom.motherName}
                                        onChange={(e) => updateCouple('groom', { motherName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary text-sm outline-none"
                                        placeholder="Ibu..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <h3 className="text-sm font-bold text-[#A89A82] uppercase tracking-[0.2em]">Mempelai Wanita</h3>

                            {/* Photo Upload Bride */}
                            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                                    {data.couple.bride.photo ? (
                                        <img src={data.couple.bride.photo} alt="Bride" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400"><Upload className="w-5 h-5" /></div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Foto Profil</label>
                                        <button
                                            onClick={() => document.getElementById('bride-photo-upload')?.click()}
                                            className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all"
                                        >
                                            {isUploading === 'bride' ? 'Mengunggah...' : 'Unggah Foto'}
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="bride-photo-upload"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e, 'bride')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Panggilan</label>
                                <input
                                    value={data.couple.bride.name}
                                    onChange={(e) => updateCouple('bride', { name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                    placeholder="Rani"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Lengkap</label>
                                <input
                                    value={data.couple.bride.fullName}
                                    onChange={(e) => updateCouple('bride', { fullName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                    placeholder="Rani Amelia"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-3">
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Ayah</label>
                                    <input
                                        value={data.couple.bride.fatherName}
                                        onChange={(e) => updateCouple('bride', { fatherName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary text-sm outline-none"
                                        placeholder="Ayah..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Nama Ibu</label>
                                    <input
                                        value={data.couple.bride.motherName}
                                        onChange={(e) => updateCouple('bride', { motherName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-1 focus:ring-primary text-sm outline-none"
                                        placeholder="Ibu..."
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'gallery' && (
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Galeri Foto</h2>
                                <p className="text-sm text-gray-500">Unggah foto-foto kenangan Anda di sini.</p>
                            </div>
                            <button
                                onClick={() => document.getElementById('gallery-upload')?.click()}
                                disabled={isUploading === 'gallery'}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
                            >
                                {isUploading === 'gallery' ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Mengunggah...
                                    </span>
                                ) : '+ Tambah Foto'}
                            </button>
                            <input
                                id="gallery-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                multiple
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                        Array.from(files).forEach(file => {
                                            // Create a fake event object for handleFileUpload
                                            const fakeEvent = {
                                                target: {
                                                    files: [file]
                                                }
                                            } as unknown as React.ChangeEvent<HTMLInputElement>;
                                            handleFileUpload(fakeEvent, 'gallery');
                                        });
                                    }
                                }}
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="grid grid-cols-2 gap-3">
                                {data.gallery.length === 0 && !isUploading && (
                                    <div className="col-span-2 text-center py-10 opacity-40 italic text-sm">Belum ada foto di galeri.</div>
                                )}
                                {data.gallery.map((item, idx) => (
                                    <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                                        <img
                                            src={item.url}
                                            alt={`Gallery ${idx}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => removeGalleryItem(item.url)}
                                                className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'events' && (
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Acara</h2>
                                <p className="text-sm text-gray-500">Kelola jadwal dan lokasi acara.</p>
                            </div>
                            <button
                                onClick={() => {
                                    useBuilderStore.getState().addEvent({
                                        id: crypto.randomUUID(),
                                        title: 'Resepsi/Akad',
                                        date: '',
                                        startTime: '10:00',
                                        endTime: '12:00',
                                        locationName: '',
                                        address: ''
                                    })
                                }}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all"
                            >
                                + Tambah Acara
                            </button>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            {data.events.length === 0 && (
                                <div className="text-center py-10 opacity-40 italic text-sm">Belum ada acara. Klik "+" untuk menambah.</div>
                            )}
                            {data.events.map((event, idx) => (
                                <div key={event.id} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Event #{idx + 1}</span>
                                        <button
                                            onClick={() => useBuilderStore.getState().removeEvent(event.id)}
                                            className="text-red-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Judul Acara</label>
                                            <input
                                                value={event.title}
                                                onChange={(e) => useBuilderStore.getState().updateEvent(event.id, { title: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                placeholder="Contoh: Akad Nikah"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Tanggal</label>
                                                <input
                                                    type="date"
                                                    value={event.date}
                                                    onChange={(e) => useBuilderStore.getState().updateEvent(event.id, { date: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm forced-color-adjust-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Jam Mulai</label>
                                                <input
                                                    type="time"
                                                    value={event.startTime}
                                                    onChange={(e) => useBuilderStore.getState().updateEvent(event.id, { startTime: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Nama Lokasi</label>
                                            <input
                                                value={event.locationName}
                                                onChange={(e) => useBuilderStore.getState().updateEvent(event.id, { locationName: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                placeholder="Gedung / Hotel / Rumah"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Alamat Lengkap</label>
                                            <textarea
                                                value={event.address}
                                                onChange={(e) => useBuilderStore.getState().updateEvent(event.id, { address: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm min-h-[80px]"
                                                placeholder="Jl. Merdeka No. 123..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'theme' && (
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Pilih Tema</h2>
                            <p className="text-sm text-gray-500">Pilih desain terbaik untuk hari spesial Anda.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            {themeLibrary.map((theme) => {
                                const isActive = data.themeId === theme.id;
                                return (
                                    <button
                                        key={theme.id}
                                        onClick={() => useBuilderStore.getState().updateTheme(theme.id)}
                                        className={`text-left p-4 rounded-2xl border transition-all flex flex-col gap-3 group relative overflow-hidden ${isActive
                                            ? 'border-primary ring-1 ring-primary/20 bg-primary/5 shadow-md'
                                            : 'border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start w-full">
                                            <div>
                                                <h3 className={`font-bold ${isActive ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                                                    {theme.name}
                                                </h3>
                                                <div className="flex items-center gap-1.5 mt-1 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 w-fit bg-white dark:bg-gray-900">
                                                    <DollarSign className="w-3 h-3 text-primary" />
                                                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">
                                                        {theme.price > 0 ? `Rp ${theme.price.toLocaleString('id-ID')}` : 'Gratis'}
                                                    </span>
                                                </div>
                                            </div>
                                            {isActive && (
                                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>

                                        {theme.preview_image && (
                                            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                                                <img src={theme.preview_image} alt={theme.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}

                                        {!theme.preview_image && (
                                            <div className="aspect-[16/9] w-full rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <ImageIcon className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                )}

                {activeTab === 'rsvp' && (
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Konfirmasi Kehadiran (RSVP)</h2>
                            <p className="text-sm text-gray-500">Atur bagaimana tamu mengonfirmasi kehadiran mereka.</p>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Aktifkan RSVP</h4>
                                    <p className="text-[10px] text-gray-500">Tampilkan form RSVP di undangan.</p>
                                </div>
                                <button
                                    onClick={() => useBuilderStore.getState().updateRSVP({ enabled: !data.rsvp.enabled })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${data.rsvp.enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.rsvp.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">WhatsApp Notifikasi (Opsional)</label>
                                    <input
                                        value={data.rsvp.whatsappNumber}
                                        onChange={(e) => useBuilderStore.getState().updateRSVP({ whatsappNumber: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                        placeholder="628123456789"
                                    />
                                    <p className="text-[10px] text-gray-500 italic">Gunakan format kode negara (62). Data RSVP juga akan tersimpan di Dashboard.</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Input Jumlah Tamu</h4>
                                        <p className="text-[10px] text-gray-500">Tamu bisa memilih jumlah orang yang hadir.</p>
                                    </div>
                                    <button
                                        onClick={() => useBuilderStore.getState().updateRSVP({ showGuestsCount: !data.rsvp.showGuestsCount })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${data.rsvp.showGuestsCount ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.rsvp.showGuestsCount ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Tampilkan Buku Tamu</h4>
                                        <p className="text-[10px] text-gray-500">Tampilkan ucapan-ucapan dari tamu di undangan.</p>
                                    </div>
                                    <button
                                        onClick={() => useBuilderStore.getState().updateRSVP({ showGuestBook: !data.rsvp.showGuestBook })}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${data.rsvp.showGuestBook ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.rsvp.showGuestBook ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'music' && (
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Musik Latar</h2>
                            <p className="text-sm text-gray-500">Pilih musik romantis untuk mengiringi tamu saat membuka undangan.</p>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Aktifkan Musik</h4>
                                    <p className="text-[10px] text-gray-500">Musik berputar saat undangan dibuka.</p>
                                </div>
                                <button
                                    onClick={() => useBuilderStore.getState().updateMusic({ enabled: !data.music.enabled })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${data.music.enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.music.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            {/* Current Music Card */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-[#A89A82] uppercase tracking-wider">Musik Terpilih</label>
                                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-spin-slow">
                                        <Disc className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                            {data.music.title || "Belum ada musik"}
                                        </h4>
                                        <p className="text-[10px] text-gray-500 truncate">
                                            {data.music.url ? "File terhubung" : "Silakan pilih atau unggah musik"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => document.getElementById('music-upload-input')?.click()}
                                        className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:text-primary transition-colors"
                                        title="Ganti Musik"
                                    >
                                        <Upload className="w-4 h-4" />
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => handleFileUpload(e, 'music')}
                                    className="hidden"
                                    id="music-upload-input"
                                    disabled={isUploading === 'music'}
                                />
                                {isUploading === 'music' && (
                                    <div className="flex items-center gap-2 text-[10px] text-primary font-medium animate-pulse">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Sedang mengunggah musik...
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-[#A89A82] uppercase tracking-wider">Rekomendasi Musik</h4>
                                    <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">Royalty Free</span>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {musicLibrary.map((m, i) => {
                                        const isActive = data.music.url === m.url;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => useBuilderStore.getState().updateMusic({ title: m.title, url: m.url, enabled: true })}
                                                className={`text-left p-3 rounded-xl border transition-all flex items-center gap-3 group ${isActive
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:bg-primary/5'
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-primary'
                                                    }`}>
                                                    {isActive ? <Play className="w-4 h-4 fill-current" /> : <Music className="w-4 h-4" />}
                                                </div>
                                                <div className="flex-1">
                                                    <span className={`text-xs font-semibold block ${isActive ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                                                        {m.title}
                                                    </span>
                                                    <span className="text-[9px] text-gray-400">{m.category || 'Wedding Theme Loop'}</span>
                                                </div>
                                                {isActive && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
                                    <p className="text-[10px] text-amber-700 dark:text-amber-400 leading-relaxed italic">
                                        <strong>Tips:</strong> Gunakan musik dengan tempo lambat (piano/akustik) untuk menciptakan suasana romantis yang elegan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'share' && (
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Manajemen Link</h2>
                            <p className="text-sm text-gray-500">Kelola link utama dan buat link khusus untuk tamu.</p>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            {/* Main Invitation Link */}
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-[#A89A82] uppercase tracking-wider">Link Utama Undangan</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all">
                                        <span className="px-3 py-2 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                                            KanvasKita/
                                        </span>
                                        <input
                                            value={data?.metadata?.slug || ""}
                                            onChange={(e) => {
                                                const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                                                useBuilderStore.getState().updateMetadata({ slug: val });
                                            }}
                                            className="flex-1 px-3 py-2 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
                                            placeholder="link-anda"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const url = `${window.location.origin}/${data?.metadata?.slug || ""}`;
                                            navigator.clipboard.writeText(url);
                                            alert('Link berhasil disalin!');
                                        }}
                                        className="p-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all shadow-sm"
                                        title="Salin Link"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-500 italic">Ini adalah link utama yang akan digunakan oleh semua tamu.</p>
                            </div>

                            {/* Guest-Specific Link Generator */}
                            <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 space-y-4">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-primary italic">Generate Link Khusus Tamu</h4>
                                    <p className="text-[10px] text-gray-500">Buat link personal yang akan menyapa tamu secara langsung.</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Nama Tamu</label>
                                    <div className="flex gap-2">
                                        <input
                                            id="guest-name-input"
                                            className="flex-1 px-4 py-2.5 border border-primary/20 rounded-xl bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                                            placeholder="Contoh: Bpk. Jaka & Keluarga"
                                        />
                                        <button
                                            onClick={() => {
                                                const input = document.getElementById('guest-name-input') as HTMLInputElement;
                                                const guestName = input.value;
                                                if (!guestName) return;

                                                const baseUrl = `${window.location.origin}/${data?.metadata?.slug || ""}`;
                                                const personalizedUrl = `${baseUrl}?to=${encodeURIComponent(guestName)}`;

                                                navigator.clipboard.writeText(personalizedUrl);
                                                alert(`Link untuk "${guestName}" berhasil disalin ke clipboard!`);
                                                input.value = '';
                                            }}
                                            className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-primary/5">
                                    <p className="text-[10px] leading-relaxed text-gray-500">
                                        Note: Gunakan link ini saat menyebar undangan via WhatsApp agar muncul teks <strong>"Kepada: [Nama Tamu]"</strong> di undangan mereka.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'story' && (
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Cerita Kita (Story)</h2>
                                <p className="text-sm text-gray-500">Bagikan momen-momen berharga perjalanan cinta Anda.</p>
                            </div>
                            <button
                                onClick={() => {
                                    addStoryItem({
                                        id: crypto.randomUUID(),
                                        date: '',
                                        title: 'Momen Baru',
                                        description: ''
                                    })
                                }}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all"
                            >
                                + Tambah Momen
                            </button>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            {data.story.length === 0 && (
                                <div className="text-center py-10 opacity-40 italic text-sm">Belum ada cerita. Klik "+" untuk menambah momen baru.</div>
                            )}
                            {data.story.map((item, idx) => (
                                <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Momen #{idx + 1}</span>
                                        <button
                                            onClick={() => removeStoryItem(item.id)}
                                            className="text-red-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Story Item Photo */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Foto Kejadian</label>
                                        <div className="relative aspect-video rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden group">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs gap-2">
                                                    <Upload className="w-6 h-6" />
                                                    <span>Klik upload untuk menambah foto</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    onClick={() => document.getElementById(`story-upload-${item.id}`)?.click()}
                                                    className="bg-white text-black px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                                >
                                                    {isUploading === `story-${item.id}` ? 'Mengunggah...' : 'Ganti Foto'}
                                                </button>
                                            </div>
                                            <input
                                                id={`story-upload-${item.id}`}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, `story-${item.id}`)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Judul Momen</label>
                                            <input
                                                value={item.title}
                                                onChange={(e) => updateStoryItem(item.id, { title: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                placeholder="Contoh: Pertama Kali Bertemu"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Tanggal/Waktu</label>
                                            <input
                                                value={item.date}
                                                onChange={(e) => updateStoryItem(item.id, { date: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                placeholder="Contoh: 14 Februari 2022"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Cerita Singkat</label>
                                            <textarea
                                                value={item.description}
                                                onChange={(e) => updateStoryItem(item.id, { description: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm min-h-[80px]"
                                                placeholder="Tuliskan cerita singkat tentang momen ini..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'gifts' && (
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Kado Digital (Gifts)</h2>
                                <p className="text-sm text-gray-500">Tambahkan nomor rekening atau e-wallet untuk kado digital.</p>
                            </div>
                            <button
                                onClick={() => {
                                    addGiftAccount({
                                        id: crypto.randomUUID(),
                                        bankName: 'BCA',
                                        accountNumber: '',
                                        accountHolder: ''
                                    })
                                }}
                                className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all"
                            >
                                + Rekening
                            </button>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            {data.gifts.length === 0 && (
                                <div className="text-center py-10 opacity-40 italic text-sm">Belum ada nomor rekening. Klik "+" untuk menambah.</div>
                            )}
                            {data.gifts.map((gift) => (
                                <div key={gift.id} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <select
                                            value={gift.bankName}
                                            onChange={(e) => updateGiftAccount(gift.id, { bankName: e.target.value })}
                                            className="text-xs font-bold uppercase tracking-wider bg-transparent border-none outline-none text-primary"
                                        >
                                            <option value="BCA">BCA</option>
                                            <option value="Mandiri">Mandiri</option>
                                            <option value="BNI">BNI</option>
                                            <option value="BRI">BRI</option>
                                            <option value="DANA">DANA</option>
                                            <option value="OVO">OVO</option>
                                            <option value="GoPay">GoPay</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        <button
                                            onClick={() => removeGiftAccount(gift.id)}
                                            className="text-red-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Nomor Rekening/HP</label>
                                            <input
                                                value={gift.accountNumber}
                                                onChange={(e) => updateGiftAccount(gift.id, { accountNumber: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                placeholder="Contoh: 1234567890"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Atas Nama</label>
                                            <input
                                                value={gift.accountHolder}
                                                onChange={(e) => updateGiftAccount(gift.id, { accountHolder: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                placeholder="Contoh: Nama Pemilik Rekening"
                                            />
                                        </div>

                                        {/* Optional QR Code */}
                                        <div className="pt-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">QR Code (Opsional)</label>
                                                <button
                                                    onClick={() => document.getElementById(`qr-upload-${gift.id}`)?.click()}
                                                    className="text-[10px] font-bold text-primary hover:underline"
                                                >
                                                    {isUploading === `gift-${gift.id}` ? 'Mengunggah...' : (gift.qrCode ? 'Ganti QR' : 'Upload QR')}
                                                </button>
                                            </div>
                                            {gift.qrCode && (
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                                    <img src={gift.qrCode} alt="QR" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => updateGiftAccount(gift.id, { qrCode: '' })}
                                                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl-lg"
                                                    >
                                                        <Trash2 className="w-2.5 h-2.5" />
                                                    </button>
                                                </div>
                                            )}
                                            <input
                                                id={`qr-upload-${gift.id}`}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, `gift-${gift.id}`)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'settings' && (
                    <section className="space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Pengaturan</h2>
                            <p className="text-sm text-gray-500">Konfigurasi link dan metadata undangan.</p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                                <p className="text-sm text-gray-500 italic">Pengaturan lainnya akan segera hadir.</p>
                                <p className="text-[10px] text-primary">Manajemen link sekarang tersedia di tab <strong>Share</strong>.</p>
                            </div>
                        </div>
                    </section>
                )}

                {!['couple', 'gallery', 'events', 'rsvp', 'music', 'settings', 'share', 'story', 'gifts', 'rsvp-list', 'theme'].includes(activeTab) && (
                    <div className="h-40 flex flex-col items-center justify-center text-center opacity-50">
                        <p className="text-sm">Tab "{activeTab}" under development</p>
                    </div>
                )}
            </div>
        </div>
    );
}
