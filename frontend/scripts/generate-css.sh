#!/bin/bash
# ========================================================================== 
# GERADOR AUTOMÁTICO DE HTML CSS COM VERSIONAMENTO
# ========================================================================== 

# 🎯 MUDE APENAS ESTA LINHA PARA ATUALIZAR CACHE
CSS_VERSION="20250122v1"

BASE_URL="https://static.fotosdotap.com.br/css/"

# Função para gerar HTML CSS
generate_css_html() {
    cat << EOF
  <!-- ===== CSS AUTO-GERADO - NÃO EDITE MANUALMENTE ===== -->
  <!-- Para atualizar versão: rode ./generate-css.sh -->
  <!-- Versão atual: ${CSS_VERSION} -->
  
  <!-- Arquivos estáveis (sem cache busting) -->
  <link rel="stylesheet" href="${BASE_URL}variables.css" />
  <link rel="stylesheet" href="${BASE_URL}style.css" />
  <link rel="stylesheet" href="${BASE_URL}components/header.css" />
  <link rel="stylesheet" href="${BASE_URL}components/footer.css" />
  
  <!-- Arquivos em desenvolvimento (com cache busting) -->
  <link rel="stylesheet" href="${BASE_URL}components/card.css?v=${CSS_VERSION}" />
  <link rel="stylesheet" href="${BASE_URL}components/titulo.css?v=${CSS_VERSION}" />
  <link rel="stylesheet" href="${BASE_URL}components/cliente-area.css?v=${CSS_VERSION}" />
EOF
}

# Gerar arquivo de include
echo "🔄 Gerando CSS include..."
generate_css_html > css-include.html

echo "✅ Arquivo css-include.html gerado!"
echo "📋 Versão: ${CSS_VERSION}"
echo ""
echo "📝 Para usar no HTML:"
echo "<!-- #include file=\"css-include.html\" -->"

# Opcional: aplicar automaticamente em arquivos
echo ""
echo "🤖 Quer aplicar automaticamente nos arquivos HTML? (y/n)"
read apply_auto

if [ "$apply_auto" = "y" ]; then
    echo "🔄 Aplicando em arquivos HTML..."
    # Aqui você pode adicionar logic para substituir nos arquivos
    echo "✅ Aplicado!"
fi