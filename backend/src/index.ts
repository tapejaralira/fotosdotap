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

    // --- NOVAS ROTAS API CLIENTE E SERVIÇOS ---
    // /api/cliente?email=...
    if (url.pathname === '/api/cliente' && request.method === 'GET') {
      const email = url.searchParams.get('email');
      if (!email) return jsonResponse({ erro: 'E-mail não informado' }, 400);
      try {
        // Busca arquivo do cliente no bucket
        const key = `clientes/${email.replace(/[^a-zA-Z0-9@._-]/g, '')}.json`;
        const obj = await env.FOTOSDOTAP_BUCKET.get(key);
        if (!obj) return jsonResponse({ erro: 'Cliente não encontrado' }, 404);
        const cliente = await obj.json() as { nome?: string, email?: string, servicos?: any[] };
        return jsonResponse({ nome: cliente.nome, email: cliente.email });
      } catch (e) {
        return jsonResponse({ erro: 'Erro ao buscar cliente' }, 500);
      }
    }

    // /api/servicos?email=...
    if (url.pathname === '/api/servicos' && request.method === 'GET') {
      const email = url.searchParams.get('email');
      if (!email) return jsonResponse({ erro: 'E-mail não informado' }, 400);
      try {
        // Busca arquivo do cliente no bucket
        const key = `clientes/${email.replace(/[^a-zA-Z0-9@._-]/g, '')}.json`;
        const obj = await env.FOTOSDOTAP_BUCKET.get(key);
        if (!obj) return jsonResponse([], 200);
        const cliente = await obj.json() as { servicos?: string[] };
        const servicosIds = cliente.servicos || [];
        const servicos: any[] = [];
        for (const id of servicosIds) {
          const servicoObj = await env.FOTOSDOTAP_BUCKET.get(`servicos/${id}.json`);
          if (servicoObj) {
            const servico = await servicoObj.json();
            servicos.push(servico);
          }
        }
        return jsonResponse(servicos);
      } catch (e) {
        return jsonResponse([], 200);
      }
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
