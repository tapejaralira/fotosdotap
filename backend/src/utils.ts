// ATENÇÃO: Remova domínios de desenvolvimento e testes antes de ir para produção!
// Mantenha apenas os domínios finais do projeto em produção.
const ALLOWED_ORIGINS = [
  "https://admin.fotosdotap.com.br",      // produção admin
  "https://cliente.fotosdotap.com.br",    // produção cliente
  "https://admin-evv.pages.dev",          // Pages de teste (REMOVER em produção)
  "http://localhost:5500",                // dev local (REMOVER em produção)
  "http://127.0.0.1:5500",                // dev local (REMOVER em produção)
  "http://192.168.1.7:5500"               // dev local (REMOVER em produção)
];

export function getCorsOrigin(origin: string | null): string {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }
  return ALLOWED_ORIGINS[0]; // padrão
}

export const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export function jsonResponse(body: object, status = 200, origin?: string | null): Response {
  const headers = {
    ...JSON_HEADERS,
    "Access-Control-Allow-Origin": getCorsOrigin(origin || null)
  };
  return new Response(JSON.stringify(body), { status, headers });
}

export async function parseRequestBody(request: Request): Promise<any> {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await request.json();
  }
  return {};
}