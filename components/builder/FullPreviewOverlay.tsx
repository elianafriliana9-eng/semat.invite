"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Monitor } from "lucide-react";
import { useBuilderStore } from "@/store/builderStore";
import { themeRegistry } from "@/components/themes";

interface FullPreviewOverlayProps {
    previewDevice: "mobile" | "desktop";
    setPreviewDevice: (d: "mobile" | "desktop") => void;
}

export function FullPreviewOverlay({ previewDevice, setPreviewDevice }: FullPreviewOverlayProps) {
    const { data, previewKey, isFullPreview, setFullPreview, isMusicPlaying, setMusicPlaying } = useBuilderStore();

    const themeId = data.themeId || "default-luxury";
    const ThemeComponent = themeRegistry[themeId] || themeRegistry["default-luxury"];

    // Close with Escape key
    useEffect(() => {
        if (!isFullPreview) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isFullPreview]);

    const handleClose = () => {
        setFullPreview(false);
        setMusicPlaying(false);
    };

    return (
        <AnimatePresence>
            {isFullPreview && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col"
                >
                    {/* ─── Minimal top bar ─── */}
                    <motion.div
                        initial={{ y: -48, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -48, opacity: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3"
                        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)" }}
                    >
                        {/* Device switcher */}
                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/10">
                            <button
                                onClick={() => setPreviewDevice("mobile")}
                                className={`p-1.5 rounded-md transition-all ${previewDevice === "mobile" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/70"}`}
                            >
                                <Smartphone className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPreviewDevice("desktop")}
                                className={`p-1.5 rounded-md transition-all ${previewDevice === "desktop" ? "bg-white/20 text-white" : "text-white/40 hover:text-white/70"}`}
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Badge */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-white/60 text-xs font-medium tracking-wide">Tampilan Tamu</span>
                        </div>

                        {/* Close */}
                        <button
                            onClick={handleClose}
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-medium"
                        >
                            <span>Tutup</span>
                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                <X className="w-4 h-4" />
                            </div>
                        </button>
                    </motion.div>

                    {/* ─── Content area ─── */}
                    {previewDevice === "desktop" ? (
                        /* Desktop: full viewport */
                        <motion.div
                            key={previewKey}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex-1 overflow-y-auto overflow-x-hidden"
                        >
                            {ThemeComponent && (
                                <ThemeComponent
                                    data={data}
                                    id={useBuilderStore.getState().invitationId}
                                    isPreview={false}
                                    guestName="Tamu Undangan"
                                />
                            )}
                        </motion.div>
                    ) : (
                        /* Mobile: centered phone frame */
                        <div className="flex-1 flex items-center justify-center bg-[#0a0a0a]"
                            style={{ backgroundImage: "radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 70%)" }}
                        >
                            <motion.div
                                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                                transition={{ type: "spring", stiffness: 280, damping: 26, delay: 0.1 }}
                                className="relative overflow-hidden"
                                style={{
                                    width: 390,
                                    height: "calc(100vh - 80px)",
                                    maxHeight: 844,
                                    borderRadius: 52,
                                    border: "10px solid #1c1c1e",
                                    boxShadow: "0 40px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.07)",
                                }}
                            >
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-[#1c1c1e] rounded-b-[24px] z-20" />

                                {/* Theme content */}
                                <motion.div
                                    key={previewKey}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="h-full w-full overflow-y-auto overflow-x-hidden"
                                    style={{ borderRadius: 42 }}
                                >
                                    {ThemeComponent && (
                                        <ThemeComponent
                                            data={data}
                                            id={useBuilderStore.getState().invitationId}
                                            isPreview={false}
                                            guestName="Tamu Undangan"
                                        />
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
