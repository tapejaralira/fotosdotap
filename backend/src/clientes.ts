// Funções para acessar clientes no bucket (ajuste para seu storage)

const BUCKET_PREFIX = "bucket/clientes/";

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

export async function getClienteData(filename: string): Promise<any> {
  const resp = await fetch(BUCKET_PREFIX + filename);
  if (!resp.ok) return null;
  return await resp.json();
}

export async function saveClienteData(filename: string, data: any, isIndex = false): Promise<void> {
  // Implemente para salvar arquivo no storage (exemplo fictício)
  await fetch(BUCKET_PREFIX + filename, {
    method: "PUT",
    body: JSON.stringify(data, null, 2),
    headers: { "Content-Type": "application/json" }
  });
}

export async function deleteClienteData(filename: string): Promise<void> {
  // Implemente para deletar arquivo do storage (exemplo fictício)
  await fetch(BUCKET_PREFIX + filename, { method: "DELETE" });
}