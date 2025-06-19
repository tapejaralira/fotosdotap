# Fotos do Tap – Projeto Fullstack

Bem-vindo ao repositório do Fotos do Tap! 🚀

Aqui você encontra o ecossistema completo que transforma experiências em memórias inesquecíveis, com tecnologia, automação e design de ponta. Este projeto é muito mais do que um site: é uma plataforma moderna, segura e pensada para encantar clientes e facilitar a vida de quem administra!

## ✨ O que você encontra aqui

- **Site público responsivo** com carrossel de fotos, animações, SEO otimizado e carregamento rápido.
- **Área do cliente exclusiva**: login seguro, cadastro de senha, acesso personalizado às fotos, tudo integrado com APIs modernas.
- **Painel administrativo** (em evolução): pronto para facilitar a gestão de clientes, contratos e serviços.
- **APIs em Cloudflare Workers**: rápidas, escaláveis, seguras e integradas ao bucket R2 para armazenamento de arquivos.
- **Deploy automatizado** via Cloudflare Pages para cada subdomínio (www, cliente, admin, static).
- **Assets otimizados** servidos por CDN própria ([static.fotosdotap.com.br](https://static.fotosdotap.com.br)), garantindo performance e cache global.
- **Estrutura de código limpa e modular**: fácil de entender, contribuir e escalar.
- **Boas práticas de versionamento e segurança**: nada sensível é versionado, tudo documentado.

## 📁 Estrutura do Projeto

```
backend/           # APIs (Cloudflare Worker)
frontend/
  ├── www/         # Site público (fotosdotap.com.br)
  ├── cliente/     # Área do cliente (cliente.fotosdotap.com.br)
  ├── admin/       # Área administrativa (admin.fotosdotap.com.br)
  └── static/      # Assets compartilhados (css, js, imagens)
bucket/            # Arquivos do R2 (NÃO versionar)
.gitignore         # Ignora arquivos sensíveis e desnecessários
README.md          # Este arquivo
```

## 🚀 Deploy e Automação

- Deploy contínuo para cada área do site, com build zero e atualização instantânea.
- APIs serverless, sem servidor para manter, com escalabilidade automática.
- Integração total entre frontend, backend e armazenamento.

## 💡 Por que este projeto é diferente?

- Foco total na experiência do usuário: rápido, bonito, intuitivo.
- Segurança em primeiro lugar: dados protegidos, acesso controlado.
- Pronto para crescer: arquitetura modular, fácil de adicionar novas áreas e funcionalidades.
- Documentação clara e incentivo à colaboração.

---

Curtiu? Quer contribuir, usar como referência ou só dar uma olhada? Fique à vontade! Abra uma issue, envie um pull request ou entre em contato. Aqui, tecnologia e criatividade andam juntas para entregar o melhor da fotografia e da web! 📸✨
