"use client";

import { RSVPTable } from "@/components/dashboard/RSVPTable";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";

export default function RSVPDashboardPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-sans transition-colors duration-200">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white dark:bg-[#202423] border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="flex-shrink-0 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">S</div>
                                <span className="font-semibold text-xl tracking-tight text-primary dark:text-gray-100 italic">Back to Dashboard</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                             <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hidden sm:block">RSVP Manager</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <RSVPTable invitationId={id} showBack={true} />
                </div>
            </main>
        </div>
    );
}
