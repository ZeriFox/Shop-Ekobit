import {
  FirebaseConfigurationError,
  listActiveProducts,
} from "../server/firebase";

type FunctionRequest = {
  method?: string;
};

type FunctionResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): FunctionResponse;
  json(body: unknown): void;
};

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

  try {
    const products = await listActiveProducts();
    response.setHeader("Cache-Control", "private, no-store");
    response.status(200).json({ products });
  } catch (error) {
    if (error instanceof FirebaseConfigurationError) {
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
