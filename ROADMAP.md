# Roadmap de Migração: Fotos do Tap para Next.js & TypeScript

**Objetivo Final:** Transformar o projeto em uma aplicação web moderna, robusta e de fácil manutenção, utilizando Next.js, TypeScript, Tailwind CSS e um ecossistema de ferramentas de ponta, removendo código legado de forma segura.

---

### **Princípios Orientadores da Migração**

- **1. Arquitetura de Componentes Reutilizáveis:** Todo o desenvolvimento será orientado a componentes. Em vez de construir páginas, construiremos uma biblioteca de componentes (`Button`, `Card`, `Input`, `Modal`) que serão usados em toda a aplicação. **Utilizaremos o Storybook para desenvolver, visualizar e testar esses componentes de forma isolada.** Isso reduzirá a duplicação de código e estilos, garantindo consistência e facilitando a manutenção.
- **2. Abordagem Mobile-First:** O design e a implementação de todos os componentes e páginas começarão pela experiência em dispositivos móveis. Os estilos para telas maiores (tablets, desktops) serão adicionos de forma incremental usando as funcionalidades responsivas do Tailwind CSS.

### **Princípios de Máxima Assistência de IA**

_Para garantir que o projeto seja facilmente compreendido e assistido por inteligência artificial, aumentando a velocidade e a precisão do desenvolvimento, adotaremos os seguintes princípios:_

- **3. Fonte Única da Verdade com Zod:** Todas as estruturas de dados (clientes, serviços, etc.) serão definidas **uma única vez** usando schemas Zod. Os tipos TypeScript correspondentes serão inferidos a partir desses schemas, nunca escritos manualmente. Isso cria uma fonte de verdade canônica que é compartilhada entre o frontend e o backend, eliminando ambiguidades.
- **4. Documentação Estruturada com JSDoc:** Todo componente, função e hook customizado será documentado usando o padrão JSDoc (`/** ... */`). Descreveremos o propósito, os parâmetros (`@param`) e o valor de retorno (`@returns`). Isso transforma comentários em metadados processáveis pela IA.
- **5. Nomenclatura Explícita e Consistente:** Seguiremos uma convenção de nomenclatura rigorosa e descritiva para arquivos e pastas, como `components/ui/Button.tsx`, `hooks/use-auth.ts`, `lib/utils.ts`, `app/api/clients/route.ts`. A previsibilidade da estrutura acelera a localização e modificação do código.

---

### **Fase 0: Fundação e Configuração do Novo Projeto (CONCLUÍDA)**

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

1.  **Configurar o Storybook (CONCLUÍDA):**

    - Instalamos e configuramos o Storybook no projeto `apps/web`. Isso nos deu um ambiente de desenvolvimento isolado para criar e testar visualmente nossos componentes React.

2.  **Componentizar o Header e Footer:**

    - Analisaremos seu `header.css` e o HTML correspondente para criar um componente `Header.tsx` reutilizável em React, desenvolvendo-o dentro do Storybook. Faremos o mesmo para o footer.
    - A lógica de esconder o header ao rolar a página será recriada usando hooks do React (`useState`, `useEffect`).

3.  **Migrar a Página Home (`www/index.html`):**

    - Criaremos a rota principal (`/`) no Next.js.
    - O conteúdo de `home-content.html` será convertido em componentes React com JSX e estilizado com Tailwind CSS.
    - Os componentes visuais como os cards e o carrossel serão recriados como componentes React individuais no Storybook antes de serem integrados na página.

4.  **Migrar a Página de Pacotes (`www/pacotes.html`):**

    - Criaremos a rota `/pacotes`.
    - O conteúdo de `pacotes-content.html` será migrado, transformando a seção de pacotes em componentes reutilizáveis, também desenvolvidos no Storybook.

5.  **Remoção Gradual de Arquivos Legados:**
    - Após a migração bem-sucedida de cada página, os arquivos HTML e CSS correspondentes da pasta `frontend/www` e `frontend/static/css` serão removidos para evitar duplicidade.

---

### **Fase 2: Migração do Banco de Dados para Cloudflare D1**

_**Impacto:** Esta é uma mudança estrutural fundamental. Migrar de um armazenamento chave-valor (provavelmente KV) para um banco de dados SQL (D1) é a prática recomendada para dados relacionais como clientes, serviços e contratos. Isso nos dará consistência transacional e a capacidade de realizar consultas complexas, o que é crucial para a área de admin e para futuras funcionalidades._

