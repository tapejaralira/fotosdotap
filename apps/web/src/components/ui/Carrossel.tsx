/**
 * @file Componente Carrossel para exibição rotativa de imagens.
 * @author Fotos do Tap
 * @see /frontend/static/js/carrossel.js
 * @see /frontend/static/css/components/hero.css
 */

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Carousel as CarouselType } from '@/lib/schemas';

/**
 * Define as propriedades do componente Carrossel.
 * Usa o tipo Carousel inferido automaticamente do schema Zod.
 * 
 * @interface CarrosselProps
 * @property {CarouselType['images']} images - Array de imagens do carrossel
 * @property {number} [interval] - Intervalo entre transições em milissegundos (padrão: 5000)
 * @property {boolean} [autoPlay] - Se o carrossel deve avançar automaticamente (padrão: true)
 * @property {string} [className] - Classes CSS adicionais para customização
 * @property {boolean} [showIndicators] - Se deve mostrar indicadores de navegação (padrão: false)
 */
interface CarrosselProps {
  images: CarouselType['images'];
  interval?: number;
  autoPlay?: boolean;
  className?: string;
  showIndicators?: boolean;
}

/**
 * Componente Carrossel para exibição rotativa de imagens.
 * Implementa transições suaves com fade in/out e suporte a navegação automática.
 * 
 * Características:
 * - Transições suaves com fade entre imagens
 * - Auto-play configurável com intervalo customizável
 * - Indicadores de navegação opcionais
 * - Layout responsivo com aspect ratio 2:3
 * - Otimização de imagens com Next.js Image
 *
 * @component
 * @param {CarrosselProps} props - As propriedades do componente
 * @returns {React.ReactElement} O elemento carrossel renderizado
 * 
 * @example
 * ```tsx
 * const images = [
 *   { src: '/foto1.jpg', alt: 'Foto 1' },
 *   { src: '/foto2.jpg', alt: 'Foto 2' },
 * ];
 * 
 * <Carrossel 
 *   images={images} 
 *   interval={3000}
 *   autoPlay={true}
 *   showIndicators={true}
 * />
 * ```
 */
export const Carrossel: React.FC<CarrosselProps> = ({
  images,
  interval = 3000,
  autoPlay = true,
  className,
  showIndicators = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /**
   * Avança para a próxima imagem no carrossel.
   * @function nextImage
   */
  const nextImage = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    // Reset da transição após a duração do fade
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  /**
   * Vai para uma imagem específica.
   * @function goToImage
   * @param {number} index - O índice da imagem de destino
   */
  const goToImage = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning]);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const intervalId = setInterval(nextImage, interval);
    return () => clearInterval(intervalId);
  }, [nextImage, interval, autoPlay, images.length]);

  // Early return se não há imagens
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      // Container principal
      "relative w-full max-w-2xl mx-auto overflow-hidden",
      
      // Aspect ratio 2:3 como no CSS original
      "aspect-[2/3]",
      
      // Sombra e bordas arredondadas
      "rounded-lg shadow-sombra",
      
      // Espaçamento mobile-first
      "my-6",
      
      // Espaçamento responsivo para telas maiores  
      "md:-mt-8 md:my-8",
      
      className
    )}>
      {/* Container das imagens */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={cn(
              // Posicionamento absoluto para sobreposição
              "absolute top-0 left-0 w-full h-full",
              
              // Transição de opacidade
              "transition-opacity duration-1000 ease-in-out",
              
              // Z-index baseado no estado
              index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0} // Prioridade para a primeira imagem
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* Indicadores de navegação (opcional) */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-white/50",
                index === currentIndex
                  ? "bg-white shadow-lg scale-110"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Overlay gradiente para melhor legibilidade dos indicadores */}
      {showIndicators && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
