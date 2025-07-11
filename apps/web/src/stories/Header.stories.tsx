import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '../components/layout/Header';

/**
 * Meta configuração para o componente Header no Storybook.
 * Define o título, o componente a ser testado e os parâmetros de visualização.
 */
const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    // O layout 'fullscreen' é usado porque o Header é um componente fixo
    // que se posiciona em relação à janela de visualização.
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        {/* O componente Header é renderizado aqui */}
        <Story />
        {/* Adiciona um conteúdo de preenchimento para demonstrar o posicionamento fixo do header */}
        <div className="pt-24 bg-background">
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Conteúdo da Página</h1>
            <p className="mb-4">
              Este é um conteúdo de exemplo para demonstrar como o Header se comporta
              sobre o restante da página. Role a página para ver o efeito.
            </p>
            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bg-muted p-4 rounded-lg">
                  Item de conteúdo de exemplo {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A estória padrão que renderiza o componente Header.
 * Esta é a visualização principal do componente no Storybook.
 */
export const Default: Story = {};
