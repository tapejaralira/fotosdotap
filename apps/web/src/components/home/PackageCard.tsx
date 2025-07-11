/**
 * @file Componente Card para exibir pacotes de fotos.
 * @author Fotos do Tap
 * @see /frontend/static/css/components/card.css
 * @see /frontend/www/content/pacotes-content.html
 */

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Package } from '@/lib/schemas';

/**
 * Define as propriedades do componente Card.
 * Usa o tipo Package inferido automaticamente do schema Zod.
 * 
 * @interface PackageCardProps
 * @property {Package} package - Dados do pacote validados pelo schema Zod
 * @property {string} [className] - Classes CSS adicionais para customização
 */
interface PackageCardProps {
  package: Package;
  className?: string;
}

/**
 * Componente Card para exibir informações de um pacote de fotos.
 * Apresenta título, imagem, descrição, características e preço do pacote.
 * 
 * Características:
 * - Design responsivo mobile-first
 * - Suporte a pacotes destacados (highlighted)
 * - Layout flexível com imagem, conteúdo e preço
 * - Lista de características bem formatada
 * - Preço formatado em moeda brasileira
 *
 * @component
 * @param {PackageCardProps} props - As propriedades do componente
 * @returns {React.ReactElement} O elemento card renderizado
 * 
 * @example
 * ```tsx
 * import { PACKAGES } from '@/lib/schemas';
 * 
 * <PackageCard package={PACKAGES[0]} />
 * ```
 */
export const PackageCard: React.FC<PackageCardProps> = ({ 
  package: pkg,
  className 
}) => {
  return (
    <article 
      className={cn(
        // Layout base
        "bg-card rounded-card shadow-sombra overflow-hidden",
        "max-w-md w-full mx-auto",
        
        // Espaçamento
        "mb-espacamento-card",
        
        // Efeitos hover
        "transition-all duration-200 hover:shadow-lg",
        
        // Destaque condicional
        pkg.highlighted && [
          "ring-2 ring-primary/20",
          "shadow-lg",
        ],
        
        className
      )}
    >
      {/* Título do pacote */}
      <header className="p-espacamento-card">
        <h2 className={cn(
          "text-xl font-bold text-primary",
          "md:text-2xl",
          // Destaque para pacotes em evidência
          pkg.highlighted && "text-2xl md:text-3xl"
        )}>
          {pkg.title}
        </h2>
      </header>

      {/* Imagem do pacote */}
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={pkg.image}
          alt={`Imagem do ${pkg.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Conteúdo do card */}
      <div className="p-espacamento-card">
        {/* Descrição */}
        <p className="text-muted-foreground leading-relaxed mb-4">
          {pkg.description}
        </p>

        {/* Divisor visual */}
        <div className="border-t border-border my-4" />

        {/* Lista de características */}
        <ul className="space-y-2 mb-4">
          {pkg.features.map((feature, index) => (
            <li 
              key={index}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <span className="text-primary font-bold mt-1 flex-shrink-0">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Divisor visual */}
        <div className="border-t border-border my-4" />

        {/* Preço */}
        <div className="text-center">
          <p className={cn(
            "font-bold text-primary",
            "text-xl md:text-2xl",
            // Destaque para pacotes em evidência
            pkg.highlighted && "text-2xl md:text-3xl"
          )}>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(pkg.price)}
          </p>
        </div>
      </div>
    </article>
  );
};
