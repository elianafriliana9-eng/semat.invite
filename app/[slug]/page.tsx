import { supabase } from "@/lib/supabase";
import { themeRegistry } from "@/components/themes";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cache } from "react";

interface PublicInvitationPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

// Cache the fetch to avoid double requests between generateMetadata and Page component
const getInvitation = cache(async (slug: string) => {
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .single();
  return { data, error };
});

export async function generateMetadata({ params }: PublicInvitationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: invitation } = await getInvitation(slug);

  if (!invitation) return {};

  const content = invitation.content;
  const groom = content.couple?.groom?.name || "Groom";
  const bride = content.couple?.bride?.name || "Bride";
  const title = `The Wedding of ${groom} & ${bride} | KanvasKita`;
  const description = `Buka undangan digital pernikahan ${groom} & ${bride}. Elegan dalam Sematan, Abadi dalam Ingatan.`;
  const image = content.couple?.groom?.photo || content.couple?.bride?.photo || "/og-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://KanvasKita/${slug}`,
      siteName: 'KanvasKita',
      images: [{ url: image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function PublicInvitationPage({ params, searchParams }: PublicInvitationPageProps) {
  const { slug } = await params;
  const { to: guestName } = await searchParams;

  // 1. Fetch data from Supabase (Cached)
  const { data: invitation, error } = await getInvitation(slug);

  if (error || !invitation) {
    return notFound();
  }

  // 2. Increment view count (Side effect)
  // We don't await this to avoid blocking the initial render
  supabase.rpc('increment_views', { target_slug: slug }).then(({ error }) => {
    if (error) console.error("Failed to increment views:", error);
  });

  // 3. Identify Theme
  const themeId = invitation.theme_id || "default-luxury";
  const ThemeComponent = themeRegistry[themeId] || themeRegistry["default-luxury"];

  return (
    <main>
      <ThemeComponent data={invitation.content} id={invitation.id} guestName={guestName} />
    </main>
  );
}
