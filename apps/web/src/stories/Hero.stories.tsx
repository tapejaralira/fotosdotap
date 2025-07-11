import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from '../components/ui/Hero';

/**
 * Meta configuração para o componente Hero no Storybook.
 * Define o título, o componente a ser testado e os parâmetros de visualização.
 */
const meta: Meta<typeof Hero> = {
  title: 'UI/Hero',
  component: Hero,
  parameters: {
    // O layout 'fullscreen' é usado para melhor visualização do Hero
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
O componente Hero é usado para seções principais de destaque, como a página inicial.
Apresenta um título principal e subtítulo com design responsivo mobile-first.

**Características:**
- Design responsivo com fontes que escalam conforme o tamanho da tela
- Tipografia diferenciada: título com fonte serif, subtítulo com sans-serif  
- Espaçamento otimizado para diferentes breakpoints
- Suporte a conteúdo adicional via children
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'O título principal a ser exibido',
    },
    subtitle: {
      control: 'text', 
      description: 'O subtítulo descritivo',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais para customização',
    },
    children: {
      control: false,
      description: 'Conteúdo adicional a ser renderizado após o subtítulo',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A estória padrão que renderiza o Hero da página inicial.
 * Usa o conteúdo real do site Fotos do Tap.
 */
export const Default: Story = {
  args: {
    title: "Capturando Emoções, Eternizando Memórias!",
    subtitle: "Fotografia profissional para eternizar os momentos mais importantes da sua vida.",
  },
};

/**
 * Hero com título mais curto para demonstrar flexibilidade.
 */
export const TituloSimples: Story = {
  args: {
    title: "Fotos do Tap",
    subtitle: "Sua fotografia profissional em Manaus.",
  },
};

/**
 * Hero com conteúdo adicional (botões de ação).
 */
export const ComBotoes: Story = {
  args: {
    title: "Capturando Emoções, Eternizando Memórias!",
    subtitle: "Fotografia profissional para eternizar os momentos mais importantes da sua vida.",
    children: (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Ver Pacotes
        </button>
        <button className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors">
          Meu Portfólio
        </button>
      </div>
    ),
  },
};

/**
 * Hero com título muito longo para testar quebras de linha.
 */
export const TituloLongo: Story = {
  args: {
    title: "Capturando Emoções, Eternizando Memórias e Criando Histórias Inesquecíveis Através da Fotografia!",
    subtitle: "Nossa equipe especializada oferece serviços de fotografia profissional para casamentos, eventos corporativos, ensaios familiares e muito mais, sempre com foco na qualidade e na satisfação do cliente.",
  },
};

/**
 * Hero com customização de classe CSS.
 */
export const Customizado: Story = {
  args: {
    title: "Edição Especial",
    subtitle: "Hero com estilo customizado para ocasiões especiais.",
    className: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-t-4 border-purple-500",
  },
};
