# Roadmap de Migração: Fotos do Tap para Next.js & TypeScript

**Objetivo Final:** Transformar o projeto em uma aplicação web moderna, robusta e de fácil manutenção, utilizando Next.js, TypeScript, Tailwind CSS e um ecossistema de ferramentas de ponta, removendo código legado de forma segura.

---

### **Princípios Orientadores da Migração**

- **1. Arquitetura de Componentes Reutilizáveis:** Todo o desenvolvimento será orientado a componentes. Em vez de construir páginas, construiremos uma biblioteca de componentes (`Button`, `Card`, `Input`, `Modal`) que serão usados em toda a aplicação. Isso reduzirá a duplicação de código e estilos, garantindo consistência e facilitando a manutenção.
- **2. Abordagem Mobile-First:** O design e a implementação de todos os componentes e páginas começarão pela experiência em dispositivos móveis. Os estilos para telas maiores (tablets, desktops) serão adicionados de forma incremental usando as funcionalidades responsivas do Tailwind CSS.

---

### **Fase 0: Fundação e Configuração do Novo Projeto**

_O objetivo desta fase é criar uma estrutura de projeto limpa (monorepo) e configurar a base da nova aplicação Next.js._

1.  **Reorganizar a Estrutura de Pastas (Monorepo):**

    - Na raiz do projeto (`fotosdotap`), criar uma nova pasta chamada `apps`.
    - Mover a pasta `backend` existente para dentro de `apps`.
    - A pasta `frontend` antiga permanecerá na raiz temporariamente para consulta durante a migração.

2.  **Inicializar o Projeto Next.js:**

    - Dentro da pasta `apps`, executaremos o comando para criar o projeto Next.js em uma subpasta chamada `web`.
    - Comando: `npx create-next-app@latest web` (e seguiremos as opções para TypeScript, Tailwind, etc.).

3.  **Instalar Dependências Essenciais:**

    - Navegaremos para a pasta `apps/web` e adicionaremos as bibliotecas que definimos:
      - `TanStack Query` (para comunicação com a API)
      - `Zustand` (para estado global)
      - `React Hook Form` e `Zod` (para formulários)
      - `Shadcn/ui` (para componentes de UI)

4.  **Configurar o Tema Base no Tailwind:**

    - Migraremos as variáveis de cor, fontes e outras definições do seu CSS antigo para o arquivo `apps/web/tailwind.config.ts`.

5.  **Criar o Layout Principal (Root Layout):**

    - Configuraremos o arquivo `apps/web/src/app/layout.tsx` para definir a estrutura base da página (a tag `<html>`, `<body>`, etc.), que será compartilhada por toda a aplicação.

6.  **Configurar Variáveis de Ambiente:**
    - Criar o arquivo `.env.local` na raiz do projeto `apps/web` para armazenar chaves de API e outras informações sensíveis que não devem ir para o repositório Git.

---

### **Fase 1: Migração Visual e de Conteúdo Estático**

_O foco aqui é recriar a parte "visível" e não interativa do site, garantindo que a aparência seja preservada. Começaremos pelas páginas mais simples._

1.  **Componentizar o Header e Footer:**

    - Analisaremos seu `header.css` e o HTML correspondente para criar um componente `Header.tsx` reutilizável em React. Faremos o mesmo para o footer.
    - A lógica de esconder o header ao rolar a página será recriada usando hooks do React (`useState`, `useEffect`).

2.  **Migrar a Página Home (`www/index.html`):**

    - Criaremos a rota principal (`/`) no Next.js.
    - O conteúdo de `home-content.html` será convertido em componentes React com JSX e estilizado com Tailwind CSS.
    - Os componentes visuais como os cards e o carrossel serão recriados como componentes React individuais.

3.  **Migrar a Página de Pacotes (`www/pacotes.html`):**

    - Criaremos a rota `/pacotes`.
    - O conteúdo de `pacotes-content.html` será migrado, transformando a seção de pacotes em componentes reutilizáveis.

