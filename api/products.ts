import {
  FirebaseConfigurationError,
  listActiveProducts,
} from "../server/firebase";

export async function GET(): Promise<Response> {
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
}
