/* ========================================================================== 
   SPA ROUTER ENXUTO - HEADER FIXO COM NAVEGAÇÃO FLUIDA
   ========================================================================== */

(function() {
  'use strict';
    // Configuração das páginas
  const pages = {
    '/': { 
      content: 'home-content.html',
      title: 'Fotos do Tap. | Fotógrafo Profissional em Manaus',
      description: 'Fotografia profissional em Manaus. Ensaio, eventos, casamentos e momentos especiais com Tapejara Lira.'
    },
    '/pacotes': { 
      content: 'pacotes-content.html',
      title: 'Preços e Pacotes | Fotos do Tap.',
      description: 'Confira os pacotes de fotografia profissional oferecidos por Fotos do Tap. Qualidade e preço justo para eternizar seus momentos.'
    }
  };
  
  // Cache de conteúdos
  const cache = new Map();
  let currentPath = null;
  
  // Função para carregar página
  function loadPage(path, addToHistory = true) {
    const page = pages[path];
    if (!page) return;
    
    // Não recarregar se já está na mesma página
    if (currentPath === path) return;
    
    // Atualizar meta tags
    updateMetaTags(page);
    
  // Carregar conteúdo
    if (cache.has(path)) {
      // Do cache
      showContent(cache.get(path));
      if (addToHistory) {
        history.pushState({ path }, page.title, path);
      }
      currentPath = path;
    } else {
      // Baixar novo
      console.log('🔄 Carregando:', `/content/${page.content}`);
      fetch(`/content/${page.content}`)
        .then(response => {
          console.log('📡 Response status:', response.status);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.text();
        })
        .then(html => {
          console.log('✅ Conteúdo carregado:', html.length, 'caracteres');
          cache.set(path, html);
          showContent(html);
          if (addToHistory) {
            history.pushState({ path }, page.title, path);
          }
          currentPath = path;
        })
        .catch(error => {
          console.error('❌ Erro ao carregar:', error);
          // Fallback: mostrar mensagem de erro
          showContent(`
            <main class="main">
              <div class="page-header page-header--hero">
                <h1 class="page-title">Erro ao carregar página</h1>
                <p class="page-subtitle">Tente recarregar a página (F5)</p>
              </div>
            </main>
          `);
        });
    }
  }
  // Mostrar conteúdo com animação suave
  function showContent(html) {
    const content = document.getElementById('spa-content');
    if (!content) {
      console.error('❌ Elemento #spa-content não encontrado!');
      return;
    }
    
    console.log('🎯 Mostrando conteúdo no elemento:', content);
    
    // Fade out
    content.style.opacity = '0';
    
    setTimeout(() => {
      content.innerHTML = html;
      
      // Aguardar um pouco mais para garantir que DOM está pronto
      setTimeout(() => {
        // Reexecutar scripts da página
        executePageScripts(content);
        
        // Fade in
        content.style.opacity = '1';
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        console.log('✅ Conteúdo exibido com sucesso');
      }, 100);
      
    }, 150);
  }
  
  // Atualizar meta tags
  function updateMetaTags(page) {
    document.title = page.title;
    
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = page.description;
    }
    
    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) ogTitle.content = page.title;
    if (ogDescription) ogDescription.content = page.description;
  }  // Reexecutar scripts específicos da página
  function executePageScripts(container) {
    console.log('🔧 Executando scripts para container:', container);
    
    // Aguarda DOM estar completamente estável
    setTimeout(() => {
      
      // 1. Page fade animations PRIMEIRO (no container carregado)
      if (window.initPageFade) {
        console.log('🎨 Executando pageFade...');
        window.initPageFade(container);
      }
      
      // 2. Carrossel da home (só se tiver carrossel)
      const carrossel = container.querySelector('.carrossel-fotos');
      if (carrossel) {
        console.log('🎠 Carrossel encontrado, inicializando...');
        if (window.initCarrossel) {
          window.initCarrossel();
        } else {
          // Se função não existir, executa código direto
          const imagens = carrossel.querySelectorAll('.carrossel__imagem');
          if (imagens.length > 0) {
            let indiceAtual = 0;
            
            function mostrarProximaImagem() {
              imagens[indiceAtual].classList.remove("active");
              indiceAtual = (indiceAtual + 1) % imagens.length;
              imagens[indiceAtual].classList.add("active");
            }
            
            setInterval(mostrarProximaImagem, 3000);
            console.log('🎠 Carrossel inicializado diretamente');
          }
        }
      }
      
      // 3. Calculadora de pacotes
      if (container.querySelector('#quantidadeFotos')) {
        console.log('🧮 Calculadora encontrada, inicializando...');
        if (window.iniciarCalculadoraFotosExtras) {
          window.iniciarCalculadoraFotosExtras("quantidadeFotos", "detalhesPrecos", "valorTotal");
        }
      }
      
      // 4. Executar scripts inline da página carregada
      const scripts = container.querySelectorAll('script');
      scripts.forEach(script => {
        if (script.textContent) {
          try {
            eval(script.textContent);
          } catch (e) {
            console.warn('Script error:', e);
          }
        }
      });
      
      console.log('✅ Scripts executados com sucesso');
      
    }, 150); // Timeout maior para garantir estabilidade
  }
    // Interceptar cliques em links
  function handleLinkClick(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Só interceptar links internos
    if (href.startsWith('/') && !href.includes('.') && pages[href]) {
      e.preventDefault();
      
      // Fechar menu mobile se estiver aberto
      if (window.closeMenu) {
        window.closeMenu();
      }
      
      console.log('🔗 Navegando via SPA para:', href);
      loadPage(href);
    }
  }
  
  // Navegar com botão voltar/avançar
  function handlePopState(e) {
    const path = e.state?.path || window.location.pathname;
    loadPage(path, false);
  }
    // Inicializar
  function init() {
    console.log('🚀 Inicializando SPA...');
    
    // Verificar se elemento spa-content existe
    const content = document.getElementById('spa-content');
    if (!content) {
      console.error('❌ Elemento #spa-content não encontrado! Verifique o HTML.');
      return;
    }
    
    // Adicionar CSS para transições
    const style = document.createElement('style');
    style.textContent = `
      #spa-content {
        transition: opacity 0.15s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    document.addEventListener('click', handleLinkClick);
    window.addEventListener('popstate', handlePopState);
    
    // Carregar página inicial
    const currentPath = window.location.pathname;
    console.log('📍 URL atual:', currentPath);
    
    // Normalizar path (remover index.html se existir)
    let normalizedPath = currentPath;
    if (currentPath.includes('index.html')) {
      normalizedPath = '/';
    }
    
    console.log('📍 Path normalizado:', normalizedPath);
    
    if (pages[normalizedPath]) {
      loadPage(normalizedPath, false);
    } else {
      console.warn('⚠️ Página não encontrada, carregando home');
      loadPage('/', false);
    }
    
    // Preload página mais importante após 2s
    setTimeout(() => {
      if (normalizedPath === '/') {
        fetch('/content/pacotes-content.html').then(r => r.text()).then(html => {
          cache.set('/pacotes', html);
          console.log('📦 Preload: pacotes-content.html');
        });
      }
    }, 2000);
  }
  
  // Inicializar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();