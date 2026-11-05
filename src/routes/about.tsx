import { createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone, Instagram } from "lucide-react";
import { whatsappLink, BRAND, TAGLINE, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_NUMBER } from "@/data/cars";
import { StickyCta } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About & Contact | ${BRAND} Nagpur` },
      { name: "description", content: `${BRAND} connects Nagpur car buyers directly with owners. ${TAGLINE} Visit us or chat on WhatsApp.` },
      { property: "og:title", content: `About ${BRAND} — ${TAGLINE}` },
      { property: "og:description", content: "Nagpur's verified owner-direct used car marketplace." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] text-foreground md:text-7xl">
        Cars, minus the <span className="text-primary">middlemen.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        We started {BRAND} in Nagpur because buying a used car shouldn't mean paying a dealer's cut. Every car is listed directly by its owner, verified by us, and one WhatsApp message away.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground">Contact & Location</h2>
          <p className="flex gap-3 text-muted-foreground"><MapPin className="size-5 shrink-0 text-primary" /> Dharampeth, Nagpur, Maharashtra 440010</p>
          <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 font-medium text-foreground hover:text-primary transition-colors"><Phone className="size-5 text-primary" /> {PHONE_NUMBER}</a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-medium text-foreground hover:text-primary transition-colors"
          >
            <Instagram className="size-5 shrink-0 text-[#E1306C]" />
            <span>Follow {INSTAGRAM_HANDLE} on Instagram</span>
          </a>
          <div className="pt-2">
            <a href={whatsappLink(`Hi ${BRAND}!`)} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-xl bg-whatsapp hover:bg-[#16A34A] px-6 font-semibold text-[#0A0A0A] shadow-sm transition-colors"><MessageCircle className="size-5" /> Chat on WhatsApp</a>
          </div>
          <p className="text-sm text-muted-foreground">Mon–Sat, 10am – 8pm</p>
        </div>
        <iframe title={`${BRAND} location map`} className="min-h-80 w-full rounded-3xl border border-border shadow-sm" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=79.04%2C21.12%2C79.10%2C21.16&layer=mapnik&marker=21.14%2C79.07" />
      </div>
      <StickyCta message={`Hi ${BRAND}!`} label="Chat on WhatsApp" />
    </div>
  );
}