1.  **Provisionar o Banco de Dados D1:**

    - No dashboard da Cloudflare, criar uma nova instância do D1 para o projeto.

2.  **Definir o Schema SQL:**

    - Criar os arquivos de definição de tabelas (`.sql`). Teremos tabelas como `clientes`, `servicos`, `contratos`, `fotos`, etc., com colunas e relações bem definidas.

3.  **Criar um Script de Migração:**

    - Desenvolver um script (Worker) que irá ler os dados JSON existentes (do bucket ou KV) e inseri-los de forma estruturada nas novas tabelas do D1.

4.  **Refatorar o Backend (`apps/backend`):**
    - Atualizar o código do Cloudflare Worker para que todas as operações de leitura e escrita de dados (CRUD) sejam feitas através de consultas SQL ao banco de dados D1, em vez de acessar arquivos JSON individuais.

---

### **Fase 3: Migração da Lógica do Backend e Área do Cliente**

_Nesta fase, com o banco de dados D1 já implementado, conectaremos o frontend ao backend e recriaremos as funcionalidades dinâmicas de forma segura e eficiente._

1.  **Configurar a Comunicação com a API:**

    - Manteremos as "API Routes" do Next.js como um proxy seguro. A diferença é que agora elas chamarão os endpoints do nosso Worker, que por sua vez executará consultas SQL no D1.
    - Configurar o TanStack Query no frontend para gerenciar o estado do servidor.

2.  **Recriar a Lógica de Autenticação:**

    - A página de login do cliente será recriada com React Hook Form e Zod para validação.
    - A chamada de API para login irá verificar as credenciais do usuário diretamente na tabela `clientes` do banco de dados D1. O estado do usuário logado será gerenciado pelo Zustand.

3.  **Desenvolver a Área do Cliente:**
    - A área do cliente será uma rota protegida.
    - Ao carregar, ela usará o TanStack Query para buscar os dados do cliente, seus contratos e links para fotos, tudo através de consultas SQL eficientes no backend.
    - A implementação do download seguro de arquivos do R2 (com URLs pré-assinadas) permanece a mesma, mas as informações sobre quais fotos pertencem a qual cliente virão do D1.

---

### **Fase 4: Migração da Área Administrativa**

_Com o D1, esta fase se torna muito mais poderosa. As operações de gerenciamento de dados serão robustas e instantaneamente consistentes._

1.  **Recriar a Autenticação do Admin:**

    - Seguir o mesmo padrão da área do cliente, mas verificando as credenciais em uma possível tabela de `administradores` no D1.

2.  **Migrar a Listagem de Clientes (`admin/clientes.html`):**

    - A lista de clientes será uma tabela (`Shadcn/ui Table`) populada por uma única chamada de API que executa um `SELECT * FROM clientes` no D1. Funcionalidades como busca e paginação podem ser implementadas com consultas SQL específicas.

3.  **Migrar o Formulário de Cliente (`admin/cliente.html`):**

    - O formulário de criação/edição de cliente usará React Hook Form.
    - O schema Zod para o formulário será um reflexo direto da estrutura da tabela `clientes` no D1 **e virá da nossa fonte única da verdade em `packages/types`**, garantindo validação de ponta a ponta.
    - Salvar o formulário acionará uma mutação do TanStack Query que enviará os dados para uma API Route, que por sua vez executará um `INSERT` ou `UPDATE` na tabela `clientes` do D1.

4.  **Limpeza Final:**
    - Após a migração completa da área de admin, a pasta `frontend` antiga será removida.

---

### **Fase 5: Deploy e Lançamento**

_O objetivo desta fase é colocar a nova aplicação no ar, configurar o domínio e garantir que tudo funcione perfeitamente em um ambiente de produção._

1.  **Configurar a Plataforma de Hospedagem:**

    - Conectar o repositório do GitHub à Vercel (ou Cloudflare Pages).
    - Garantir que as configurações de produção do Worker estejam corretamente vinculadas ao banco de dados D1 de produção.

2.  **Configurar o Domínio:**

    - Apontar o seu domínio (`fotosdotap.com.br` ou similar) para o novo site hospedado na Vercel.
    - Configurar os redirecionamentos necessários, se houver.

3.  **Testes Finais em Produção:**

    - Realizar um teste completo de todas as funcionalidades no ambiente de produção para garantir que não há problemas relacionados à configuração do servidor.

4.  **Lançamento Oficial:**
    - Anunciar e direcionar todo o tráfego para o novo site.
