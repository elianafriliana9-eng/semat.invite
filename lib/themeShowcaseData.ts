export interface ThemeShowcaseItem {
    id: string;
    name: string;
    category: string;
    description: string;
    thumbnail: string;
    previewUrl: string;
    tags: string[];
    isNew?: boolean;
    isPremium?: boolean;
}

export const THEME_CATEGORIES = ["Semua", "Modern", "Organic", "Classic"] as const;

export const themeShowcaseData: ThemeShowcaseItem[] = [
    {
        id: "modern-luxury",
        name: "Modern Luxury",
        category: "Modern",
        description: "Desain kontemporer dengan sentuhan mewah dan elegan. Palet warna monokromatik yang timeless.",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqkMW8Hy_JZ7ThmGf_gr2Jakw1-NPcXqXNe6Etjlo15ecZO_MEzXhav-WbLk8PSXwfMhUsHM2_bmWihaw86gouTtnjgSySpOZ_7MoEOaKd9WnARKTN8urvdIK-qOaTsjynTJvbBxT_BINJs5XaJ6YIDELxl9dj856_Ui5Igr4N_HxOCeoHCZdSehl82xw4aX7nsBByJftnOLcbvn_Z-oxoyHAFfTdlN-Mwv3tlpVgekZW-aqRzwQeSqYMnGchIWcCYLDBYXg9okMuE",
        previewUrl: "/preview/modern-luxury",
        tags: ["minimalist", "luxury", "monochrome"],
        isPremium: false,
    },
    {
        id: "nusa-organic",
        name: "Nusa Organic",
        category: "Organic",
        description: "Terinspirasi alam Nusantara. Nuansa earthy tone dengan elemen organik yang hangat dan natural.",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTk7qizA7D9mGvbfYK_RpXz4lwtcA71Lrc0W780INbS-yOUvC8i6vLyJzI5R5ez75YUWmIw6VauGjbjpnZGcqgmBkpWu5Y0I8QpVUAtTnfWbCKdknDO7VwC74dooRhAvmSU4AQuY9eUpKVG1e3jltDtP5UIDFmwaG5bcoSzgRaHOGD2yfaQC8_GUGCoFiXlqNDB5rtHOdIsafseO0miaASCFdKIdgrFyBZnTYjK8gnbzaTfdu-M4TIDlvlf7yIYzVFOzQE6RelTCI",
        previewUrl: "/preview/nusa-organic",
        tags: ["nature", "earthy", "warm"],
        isNew: true,
    },
    {
        id: "senandika",
        name: "Senandika",
        category: "Modern",
        description: "Elegan dan puitis. Desain minimalis dengan sentuhan tipografi klasik dan animasi halus.",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXN_kIPmI4M0j-BFBK-JG-tUupTCO64fMuhTu9S4-3CcDmSQflH3gu8xm803ViaMBbCcjHhIlZdj9SiO0eSyqglPGgDYE0vW1AWF1MhPyLDR811m4y-4gdciNgxY-ndxjxFbGUDDeYeXg9ym1VLyeUo_vjVjMfg9KdAxvufnk3dGO-JGAlAKcpelVIKE2zMadOkaYtbh7npDh67b6MLNYQ_e24Hbti_29xOpgqTUlNVNvzEIMoms5NupimcguTiQDb4gPi05NRjBM",
        previewUrl: "/preview/senandika",
        tags: ["minimalist", "poetic", "elegant"],
        isNew: true,
    },
    {
        id: "kromo-inggil",
        name: "Kromo Inggil",
        category: "Classic",
        description: "Keagungan budaya Jawa. Nuansa Royal Navy & Gold dengan elemen Gunungan dan Batik yang hidupi tradisi.",
        thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
        previewUrl: "/preview/kromo-inggil",
        tags: ["javanese", "royal", "cultural"],
        isNew: true,
        isPremium: true,
    },
    {
        id: "aksara",
        name: "Aksara",
        category: "Classic",
        description: "Cinematic dan teatrikal. Menonjolkan sisi puitis dengan tipografi kuat dan visual yang megah.",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkJhhNGIPzRvdHCHnOD7hBoIG2BeMF1SHC5o00m74t2gyN4fcq6EAJ9alELW60VPslYrouB9_VC4OPWI8g2FpDlIoGxkk_By3oNOKnhnGgSlTqPYiGKP858GF5gB9N8gJ0dDO3SA5ut6Ctb6xcMKpAzS3HXufYtgq1wTvUN98rPQdVsFyx9deysju5wnwyW8GPu3By4JF0Y8kF5yx6OBOWw10JWiqAj-aZ3kJZ0MhGVtdX-B0yJoCuPZOMVO48qXLqd0YKIhUVbhU",
        previewUrl: "/preview/aksara",
        tags: ["cinematic", "poetic", "grand"],
        isNew: true,
    },
];
