/// <reference types="@cloudflare/workers-types" />

import loginHandler from './login'; // Ambos estão na mesma pasta
import cadastrarSenhaHandler from './cadastrarSenha';

// Interface compartilhada de variáveis de ambiente
interface Env {
  FOTOSDOTAP_BUCKET: R2Bucket;
}

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "https://cliente.fotosdotap.com.br",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Rota de login via método GET (verifica se o cliente existe e se já tem senha)
    if (url.pathname === '/login' && request.method === 'GET') {
      const resp = await loginHandler.fetch(request, env, ctx);
      return new Response(await resp.text(), { status: resp.status, headers: CORS_HEADERS });
    }

    // Rota de cadastro de senha via POST
    if (url.pathname === '/cadastrar-senha' && request.method === 'POST') {
      const resp = await cadastrarSenhaHandler.fetch(request, env, ctx);
      return new Response(await resp.text(), { status: resp.status, headers: CORS_HEADERS });
    }

    // Rota de teste de escrita/leitura no bucket
    if (url.pathname === '/teste-bucket' && request.method === 'GET') {
      try {
        // Escreve um arquivo de teste
        await env.FOTOSDOTAP_BUCKET.put('teste.txt', 'ok - escrita bem sucedida');
        // Lê o arquivo de teste
        const obj = await env.FOTOSDOTAP_BUCKET.get('teste.txt');
        const conteudo = obj ? await obj.text() : 'não encontrado';
        return new Response(JSON.stringify({ sucesso: true, conteudo }), {
          headers: CORS_HEADERS
        });
      } catch (e) {
        return new Response(JSON.stringify({ sucesso: false, erro: String(e) }), {
          status: 500,
          headers: CORS_HEADERS
        });
      }
    }

    // Responde requisições OPTIONS (preflight CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: CORS_HEADERS
      });
    }

    // Retorno padrão para rota não encontrada
    return new Response(JSON.stringify({ erro: "Rota não encontrada" }), {
      status: 404,
      headers: CORS_HEADERS
    });
  }
};
