/**
 * @file Página de Pacotes de Fotos - Route /pacotes
 * @description Esta página exibe todos os pacotes disponíveis para os clientes.
 * Utiliza componentes reutilizáveis e dados validados pelos schemas Zod.
 * @author Fotos do Tap
 */

import React from 'react';
import { Hero } from '@/components/ui/Hero';
import { PackageCard } from '@/components/home/PackageCard';
import { PACKAGES } from '@/lib/schemas';

/**
 * Dados específicos para a página de pacotes.
 * Validados pelo HeroSchema para garantir consistência.
 */
const packagesHeroData = {
  title: 'Escolha seu pacote ideal',
  subtitle: 'Temos opções perfeitas para cada momento especial da sua vida. Todos os pacotes incluem edição profissional e galeria online exclusiva.',
};

/**
 * Página de Pacotes de Fotos.
 * 
 * Esta página apresenta todos os pacotes disponíveis de forma organizada,
 * permitindo que os clientes comparem opções e escolham o que melhor se
 * adequa às suas necessidades.
 * 
 * @returns {JSX.Element} Componente da página de pacotes
 */
export default function PacotesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Seção Hero */}
      <Hero 
        title={packagesHeroData.title}
        subtitle={packagesHeroData.subtitle}
        className="bg-gradient-to-b from-primary/10 to-background"
      />
      
      {/* Seção de Pacotes */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((packageData) => (
              <PackageCard
                key={packageData.id}
                package={packageData}
              />
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Entre em contato conosco para uma consultoria personalizada. 
              Vamos criar juntos o ensaio dos seus sonhos!
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Falar Conosco
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Metadados da página para SEO.
 * Otimizado para mecanismos de busca e redes sociais.
 */
export const metadata = {
  title: 'Pacotes de Fotos - Fotos do Tap | Ensaios Fotográficos em Manaus',
  description: 'Conheça nossos pacotes de ensaios fotográficos em Manaus. Opções para todos os gostos e orçamentos, com qualidade profissional garantida.',
  keywords: 'pacotes fotografia, ensaio fotográfico Manaus, preços fotografia, fotógrafo Manaus',
  openGraph: {
    title: 'Pacotes de Fotos - Fotos do Tap',
    description: 'Conheça nossos pacotes de ensaios fotográficos em Manaus.',
    type: 'website',
    locale: 'pt_BR',
  },
};
