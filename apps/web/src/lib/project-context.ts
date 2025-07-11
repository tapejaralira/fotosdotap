/**
 * Contexto do Projeto - Informações Essenciais para IA
 * 
 * Este arquivo centraliza todas as informações contextuais sobre o projeto
 * Fotos do Tap, incluindo objetivos, restrições, decisões e roadmap.
 * 
 * @fileoverview Contexto completo do projeto para assistência de IA
 * @author Fotos do Tap
 * @version 1.0.0
 */

// ==========================================
// VISÃO GERAL DO PROJETO
// ==========================================

export const PROJECT_CONTEXT = {
  // === INFORMAÇÕES BÁSICAS ===
  name: 'Fotos do Tap',
  description: 'Site profissional para estúdio de fotografia especializado em casamentos e eventos sociais',
  domain: 'fotosdotap.com.br',
  location: 'Manaus, Amazonas, Brasil',
  photographer: 'Tapajara Lira',
  
  // === OBJETIVOS DO PROJETO ===
  objectives: [
    'Migrar de site estático legado para arquitetura moderna',
    'Aumentar conversão de visitantes em clientes',
    'Facilitar manutenção e evolução do código',
    'Otimizar performance e SEO',
    'Implementar sistema de gestão de clientes (futuro)',
    'Maximizar assistência de IA no desenvolvimento'
  ],

  // === PÚBLICO-ALVO ===
  targetAudience: {
    primary: {
      name: 'Noivos',
      ageRange: '25-35 anos',
      income: 'Classe B/C',
      location: 'Manaus e região metropolitana',
      painPoints: [
        'Dificuldade em escolher fotógrafo confiável',
        'Preços não transparentes no mercado',
        'Falta de portfolio acessível online',
        'Demora na entrega das fotos'
      ],
      goals: [
        'Encontrar fotógrafo com estilo único',
        'Ter clareza de preços e serviços',
        'Ver trabalhos anteriores facilmente',
        'Contratar com segurança e praticidade'
      ]
    },
    secondary: {
      name: 'Profissionais e Famílias',
      ageRange: '30-50 anos',
      needs: [
        'Fotos corporativas (LinkedIn, sites)',
        'Ensaios familiares e gestantes',
        'Eventos empresariais'
      ]
    }
  },

  // === DIFERENCIAIS COMPETITIVOS ===
  differentiators: [
    'Fotografia autoral (não "formatada")',
    'Mais de 10 anos de experiência',
    'Transparência total de preços',
    'Portfolio digital moderno',
    'Atendimento personalizado',
    'Entrega pontual garantida'
  ],

  // === MODELO DE NEGÓCIO ===
  businessModel: {
    revenueStreams: [
      'Pacotes de casamento (principal)',
      'Ensaios de casal/família',
      'Fotos extras por unidade',
      'Produtos físicos (álbuns, impressões)',
      'Eventos corporativos'
    ],
    pricingStrategy: 'Value-based pricing (valor percebido)',
    seasonality: 'Pico em maio-setembro (temporada de casamentos)',
    growthStrategy: 'Marketing digital + indicações'
  }
} as const;

// ==========================================
// ESPECIFICAÇÕES TÉCNICAS
// ==========================================

export const TECHNICAL_SPECS = {
  // === STACK TECNOLÓGICA ===
  stack: {
    framework: 'Next.js 14 (App Router)',
    language: 'TypeScript',
    styling: 'Tailwind CSS',
    validation: 'Zod (fonte única da verdade)',
    documentation: 'Storybook',
    testing: 'Vitest + Testing Library',
    deployment: 'Vercel (planejado)',
    backend: 'Cloudflare Workers + D1 (futuro)'
  },

  // === PRINCÍPIOS ARQUITETURAIS ===
  principles: [
    'Mobile-first development',
    'Component-driven development',
    'Schema-first data modeling (Zod)',
    'Type safety everywhere',
    'Performance by default',
    'Accessibility from start',
    'SEO optimized',
    'AI-friendly codebase'
  ],

  // === RESTRIÇÕES E LIMITAÇÕES ===
  constraints: {
    browser_support: 'Últimas 2 versões dos principais browsers',
    performance_budget: 'First Contentful Paint < 2s',
    accessibility: 'WCAG 2.1 AA compliance',
    seo_requirements: 'Core Web Vitals na zona verde',
    maintenance: 'Código deve ser mantível por IA'
  },

  // === ESTRUTURA DE PASTAS ===
  structure: {
    '/src/app/': 'Páginas e layouts (Next.js App Router)',
    '/src/components/ui/': 'Componentes reutilizáveis básicos',
    '/src/components/home/': 'Componentes específicos da home',
    '/src/components/layout/': 'Componentes de layout (header, footer)',
    '/src/lib/': 'Utilitários, schemas e configurações',
    '/src/stories/': 'Storybook stories',
    '/public/': 'Assets estáticos (imagens, ícones)',
    '/.storybook/': 'Configuração do Storybook',
    '/docs/': 'Documentação do projeto'
  }
} as const;

