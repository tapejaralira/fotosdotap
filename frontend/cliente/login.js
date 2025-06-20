document.addEventListener('DOMContentLoaded', function() {
  const apiBase = 'https://api.fotosdotap.com.br';
  const form = document.getElementById('form-login');
  const etapaEmail = document.getElementById('etapa-email');
  const etapaSenha = document.getElementById('etapa-senha');
  const etapaCadastrarSenha = document.getElementById('etapa-cadastrar-senha');
  const mensagemErro = document.getElementById('mensagem-erro');
  let emailAtual = '';

  console.log('login.js carregado');

  document.getElementById('btn-verificar-email').onclick = async function () {
    this.blur(); // Remove o foco do botão após o clique
    console.log('Botão Avançar clicado'); // <-- Log para depuração
    mensagemErro.style.display = 'none';
    const email = document.getElementById('email').value.trim();
    // Validação de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mensagemErro.textContent = 'Ops! Parece que esse e-mail não está certinho. Dá uma olhadinha 😉';
      mensagemErro.style.display = 'block';
      return;
    }
    if (!email) return;
    try {
      const res = await fetch(`${apiBase}/login?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.estado === 'nao_encontrado') {
        mensagemErro.textContent = 'Hmm... não encontramos esse e-mail por aqui. Que tal tentar outro?';
        mensagemErro.style.display = 'block';
      } else if (data.estado === 'precisa_informar_senha') {
        emailAtual = email;
        etapaEmail.style.display = 'none';
        etapaSenha.style.display = 'block';
        document.getElementById('login-titulo').textContent = 'Digite sua senha para acessar';
        // Foca no campo de senha
        setTimeout(() => {
          const senhaInput = document.getElementById('senha');
          if (senhaInput) senhaInput.focus();
        }, 100);
      } else if (data.estado === 'precisa_cadastrar_senha') {
        emailAtual = email;
        etapaEmail.style.display = 'none';
        etapaCadastrarSenha.style.display = 'block';
        document.getElementById('login-titulo').textContent = 'Cadastre uma nova senha';
        // Foca no campo de nova senha
        setTimeout(() => {
          const novaSenhaInput = document.getElementById('nova-senha');
          if (novaSenhaInput) novaSenhaInput.focus();
        }, 100);
      } else {
        mensagemErro.textContent = 'Erro inesperado. Tente novamente.';
        mensagemErro.style.display = 'block';
      }
    } catch (e) {
      mensagemErro.textContent = 'Ih, parece que estamos com um probleminha na conexão. Tenta de novo em instantes!';
      mensagemErro.style.display = 'block';
    }
  };

  // Login com senha
  form.onsubmit = async function (e) {
    if (etapaSenha.style.display !== 'block') return;
    e.preventDefault();
    mensagemErro.style.display = 'none';
    const senha = document.getElementById('senha').value;
    try {
      const res = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAtual, senha })
      });
      const data = await res.json();
      if (data.sucesso) {
        salvarCredenciais(emailAtual, senha);
        window.location.href = `/cliente/${encodeURIComponent(emailAtual)}/index.html`;
      } else {
        mensagemErro.textContent = data.erro || 'Senha errada! Não desista, tente de novo 😉';
        mensagemErro.style.display = 'block';
      }
    } catch (e) {
      mensagemErro.textContent = 'Ih, parece que estamos com um probleminha na conexão. Tenta de novo em instantes!';
      mensagemErro.style.display = 'block';
    }
  };

  // Generaliza função de alternar visibilidade de senha para múltiplos campos
  function toggleSenha(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === 'password') {
      input.type = 'text';
      icon.innerHTML = '<path stroke="#888" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#888" stroke-width="2"/><line x1="4" y1="4" x2="20" y2="20" stroke="#888" stroke-width="2"/>';
    } else {
      input.type = 'password';
      icon.innerHTML = '<path stroke="#888" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#888" stroke-width="2"/>';
    }
  }

  if (document.getElementById('toggle-senha')) {
    document.getElementById('toggle-senha').onclick = function () {
      toggleSenha('senha', 'icon-senha');
    };
  }
  if (document.getElementById('toggle-nova-senha')) {
    document.getElementById('toggle-nova-senha').onclick = function () {
      toggleSenha('nova-senha', 'icon-nova-senha');
    };
  }

  // Adiciona autocomplete e acessibilidade
  var emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.setAttribute('autocomplete', 'email');
    emailInput.setAttribute('autofocus', 'true');
    emailInput.focus(); // Garante foco ao carregar
    emailInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btn-verificar-email').click();
      }
    });
  }
  var senhaInput = document.getElementById('senha');
  if (senhaInput) senhaInput.setAttribute('autocomplete', 'current-password');
  var novaSenhaInput = document.getElementById('nova-senha');
  if (novaSenhaInput) novaSenhaInput.setAttribute('autocomplete', 'new-password');

  // Rolagem automática para inputs em dispositivos móveis
  function scrollInputOnFocus(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('focus', function () {
        setTimeout(() => {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      });
    }
  }
  scrollInputOnFocus('email');
  scrollInputOnFocus('senha');
  scrollInputOnFocus('nova-senha');

  // Preencher automaticamente e-mail e senha se houver dados salvos
  if (localStorage.getItem('fotosdotap_email')) {
    document.getElementById('email').value = localStorage.getItem('fotosdotap_email');
  }
  if (localStorage.getItem('fotosdotap_senha') && document.getElementById('senha')) {
    document.getElementById('senha').value = localStorage.getItem('fotosdotap_senha');
  }

  // Alerta sobre segurança ao salvar senha
  function alertaSeguranca() {
    if (!localStorage.getItem('fotosdotap_alerta')) {
      alert('Atenção: Não salve sua senha em computadores públicos. Para maior segurança, use esta opção apenas em dispositivos pessoais.');
      localStorage.setItem('fotosdotap_alerta', '1');
    }
  }

  // Salvamento seguro de e-mail/senha
  function salvarCredenciais(email, senha) {
    alertaSeguranca();
    localStorage.setItem('fotosdotap_email', email);
    localStorage.setItem('fotosdotap_senha', senha);
  }

  // Garante que o conteúdo do login fique visível
  const main = document.querySelector('main[data-fade]');
  if (main) {
    main.classList.add('apareceu');
  }
});
