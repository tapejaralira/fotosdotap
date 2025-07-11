/**
 * Metadados de Componentes - Contexto para IA
 * 
 * Este arquivo centraliza informações sobre todos os componentes do sistema,
 * incluindo dependências, props, casos de uso e exemplos práticos.
 * Essencial para assistência de IA em manutenção e desenvolvimento.
 * 
 * @fileoverview Metadados e documentação de componentes
 * @author Fotos do Tap
 * @version 1.0.0
 */

// ==========================================
// DEFINIÇÕES DE METADADOS
// ==========================================

/**
 * Interface para metadados de componente
 */
interface ComponentMetadata {
  /** Nome do componente */
  name: string;
  /** Localização do arquivo */
  path: string;
  /** Tipo do componente */
  type: 'ui' | 'layout' | 'page' | 'utility';
  /** Descrição e propósito */
  description: string;
  /** Schema Zod usado para props (se aplicável) */
  propsSchema?: string;
  /** Tipo TypeScript das props */
  propsType?: string;
  /** Dependências externas */
  dependencies: string[];
  /** Props obrigatórias */
  requiredProps: string[];
  /** Props opcionais */
  optionalProps: string[];
  /** Casos de uso principais */
  useCases: string[];
  /** Responsividade implementada */
  responsive: boolean;
  /** Acessibilidade implementada */
  accessible: boolean;
  /** Possui Storybook story */
  hasStory: boolean;
  /** Possui testes */
  hasTests: boolean;
  /** Exemplos de uso */
  examples: ComponentExample[];
  /** Notas especiais para IA */
  aiNotes: string[];
}

/**
 * Interface para exemplos de uso
 */
interface ComponentExample {
  /** Título do exemplo */
  title: string;
  /** Código do exemplo */
  code: string;
  /** Descrição do que faz */
  description: string;
}

// ==========================================
// METADADOS DOS COMPONENTES
// ==========================================

