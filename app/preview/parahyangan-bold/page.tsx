"use client";

import ParahyanganBold from "@/components/templates/ParahyanganBold";
import { Suspense } from "react";

const mockData = {
    themeId: "parahyangan-bold",
    couple: {
        groom: {
            name: "Dika",
            fullName: "Raden Dika Ramadhan",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
            fatherName: "H. Ahmad Sodik",
            motherName: "Hj. Siti Aminah"
        },
        bride: {
            name: "Rani",
            fullName: "Nyi Rani Amelia",
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop",
            fatherName: "Bpk. Cecep Mulyana",
            motherName: "Ibu Imas Masitoh"
        }
    },
    events: [
        {
            id: "1",
            title: "Akad Nikah",
            date: "2024-12-25",
            startTime: "08:00",
            endTime: "10:00",
            locationName: "Masjid Agung Bandung",
            address: "Jl. Dalem Kaum No.14, Balonggede, Kec. Regol, Kota Bandung, Jawa Barat"
        },
        {
            id: "2",
            title: "Resepsi Pernikahan",
            date: "2024-12-25",
            startTime: "11:00",
            endTime: "14:00",
            locationName: "Bale Asri Pusdai",
            address: "Jl. Diponegoro No.63, Cihaur Geulis, Kec. Cibeunying Kaler, Kota Bandung"
        }
    ],
    gallery: [
        { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop", type: "image text" },
        { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop", type: "image" },
        { url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop", type: "image" },
        { url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", type: "image" },
        { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop", type: "image" },
        { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop", type: "image" }
    ],
    giftAccounts: [
        { id: "1", bankName: "Bank BCA", accountNumber: "1234567890", accountHolder: "Raden Dika Ramadhan" },
        { id: "2", bankName: "Bank Mandiri", accountNumber: "0987654321", accountHolder: "Nyi Rani Amelia" }
    ],
    rsvp: {
        enabled: true,
        whatsappNumber: "628123456789",
        showGuestsCount: true,
        showGuestBook: true
    },
    music: {
        enabled: true,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        title: "Kecapi Suling Sunda"
    }
};

export default function ParahyanganBoldPreviewPage() {
    return (
        <Suspense fallback={<div>Loading Preview...</div>}>
            <ParahyanganBold data={mockData} />
        </Suspense>
    );
}
