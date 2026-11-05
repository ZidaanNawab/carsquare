import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter, InstagramChip } from "@/components/site";
import { BRAND, TAGLINE, INSTAGRAM_URL, PHONE_NUMBER } from "@/data/cars";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary hover:bg-[#16A34A] px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary hover:bg-[#16A34A] px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#FAFAF7" },
      { title: `${BRAND} — ${TAGLINE} (Nagpur)` },
      { name: "description", content: "Direct from owners. No dealer markup. Browse verified used cars in Nagpur and enquire on WhatsApp in one tap." },
      { property: "og:site_name", content: BRAND },
      { property: "og:title", content: `${BRAND} — ${TAGLINE}` },
      { property: "og:description", content: "Direct from owners. No dealer markup. Verified used cars in Nagpur." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://carsquare.in/og-image.png" },
      { property: "og:image:width", content: "500" },
      { property: "og:image:height", content: "500" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: "https://carsquare.in/og-image.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "CarSquare",
    url: "https://carsquare.in",
    logo: "https://carsquare.in/favicon.svg",
    description: "Direct from owners. No dealer markup. Verified used cars in Nagpur.",
    telephone: PHONE_NUMBER,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dharampeth",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      postalCode: "440010",
      addressCountry: "IN",
    },
    sameAs: [INSTAGRAM_URL],
  };

  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('carsquare_theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="animate-in fade-in duration-500">
        <Outlet />
      </main>
      <InstagramChip />
      <SiteFooter />
    </QueryClientProvider>
  );
}