// ==========================================
// ROADMAP E STATUS
// ==========================================

export const PROJECT_ROADMAP = {
  // === FASE 1: FUNDAÇÃO (CONCLUÍDA) ===
  phase1_foundation: {
    status: 'COMPLETED',
    description: 'Setup inicial e componentes básicos',
    deliverables: [
      '✓ Configuração Next.js + TypeScript + Tailwind',
      '✓ Schemas Zod centralizados',
      '✓ Componentes Hero, Carrossel, PackageCard',
      '✓ Páginas Home e Pacotes funcionais',
      '✓ Storybook configurado',
      '✓ Responsividade implementada'
    ]
  },

  // === FASE 2: REFINAMENTO (EM ANDAMENTO) ===
  phase2_refinement: {
    status: 'IN_PROGRESS',
    description: 'Ajustes visuais e otimizações',
    deliverables: [
      '⚠️ Ajustes de design para match com original',
      '⚠️ Otimização de imagens e performance',
      '⚠️ Testes automatizados',
      '⚠️ Stories completas no Storybook',
      '⚠️ SEO e metadados otimizados'
    ]
  },

  // === FASE 3: BACKEND (PLANEJADA) ===
  phase3_backend: {
    status: 'PLANNED',
    description: 'Integração com backend e CMS',
    deliverables: [
      '📋 API com Cloudflare Workers + D1',
      '📋 Sistema de gestão de clientes',
      '📋 Formulários de contato funcionais',
      '📋 Galeria administrativa',
      '📋 Sistema de propostas automáticas'
    ]
  },

  // === FASE 4: CRESCIMENTO (FUTURO) ===
  phase4_growth: {
    status: 'FUTURE',
    description: 'Features avançadas e automação',
    deliverables: [
      '🔮 Integração com calendários',
      '🔮 Assinatura digital de contratos',
      '🔮 Sistema de pagamentos online',
      '🔮 APP mobile para clientes',
      '🔮 Inteligência artificial para edição'
    ]
  }
} as const;

// ==========================================
// GUIDELINES PARA IA
// ==========================================

export const AI_GUIDELINES = {
  // === QUANDO FAZER MUDANÇAS ===
  change_protocols: {
    breaking_changes: [
      'Sempre verificar impacto nos schemas Zod',
      'Executar testes antes de commit',
      'Atualizar documentação relevante',
      'Considerar backward compatibility'
    ],
    new_features: [
      'Seguir padrões estabelecidos',
      'Criar testes para lógica complexa',
      'Adicionar ao Storybook se visual',
      'Documentar no component-metadata.ts'
    ],
    bug_fixes: [
      'Identificar causa raiz',
      'Corrigir no nível apropriado (schema/component/page)',
      'Validar fix com testes',
      'Verificar se afeta outros componentes'
    ]
  },

  // === PADRÕES DE CÓDIGO ===
  code_patterns: {
    components: 'Sempre validar props com schema.parse()',
    types: 'Sempre inferir do Zod, nunca definir manualmente',
    styling: 'Mobile-first com Tailwind CSS',
    naming: 'PascalCase para componentes, camelCase para funções',
    documentation: 'JSDoc completo para todas as funções públicas'
  },

  // === PRIORIDADES ===
  priorities: [
    '1. Performance (Core Web Vitals)',
    '2. Acessibilidade (WCAG 2.1 AA)',
    '3. SEO (meta tags, structured data)',
    '4. Type Safety (TypeScript strict)',
    '5. Maintainability (código limpo, documentado)'
  ],

  // === RECURSOS DISPONÍVEIS ===
  resources: {
    schemas: '/src/lib/schemas.ts - Fonte única da verdade',
    examples: '/src/lib/examples.ts - Props de exemplo',
    business_dict: '/src/lib/business-dictionary.ts - Glossário do domínio',
    flow_docs: '/src/lib/flow-comments.ts - Documentação de fluxos',
    metadata: '/src/lib/component-metadata.ts - Metadados de componentes',
    tests: '/src/lib/schemas.test.ts - Testes dos schemas'
  }
} as const;

