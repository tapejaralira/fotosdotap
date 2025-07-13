/**
 * @file Componente Hero para seções principais de destaque.
 * @author Fotos do Tap
 * @see /frontend/www/content/home-content.html
 * @see /frontend/static/css/components/hero.css
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Hero as HeroType } from '@/lib/schemas';

/**
 * Define as propriedades do componente Hero.
 * Usa o tipo Hero inferido automaticamente do schema Zod.
 * 
 * @interface HeroProps
 * @property {string} title - O título principal a ser exibido
 * @property {string} subtitle - O subtítulo descritivo
 * @property {string} [className] - Classes CSS adicionais para customização
 * @property {React.ReactNode} [children] - Conteúdo adicional a ser renderizado após o subtítulo
 */
interface HeroProps extends HeroType {
  children?: React.ReactNode;
}

/**
 * Componente Hero para seções principais de destaque.
 * Apresenta um título principal e subtítulo com design responsivo mobile-first.
 * 
 * Características:
 * - Design responsivo com fontes que escalam conforme o tamanho da tela
 * - Tipografia diferenciada: título com fonte serif, subtítulo com sans-serif
 * - Espaçamento otimizado para diferentes breakpoints
 * - Suporte a conteúdo adicional via children
 *
 * @component
 * @param {HeroProps} props - As propriedades do componente
 * @returns {React.ReactElement} O elemento hero renderizado
 * 
 * @example
 * ```tsx
 * <Hero 
 *   title="Capturando Emoções, Eternizando Memórias!" 
 *   subtitle="Fotografia profissional para eternizar os momentos mais importantes da sua vida."
 * />
 * ```
 */
export const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  className,
  children 
}) => {
  return (
    <section 
      className={cn(
        // Layout base
        "flex items-center justify-center text-center",
        // Espaçamento mobile-first
        "mt-espacamento-pequeno px-espacamento py-espacamento-card",
        // Espaçamento responsivo para telas maiores
        "md:mt-espacamento md:px-espacamento-card md:py-espacamento-div",
        // Altura mínima para destaque
        "min-h-[40vh]",
        className
      )}
    >
      <div className="w-full max-w-largura-maxima">
        {/* Título principal */}
        <h1 className={cn(
          "font-titulo font-bold leading-tight",
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          "text-cor-primaria mb-espacamento",
          "tracking-wide"
        )}>
          {title}
        </h1>
        {/* Subtítulo */}
        <p className={cn(
          "font-principal",
          "text-lg sm:text-xl md:text-2xl",
          "text-cor-texto opacity-90",
          "max-w-3xl mx-auto",
          "leading-relaxed",
          children ? "mb-espacamento-div" : "mb-0"
        )}>
          {subtitle}
        </p>
        {/* Conteúdo adicional (opcional) */}
        {children && (
          <div className="mt-espacamento-div">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};
