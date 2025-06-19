/// <reference types="@cloudflare/workers-types" />

import { Env, ClienteData } from './types';
import { jsonResponse } from './utils';

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://cliente.fotosdotap.com.br',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  // Handler para cadastro de senha do cliente
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Permite apenas método POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ erro: 'Método não permitido' }), {
        status: 405,
        headers: CORS_HEADERS
      });
    }

    // Tenta extrair email e senha do corpo da requisição
    let email: string, senha: string;
    try {
      const { email: e, senha: s } = await request.json() as { email: string, senha: string };
      email = e;
      senha = s;
      if (!email || !senha) throw new Error();
    } catch {
      return new Response(JSON.stringify({ erro: 'Email e senha são obrigatórios no JSON' }), {
        status: 400,
        headers: CORS_HEADERS
      });
    }

    // Busca o índice de clientes no bucket
    const indexObject = await env.FOTOSDOTAP_BUCKET.get('clientes_index.json');
    if (!indexObject) return new Response(JSON.stringify({ erro: 'Index de clientes não encontrado.' }), { status: 500, headers: CORS_HEADERS });

    // Obtém o nome do arquivo do cliente pelo e-mail
    let arquivoCliente: string | undefined;
    try {
      const indexObj = JSON.parse(await indexObject.text());
      arquivoCliente = indexObj[email];
      if (typeof arquivoCliente !== 'string') throw new Error();
    } catch {
      return new Response(JSON.stringify({ erro: 'Cliente não encontrado no índice.' }), { status: 404, headers: CORS_HEADERS });
    }

    // Busca os dados do cliente
    const clienteObj = await env.FOTOSDOTAP_BUCKET.get(`clientes/${arquivoCliente}`);
    if (!clienteObj) return new Response(JSON.stringify({ erro: 'Arquivo do cliente não encontrado.' }), { status: 500, headers: CORS_HEADERS });

    // Atualiza a senha e salva
    try {
      const clienteData: ClienteData = JSON.parse(await clienteObj.text());
      clienteData.senha = senha;
      await env.FOTOSDOTAP_BUCKET.put(`clientes/${arquivoCliente}`, JSON.stringify(clienteData));
      return new Response(JSON.stringify({ sucesso: true }), { headers: CORS_HEADERS });
    } catch {
      return new Response(JSON.stringify({ erro: 'Erro ao atualizar a senha do cliente.' }), { status: 500, headers: CORS_HEADERS });
    }
  },
};
