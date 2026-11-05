# CarSquare

> **Direct from owners. No dealer markup.** (Nagpur)

CarSquare is a modern, owner-direct used car marketplace for Nagpur and Vidarbha. Buyers connect directly with verified vehicle owners with zero dealer markup and instant one-tap WhatsApp enquiries.

## Brand & Features

- **Brand**: CarSquare
- **Tagline**: Direct from owners. No dealer markup.
- **Location**: Nagpur, Maharashtra
- **Instagram**: [@carsquare.ngp](https://instagram.com/carsquare.ngp)
- **Theme**: Warm off-white (`#FAFAF7`) light theme with pure white cards, electric orange (`#EA580C`) accents, and an optional dark mode toggle.
- **Inventory**: Stored in `src/data/cars.ts`, automatically generating individual dynamic pages at `/cars/<slug>` and `/sitemap.xml`.
- **Shortlist & Comparison**: Fast, client-side localStorage stores in `src/lib/saved.ts`.
- **WhatsApp Integration**: Prefilled enquiry format: `"Hi CarSquare, I'm interested in [Car Name] ([Year]) listed at [Price]. Link: [URL]"`.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev)

## Local Development

```sh
npm install
npm run dev
```

The preview will start at `http://localhost:8080/`.

To run tests:
```sh
npm test
```
