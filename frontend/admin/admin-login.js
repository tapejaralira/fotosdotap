document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-admin-login');
  const btnLogin = document.getElementById('btn-admin-login');
  const msgErro = document.getElementById('admin-msg-erro');
  function mostrarSpinner(mostrar) {
    const text = btnLogin.querySelector('.btn-text');
    const spinner = btnLogin.querySelector('.spinner');
    if (mostrar) {
      text.classList.add('escondido');
      spinner.classList.remove('escondido');
      btnLogin.disabled = true;
    } else {
      text.classList.remove('escondido');
      spinner.classList.add('escondido');
      btnLogin.disabled = false;
    }
  }
  form.onsubmit = async function(e) {
    e.preventDefault();
    msgErro.classList.add('escondido');
    mostrarSpinner(true);
    const email = document.getElementById('admin-email').value.trim();
    const senha = document.getElementById('admin-senha').value;
    try {
      // Troque a URL para a API absoluta:
      const res = await fetch('https://api.fotosdotap.com.br/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await res.json();
      if (data.sucesso && data.token) {
        localStorage.setItem('admin_token', data.token);
        window.location.href = "clientes.html";
      } else {
        msgErro.textContent = data.erro || 'Login inválido!';
        msgErro.classList.remove('escondido');
      }
    } catch {
      msgErro.textContent = 'Erro de conexão. Tente novamente.';
      msgErro.classList.remove('escondido');
    }
    mostrarSpinner(false);
  };
});