import type { Product } from "../models/product";

export const HERO_SLIDES = [
  { image: "/banners/piccoli-elettrodomestici.png", alt: "Solo i migliori piccoli elettrodomestici su Ekobit", label: "Scelte per ogni giorno" },
  { image: "/banners/spedizione-gratuita.png", alt: "Spedizioni gratuite sui marchi selezionati", label: "Consegna che conviene" },
  { image: "/banners/lavatrici.png", alt: "Promozione su asciugatrici e lavatrici", label: "Speciale lavaggio" },
] as const;

export const CATEGORIES = ["Tutti", "Lavaggio", "Freddo", "Cottura", "Pulizia", "Piccoli elettrodomestici"] as const;

export const DEMO_PRODUCTS: Product[] = [
  { id: "philips-x3003", brand: "PHILIPS", name: "X3003/00 Rasoio elettrico Shaver 3000X Wet & Dry", category: "Piccoli elettrodomestici", image: "/products/philips-rasoio.jpg", gallery: [], price: 49.9, oldPrice: 64.9, badge: "-23%", description: "Rasatura confortevole a secco o sotto la doccia, con testine flessibili e impugnatura ergonomica.", features: ["Wet & Dry", "Testine flessibili", "Impugnatura ergonomica"], specifications: { Alimentazione: "Ricaricabile", Utilizzo: "Wet & Dry" }, stock: 12, featured: false },
  { id: "electrolux-loc3s40x2", brand: "ELECTROLUX", name: "LOC3S40X2 Forno da incasso 72 L Multifunzione Vapore", category: "Cottura", image: "/products/electrolux-forno.jpg", gallery: [], price: 399, oldPrice: 459, badge: "Novità", description: "Cottura uniforme e funzione vapore per risultati croccanti fuori e morbidi dentro, in una cavità da 72 litri.", features: ["Capacità 72 litri", "Funzione vapore", "Cottura multilivello"], specifications: { Capacità: "72 L", Installazione: "Incasso" }, stock: 5, featured: true },
  { id: "dyson-v15s", brand: "DYSON", name: "V15s Detect Submarine Aspirapolvere e Lavapavimenti", category: "Pulizia", image: "/products/dyson-v15s.jpg", gallery: [], price: 799, oldPrice: 949, badge: "-16%", description: "Aspira e lava i pavimenti con rilevamento intelligente della polvere e fino a 60 minuti di autonomia.", features: ["Aspira e lava", "Rilevamento polvere", "60 minuti di autonomia"], specifications: { Autonomia: "60 minuti", Tecnologia: "Detect Submarine" }, stock: 7, featured: true },
  { id: "aeg-l6fbi945", brand: "AEG", name: "L6FBI945 Lavatrice 9 kg 1400 giri con motore inverter", category: "Lavaggio", image: "/products/aeg-lavatrice.jpg", gallery: [], price: 529, oldPrice: 619, badge: "-15%", description: "Capacità da 9 kg, motore inverter e programmi vapore per prendersi cura dei tessuti riducendo i consumi.", features: ["Capacità 9 kg", "1400 giri", "Motore inverter"], specifications: { Capacità: "9 kg", Centrifuga: "1400 giri/min" }, stock: 4, featured: false },
  { id: "hisense-rr106", brand: "HISENSE", name: "RR106D4CRE Frigorifero monoporta 82 L rosso", category: "Freddo", image: "/products/hisense-frigorifero.jpg", gallery: [], price: 219, oldPrice: 259, badge: "-15%", description: "Un frigorifero compatto dal carattere rétro, perfetto per piccoli spazi, uffici e seconde case.", features: ["Design rétro", "Formato compatto", "Ripiani regolabili"], specifications: { Capacità: "82 L", Installazione: "Libera" }, stock: 8, featured: false },
];
