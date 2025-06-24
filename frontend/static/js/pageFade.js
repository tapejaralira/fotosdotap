// =======================================================
// === [2] EFEITO DE APARIÇÃO SUAVE EM ELEMENTOS COM data-fade ===
// =======================================================

// Função principal do fade
function initPageFade(container = document) {
  const elementos = container.querySelectorAll("[data-fade]");

  console.log('🎨 pageFade: Encontrados', elementos.length, 'elementos com data-fade');

  // === Aplica o efeito de fade com atraso progressivo ===
  elementos.forEach((el, i) => {
    // Remove classe anterior se existir
    el.classList.remove("apareceu");
    
    // Garante que elemento comece invisível
    el.style.opacity = '0';
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transition = 'opacity 0.6s ease';
      el.classList.add("apareceu"); // Essa classe deve estar no seu CSS
      console.log('✨ pageFade: Elemento', i+1, 'apareceu');
    }, 200 + i * 150); // Cada elemento aparece depois do anterior
  });
}

// Execução inicial para elementos fixos (apenas footer)
document.addEventListener("DOMContentLoaded", () => {
  // Aguarda header fazer sua animação primeiro
  setTimeout(() => {    // Fade do footer que tem data-fade
    const footer = document.querySelector('.footer');
    if (footer && footer.hasAttribute('data-fade')) {
      console.log('🦶 Footer: Executando fade inicial');
      setTimeout(() => {
        footer.style.opacity = '1';
        footer.style.transition = 'opacity 0.6s ease';
        footer.classList.add('apareceu');
        
        // Garantir que links do footer fiquem visíveis no mobile
        const footerLinks = footer.querySelectorAll('.footer__link');
        footerLinks.forEach(link => {
          link.style.opacity = '1';
          link.style.visibility = 'visible';
        });
        
        console.log('✨ Footer: Fade concluído + links visíveis');
      }, 200);
    } else if (footer) {
      // Se footer não tem data-fade, aplica classe show
      footer.classList.add('footer--show');
      footer.style.opacity = '1';
      
      // Garantir que links do footer fiquem visíveis
      const footerLinks = footer.querySelectorAll('.footer__link');
      footerLinks.forEach(link => {
        link.style.opacity = '1';
        link.style.visibility = 'visible';
      });
      
      console.log('🦶 Footer: Mostrado sem fade + links visíveis');
    }
    
    console.log('🎬 pageFade: Footer processado');
  }, 800); // Aguarda header completar animação
});

// Executa na primeira carga
document.addEventListener("DOMContentLoaded", () => {
  initPageFade();
});

// Torna função global para SPA usar
window.initPageFade = initPageFade;
