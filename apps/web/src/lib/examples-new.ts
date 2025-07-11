/**
 * Exemplos de Dados e Padrões - Fotos do Tap
 * 
 * Este arquivo contém exemplos típicos de props e dados para cada componente,
 * facilitando a assistência de IA com contexto prático de uso.
 * 
 * @category Examples
 * @domain Fotografia
 * @usage Referência para IA e desenvolvimento
 */

import { 
  HeroSchema, 
  CarouselSchema, 
  PackageSchema, 
  ExtraPricingSchema 
} from './schemas';
import type { z } from 'zod';

// ============================================================================
// TIPOS INFERIDOS DOS SCHEMAS (não definir manualmente)
// ============================================================================

export type HeroData = z.infer<typeof HeroSchema>;
export type CarrosselData = z.infer<typeof CarouselSchema>;
export type PackageData = z.infer<typeof PackageSchema>;
export type ExtraPricingData = z.infer<typeof ExtraPricingSchema>;

// ============================================================================
// EXEMPLOS DE DADOS REAIS
// ============================================================================

/**
 * Exemplo típico de dados para Hero
 * Usado na página inicial
 */
export const heroExample: HeroData = {
  title: "Eternizando seus momentos especiais",
  subtitle: "Fotografia profissional para casamentos, aniversários e formaturas com qualidade excepcional e preços acessíveis",
  className: "min-h-screen bg-gradient-to-br from-rose-50 to-amber-50"
};

/**
 * Exemplo típico de dados para Carrossel
 * Portfolio de trabalhos realizados
 */
export const carrosselExample: CarrosselData = {
  images: [
    {
      src: "https://static.fotosdotap.com.br/img/home/foto1.webp",
      alt: "Casamento romântico ao pôr do sol",
      index: 0
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto2.webp", 
      alt: "Aniversário de 15 anos elegante",
      index: 1
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto3.webp",
      alt: "Formatura medicina UFMG",
      index: 2
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto4.webp",
      alt: "Ensaio casal pré-wedding",
      index: 3
    },
    {
      src: "https://static.fotosdotap.com.br/img/home/foto5.webp",
      alt: "Aniversário empresarial",
      index: 4
    }
  ],
  autoPlayInterval: 5000,
  autoPlay: true
};

/**
 * Exemplos de pacotes fotográficos
 * Diferentes categorias e preços
 */
export const packagesExamples: PackageData[] = [
  {
    id: "casamento-gold",
    title: "Casamento Gold",
    description: "Cobertura completa do seu casamento com qualidade profissional",
    features: [
      "8 horas de cobertura",
      "2 fotógrafos profissionais", 
      "300+ fotos editadas",
      "Álbum premium 30x30cm",
      "Galeria online privativa",
      "Sessão pré-wedding inclusa"
    ],
    price: 3500,
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote1.webp",
    highlighted: true
  },
  {
    id: "aniversario-silver",
    title: "Aniversário Silver", 
    description: "Eternize os momentos especiais do seu aniversário",
    features: [
      "4 horas de cobertura",
      "1 fotógrafo profissional",
      "150+ fotos editadas", 
      "Galeria online",
      "Fotos em alta resolução"
    ],
    price: 1200,
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote2.webp",
    highlighted: false
  },
  {
    id: "formatura-bronze",
    title: "Formatura Bronze",
    description: "Registre sua conquista com fotos memoráveis",
    features: [
      "2 horas de cobertura",
      "1 fotógrafo profissional",
      "80+ fotos editadas",
      "Galeria online",
      "Fotos individuais e em grupo"
    ],
    price: 800,
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote1.webp",
    highlighted: false
  }
];

/**
 * Exemplo de configuração de preços extras
 * Usado na calculadora de fotos extras
 */
export const extraPricingExample: ExtraPricingData = {
  basicUp5: 30,      // R$ 30 por foto até 5 fotos (pacote básico)
  basicOver5: 25,    // R$ 25 por foto acima de 5 fotos (pacote básico)
  premiumUp5: 20,    // R$ 20 por foto até 5 fotos (pacote premium)
  premiumOver5: 15   // R$ 15 por foto acima de 5 fotos (pacote premium)
};

