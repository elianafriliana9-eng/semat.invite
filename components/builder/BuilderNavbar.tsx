"use client";

import { ChevronLeft, Save, Eye, Smartphone, Monitor, Loader2 } from "lucide-react";
import Link from "next/link";
import { useBuilderStore } from "@/store/builderStore";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BuilderNavbarProps {
    previewDevice: "mobile" | "desktop";
    setPreviewDevice: (device: "mobile" | "desktop") => void;
}

export function BuilderNavbar({ previewDevice, setPreviewDevice }: BuilderNavbarProps) {
    const { data, invitationId, setInitialData } = useBuilderStore();
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setSaving(true);
        console.log("💾 Saving invitation...", { id: invitationId, slug: data.metadata.slug });
        
        try {
            // 1. Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) throw new Error("Silakan login terlebih dahulu untuk menyimpan.");

            // 2. Validate/Generate slug (link)
            let slug = data.metadata.slug;
            if (!slug && !invitationId) {
                // For new projects, generate a default slug if empty
                slug = `undangan-${Math.random().toString(36).substring(2, 8)}`;
                useBuilderStore.getState().updateMetadata({ slug });
            } else if (!slug) {
                alert("Mohon tentukan 'Slug' atau Link undangan di tab Settings sebelum menyimpan.");
                setSaving(false);
                return;
            }

            // 3. Upsert into database
            const payload = {
                ...(invitationId ? { id: invitationId } : {}),
                user_id: user.id,
                slug: slug,
                theme_id: data.themeId || 'modern-luxury',
                content: {
                    ...data,
                    metadata: {
                        ...data.metadata,
                        slug: slug // Ensure slug in content matches
                    }
                },
                updated_at: new Date().toISOString()
            };

            console.log("📤 Sending save payload:", payload);

            const { error: saveError, data: saveData } = await supabase
                .from('invitations')
                .upsert(payload)
                .select()
                .single();

            if (saveError) {
                console.error('❌ Supabase Save Error:', saveError);
                throw saveError;
            }

            console.log("✅ Save successful:", saveData);
            
            // 4. Update store and URL if it was a new project
            if (!invitationId && saveData) {
                setInitialData(saveData.content, saveData.id);
                router.replace(`/dashboard/builder?id=${saveData.id}`);
            }

            alert("Undangan berhasil disimpan! ✨");
        } catch (error: any) {
            console.error('❌ Error saving invitation:', error);
            const detail = error.message || error.details || error.hint || 'Terjadi kesalahan sistem.';
            alert(`Gagal menyimpan: ${detail}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#202423] flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Modular Builder</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Editing: {data?.metadata?.slug || "Untitled Invitation"}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mr-4">
                    <button 
                        onClick={() => setPreviewDevice("mobile")}
                        className={`p-1.5 rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-400'}`}
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setPreviewDevice("desktop")}
                        className={`p-1.5 rounded-md transition-all ${previewDevice === 'desktop' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-400'}`}
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                </div>
                <button 
                    onClick={() => useBuilderStore.getState().resetPreview()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </button>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </header>
    );
}
