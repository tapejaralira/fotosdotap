document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    // Define o estado inicial para leitores de tela
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener("click", function () {
        // Alterna a classe que mostra/esconde o menu
        const isExpanded = menu.classList.toggle("header__nav--active");
        
        // Atualiza o atributo aria-expanded com o estado atual (true ou false)
        toggle.setAttribute('aria-expanded', isExpanded);
    });
});