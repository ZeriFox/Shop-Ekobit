import {
  FirebaseConfigurationError,
  listActiveProducts,
} from "../server/firebase";

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "GET") {
      return Response.json(
        { error: "Metodo non consentito", code: "METHOD_NOT_ALLOWED" },
        { status: 405, headers: { Allow: "GET" } },
      );
    }

    try {
      const products = await listActiveProducts();
      return Response.json(
        { products },
        { headers: { "Cache-Control": "private, no-store" } },
      );
    } catch (error) {
      if (error instanceof FirebaseConfigurationError) {
        return Response.json(
          {
            error: "Firebase non configurato",
            code: "FIREBASE_NOT_CONFIGURED",
          },
          { status: 503 },
        );
      }

      return Response.json(
        {
          error: "Catalogo temporaneamente non disponibile",
          code: "CATALOG_UNAVAILABLE",
        },
        { status: 500 },
      );
    }
  },
};
