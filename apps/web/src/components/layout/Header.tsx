/**
 * @file Este arquivo define o componente Header principal da aplicação.
 * @author Seu Nome
 * @see /frontend/static/css/components/header.css
 * @see /frontend/www/pacotes.html
 */

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
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
  const scrollDir = useScrollDirection({
    // Oculta o header apenas após rolar 100px para baixo
    scrollDownThreshold: 100,
    // Mostra o header imediatamente ao rolar para cima
    scrollUpThreshold: 0,
  });

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out
        ${scrollDir === ScrollDirection.down ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      <div className="container mx-auto flex h-20 items-center justify-between rounded-b-2xl bg-background/80 px-4 shadow-lg backdrop-blur-sm md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Fotos do Tap Logo"
            width={40}
            height={40}
          />
          <span className="hidden text-xl font-bold text-texto sm:inline">
            Fotos do Tap
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Menu principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-texto/80 transition-colors hover:text-texto"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/login">Área do Cliente</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
