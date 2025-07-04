/* ========================================================================== 
   VERSIONAMENTO CSS GLOBAL - CONTROLE CENTRALIZADO
   ========================================================================== */

// 🎯 DETECÇÃO AUTOMÁTICA DE AMBIENTE
const isLocalDev = window.location.hostname === '127.0.0.1' || 
                   window.location.hostname === 'localhost' ||
                   window.location.port === '3000';

if (isLocalDev) {
  console.log('🔧 Modo desenvolvimento detectado:', window.location.hostname + ':' + window.location.port);
  console.log('📂 CSS será carregado de: ../static/css/');
}

// 🎯 CONTROLE GERAL - MUDE APENAS ESTAS LINHAS
window.CSS_VERSION = 'v5.4';  // Versão do CSS - MUDE AQUI quando atualizar os arquivos
window.DEVELOPMENT_MODE = true;  // false = desliga cache busting em tudo

// Configuração dos arquivos CSS
window.CSS_CONFIG = {
  baseUrl: isLocalDev ? '../static/css/' : 'https://static.fotosdotap.com.br/css/',
    // Arquivos que você quer controlar a versão (true = usa versão)
  files: {
    // Arquivos base
    'variables.css': false,                    // estável - variáveis CSS
    'style.css': false,                        // estável - CSS principal    // Componentes de layout
    'components/header.css': false,            // estável - cabeçalho
    'components/header-animation.css': false,  // estável - animações do header
    'components/scrollbar-responsive.css': false, // estável - scrollbar responsiva
    'components/container.css': false,         // estável - sistema de containers
    'components/footer.css': false,            // estável - rodapé
    'components/button.css': false,            // estável - botões
    'components/titulo.css': false,            // estável - títulos// Componentes que você mexe mais
    'components/card.css': true,               // 🎯 mexe sempre - cards
    'components/cliente-area.css': true,       // 🎯 mexe sempre - área do cliente
    
    // Para adicionar novos arquivos, siga o padrão:
    // 'components/novo-arquivo.css': false,   // ou true se mexer frequentemente
  }
};

// Função para carregar CSS com ou sem versão
function loadCSS(files) {
  const head = document.head;
  
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    
    const useVersion = window.CSS_CONFIG.files[file];
    const url = window.CSS_CONFIG.baseUrl + file;
    
    // 🎯 MODO INTELIGENTE: Se DEVELOPMENT_MODE = false, nunca usa versão
    const shouldUseVersion = window.DEVELOPMENT_MODE && useVersion;
    
    link.href = shouldUseVersion ? `${url}?v=${window.CSS_VERSION}` : url;
    head.appendChild(link);
  });
}