export const COMPONENT_METADATA: Record<string, ComponentMetadata> = {
  // === COMPONENTES UI ===
  Hero: {
    name: 'Hero',
    path: '/src/components/ui/Hero.tsx',
    type: 'ui',
    description: 'Seção principal da página com título, subtítulo e fundo responsivo',
    propsSchema: 'HeroSchema',
    propsType: 'Hero',
    dependencies: ['React', 'Tailwind CSS', 'DM Serif Text'],
    requiredProps: ['title', 'subtitle'],
    optionalProps: ['className'],
    useCases: [
      'Página inicial - seção hero principal',
      'Landing pages - primeira impressão',
      'Páginas de produto - destaque do valor'
    ],
    responsive: true,
    accessible: true,
    hasStory: true,
    hasTests: false,
    examples: [
      {
        title: 'Hero básico',
        code: `<Hero 
  title="Fotos do Tap" 
  subtitle="Fotografia autoral em Manaus" 
/>`,
        description: 'Uso básico com título e subtítulo'
      },
      {
        title: 'Hero com classe customizada',
        code: `<Hero 
  title="Ensaios Únicos" 
  subtitle="Para momentos especiais"
  className="bg-gradient-to-r from-gold-500 to-gold-700" 
/>`,
        description: 'Hero com background customizado via className'
      }
    ],
    aiNotes: [
      'Sempre validar props via HeroSchema.parse()',
      'Usar fonte DM Serif Text para títulos',
      'Background deve ser responsivo (mobile-first)',
      'Texto deve ter bom contraste sobre imagem de fundo'
    ]
  },

  Carrossel: {
    name: 'Carrossel',
    path: '/src/components/ui/Carrossel.tsx',
    type: 'ui',
    description: 'Carrossel de imagens responsivo com auto-play e navegação manual',
    propsSchema: 'CarouselSchema',
    propsType: 'Carousel',
    dependencies: ['React', 'useState', 'useEffect', 'Tailwind CSS'],
    requiredProps: ['images'],
    optionalProps: ['autoPlay', 'autoPlayInterval'],
    useCases: [
      'Página inicial - portfolio de fotos',
      'Galeria de trabalhos - showcase',
      'Página de pacotes - exemplos visuais'
    ],
    responsive: true,
    accessible: true,
    hasStory: false,
    hasTests: false,
    examples: [
      {
        title: 'Carrossel básico',
        code: `<Carrossel images={HOME_CAROUSEL.images} />`,
        description: 'Carrossel com configuração padrão'
      },
      {
        title: 'Carrossel customizado',
        code: `<Carrossel 
  images={portfolioImages}
  autoPlay={false}
  autoPlayInterval={3000}
/>`,
        description: 'Carrossel sem auto-play e intervalo customizado'
      }
    ],
    aiNotes: [
      'Imagens devem ter URLs válidas e alt text descritivo',
      'index deve ser sequencial começando do 0',
      'Implementar lazy loading para performance',
      'Touch/swipe deve funcionar em mobile',
      'Botões de navegação com boa área de toque'
    ]
  },

  PackageCard: {
    name: 'PackageCard',
    path: '/src/components/home/PackageCard.tsx',
    type: 'ui',
    description: 'Card responsivo para exibir pacotes com preço, features e CTA',
    propsSchema: 'PackageSchema',
    propsType: 'Package',
    dependencies: ['React', 'Tailwind CSS'],
    requiredProps: ['id', 'title', 'description', 'price', 'features', 'image'],
    optionalProps: ['highlighted'],
    useCases: [
      'Página inicial - showcase de pacotes',
      'Página /pacotes - listagem completa',
      'Landing pages - ofertas específicas'
    ],
    responsive: true,
    accessible: true,
    hasStory: false,
    hasTests: false,
    examples: [
      {
        title: 'Card de pacote destacado',
        code: `<PackageCard {...PACKAGES[0]} />`,
        description: 'Card do pacote completo (highlighted=true)'
      },
      {
        title: 'Card de pacote normal',
        code: `<PackageCard {...PACKAGES[1]} />`,
        description: 'Card do pacote flexível (highlighted=false)'
      }
    ],
    aiNotes: [
      'highlighted=true deve ter styling diferenciado',
      'Preço deve ser formatado em reais (R$)',
      'Features devem ser listadas como bullet points',
      'Imagem deve ter aspect ratio consistente',
      'CTA deve ser claro e acionável',
      'Card deve ter hover effects sutis'
    ]
  },

  CalculadoraExtras: {
    name: 'CalculadoraExtras',
    path: '/src/components/home/CalculadoraExtras.tsx',
    type: 'ui',
    description: 'Calculadora interativa para estimar preço de fotos extras',
    propsSchema: 'ExtraPricingSchema',
    propsType: 'ExtraPricing',
    dependencies: ['React', 'useState', 'Tailwind CSS'],
    requiredProps: ['basicUp5', 'basicOver5', 'premiumUp5', 'premiumOver5'],
    optionalProps: [],
    useCases: [
      'Página inicial - ferramenta de estimativa',
      'Página de pacotes - complemento aos cards',
      'Atendimento - cálculo transparente'
    ],
    responsive: true,
    accessible: true,
    hasStory: false,
    hasTests: false,
    examples: [
      {
        title: 'Calculadora padrão',
        code: `<CalculadoraExtras {...DEFAULT_EXTRA_PRICING} />`,
        description: 'Calculadora com preços padrão do sistema'
      },
      {
        title: 'Calculadora com preços personalizados',
        code: `<CalculadoraExtras 
  basicUp5={20} 
  basicOver5={15} 
  premiumUp5={25} 
  premiumOver5={20} 
/>`,
        description: 'Calculadora com tabela de preços customizada'
      }
    ],
    aiNotes: [
      'Estado interno deve usar ExtraCalculationInputSchema',
      'Validação em tempo real conforme usuário digita',
      'Mostrar breakdown detalhado do cálculo',
      'Inputs numéricos com validação de range',
      'Resultado deve ser formatado em reais',
      'UX deve ser intuitiva e responsiva'
    ]
  },

  // === LAYOUTS ===
  RootLayout: {
    name: 'RootLayout',
    path: '/src/app/layout.tsx',
    type: 'layout',
    description: 'Layout raiz da aplicação com configurações globais',
    dependencies: ['Next.js', 'Tailwind CSS', 'DM Serif Text', 'Metadata API'],
    requiredProps: ['children'],
    optionalProps: [],
    useCases: [
      'Todas as páginas - wrapper comum',
      'SEO - metadados globais',
      'Fontes - carregamento otimizado'
    ],
    responsive: true,
    accessible: true,
    hasStory: false,
    hasTests: false,
    examples: [
      {
        title: 'Layout automático',
        code: `// Usado automaticamente pelo Next.js em todas as páginas`,
        description: 'Next.js aplica este layout automaticamente'
      }
    ],
    aiNotes: [
      'Define metadados SEO globais',
      'Carrega fonte DM Serif Text com font-display: swap',
      'Configura viewport para responsividade',
      'Estabelece estrutura HTML semântica'
    ]
  },

  // === PÁGINAS ===
  HomePage: {
    name: 'HomePage',
    path: '/src/app/page.tsx',
    type: 'page',
    description: 'Página inicial com Hero, Carrossel, Pacotes e Calculadora',
    dependencies: ['Hero', 'Carrossel', 'PackageCard', 'CalculadoraExtras'],
    requiredProps: [],
    optionalProps: [],
    useCases: [
      'Landing page principal',
      'Primeira impressão para visitantes',
      'Showcase de serviços e portfolio'
    ],
    responsive: true,
    accessible: true,
    hasStory: false,
    hasTests: false,
    examples: [
      {
        title: 'Página inicial completa',
        code: `// Renderizada automaticamente na rota "/"`,
        description: 'Combina todos os componentes principais'
      }
    ],
    aiNotes: [
      'Ordem dos componentes otimizada para conversão',
      'Usa dados validados dos schemas centralizados',
      'Layout responsivo com grid/flexbox',
      'Lazy loading implementado onde necessário'
    ]
  },

  PacotesPage: {
    name: 'PacotesPage', 
    path: '/src/app/pacotes/page.tsx',
    type: 'page',
    description: 'Página dedicada com foco total nos pacotes disponíveis',
    dependencies: ['PackageCard', 'CalculadoraExtras'],
    requiredProps: [],
    optionalProps: [],
    useCases: [
      'Navegação direta para pacotes',
      'Comparação detalhada entre opções',
      'Página de destino para campanhas'
    ],
    responsive: true,
    accessible: true,
    hasStory: false,
    hasTests: false,
    examples: [
      {
        title: 'Página de pacotes',
        code: `// Renderizada na rota "/pacotes"`,
        description: 'Foco exclusivo em pacotes e calculadora'
      }
    ],
    aiNotes: [
      'Layout otimizado para comparação de pacotes',
      'Calculadora posicionada estrategicamente',
      'Meta description focada em conversão',
      'Breadcrumb navigation implementada'
    ]
  }
};