4.  **Remoção Gradual de Arquivos Legados:**
    - Após a migração bem-sucedida de cada página, os arquivos HTML e CSS correspondentes da pasta `frontend/www` e `frontend/static/css` serão removidos para evitar duplicidade.

---

### **Fase 2: Migração da Lógica do Backend e Área do Cliente**

_Nesta fase, conectaremos o frontend ao backend e recriaremos as funcionalidades dinâmicas._

1.  **Configurar a Comunicação com a API:**

    - Criaremos "API Routes" no Next.js que servirão como um proxy seguro para o seu backend no Cloudflare Workers. Isso simplifica a comunicação e esconde a URL do Worker do cliente.
    - Configuraremos o TanStack Query para gerenciar as chamadas a essas rotas.

2.  **Recriar a Lógica de Autenticação:**

    - A página de login do cliente (`frontend/cliente/login.html`) será recriada como uma rota e componente React.
    - A lógica de `login.js` será migrada para usar React Hook Form (para o formulário) e TanStack Query (para a chamada de login), com o estado do usuário sendo salvo globalmente com Zustand.

3.  **Desenvolver a Área do Cliente:**
    - A página principal da área do cliente (`frontend/cliente/index.html`) será transformada em uma rota protegida em Next.js.
    - A lógica para buscar e exibir os dados do cliente (contratos, fotos, etc.) será implementada usando TanStack Query.
    - Implementar o download seguro de arquivos do R2, utilizando a estratégia de URLs pré-assinadas geradas pelo backend.

---

### **Fase 3: Migração da Área Administrativa**

_Esta é a fase mais complexa, pois envolve a manipulação de dados. A robustez do TypeScript e do Zod será crucial aqui._

1.  **Recriar a Autenticação do Admin:**

    - O fluxo de login do admin será migrado, seguindo o mesmo padrão da área do cliente.

2.  **Migrar a Listagem de Clientes (`admin/clientes.html`):**

    - A tabela ou lista de clientes será recriada usando componentes React. A busca de dados será feita com TanStack Query.
    - Usaremos componentes da `Shadcn/ui` (como `Table`) para acelerar o desenvolvimento e garantir um visual moderno.

3.  **Migrar o Formulário de Cliente (`admin/cliente.html`):**

    - Este é o passo mais crítico. O formulário de criação/edição de cliente será recriado com **React Hook Form**.
    - Criaremos um schema com **Zod** para definir a estrutura de dados de um cliente. Isso garantirá validação robusta tanto no frontend quanto, opcionalmente, no backend.
    - A lógica de salvar e atualizar clientes (`cliente.js`) será substituída por mutações do TanStack Query.

4.  **Limpeza Final:**
    - Após a migração completa da área de admin, todas as pastas e arquivos restantes do `frontend` antigo serão removidos. O projeto agora conterá apenas a estrutura do Next.js e a pasta `backend` dos Workers.

---

### **Fase 4: Deploy e Lançamento**

_O objetivo desta fase é colocar a nova aplicação no ar, configurar o domínio e garantir que tudo funcione perfeitamente em um ambiente de produção._

1.  **Configurar a Plataforma de Hospedagem:**

    - Criar uma conta na Vercel (ou Cloudflare Pages).
    - Conectar o repositório do GitHub à plataforma escolhida.

2.  **Configurar o Domínio:**

    - Apontar o seu domínio (`fotosdotap.com.br` ou similar) para o novo site hospedado na Vercel.
    - Configurar os redirecionamentos necessários, se houver.

3.  **Testes Finais em Produção:**

    - Realizar um teste completo de todas as funcionalidades no ambiente de produção para garantir que não há problemas relacionados à configuração do servidor.

4.  **Lançamento Oficial:**
    - Anunciar e direcionar todo o tráfego para o novo site.
