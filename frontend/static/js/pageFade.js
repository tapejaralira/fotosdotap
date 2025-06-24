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

// Execução inicial para elementos fixos (footer)
document.addEventListener("DOMContentLoaded", () => {
  // Aguarda um pouco para garantir que CSS carregou
  setTimeout(() => {
    // Fade do footer que tem data-fade
    const footer = document.querySelector('.footer');
    if (footer && footer.hasAttribute('data-fade')) {
      console.log('🦶 Footer: Executando fade inicial');
      footer.style.opacity = '0';
      setTimeout(() => {
        footer.style.opacity = '1';
        footer.style.transition = 'opacity 0.6s ease';
        console.log('✨ Footer: Fade concluído');
      }, 500); // Após header aparecer
    } else if (footer) {
      // Se footer não tem data-fade, só mostra
      footer.style.opacity = '1';
      console.log('🦶 Footer: Mostrado sem fade');
    }
    
    console.log('🎬 pageFade: Inicialização completa para elementos fixos');
  }, 400); // Aguarda header aparecer primeiro
});

// Executa na primeira carga
document.addEventListener("DOMContentLoaded", () => {
  initPageFade();
});

// Torna função global para SPA usar
window.initPageFade = initPageFade;
