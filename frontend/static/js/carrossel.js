// =======================================================
// === CARROSSEL ADAPTADO PARA SPA ===
// =======================================================

// Função principal que pode ser chamada externamente
function initCarrossel() {
  const imagens = document.querySelectorAll(".carrossel__imagem");
  
  if (!imagens || imagens.length === 0) {
    console.log('🎠 Nenhuma imagem de carrossel encontrada');
    return;
  }
  
  console.log('🎠 Inicializando carrossel com', imagens.length, 'imagens');
  
  let indiceAtual = 0;

  function mostrarProximaImagem() {
    // Remove a classe 'active' da imagem atual
    imagens[indiceAtual].classList.remove("active");
    
    // Avança para a próxima imagem (ou volta para a primeira)
    indiceAtual = (indiceAtual + 1) % imagens.length;
    
    // Adiciona a classe 'active' na nova imagem
    imagens[indiceAtual].classList.add("active");
  }

  // Trocar imagem a cada 3 segundos
  setInterval(mostrarProximaImagem, 3000);
  
  console.log('✅ Carrossel configurado com sucesso');
}

// Execução automática se DOM já estiver carregado (compatibilidade)
document.addEventListener("DOMContentLoaded", () => {
  // Só executa se há elementos de carrossel
  if (document.querySelector('.carrossel-fotos')) {
    initCarrossel();
  }
});

// Torna função global para uso do SPA
window.initCarrossel = initCarrossel;
