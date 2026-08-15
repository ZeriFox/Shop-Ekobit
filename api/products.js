/**
 * @param {{ method?: string }} request
 * @param {{ setHeader(name: string, value: string): void, status(code: number): any, json(body: unknown): void }} response
 */
module.exports = function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({
      error: "Metodo non consentito",
      code: "METHOD_NOT_ALLOWED",
    });
    return;
  }

  response.setHeader("Cache-Control", "private, no-store");
  response.status(503).json({
    error: "Firebase non configurato",
    code: "FIREBASE_NOT_CONFIGURED",
  });
};
