/**
 * @file Schemas Zod centralizados - Fonte Única da Verdade
 * @description Este arquivo contém todas as definições de dados do projeto.
 * Todos os tipos TypeScript são inferidos a partir desses schemas,
 * nunca definidos manualmente. Isso garante validação e consistência.
 * @author Fotos do Tap
 */

import { z } from 'zod';

/**
 * Schema Zod para cores do sistema de design.
 * Esta é a fonte única da verdade para todas as cores do projeto.
 * 
 * @example
 * ```typescript
 * const cores = DesignSystemColorsSchema.parse({
 *   primaria: '#11131b',
 *   secundaria: '#f8f9fa',
 *   texto: '#666666',
 *   destaque: '#b6b6bd'
 * });
 * ```
 */
export const DesignSystemColorsSchema = z.object({
  /** Cor principal da marca - textos importantes, elementos principais */
  primaria: z.literal('#11131b'),
  /** Cor de fundo da página - background principal */
  secundaria: z.literal('#f8f9fa'),
  /** Cor para textos secundários - descrições, labels */
  texto: z.literal('#666666'),
  /** Cor de destaque - elementos especiais, bordas */
  destaque: z.literal('#b6b6bd'),
});

/**
 * Schema Zod para espaçamentos do sistema de design.
 * Define todos os valores de espaçamento padronizados.
 */
export const DesignSystemSpacingSchema = z.object({
  /** Espaçamento base padrão (1rem = 16px) */
  espacamento: z.literal('1rem'),
  /** Espaçamento interno de cards (1.5rem = 24px) */
  espacamentoCard: z.literal('1.5rem'),
  /** Espaçamento entre divisões grandes (4rem = 64px) */
  espacamentoDiv: z.literal('4rem'),
  /** Espaçamento pequeno para elementos menores (0.5rem = 8px) */
  espacamentoPequeno: z.literal('0.5rem'),
});

/**
 * Schema Zod para tipografia do sistema de design.
 * Define as fontes padronizadas do projeto.
 */
export const DesignSystemTypographySchema = z.object({
  /** Fonte principal para textos gerais */
  principal: z.literal('Open Sans, sans-serif'),
  /** Fonte para títulos e headings */
  titulo: z.literal('DM Serif Text, serif'),
});

/**
 * Schema Zod completo do sistema de design.
 * Combina cores, espaçamentos e tipografia em uma fonte única da verdade.
 */
export const DesignSystemSchema = z.object({
  colors: DesignSystemColorsSchema,
  spacing: DesignSystemSpacingSchema,
  typography: DesignSystemTypographySchema,
});

/**
 * Tipos TypeScript inferidos automaticamente dos schemas.
 * NUNCA definir tipos manualmente - sempre usar z.infer<>
 */
export type DesignSystemColors = z.infer<typeof DesignSystemColorsSchema>;
export type DesignSystemSpacing = z.infer<typeof DesignSystemSpacingSchema>;
export type DesignSystemTypography = z.infer<typeof DesignSystemTypographySchema>;
export type DesignSystem = z.infer<typeof DesignSystemSchema>;

/**
 * Instância validada do sistema de design.
 * Esta é a fonte única da verdade para todos os valores de design.
 */
export const DESIGN_SYSTEM = DesignSystemSchema.parse({
  colors: {
    primaria: '#11131b',
    secundaria: '#f8f9fa', 
    texto: '#666666',
    destaque: '#b6b6bd',
  },
  spacing: {
    espacamento: '1rem',
    espacamentoCard: '1.5rem',
    espacamentoDiv: '4rem',
    espacamentoPequeno: '0.5rem',
  },
  typography: {
    principal: 'Open Sans, sans-serif',
    titulo: 'DM Serif Text, serif',
  },
});

/**
 * Schema Zod para um pacote de fotos.
 * Esta é a fonte única da verdade para a estrutura de dados de pacotes.
 * 
 * @example
 * ```typescript
 * const pacoteCompleto = PackageSchema.parse({
 *   id: "completo",
 *   title: "Pacote Completo",
 *   description: "A escolha ideal para quem quer viver a experiência completa...",
 *   price: 500,
 *   features: ["60 fotos escolhidas por você", "Até 3 horas de sessão"],
 *   image: "https://static.fotosdotap.com.br/img/pacotes/pacote1.webp",
 *   highlighted: true
 * });
 * ```
 */
