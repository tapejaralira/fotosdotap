/* ========================================================================== 
   PRELOADER JAVASCRIPT - CONTROLA O CARREGAMENTO DA PÁGINA
   ========================================================================== */

// Sistema de pré-carregamento para evitar FOUC (Flash of Unstyled Content)
(function() {
  'use strict';
    // Configurações
  const config = {
    minLoadingTime: 2000,       // ← TESTE: 2 segundos para ver o spinner
    maxLoadingTime: 5000,       // ← TESTE: máximo 5 segundos
    showSpinner: true,          // Mostrar spinner de carregamento
    fadeInDuration: 300         // Duração da animação de entrada (ms)
  };
  
  let startTime = Date.now();
  let cssLoaded = false;
  let domReady = false;
  
  // Adiciona classe para esconder conteúdo inicialmente
  function initPreloader() {
    // Adiciona estilos inline críticos para evitar flash
    const style = document.createElement('style');
    style.textContent = `
      .preload-hidden { 
        opacity: 0 !important; 
        visibility: hidden !important; 
      }
      .loading-overlay { 
        position: fixed !important; 
        top: 0 !important; 
        left: 0 !important; 
        width: 100% !important; 
        height: 100% !important; 
        background: #ffffff !important; 
        display: flex !important; 
        align-items: center !important; 
        justify-content: center !important; 
        z-index: 9999 !important; 
      }
    `;
    document.head.appendChild(style);
    
    // Adiciona classe ao body
    document.documentElement.classList.add('preload-hidden');
    
    if (config.showSpinner) {
      createSpinner();
    }
  }
  
  // Cria spinner de carregamento
  function createSpinner() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loading-overlay';
    
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div class="loading-spinner" style="
          width: 40px;
          height: 40px;
          border: 3px solid #e1e1e1;
          border-top: 3px solid #007cba;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        "></div>
        <div class="loading-text" style="
          margin-top: 1rem;
          color: #666;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.9rem;
        ">Carregando...</div>
      </div>
      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>
    `;
    
    document.body.appendChild(overlay);
  }
  
  // Remove o preloader e mostra o conteúdo
  function showContent() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, config.minLoadingTime - elapsedTime);
    
    setTimeout(() => {
      // Remove classe de loading
      document.documentElement.classList.remove('preload-hidden');
      document.documentElement.classList.add('preload-visible');
      
      // Remove overlay
      const overlay = document.getElementById('loading-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
        }, config.fadeInDuration);
      }
      
      // Dispara evento customizado
      window.dispatchEvent(new CustomEvent('contentLoaded'));
      
    }, remainingTime);
  }
  
  // Verifica se tudo está carregado
  function checkIfReady() {
    if (cssLoaded && domReady) {
      showContent();
    }
  }
  
  // Detecta quando CSS está carregado
  function detectCSSLoaded() {
    // Verifica se variáveis CSS estão disponíveis
    const testElement = document.createElement('div');
    testElement.style.cssText = 'position: absolute; visibility: hidden;';
    document.body.appendChild(testElement);
    
    const computedStyle = getComputedStyle(testElement);
    const hasCSSVariables = computedStyle.getPropertyValue('--cor-primaria') !== '';
    
    document.body.removeChild(testElement);
    
    if (hasCSSVariables) {
      cssLoaded = true;
      checkIfReady();
    } else {
      // Tenta novamente em 50ms
      setTimeout(detectCSSLoaded, 50);
    }
  }
  
  // Timeout de segurança
  setTimeout(() => {
    if (!cssLoaded || !domReady) {
      console.warn('Preloader: Timeout atingido, forçando exibição do conteúdo');
      cssLoaded = true;
      domReady = true;
      checkIfReady();
    }
  }, config.maxLoadingTime);
  
  // Inicialização
  if (document.readyState === 'loading') {
    initPreloader();
    
    document.addEventListener('DOMContentLoaded', () => {
      domReady = true;
      detectCSSLoaded();
    });
  } else {
    // DOM já carregado
    domReady = true;
    detectCSSLoaded();
  }
  
})();