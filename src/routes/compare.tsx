import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { cars, formatPrice, formatKm, BRAND, type Car } from "@/data/cars";
import { compare } from "@/lib/saved";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: `Compare cars side by side | ${BRAND}` },
      { name: "description", content: "Compare up to 3 owner-listed used cars side by side: price, km, fuel, owners and more." },
      { property: "og:title", content: `Compare cars — ${BRAND}` },
      { property: "og:description", content: "Side-by-side comparison of up to 3 used cars in Nagpur." },
    ],
  }),
  component: Compare,
});

const rows: [string, (c: Car) => string | number][] = [
  ["Price", (c) => formatPrice(c.price)], ["Year", (c) => c.year], ["Km driven", (c) => formatKm(c.km)],
  ["Fuel", (c) => c.fuel], ["Transmission", (c) => c.transmission], ["Owners", (c) => c.owners],
  ["Insurance", (c) => c.insuranceValidity], ["RC state", (c) => c.rcState], ["Location", (c) => c.city],
];

function Compare() {
  const slugs = compare.use();
  const list = slugs.map((s) => cars.find((c) => c.slug === s)).filter(Boolean) as Car[];
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground md:text-6xl">Compare</h1>
      <p className="mt-2 text-muted-foreground">Add up to 3 cars from any car page.</p>
      {list.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center shadow-sm">
          <p className="text-muted-foreground">No cars selected for comparison yet.</p>
          <Link to="/cars" className="mt-4 inline-block font-semibold text-primary hover:underline">Pick cars to compare</Link>
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr>
                <th className="w-32 p-4" />
                {list.map((c) => (
                  <th key={c.slug} className="p-4 align-top">
                    <div className="relative">
                      <img src={c.images[0]} alt="" width={1280} height={832} loading="lazy" className="aspect-[16/10] w-full rounded-xl object-cover border border-border" />
                      <button onClick={() => compare.toggle(c.slug)} aria-label={`Remove ${c.model}`} className="absolute right-2 top-2 grid size-8 place-items-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur hover:bg-card"><X className="size-4" /></button>
                    </div>
                    <Link to="/cars/$slug" params={{ slug: c.slug }} className="mt-3 block font-display text-lg font-semibold text-foreground hover:text-primary">{c.brand} {c.model}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, fn]) => (
                <tr key={label} className="border-t border-border">
                  <th scope="row" className="p-4 font-normal text-muted-foreground">{label}</th>
                  {list.map((c) => <td key={c.slug} className="p-4 font-semibold text-foreground">{fn(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
