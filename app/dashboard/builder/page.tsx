"use client";

import { BuilderNavbar } from "@/components/builder/BuilderNavbar";
import { EditorPanel } from "@/components/builder/EditorPanel";
import { PreviewRenderer } from "@/components/builder/PreviewRenderer";
import { 
    Type, 
    Users, 
    Calendar, 
    Image as ImageIcon,
    MailCheck,
    Music,
    Link,
    Heart,
    Gift,
    ClipboardList,
    Settings,
    Loader2
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useBuilderStore } from "@/store/builderStore";

function BuilderContent() {
    const [activeTab, setActiveTab] = useState("couple");
    const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const invitationId = searchParams.get("id");
    const { setInitialData } = useBuilderStore();

    useEffect(() => {
        const fetchInvitation = async () => {
            if (!invitationId) {
                setInitialData(null as any); // Reset to default state
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('invitations')
                    .select('*')
                    .eq('id', invitationId)
                    .single();

                if (error) throw error;

                if (data) {
                    setInitialData(data.content, data.id);
                }
            } catch (error) {
                console.error("Error loading invitation:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvitation();
    }, [invitationId, setInitialData]);

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-sm font-medium text-gray-500 animate-pulse">Menyiapkan editor mahakarya Anda...</p>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark font-sans overflow-hidden">
            <BuilderNavbar previewDevice={previewDevice} setPreviewDevice={setPreviewDevice} />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Navigation Labels */}
                <div className="w-20 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#202423] flex flex-col items-center py-4 gap-4 overflow-y-auto scrollbar-none">
                    <NavIcon active={activeTab === 'theme'} onClick={() => setActiveTab('theme')} icon={Type} label="Themes" />
                    <NavIcon active={activeTab === 'couple'} onClick={() => setActiveTab('couple')} icon={Users} label="Couple" />
                    <NavIcon active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon={Calendar} label="Events" />
                    <NavIcon active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={ImageIcon} label="Gallery" />
                    <NavIcon active={activeTab === 'rsvp'} onClick={() => setActiveTab('rsvp')} icon={MailCheck} label="RSVP" />
                    <NavIcon active={activeTab === 'music'} onClick={() => setActiveTab('music')} icon={Music} label="Music" />
                    <NavIcon active={activeTab === 'story'} onClick={() => setActiveTab('story')} icon={Heart} label="Story" />
                    <NavIcon active={activeTab === 'gifts'} onClick={() => setActiveTab('gifts')} icon={Gift} label="Gifts" />
                    <NavIcon active={activeTab === 'share'} onClick={() => setActiveTab('share')} icon={Link} label="Share" />
                    <div className="mt-auto">
                        <NavIcon active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={Settings} label="Settings" />
                    </div>
                </div>

                {/* Left Panel - Editor Form */}
                <EditorPanel activeTab={activeTab} />

                {/* Right Panel - Preview Renderer */}
                <PreviewRenderer previewDevice={previewDevice} />
            </div>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <BuilderContent />
        </Suspense>
    );
}

function NavIcon({ active, icon: Icon, onClick, label }: any) {
    return (
        <button 
            onClick={onClick}
            className={`group relative flex flex-col items-center gap-1 p-2 w-full transition-all ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
        >
            <div className={`p-2 rounded-lg transition-all ${active ? 'bg-primary/10' : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{label}</span>
            {active && <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full shadow-[2px_0_8px_rgba(var(--primary),0.2)]"></div>}
        </button>
    );
}
