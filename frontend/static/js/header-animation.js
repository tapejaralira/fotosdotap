/* ========================================================================== 
   HEADER ANIMATION - ENTRADA CASCATA RESTAURADA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  
  if (!header) {
    console.warn('⚠️ Header não encontrado');
    return;
  }

  console.log('🎬 Header: Iniciando animação de entrada cascata');

  // Aguardar CSS carregar e executar animação em cascata
  setTimeout(() => {
    // 1. Header container aparece primeiro (vindo de cima)
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
    header.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    console.log('✨ Header: Container apareceu');
    
    // 2. Logo aparece (150ms depois)
    setTimeout(() => {
      const logo = header.querySelector('.header__logo');
      if (logo) {
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
        logo.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        console.log('✨ Header: Logo apareceu');
      }
    }, 150);
    
    // 3. Navigation aparece (300ms depois)
    setTimeout(() => {
      const nav = header.querySelector('.header__nav');
      if (nav) {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
        nav.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        console.log('✨ Header: Navigation apareceu');
      }
    }, 300);
    
    // 4. Toggle aparece (450ms depois)
    setTimeout(() => {
      const toggle = header.querySelector('.header__toggle');
      if (toggle) {
        toggle.style.opacity = '1';
        toggle.style.transform = 'translateY(0)';
        toggle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        console.log('✨ Header: Toggle apareceu');
      }
    }, 450);
    
    // 5. Marcar header como totalmente carregado
    setTimeout(() => {
      header.classList.add("header--loaded");
      console.log('🎯 Header: Animação cascata completa');
    }, 600);
    
  }, 500); // Aguarda CSS e fontes carregarem

  // Scroll hiding behavior - só após primeira animação
  let lastScrollTop = 0;
  let isFirstLoad = true;
  
  window.addEventListener("scroll", () => {
    // Só ativa scroll hiding após primeira animação
    if (isFirstLoad) {
      setTimeout(() => { isFirstLoad = false; }, 1000);
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.classList.remove("header--show");
      header.classList.add("header--hide");
    } else {
      // Scrolling up
      header.classList.remove("header--hide");
      header.classList.add("header--show");
    }
    
    lastScrollTop = scrollTop;
  });
});