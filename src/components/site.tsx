import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heart, MessageCircle, Phone, Menu, X, GitCompare, Instagram, Sun, Moon } from "lucide-react";
import { BRAND, TAGLINE, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_NUMBER, whatsappLink, carName, formatPrice, formatKm, type Car } from "@/data/cars";
import { shortlist, compare } from "@/lib/saved";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/cars", label: "Inventory" },
  { to: "/dealers", label: "For Dealers" },
  { to: "/about", label: "About & Contact" },
] as const;

export function CarSquareLogoIcon({ className = "size-7" }: { className?: string }) {
  return (
    <img src="/logo.svg" className={className} alt="" aria-hidden="true" />
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") ||
      localStorage.getItem("carsquare_theme") === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("carsquare_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("carsquare_theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-10 place-items-center rounded-full border border-border bg-secondary/80 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {dark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-slate-600" />}
    </button>
  );
}

export function SiteHeader() {
  const saved = shortlist.use();
  const cmp = compare.use();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-90">
          <CarSquareLogoIcon className="size-7 shrink-0 shadow-sm" />
          <span>
            Car<span className="text-primary">Square</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`CarSquare on Instagram (${INSTAGRAM_HANDLE})`}
            className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary hover:text-primary lg:inline-flex"
          >
            <Instagram className="size-3.5 text-[#15803D] dark:text-[#22C55E]" />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>
          <Link to="/compare" aria-label={`Compare (${cmp.length})`} className="relative grid size-10 place-items-center rounded-full border border-border bg-secondary/80 text-foreground hover:bg-accent transition-colors">
            <GitCompare className="size-4" />
            {cmp.length > 0 && <Badge>{cmp.length}</Badge>}
          </Link>
          <Link to="/shortlist" aria-label={`Shortlist (${saved.length})`} className="relative grid size-10 place-items-center rounded-full border border-border bg-secondary/80 text-foreground hover:bg-accent transition-colors">
            <Heart className="size-4" />
            {saved.length > 0 && <Badge>{saved.length}</Badge>}
          </Link>
          <ThemeToggle />
          <button className="grid size-10 place-items-center rounded-full border border-border bg-secondary/80 text-foreground hover:bg-accent md:hidden transition-colors" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-card px-4 py-4 md:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl font-semibold text-foreground hover:text-primary">{n.label}</Link>
          ))}
          <div className="mt-4 border-t border-border pt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-semibold text-foreground hover:text-primary"
            >
              <Instagram className="size-4 text-[#15803D] dark:text-[#22C55E]" />
              <span>Follow on Instagram ({INSTAGRAM_HANDLE})</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-[#0A0A0A] shadow-sm">{children}</span>;
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#0A0A0A] text-white pb-28 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
            <CarSquareLogoIcon className="size-7 shrink-0 shadow-sm" />
            <span>Car<span className="text-[#22C55E]">Square</span></span>
          </Link>
          <p className="mt-3 font-medium text-slate-200">{TAGLINE}</p>
          <p className="mt-1 max-w-sm text-sm text-slate-400">Verified used cars, direct from owners across Nagpur & Vidarbha.</p>
          <div className="mt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-[#22C55E]"
            >
              <Instagram className="size-4 text-[#22C55E]" />
              <span>Instagram: {INSTAGRAM_HANDLE}</span>
            </a>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Explore</p>
          <Link to="/cars" className="block text-slate-400 transition-colors hover:text-white">Inventory</Link>
          <Link to="/compare" className="block text-slate-400 transition-colors hover:text-white">Compare</Link>
          <Link to="/shortlist" className="block text-slate-400 transition-colors hover:text-white">Shortlist</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Company</p>
          <Link to="/dealers" className="block text-slate-400 transition-colors hover:text-white">For Dealers</Link>
          <Link to="/about" className="block text-slate-400 transition-colors hover:text-white">About & Contact</Link>
          <a href={whatsappLink(`Hi ${BRAND}!`)} className="block text-slate-400 transition-colors hover:text-white">WhatsApp us</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="block text-slate-400 transition-colors hover:text-white">Follow {INSTAGRAM_HANDLE}</a>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-4 text-xs text-slate-500">© {new Date().getFullYear()} {BRAND}. Nagpur, Maharashtra.</p>
    </footer>
  );
}

/** Floating "Follow on Instagram" chip. */
export function InstagramChip() {
  return (
    <aside aria-label="Follow CarSquare on Instagram" className="fixed bottom-20 left-4 z-40 hidden sm:flex md:bottom-6 md:left-6">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 rounded-full border border-border bg-card/95 px-3.5 py-2 text-xs font-semibold shadow-md backdrop-blur transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-[#22C55E]/15"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[#0A0A0A]">
          <Instagram className="size-3.5" />
        </span>
        <span className="text-foreground">Follow on Instagram</span>
        <span className="font-bold text-primary">{INSTAGRAM_HANDLE}</span>
      </a>
    </aside>
  );
}

/** Fixed thumb-friendly bottom bar on mobile. */
export function StickyCta({ message, label = "WhatsApp Enquiry" }: { message: string; label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <a href={`tel:${PHONE_NUMBER}`} className="grid h-12 w-14 place-items-center rounded-xl border border-border bg-secondary text-foreground" aria-label="Call"><Phone className="size-5" /></a>
        <a href={whatsappLink(message)} target="_blank" rel="noopener" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-[#16A34A] font-semibold text-[#0A0A0A] shadow-sm transition-colors">
          <MessageCircle className="size-5" /> {label}
        </a>
      </div>
    </div>
  );
}

/** Scroll reveal with stagger, transform/opacity only. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function CarCard({ car, eager = false }: { car: Car; eager?: boolean }) {
  const saved = shortlist.use();
  const isSaved = saved.includes(car.slug);
  return (
    <article className="group lift relative overflow-hidden rounded-2xl border border-border bg-card">
      <Link to="/cars/$slug" params={{ slug: car.slug }} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img src={car.images[0]} alt={carName(car)} width={1280} height={832} loading={eager ? "eager" : "lazy"} decoding="async" className={cn("size-full object-cover transition-transform duration-700 group-hover:scale-105", car.sold && "opacity-50 grayscale")} />
          {car.sold ? (
            <span className="absolute left-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-bold uppercase tracking-wider text-destructive-foreground shadow-sm">Sold</span>
          ) : (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#14532D] shadow-sm backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#16A34A]" />
              Direct Owner
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{car.year} · {car.brand}</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{car.model} <span className="text-muted-foreground">{car.variant}</span></h3>
          <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
            {[formatKm(car.km), car.fuel, car.transmission, `${car.owners} owner`].map((t) => (
              <span key={t} className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">{t}</span>
            ))}
          </div>
          <p className="mt-4 font-display text-2xl font-bold text-primary">{formatPrice(car.price)}</p>
        </div>
      </Link>
      <button onClick={() => shortlist.toggle(car.slug)} aria-pressed={isSaved} aria-label={isSaved ? "Remove from shortlist" : "Add to shortlist"} className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-border bg-card/90 shadow-sm backdrop-blur hover:bg-card transition-colors">
        <Heart className={cn("size-5 transition-colors", isSaved ? "fill-primary text-primary" : "text-muted-foreground hover:text-foreground")} />
      </button>
    </article>
  );
}

export function SectionTitle({ eyebrow, title, className }: { eyebrow: string; title: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-bold md:text-5xl text-foreground">{title}</h2>
    </div>
  );
}

