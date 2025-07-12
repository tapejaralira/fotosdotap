# Convenções de Commits Semânticos - Fotos do Tap

## Objetivo

Padronizar mensagens de commit para facilitar análise histórica por IA e melhorar manutenibilidade do projeto.

## Formato Padrão

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

## Tipos de Commit

### `feat` - Novas Funcionalidades

- Novos componentes
- Novas páginas
- Novas funcionalidades de negócio

**Exemplo:**

```
feat(ui): adiciona componente PackageCard com validação Zod
feat(pages): implementa página de pacotes com layout responsivo
feat(calc): adiciona calculadora de fotos extras
```

### `fix` - Correções de Bugs

- Correções de bugs
- Correções de acessibilidade
- Correções de performance

**Exemplo:**

```
fix(hero): corrige responsividade em telas pequenas
fix(schema): corrige validação de preços negativos
fix(a11y): adiciona aria-labels em botões de navegação
```

### `docs` - Documentação

- Atualizações de documentação
- Comentários JSDoc
- README e guias

**Exemplo:**

```
docs(schemas): adiciona exemplos de uso para PackageSchema
docs(components): atualiza JSDoc do componente Hero
docs(readme): adiciona instruções de deploy
```

### `style` - Formatação

- Mudanças de formatação
- Espaçamentos
- Ordem de imports

**Exemplo:**

```
style(components): formata código com prettier
style(schemas): organiza imports em ordem alfabética
```

### `refactor` - Refatoração

- Mudanças de código sem alterar funcionalidade
- Melhorias de arquitetura
- Otimizações

**Exemplo:**

```
refactor(ui): extrai lógica de cálculo para hook customizado
refactor(schemas): simplifica validação de preços
refactor(layout): reorganiza estrutura de componentes
```

### `test` - Testes

- Adição de testes
- Correção de testes
- Configuração de testes

**Exemplo:**

```
test(schemas): adiciona testes para validação de pacotes
test(components): adiciona testes de acessibilidade
test(storybook): configura testes de interação
```

### `chore` - Tarefas de Manutenção

- Dependências
- Configurações
- Build scripts

**Exemplo:**

```
chore(deps): atualiza Next.js para versão 15.3.5
chore(config): adiciona configuração do ESLint
chore(build): otimiza configuração do Vercel
```

## Escopos Específicos do Projeto

### `ui` - Componentes de Interface

- Componentes reutilizáveis
- Elementos visuais
- Interações de usuário

### `layout` - Componentes de Layout

- Header, Footer
- Estrutura de páginas
- Navegação

### `pages` - Páginas da Aplicação

- Páginas específicas
- Rotas
- Layouts de página

### `schemas` - Schemas Zod

- Definições de dados
- Validações
- Tipos TypeScript

### `business` - Lógica de Negócio

- Cálculos
- Regras de negócio
- Dados de domínio

### `a11y` - Acessibilidade

- ARIA labels
- Navegação por teclado
- Contraste de cores

### `perf` - Performance

- Otimizações
- Lazy loading
- Bundle size

### `seo` - SEO

- Meta tags
- Structured data
- Sitemap

## Exemplos Completos

### Commit Simples

```
feat(ui): adiciona componente PackageCard

- Validação completa via PackageSchema
- Design responsivo mobile-first
- Suporte a pacotes destacados
- Integração com Storybook
```

### Commit com Breaking Change

```
feat(schemas)!: refatora estrutura de pacotes

BREAKING CHANGE: Propriedade 'price' agora é obrigatória em todos os pacotes.
Migrations: Atualize todos os dados de pacotes para incluir preço.

- Remove propriedade 'price' opcional
- Adiciona validação de preço positivo
- Atualiza tipos TypeScript automaticamente
```

### Commit com Múltiplos Escopos

```
fix(ui,layout): corrige responsividade em componentes críticos

- Hero: ajusta tamanho de fonte em mobile
- Header: corrige posicionamento em tablets
- Footer: melhora navegação touch
```

## Regras Importantes

### 1. Sempre Use Verbos no Imperativo

- ✅ `feat(ui): adiciona componente`
- ❌ `feat(ui): adicionando componente`

### 2. Seja Específico na Descrição

- ✅ `fix(schema): corrige validação de email`
- ❌ `fix: corrige bug`

### 3. Use Corpo para Explicações Detalhadas

```
feat(calc): implementa calculadora de fotos extras

- Validação via ExtraCalculationInputSchema
- Cálculo automático conforme usuário digita
- Breakdown detalhado por faixa de preço
- Formatação monetária brasileira
- Design responsivo mobile-first
```

### 4. Use Footer para Breaking Changes

```
feat(schemas)!: refatora estrutura de dados

BREAKING CHANGE: Remove propriedade 'legacy' de todos os schemas
Migration: Execute npm run migrate-schemas para atualizar dados existentes
```

## Integração com IA

### Para Análise Histórica

- Commits semânticos permitem IA entender evolução do projeto
- Facilita identificação de padrões e problemas recorrentes
- Melhora sugestões de refatoração

### Para Onboarding

- Novos desenvolvedores entendem contexto rapidamente
- IA pode sugerir melhorias baseadas em histórico
- Facilita debugging e troubleshooting

## Checklist de Commit

Antes de fazer commit, verifique:

- [ ] Tipo de commit apropriado
- [ ] Escopo específico do projeto
- [ ] Descrição clara e concisa
- [ ] Corpo explicativo (se necessário)
- [ ] Breaking change documentado (se aplicável)
- [ ] Testes passando
- [ ] Lint sem erros

## Exemplos de Uso com IA

### Análise de Tendências

```bash
# IA pode analisar padrões de desenvolvimento
git log --oneline | grep "feat(ui)" | wc -l
git log --oneline | grep "fix(schema)" | tail -10
```

### Identificação de Problemas

```bash
# IA pode identificar áreas problemáticas
git log --oneline | grep "fix" | grep -E "(ui|layout)" | wc -l
```

### Sugestões de Melhoria

- Commits frequentes de `fix(schema)` → Revisar validações
- Muitos `refactor(ui)` → Considerar refatoração maior
- `perf` raros → Verificar se performance está sendo monitorada

---

**Nota:** Estas convenções são essenciais para maximizar a assistência de IA no desenvolvimento e manutenção do projeto Fotos do Tap.
