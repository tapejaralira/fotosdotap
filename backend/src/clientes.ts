import type { Env } from "./types";

// Função para buscar o índice de clientes no bucket R2
export async function getClientesIndex(env: Env): Promise<Record<string, string>> {
  try {
    const obj = await env.FOTOSDOTAP_BUCKET.get("clientes_index.json");
    if (!obj) return {};
    const text = await obj.text();
    return JSON.parse(text);
  } catch (e) {
    // Para debug, lance erro detalhado
    throw new Error("Erro ao ler clientes_index.json: " + (e instanceof Error ? e.message : String(e)));
  }
}

// Função para buscar dados de um cliente específico
export async function getClienteData(filename: string, env: Env): Promise<any> {
  try {
    const obj = await env.FOTOSDOTAP_BUCKET.get(`clientes/${filename}`);
    if (!obj) return null;
    const text = await obj.text();
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Erro ao ler arquivo do cliente: " + (e instanceof Error ? e.message : String(e)));
  }
}

// Função para salvar dados de um cliente
export async function saveClienteData(filename: string, data: any, env: Env): Promise<void> {
  try {
    const path = filename.startsWith("../") ? filename.replace("../", "") : `clientes/${filename}`;
    await env.FOTOSDOTAP_BUCKET.put(path, JSON.stringify(data, null, 2));
  } catch (e) {
    throw new Error("Erro ao salvar arquivo do cliente: " + (e instanceof Error ? e.message : String(e)));
  }
}

// Função para deletar dados de um cliente
export async function deleteClienteData(filename: string, env: Env): Promise<void> {
  try {
    await env.FOTOSDOTAP_BUCKET.delete(`clientes/${filename}`);
  } catch (e) {
    throw new Error("Erro ao deletar arquivo do cliente: " + (e instanceof Error ? e.message : String(e)));
  }
}