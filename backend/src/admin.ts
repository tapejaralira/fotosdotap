// Implementação para Cloudflare Worker (sem Express)
// Área administrativa para gerenciamento de clientes

import { getAdminToken, verifyAdminToken } from "./auth";
import { getClientesIndex, getClienteData, saveClienteData, deleteClienteData } from "./clientes";
import { jsonResponse } from "./utils";
import type { Env } from "./types";

/**
 * Router principal para rotas administrativas
 * Gerencia login, autenticação e CRUD de clientes
 */
export async function adminRouter(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  const origin = request.headers.get("Origin");

  try {
    // ==========================================
    // LOGIN ADMIN
    // ==========================================
    if (url.pathname === "/admin/login" && method === "POST") {
      const { email, senha } = await request.json() as { email: string, senha: string };
      const ADMIN_EMAIL = "tapejaralira@gmail.com";
      const ADMIN_SENHA = env.ADMIN_SENHA;
      
      // Valida credenciais do admin
      if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        const token = getAdminToken(email);
        return jsonResponse({ sucesso: true, token }, 200, origin);
      }
      return jsonResponse({ sucesso: false, erro: "Login inválido" }, 200, origin);
    }

    // ==========================================
    // MIDDLEWARE DE AUTENTICAÇÃO
    // ==========================================
    // Todas as rotas abaixo requerem token válido
    if (url.pathname.startsWith("/admin/")) {
      const auth = request.headers.get("Authorization");
      if (!auth || !auth.startsWith("Bearer ") || !verifyAdminToken(auth.replace("Bearer ", ""))) {
        return jsonResponse({ erro: "Não autorizado" }, 401, origin);
      }

      // ==========================================
      // LISTAR CLIENTES
      // ==========================================
      if (url.pathname === "/admin/clientes" && method === "GET") {
        const index = await getClientesIndex(env);
        const clientes = [];
        
        // Itera sobre cada cliente no índice
        for (const [email, filename] of Object.entries(index)) {
          try {
            const data = await getClienteData(filename, env);
            if (data) {
              clientes.push({ email, nome: data.nome || "", telefone: data.telefone || "" });
            }
          } catch (e) {
            console.log(`Erro ao carregar cliente: ${filename}`, e);
          }
        }
        
        return jsonResponse({ clientes }, 200, origin);
      }

      // ==========================================
      // BUSCAR CLIENTE ESPECÍFICO
      // ==========================================
      if (url.pathname === "/admin/cliente" && method === "GET") {
        const email = url.searchParams.get("email");
        if (!email) return jsonResponse({ erro: "E-mail não informado" }, 200, origin);
        
        const index = await getClientesIndex(env);
        const filename = index[email];
        if (!filename) return jsonResponse({ erro: "Cliente não encontrado" }, 200, origin);
        
        const data = await getClienteData(filename, env);
        return jsonResponse({ sucesso: true, cliente: data }, 200, origin);
      }

      // ==========================================
      // CRIAR NOVO CLIENTE
      // ==========================================
      if (url.pathname === "/admin/cliente" && method === "POST") {
        const { nome, email, telefone } = await request.json() as { nome: string, email: string, telefone: string };
        if (!email) return jsonResponse({ erro: "E-mail obrigatório" }, 200, origin);
        
        const index = await getClientesIndex(env);
        if (index[email]) return jsonResponse({ erro: "Cliente já existe" }, 200, origin);
        
        // Gera nome do arquivo no formato: YYYYMMDDHHMM_nome-cliente.json
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const timestamp = `${year}${month}${day}${hour}${minute}`;
        const nomeSanitizado = (nome || email.split('@')[0]).toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const filename = `${timestamp}_${nomeSanitizado}.json`;
        
        // Cria objeto cliente com estrutura padrão
        const cliente = { nome, email, telefone, senha: "", servicos: [] };
        
        // Salva arquivo do cliente
        await saveClienteData(filename, cliente, env);
        
        // Atualiza índice de clientes
        index[email] = filename;
        await saveClienteData("clientes_index.json", index, env);
        
        return jsonResponse({ sucesso: true }, 200, origin);
      }

      // ==========================================
      // EDITAR CLIENTE EXISTENTE
      // ==========================================
      if (url.pathname === "/admin/cliente" && method === "PUT") {
        const { nome, email, telefone } = await request.json() as { nome: string, email: string, telefone: string };
        if (!email) return jsonResponse({ erro: "E-mail obrigatório" }, 200, origin);
        
        const index = await getClientesIndex(env);
        const filename = index[email];
        if (!filename) return jsonResponse({ erro: "Cliente não encontrado" }, 200, origin);
        
        // Carrega dados existentes e atualiza
        const data = await getClienteData(filename, env);
        data.nome = nome;
        data.telefone = telefone;
        
        // Salva alterações
        await saveClienteData(filename, data, env);
        
        return jsonResponse({ sucesso: true }, 200, origin);
      }

      // ==========================================
      // EXCLUIR CLIENTE
      // ==========================================
      if (url.pathname === "/admin/cliente" && method === "DELETE") {
        const { email } = await request.json() as { email: string };
        if (!email) return jsonResponse({ erro: "E-mail obrigatório" }, 200, origin);
        
        const index = await getClientesIndex(env);
        const filename = index[email];
        if (!filename) return jsonResponse({ erro: "Cliente não encontrado" }, 200, origin);
        
        // Remove arquivo do cliente
        await deleteClienteData(filename, env);
        
        // Remove do índice
        delete index[email];
        await saveClienteData("clientes_index.json", index, env);
        
        return jsonResponse({ sucesso: true }, 200, origin);
      }
    }

    // ==========================================
    // ROTA NÃO ENCONTRADA
    // ==========================================
    return jsonResponse({ erro: "Not found" }, 404, origin);
    
  } catch (e) {
    // ==========================================
    // TRATAMENTO DE ERROS GLOBAIS
    // ==========================================
    return jsonResponse(
      { 
        erro: "Erro interno", 
        detalhe: e instanceof Error ? e.message : String(e), 
        stack: e instanceof Error ? e.stack : undefined 
      },
      500,
      origin
    );
  }
}