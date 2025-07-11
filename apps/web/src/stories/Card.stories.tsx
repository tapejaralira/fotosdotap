import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from '../components/ui/Card';

/**
 * Meta configuração para o componente Card no Storybook.
 * Define o título, o componente a ser testado e os parâmetros de visualização.
 */
const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente Card é usado para exibir informações de pacotes e serviços de forma organizada.
Ideal para páginas de preços, catálogos de serviços e apresentação de produtos.

**Características:**
- Design responsivo mobile-first
- Imagem otimizada com Next.js Image
- Lista de características com ícones de check
- Divisores opcionais entre seções
- Estilização flexível via props
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'O título do card',
    },
    image: {
      control: 'text',
      description: 'URL da imagem do card (opcional)',
    },
    imageAlt: {
      control: 'text',
      description: 'Texto alternativo da imagem (opcional)',
    },
    description: {
      control: 'text',
      description: 'Descrição do card (opcional)',
    },
    features: {
      control: 'object',
      description: 'Lista de características/funcionalidades (opcional)',
    },
    price: {
      control: 'text',
      description: 'Preço do pacote (opcional)',
    },
    showDivider: {
      control: 'boolean',
      description: 'Se deve mostrar divisores entre seções',
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
 * Card básico apenas com título.
 */
export const Basico: Story = {
  args: {
    title: "Card Básico",
  },
};

/**
 * Card do Pacote Completo - baseado no conteúdo real do site.
 */
export const PacoteCompleto: Story = {
  args: {
    title: "Pacote Completo",
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote1.webp",
    imageAlt: "Pacote Completo",
    description: "A escolha ideal pra quem quer viver a experiência completa e ter um ensaio inesquecível do início ao fim.\nPerfeito para casais apaixonados, profissionais que querem se destacar ou quem sonha com um ensaio editorial com estilo e personalidade.",
    features: [
      "60 fotos escolhidas por você",
      "Até 3 horas de sessão", 
      "Consultoria pré-ensaio",
      "Edição profissional em alta qualidade",
      "Entrega digital em link exclusivo"
    ],
    price: "R$ 500,00",
  },
};

/**
 * Card do Pacote Flexível - baseado no conteúdo real do site.
 */
export const PacoteFlexivel: Story = {
  args: {
    title: "Pacote Flexível",
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote2.webp",
    imageAlt: "Pacote Flexível",
    description: "Aqui o controle é seu.\nVocê faz o ensaio, vê as fotos com calma e só escolhe o que realmente quiser levar.\nPerfeito pra quem busca praticidade, um registro pontual ou quer começar com um investimento menor. Com liberdade total pra adicionar mais fotos depois, pagando só pelo que escolher.",
    features: [
      "Sessão de 1 hora de duração",
      "Você escolhe suas fotos",
      "Paga só pelas fotos que escolher",
      "Edição profissional em alta qualidade",
      "Entrega digital em link exclusivo"
    ],
    price: "R$ 200,00",
  },
};

/**
 * Card informativo sem imagem nem preço.
 */
export const FotosExtras: Story = {
  args: {
    title: "Se quiser mais?",
    description: "Escolha quantas fotos quiser!\nQuanto mais fotos você escolher, mais barato cada uma fica.",
    features: [
      "Primeiras 5 fotos extras: R$ 12,00",
      "Próximas 10 fotos extras: R$ 10,00", 
      "Próximas 15 fotos extras: R$ 8,00",
      "Acima de 30 fotos extras: R$ 6,00",
      "Você monta seu pacote!"
    ],
  },
};

/**
 * Card apenas com título e descrição.
 */
export const SemExtras: Story = {
  args: {
    title: "Serviço Personalizado",
    description: "Entre em contato para criar um pacote totalmente personalizado para suas necessidades específicas.",
  },
};

/**
 * Card com conteúdo customizado via children.
 */
export const ComConteudoCustomizado: Story = {
  args: {
    title: "Calculadora de Preços",
    description: "Use nossa calculadora para estimar o valor do seu pacote personalizado.",
    children: (
      <div className="space-y-4">
        <div>
          <label htmlFor="quantidade" className="block text-sm font-medium mb-2">
            Quantidade de fotos:
          </label>
          <input 
            id="quantidade"
            type="number" 
            min="0" 
            max="100" 
            defaultValue="0"
            className="w-full px-3 py-2 border border-input rounded-md"
          />
        </div>
        <div className="text-center font-bold text-primary">
          Total: R$ 0,00
        </div>
      </div>
    ),
  },
};

/**
 * Card sem divisores entre seções.
 */
export const SemDivisores: Story = {
  args: {
    title: "Card Limpo",
    description: "Este card não tem divisores entre as seções para um visual mais limpo.",
    features: [
      "Primeira característica",
      "Segunda característica", 
      "Terceira característica"
    ],
    price: "R$ 100,00",
    showDivider: false,
  },
};
