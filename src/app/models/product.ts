export type Product = {
  id: string;
  brand: string;
  name: string;
  category: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice: number;
  badge: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number | null;
  featured: boolean;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type CartItem = CartLine & {
  product: Product;
};

export type CatalogResponse = {
  products: unknown[];
};

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function specifications(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter((entry): entry is [string, string] => typeof entry[1] === "string")
      .map(([key, item]) => [key.trim(), item.trim()])
      .filter(([key, item]) => key.length > 0 && item.length > 0),
  );
}

export function normalizeProduct(value: unknown): Product | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const id = text(source["id"]);
  const brand = text(source["brand"]);
  const name = text(source["name"]);
  const category = text(source["category"]);
  const image = text(source["image"]);
  const price = source["price"];

  if (
    !id ||
    !brand ||
    !name ||
    !category ||
    !image ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return null;
  }

  const oldPrice = source["oldPrice"];
  const stock = source["stock"];

  return {
    id,
    brand,
    name,
    category,
    image,
    gallery: stringList(source["gallery"]),
    price,
    oldPrice:
      typeof oldPrice === "number" && Number.isFinite(oldPrice) && oldPrice >= price
        ? oldPrice
        : price,
    badge: text(source["badge"], "Novità"),
    description: text(source["description"], "Scopri questo prodotto selezionato da Ekobit."),
    features: stringList(source["features"]),
    specifications: specifications(source["specifications"]),
    stock: typeof stock === "number" && Number.isFinite(stock) ? Math.max(0, Math.floor(stock)) : null,
    featured: source["featured"] === true,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
