import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, BadgeIndianRupee, MessageCircle, ArrowRight, Camera, Handshake } from "lucide-react";
import heroCar from "@/assets/cars/xuv700.jpg";
import { cars, brands, BRAND, TAGLINE } from "@/data/cars";
import { CarCard, CountUp, Reveal, SectionTitle, StickyCta } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND} — ${TAGLINE} (Nagpur)` },
      { name: "description", content: "Verified second-hand cars listed directly by owners in Nagpur. No dealer markup, enquire on WhatsApp in one tap." },
      { property: "og:title", content: `${BRAND} — ${TAGLINE} in Nagpur` },
      { property: "og:description", content: "Verified used cars, no dealer markup. WhatsApp the owner in one tap." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const featured = cars.filter((c) => c.featured && !c.sold);
  return (
    <>
      {/* Hero */}
      <section className="grain hero-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
              <span className="size-2 rounded-full bg-primary" /> Nagpur · Verified owner listings
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-[0.95] text-foreground md:text-7xl">
              Buy direct.<br /><span className="text-primary">Skip the markup.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">Direct from owners. No dealer markup. One tap to WhatsApp, zero middlemen.</p>
            <form className="mt-8 flex max-w-md items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/cars", search: { q: q || undefined } }); }}>
              <Search className="ml-2 size-5 text-muted-foreground" aria-hidden />
              <label htmlFor="hero-q" className="sr-only">Search cars</label>
              <input id="hero-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Creta, Swift, diesel…" className="h-11 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground" />
              <button className="h-11 rounded-xl bg-primary hover:bg-[#16A34A] px-5 font-semibold text-[#0A0A0A] transition-colors active:scale-95 shadow-sm">Search</button>
            </form>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[{ n: 120, s: "+", l: "Cars listed" }, { n: 6, s: "", l: "Cities" }, { n: 100, s: "%", l: "Direct owners" }].map((x) => (
                <div key={x.l}>
                  <dt className="text-xs font-medium text-muted-foreground">{x.l}</dt>
                  <dd className="font-display text-3xl font-bold text-foreground"><CountUp to={x.n} suffix={x.s} /></dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <img src={heroCar} alt="Mahindra XUV700" width={1280} height={832} fetchPriority="high" className="w-full rounded-3xl object-cover shadow-xl border border-border/80" />
            <div className="absolute -bottom-4 left-4 rounded-2xl border border-border bg-card/95 px-5 py-3 shadow-lg backdrop-blur">
              <p className="text-xs font-medium text-muted-foreground">Avg. savings vs dealer</p>
              <p className="font-display text-2xl font-bold text-primary">₹ 68,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <SectionTitle eyebrow="Featured" title="Fresh this week" />
          <Link to="/cars" className="hidden items-center gap-1 text-sm text-primary md:flex">View all <ArrowRight className="size-4" /></Link>
        </div>
        <div className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {featured.map((c) => (
            <div key={c.slug} className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"><CarCard car={c} /></div>
          ))}
        </div>
      </section>

      {/* Brand strip */}
      <section className="overflow-hidden border-y py-6" aria-label="Brands available">
        <div className="marquee flex w-max gap-12 font-display text-2xl font-bold text-muted-foreground">
          {[...brands, ...brands, ...brands, ...brands].map((b, i) => (
            <Link key={i} to="/cars" search={{ brand: b }} className="hover:text-foreground">{b}</Link>
          ))}
        </div>
      </section>

      {/* How it works — bento */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionTitle eyebrow="How it works" title="Three steps. No haggling with middlemen." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { i: Search, t: "Browse verified cars", d: "Every listing is checked: RC, insurance and photos." },
            { i: MessageCircle, t: "WhatsApp the owner", d: "One tap opens a chat with the car's details prefilled." },
            { i: Handshake, t: "Inspect & drive home", d: "Meet, test drive and close the deal directly." },
          ].map((s, idx) => (
            <Reveal key={s.t} delay={idx * 120}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-sm">
                <span className="font-display text-6xl font-bold text-primary/25">0{idx + 1}</span>
                <s.i className="mt-4 size-7 text-primary" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust bento */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="grain hero-glow flex h-full flex-col justify-end rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12">
              <ShieldCheck className="size-10 text-primary" aria-hidden />
              <h2 className="mt-6 text-4xl font-bold md:text-5xl text-foreground">Direct from owners.<br />No dealer markup.</h2>
              <p className="mt-4 max-w-md text-muted-foreground">Dealers add 8–15% to every car. Here you pay what the owner asks — and negotiate with them, not a salesman.</p>
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-2"><TrustTile icon={BadgeIndianRupee} title="Transparent pricing" text="Prices set by owners, EMI estimates on every car." /></Reveal>
          <Reveal delay={200}><TrustTile icon={Camera} title="Real photos" text="No stock images. Real owner car photos." /></Reveal>
          <Reveal delay={300}><TrustTile icon={ShieldCheck} title="RC checked" text="Documents and registration verified." /></Reveal>
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 text-white shadow-xl md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Are you a dealer?</h2>
            <p className="mt-2 text-slate-300">Get owner-direct stock alerts on WhatsApp before anyone else.</p>
          </div>
          <Link to="/dealers" className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary hover:bg-[#16A34A] px-6 font-semibold text-[#0A0A0A] shadow transition-transform hover:scale-105">For dealers <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <StickyCta message="Hi CarSquare! I'm looking for a verified used car in Nagpur." label="Chat on WhatsApp" />
    </>
  );
}

function TrustTile({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return (
    <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm">
      <Icon className="size-6 text-primary" aria-hidden />
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
