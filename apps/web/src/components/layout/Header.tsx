/**
 * @file Este arquivo define o componente Header principal da aplicação.
 * @author Seu Nome
 * @see /frontend/static/css/components/header.css
 * @see /frontend/www/pacotes.html
 */

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollDirection, ScrollDirection } from '@/hooks/useScrollDirection';

/**
 * Define as propriedades para um link de navegação.
 * @interface NavLinkProps
 * @property {string} href - A URL para a qual o link aponta.
 * @property {string} label - O texto a ser exibido para o link.
 */
interface NavLinkProps {
  href: string;
  label: string;
}

/**
 * Array de objetos contendo os links de navegação principais.
 * @type {NavLinkProps[]}
 */
const navLinks: NavLinkProps[] = [
  { href: '/', label: 'Início' },
  { href: '/pacotes', label: 'Pacotes' },
  { href: '/#contato', label: 'Contato' },
  { href: '/login', label: 'Área do Cliente' },
];

/**
 * O componente Header principal da aplicação.
 * Renderiza o logo, a navegação principal e o botão de login/área do cliente.
 * A estilização é feita com Tailwind CSS, recriando o visual do CSS legado.
 *
 * @component
 * @returns {React.ReactElement} O elemento header renderizado.
 */
export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const scrollDir = useScrollDirection({
    // Oculta o header apenas após rolar 100px para baixo
    scrollDownThreshold: 100,
    // Mostra o header imediatamente ao rolar para cima
    scrollUpThreshold: 0,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out
        ${scrollDir === ScrollDirection.down ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      <div className="container mx-auto flex h-header items-center justify-between rounded-borda-arredondada px-espacamento shadow-sombra md:px-espacamento-card glass-effect-header">
        {/* Logo à esquerda */}
        <Link href="/" className="flex items-center gap-espacamento-pequeno">
          <Image
            src="/logo.svg"
            alt="Fotos do Tap Logo"
            width={40}
            height={40}
          />
          <span className="hidden text-xl font-bold text-cor-texto sm:inline font-titulo">
            Fotos do Tap
          </span>
        </Link>

        {/* Navegação à direita */}
        <div className="flex items-center gap-espacamento">
          <nav className="hidden items-center gap-espacamento-card md:flex" aria-label="Menu principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-cor-texto transition-colors hover:text-cor-primaria font-principal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Menu mobile à direita */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="absolute top-full right-0 z-40 glass-effect-menu">
            <nav className="px-espacamento py-espacamento" aria-label="Menu mobile">
              <div className="flex flex-col gap-espacamento-pequeno">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-cor-texto transition-colors hover:text-cor-primaria py-espacamento-pequeno px-espacamento rounded-pequeno hover:bg-cor-texto/5 font-principal"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
