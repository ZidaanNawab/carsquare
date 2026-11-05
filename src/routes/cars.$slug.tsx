import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Heart, MessageCircle, Phone, Share2, X, GitCompare, Check } from "lucide-react";
import { cars, getCar, carName, formatPrice, formatKm, emi, whatsappLink, BRAND, PHONE_NUMBER } from "@/data/cars";
import { CarCard, SectionTitle, StickyCta } from "@/components/site";
import { shortlist, compare } from "@/lib/saved";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cars/$slug")({
  loader: ({ params }) => {
    const car = getCar(params.slug);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: `Car unavailable | ${BRAND}` }, { name: "robots", content: "noindex" }] };
    const c = loaderData.car;
    const title = `${carName(c)} for sale in ${c.city} — ${formatPrice(c.price)} | ${BRAND}`;
    const desc = `${formatKm(c.km)}, ${c.fuel}, ${c.transmission}, ${c.owners} owner. Listed directly by the owner on ${BRAND}. WhatsApp to enquire.`;
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "product" }, { property: "og:url", content: `/cars/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/cars/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Car", name: carName(c), brand: c.brand, model: c.model,
          vehicleModelDate: String(c.year), fuelType: c.fuel, vehicleTransmission: c.transmission,
          numberOfPreviousOwners: c.owners, mileageFromOdometer: { "@type": "QuantitativeValue", value: c.km, unitCode: "KMT" },
          offers: { "@type": "Offer", price: c.price, priceCurrency: "INR", availability: c.sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock" },
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Car not found</h1>
      <Link to="/cars" className="mt-6 inline-block text-primary">Back to inventory</Link>
    </div>
  ),
  component: CarDetail,
});

function CarDetail() {
  const { car } = Route.useLoaderData();
  const saved = shortlist.use();
  const cmp = compare.use();
  const [url, setUrl] = useState(`/cars/${car.slug}`);
  useEffect(() => setUrl(window.location.href), [car.slug]);
  const name = carName(car);
  const msg = `Hi CarSquare, I'm interested in ${car.brand} ${car.model} ${car.variant} (${car.year}) listed at ${formatPrice(car.price)}. Link: ${url}`;
  const similar = cars.filter((c) => c.slug !== car.slug && !c.sold).sort((a, b) => Math.abs(a.price - car.price) - Math.abs(b.price - car.price)).slice(0, 3);

  const specs = [
    ["Year", car.year], ["Km driven", formatKm(car.km)], ["Fuel", car.fuel], ["Transmission", car.transmission],
    ["Owners", car.owners], ["Insurance", car.insuranceValidity], ["RC state", car.rcState], ["Location", car.city],
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link to="/cars" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"><ChevronLeft className="size-4" /> Inventory</Link>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Gallery images={car.images} alt={name} sold={car.sold} />

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{car.year} · {car.brand} · {car.city}</p>
          <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">{car.model} <span className="text-muted-foreground">{car.variant}</span></h1>
          <p className="mt-4 font-display text-5xl font-bold text-primary">{formatPrice(car.price)}</p>
          <p className="mt-1 text-sm text-muted-foreground">EMI from ₹{Math.round(emi(car.price * 0.8, 9.5, 60)).toLocaleString("en-IN")}/mo</p>

          {car.sold ? (
            <p className="mt-6 rounded-xl bg-destructive/15 p-4 text-sm font-medium text-destructive">This car has been sold. See similar cars below.</p>
          ) : (
            <div className="mt-6 hidden gap-3 md:flex">
              <a href={whatsappLink(msg)} target="_blank" rel="noopener" className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-[#16A34A] py-3.5 font-semibold text-[#0A0A0A] shadow-sm transition-all hover:scale-[1.02]"><MessageCircle className="size-5" /> WhatsApp Enquiry</a>
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-5 font-semibold text-foreground"><Phone className="size-5" /> Call</a>
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <ActionBtn onClick={() => shortlist.toggle(car.slug)} active={saved.includes(car.slug)} icon={Heart} label={saved.includes(car.slug) ? "Shortlisted" : "Shortlist"} />
            <ActionBtn onClick={() => { if (!compare.toggle(car.slug)) alert("You can compare up to 3 cars."); }} active={cmp.includes(car.slug)} icon={cmp.includes(car.slug) ? Check : GitCompare} label="Compare" />
            <a href={whatsappLink(`Check out this ${name}: ${url}`)} target="_blank" rel="noopener" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary"><Share2 className="size-4" /> Share</a>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3">
            {specs.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border bg-card p-4 shadow-sm"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 font-semibold text-foreground">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground">Highlights</h2>
          <ul className="mt-4 space-y-2">{car.highlights.map((h) => <li key={h} className="flex gap-2 text-foreground"><Check className="mt-0.5 size-5 shrink-0 text-primary" />{h}</li>)}</ul>
          <h2 className="mt-8 text-2xl font-bold text-foreground">Condition notes</h2>
          <p className="mt-3 text-muted-foreground">{car.conditionNotes}</p>
        </section>
        <EmiCalculator price={car.price} />
      </div>

      {car.videoId && (
        <section className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <iframe className="aspect-video w-full" src={`https://www.youtube-nocookie.com/embed/${car.videoId}`} title={`${name} walkaround video`} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
        </section>
      )}

      <section className="mt-20">
        <SectionTitle eyebrow="You may also like" title="Similar cars" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{similar.map((c) => <CarCard key={c.slug} car={c} />)}</div>
      </section>

      {!car.sold && <StickyCta message={msg} />}
    </div>
  );
}

function ActionBtn({ onClick, active, icon: Icon, label }: { onClick: () => void; active: boolean; icon: typeof Heart; label: string }) {
  return (
    <button onClick={onClick} aria-pressed={active} className={cn("flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border text-sm transition-colors", active ? "border-primary/50 bg-[#DCFCE7] text-[#14532D] font-semibold dark:bg-primary/20 dark:text-[#22C55E]" : "border-border bg-card text-foreground hover:bg-secondary")}>
      <Icon className={cn("size-4", active && "fill-[#14532D] dark:fill-[#22C55E]")} /> {label}
    </button>
  );
}

function Gallery({ images, alt, sold }: { images: string[]; alt: string; sold?: boolean | undefined }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const touch = useRef<number | null>(null);
  const go = (d: number) => setI((p) => (p + d + images.length) % images.length);
  useEffect(() => {
    if (!full) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setFull(false); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });
  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (touch.current = e.touches[0]?.clientX ?? null),
    onTouchEnd: (e: React.TouchEvent) => { if (touch.current === null) return; const dx = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touch.current = null; },
  };
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-muted" {...swipe}>
        <img src={images[i]} alt={`${alt} — photo ${i + 1}`} width={1280} height={832} fetchPriority="high" className={cn("aspect-[16/10] w-full object-cover", sold && "grayscale")} />
        {sold && <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-xs font-bold uppercase text-destructive-foreground">Sold</span>}
        <button onClick={() => setFull(true)} aria-label="Open fullscreen" className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur hover:bg-card"><Expand className="size-4" /></button>
        <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur hover:bg-card"><ChevronLeft className="size-5" /></button>
        <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur hover:bg-card"><ChevronRight className="size-5" /></button>
      </div>
      <div className="mt-3 flex gap-3">
        {images.map((src, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Show photo ${idx + 1}`} className={cn("overflow-hidden rounded-xl border-2 transition-opacity", idx === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
            <img src={src} alt="" width={160} height={104} loading="lazy" className="h-16 w-24 object-cover" />
          </button>
        ))}
      </div>
      {full && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur-md" {...swipe}>
          <img src={images[i]} alt={`${alt} — photo ${i + 1}`} className="max-h-[85vh] w-auto rounded-2xl shadow-2xl" />
          <button onClick={() => setFull(false)} aria-label="Close" autoFocus className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur hover:bg-white/30"><X /></button>
          <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-4 grid size-12 place-items-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur hover:bg-white/30"><ChevronLeft /></button>
          <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-4 grid size-12 place-items-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur hover:bg-white/30"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}

function EmiCalculator({ price }: { price: number }) {
  const [down, setDown] = useState(Math.round(price * 0.2));
  const [rate, setRate] = useState(9.5);
  const [months, setMonths] = useState(60);
  const monthly = emi(price - down, rate, months);
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm" aria-labelledby="emi-h">
      <h2 id="emi-h" className="text-2xl font-bold text-foreground">EMI estimate</h2>
      <p className="mt-4 font-display text-4xl font-bold text-primary">₹{Math.round(monthly).toLocaleString("en-IN")}<span className="text-base text-muted-foreground">/month</span></p>
      <div className="mt-6 space-y-5 text-sm">
        <Slider label={`Down payment: ${formatPrice(down)}`} min={0} max={price} step={10000} value={down} onChange={setDown} />
        <Slider label={`Interest rate: ${rate}%`} min={7} max={16} step={0.25} value={rate} onChange={setRate} />
        <Slider label={`Tenure: ${months} months`} min={12} max={84} step={12} value={months} onChange={setMonths} />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Indicative only. Actual rates depend on your lender.</p>
    </section>
  );
}

function Slider({ label, ...p }: { label: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block space-y-2"><span className="text-muted-foreground">{label}</span>
      <input type="range" min={p.min} max={p.max} step={p.step} value={p.value} onChange={(e) => p.onChange(Number(e.target.value))} className="w-full accent-primary" />
    </label>
  );
}