// ==========================================
// UTILITÁRIOS PARA CONSULTA
// ==========================================

/**
 * Busca metadados de um componente específico
 * @param componentName Nome do componente
 * @returns Metadados do componente ou undefined
 */
export function getComponentMetadata(componentName: string): ComponentMetadata | undefined {
  return COMPONENT_METADATA[componentName];
}

/**
 * Lista todos os componentes de um tipo específico
 * @param type Tipo de componente
 * @returns Array de nomes de componentes
 */
export function getComponentsByType(type: ComponentMetadata['type']): string[] {
  return Object.entries(COMPONENT_METADATA)
    .filter(([, metadata]) => metadata.type === type)
    .map(([name]) => name);
}

/**
 * Lista componentes que dependem de um componente específico
 * @param dependency Nome da dependência
 * @returns Array de nomes de componentes
 */
export function getComponentsByDependency(dependency: string): string[] {
  return Object.entries(COMPONENT_METADATA)
    .filter(([, metadata]) => metadata.dependencies.includes(dependency))
    .map(([name]) => name);
}

/**
 * Lista componentes que ainda precisam de Storybook stories
 * @returns Array de nomes de componentes
 */
export function getComponentsWithoutStories(): string[] {
  return Object.entries(COMPONENT_METADATA)
    .filter(([, metadata]) => !metadata.hasStory && metadata.type === 'ui')
    .map(([name]) => name);
}

