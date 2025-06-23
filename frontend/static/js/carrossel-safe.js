// =======================================================
// === CARROSSEL SEGURO - SÓ EXECUTA SE ELEMENTOS EXISTIREM ===
// =======================================================

// Função principal do carrossel
function initCarrossel() {
  // Verificar se elementos existem antes de tentar usar
  const imagens = document.querySelectorAll(".carrossel__imagem");
  
  if (!imagens || imagens.length === 0) {
    console.log('🎠 Carrossel: Nenhuma imagem encontrada, pulando inicialização');
    return;
  }
  
  console.log('🎠 Carrossel: Inicializando com', imagens.length, 'imagens');
  
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
  
  console.log('🎠 Carrossel: Configurado com sucesso');
}

// Execução condicional na primeira carga (se elementos existirem)
document.addEventListener("DOMContentLoaded", () => {
  initCarrossel();
});

// Torna função global para SPA usar
window.initCarrossel = initCarrossel;