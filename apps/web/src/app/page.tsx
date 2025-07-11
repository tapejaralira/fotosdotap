import { Hero } from "@/components/ui/Hero";
import { Carrossel } from "@/components/ui/Carrossel";
import { HOME_HERO, HOME_CAROUSEL } from "@/lib/schemas";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Seção Hero com dados validados pelo schema */}
      <Hero 
        title={HOME_HERO.title}
        subtitle={HOME_HERO.subtitle}
      />
      
      {/* Carrossel de fotos com dados validados pelo schema */}
      <section className="container mx-auto px-4">
        <Carrossel 
          images={HOME_CAROUSEL.images}
          interval={HOME_CAROUSEL.autoPlayInterval}
          autoPlay={HOME_CAROUSEL.autoPlay}
          showIndicators={false}
        />
      </section>
      
      {/* Espaçamento adicional */}
      <div className="h-16" />
    </div>
  );
}