// ==========================================
// MÉTRICAS E OBJETIVOS
// ==========================================

export const SUCCESS_METRICS = {
  // === MÉTRICAS TÉCNICAS ===
  technical: {
    performance: {
      fcp: '< 1.5s (First Contentful Paint)',
      lcp: '< 2.5s (Largest Contentful Paint)',
      cls: '< 0.1 (Cumulative Layout Shift)',
      fid: '< 100ms (First Input Delay)',
      lighthouse_score: '> 90 (Performance Score)'
    },
    quality: {
      typescript_coverage: '100% (strict mode)',
      test_coverage: '> 80% (critical paths)',
      accessibility_score: '> 95 (Lighthouse A11y)',
      seo_score: '> 95 (Lighthouse SEO)'
    }
  },

  // === MÉTRICAS DE NEGÓCIO ===
  business: {
    conversion: {
      visitor_to_lead: '> 5% (formulário de contato)',
      bounce_rate: '< 40% (engajamento)',
      session_duration: '> 2min (interesse)',
      pages_per_session: '> 2 (exploração)'
    },
    growth: {
      organic_traffic: '+200% vs. site atual',
      mobile_usage: '> 60% (responsive design)',
      return_visitors: '> 20% (fidelização)',
      social_shares: '+300% (viralização)'
    }
  }
} as const;

// ==========================================
// CONFIGURAÇÕES E SECRETS
// ==========================================

export const CONFIG_REQUIREMENTS = {
  environment_variables: {
    NEXT_PUBLIC_SITE_URL: 'URL base do site (SEO)',
    NEXT_PUBLIC_GTM_ID: 'Google Tag Manager (analytics)',
    NEXT_PUBLIC_MAPS_API_KEY: 'Google Maps (futuro)',
    DATABASE_URL: 'Cloudflare D1 connection (futuro)',
    RESEND_API_KEY: 'Email service (futuro)',
    UPLOADTHING_SECRET: 'File upload service (futuro)'
  },
  external_services: {
    vercel: 'Hosting e deployment',
    cloudflare: 'CDN e Workers (futuro)',
    google_analytics: 'Analytics e conversão',
    google_search_console: 'SEO monitoring',
    hotjar: 'UX analytics (opcional)'
  }
} as const;

// ==========================================
// UTILITÁRIOS PARA CONSULTA
// ==========================================

/**
 * Retorna o status atual do projeto
 */
export function getProjectStatus() {
  const phases = Object.values(PROJECT_ROADMAP);
  const completed = phases.filter(p => p.status === 'COMPLETED').length;
  const total = phases.length;
  
  return {
    completion_percentage: Math.round((completed / total) * 100),
    current_phase: 'Phase 2: Refinement',
    next_milestone: 'Visual adjustments and performance optimization',
    estimated_completion: 'Q1 2024'
  };
}

/**
 * Retorna checklist para deploy em produção
 */
export function getProductionChecklist() {
  return [
    '✓ Performance: Core Web Vitals na zona verde',
    '✓ SEO: Meta tags e structured data implementados',
    '✓ Analytics: Google Analytics configurado',
    '✓ Forms: Formulários funcionais com validação',
    '✓ Images: Todas as imagens otimizadas',
    '✓ A11y: Accessibility score > 95',
    '✓ Mobile: Testes em dispositivos reais',
    '✓ Security: Headers de segurança configurados',
    '✓ Backup: Processo de backup definido',
    '✓ Monitoring: Alertas de uptime configurados'
  ];
}

/**
 * Retorna próximas tarefas prioritárias
 */
export function getNextTasks() {
  return [
    {
      task: 'Criar stories do Storybook para componentes faltantes',
      priority: 'HIGH',
      effort: '2-3 horas',
      blocker: false
    },
    {
      task: 'Implementar testes automatizados dos componentes',
      priority: 'HIGH',
      effort: '4-6 horas',
      blocker: false
    },
    {
      task: 'Otimizar imagens para WebP e lazy loading',
      priority: 'MEDIUM',
      effort: '1-2 horas',
      blocker: false
    },
    {
      task: 'Configurar deployment no Vercel',
      priority: 'HIGH',
      effort: '1 hora',
      blocker: true
    },
    {
      task: 'Implementar formulário de contato funcional',
      priority: 'MEDIUM',
      effort: '3-4 horas',
      blocker: false
    }
  ];
}

export {}; // Força este arquivo a ser um módulo
