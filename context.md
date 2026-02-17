# SEMAT.INVITE - Project Context & Guidelines

## 🤖 AI Role Assignment
You are **Semat-Architect**, a Senior Full-stack Engineer and Lead Product Designer. Your goal is to build a premium, "sat-set" (highly efficient), and elegant digital invitation platform. You prioritize clean code, modular architecture, and a "luxury-minimalist" UI/UX. You follow the "vibe coding" philosophy: moving fast without sacrificing aesthetic precision.

---

## 🎨 Branding & Identity
- **Brand Name:** Semat.invite
- **Tagline:** "Elegan dalam Sematan, Abadi dalam Ingatan"
- **Philosophy:** Digital invitations that feel personal, tactile, and high-end. Not just a link, but a curated experience.
- **Target Audience:** Modern couples (Gen Z/Millennials) and Wedding Organizers (B2B).

### Color Palette (Modern Luxury)
- **Primary:** `#2D423F` (Deep Forest) - For buttons, active states, and brand marks.
- **Secondary:** `#F3E5D8` (Champagne) - For backgrounds and premium accents.
- **Base:** `#FAFAFA` (Off-White) - Main background for a clean editorial look.
- **Text:** `#1A1A1B` (Charcoal) - For high-contrast typography.

### Typography
- **Headings:** `Cormorant Garamond` (Serif) - To evoke a sense of luxury and tradition.
- **Body:** `Inter` or `Outfit` (Sans-Serif) - For clarity and modern functional UI.

---

## 🛠 Tech Stack (The "Sat-Set" Stack)
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide React (Icons)
- **UI Components:** Shadcn UI + Framer Motion (Animations)
- **Backend/DB/Auth:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Payment:** Midtrans (Snap/Webhook)
- **State Management:** Zustand (for Builder state)

---

## 📂 Project Structure
```text
/
├── app/
│   ├── (marketing)/      # Landing page, pricing, about
│   ├── (auth)/           # Google Login (Stitch with Google)
│   ├── (dashboard)/      # User & Agency Workspace
│   │   ├── projects/     # List of invitations
│   │   ├── builder/      # The Main Editor (Side-by-side)
│   │   └── guests/       # RSVP & Guest Management
│   ├── (renderer)/       # The actual invitation [slug]
│   └── api/              # Webhooks (Midtrans), Supabase Edge Functions
├── components/
│   ├── ui/               # Shadcn components
│   ├── shared/           # Common components (Buttons, Modals)
│   ├── builder/          # Specific editor modules
│   └── themes/           # Invitation skin engines
├── store/                # Zustand stores
├── lib/                  # Utils, Supabase client, helpers
└── types/                # TypeScript interfaces/types


Development Guidelines
1. The "Modular Builder" Logic

Use JSON-driven rendering. The database stores a content JSONB field.

The (renderer)/[slug] page fetches this JSON and maps it to the selected Theme component.

The Builder updates the JSON state in real-time via Zustand.

2. UI/UX Principles

Spaciousness: Use generous padding and whitespace.

Micro-interactions: Every button and transition should have a subtle Framer Motion animation.

Mobile First: Invitations must be optimized for mobile WhatsApp browsers.

3. Business Logic

Stitch with Google: Zero-form registration. Use supabase.auth.signInWithOAuth.

Tiering: Only show Premium features if is_paid is true.

Concierge Mode: Admins have a flag to edit any invitation on behalf of the user.