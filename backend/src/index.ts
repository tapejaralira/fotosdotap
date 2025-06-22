/// <reference types="@cloudflare/workers-types" />

import { adminRouter } from "./admin";
import loginHandler from "./login";
import cadastrarSenhaHandler from "./cadastrarSenha";
import type { Env } from "./types";
import { JSON_HEADERS, getCorsOrigin, jsonResponse } from "./utils";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");

    // Trate requisições OPTIONS para CORS dinâmico
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...JSON_HEADERS,
          "Access-Control-Allow-Origin": getCorsOrigin(origin),
        }
      });
    }

    const url = new URL(request.url);

    // ==========================================
    // ROTAS DE LOGIN DO CLIENTE
    // ==========================================
    if (url.pathname === "/login") {
      return loginHandler.fetch(request, env, ctx);
    }

    // Rota para cadastrar senha do cliente
    if (url.pathname === "/cadastrar-senha" && request.method === "POST") {
      return cadastrarSenhaHandler.fetch(request, env, ctx);
    }

    // ==========================================
    // ROTAS DA API DO CLIENTE
    // ==========================================
    
    // Buscar dados do cliente logado
    if (url.pathname === "/api/cliente" && request.method === "GET") {
      const email = url.searchParams.get("email");
      if (!email) {
        return jsonResponse({ erro: "E-mail não informado" }, 400, origin);
      }

      try {
        const { getClientesIndex, getClienteData } = await import("./clientes");
        const index = await getClientesIndex(env);
        const filename = index[email];
        
        if (!filename) {
          return jsonResponse({ erro: "Cliente não encontrado" }, 404, origin);
        }

        const clienteData = await getClienteData(filename, env);
        if (!clienteData) {
          return jsonResponse({ erro: "Dados do cliente não encontrados" }, 500, origin);
        }

        // Retorna dados do cliente (sem a senha)
        const { senha, ...dadosCliente } = clienteData;
        return jsonResponse({ 
          sucesso: true, 
          cliente: dadosCliente 
        }, 200, origin);
        
      } catch (e) {
        return jsonResponse({ erro: "Erro interno" }, 500, origin);
      }
    }

    // ==========================================
    // ROTAS ADMINISTRATIVAS
    // ==========================================
    if (url.pathname.startsWith("/admin")) {
      return adminRouter(request, env);
    }

    // ==========================================
    // ROTA NÃO ENCONTRADA
    // ==========================================
    return new Response("Not found", { status: 404 });
  }
};
