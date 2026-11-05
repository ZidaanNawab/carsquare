import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { cars, carName, formatPrice, whatsappLink, BRAND } from "@/data/cars";
import { shortlist } from "@/lib/saved";
import { CarCard } from "@/components/site";

export const Route = createFileRoute("/shortlist")({
  head: () => ({
    meta: [
      { title: `My shortlist | ${BRAND}` },
      { name: "description", content: `Your saved used cars on ${BRAND}. Share your shortlist on WhatsApp.` },
      { property: "og:title", content: `My car shortlist — ${BRAND}` },
      { property: "og:description", content: "Saved owner-direct cars in Nagpur." },
    ],
  }),
  component: Shortlist,
});

function Shortlist() {
  const slugs = shortlist.use();
  const list = cars.filter((c) => slugs.includes(c.slug));
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  const share = `My ${BRAND} shortlist:\n${list.map((c) => `• ${carName(c)} — ${formatPrice(c.price)}\n  ${origin}/cars/${c.slug}`).join("\n")}`;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl font-bold text-foreground md:text-6xl">Shortlist</h1>
        {list.length > 0 && (
          <div className="flex gap-2">
            <button onClick={shortlist.clear} className="h-11 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-secondary transition-colors">Clear</button>
            <a href={whatsappLink(share)} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-xl bg-whatsapp hover:bg-[#16A34A] px-4 text-sm font-semibold text-[#0A0A0A] shadow-sm transition-colors"><Share2 className="size-4" /> Share on WhatsApp</a>
          </div>
        )}
      </div>
      {list.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center shadow-sm">
          <p className="text-muted-foreground">Tap the heart on any car to save it here.</p>
          <Link to="/cars" className="mt-4 inline-block font-semibold text-primary hover:underline">Browse inventory</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((c) => <CarCard key={c.slug} car={c} />)}</div>
      )}
    </div>
  );
}
