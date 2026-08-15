import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import {
  getFirestore,
  type DocumentData,
  type Firestore,
  type QueryDocumentSnapshot,
} from "firebase-admin/firestore";

const REQUIRED_ENV = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
] as const;

type FirebaseEnvName = (typeof REQUIRED_ENV)[number];

export class FirebaseConfigurationError extends Error {
  constructor(readonly missingVariables: FirebaseEnvName[]) {
    super("Firebase Admin is not configured.");
    this.name = "FirebaseConfigurationError";
  }
}

export type CatalogProduct = {
  id: string;
  brand: string;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice: number;
  badge: string;
  description: string;
};

function getAdminApp(): App {
  if (getApps().length > 0) return getApp();

  const values = {
    FIREBASE_PROJECT_ID: process.env["FIREBASE_PROJECT_ID"]?.trim(),
    FIREBASE_CLIENT_EMAIL: process.env["FIREBASE_CLIENT_EMAIL"]?.trim(),
    FIREBASE_PRIVATE_KEY: process.env["FIREBASE_PRIVATE_KEY"],
  };
  const missingVariables = REQUIRED_ENV.filter((name) => !values[name]);
  if (missingVariables.length > 0) {
    throw new FirebaseConfigurationError(missingVariables);
  }

  const projectId = values.FIREBASE_PROJECT_ID!;
  const clientEmail = values.FIREBASE_CLIENT_EMAIL!;
  const privateKey = values.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });
}

function getDatabase(): Firestore {
  return getFirestore(getAdminApp());
}

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function amount(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : null;
}

function toProduct(
  snapshot: QueryDocumentSnapshot<DocumentData>,
): CatalogProduct | null {
  const data = snapshot.data();
  const name = text(data["name"]);
  const brand = text(data["brand"]);
  const category = text(data["category"]);
  const image = text(data["image"]);
  const price = amount(data["price"]);
  if (!name || !brand || !category || !image || price === null) return null;

  return {
    id: snapshot.id,
    brand,
    name,
    category,
    image,
    price,
    oldPrice: amount(data["oldPrice"]) ?? price,
    badge: text(data["badge"], "Novità"),
    description: text(data["description"]),
  };
}

export async function listActiveProducts(limit = 60): Promise<CatalogProduct[]> {
  const snapshot = await getDatabase()
    .collection("products")
    .limit(Math.min(Math.max(limit, 1), 100))
    .get();

  return snapshot.docs
    .filter((document) => document.data()["active"] !== false)
    .map(toProduct)
    .filter((product): product is CatalogProduct => product !== null)
    .sort((left, right) => left.name.localeCompare(right.name, "it"));
}
