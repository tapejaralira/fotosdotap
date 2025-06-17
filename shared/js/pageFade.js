// =======================================================
// === [2] EFEITO DE APARIÇÃO SUAVE EM ELEMENTOS COM data-fade ===
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll("[data-fade]");

  // === Aplica o efeito de fade com atraso progressivo ===
  elementos.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("apareceu"); // Essa classe deve estar no seu CSS
    }, 200 + i * 150); // Cada elemento aparece depois do anterior
  });
});
