"use client";

import NusaOrganic from "@/components/themes/NusaOrganic";
import type { InvitationData } from "@/store/builderStore";

const sampleData: InvitationData = {
    themeId: "nusa-organic",
    couple: {
        groom: {
            name: "Luthfi",
            fullName: "Luthfi Andhika Putra",
            fatherName: "Sulistianto",
            motherName: "Ratna Dewi",
            instagram: "@luthfi.ap",
        },
        bride: {
            name: "Amara",
            fullName: "Amara Safitri Azzahra",
            fatherName: "Budiono",
            motherName: "Sari Wulandari",
            instagram: "@amara.sz",
        },
    },
    events: [
        {
            id: "evt-1",
            title: "Akad Nikah",
            date: "2026-06-15",
            startTime: "08:00",
            endTime: "10:00",
            locationName: "Rumah Mempelai Wanita",
            address: "Jl. Mawar No. 12, Kota Bandung, Jawa Barat",
            googleMapsUrl: "https://maps.google.com",
        },
        {
            id: "evt-2",
            title: "Resepsi",
            date: "2026-06-15",
            startTime: "11:00",
            endTime: "14:00",
            locationName: "Hotel Grand Nusa Heritage",
            address: "Jl. Asia Afrika No. 8, Kota Bandung, Jawa Barat",
            googleMapsUrl: "https://maps.google.com",
        },
    ],
    gallery: [
        { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", type: "image" },
        { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800", type: "image" },
        { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800", type: "image" },
        { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800", type: "image" },
    ],
    sections: [
        { id: "hero-1", type: "hero", enabled: true, order: 0, settings: {} },
        { id: "couple-1", type: "couple", enabled: true, order: 1, settings: {} },
        { id: "event-1", type: "event", enabled: true, order: 2, settings: {} },
    ],
    rsvp: {
        enabled: true,
        whatsappNumber: "08123456789",
        showGuestsCount: true,
        showGuestBook: true,
    },
    music: {
        enabled: true,
        url: "https://www.bensound.com/bensound-music/bensound-love.mp3",
        title: "Love Story",
        autoStart: true,
    },
    story: [
        {
            id: "s1",
            date: "2020",
            title: "Pertama Bertemu",
            description: "Kami bertemu untuk pertama kalinya di sebuah acara kampus yang penuh kenangan.",
        },
        {
            id: "s2",
            date: "2023",
            title: "Lamaran",
            description: "Momen yang membahagiakan ketika kami memutuskan untuk berjalan bersama selamanya.",
        },
    ],
    gifts: [
        {
            id: "g1",
            bankName: "BCA",
            accountNumber: "1234567890",
            accountHolder: "Luthfi Andhika Putra",
        },
        {
            id: "g2",
            bankName: "Mandiri",
            accountNumber: "0987654321",
            accountHolder: "Amara Safitri Azzahra",
        },
    ],
    metadata: {
        isPaid: false,
        slug: "luthfi-amara",
    },
};

export default function NusaOrganicPreview() {
    return <NusaOrganic data={sampleData} isPreview={true} guestName="Bapak & Ibu Tamu Undangan" />;
}
