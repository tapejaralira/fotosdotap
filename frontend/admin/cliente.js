document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-cliente');
  const btnSalvar = document.getElementById('btn-salvar-cliente');
  const btnCancelar = document.getElementById('btn-cancelar');
  const msgErro = document.getElementById('cliente-msg-erro');
  const token = localStorage.getItem('admin_token');
  if (!token) window.location.href = "login.html";

  function mostrarSpinner(mostrar) {
    const text = btnSalvar.querySelector('.btn-text');
    const spinner = btnSalvar.querySelector('.spinner');
    if (mostrar) {
      text.classList.add('escondido');
      spinner.classList.remove('escondido');
      btnSalvar.disabled = true;
    } else {
      text.classList.remove('escondido');
      spinner.classList.add('escondido');
      btnSalvar.disabled = false;
    }
  }

  // Se for edição, carrega dados do cliente
  const params = new URLSearchParams(window.location.search);
  const emailParam = params.get('email');
  if (emailParam) {
    document.getElementById('cliente-titulo').textContent = 'Editar Cliente';
    document.getElementById('cliente-email').disabled = true;
    (async () => {
      mostrarSpinner(true);
      try {
        const res = await fetch(`/admin/cliente?email=${encodeURIComponent(emailParam)}`, {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        if (data.sucesso && data.cliente) {
          document.getElementById('cliente-nome').value = data.cliente.nome || '';
          document.getElementById('cliente-email').value = data.cliente.email || '';
          document.getElementById('cliente-telefone').value = data.cliente.telefone || '';
        } else {
          msgErro.textContent = data.erro || 'Erro ao carregar cliente.';
          msgErro.classList.remove('escondido');
        }
      } catch {
        msgErro.textContent = 'Erro de conexão.';
        msgErro.classList.remove('escondido');
      }
      mostrarSpinner(false);
    })();
  }

  form.onsubmit = async function(e) {
    e.preventDefault();
    msgErro.classList.add('escondido');
    mostrarSpinner(true);
    const nome = document.getElementById('cliente-nome').value.trim();
    const email = document.getElementById('cliente-email').value.trim();
    const telefone = document.getElementById('cliente-telefone').value.trim();
    try {
      const res = await fetch('/admin/cliente', {
        method: emailParam ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ nome, email, telefone })
      });
      const data = await res.json();
      if (data.sucesso) {
        window.location.href = "clientes.html";
      } else {
        msgErro.textContent = data.erro || 'Erro ao salvar cliente.';
        msgErro.classList.remove('escondido');
      }
    } catch {
      msgErro.textContent = 'Erro de conexão.';
      msgErro.classList.remove('escondido');
    }
    mostrarSpinner(false);
  };

  btnCancelar.onclick = function() {
    window.location.href = "clientes.html";
  };
});