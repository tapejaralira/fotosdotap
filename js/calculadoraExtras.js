// calculadoraExtras.js
function calcularPrecoExtras(qtd) {
  let total = 0;
  let detalhes = [];
  let restante = qtd;

  if (restante > 0) {
    const bloco1 = Math.min(restante, 5);
    total += bloco1 * 12;
    detalhes.push(`${bloco1}x R$12`);
    restante -= bloco1;
  }

  if (restante > 0) {
    const bloco2 = Math.min(restante, 10);
    total += bloco2 * 10;
    detalhes.push(`${bloco2}x R$10`);
    restante -= bloco2;
  }

  if (restante > 0) {
    const bloco3 = Math.min(restante, 15);
    total += bloco3 * 8;
    detalhes.push(`${bloco3}x R$8`);
    restante -= bloco3;
  }

  if (restante > 0) {
    total += restante * 6;
    detalhes.push(`${restante}x R$6`);
  }

  return {
    total,
    detalhes
  };
}

function iniciarCalculadoraFotosExtras(inputId, listaId, totalId) {
  const input = document.getElementById(inputId);
  const lista = document.getElementById(listaId);
  const totalEl = document.getElementById(totalId);

  input.addEventListener("input", function () {
    const qtd = parseInt(this.value) || 0;
    const resultado = calcularPrecoExtras(qtd);
    lista.innerHTML = "";

    resultado.detalhes.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${item.split('x')[0]} fotos</span><span class=\"preco\">${item.split('x')[1]}</span>`;
      lista.appendChild(li);
    });

    totalEl.textContent = `Total: R$ ${resultado.total.toFixed(2).replace('.', ',')}`;
  });
}
