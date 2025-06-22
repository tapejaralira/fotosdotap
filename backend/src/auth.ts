// JWT simplificado para admin em Worker

export function getAdminToken(email: string): string {
  // Para produção, use JWT real. Aqui, um token simples para exemplo:
  return btoa(`${email}|${Date.now()}`);
}

export function verifyAdminToken(token: string): boolean {
  // Para produção, valide JWT. Aqui, só verifica se é base64 e contém o e-mail:
  try {
    const decoded = atob(token);
    return decoded.startsWith("tapejaralira@gmail.com|");
  } catch {
    return false;
  }
}