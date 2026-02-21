"use client";

import RonaTemplate from "@/components/templates/Rona";
import { InvitationData } from "@/store/builderStore";
import { useSearchParams } from "next/navigation";

// Mock data for Rona theme preview
const mockData: InvitationData = {
    themeId: "rona",
    couple: {
        groom: {
            name: "Arya",
            fullName: "Arya Wijaya",
            fatherName: "Bpk. Bambang",
            motherName: "Ibu Hartati",
            photo: "https://images.unsplash.com/photo-1550005814-04488390885e?q=80&w=1974&auto=format&fit=crop"
        },
        bride: {
            name: "Nirmana",
            fullName: "Nirmana Putri",
            fatherName: "Bpk. Soedjatmiko",
            motherName: "Ibu Siti",
            photo: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
        },
    },
    events: [
        {
            id: "1",
            title: "Akad Nikah",
            date: "2024-12-12T09:00:00",
            startTime: "09:00",
            endTime: "11:00",
            locationName: "Candi Prambanan, Yogyakarta",
            address: "Jl. Raya Solo - Yogyakarta, Sleman",
        },
        {
            id: "2",
            title: "Reception",
            date: "2024-12-12T19:00:00",
            startTime: "19:00",
            endTime: "21:00",
            locationName: "Grand Ballroom, Ambarrukmo",
            address: "Jl. Laksda Adisucipto No. 81, Yogyakarta",
        }
    ],
    gallery: [
        {
            url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
            type: "image"
        }
    ],
    sections: [],
    rsvp: { enabled: true, showGuestsCount: true, showGuestBook: true },
    music: { enabled: true, url: "https://www.bensound.com/bensound-music/bensound-love.mp3", title: "Rona Serenade", autoStart: false },
    story: [
        {
            id: "1",
            date: "2022",
            title: "The Encounter",
            description: "A chance meeting in the rainy streets of Jakarta turned into a lifetime of sunshine.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
        },
        {
            id: "2",
            date: "2023",
            title: "The Promise",
            description: "Under the stars of Mount Bromo, a promise was made to walk together forever.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
        }
    ],
    gifts: [
        { id: "1", bankName: "Bank BCA", accountNumber: "1234567890", accountHolder: "Arya Wijaya" },
        { id: "2", bankName: "Bank Mandiri", accountNumber: "0987654321", accountHolder: "Nirmana Putri" }
    ],
    metadata: { isPaid: false, slug: "rona-preview" }
};

export default function RonaPreviewPage() {
    const searchParams = useSearchParams();
    const guestName = searchParams.get("to") || undefined;

    return (
        <RonaTemplate data={mockData} guestName={guestName} />
    );
}
