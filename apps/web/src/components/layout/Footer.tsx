/**
 * @file Define o componente Footer da aplicação.
 * @author Seu Nome
 * @see /frontend/static/css/components/footer.css
 * @see /frontend/www/pacotes.html
 */
import React from 'react';
import Link from 'next/link';

/**
 * Define as propriedades para um link de navegação do footer.
 * @interface FooterLinkProps
 * @property {string} href - A URL para a qual o link aponta.
 * @property {string} label - O texto a ser exibido para o link.
 */
interface FooterLinkProps {
  href: string;
  label: string;
}

/**
 * Array de objetos contendo os links de navegação do footer.
 * @type {FooterLinkProps[]}
 */
const footerLinks: FooterLinkProps[] = [
    { href: '/', label: 'Início' },
    { href: '/pacotes', label: 'Pacotes' },
    { href: '/#portfolio', label: 'Portfólio' },
    { href: '/#contato', label: 'Contato' },
];

/**
 * O componente Footer da aplicação.
 * Em telas pequenas, atua como uma barra de navegação fixa na parte inferior.
 * Em telas maiores, é um rodapé padrão.
 *
 * @component
 * @returns {React.ReactElement} O elemento footer renderizado.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect-footer fixed bottom-espacamento left-espacamento right-espacamento z-50 h-header
      md:relative md:bottom-0 md:left-0 md:right-0
      md:h-auto md:mt-espacamento-div md:pb-espacamento-div">
      <div className="container mx-auto flex h-full flex-col items-center justify-center gap-espacamento">
        {/* Navegação */}
        <nav aria-label="Menu do rodapé">
          <ul className="
            /* --- Estilos Mobile (Padrão) --- */
            flex items-center justify-around w-full gap-espacamento-pequeno
            
            /* --- Estilos Desktop (md:) --- */
            md:gap-espacamento-div
          ">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="
                    text-sm font-medium text-cor-texto hover:text-cor-primaria transition-colors font-principal
                    md:text-base
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright - visível apenas no desktop */}
        <p className="hidden md:block text-xs text-cor-texto/70 font-principal">
          © {currentYear} Fotos do Tap. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
