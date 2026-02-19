"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PreviewIframeProps {
    children: React.ReactNode;
    title?: string;
}

export function PreviewIframe({ children, title = "Preview" }: PreviewIframeProps) {
    const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
    const [isReady, setIsReady] = useState(false);

    const mountNode = contentRef?.contentWindow?.document?.body;
    const headNode = contentRef?.contentWindow?.document?.head;

    useEffect(() => {
        if (!contentRef || !headNode) return;

        // 1. Inject Styles from main document
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        styles.forEach((style) => {
            headNode.appendChild(style.cloneNode(true));
        });

        // 2. Add some basic resets for the iframe content
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      /* Hide scrollbar but allow scrolling */
      ::-webkit-scrollbar {
        display: none;
      }
      * {
        scrollbar-width: none;
      }
    `;
        headNode.appendChild(styleTag);

        setIsReady(true);
    }, [contentRef]);

    return (
        <iframe
            title={title}
            ref={setContentRef}
            className="w-full h-full border-0"
            style={{ background: 'transparent' }}
        >
            {isReady && mountNode && createPortal(children, mountNode)}
        </iframe>
    );
}
