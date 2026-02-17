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
        <div className="flex-1 bg-gray-100 dark:bg-[#151817] flex items-center justify-center p-8 overflow-hidden relative">
            <div 
                className={`bg-white dark:bg-black shadow-2xl transition-all duration-500 overflow-hidden relative ${
                    previewDevice === 'mobile' ? 'w-[375px] h-[667px] rounded-[40px] border-[8px] border-gray-900 dark:border-gray-800' : 'w-full h-full rounded-xl border border-gray-200 dark:border-gray-800'
                }`}
            >
                {/* Real-time Theme Renderer */}
                <div className="h-full w-full bg-[#f4f1ea] dark:bg-[#1a1a1b] overflow-y-auto scrollbar-hide">
                    {ThemeComponent && <ThemeComponent data={data} id={useBuilderStore.getState().invitationId} isPreview={true} />}
                </div>
                
                {/* Device Notch for Mobile */}
                {previewDevice === 'mobile' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 dark:bg-gray-800 rounded-b-2xl z-10"></div>
                )}
            </div>

            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                <div className="bg-white dark:bg-[#202423] p-1 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col gap-1">
                     {/* Floating helper tools could go here */}
                </div>
            </div>
        </div>
    );
}
