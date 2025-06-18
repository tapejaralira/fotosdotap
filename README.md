# Fotos do Tap – Projeto Fullstack

## Estrutura

```
backend/    # APIs (Cloudflare Worker)
frontend/   # Site estático (HTML, CSS, JS, imagens)
bucket/     # Arquivos do R2 (NÃO versionar)
```

## Deploy

- **Frontend (Cloudflare Pages):**

  - Configure o Pages para usar `frontend/` como diretório de saída.
  - Não precisa de build, só HTML/CSS/JS.

- **Backend (Cloudflare Workers):**

  - Entre em `backend` e rode:
    ```sh
    wrangler deploy
    ```

- **Bucket (R2):**
  - Não versionar. Gerencie pelo painel do Cloudflare.

## Versionamento

- O bucket está no `.gitignore`.
- Versione apenas backend e frontend.
- Para subir alterações:
  ```sh
  git add .
  git commit -m "Mensagem"
  git push
  ```
