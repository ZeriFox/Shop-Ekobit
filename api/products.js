let database;

const REQUIRED_ENV = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
const DEFAULT_DATABASE_ID = "shop";

function text(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function amount(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function stringList(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim().length > 0).map((item) => item.trim())
    : [];
}

function specifications(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) => key.trim().length > 0 && typeof item === "string" && item.trim().length > 0)
      .map(([key, item]) => [key.trim(), item.trim()]),
  );
}

function getDatabase() {
  if (database) return database;

  const { cert, getApp, getApps, initializeApp } = require("firebase-admin/app");
  const { getFirestore } = require("firebase-admin/firestore");
  const projectId = process.env.FIREBASE_PROJECT_ID.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const databaseId = process.env.FIREBASE_DATABASE_ID?.trim() || DEFAULT_DATABASE_ID;
  const app = getApps().length
    ? getApp()
    : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId });

  database = getFirestore(app, databaseId);
  return database;
}

function toProduct(document) {
  const data = document.data();
  const brand = text(data.brand);
  const name = text(data.name);
  const category = text(data.category);
  const image = text(data.image);
  const price = amount(data.price);
  if (!brand || !name || !category || !image || price === null) return null;

  return {
    id: document.id,
    brand,
    name,
    category,
    image,
    gallery: stringList(data.gallery),
    price,
    oldPrice: Math.max(price, amount(data.oldPrice) ?? price),
    badge: text(data.badge, "Novità"),
    description: text(data.description, "Scopri questo prodotto selezionato da Ekobit."),
    features: stringList(data.features),
    specifications: specifications(data.specifications),
    stock: amount(data.stock),
    featured: data.featured === true,
  };
}

/**
 * @param {{ method?: string }} request
 * @param {{ setHeader(name: string, value: string): void, status(code: number): any, json(body: unknown): void }} response
 */
module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Metodo non consentito", code: "METHOD_NOT_ALLOWED" });
    return;
  }

  const missingVariables = REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
  if (missingVariables.length) {
    response.setHeader("Cache-Control", "private, no-store");
    response.status(503).json({ error: "Firebase non configurato", code: "FIREBASE_NOT_CONFIGURED" });
    return;
  }

  try {
    const snapshot = await getDatabase().collection("products").limit(100).get();
    const products = snapshot.docs
      .filter((document) => document.data().active !== false)
      .map(toProduct)
      .filter(Boolean)
      .sort((left, right) => Number(right.featured) - Number(left.featured) || left.name.localeCompare(right.name, "it"));

    response.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    response.setHeader("Vercel-CDN-Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    response.status(200).json({ products, count: products.length, source: "firestore" });
  } catch (error) {
    console.error("Unable to load the Firestore catalog", error instanceof Error ? error.message : error);
    response.setHeader("Cache-Control", "private, no-store");
    response.status(500).json({ error: "Catalogo temporaneamente non disponibile", code: "CATALOG_UNAVAILABLE" });
  }
};
