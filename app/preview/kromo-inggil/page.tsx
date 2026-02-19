"use client";

import KromoInggil from "@/components/themes/KromoInggil";
import { InvitationData } from "@/store/builderStore";

// Mock data for preview matching InvitationData interface
const mockData: InvitationData = {
    themeId: "kromo-inggil",
    couple: {
        groom: {
            name: "Raden",
            fullName: "Raden Mas Suryo Kusumo",
            fatherName: "K.P.H. Hadiningrat",
            motherName: "R.Ay. Retno Dumilah",
            photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop"
        },
        bride: {
            name: "Putri",
            fullName: "Roro Putri Sekar Jagad",
            fatherName: "H. Ahmad Wijaya",
            motherName: "Hj. Siti Aminah",
            photo: "https://images.unsplash.com/photo-1596720499135-71c5a7d77953?q=80&w=1974&auto=format&fit=crop"
        },
    },
    events: [
        {
            id: "1",
            title: "Akad Nikah",
            date: "2024-09-15T08:00:00",
            startTime: "08:00",
            endTime: "10:00",
            locationName: "ndalem Ageng",
            address: "Jl. Royal Palace No. 45, Yogyakarta",
        },
        {
            id: "2",
            title: "Pahargyan Resepsi",
            date: "2024-09-15T19:00:00",
            startTime: "19:00",
            endTime: "21:00",
            locationName: "Grand Ballroom Keraton",
            address: "Kawasan Alun-alun Utara, Yogyakarta",
        }
    ],
    gallery: [
        {
            url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
            type: "image"
        }
    ],
    sections: [],
    rsvp: { enabled: true, showGuestsCount: true, showGuestBook: true },
    music: { enabled: true, url: "https://www.bensound.com/bensound-music/bensound-love.mp3", title: "Gending Jawa", autoStart: true },
    story: [
        {
            id: "1",
            date: "2021",
            title: "Pinanggih",
            description: "Pertemuan pertama yang tak sengaja di pelataran Candi Prambanan.",
        }
    ],
    gifts: [],
    metadata: { isPaid: true, slug: "kromo-inggil-preview" }
};

export default function KromoInggilPreviewPage() {
    return (
        <KromoInggil data={mockData} isPreview={true} />
    );
}
