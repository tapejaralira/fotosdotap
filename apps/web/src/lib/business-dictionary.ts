/**
 * Dicionário de Domínio do Negócio - Fotos do Tap
 * 
 * Este arquivo centraliza todas as definições de termos específicos do domínio
 * de fotografia profissional para casamentos e eventos. Serve como referência
 * única para eliminar ambiguidades terminológicas e facilitar a assistência de IA.
 * 
 * @fileoverview Glossário completo do domínio de negócio
 * @author Fotos do Tap
 * @version 1.0.0
 */

export const BUSINESS_DICTIONARY = {
  // === TIPOS DE EVENTOS ===
  casamento: {
    definition: "Cerimônia de união matrimonial, incluindo cerimônia religiosa/civil e festa de recepção",
    synonyms: ["wedding", "matrimônio", "união"] as const,
    relatedTerms: ["noivos", "recepção", "cerimônia", "festa"] as const,
    businessRules: [
      "Geralmente inclui cobertura de 8-12 horas",
      "Pode ter múltiplos locais (igreja, cartório, salão)",
      "Inclui momentos específicos: chegada, cerimônia, recepção, dança"
    ] as const
  },

  pre_wedding: {
    definition: "Sessão fotográfica do casal antes do casamento, em local escolhido pelos noivos",
    synonyms: ["ensaio de casal", "ensaio pré-casamento", "session"] as const,
    relatedTerms: ["noivos", "locação", "ensaio"] as const,
    businessRules: [
      "Duração típica de 2-4 horas",
      "Pode ser em estúdio ou externos",
      "Fotos utilizadas em convites e decoração do casamento"
    ] as const
  },

  pos_wedding: {
    definition: "Sessão fotográfica após o casamento, geralmente mais relaxada",
    synonyms: ["trash the dress", "ensaio pós-casamento"] as const,
    relatedTerms: ["recém-casados", "lua de mel"] as const,
    businessRules: [
      "Opcional, nem todos os casais contratam",
      "Pode incluir fotos mais artísticas ou em locais específicos"
    ] as const
  },

  // === TIPOS DE FOTOGRAFIA ===
  fotografia_social: {
    definition: "Registro de eventos sociais e celebrações",
    synonyms: ["social photography", "evento social"] as const,
    relatedTerms: ["festa", "celebração", "evento"] as const,
    businessRules: [
      "Foco em capturar momentos espontâneos",
      "Interação com convidados é essencial"
    ] as const
  },

  fotografia_autoral: {
    definition: "Estilo artístico único do fotógrafo, com visão criativa pessoal",
    synonyms: ["fine art", "arte fotográfica"] as const,
    relatedTerms: ["portfolio", "estilo", "assinatura"] as const,
    businessRules: [
      "Diferencial competitivo",
      "Reflete a marca pessoal do fotógrafo"
    ] as const
  },

  // === ESTRUTURA DE PACOTES ===
  pacote: {
    definition: "Conjunto pré-definido de serviços oferecidos por um preço fixo",
    synonyms: ["package", "plano", "combo"] as const,
    relatedTerms: ["servicos", "preco", "contrato"] as const,
    businessRules: [
      "Deve incluir descrição clara dos serviços",
      "Preço promocional comparado a serviços avulsos",
      "Pode ter limitações de tempo ou quantidade"
    ] as const
  },

  cobertura: {
    definition: "Duração em horas do serviço fotográfico no evento",
    synonyms: ["tempo de trabalho", "período de serviço"] as const,
    relatedTerms: ["horas", "evento", "cronograma"] as const,
    businessRules: [
      "Medida em horas corridas",
      "Hora extra tem valor adicional",
      "Inclui preparação e finalização"
    ] as const
  },

  fotos_tratadas: {
    definition: "Fotografias editadas e finalizadas para entrega ao cliente",
    synonyms: ["fotos editadas", "fotos finais", "entrega"] as const,
    relatedTerms: ["edicao", "pos_producao", "galeria"] as const,
    businessRules: [
      "Passaram por processo de seleção",
      "Receberam tratamento de cor e luz",
      "Resolução adequada para impressão"
    ] as const
  },

  fotos_extras: {
    definition: "Fotografias adicionais além do pacote base, com cobrança por unidade",
    synonyms: ["fotos adicionais", "extras"] as const,
    relatedTerms: ["adicional", "unidade", "cobranca"] as const,
    businessRules: [
      "Valor por foto individual",
      "Calculadas após seleção inicial",
      "Opcionais para o cliente"
    ] as const
  },

  // === ENTREGÁVEIS ===
  galeria_online: {
    definition: "Plataforma digital onde o cliente acessa suas fotos",
    synonyms: ["galeria digital", "portal do cliente"] as const,
    relatedTerms: ["acesso", "download", "compartilhamento"] as const,
    businessRules: [
      "Acesso protegido por senha",
      "Tempo limitado de disponibilidade",
      "Permite download em resolução original"
    ] as const
  },

  album_fisico: {
    definition: "Produto impresso com seleção das melhores fotos do evento",
    synonyms: ["álbum", "livro fotográfico", "photobook"] as const,
    relatedTerms: ["impressao", "produto", "fisico"] as const,
    businessRules: [
      "Papel e acabamento específicos",
      "Diagramação profissional",
      "Produto premium com maior margem"
    ] as const
  },

  pendrive: {
    definition: "Dispositivo de armazenamento com todas as fotos em resolução original",
    synonyms: ["USB", "pen drive", "flash drive"] as const,
    relatedTerms: ["midia", "backup", "entrega"] as const,
    businessRules: [
      "Backup físico das fotos",
      "Pode incluir marca personalizada",
      "Resolução original para impressão"
    ] as const
  },

  // === PROCESSO DE TRABALHO ===
  contrato: {
    definition: "Documento legal que formaliza a prestação de serviços fotográficos",
    synonyms: ["acordo", "proposta aceita"] as const,
    relatedTerms: ["servicos", "valor", "prazo", "entrega"] as const,
    businessRules: [
      "Define escopo detalhado dos serviços",
      "Estabelece prazos de entrega",
      "Inclui política de cancelamento"
    ] as const
  },

  sinal: {
    definition: "Valor antecipado para confirmar agendamento do serviço",
    synonyms: ["entrada", "antecipação", "reserva"] as const,
    relatedTerms: ["pagamento", "confirmacao", "agendamento"] as const,
    businessRules: [
      "Percentual do valor total",
      "Não reembolsável em caso de cancelamento pelo cliente",
      "Descontado do valor final"
    ] as const
  },

  pos_producao: {
    definition: "Processo de edição e tratamento das fotos após o evento",
    synonyms: ["edição", "tratamento", "finalização"] as const,
    relatedTerms: ["edicao", "selecao", "tratamento"] as const,
    businessRules: [
      "Prazo definido em contrato",
      "Inclui seleção e tratamento",
      "Etapa antes da entrega final"
    ] as const
  },

  // === RELACIONAMENTOS ===
  cliente: {
    definition: "Pessoa física ou jurídica que contrata os serviços fotográficos",
    synonyms: ["contratante", "noivos"] as const,
    relatedTerms: ["contrato", "evento", "pagamento"] as const,
    businessRules: [
      "Pode ser individual ou casal",
      "Responsável pelo pagamento",
      "Contato principal para comunicação"
    ] as const
  },

  evento: {
    definition: "Ocasião específica onde os serviços fotográficos serão prestados",
    synonyms: ["celebração", "festa", "cerimônia"] as const,
    relatedTerms: ["data", "local", "cronograma"] as const,
    businessRules: [
      "Data e local específicos",
      "Cronograma detalhado",
      "Pode ter múltiplos locais"
    ] as const
  },

  // === ASPECTOS TÉCNICOS ===
  resolucao_original: {
    definition: "Qualidade máxima de captura da câmera, adequada para impressão em grande formato",
    synonyms: ["alta resolução", "full resolution"] as const,
    relatedTerms: ["qualidade", "impressao", "tamanho"] as const,
    businessRules: [
      "Formato RAW processado",
      "Adequada para impressão A3 ou maior",
      "Arquivo de maior tamanho"
    ] as const
  },

  resolucao_web: {
    definition: "Versão otimizada para visualização online e compartilhamento digital",
    synonyms: ["baixa resolução", "web resolution"] as const,
    relatedTerms: ["online", "compartilhamento", "preview"] as const,
    businessRules: [
      "Tamanho otimizado para carregamento rápido",
      "Marca d'água para proteção",
      "Não adequada para impressão em grande formato"
    ] as const
  }
} as const;

