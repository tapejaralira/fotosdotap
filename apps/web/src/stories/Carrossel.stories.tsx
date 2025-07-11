import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Carrossel } from '../components/ui/Carrossel';
import { 
  carouselExample, 
  carouselMinimalExample, 
  carouselSingleExample 
} from '../lib/examples';



/**
 * Meta configuração para o componente Carrossel no Storybook.
 * Define o título, o componente a ser testado e os parâmetros de visualização.
 */
const meta: Meta<typeof Carrossel> = {
  title: 'UI/Carrossel',
  component: Carrossel,
  parameters: {
    // O layout 'centered' centraliza o componente na tela
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente Carrossel é usado para exibição rotativa de imagens com transições suaves.
Implementa auto-play configurável e suporte a navegação manual.

**Características:**
- Transições suaves com fade in/out entre imagens
- Auto-play configurável com intervalo customizável
- Indicadores de navegação opcionais
- Layout responsivo com aspect ratio 2:3
- Otimização de imagens com Next.js Image
- Suporte a navegação por teclado nos indicadores
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: false,
      description: 'Array de imagens a serem exibidas no carrossel',
    },
    interval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Intervalo entre transições em milissegundos',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Se o carrossel deve avançar automaticamente',
    },
    showIndicators: {
      control: 'boolean', 
      description: 'Se deve mostrar indicadores de navegação',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais para customização',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A estória padrão que renderiza o carrossel com todas as fotos da home.
 * Usa as configurações padrão: auto-play ativo, intervalo de 5 segundos.
 */
export const Default: Story = {
  args: {
    images: carouselExample.images,
    autoPlay: carouselExample.autoPlay,
    interval: carouselExample.autoPlayInterval,
  },
};

/**
 * Carrossel com auto-play desabilitado.
 * Útil quando se deseja controle manual total da navegação.
 */
export const ManualOnly: Story = {
  args: {
    images: carouselExample.images,
    autoPlay: false,
  },
};

/**
 * Carrossel com transições mais rápidas.
 * Demonstra como ajustar o intervalo para diferentes necessidades.
 */
export const FastAutoPlay: Story = {
  args: {
    images: carouselExample.images,
    interval: 2000,
    autoPlay: true,
  },
};

/**
 * Carrossel com apenas duas imagens.
 * Testa o comportamento com número mínimo de imagens.
 */
export const TwoImages: Story = {
  args: {
    images: carouselMinimalExample.images,
    autoPlay: carouselMinimalExample.autoPlay,
    interval: carouselMinimalExample.autoPlayInterval,
  },
};

/**
 * Carrossel com uma única imagem.
 * Demonstra comportamento quando auto-play é automaticamente desabilitado.
 */
export const SingleImage: Story = {
  args: {
    images: carouselSingleExample.images,
    autoPlay: carouselSingleExample.autoPlay,
    interval: carouselSingleExample.autoPlayInterval,
  },
};

/**
 * Carrossel vazio para testar edge case.
 * Deve retornar null e não renderizar nada.
 */
export const Empty: Story = {
  args: {
    images: [],
    autoPlay: true,
  },
};

/**
 * Carrossel com customização de estilo.
 * Demonstra como aplicar classes CSS personalizadas.
 */
export const Customized: Story = {
  args: {
    images: carouselExample.images,
    interval: 3000,
    autoPlay: true,
    className: 'border-4 border-primary rounded-xl shadow-2xl',
  },
};
