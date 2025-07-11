/**
 * @file Componente Card para exibir informações de pacotes e serviços.
 * @author Fotos do Tap
 * @see /frontend/static/css/components/card.css
 * @see /frontend/www/content/pacotes-content.html
 */

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Define as propriedades do componente Card.
 * @interface CardProps
 * @property {string} title - O título do card.
 * @property {string} [image] - URL da imagem do card (opcional).
 * @property {string} [imageAlt] - Texto alternativo da imagem (opcional).
 * @property {string} [description] - Descrição do card (opcional).
 * @property {string[]} [features] - Lista de características/funcionalidades (opcional).
 * @property {string} [price] - Preço do pacote (opcional).
 * @property {boolean} [showDivider] - Se deve mostrar divisores entre seções (padrão: true).
 * @property {string} [className] - Classes CSS adicionais para customização.
 * @property {React.ReactNode} [children] - Conteúdo adicional a ser renderizado.
 */
interface CardProps {
  title: string;
  image?: string;
  imageAlt?: string;
  description?: string;
  features?: string[];
  price?: string;
  showDivider?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Componente Card para exibir informações de pacotes e serviços.
 * Apresenta título, imagem, descrição, lista de características e preço de forma organizada.
 * 
 * Características:
 * - Design responsivo mobile-first
 * - Imagem otimizada com Next.js Image
 * - Lista de características com ícones
 * - Divisores opcionais entre seções
 * - Estilização flexível via props
 *
 * @component
 * @param {CardProps} props - As propriedades do componente
 * @returns {React.ReactElement} O elemento card renderizado
 * 
 * @example
 * ```tsx
 * <Card 
 *   title="Pacote Completo"
 *   image="/pacote1.webp"
 *   description="A escolha ideal para quem quer viver a experiência completa."
 *   features={["60 fotos escolhidas", "Até 3 horas de sessão"]}
 *   price="R$ 500,00"
 * />
 * ```
 */
export const Card: React.FC<CardProps> = ({ 
  title,
  image,
  imageAlt,
  description,
  features,
  price,
  showDivider = true,
  className,
  children 
}) => {
  return (
    <article className={cn(
      // Layout base do card
      "bg-background rounded-card shadow-sombra",
      "max-w-[37rem] w-[95%] mx-auto",
      "overflow-hidden",
      
      // Espaçamento
      "mb-espacamento-card",
      
      // Estados interativos
      "transition-shadow duration-rapida",
      "hover:shadow-lg focus-within:shadow-lg",
      
      className
    )}>
      {/* Título do card */}
      <header className="px-espacamento-card pt-espacamento-card">
        <h2 className={cn(
          "text-xl md:text-2xl font-bold",
          "text-primary mb-espacamento-card",
          "leading-tight"
        )}>
          {title}
        </h2>
      </header>

      {/* Imagem do card (se fornecida) */}
      {image && (
        <div className="w-full">
          <Image
            src={image}
            alt={imageAlt || title}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            priority={false}
          />
        </div>
      )}

      {/* Descrição do card */}
      {description && (
        <>
          <div className="px-espacamento-card py-espacamento-card">
            <p className={cn(
              "text-muted-foreground leading-relaxed",
              "whitespace-pre-line" // Preserva quebras de linha do HTML original
            )}>
              {description}
            </p>
          </div>
          {showDivider && features && (
            <hr className="border-border mx-espacamento-card" />
          )}
        </>
      )}

      {/* Lista de características */}
      {features && features.length > 0 && (
        <>
          <div className="px-espacamento-card py-espacamento-card">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className={cn(
                  "flex items-start gap-2",
                  "text-foreground"
                )}>
                  {/* Ícone de check */}
                  <span className="text-primary mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {showDivider && price && (
            <hr className="border-border mx-espacamento-card" />
          )}
        </>
      )}

      {/* Preço do pacote */}
      {price && (
        <div className="px-espacamento-card pb-espacamento-card">
          <div className={cn(
            "text-2xl md:text-3xl font-bold",
            "text-primary text-center",
            "py-4"
          )}>
            {price}
          </div>
        </div>
      )}

      {/* Conteúdo adicional */}
      {children && (
        <div className="px-espacamento-card pb-espacamento-card">
          {children}
        </div>
      )}
    </article>
  );
};
