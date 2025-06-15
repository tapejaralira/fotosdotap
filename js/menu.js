// =======================================================
// === MENU RESPONSIVO + ESCONDER HEADER AO ROLAR ===
// =======================================================
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const header = document.querySelector(".header");

    // === [ANIMAÇÃO DE ENTRADA DO HEADER] ===
    header.style.opacity = '0';
    // removi o transform daqui
    header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    setTimeout(() => {
      header.style.opacity = '1';
      // removi o transform daqui também
    }, 100);

    // === [1] Inicializa header como visível ===
    header.classList.add("header--show");

    // === [2] Acessibilidade: define estado inicial do botão ===
    toggle.setAttribute('aria-expanded', 'false');
    let menuAberto = false;

    // === [3] Toggle do menu hamburguer ===
    toggle.addEventListener("click", function () {
        if (menuAberto) {
            menu.classList.remove("header__nav--active");
            // Aguarda o sumiço dos links antes de resetar visibilidade
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
    const delta = 50; // margem mínima para considerar scroll válido

    window.addEventListener("scroll", function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Só reage se o scroll mudou mais que o delta
        if (Math.abs(currentScroll - lastScrollTop) <= delta) {
            return; // scroll pequeno demais, ignora
        }

        if (currentScroll > lastScrollTop && currentScroll > 50) {
            // rolou pra baixo e passou 50px
            header.classList.remove("header--show");
            header.classList.add("header--hide");
        } else {
            // rolou pra cima ou está perto do topo
            header.classList.remove("header--hide");
            header.classList.add("header--show");
        }

        lastScrollTop = currentScroll;
    });
});
