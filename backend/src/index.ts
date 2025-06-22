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
      const id = url.searchParams.get("id");
      
      // Se vier "id=null" ou não vier email, retorna erro específico
      if (id === "null" || !email) {
        return jsonResponse({ 
          erro: "Sessão inválida", 
          codigo: "SESSAO_INVALIDA",
          mensagem: "Faça login novamente" 
        }, 401, origin);
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

    // Buscar serviços do cliente logado
    if (url.pathname === "/api/servicos" && request.method === "GET") {
      const email = url.searchParams.get("email");
      const id = url.searchParams.get("id");
      
      // Se vier "id=null" ou não vier email, retorna erro específico
      if (id === "null" || !email) {
        return jsonResponse({ 
          erro: "Sessão inválida", 
          codigo: "SESSAO_INVALIDA",
          mensagem: "Faça login novamente" 
        }, 401, origin);
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

        // Busca dados completos de cada serviço
        const servicosDetalhados = [];
        if (clienteData.servicos && Array.isArray(clienteData.servicos)) {
          for (const servicoId of clienteData.servicos) {
            try {
              // Busca arquivo do serviço na pasta servicos/
              const servicoObj = await env.FOTOSDOTAP_BUCKET.get(`servicos/${servicoId}.json`);
              if (servicoObj) {
                const servicoData = JSON.parse(await servicoObj.text());
                servicosDetalhados.push(servicoData);
              } else {
                // Se não encontrar o arquivo, cria dados básicos a partir do ID
                const parts = servicoId.split('_');
                const dataStr = parts[0];
                const tipo = parts[1] || 'servico';
                
                let dataFormatada = 'N/A';
                if (dataStr && dataStr.length === 8) {
                  const ano = dataStr.substring(0, 4);
                  const mes = dataStr.substring(4, 6);
                  const dia = dataStr.substring(6, 8);
                  dataFormatada = `${dia}/${mes}/${ano}`;
                }
                
                servicosDetalhados.push({
                  id: servicoId,
                  nome_servico: tipo.charAt(0).toUpperCase() + tipo.slice(1),
                  data_servico: dataFormatada,
                  pacote: "Padrão",
                  status: "ativo",
                  selecao_liberada: false,
                  galeria_liberada: false
                });
              }
            } catch (e) {
              console.log(`Erro ao carregar serviço ${servicoId}:`, e);
            }
          }
        }

        // Retorna serviços detalhados do cliente
        return jsonResponse({ 
          sucesso: true, 
          servicos: servicosDetalhados
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
