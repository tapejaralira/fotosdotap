document.addEventListener("DOMContentLoaded", function () {
  const imagens = document.querySelectorAll(".carrossel__imagem");
  let indexAtual = 0;

  // Mostrar a primeira
  imagens[indexAtual].classList.add("active");

  setInterval(() => {
    const imagemAtual = imagens[indexAtual];
    const proximoIndex = (indexAtual + 1) % imagens.length;
    const proximaImagem = imagens[proximoIndex];

    // A próxima já entra com 'active'
    proximaImagem.classList.add("active");

    // A atual vira 'fade-out', depois some de vez
    imagemAtual.classList.remove("active");
    imagemAtual.classList.add("fade-out");

    // Remove 'fade-out' depois da transição, pra resetar
    setTimeout(() => {
      imagemAtual.classList.remove("fade-out");
    }, 4000); // Mesma duração do transition no CSS

    indexAtual = proximoIndex;
  }, 8000); // Troca a cada 5 segundos
});
