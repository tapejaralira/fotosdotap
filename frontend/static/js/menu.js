// =======================================================
// === MENU RESPONSIVO PARA SPA ===
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (!menuToggle || !menu) return;  // Função para fechar menu com animação reversa
  function closeMenu() {
    // Se menu está ativo, faz animação de fechamento
    if (menu.classList.contains("header__nav--active")) {
      menu.classList.remove("header__nav--active");
      menu.classList.add("header__nav--closing");
      
      // Após animação completa, esconde menu
      setTimeout(() => {
        menu.classList.remove("header__nav--closing");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.classList.remove("header__toggle--active");
      }, 700); // 0.4s delay + 0.3s animation
    }
    console.log('🍔 Menu fechando com cascata reversa');
  }

  // Função para abrir menu
  function openMenu() {
    // Remove classe de fechamento se existir
    menu.classList.remove("header__nav--closing");
    menu.classList.add("header__nav--active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.classList.add("header__toggle--active");
    console.log('🍔 Menu abrindo com cascata');
  }

  // Toggle do menu no botão hamburger
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("header__nav--active");
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  // Detectar cliques em links do menu para fechar automaticamente
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href]');
    
    // Se clicou em um link dentro do menu principal
    if (link && menu.contains(link)) {
      const href = link.getAttribute('href');
      
      // Fecha menu para qualquer link (SPA ou externo)
      // Exceto âncoras (#) que são scroll na mesma página
      if (href && !href.startsWith('#')) {
        console.log('🍔 Fechando menu após clique em:', href);
        closeMenu();
      }
    }
    
    // Se clicou em um link do footer (bottom nav), também fecha menu se aberto
    const footerLink = e.target.closest('.footer__link[href]');
    if (footerLink && menu.classList.contains("header__nav--active")) {
      console.log('📱 Fechando menu após clique no bottom nav');
      closeMenu();
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
  // Fechar menu ao fazer scroll
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    // Throttling para performance
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      // Se menu está aberto e houve scroll
      if (menu.classList.contains("header__nav--active") || menu.classList.contains("header__nav--closing")) {
        console.log('📜 Menu fechado devido ao scroll');
        closeMenu();
      }
      scrollTimeout = null;
    }, 100);
  });
  // Torna função disponível globalmente para SPA usar se necessário
  window.closeMenu = closeMenu;

  // Função para sincronizar estados ativos entre header e footer
  function updateActiveStates(currentPath) {
    // Remove classes ativas do header
    document.querySelectorAll('.header__nav .header__link').forEach(link => {
      link.classList.remove('ativo');
    });
    
    // Remove classes ativas do footer
    document.querySelectorAll('.footer__nav .footer__link').forEach(link => {
      link.classList.remove('ativo');
    });
      // Adiciona classe ativa baseado na URL atual
    const headerActiveLink = document.querySelector(`.header__nav .header__link[href="${currentPath}"]`);
    const footerActiveLink = document.querySelector(`.footer__nav .footer__link[href="${currentPath}"]`);
    
    // Tratamento especial para home page
    if (currentPath === '/') {
      const headerHomeLink = document.querySelector(`.header__nav .header__link[href="/"]`);
      const footerHomeLink = document.querySelector(`.footer__nav .footer__link[href="/"]`);
      if (headerHomeLink) headerHomeLink.classList.add('ativo');
      if (footerHomeLink) footerHomeLink.classList.add('ativo');
    } else {
      if (headerActiveLink) headerActiveLink.classList.add('ativo');
      if (footerActiveLink) footerActiveLink.classList.add('ativo');
    }
  }
  
  // Torna função global para SPA usar
  window.updateActiveStates = updateActiveStates;
    // Inicializa estados ativos na primeira carga
  const currentPath = window.location.pathname;
  updateActiveStates(currentPath);

  // Vibração simples para botões
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
      navigator.vibrate(50);
    }
  });
});

// =======================================================
// === BLOQUEIO DE CLIQUE DIREITO EM IMAGENS ===
// =======================================================
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});