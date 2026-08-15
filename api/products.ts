export default {
  fetch(request: Request): Response {
    if (request.method !== "GET") {
      return Response.json(
        { error: "Metodo non consentito", code: "METHOD_NOT_ALLOWED" },
        { status: 405, headers: { Allow: "GET" } },
      );
    }

    return Response.json(
      {
        error: "Firebase non configurato",
        code: "FIREBASE_NOT_CONFIGURED",
      },
      {
        status: 503,
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  },
};