// ============================================================================
// DADOS MOCK PARA STORYBOOK
// ============================================================================

/**
 * Dados simplificados para histórias do Storybook
 * Versões reduzidas dos exemplos acima
 */
export const storybook = {
  hero: {
    title: "Título de Exemplo",
    subtitle: "Subtítulo para demonstração no Storybook",
    className: "min-h-96 bg-gradient-to-r from-blue-50 to-purple-50"
  },
  
  carrossel: {
    images: [
      {
        src: "https://static.fotosdotap.com.br/img/home/foto1.webp",
        alt: "Exemplo 1",
        index: 0
      },
      {
        src: "https://static.fotosdotap.com.br/img/home/foto2.webp", 
        alt: "Exemplo 2",
        index: 1
      }
    ],
    autoPlayInterval: 3000,
    autoPlay: true
  },

  package: {
    id: "exemplo",
    title: "Pacote Exemplo",
    description: "Descrição de exemplo para Storybook",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    price: 1500,
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote1.webp",
    highlighted: true
  }
};

// ============================================================================
// GUIA DE CATEGORIZAÇÃO
// ============================================================================

/**
 * Mapeamento de categorias para facilitar desenvolvimento
 */
export const categories = {
  // Tipos de eventos
  events: ['casamento', 'aniversario', 'formatura', 'corporativo', 'ensaio'],
  
  // Categorias de componentes
  components: ['ui', 'layout', 'home', 'pacotes', 'admin'],
  
  // Status de desenvolvimento
  status: ['planejado', 'desenvolvimento', 'revisao', 'concluido'],
  
  // Prioridades
  priority: ['baixa', 'media', 'alta', 'critica']
};

// ============================================================================
// VALIDAÇÕES ÚTEIS
// ============================================================================

/**
 * Funções de validação para uso comum
 */
export const validators = {
  /**
   * Valida se uma imagem existe
   */
  isValidImage: (src: string): boolean => {
    return src.startsWith('http') && (
      src.endsWith('.jpg') || 
      src.endsWith('.jpeg') || 
      src.endsWith('.png') || 
      src.endsWith('.webp')
    );
  },

  /**
   * Valida formato de preço
   */
  isValidPrice: (price: number): boolean => {
    return price > 0 && price <= 10000;
  },

  /**
   * Valida categoria de evento
   */
  isValidCategory: (category: string): boolean => {
    return categories.events.includes(category);
  }
};

// ============================================================================
// PADRÕES DE CÓDIGO ESPERADOS
// ============================================================================

/**
 * Templates e padrões para facilitar desenvolvimento
 */
export const codeTemplates = {
  /**
   * Template para componente baseado em schema
   */
  component: `
/**
 * Componente [Nome] - [Descrição breve]
 * @category UI|Layout|Home|Pacotes
 * @dependencies schemas.ts
 * @tested Storybook
 */
interface Props {
  data: ComponentData; // Sempre tipar com schema
}

export default function Component({ data }: Props) {
  // Validação automática com schema
  const validatedData = componentSchema.parse(data);
  
  return (
    <div className="w-full mobile-first-styles md:desktop-styles">
      {/* JSX aqui */}
    </div>
  );
}
  `,

  /**
   * Template para story do Storybook
   */
  story: `
import type { Meta, StoryObj } from '@storybook/react';
import Component from './Component';
import { componentSchema } from '@/lib/schemas';

const meta: Meta<typeof Component> = {
  title: 'Categoria/Component',
  component: Component,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: componentSchema.parse({
      // Dados de exemplo
    }),
  },
};
  `,

  /**
   * Template para schema Zod
   */
  schema: `
export const ComponentSchema = z.object({
  /** Descrição da propriedade */
  property: z.string().min(1),
  /** Propriedade opcional */
  optionalProperty: z.string().optional(),
});

export type Component = z.infer<typeof ComponentSchema>;
  `
};

const examples = {
  heroExample,
  carrosselExample, 
  packagesExamples,
  extraPricingExample,
  storybook,
  categories,
  validators,
  codeTemplates
};

export default examples;
