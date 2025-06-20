/// <reference types="@cloudflare/workers-types" />

import loginHandler from './login'; // Ambos estão na mesma pasta
import cadastrarSenhaHandler from './cadastrarSenha';
import { JSON_HEADERS, jsonResponse } from './utils';

// Interface compartilhada de variáveis de ambiente
interface Env {
  FOTOSDOTAP_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Rota de login via método GET ou POST (verifica se o cliente existe e se já tem senha ou faz login)
    if (url.pathname === '/login' && (request.method === 'GET' || request.method === 'POST')) {
      const resp = await loginHandler.fetch(request, env, ctx);
      return resp;
    }

    // Rota de cadastro de senha via POST
    if (url.pathname === '/cadastrar-senha' && request.method === 'POST') {
      const resp = await cadastrarSenhaHandler.fetch(request, env, ctx);
      return resp;
    }

    // Responde requisições OPTIONS (preflight CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: JSON_HEADERS
      });
    }

    // Retorno padrão para rota não encontrada
    return jsonResponse({ erro: "Rota não encontrada" }, 404);
  }
};
