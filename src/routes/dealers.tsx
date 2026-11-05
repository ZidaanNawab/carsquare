import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Zap, Users, MessageCircle } from "lucide-react";
import { whatsappLink, BRAND } from "@/data/cars";
import { Reveal, SectionTitle, StickyCta } from "@/components/site";

export const Route = createFileRoute("/dealers")({
  head: () => ({
    meta: [
      { title: `For Dealers — Owner-direct stock in Nagpur | ${BRAND}` },
      { name: "description", content: `Source owner-direct used cars in Nagpur with ${BRAND}. Bulk enquiries and new stock alerts on WhatsApp.` },
      { property: "og:title", content: `${BRAND} for Dealers` },
      { property: "og:description", content: "Owner-direct stock alerts on WhatsApp, before anyone else." },
    ],
  }),
  component: Dealers,
});

function Dealers() {
  const [form, setForm] = useState({ name: "", business: "", city: "Nagpur", wants: "", alerts: true });
  const msg = `${BRAND} dealer enquiry\nName: ${form.name}\nBusiness: ${form.business}\nCity: ${form.city}\nLooking for: ${form.wants}${form.alerts ? "\nPlease add me to new stock alerts." : ""}`;
  const input = "h-12 w-full rounded-xl border border-border bg-secondary/80 text-foreground px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors";
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <section className="grain relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 text-white shadow-xl md:p-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#22C55E]">For dealers</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[0.95] text-white md:text-7xl">Fresh stock. Straight from owners.</h1>
        <p className="mt-6 max-w-xl text-lg text-slate-300">Get first look at owner-listed cars across Nagpur & Vidarbha, delivered to your WhatsApp.</p>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[{ i: Zap, t: "First access", d: "Alerts the moment a car is verified." }, { i: Users, t: "Real owners", d: "No broker chains, no inflated prices." }, { i: Bell, t: "Filtered to you", d: "Only the brands and budgets you deal in." }].map((x, idx) => (
          <Reveal key={x.t} delay={idx * 100}><div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm"><x.i className="size-6 text-primary" /><h2 className="mt-4 text-xl font-semibold text-foreground">{x.t}</h2><p className="mt-1 text-muted-foreground">{x.d}</p></div></Reveal>
        ))}
      </div>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <SectionTitle eyebrow="Bulk enquiry" title="Tell us what you're sourcing." />
        <form className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm" onSubmit={(e) => { e.preventDefault(); window.open(whatsappLink(msg), "_blank", "noopener"); }}>
          <label className="block space-y-1.5"><span className="text-sm text-muted-foreground">Your name</span><input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="block space-y-1.5"><span className="text-sm text-muted-foreground">Dealership</span><input required className={input} value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} /></label>
          <label className="block space-y-1.5"><span className="text-sm text-muted-foreground">City</span><input className={input} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></label>
          <label className="block space-y-1.5"><span className="text-sm text-muted-foreground">Looking for (brands, budget, quantity)</span><textarea required rows={4} className="w-full rounded-xl border border-border bg-secondary/80 text-foreground p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" value={form.wants} onChange={(e) => setForm({ ...form, wants: e.target.value })} /></label>
          <label className="flex items-center gap-3 text-sm text-foreground"><input type="checkbox" checked={form.alerts} onChange={(e) => setForm({ ...form, alerts: e.target.checked })} className="size-5 accent-primary" /> Get new stock alerts on WhatsApp</label>
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-whatsapp hover:bg-[#16A34A] font-semibold text-[#0A0A0A] shadow-sm transition-colors"><MessageCircle className="size-5" /> Send on WhatsApp</button>
        </form>
      </section>
      <StickyCta message={`Hi ${BRAND}, please add me to dealer stock alerts.`} label="Get stock alerts" />
    </div>
  );
}
