import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { cars, brands, formatPrice, BRAND } from "@/data/cars";
import { CarCard } from "@/components/site";

type SortKey = "newest" | "price-asc" | "price-desc" | "km-asc";
interface Filters {
  q?: string | undefined; brand?: string | undefined; maxPrice?: number | undefined; minYear?: number | undefined; fuel?: string | undefined;
  transmission?: string | undefined; maxKm?: number | undefined; owners?: number | undefined; sort?: SortKey | undefined;
}

const num = (v: unknown) => (v === undefined || v === "" || isNaN(Number(v)) ? undefined : Number(v));
const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/cars/")({
  validateSearch: (s: { [K in keyof Filters]?: unknown }): Filters => ({
    q: str(s.q), brand: str(s.brand), fuel: str(s.fuel), transmission: str(s.transmission),
    maxPrice: num(s.maxPrice), minYear: num(s.minYear), maxKm: num(s.maxKm), owners: num(s.owners),
    sort: (str(s.sort) as SortKey) ?? undefined,
  }),
  head: () => ({
    meta: [
      { title: `Used cars in Nagpur — Inventory | ${BRAND}` },
      { name: "description", content: "Filter verified owner-listed used cars in Nagpur by brand, price, year, fuel, transmission and km driven." },
      { property: "og:title", content: `Used cars in Nagpur — ${BRAND} inventory` },
      { property: "og:description", content: "Every car listed directly by its owner. Filter and enquire on WhatsApp." },
    ],
  }),
  component: Inventory,
});

const MAX_PRICE = 2500000;

function Inventory() {
  const f = Route.useSearch();
  const navigate = useNavigate({ from: "/cars/" });
  const set = (patch: Partial<Filters>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const results = useMemo(() => {
    const q = f.q?.toLowerCase().trim();
    let r = cars.filter((c) =>
      (!q || `${c.year} ${c.brand} ${c.model} ${c.variant} ${c.fuel} ${c.city}`.toLowerCase().includes(q)) &&
      (!f.brand || c.brand === f.brand) && (!f.fuel || c.fuel === f.fuel) &&
      (!f.transmission || c.transmission === f.transmission) &&
      (!f.maxPrice || c.price <= f.maxPrice) && (!f.minYear || c.year >= f.minYear) &&
      (!f.maxKm || c.km <= f.maxKm) && (!f.owners || c.owners <= f.owners));
    const s = f.sort ?? "newest";
    r = [...r].sort((a, b) =>
      s === "price-asc" ? a.price - b.price : s === "price-desc" ? b.price - a.price : s === "km-asc" ? a.km - b.km : b.year - a.year);
    return r.sort((a, b) => Number(!!a.sold) - Number(!!b.sold));
  }, [f]);

  const select = "h-11 w-full rounded-xl border border-border bg-secondary/80 text-foreground px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors";
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-bold md:text-6xl text-foreground">Inventory</h1>
      <p className="mt-2 text-muted-foreground">{results.length} cars · direct from owners</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit space-y-4 rounded-3xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-24" aria-label="Filters">
          <p className="flex items-center gap-2 font-semibold text-foreground"><SlidersHorizontal className="size-4" /> Filters</p>
          <label className="relative block">
            <span className="sr-only">Search</span>
            <Search className="absolute left-3 top-3 size-5 text-muted-foreground" aria-hidden />
            <input value={f.q ?? ""} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Search…" className={`${select} pl-10`} />
          </label>
          <Field label="Brand"><select className={select} value={f.brand ?? ""} onChange={(e) => set({ brand: e.target.value || undefined })}><option value="">All brands</option>{brands.map((b) => <option key={b}>{b}</option>)}</select></Field>
          <Field label={`Max price: ${formatPrice(f.maxPrice ?? MAX_PRICE)}`}>
            <input type="range" min={300000} max={MAX_PRICE} step={50000} value={f.maxPrice ?? MAX_PRICE} onChange={(e) => set({ maxPrice: Number(e.target.value) >= MAX_PRICE ? undefined : Number(e.target.value) })} className="w-full accent-primary" />
          </Field>
          <Field label="Min year"><select className={select} value={f.minYear ?? ""} onChange={(e) => set({ minYear: num(e.target.value) })}><option value="">Any</option>{[2023, 2022, 2021, 2020, 2019, 2018].map((y) => <option key={y} value={y}>{y}+</option>)}</select></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fuel"><select className={select} value={f.fuel ?? ""} onChange={(e) => set({ fuel: e.target.value || undefined })}><option value="">Any</option>{["Petrol", "Diesel", "CNG", "Electric"].map((x) => <option key={x}>{x}</option>)}</select></Field>
            <Field label="Gearbox"><select className={select} value={f.transmission ?? ""} onChange={(e) => set({ transmission: e.target.value || undefined })}><option value="">Any</option><option>Manual</option><option>Automatic</option></select></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Max km"><select className={select} value={f.maxKm ?? ""} onChange={(e) => set({ maxKm: num(e.target.value) })}><option value="">Any</option>{[20000, 40000, 60000, 100000].map((k) => <option key={k} value={k}>≤ {k / 1000}k</option>)}</select></Field>
            <Field label="Owners"><select className={select} value={f.owners ?? ""} onChange={(e) => set({ owners: num(e.target.value) })}><option value="">Any</option><option value={1}>1st owner</option><option value={2}>≤ 2</option></select></Field>
          </div>
          <button onClick={() => navigate({ search: {}, replace: true })} className="text-sm font-semibold text-primary hover:underline">Reset all</button>
        </aside>

        <section>
          <div className="mb-4 flex justify-end">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">Sort
              <select className="h-10 rounded-xl border border-border bg-card px-3 text-foreground shadow-sm" value={f.sort ?? "newest"} onChange={(e) => set({ sort: e.target.value as SortKey })}>
                <option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="km-asc">Lowest km</option>
              </select>
            </label>
          </div>
          {results.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground shadow-sm">No cars match. Try widening your filters.</div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c, i) => <CarCard key={c.slug} car={c} eager={i < 2} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5"><span className="text-xs text-muted-foreground">{label}</span>{children}</label>;
}
