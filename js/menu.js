document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    // Define o estado inicial para leitores de tela
    toggle.setAttribute('aria-expanded', 'false');

    let menuAberto = false;

    toggle.addEventListener("click", function () {
        if (menuAberto) {
            // Remove a classe para acionar animação reversa nos links
            menu.classList.remove("header__nav--active");

            // Espera os links "sumirem" em cascata antes de esconder o container
            setTimeout(() => {
                menu.style.opacity = '';
                menu.style.visibility = '';
                menu.style.pointerEvents = '';
            }, 500); // Tem que bater com o tempo da animação mais longa (0.3s)
        } else {
            // Mostra o menu imediatamente (antes dos links aparecerem em cascata)
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.pointerEvents = 'auto';
            menu.classList.add("header__nav--active");
        }

        // Atualiza o atributo aria-expanded
        toggle.setAttribute('aria-expanded', String(!menuAberto));
        menuAberto = !menuAberto;
    });

    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop && currentScroll > 50) {
        // Rolando pra baixo
        header.classList.remove('header--show');
        header.classList.add('header--hide');
      } else {
        // Rolando pra cima
        header.classList.remove('header--hide');
        header.classList.add('header--show');
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

});