/**
 * Busca termo no dicionário de negócio
 * @param term - Termo a ser buscado
 * @returns Definição do termo ou undefined se não encontrado
 */
export function getBusinessDefinition(term: keyof typeof BUSINESS_DICTIONARY) {
  return BUSINESS_DICTIONARY[term];
}

/**
 * Busca termos relacionados a uma palavra-chave
 * @param keyword - Palavra-chave para busca
 * @returns Array de termos relacionados
 */
export function findRelatedTerms(keyword: string): string[] {
  const related: string[] = [];
  
  Object.entries(BUSINESS_DICTIONARY).forEach(([term, definition]) => {
    if (
      definition.definition.toLowerCase().includes(keyword.toLowerCase()) ||
      definition.synonyms.some(synonym => 
        synonym.toLowerCase().includes(keyword.toLowerCase())
      ) ||
      definition.relatedTerms.some(related => 
        related.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      related.push(term);
    }
  });
  
  return related;
}

/**
 * Retorna todas as regras de negócio para um contexto específico
 * @param context - Contexto do negócio (ex: "pacote", "evento", "entrega")
 * @returns Array de regras de negócio relevantes
 */
export function getBusinessRulesForContext(context: string): string[] {
  const rules: string[] = [];
  
  Object.values(BUSINESS_DICTIONARY).forEach(definition => {
    if ((definition.relatedTerms as readonly string[]).includes(context) || 
        (definition.synonyms as readonly string[]).includes(context)) {
      rules.push(...definition.businessRules);
    }
  });
  
  return rules;
}
