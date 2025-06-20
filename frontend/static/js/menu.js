// =======================================================
// === MENU RESPONSIVO + ESCONDER HEADER AO ROLAR ===
// =======================================================
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const header = document.querySelector(".header");

    // Animação do header (executa se header existir)
    if (header) {
      header.style.opacity = '0';
      header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => {
        header.style.opacity = '1';
      }, 100);
      header.classList.add("header--show");
    }

    // Só executa a lógica do menu se toggle e menu existirem
    if (toggle && menu && header) {
      // === [2] Acessibilidade: define estado inicial do botão ===
      toggle.setAttribute('aria-expanded', 'false');
      let menuAberto = false;

      // === [3] Toggle do menu hamburguer ===
      toggle.addEventListener("click", function () {
          if (menuAberto) {
              menu.classList.remove("header__nav--active");
              setTimeout(() => {
                  menu.style.opacity = '';
                  menu.style.visibility = '';
                  menu.style.pointerEvents = '';
              }, 500);
          } else {
              menu.style.opacity = '1';
              menu.style.visibility = 'visible';
              menu.style.pointerEvents = 'auto';
              menu.classList.add("header__nav--active");
          }
          toggle.setAttribute('aria-expanded', String(!menuAberto));
          menuAberto = !menuAberto;
      });

      // === [4] Lógica do scroll para esconder o header ===
      let lastScrollTop = 0;
      const delta = 50;
      window.addEventListener("scroll", function () {
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          if (Math.abs(currentScroll - lastScrollTop) <= delta) {
              return;
          }
          if (currentScroll > lastScrollTop && currentScroll > 50) {
              header.classList.remove("header--show");
              header.classList.add("header--hide");
          } else {
              header.classList.remove("header--hide");
              header.classList.add("header--show");
          }
          lastScrollTop = currentScroll;
      });
    }
});

// =======================================================
// === BLOQUEIO DE CLIQUE DIREITO EM IMAGENS ===
// =======================================================
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});