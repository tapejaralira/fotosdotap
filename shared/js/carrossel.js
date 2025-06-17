// =======================================================
// === [1] CARROSSEL DE IMAGENS COM CROSSFADE AUTOMÁTICO ===
// =======================================================
document.addEventListener("DOMContentLoaded", function () {
  const imagens = document.querySelectorAll(".carrossel__imagem");
  let indexAtual = 0;

  // Exibe a primeira imagem assim que a página carrega
  imagens[indexAtual].classList.add("active");

  // Inicia o loop automático para trocar as imagens
  setInterval(() => {
    const imagemAtual = imagens[indexAtual];
    const proximoIndex = (indexAtual + 1) % imagens.length;
    const proximaImagem = imagens[proximoIndex];

    // Próxima imagem aparece suavemente
    proximaImagem.classList.add("active");

    // Imagem atual começa a desaparecer
    imagemAtual.classList.remove("active");
    imagemAtual.classList.add("fade-out");

    // Após o tempo da transição, remove a classe de fade
    setTimeout(() => {
      imagemAtual.classList.remove("fade-out");
    }, 4000); // Tempo deve ser igual ao `transition` do CSS

    // Atualiza o índice da imagem atual
    indexAtual = proximoIndex;
  }, 6000); // Troca a cada 6 segundos
});
