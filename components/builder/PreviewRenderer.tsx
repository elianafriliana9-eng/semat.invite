"use client";

import { useBuilderStore } from "@/store/builderStore";
import { themeRegistry } from "@/components/themes";

interface PreviewRendererProps {
    previewDevice: "mobile" | "desktop";
}

export function PreviewRenderer({ previewDevice }: PreviewRendererProps) {
    const { data } = useBuilderStore();

    // Identify Theme
    const themeId = data.themeId || "default-luxury";
    const ThemeComponent = themeRegistry[themeId] || themeRegistry["default-luxury"];

    return (
        <div className="flex-1 bg-gray-100 dark:bg-[#151817] flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
            <div
                className={`bg-white dark:bg-black shadow-2xl transition-all duration-500 overflow-hidden relative ${previewDevice === 'mobile'
                        ? 'w-[375px] h-[700px] rounded-[40px] border-[8px] border-gray-900 dark:border-gray-800'
                        : 'w-full max-w-5xl h-full rounded-xl border border-gray-200 dark:border-gray-800'
                    }`}
            >
                {/* Real-time Theme Renderer — relative + isolate ensures absolute-positioned children stay contained */}
                <div className="h-full w-full bg-[#f4f1ea] dark:bg-[#1a1a1b] overflow-y-auto overflow-x-hidden scrollbar-hide relative isolate">
                    {ThemeComponent && <ThemeComponent data={data} id={useBuilderStore.getState().invitationId} isPreview={true} />}
                </div>

                {/* Device Notch for Mobile */}
                {previewDevice === 'mobile' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 dark:bg-gray-800 rounded-b-2xl z-[200]" />
                )}
            </div>
        </div>
    );
}

