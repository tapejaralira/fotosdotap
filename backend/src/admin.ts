// Implementação para Cloudflare Worker (sem Express)

import { getAdminToken, verifyAdminToken } from "./auth";
import { getClientesIndex, getClienteData, saveClienteData, deleteClienteData } from "./clientes";
import { jsonResponse, parseRequestBody } from "./utils";
import type { Env } from "./types";

export async function adminRouter(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();

  // --- LOGIN ADMIN ---
  if (url.pathname === "/admin/login" && method === "POST") {
    const { email, senha } = await parseRequestBody(request);
    const ADMIN_EMAIL = "tapejaralira@gmail.com";
    const ADMIN_SENHA = env.ADMIN_SENHA;
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      const token = getAdminToken(email);
      return jsonResponse({ sucesso: true, token });
    }
    return jsonResponse({ sucesso: false, erro: "Login inválido" });
  }

  // --- ROTAS PROTEGIDAS ---
  if (url.pathname.startsWith("/admin/")) {
    const auth = request.headers.get("Authorization");
    if (!auth || !auth.startsWith("Bearer ") || !verifyAdminToken(auth.replace("Bearer ", ""))) {
      return jsonResponse({ erro: "Não autorizado" }, 401);
    }

    // --- LISTAR CLIENTES ---
    if (url.pathname === "/admin/clientes" && method === "GET") {
      const index = await getClientesIndex();
      const clientes = [];
      for (const [email, filename] of Object.entries(index)) {
        const data = await getClienteData(filename);
        clientes.push({ email, nome: data?.nome || "", telefone: data?.telefone || "" });
      }
      return jsonResponse({ clientes });
    }

    // --- BUSCAR CLIENTE ---
    if (url.pathname === "/admin/cliente" && method === "GET") {
      const email = url.searchParams.get("email");
      if (!email) return jsonResponse({ erro: "E-mail não informado" });
      const index = await getClientesIndex();
      const filename = index[email];
      if (!filename) return jsonResponse({ erro: "Cliente não encontrado" });
      const data = await getClienteData(filename);
      return jsonResponse({ sucesso: true, cliente: data });
    }

    // --- CRIAR CLIENTE ---
    if (url.pathname === "/admin/cliente" && method === "POST") {
      const { nome, email, telefone } = await parseRequestBody(request);
      if (!email) return jsonResponse({ erro: "E-mail obrigatório" });
      const index = await getClientesIndex();
      if (index[email]) return jsonResponse({ erro: "Cliente já existe" });
      const filename = `${Date.now()}_${(nome || email).toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`;
      const cliente = { nome, email, telefone, senha: "", servicos: [] };
      await saveClienteData(filename, cliente);
      index[email] = filename;
      await saveClienteData("../clientes_index.json", index, true);
      return jsonResponse({ sucesso: true });
    }

    // --- EDITAR CLIENTE ---
    if (url.pathname === "/admin/cliente" && method === "PUT") {
      const { nome, email, telefone } = await parseRequestBody(request);
      if (!email) return jsonResponse({ erro: "E-mail obrigatório" });
      const index = await getClientesIndex();
      const filename = index[email];
      if (!filename) return jsonResponse({ erro: "Cliente não encontrado" });
      const data = await getClienteData(filename);
      data.nome = nome;
      data.telefone = telefone;
      await saveClienteData(filename, data);
      return jsonResponse({ sucesso: true });
    }

    // --- EXCLUIR CLIENTE ---
    if (url.pathname === "/admin/cliente" && method === "DELETE") {
      const { email } = await parseRequestBody(request);
      if (!email) return jsonResponse({ erro: "E-mail obrigatório" });
      const index = await getClientesIndex();
      const filename = index[email];
      if (!filename) return jsonResponse({ erro: "Cliente não encontrado" });
      await deleteClienteData(filename);
      delete index[email];
      await saveClienteData("../clientes_index.json", index, true);
      return jsonResponse({ sucesso: true });
    }
  }

  return new Response("Not found", { status: 404 });
}