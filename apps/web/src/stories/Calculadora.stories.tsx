import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calculadora } from '../components/ui/Calculadora';

/**
 * Meta configuração para o componente Calculadora no Storybook.
 */
const meta: Meta<typeof Calculadora> = {
  title: 'UI/Calculadora',
  component: Calculadora,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente Calculadora permite calcular preços de fotos extras com base
em uma tabela de preços progressivos (quanto mais fotos, menor o preço unitário).

**Características:**
- Cálculo automático em tempo real
- Tabela de preços progressivos
- Detalhamento do cálculo por faixa de preço
- Interface responsiva
- Validação de entrada (0-100 fotos)

**Tabela de Preços:**
- 1-5 fotos: R$ 12,00 cada
- 6-15 fotos: R$ 10,00 cada  
- 16-30 fotos: R$ 8,00 cada
- Acima de 30 fotos: R$ 6,00 cada
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Classes CSS adicionais para customização',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Calculadora padrão sem customizações.
 */
export const Default: Story = {
  args: {},
};

/**
 * Calculadora com classe CSS customizada.
 */
export const Customizada: Story = {
  args: {
    className: "max-w-md border border-border p-4 rounded-lg",
  },
};
