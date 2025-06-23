// =======================================================
// === [2] EFEITO DE APARIÇÃO SUAVE EM ELEMENTOS COM data-fade ===
// =======================================================

// Função principal do fade
function initPageFade(container = document) {
  const elementos = container.querySelectorAll("[data-fade]");

  // === Aplica o efeito de fade com atraso progressivo ===
  elementos.forEach((el, i) => {
    // Remove classe anterior se existir
    el.classList.remove("apareceu");
    
    setTimeout(() => {
      el.classList.add("apareceu"); // Essa classe deve estar no seu CSS
    }, 200 + i * 150); // Cada elemento aparece depois do anterior
  });
}

// Executa na primeira carga
document.addEventListener("DOMContentLoaded", () => {
  initPageFade();
});

// Torna função global para SPA usar
window.initPageFade = initPageFade;
