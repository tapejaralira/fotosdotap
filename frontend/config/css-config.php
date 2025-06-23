<?php
/* ========================================================================== 
   CONFIG DE VERSÃO CSS - CONTROLE CENTRALIZADO
   ========================================================================== */

// ✨ MUDE APENAS ESTA LINHA PARA FORÇAR CACHE BUSTING GLOBAL
define('CSS_VERSION', '20250122v1');

// URLs base
define('CSS_BASE_URL', 'https://static.fotosdotap.com.br/css/');

// Configuração de arquivos
$css_files = [
    // Arquivos que você mexe frequentemente
    'card' => 'components/card.css?v=' . CSS_VERSION,
    'titulo' => 'components/titulo.css?v=' . CSS_VERSION,
    'cliente_area' => 'components/cliente-area.css?v=' . CSS_VERSION,
    
    // Arquivos estáveis
    'variables' => 'variables.css',
    'style' => 'style.css',
    'header' => 'components/header.css',
    'footer' => 'components/footer.css',
];

// Função para gerar HTML dos links CSS
function get_css_links() {
    global $css_files;
    $html = "";
    
    foreach($css_files as $key => $file) {
        $html .= '<link rel="stylesheet" href="' . CSS_BASE_URL . $file . '" />' . "\n  ";
    }
    
    return $html;
}

// Para usar em HTML: <?php echo get_css_links(); ?>
?>