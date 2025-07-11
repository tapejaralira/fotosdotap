/**
 * @file Schemas Zod centralizados - Fonte Única da Verdade
 * @description Este arquivo contém todas as definições de dados do projeto.
 * Todos os tipos TypeScript são inferidos a partir desses schemas,
 * nunca definidos manualmente. Isso garante validação e consistência.
 * @author Fotos do Tap
 */

import { z } from 'zod';

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
    src: z.string().url(),
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
      src: "https://static.fotosdotap.com.br/img/home/foto1.webp",
      alt: "Ensaio fotográfico em Manaus - Foto 1",
      index: 0,
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto2.webp", 
      alt: "Casamento em Manaus - Foto 2",
      index: 1,
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto3.webp",
      alt: "Evento especial em Manaus - Foto 3", 
      index: 2,
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto4.webp",
      alt: "Momentos únicos - Foto 4",
      index: 3,
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto5.webp",
      alt: "Fotógrafo Tapejara Lira - Foto 5",
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
