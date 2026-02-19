"use client";

import { useBuilderStore } from "@/store/builderStore";
import { themeRegistry } from "@/components/themes";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewIframe } from "./PreviewIframe";

interface PreviewRendererProps {
    previewDevice: "mobile" | "desktop";
}

export function PreviewRenderer({ previewDevice }: PreviewRendererProps) {
    const { data, previewKey, isMusicPlaying, setMusicPlaying } = useBuilderStore();

    const themeId = data.themeId || "default-luxury";
    const ThemeComponent = themeRegistry[themeId] || themeRegistry["default-luxury"];

    return (
        <div className="flex-1 overflow-hidden relative bg-gray-100 dark:bg-[#151817]">
            <AnimatePresence mode="wait">
                {previewDevice === "desktop" ? (
                    /* ─── Desktop: fills the entire right panel, no frame ─── */
                    <motion.div
                        key={`desktop-${previewKey}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide relative"
                        style={{ transform: "translateZ(0)", isolation: "isolate" }}
                    >
                        {ThemeComponent && (
                            <ThemeComponent
                                data={data}
                                id={useBuilderStore.getState().invitationId}
                                isPreview={previewKey === 0}
                                guestName="Tamu Undangan"
                            />
                        )}

                        {/* Music icon */}
                        {data.music?.enabled && (
                            <div className="absolute bottom-6 right-6 z-[200]">
                                <MusicButton isMusicPlaying={isMusicPlaying} setMusicPlaying={setMusicPlaying} />
                            </div>
                        )}
                    </motion.div>
                ) : (
                    /* ─── Mobile: realistic phone frame, centered ─── */
                    <motion.div
                        key={`mobile-${previewKey}`}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 24 }}
                        className="h-full w-full flex items-center justify-center py-6"
                    >
                        {/* Phone shell */}
                        <div
                            className="relative flex-shrink-0 overflow-hidden"
                            style={{
                                width: 320,
                                height: "100%",
                                maxHeight: 640,
                                borderRadius: 44,
                                border: "8px solid #1c1c1e",
                                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)",
                                background: "#1c1c1e",
                            }}
                        >
                            {/* Dynamic island / notch */}
                            <div
                                className="absolute top-2 left-1/2 -translate-x-1/2 z-30"
                                style={{ width: 120, height: 28, borderRadius: 20, background: "#0a0a0a" }}
                            />

                            {/* Theme content — transform creates new containing block for fixed children */}
                            <div
                                className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide"
                                style={{
                                    borderRadius: 36,
                                    transform: "translateZ(0)",
                                    isolation: "isolate",
                                }}
                            >
                                <PreviewIframe>
                                    {ThemeComponent && (
                                        <ThemeComponent
                                            data={data}
                                            id={useBuilderStore.getState().invitationId}
                                            isPreview={previewKey === 0}
                                            guestName="Tamu Undangan"
                                        />
                                    )}
                                </PreviewIframe>
                            </div>

                            {/* Music icon inside phone */}
                            {data.music?.enabled && (
                                <div className="absolute bottom-6 right-4 z-20">
                                    <MusicButton isMusicPlaying={isMusicPlaying} setMusicPlaying={setMusicPlaying} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Shared Music Icon Button ───
function MusicButton({ isMusicPlaying, setMusicPlaying }: {
    isMusicPlaying: boolean;
    setMusicPlaying: (v: boolean) => void;
}) {
    return (
        <motion.button
            onClick={() => setMusicPlaying(!isMusicPlaying)}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.08 }}
            animate={{
                boxShadow: isMusicPlaying
                    ? ["0 0 0 0px rgba(180,140,100,0.5)", "0 0 0 8px rgba(180,140,100,0)"]
                    : "0 4px 16px rgba(0,0,0,0.2)",
            }}
            transition={{
                boxShadow: isMusicPlaying
                    ? { duration: 1.4, repeat: Infinity, ease: "easeOut" }
                    : { duration: 0.3 },
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{
                background: isMusicPlaying ? "rgba(15,15,15,0.9)" : "rgba(15,15,15,0.65)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
            }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isMusicPlaying ? (
                    <motion.div
                        key="wave"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-end gap-[3px]"
                        style={{ height: 18 }}
                    >
                        {[
                            { min: 4, max: 14, dur: 0.55, delay: 0 },
                            { min: 8, max: 18, dur: 0.45, delay: 0.1 },
                            { min: 5, max: 16, dur: 0.6, delay: 0.05 },
                            { min: 7, max: 14, dur: 0.5, delay: 0.15 },
                            { min: 3, max: 12, dur: 0.65, delay: 0.08 },
                        ].map((bar, i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [bar.min, bar.max, bar.min] }}
                                transition={{ duration: bar.dur, repeat: Infinity, ease: "easeInOut", delay: bar.delay }}
                                style={{ width: 2.5, borderRadius: 99, background: "white", display: "block", alignSelf: "flex-end" }}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="note"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