export const PackageSchema = z.object({
  /** Identificador único do pacote */
  id: z.string().min(1),
  /** Nome do pacote */
  title: z.string().min(1),
  /** Descrição detalhada do pacote */
  description: z.string().min(1),
  /** Preço em reais (número positivo) */
  price: z.number().positive(),
  /** Lista de características/benefícios inclusos */
  features: z.array(z.string().min(1)),
  /** URL da imagem representativa do pacote */
  image: z.string().url(),
  /** Se o pacote deve ser destacado visualmente */
  highlighted: z.boolean().default(false),
});

/**
 * Schema Zod para configuração de preços de fotos extras.
 * Define os preços por foto adicional baseado no tipo de pacote e quantidade.
 */
export const ExtraPricingSchema = z.object({
  /** Preço por foto no pacote básico (até 5 fotos) */
  basicUp5: z.number().positive(),
  /** Preço por foto no pacote básico (mais de 5 fotos) */
  basicOver5: z.number().positive(),
  /** Preço por foto no pacote premium (até 5 fotos) */
  premiumUp5: z.number().positive(),
  /** Preço por foto no pacote premium (mais de 5 fotos) */
  premiumOver5: z.number().positive(),
});

/**
 * Schema Zod para dados de entrada do cálculo de fotos extras.
 */
export const ExtraCalculationInputSchema = z.object({
  /** Tipo do pacote selecionado */
  packageType: z.enum(['basic', 'premium']),
  /** Quantidade de fotos extras desejadas */
  extraPhotos: z.number().min(0).max(999),
});

/**
 * Schema Zod para resultado do cálculo de fotos extras.
 */
export const ExtraCalculationResultSchema = z.object({
  /** Quantidade total de fotos extras */
  totalExtras: z.number().min(0),
  /** Valor total a pagar pelas fotos extras */
  totalPrice: z.number().min(0),
  /** Detalhamento do cálculo por faixa de preço */
  breakdown: z.object({
    /** Fotos na faixa até 5 fotos */
    up5Photos: z.number().min(0),
    /** Preço unitário para fotos até 5 */
    up5Price: z.number().min(0),
    /** Subtotal para fotos até 5 */
    up5Subtotal: z.number().min(0),
    /** Fotos na faixa acima de 5 fotos */
    over5Photos: z.number().min(0),
    /** Preço unitário para fotos acima de 5 */
    over5Price: z.number().min(0),
    /** Subtotal para fotos acima de 5 */
    over5Subtotal: z.number().min(0),
  }),
});

/**
 * Schema Zod para dados de um carrossel de imagens.
 */
export const CarouselSchema = z.object({
  /** Lista de imagens do carrossel */
  images: z.array(z.object({
    /** URL da imagem */
    src: z.string().min(1),
    /** Texto alternativo para acessibilidade */
    alt: z.string().min(1),
    /** Índice da imagem (para ordenação) */
    index: z.number().min(0),
  })),
  /** Intervalo em milissegundos para auto-play */
  autoPlayInterval: z.number().positive().default(5000),
  /** Se o carrossel deve fazer auto-play */
  autoPlay: z.boolean().default(true),
});

/**
 * Schema Zod para dados de uma seção Hero.
 */
export const HeroSchema = z.object({
  /** Título principal da seção */
  title: z.string().min(1),
  /** Subtítulo/descrição */
  subtitle: z.string().min(1),
  /** Classes CSS adicionais (opcional) */
  className: z.string().optional(),
});

// ==========================================
// TIPOS TYPESCRIPT INFERIDOS AUTOMATICAMENTE
// ==========================================

/**
 * Tipo TypeScript para um pacote de fotos.
 * ⚠️ NUNCA defina este tipo manualmente - sempre inferir do schema!
 */
export type Package = z.infer<typeof PackageSchema>;

/**
 * Tipo TypeScript para configuração de preços extras.
 * ⚠️ NUNCA defina este tipo manualmente - sempre inferir do schema!
 */
export type ExtraPricing = z.infer<typeof ExtraPricingSchema>;

/**
 * Tipo TypeScript para entrada do cálculo de extras.
 * ⚠️ NUNCA defina este tipo manualmente - sempre inferir do schema!
 */
export type ExtraCalculationInput = z.infer<typeof ExtraCalculationInputSchema>;

