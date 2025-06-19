const apiBase = 'https://api.fotosdotap.com.br'; // agora usando o subdomínio da API
const form = document.getElementById('form-login');
const etapaEmail = document.getElementById('etapa-email');
const etapaSenha = document.getElementById('etapa-senha');
const etapaCadastrarSenha = document.getElementById('etapa-cadastrar-senha');
const mensagemErro = document.getElementById('mensagem-erro');
let emailAtual = '';

document.getElementById('btn-verificar-email').onclick = async function () {
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
  // Verifica se o e-mail existe e se já tem senha
  try {
    const res = await fetch(`${apiBase}/login?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.estado === 'nao_encontrado') {
      mensagemErro.textContent = 'Hmm... não encontramos esse e-mail por aqui. Que tal tentar outro?';
      mensagemErro.style.display = 'block';
    } else if (data.senhaCadastrada) {
      emailAtual = email;
      etapaEmail.style.display = 'none';
      etapaSenha.style.display = 'block';
      document.getElementById('login-titulo').textContent = 'Digite seu e-mail para acessar';
    } else {
      emailAtual = email;
      etapaEmail.style.display = 'none';
      etapaCadastrarSenha.style.display = 'block';
      document.getElementById('login-titulo').textContent = 'Cadastre uma nova senha';
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

// Aplica a função para todos os campos de senha
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

// Adiciona autocomplete e acessibilidade (sem redeclaração)
(function() {
  var emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.setAttribute('autocomplete', 'email');
    emailInput.setAttribute('autofocus', 'true');
  }
  var senhaInput = document.getElementById('senha');
  if (senhaInput) senhaInput.setAttribute('autocomplete', 'current-password');
  var novaSenhaInput = document.getElementById('nova-senha');
  if (novaSenhaInput) novaSenhaInput.setAttribute('autocomplete', 'new-password');
})();

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

// Cadastro de nova senha
const btnCadastrarSenha = document.getElementById('btn-cadastrar-senha');
if (btnCadastrarSenha) {
  btnCadastrarSenha.onclick = async function () {
    mensagemErro.style.display = 'none';
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    if (!novaSenha || !confirmarSenha) return;
    if (novaSenha !== confirmarSenha) {
      mensagemErro.textContent = 'As senhas não coincidem. Confira e tente novamente.';
      mensagemErro.style.display = 'block';
      return;
    }
    try {
      const res = await fetch(`${apiBase}/cadastrar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAtual, senha: novaSenha })
      });
      const data = await res.json();
      if (data.sucesso) {
        salvarCredenciais(emailAtual, novaSenha);
        window.location.href = `/cliente/${encodeURIComponent(emailAtual)}/index.html`;
      } else {
        mensagemErro.textContent = data.erro || 'Não foi dessa vez... Mas não desanime! Tente cadastrar sua senha novamente.';
        mensagemErro.style.display = 'block';
      }
    } catch (e) {
      mensagemErro.textContent = 'Ih, parece que estamos com um probleminha na conexão. Tenta de novo em instantes!';
      mensagemErro.style.display = 'block';
    }
  };
}

// Rolagem automática para inputs em dispositivos móveis
function scrollInputOnFocus(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.addEventListener('focus', function () {
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300); // tempo para o teclado abrir
    });
  }
}
scrollInputOnFocus('email');
scrollInputOnFocus('senha');
scrollInputOnFocus('nova-senha');
scrollInputOnFocus('confirmar-senha');

// Preencher automaticamente e-mail e senha se houver dados salvos
window.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('fotosdotap_email')) {
    document.getElementById('email').value = localStorage.getItem('fotosdotap_email');
  }
  if (localStorage.getItem('fotosdotap_senha') && document.getElementById('senha')) {
    document.getElementById('senha').value = localStorage.getItem('fotosdotap_senha');
  }
});

// Ao voltar para etapa de e-mail, garantir que só o título principal apareça
document.getElementById('btn-verificar_email').onclick = async function () {
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
  // Verifica se o e-mail existe e se já tem senha
  try {
    const res = await fetch(`${apiBase}/login?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.estado === 'nao_encontrado') {
      mensagemErro.textContent = 'Hmm... não encontramos esse e-mail por aqui. Que tal tentar outro?';
      mensagemErro.style.display = 'block';
    } else if (data.senhaCadastrada) {
      emailAtual = email;
      etapaEmail.style.display = 'none';
      etapaSenha.style.display = 'block';
      document.getElementById('login-titulo').textContent = 'Digite seu e-mail para acessar';
    } else {
      emailAtual = email;
      etapaEmail.style.display = 'none';
      etapaCadastrarSenha.style.display = 'block';
      document.getElementById('login-titulo').textContent = 'Cadastre uma nova senha';
    }
  } catch (e) {
    mensagemErro.textContent = 'Ih, parece que estamos com um probleminha na conexão. Tenta de novo em instantes!';
    mensagemErro.style.display = 'block';
  }
};

// Facilitar navegação com Enter
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const novaSenhaInput = document.getElementById('nova-senha');
const confirmarSenhaInput = document.getElementById('confirmar-senha');

if (emailInput) {
  emailInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('btn-verificar-email').click();
    }
  });
}
if (senhaInput) {
  senhaInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      // O form já faz submit normalmente
    }
  });
}
if (novaSenhaInput) {
  novaSenhaInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (confirmarSenhaInput) confirmarSenhaInput.focus();
    }
  });
}
if (confirmarSenhaInput) {
  confirmarSenhaInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('btn-cadastrar-senha').click();
    }
  });
}
