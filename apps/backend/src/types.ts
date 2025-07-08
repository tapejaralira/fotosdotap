/// <reference types="@cloudflare/workers-types" />

// Interface do ambiente do Worker, contendo o bucket R2
export interface Env {
  FOTOSDOTAP_BUCKET: R2Bucket;
  ADMIN_SENHA: string;
  // Adicione aqui outras variáveis de ambiente se necessário
}

// Interface para o índice de clientes
export interface ClienteIndex {
  email: string;
  arquivo: string;
}

// Interface para os dados do cliente
export interface ClienteData {
  senha?: string;
}