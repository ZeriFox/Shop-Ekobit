type FunctionRequest = {
  method?: string;
};

type FunctionResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): FunctionResponse;
  json(body: unknown): void;
};

const REQUIRED_FIREBASE_ENV = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
] as const;

export default async function handler(
  request: FunctionRequest,
  response: FunctionResponse,
): Promise<void> {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response
      .status(405)
      .json({ error: "Metodo non consentito", code: "METHOD_NOT_ALLOWED" });
    return;
  }

  const isFirebaseConfigured = REQUIRED_FIREBASE_ENV.every(
    (name) => process.env[name]?.trim(),
  );
  if (!isFirebaseConfigured) {
    response.setHeader("Cache-Control", "private, no-store");
    response.status(503).json({
      error: "Firebase non configurato",
      code: "FIREBASE_NOT_CONFIGURED",
    });
    return;
  }

  try {
    const { listActiveProducts } = await import("../server/firebase.js");
    const products = await listActiveProducts();
    response.setHeader("Cache-Control", "private, no-store");
    response.status(200).json({ products });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "FirebaseConfigurationError"
    ) {
      response.status(503).json({
        error: "Firebase non configurato",
        code: "FIREBASE_NOT_CONFIGURED",
      });
      return;
    }

    response.status(500).json({
      error: "Catalogo temporaneamente non disponibile",
      code: "CATALOG_UNAVAILABLE",
    });
  }
}
