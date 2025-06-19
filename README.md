# Fotos do Tap – Projeto Fullstack

Bem-vindo ao repositório do Fotos do Tap! Este projeto reúne o site público, a área do cliente, o painel administrativo e as APIs, todos organizados para facilitar manutenção, colaboração e deploy moderno.

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

## 🚀 Deploy

- **Frontend (Cloudflare Pages):**
  - Cada subdiretório (`www`, `cliente`, `admin`, `static`) pode ser um projeto separado no Pages, apontando para o subdomínio correspondente.
  - Os assets são servidos de [static.fotosdotap.com.br](https://static.fotosdotap.com.br).
  - Não precisa de build, apenas HTML/CSS/JS.

- **Backend (Cloudflare Workers):**
  - Entre em `backend` e rode:
    ```sh
    wrangler deploy
    ```
  - As APIs atendem todos os subdomínios.

- **Bucket (R2):**
  - Não versionar. Gerencie pelo painel do Cloudflare.

## 🔄 Versionamento

- O bucket está no `.gitignore`.
- Versione apenas backend e frontend.
- Para subir alterações:
  ```sh
  git add .
  git commit -m "Mensagem"
  git push
  ```

## 💡 Boas Práticas

- Use assets sempre via [static.fotosdotap.com.br](https://static.fotosdotap.com.br) para garantir performance e cache.
- Mantenha os menus e links entre áreas sempre atualizados para os subdomínios corretos.
- Nunca versionar arquivos sensíveis (.env, chaves, bucket).
- Documente endpoints e rotas importantes das APIs.

---

Colabore, sugira melhorias e aproveite o projeto! Qualquer dúvida, abra uma issue ou entre em contato.
