document.addEventListener('DOMContentLoaded', function() {
  const apiBase = 'https://api.fotosdotap.com.br';
  const form = document.getElementById('form-login');
  const etapaEmail = document.getElementById('etapa-email');
  const etapaSenha = document.getElementById('etapa-senha');
  const etapaCadastrarSenha = document.getElementById('etapa-cadastrar-senha');
  // Atualização: mensagens de erro separadas por etapa
  const mensagemErroEmail = document.getElementById('mensagem-erro-email');
  const mensagemErroSenha = document.getElementById('mensagem-erro-senha');
  const mensagemErroCadastrarSenha = document.getElementById('mensagem-erro-cadastrar-senha');
  let emailAtual = '';

  function mostrarEtapa(etapa) {
    etapaEmail.classList.add('escondido');
    etapaSenha.classList.add('escondido');
    etapaCadastrarSenha.classList.add('escondido');
    if (etapa === 'email') etapaEmail.classList.remove('escondido');
    if (etapa === 'senha') etapaSenha.classList.remove('escondido');
    if (etapa === 'cadastrar-senha') etapaCadastrarSenha.classList.remove('escondido');
  }

  function mostrarErro(msg, etapa) {
    esconderTodosErros();
    if (etapa === 'email' && mensagemErroEmail) {
      mensagemErroEmail.textContent = msg;
      mensagemErroEmail.classList.remove('escondido');
    } else if (etapa === 'senha' && mensagemErroSenha) {
      mensagemErroSenha.textContent = msg;
      mensagemErroSenha.classList.remove('escondido');
    } else if (etapa === 'cadastrar-senha' && mensagemErroCadastrarSenha) {
      mensagemErroCadastrarSenha.textContent = msg;
      mensagemErroCadastrarSenha.classList.remove('escondido');
    }
  }
  function esconderTodosErros() {
    if (mensagemErroEmail) mensagemErroEmail.classList.add('escondido');
    if (mensagemErroSenha) mensagemErroSenha.classList.add('escondido');
    if (mensagemErroCadastrarSenha) mensagemErroCadastrarSenha.classList.add('escondido');
  }

  document.getElementById('btn-verificar-email').onclick = async function () {
    this.blur();
    esconderTodosErros();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarErro('Ops! Parece que esse e-mail não está certinho. Dá uma olhadinha 😉', 'email');
      return;
    }
    if (!email) return;
    try {
      const res = await fetch(`${apiBase}/login?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.estado === 'nao_encontrado') {
        mostrarErro('Hmm... não encontramos esse e-mail por aqui. Que tal tentar outro?', 'email');
      } else if (data.estado === 'precisa_informar_senha') {
        emailAtual = email;
        mostrarEtapa('senha');
        document.getElementById('login-titulo').textContent = 'Digite sua senha';
        document.getElementById('senha').required = true;
        document.getElementById('nova-senha').required = false;
        setTimeout(() => document.getElementById('senha').focus(), 200);
      } else if (data.estado === 'precisa_cadastrar_senha') {
        emailAtual = email;
        mostrarEtapa('cadastrar-senha');
        document.getElementById('login-titulo').textContent = 'Cadastre uma nova senha';
        document.getElementById('senha').required = false;
        document.getElementById('nova-senha').required = true;
        setTimeout(() => document.getElementById('nova-senha').focus(), 200);
      } else {
        mostrarErro('Erro inesperado. Tente novamente.', 'email');
      }
    } catch (e) {
      mostrarErro('Ih, parece que estamos com um probleminha na conexão. Tenta de novo em instantes!', 'email');
    }
  };

  // Login com senha
  form.onsubmit = async function (e) {
    if (!etapaSenha.classList.contains('escondido')) {
      e.preventDefault();
      esconderTodosErros();
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
          // Buscar o ID do cliente e salvar no localStorage
          const resCliente = await fetch(`${apiBase}/api/cliente?email=${encodeURIComponent(emailAtual)}`);
          const dataCliente = await resCliente.json();
          if (dataCliente.id) {
            localStorage.setItem('fotosdotap_id_cliente', dataCliente.id);
          }
          window.location.href = "index.html";
        } else {
          mostrarErro(data.erro || 'Senha errada! Não desista, tente de novo 😉', 'senha');
        }
      } catch (e) {
        mostrarErro('Ih, parece que estamos com um probleminha na conexão. Tenta de novo em instantes!', 'senha');
      }
    }
    // Cadastro de nova senha
    if (!etapaCadastrarSenha.classList.contains('escondido')) {
      e.preventDefault();
      esconderTodosErros();
      const novaSenha = document.getElementById('nova-senha').value;
      try {
        const res = await fetch(`${apiBase}/cadastrar-senha`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailAtual, senha: novaSenha })
        });
        const data = await res.json();
        if (data.sucesso) {
          salvarCredenciais(emailAtual, novaSenha);
          // Buscar o ID do cliente e salvar no localStorage
          const resCliente = await fetch(`${apiBase}/api/cliente?email=${encodeURIComponent(emailAtual)}`);
          const dataCliente = await resCliente.json();
          if (dataCliente.id) {
            localStorage.setItem('fotosdotap_id_cliente', dataCliente.id);
          }
          window.location.href = "index.html";
        } else {
          mostrarErro(data.erro || 'Erro ao cadastrar senha. Tente novamente.', 'cadastrar-senha');
        }
      } catch (e) {
        mostrarErro('Ih, parece que estamos com um probleminha na conexão. Tenta de novo em instantes!', 'cadastrar-senha');
      }
    }
  };

  // Alternância de visibilidade de senha
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

  // Acessibilidade e UX
  var emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.setAttribute('autocomplete', 'email');
    emailInput.setAttribute('autofocus', 'true');
    emailInput.focus();
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

  // Salvamento seguro de e-mail/senha
  function salvarCredenciais(email, senha) {
    localStorage.setItem('fotosdotap_email', email);
    localStorage.setItem('fotosdotap_senha', senha);
  }

  // Garante que o conteúdo do login fique visível
  const main = document.querySelector('main[data-fade]');
  if (main) {
    main.classList.add('apareceu');
  }
});
