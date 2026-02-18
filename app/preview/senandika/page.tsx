"use client";

import SenandikaTemplate from "@/components/templates/Senandika";
import { InvitationData } from "@/store/builderStore";

// Mock data for preview matching InvitationData interface
const mockData: InvitationData = {
    themeId: "senandika",
    couple: {
        groom: { name: "Arya", fullName: "Arya Wijaya", fatherName: "", motherName: "" },
        bride: { name: "Nirmana", fullName: "Nirmana Putri", fatherName: "", motherName: "" },
    },
    events: [
        {
            id: "1",
            title: "Resepsi",
            date: "2024-12-12T10:00:00",
            startTime: "10:00",
            endTime: "13:00",
            locationName: "The Glass House",
            address: "Jakarta, Indonesia",
        }
    ],
    gallery: [
        {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXN_kIPmI4M0j-BFBK-JG-tUupTCO64fMuhTu9S4-3CcDmSQflH3gu8xm803ViaMBbCcjHhIlZdj9SiO0eSyqglPGgDYE0vW1AWF1MhPyLDR811m4y-4gdciNgxY-ndxjxFbGUDDeYeXg9ym1VLyeUo_vjVjMfg9KdAxvufnk3dGO-JGAlAKcpelVIKE2zMadOkaYtbh7npDh67b6MLNYQ_e24Hbti_29xOpgqTUlNVNvzEIMoms5NupimcguTiQDb4gPi05NRjBM",
            type: "image"
        }
    ],
    sections: [],
    rsvp: { enabled: true, showGuestsCount: true, showGuestBook: true },
    music: { enabled: true, url: "", title: "", autoStart: false },
    story: [
        {
            id: "1",
            date: "2020-01-01",
            title: "First Meeting",
            description: "In the quiet hum of the world, we found a melody only we could hear. A journey of two souls intertwining like silk threads, crafting a story of grace, patience, and enduring love.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_HulKNSHP8vSxyTERRF8N8v1HdxoYn768w4oHYWtnewmwL1ra5Jq2c0z5ggsL09E0Sug_xjOVOsF1Chu8qYSsQZhHP7RU02riPWAYIaE1aJ08fOgyvhZXYQEkiFMH9BoScCwGwMtfu7zylFi3H9T28vmHe8HVm3NtiVVyrXVFawWXkEFcNx6JgysW-YPtBJdRspgRtU5tE5wWBISa0x9VT9mJ7euE-7aPFtQlQ_HQkWT2Sq8q1B4uX_AA5Sv13lMyt8YLOCC2n_c"
        }
    ],
    gifts: [],
    metadata: { isPaid: false, slug: "senandika-preview" }
};

export default function SenandikaPreviewPage() {
    return (
        <SenandikaTemplate data={mockData} />
    );
}
