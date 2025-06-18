// Cabeçalhos padrão para respostas JSON
export const JSON_HEADERS = { "Content-Type": "application/json" };

// Função utilitária para criar respostas JSON
export function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}