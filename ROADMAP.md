# Roadmap de Migração: Fotos do Tap para Next.js & TypeScript

**Objetivo Final:** Transformar o projeto em uma aplicação web moderna, robusta e de fácil manutenção, utilizando Next.js, TypeScript, Tailwind CSS e um ecossistema de ferramentas de ponta, removendo código legado de forma segura.

---

### **Fase 0: Fundação e Configuração do Novo Projeto**

_O objetivo desta fase é criar a estrutura do novo projeto, sem tocar no código antigo. Teremos um ambiente limpo e pronto para receber a migração._

1.  **Inicializar o Projeto Next.js:**

    - Dentro da sua pasta `fotosdotap`, criaremos um novo projeto Next.js com TypeScript e Tailwind CSS integrados. O Next.js App Router será a escolha padrão e recomendada.
    - Comando: `npx create-next-app@latest` (e seguiremos as opções para TypeScript, Tailwind, etc.).

2.  **Instalar Dependências Essenciais:**

    - Adicionaremos as bibliotecas que definimos para o nosso stack moderno:
      - `TanStack Query` (para comunicação com a API)
      - `Zustand` (para estado global)
      - `React Hook Form` e `Zod` (para formulários)
      - `Shadcn/ui` (para componentes de UI)

3.  **Configurar o Tema Base no Tailwind:**

    - Migraremos as variáveis de cor, fontes e outras definições do seu CSS (`--cor-primaria`, `--fonte-principal`, etc.) para o arquivo `tailwind.config.ts`. Isso garantirá consistência visual desde o início.

4.  **Criar o Layout Principal (Root Layout):**
    - Configuraremos o arquivo `layout.tsx` principal do Next.js para definir a estrutura base da página (a tag `<html>`, `<body>`, importação de fontes, etc.), que será compartilhada por toda a aplicação.

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
