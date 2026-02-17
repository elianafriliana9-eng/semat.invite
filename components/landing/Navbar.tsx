"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Showcase", href: "#showcase" },
        { name: "Fitur", href: "#features" },
        { name: "Harga", href: "#pricing" },
        { name: "Tentang Kami", href: "#about" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b-0",
                isScrolled ? "glass-panel py-2" : "bg-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <Sparkles className="text-primary dark:text-white w-6 h-6" />
                        <span className="font-serif font-bold text-2xl text-primary dark:text-white tracking-tight">
                            Semat<span className="text-primary/60 dark:text-white/60">.invite</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <Link href="/login">
                            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                                Masuk
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-white/10 focus:outline-none"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-panel absolute w-full border-t border-white/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/5"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 pb-2">
                            <Button className="w-full bg-primary text-white">Masuk</Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
