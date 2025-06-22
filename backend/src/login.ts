/// <reference types="@cloudflare/workers-types" />

import { Env, ClienteData } from './types';
import { jsonResponse } from './utils';
import { getClientesIndex, getClienteData, saveClienteData } from './clientes';

export default {
  // Handler principal da rota de login
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");
    const url = new URL(request.url);
    
    // ==========================================
    // POST - AUTENTICAÇÃO DO CLIENTE
    // ==========================================
    if (url.pathname === "/login" && request.method.toUpperCase() === 'POST') {
      try {
        const { email, senha } = await request.json() as { email: string; senha: string };
        
        if (!email || !senha) {
          return jsonResponse({ sucesso: false, erro: "Email e senha obrigatórios." }, 400, origin);
        }

        // Busca cliente usando as funções utilitárias
        const index = await getClientesIndex(env);
        const filename = index[email];
        
        if (!filename) {
          return jsonResponse({ sucesso: false, erro: "Cliente não encontrado." }, 404, origin);
        }

        const clienteData = await getClienteData(filename, env);
        if (!clienteData) {
          return jsonResponse({ sucesso: false, erro: "Dados do cliente não encontrados." }, 500, origin);
        }        // Validação de senha
        if (clienteData.senha && clienteData.senha === senha) {
          return jsonResponse({ 
            sucesso: true, 
            email: email,
            nome: clienteData.nome || email.split('@')[0] 
          }, 200, origin);
        } else {
          return jsonResponse({ sucesso: false, erro: "Senha incorreta." }, 401, origin);
        }
        
      } catch (err: any) {
        return jsonResponse({ sucesso: false, erro: "Erro interno", detalhes: err.message }, 500, origin);
      }
    }

    // ==========================================
    // GET - VERIFICAR STATUS DO CLIENTE
    // ==========================================
    if (request.method.toUpperCase() === 'GET') {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get("email");
      
      if (!email) {
        return jsonResponse({ erro: "Email não informado." }, 400, origin);
      }

      try {
        const index = await getClientesIndex(env);
        const filename = index[email];
        
        if (!filename) {
          return jsonResponse({ estado: "nao_encontrado" }, 200, origin);
        }

        const clienteData = await getClienteData(filename, env);
        if (!clienteData) {
          return jsonResponse({ estado: "nao_encontrado" }, 200, origin);
        }

        // Define o estado de acordo com a existência da senha
        const estado = clienteData.senha ? "precisa_informar_senha" : "precisa_cadastrar_senha";
        return jsonResponse({ estado, nome: clienteData.nome || email.split('@')[0] }, 200, origin);
        
      } catch (err: any) {
        return jsonResponse({ erro: "Erro interno", detalhes: err.message }, 500, origin);
      }
    }

    // ==========================================
    // MÉTODO NÃO SUPORTADO
    // ==========================================
    return jsonResponse({ erro: "Método não suportado." }, 405, origin);
  },
};