/**
 * Lista componentes que ainda precisam de testes
 * @returns Array de nomes de componentes
 */
export function getComponentsWithoutTests(): string[] {
  return Object.entries(COMPONENT_METADATA)
    .filter(([, metadata]) => !metadata.hasTests)
    .map(([name]) => name);
}

/**
 * Gera relatório de cobertura de documentação
 * @returns Estatísticas de documentação
 */
export function getDocumentationCoverage() {
  const total = Object.keys(COMPONENT_METADATA).length;
  const withStories = Object.values(COMPONENT_METADATA).filter(m => m.hasStory).length;
  const withTests = Object.values(COMPONENT_METADATA).filter(m => m.hasTests).length;
  const uiComponents = Object.values(COMPONENT_METADATA).filter(m => m.type === 'ui').length;
  const uiWithStories = Object.values(COMPONENT_METADATA).filter(m => m.type === 'ui' && m.hasStory).length;

  return {
    total,
    withStories,
    withTests,
    uiComponents,
    uiWithStories,
    storyCoverage: uiComponents > 0 ? (uiWithStories / uiComponents * 100).toFixed(1) : '0',
    testCoverage: total > 0 ? (withTests / total * 100).toFixed(1) : '0'
  };
}

// ==========================================
// DADOS PARA DESENVOLVIMENTO
// ==========================================

/**
 * Templates de código para novos componentes
 */
export const COMPONENT_TEMPLATES = {
  uiComponent: `/**
 * {{COMPONENT_NAME}} - {{DESCRIPTION}}
 * 
 * @param props Props validadas pelo {{SCHEMA_NAME}}
 * @returns JSX.Element responsivo e acessível
 */

import { {{SCHEMA_NAME}}, type {{TYPE_NAME}} } from '@/lib/schemas';

export function {{COMPONENT_NAME}}(props: {{TYPE_NAME}}) {
  const validatedProps = {{SCHEMA_NAME}}.parse(props);
  
  return (
    <div className="{{BASE_CLASSES}}">
      {/* Implementação aqui */}
    </div>
  );
}`,

  story: `import type { Meta, StoryObj } from '@storybook/react';
import { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}';
import { createMock{{TYPE_NAME}} } from '@/lib/examples';

const meta = {
  title: 'Components/{{COMPONENT_NAME}}',
  component: {{COMPONENT_NAME}},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof {{COMPONENT_NAME}}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: createMock{{TYPE_NAME}}(),
};`,

  test: `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { {{COMPONENT_NAME}} } from './{{COMPONENT_NAME}}';
import { createMock{{TYPE_NAME}} } from '@/lib/examples';

describe('{{COMPONENT_NAME}}', () => {
  it('should render without errors', () => {
    const props = createMock{{TYPE_NAME}}();
    render(<{{COMPONENT_NAME}} {...props} />);
    
    // Adicionar assertions específicas aqui
    expect(screen.getByRole('{{ROLE}}')).toBeInTheDocument();
  });
});`
};

/**
 * Checklist para novos componentes
 */
export const NEW_COMPONENT_CHECKLIST = [
  '✓ Props tipadas via Zod schema',
  '✓ JSDoc completo com @param e @returns',
  '✓ Mobile-first CSS com Tailwind',
  '✓ Acessibilidade básica (ARIA, semântica)',
  '✓ Validação de props com schema.parse()',
  '✓ Exemplos adicionados ao /lib/examples.ts',
  '✓ Metadados adicionados a este arquivo',
  '✓ Storybook story criada (se componente visual)',
  '✓ Testes unitários (se lógica complexa)',
  '✓ Documentação de casos de uso'
];