/**
 * Tipo TypeScript para resultado do cálculo de extras.
 * ⚠️ NUNCA defina este tipo manualmente - sempre inferir do schema!
 */
export type ExtraCalculationResult = z.infer<typeof ExtraCalculationResultSchema>;

/**
 * Tipo TypeScript para tipo de pacote (union type).
 * ⚠️ NUNCA defina este tipo manualmente - sempre inferir do schema!
 */
export type PackageType = ExtraCalculationInput['packageType'];

/**
 * Tipo TypeScript para dados do carrossel.
 * ⚠️ NUNCA defina este tipo manualmente - sempre inferir do schema!
 */
export type Carousel = z.infer<typeof CarouselSchema>;

/**
 * Tipo TypeScript para dados da seção Hero.
 * ⚠️ NUNCA defina este tipo manualmente - sempre inferir do schema!
 */
export type Hero = z.infer<typeof HeroSchema>;

// ==========================================
// DADOS DE EXEMPLO VALIDADOS
// ==========================================

/**
 * Configuração padrão de preços para fotos extras.
 * Validada automaticamente pelo schema.
 */
export const DEFAULT_EXTRA_PRICING: ExtraPricing = ExtraPricingSchema.parse({
  basicUp5: 15,     // R$ 15 por foto (até 5 fotos) - pacote básico
  basicOver5: 12,   // R$ 12 por foto (mais de 5) - pacote básico  
  premiumUp5: 20,   // R$ 20 por foto (até 5 fotos) - pacote premium
  premiumOver5: 15, // R$ 15 por foto (mais de 5) - pacote premium
});

/**
 * Dados dos pacotes disponíveis.
 * Todos validados automaticamente pelo schema.
 */
export const PACKAGES: Package[] = [
  PackageSchema.parse({
    id: "completo",
    title: "Pacote Completo",
    description: "A escolha ideal pra quem quer viver a experiência completa e ter um ensaio inesquecível do início ao fim. Perfeito para casais apaixonados, profissionais que querem se destacar ou quem sonha com um ensaio editorial com estilo e personalidade.",
    price: 500,
    features: [
      "60 fotos escolhidas por você",
      "Até 3 horas de sessão",
      "Consultoria pré-ensaio",
      "Edição profissional em alta qualidade",
      "Entrega digital em link exclusivo"
    ],
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote1.webp",
    highlighted: true,
  }),
  
  PackageSchema.parse({
    id: "flexivel",
    title: "Pacote Flexível",
    description: "Aqui o controle é seu. Você faz o ensaio, vê as fotos com calma e só escolhe o que realmente quiser levar. Perfeito pra quem busca praticidade, um registro pontual ou quer começar com um investimento menor. Com liberdade total pra adicionar mais fotos depois, pagando só pelo que escolher.",
    price: 200,
    features: [
      "Sessão de 1 hora de duração",
      "Você escolhe suas fotos",
      "Paga só pelas fotos que escolher",
      "Edição profissional em alta qualidade",
      "Entrega digital em link exclusivo"
    ],
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote2.webp",
    highlighted: false,
  }),
];

/**
 * Dados do carrossel da página inicial.
 * Validados automaticamente pelo schema.
 */
export const HOME_CAROUSEL: Carousel = CarouselSchema.parse({
  images: [
    {
      src: "/img/home/foto1.webp",
      alt: "Fotografia de casamento - Momento especial do casal durante a cerimônia",
      index: 0,
    },
    {
      src: "/img/home/foto2.webp", 
      alt: "Ensaio fotográfico - Retrato profissional em ambiente natural",
      index: 1,
    },
    {
      src: "/img/home/foto3.webp",
      alt: "Fotografia de eventos - Celebração e momentos únicos", 
      index: 2,
    },
    {
      src: "/img/home/foto4.webp",
      alt: "Sessão de fotos - Captura de emoções genuínas",
      index: 3,
    },
    {
      src: "/img/home/foto5.webp",
      alt: "Portfolio Fotos do Tap - Trabalhos realizados com excelência",
      index: 4,
    },
  ],
  autoPlayInterval: 5000,
  autoPlay: true,
});

/**
 * Dados da seção Hero da página inicial.
 * Validados automaticamente pelo schema.
 */
export const HOME_HERO: Hero = HeroSchema.parse({
  title: "Capturando Emoções, Eternizando Memórias!",
  subtitle: "Fotografia profissional para eternizar os momentos mais importantes da sua vida.",
});
