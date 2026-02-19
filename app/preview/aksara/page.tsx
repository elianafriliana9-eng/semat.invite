"use client";

import AksaraTemplate from "@/components/templates/Aksara";
import { InvitationData } from "@/store/builderStore";

// Mock data for preview matching InvitationData interface
const mockData: InvitationData = {
    themeId: "aksara",
    couple: {
        groom: {
            name: "Aditya",
            fullName: "Aditya Prasetya",
            fatherName: "Hardjo Mulyono",
            motherName: "Siti Aminah",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQRNmU_aIOh8IMhRa48dV8TNAprhI95eTmNqYD8V2JX8lqKM2T8Mmk_YLcqLMbEuCAS4zxWTWGdvfPaA6EU7PVe4I5ZgHs4rWbYFIOlT31Q8iM2WXv96amlyrMfS4NAgEZFKmg688pa0_YYwP7r5KhlOexxHZ81uB3AfHLOUJ2oqC9ep8OiYDkCw8D1DND_J4orvoUKKspMn0Dyo3lUYRNk28135lvUVtSrw-UCLjt5VzHOVOeQs3c_7DJvqjZpSSEhWoWyNXEW9c"
        },
        bride: {
            name: "Kirana",
            fullName: "Kirana Putri",
            fatherName: "Bambang Wijaya",
            motherName: "Dewi Sartika",
            photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJblwnLIlmdVUNiHZOFkToI4Ba5MewZ8K7UxmJMtWjU_hcP8yxbD1J0g6CImCWO8PCL9VV5x8OgNiIrErmREuaHbBXwhgo8Us_HTv99Kcr82z-eECGuiHL-LSub9lxdrde-81FRWUBBpKQv3RgCU9PlTrHtDys4Bxj62SN18PWIKaijvRbVq1jP7dJiv1dI61qdudfjAkwYuO3XkmmZtA4Bo4SYnh6dnBCvCSFTOp1uizB_pOO6swc0Dok4_y9rrOTmmT1SZzFz0"
        },
    },
    events: [
        {
            id: "1",
            title: "The Holy Matrimony",
            date: "2024-08-24T09:00:00",
            startTime: "09:00",
            endTime: "11:00",
            locationName: "Uluwatu, Bali",
            address: "Jl. Uluwatu No. 1, Pecatu, Kuta Sel., Kabupaten Badung, Bali",
        }
    ],
    gallery: [
        {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkJhhNGIPzRvdHCHnOD7hBoIG2BeMF1SHC5o00m74t2gyN4fcq6EAJ9alELW60VPslYrouB9_VC4OPWI8g2FpDlIoGxkk_By3oNOKnhnGgSlTqPYiGKP858GF5gB9N8gJ0dDO3SA5ut6Ctb6xcMKpAzS3HXufYtgq1wTvUN98rPQdVsFyx9deysju5wnwyW8GPu3By4JF0Y8kF5yx6OBOWw10JWiqAj-aZ3kJZ0MhGVtdX-B0yJoCuPZOMVO48qXLqd0YKIhUVbhU",
            type: "image"
        }
    ],
    sections: [],
    rsvp: { enabled: true, showGuestsCount: true, showGuestBook: true },
    music: { enabled: true, url: "https://www.bensound.com/bensound-music/bensound-love.mp3", title: "Love Story", autoStart: true },
    story: [
        {
            id: "1",
            date: "2020",
            title: "The First Meet",
            description: "It started with a single word, a simple greeting in a crowded room. We didn't know then that our paths were being woven into a single tapestry by the stars.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: "2",
            date: "2022",
            title: "Jakarta Skyline",
            description: "From late-night conversations under the Jakarta skyline to quiet walks along the shores of Bali.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
        }
    ],
    gifts: [],
    metadata: { isPaid: false, slug: "aksara-preview" }
};

import { useSearchParams } from "next/navigation";

export default function AksaraPreviewPage() {
    const searchParams = useSearchParams();
    const guestName = searchParams.get("to") || undefined;

    return (
        <AksaraTemplate data={mockData} guestName={guestName} />
    );
}
