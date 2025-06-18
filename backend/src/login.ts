/// <reference types="@cloudflare/workers-types" />

import { Env, ClienteIndex, ClienteData } from './types';
import { jsonResponse } from './utils';

export default {
  // Handler principal da rota de login
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Obtém o parâmetro "email" da URL
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) return jsonResponse({ erro: "Email não informado." }, 400);

    try {
      // Busca o índice de clientes no bucket
      const indexObject = await env.FOTOSDOTAP_BUCKET.get("clientes_index.json");
      if (!indexObject) return jsonResponse({ erro: "Index de clientes não encontrado." }, 500);

      let arquivoCliente: string | undefined;
      try {
        // Faz o parse do índice de clientes
        const indexObj = JSON.parse(await indexObject.text());
        if (typeof indexObj !== 'object' || indexObj === null) {
          return jsonResponse({ erro: "Index de clientes inválido." }, 500);
        }
        arquivoCliente = indexObj[email];
      } catch {
        return jsonResponse({ erro: "Index de clientes corrompido." }, 500);
      }

      if (!arquivoCliente) return jsonResponse({ estado: "nao_encontrado" });

      // Busca o arquivo do cliente no bucket
      const clienteObj = await env.FOTOSDOTAP_BUCKET.get(`clientes/${arquivoCliente}`);
      if (!clienteObj) return jsonResponse({ erro: "Arquivo do cliente não encontrado." }, 500);

      let clienteData: ClienteData;
      try {
        // Faz o parse dos dados do cliente
        clienteData = JSON.parse(await clienteObj.text());
      } catch {
        return jsonResponse({ erro: "Arquivo do cliente corrompido." }, 500);
      }

      // Define o estado de acordo com a existência da senha
      const estado = clienteData.senha ? "precisa_informar_senha" : "precisa_cadastrar_senha";
      return jsonResponse({ estado });
    } catch (err: any) {
      // Retorna erro interno em caso de exceção
      return jsonResponse({ erro: "Erro interno", detalhes: err.message }, 500);
    }
  },
};
