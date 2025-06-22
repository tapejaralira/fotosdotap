/// <reference types="@cloudflare/workers-types" />

import loginHandler from './login'; // Ambos estão na mesma pasta
import cadastrarSenhaHandler from './cadastrarSenha';
import { JSON_HEADERS, jsonResponse } from './utils';
import { adminRouter } from "./admin";
import type { Env } from "./types";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/admin")) {
      return adminRouter(request, env);
    }

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
    // Busca reversa: encontra o cliente pelo e-mail informado
    if (url.pathname === '/api/cliente' && request.method === 'GET' && url.searchParams.has('email')) {
      const email = decodeURIComponent(url.searchParams.get('email') || '');
      if (!email) return jsonResponse({ erro: "E-mail não informado." }, 400);

      // Percorre todos os arquivos da pasta clientes/
      const list = await env.FOTOSDOTAP_BUCKET.list({ prefix: 'clientes/', limit: 1000 });
      for (const obj of list.objects) {
        const clienteRaw = await env.FOTOSDOTAP_BUCKET.get(obj.key);
        if (!clienteRaw) continue;
        const cliente = JSON.parse(await clienteRaw.text());
        if (cliente.email && cliente.email.toLowerCase() === email.toLowerCase()) {
          // Retorna o ID (nome do arquivo sem .json) e os dados do cliente
          const id = obj.key.replace('clientes/', '').replace('.json', '');
          return jsonResponse({ id, ...cliente });
        }
      }
      return jsonResponse({ erro: "Cliente não encontrado." }, 404);
    }

    // Busca cliente por ID
    if (url.pathname === '/api/cliente' && request.method === 'GET' && url.searchParams.has('id')) {
      const id = url.searchParams.get('id') || '';
      if (!id) return jsonResponse({ erro: "ID não informado." }, 400);
      const clienteRaw = await env.FOTOSDOTAP_BUCKET.get(`clientes/${id}.json`);
      if (!clienteRaw) return jsonResponse({ erro: "Cliente não encontrado." }, 404);
      const cliente = JSON.parse(await clienteRaw.text());
      return jsonResponse({ id, ...cliente });
    }

    // Busca serviços por ID de cliente
    if (url.pathname === '/api/servicos' && request.method === 'GET' && url.searchParams.has('id')) {
      const id = url.searchParams.get('id') || '';
      if (!id) return jsonResponse([], 200);
      const clienteRaw = await env.FOTOSDOTAP_BUCKET.get(`clientes/${id}.json`);
      if (!clienteRaw) return jsonResponse([], 200);
      const cliente = JSON.parse(await clienteRaw.text());
      const servicosIds = Array.isArray(cliente.servicos) ? cliente.servicos : [];
      const servicos: any[] = [];
      for (const servicoId of servicosIds) {
        const servicoRaw = await env.FOTOSDOTAP_BUCKET.get(`servicos/${servicoId}.json`);
        if (servicoRaw) {
          servicos.push(JSON.parse(await servicoRaw.text()));
        }
      }
      // Ordena do mais recente para o mais antigo
      servicos.sort((a, b) => new Date(b.data_servico).getTime() - new Date(a.data_servico).getTime());
      return jsonResponse(servicos);
    }

    // Responde requisições OPTIONS (preflight CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: JSON_HEADERS
      });
    }

    // Retorno padrão para rota não encontrada
    return new Response("Not found", { status: 404 });
  }
};
