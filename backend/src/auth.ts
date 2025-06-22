// Geração e validação simples de token para admin

export function getAdminToken(email: string): string {
  // Gera um token base64 com email e timestamp (exemplo simples)
  return btoa(`${email}|${Date.now()}`);
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = atob(token);
    // Verifica se o token começa com o email do admin
    return decoded.startsWith("tapejaralira@gmail.com|");
  } catch {
    return false;
  }
}