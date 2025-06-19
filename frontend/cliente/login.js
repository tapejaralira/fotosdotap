const apiBase = '/api'; // ajuste se necessário
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
    } else {
      emailAtual = email;
      etapaEmail.style.display = 'none';
      etapaCadastrarSenha.style.display = 'block';
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

// Cadastro de nova senha
document.getElementById('btn-cadastrar-senha').onclick = async function () {
  mensagemErro.style.display = 'none';
  const novaSenha = document.getElementById('nova-senha').value;
  if (!novaSenha) return;
  try {
    const res = await fetch(`${apiBase}/cadastrarSenha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailAtual, senha: novaSenha })
    });
    const data = await res.json();
    if (data.sucesso) {
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
