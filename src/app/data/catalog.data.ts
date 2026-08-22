import type { Product } from "../models/product";
import type { Locale } from "../i18n/i18n.service";

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

type DemoProductCopy = { name: string; description: string; features: string[] };

const DEMO_COPY: Partial<Record<Locale, Record<string, DemoProductCopy>>> = {
  en: {
    "philips-x3003": { name: "X3003/00 Shaver 3000X Wet & Dry", description: "Comfortable wet or dry shaving with flexible heads and an ergonomic grip.", features: ["Wet & Dry", "Flexible heads", "Ergonomic grip"] },
    "electrolux-loc3s40x2": { name: "LOC3S40X2 72 L built-in multifunction steam oven", description: "Even cooking and steam support for crisp results outside and tender food inside.", features: ["72 litre capacity", "Steam function", "Multi-level cooking"] },
    "dyson-v15s": { name: "V15s Detect Submarine vacuum and floor washer", description: "Vacuum and wash hard floors with intelligent dust detection and up to 60 minutes of runtime.", features: ["Vacuums and washes", "Dust detection", "60-minute runtime"] },
    "aeg-l6fbi945": { name: "L6FBI945 9 kg 1400 rpm inverter washing machine", description: "A 9 kg washer with inverter motor and steam programmes designed to care for fabrics.", features: ["9 kg capacity", "1400 rpm", "Inverter motor"] },
    "hisense-rr106": { name: "RR106D4CRE 82 L red single-door refrigerator", description: "A compact retro-style refrigerator for small homes, offices and holiday properties.", features: ["Retro design", "Compact format", "Adjustable shelves"] },
  },
  fr: {
    "philips-x3003": { name: "X3003/00 Rasoir Shaver 3000X Wet & Dry", description: "Un rasage confortable à sec ou sous la douche, avec têtes flexibles et prise ergonomique.", features: ["Wet & Dry", "Têtes flexibles", "Prise ergonomique"] },
    "electrolux-loc3s40x2": { name: "LOC3S40X2 Four encastrable vapeur multifonction 72 L", description: "Cuisson homogène et vapeur pour des résultats croustillants et tendres.", features: ["Capacité 72 litres", "Fonction vapeur", "Cuisson multiniveau"] },
    "dyson-v15s": { name: "V15s Detect Submarine aspirateur et lave-sol", description: "Aspire et lave les sols avec détection intelligente et jusqu’à 60 minutes d’autonomie.", features: ["Aspire et lave", "Détection de poussière", "60 minutes d’autonomie"] },
    "aeg-l6fbi945": { name: "L6FBI945 Lave-linge inverter 9 kg 1400 tr/min", description: "Moteur inverter et programmes vapeur pour prendre soin des textiles.", features: ["Capacité 9 kg", "1400 tr/min", "Moteur inverter"] },
    "hisense-rr106": { name: "RR106D4CRE Réfrigérateur une porte rouge 82 L", description: "Un réfrigérateur compact au style rétro, idéal pour les petits espaces.", features: ["Design rétro", "Format compact", "Clayettes réglables"] },
  },
  de: {
    "philips-x3003": { name: "X3003/00 Shaver 3000X Wet & Dry Rasierer", description: "Komfortable Nass- oder Trockenrasur mit flexiblen Köpfen und ergonomischem Griff.", features: ["Wet & Dry", "Flexible Scherköpfe", "Ergonomischer Griff"] },
    "electrolux-loc3s40x2": { name: "LOC3S40X2 72 L Einbau-Dampfbackofen", description: "Gleichmäßiges Garen mit Dampfunterstützung für knusprige und saftige Ergebnisse.", features: ["72 Liter", "Dampffunktion", "Mehrstufiges Garen"] },
    "dyson-v15s": { name: "V15s Detect Submarine Staubsauger und Wischsystem", description: "Saugt und wischt Hartböden mit intelligenter Stauberkennung und bis zu 60 Minuten Laufzeit.", features: ["Saugen und Wischen", "Stauberkennung", "60 Minuten Laufzeit"] },
    "aeg-l6fbi945": { name: "L6FBI945 9 kg Inverter-Waschmaschine, 1400 U/min", description: "Invertermotor und Dampfprogramme für eine schonende Textilpflege.", features: ["9 kg Kapazität", "1400 U/min", "Invertermotor"] },
    "hisense-rr106": { name: "RR106D4CRE 82 L Retro-Kühlschrank in Rot", description: "Ein kompakter Kühlschrank im Retro-Stil für kleine Räume, Büros und Ferienhäuser.", features: ["Retro-Design", "Kompaktes Format", "Verstellbare Ablagen"] },
  },
  es: {
    "philips-x3003": { name: "X3003/00 Afeitadora Shaver 3000X Wet & Dry", description: "Afeitado cómodo en seco o bajo la ducha con cabezales flexibles y agarre ergonómico.", features: ["Wet & Dry", "Cabezales flexibles", "Agarre ergonómico"] },
    "electrolux-loc3s40x2": { name: "LOC3S40X2 Horno empotrable de vapor multifunción 72 L", description: "Cocción uniforme con vapor para resultados crujientes por fuera y tiernos por dentro.", features: ["Capacidad de 72 litros", "Función vapor", "Cocción multinivel"] },
    "dyson-v15s": { name: "V15s Detect Submarine aspiradora y friegasuelos", description: "Aspira y friega con detección inteligente del polvo y hasta 60 minutos de autonomía.", features: ["Aspira y friega", "Detección de polvo", "60 minutos de autonomía"] },
    "aeg-l6fbi945": { name: "L6FBI945 Lavadora inverter 9 kg 1400 rpm", description: "Motor inverter y programas de vapor para cuidar mejor los tejidos.", features: ["Capacidad 9 kg", "1400 rpm", "Motor inverter"] },
    "hisense-rr106": { name: "RR106D4CRE Frigorífico rojo de una puerta 82 L", description: "Un frigorífico compacto de estilo retro para espacios pequeños, oficinas y segundas viviendas.", features: ["Diseño retro", "Formato compacto", "Estantes regulables"] },
  },
};

export function localizeDemoProduct(product: Product, locale: Locale): Product {
  const copy = DEMO_COPY[locale]?.[product.id];
  return copy ? { ...product, ...copy } : product;
}
