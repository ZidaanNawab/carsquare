/**
 * Car inventory. Adding a car = adding one object here; its page at
 * /cars/<slug> is generated automatically. Later swappable for a database.
 */
import creta from "@/assets/cars/creta.jpg";
import swift from "@/assets/cars/swift.jpg";
import xuv700 from "@/assets/cars/xuv700.jpg";
import city from "@/assets/cars/city.jpg";
import seltos from "@/assets/cars/seltos.jpg";
import nexon from "@/assets/cars/nexon.jpg";
import innova from "@/assets/cars/innova.jpg";
import baleno from "@/assets/cars/baleno.jpg";

export type Fuel = "Petrol" | "Diesel" | "CNG" | "Electric";
export type Transmission = "Manual" | "Automatic";

export interface Car {
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number; // INR
  km: number;
  fuel: Fuel;
  transmission: Transmission;
  owners: number;
  insuranceValidity: string;
  rcState: string;
  city: string;
  images: string[];
  highlights: string[];
  conditionNotes: string;
  videoId?: string; // YouTube id
  featured?: boolean;
  sold?: boolean;
}

export const BRAND = "CarSquare";
export const TAGLINE = "Direct from owners. No dealer markup.";
export const INSTAGRAM_HANDLE = "@carsquare.ngp";
export const INSTAGRAM_URL = "https://instagram.com/carsquare.ngp";
export const WHATSAPP_NUMBER = "919800000000"; // placeholder
export const PHONE_NUMBER = "+919800000000"; // placeholder

export const carEnquiryMessage = (car: Car, url: string) =>
  `Hi CarSquare, I'm interested in ${car.brand} ${car.model} ${car.variant} (${car.year}) listed at ${formatPrice(car.price)}. Link: ${url}`;

export const cars: Car[] = [
  { slug: "2019-hyundai-creta-sx-nagpur", brand: "Hyundai", model: "Creta", variant: "SX 1.6", year: 2019, price: 1045000, km: 42000, fuel: "Petrol", transmission: "Manual", owners: 1, insuranceValidity: "Mar 2027", rcState: "MH-31", city: "Nagpur", images: [creta, seltos, nexon], highlights: ["Sunroof", "Full service history at Hyundai", "New tyres (2025)", "Touchscreen with CarPlay"], conditionNotes: "Minor scratch on rear bumper. Interior spotless, non-smoker owner.", videoId: "dQw4w9WgXcQ", featured: true },
  { slug: "2021-maruti-swift-zxi-nagpur", brand: "Maruti Suzuki", model: "Swift", variant: "ZXi Plus", year: 2021, price: 645000, km: 28000, fuel: "Petrol", transmission: "Manual", owners: 1, insuranceValidity: "Jan 2027", rcState: "MH-31", city: "Nagpur", images: [swift, baleno, city], highlights: ["Dual-tone roof", "LED projector headlamps", "Company-serviced"], conditionNotes: "Like new. One small dent on left door, professionally repaired.", featured: true },
  { slug: "2022-mahindra-xuv700-ax7-nagpur", brand: "Mahindra", model: "XUV700", variant: "AX7 AT", year: 2022, price: 2150000, km: 31000, fuel: "Diesel", transmission: "Automatic", owners: 1, insuranceValidity: "Aug 2027", rcState: "MH-49", city: "Nagpur", images: [xuv700, creta, innova], highlights: ["ADAS Level 2", "Panoramic sunroof", "7-seater", "Extended warranty till 2027"], conditionNotes: "Showroom condition. Ceramic coated.", featured: true },
  { slug: "2020-honda-city-vx-nagpur", brand: "Honda", model: "City", variant: "VX CVT", year: 2020, price: 1095000, km: 39000, fuel: "Petrol", transmission: "Automatic", owners: 2, insuranceValidity: "Nov 2026", rcState: "MH-31", city: "Nagpur", images: [city, swift, baleno], highlights: ["CVT automatic", "Lane watch camera", "Sunroof"], conditionNotes: "Second owner since 2023. All original paint.", featured: true },
  { slug: "2021-kia-seltos-htx-nagpur", brand: "Kia", model: "Seltos", variant: "HTX 1.5", year: 2021, price: 1365000, km: 36000, fuel: "Diesel", transmission: "Manual", owners: 1, insuranceValidity: "May 2027", rcState: "MH-40", city: "Wardha", images: [seltos, creta, nexon], highlights: ["Bose sound system", "Ventilated seats", "Connected car tech"], conditionNotes: "Minor stone chips on bonnet. Mechanically perfect." },
  { slug: "2023-tata-nexon-ev-max-nagpur", brand: "Tata", model: "Nexon", variant: "EV Max XZ+", year: 2023, price: 1480000, km: 18000, fuel: "Electric", transmission: "Automatic", owners: 1, insuranceValidity: "Sep 2027", rcState: "MH-31", city: "Nagpur", images: [nexon, seltos, xuv700], highlights: ["437 km claimed range", "Battery warranty till 2031", "Home charger included"], conditionNotes: "Battery health 97%. Single owner, garage parked.", featured: true },
  { slug: "2018-toyota-innova-crysta-gx-nagpur", brand: "Toyota", model: "Innova Crysta", variant: "2.4 GX", year: 2018, price: 1690000, km: 88000, fuel: "Diesel", transmission: "Manual", owners: 2, insuranceValidity: "Feb 2027", rcState: "MH-31", city: "Nagpur", images: [innova, xuv700, city], highlights: ["8-seater", "Toyota-serviced", "Ideal for family / travel"], conditionNotes: "Highway driven. Clutch replaced at 80k km.", sold: true },
  { slug: "2022-maruti-baleno-alpha-nagpur", brand: "Maruti Suzuki", model: "Baleno", variant: "Alpha AMT", year: 2022, price: 815000, km: 21000, fuel: "Petrol", transmission: "Automatic", owners: 1, insuranceValidity: "Jun 2027", rcState: "MH-31", city: "Nagpur", images: [baleno, swift, city], highlights: ["Heads-up display", "360° camera", "AMT automatic"], conditionNotes: "Zero accidents. Under manufacturer warranty." },
];

export const carName = (c: Car) => `${c.year} ${c.brand} ${c.model} ${c.variant}`;
export const getCar = (slug: string) => cars.find((c) => c.slug === slug);
export const brands = [...new Set(cars.map((c) => c.brand))].sort();

export const formatPrice = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(2).replace(/\.?0+$/, "")} L` : `₹${n.toLocaleString("en-IN")}`;
export const formatKm = (n: number) => `${n.toLocaleString("en-IN")} km`;

/** Standard reducing-balance EMI. */
export function emi(principal: number, annualRatePct: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
