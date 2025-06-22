/// <reference types="@cloudflare/workers-types" />

import { adminRouter } from "./admin";
import loginHandler from "./login";
import type { Env } from "./types";
import { JSON_HEADERS, getCorsOrigin } from "./utils";

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
