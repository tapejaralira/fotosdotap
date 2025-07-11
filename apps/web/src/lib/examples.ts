/**
 * @file Exemplos centralizados para Props de Componentes
 * @description Este arquivo contém exemplos reutilizáveis de props para 
 * componentes, utilizados no Storybook e em testes. Todos os exemplos 
 * são validados pelos schemas Zod correspondentes.
 * @author Fotos do Tap
 */

import { 
  type Package, 
  type Carousel, 
  type Hero,
  PackageSchema,
  CarouselSchema,
  HeroSchema
} from './schemas';

/**
 * Exemplo de dados para carrossel - validado pelo CarouselSchema.
 * Usado no Storybook e componentes de exemplo.
 */
export const carouselExample: Carousel = CarouselSchema.parse({
  images: [
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto1.webp',
      alt: 'Ensaio fotográfico em Manaus - Foto 1',
      index: 0,
    },
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto2.webp', 
      alt: 'Casamento em Manaus - Foto 2',
      index: 1,
    },
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto3.webp',
      alt: 'Evento especial em Manaus - Foto 3', 
      index: 2,
    },
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto4.webp',
      alt: 'Momentos únicos - Foto 4',
      index: 3,
    },
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto5.webp',
      alt: 'Ensaio de família em Manaus - Foto 5',
      index: 4,
    }
  ],
  autoPlayInterval: 5000,
  autoPlay: true,
});

/**
 * Exemplo de dados para seção Hero - validado pelo HeroSchema.
 * Usado no Storybook e componentes de exemplo.
 */
export const heroExample: Hero = HeroSchema.parse({
  title: 'Capturamos os momentos que ficam pra sempre',
  subtitle: 'Ensaios fotográficos únicos em Manaus que contam sua história com arte, emoção e muito carinho.',
});

/**
 * Exemplos de pacotes para Storybook e testes.
 * Todos validados pelo PackageSchema.
 */
export const packageExamples: Package[] = [
  PackageSchema.parse({
    id: "completo",
    title: "Pacote Completo",
    description: "A escolha ideal pra quem quer viver a experiência completa e ter um ensaio inesquecível do início ao fim.",
    price: 500,
    features: [
      "60 fotos escolhidas por você",
      "Até 3 horas de sessão",
      "Consultoria pré-ensaio",
      "Edição e tratamento profissional",
      "Galeria online exclusiva"
    ],
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote1.webp",
    highlighted: true
  }),
  PackageSchema.parse({
    id: "premium",
    title: "Pacote Premium",
    description: "Ideal para quem quer qualidade profissional com um investimento consciente.",
    price: 350,
    features: [
      "30 fotos escolhidas por você",
      "Até 2 horas de sessão",
      "Edição e tratamento profissional",
      "Galeria online exclusiva"
    ],
    image: "https://static.fotosdotap.com.br/img/pacotes/pacote2.webp",
    highlighted: false
  })
];

/**
 * Exemplo de dados para carrossel com apenas 2 imagens.
 * Útil para testes de cenários mínimos.
 */
export const carouselMinimalExample: Carousel = CarouselSchema.parse({
  images: [
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto1.webp',
      alt: 'Ensaio fotográfico em Manaus - Foto 1',
      index: 0,
    },
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto2.webp', 
      alt: 'Casamento em Manaus - Foto 2',
      index: 1,
    }
  ],
  autoPlayInterval: 3000,
  autoPlay: false,
});

/**
 * Exemplo de dados para carrossel com uma única imagem.
 * Útil para testes de casos extremos.
 */
export const carouselSingleExample: Carousel = CarouselSchema.parse({
  images: [
    {
      src: 'https://static.fotosdotap.com.br/img/home/foto1.webp',
      alt: 'Ensaio fotográfico em Manaus - Foto única',
      index: 0,
    }
  ],
  autoPlayInterval: 5000,
  autoPlay: false,
});
