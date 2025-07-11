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
        "mt-2 px-4 py-8",
        
        // Espaçamento responsivo para telas maiores
        "md:mt-4 md:px-6 md:py-12",
        
        // Cor de fundo de destaque
        "bg-primary/5",
        
        className
      )}
    >
      <div className="w-full max-w-4xl">
        {/* Título principal */}
        <h1 className={cn(
          // Fonte serif para elegância
          "font-serif font-bold leading-tight",
          
          // Tamanhos responsivos
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          
          // Cor e espaçamento
          "text-primary mb-4",
          
          // Melhor legibilidade
          "tracking-wide"
        )}>
          {title}
        </h1>

        {/* Subtítulo */}
        <p className={cn(
          // Fonte sans-serif para legibilidade
          "font-sans",
          
          // Tamanhos responsivos
          "text-lg sm:text-xl md:text-2xl",
          
          // Cor mais suave e espaçamento
          "text-muted-foreground opacity-90",
          
          // Largura máxima para melhor leitura
          "max-w-3xl mx-auto",
          
          // Altura da linha para melhor legibilidade
          "leading-relaxed",
          
          // Espaçamento inferior condicional
          children ? "mb-8" : "mb-0"
        )}>
          {subtitle}
        </p>

        {/* Conteúdo adicional (opcional) */}
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};
