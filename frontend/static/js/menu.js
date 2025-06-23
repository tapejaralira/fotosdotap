// =======================================================
// === MENU RESPONSIVO PARA SPA ===
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (!menuToggle || !menu) return;

  // Função para fechar menu
  function closeMenu() {
    menu.classList.remove("header__nav--open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.classList.remove("header__toggle--active");
    console.log('🍔 Menu fechado');
  }

  // Função para abrir menu
  function openMenu() {
    menu.classList.add("header__nav--open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.classList.add("header__toggle--active");
    console.log('🍔 Menu aberto');
  }

  // Toggle do menu no botão hamburger
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("header__nav--open");
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Detectar cliques em links do menu para fechar automaticamente
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href]');
    
    // Se clicou em um link dentro do menu
    if (link && menu.contains(link)) {
      const href = link.getAttribute('href');
      
      // Fecha menu para qualquer link (SPA ou externo)
      // Exceto âncoras (#) que são scroll na mesma página
      if (href && !href.startsWith('#')) {
        console.log('🍔 Fechando menu após clique em:', href);
        closeMenu();
      }
    }
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Fechar menu ao redimensionar tela (voltar para desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Torna função disponível globalmente para SPA usar se necessário
  window.closeMenu = closeMenu;
});

// =======================================================
// === BLOQUEIO DE CLIQUE DIREITO EM IMAGENS ===
// =======================================================
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});