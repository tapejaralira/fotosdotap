document.addEventListener('DOMContentLoaded', function() {
  const lista = document.getElementById('clientes-lista');
  const msgErro = document.getElementById('clientes-msg-erro');
  const btnNovo = document.getElementById('btn-novo-cliente');
  const token = localStorage.getItem('admin_token');
  if (!token) window.location.href = "login.html";

  btnNovo.onclick = () => window.location.href = "cliente.html";

  async function carregarClientes() {
    msgErro.classList.add('escondido');
    lista.innerHTML = '<div style="text-align:center;padding:1rem;"><span class="spinner" aria-label="Carregando..."><svg width="22" height="22" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="#888" stroke-width="5" stroke-linecap="round" stroke-dasharray="31.4 31.4" transform="rotate(-90 25 25)"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/></circle></svg></span></div>';
    try {
      // Troque a URL para a API absoluta:
      const res = await fetch('https://api.fotosdotap.com.br/admin/clientes', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      if (Array.isArray(data.clientes)) {
        if (data.clientes.length === 0) {
          lista.innerHTML = '<p style="text-align:center;">Nenhum cliente cadastrado.</p>';
        } else {
          lista.innerHTML = '<ul style="list-style:none;padding:0;">' +
            data.clientes.map(cli =>
              `<li style="margin-bottom:1rem;">
                <strong>${cli.nome || '(Sem nome)'}</strong><br>
                <span>${cli.email}</span><br>
                <button class="btn btn-editar" data-email="${cli.email}">Editar</button>
                <button class="btn btn-excluir" data-email="${cli.email}">Excluir</button>
              </li>`
            ).join('') +
            '</ul>';
          document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.onclick = () => window.location.href = `cliente.html?email=${encodeURIComponent(btn.dataset.email)}`;
          });
          document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.onclick = async () => {
              if (confirm('Tem certeza que deseja excluir este cliente?')) {
                const res = await fetch('https://api.fotosdotap.com.br/admin/cliente', {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  },
                  body: JSON.stringify({ email: btn.dataset.email })
                });
                const data = await res.json();
                if (data.sucesso) carregarClientes();
                else alert(data.erro || 'Erro ao excluir cliente.');
              }
            };
          });
        }
      } else {
        lista.innerHTML = '';
        msgErro.textContent = data.erro || 'Erro ao carregar clientes.';
        msgErro.classList.remove('escondido');
      }
    } catch {
      lista.innerHTML = '';
      msgErro.textContent = 'Erro de conexão.';
      msgErro.classList.remove('escondido');
    }
  }
  carregarClientes();
});