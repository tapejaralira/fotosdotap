import { Hero } from "@/components/ui/Hero";
import { Carrossel } from "@/components/ui/Carrossel";
import { HOME_HERO, HOME_CAROUSEL } from "@/lib/schemas";

export default function Home() {
  return (
    <div className="min-h-screen bg-cor-secundaria">
      {/* Hero dentro do container */}
      <div className="container mx-auto px-espacamento">
        <Hero 
          title={HOME_HERO.title}
          subtitle={HOME_HERO.subtitle}
        />
      </div>
      
      {/* Carrossel ocupa toda a largura da tela */}
      <Carrossel 
        images={HOME_CAROUSEL.images}
        interval={HOME_CAROUSEL.autoPlayInterval}
        autoPlay={HOME_CAROUSEL.autoPlay}
        showIndicators={true}
      />
      
      {/* Espaçamento adicional */}
      <div className="h-espacamento-card" />
    </div>
  );
}