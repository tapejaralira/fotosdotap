function renderCard({
  titulo,
  imagem,
  descricao,
  lista,
  divider,
  preco,
  botao
}) {
  return `
    <article class="pacote-card" tabindex="0" aria-label="${titulo || 'Card'}">
      ${titulo ? `<h3 class="pacote-card__titulo">${titulo}</h3>` : ''}
      ${imagem ? `<img src="${imagem}" alt="${titulo || ''}" class="pacote-card__imagem" />` : ''}
      ${descricao ? `<p class="pacote-card__descricao">${descricao}</p>` : ''}
      ${divider ? `<div class="pacote-card__divider"></div>` : ''}
      ${Array.isArray(lista) && lista.length ? `
        <ul class="pacote-card__lista">
          ${lista.map(item => `<li>${item}</li>`).join('')}
        </ul>
      ` : ''}
      ${divider && (preco || botao) ? `<div class="pacote-card__divider"></div>` : ''}
      ${preco ? `<p class="pacote-card__preco">${preco}</p>` : ''}
      ${botao ? `<a href="${botao.href}" class="btn-base">${botao.texto}</a>` : ''}
    </article>
  `;
}