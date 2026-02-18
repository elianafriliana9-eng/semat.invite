import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark selection:bg-primary/30">
      <Navbar />
      <Hero />
      {/* <SocialProof /> */}
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
