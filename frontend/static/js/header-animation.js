/* ========================================================================== 
   HEADER ANIMATION - ENTRADA APENAS NA PRIMEIRA VISITA
   ========================================================================== */

// Sistema de animação do header que só roda na primeira página visitada
(function() {
  'use strict';
  
  const HEADER_ANIMATION_KEY = 'fotosdotap_header_animated';
  const ANIMATION_DELAY = 300; // ms
  
  function initHeaderAnimation() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // Verifica se já fez a animação nesta sessão
    const hasAnimated = sessionStorage.getItem(HEADER_ANIMATION_KEY);
    
    if (!hasAnimated) {
      // Primeira visita - faz animação
      header.classList.add('header--entrando');
      
      // Após um pequeno delay, mostra o header
      setTimeout(() => {
        header.classList.remove('header--entrando');
        header.classList.add('header--show');
        
        // Marca que já foi animado nesta sessão
        sessionStorage.setItem(HEADER_ANIMATION_KEY, 'true');
      }, ANIMATION_DELAY);
      
    } else {
      // Já visitou outras páginas - header aparece direto
      header.classList.add('header--show');
    }
  }
  
  // Inicializa quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderAnimation);
  } else {
    initHeaderAnimation();
  }
  
})();