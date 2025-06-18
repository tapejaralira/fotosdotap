/// <reference types="@cloudflare/workers-types" />

import loginHandler from './login'; // Ambos estão na mesma pasta
import cadastrarSenhaHandler from './cadastrarSenha';

// Interface compartilhada de variáveis de ambiente
interface Env {
  FOTOSDOTAP_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Rota de login via método GET (verifica se o cliente existe e se já tem senha)
    if (url.pathname === '/login' && request.method === 'GET') {
      return loginHandler.fetch(request, env, ctx);
    }

    // Rota de cadastro de senha via POST
    if (url.pathname === '/cadastrar-senha' && request.method === 'POST') {
      return cadastrarSenhaHandler.fetch(request, env, ctx);
    }

    // Retorno padrão para rota não encontrada
    return new Response(JSON.stringify({ erro: "Rota não encontrada" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
};
