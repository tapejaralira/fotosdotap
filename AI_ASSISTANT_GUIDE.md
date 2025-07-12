# 🤖 Guia do Assistente de IA - Fotos do Tap

## 📋 Visão Geral do Projeto

**Domínio:** Fotografia de eventos (casamentos, aniversários, formaturas)  
**Arquitetura:** Monorepo Next.js + TypeScript + Tailwind + Storybook  
**Estado Atual:** Migração da V1 (frontend legado) para V2 (Next.js moderno)  
**Localização:** `c:\Meu Drive\FotosdoTap\site\fotosdotap`  
**Fotógrafo:** Tapajara Lira (Manaus, Amazonas, Brasil)  
**Domínio:** fotosdotap.com.br

---

## 🧠 Estratégias Avançadas para Assistência de IA

### 1. **Contexto Rápido de Onboarding**

**Use este template para iniciar conversas com IA:**

```
Contexto: Projeto "Fotos do Tap" - estúdio de fotografia
Arquitetura: Monorepo Next.js/TypeScript/Tailwind/Storybook
Localização: c:\Meu Drive\FotosdoTap\site\fotosdotap
Estado: Migração em andamento (V1 legado → V2 moderno)
Objetivo: [descreva sua tarefa específica]
```

### 2. **Mapeamento de Arquivos Críticos**

**Sempre mencione estes arquivos ao pedir ajuda:**

```
Core Schema: /apps/web/src/lib/schemas.ts (FONTE DA VERDADE)
Layout: /apps/web/src/app/layout.tsx
Config: /apps/web/tailwind.config.ts
Roadmap: /ROADMAP.md (estado e prioridades)
Context: /apps/web/src/lib/project-context.ts (informações completas)
Business: /apps/web/src/lib/business-dictionary.ts (glossário do domínio)
Examples: /apps/web/src/lib/examples.ts (dados de exemplo)
Metadata: /apps/web/src/lib/component-metadata.ts (metadados de componentes)
Performance: /apps/web/src/lib/performance-monitoring.ts (métricas)
Alerts: /apps/web/src/lib/ai-assistance-alerts.ts (verificações automáticas)
```

### 3. **Padrões de Request Eficientes**

**✅ Bom:**

```
"Implementar componente Testimonials seguindo padrão Hero.tsx, com schema Zod em schemas.ts e story no Storybook"
```

**❌ Evitar:**

```
"Fazer um componente de depoimentos"
```

### 4. **Terminologia Padronizada**

| Termo              | Significado                     | Exemplo                            |
| ------------------ | ------------------------------- | ---------------------------------- |
| **Pacote**         | Serviço fotográfico completo    | Casamento Gold, Aniversário Silver |
| **Fotos Extras**   | Fotos além do pacote contratado | +50 fotos por R$ 150               |
| **Evento**         | Ocasião fotografada             | Casamento, formatura, aniversário  |
| **Cliente**        | Pessoa que contrata o serviço   | Noiva, aniversariante, formando    |
| **Portfolio**      | Galeria de trabalhos realizados | Seção "Nossos Trabalhos"           |
| **Cobertura**      | Duração do serviço em horas     | 8h de cobertura completa           |
| **Pós-produção**   | Edição e tratamento das fotos   | Seleção + tratamento + entrega     |
| **Galeria Online** | Acesso digital às fotos         | Portal protegido por senha         |
| **Sinal**          | Pagamento antecipado            | 50% para confirmar agendamento     |

---

## 📁 Estrutura de Desenvolvimento

### **Fluxo de Criação de Componentes**

1. **Schema First:** Definir dados em `schemas.ts`
2. **Componente:** Criar em `/components/` com JSDoc
3. **Story:** Documentar no Storybook
4. **Integração:** Usar nas páginas
5. **Validação:** Testar responsividade

### **Hierarquia de Componentes**

```
/src/components/
├── ui/           # Componentes base (Hero, Button, Card)
├── layout/       # Header, Footer, Navigation
├── home/         # Específicos da home (Carrossel, PackageCard)
├── pacotes/      # Específicos de pacotes (CalculadoraExtras)
└── admin/        # Área administrativa (futuro)
```

---

## 🎯 Padrões de Código Esperados

### **1. Schema Zod Pattern**

```typescript
// ✅ Sempre em schemas.ts
export const componentSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export type ComponentProps = z.infer<typeof componentSchema>;

// ⚠️ NUNCA definir tipos manualmente
// ❌ interface ComponentProps { ... }
// ❌ type ComponentProps = { ... }
```

### **2. Component Pattern**

```typescript
/**
 * Componente [Nome] - [Descrição breve]
 * @category UI|Layout|Home|Pacotes
 * @dependencies schemas.ts
 * @tested Storybook
 */
interface Props {
  data: ComponentProps; // Sempre tipar com schema
}

export default function Component({ data }: Props) {
  // Validação automática com schema
  const validatedData = componentSchema.parse(data);

  return (
    // JSX aqui
  );
}
```

### **3. JSDoc Completo (OBRIGATÓRIO)**

````typescript
/**
 * Componente Hero para seções principais de destaque.
 * Apresenta um título principal e subtítulo com design responsivo mobile-first.
 *
 * Características:
 * - Design responsivo com fontes que escalam conforme o tamanho da tela
 * - Tipografia diferenciada: título com fonte serif, subtítulo com sans-serif
 * - Espaçamento otimizado para diferentes breakpoints
 * - Suporte a conteúdo adicional via children
 *
 * @component
 * @param {HeroProps} props - As propriedades do componente
 * @returns {React.ReactElement} O elemento hero renderizado
 *
 * @example
 * ```tsx
 * <Hero
 *   title="Capturando Emoções, Eternizando Memórias!"
 *   subtitle="Fotografia profissional para eternizar os momentos mais importantes da sua vida."
 * />
 * ```
 */
````

### **4. Story Pattern**

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import Component from "./Component";
import { componentSchema } from "@/lib/schemas";

const meta: Meta<typeof Component> = {
  title: "Categoria/Component",
  component: Component,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: componentSchema.parse({
      // Dados de exemplo
    }),
  },
};
```

---

## 🚀 Comandos Rápidos para IA

### **Comandos de Desenvolvimento**

```bash
# Iniciar development
cd apps/web && npm run dev

# Storybook
cd apps/web && npm run storybook

# Build
cd apps/web && npm run build

# Lint
cd apps/web && npm run lint
```

### **Comandos Git Semânticos**

```bash
git commit -m "feat(hero): implementar componente Hero com responsividade"
git commit -m "fix(carrossel): corrigir auto-play em mobile"
git commit -m "docs(schema): adicionar comentários JSDoc em packageSchema"
git commit -m "refactor(home): migrar dados para schema centralizado"
```

**Convenções de Commit (ver COMMIT_CONVENTIONS.md):**

- `feat(scope):` - Novas funcionalidades
- `fix(scope):` - Correções de bugs
- `docs(scope):` - Documentação
- `style(scope):` - Formatação
- `refactor(scope):` - Refatoração
- `test(scope):` - Testes
- `chore(scope):` - Manutenção

---

## 🧪 Estratégias de Debugging

### **1. Problemas de Estilo**

```
1. Verificar Tailwind config em tailwind.config.ts
2. Confirmar CSS variables em globals.css
3. Testar no Storybook isoladamente
4. Comparar com versão legado em /frontend
```

### **2. Problemas de Dados**

```
1. Validar schema em schemas.ts
2. Verificar parsing no componente
3. Conferir props passadas da página
4. Testar com dados mock no Storybook
```

### **3. Problemas de Build**

```
1. npm run lint (verificar TypeScript)
2. npm run build (verificar produção)
3. Verificar imports relativos vs absolutos
4. Confirmar dependências no package.json
```

---

## 📊 Métricas de Qualidade

### **Checklist de Componente**

- [ ] Schema Zod definido em `/lib/schemas.ts`
- [ ] Tipos inferidos (não manuais)
- [ ] JSDoc completo com @param e @returns
- [ ] Story no Storybook com dados de exemplo
- [ ] Mobile-first responsivo (Tailwind)
- [ ] Validação de props com schema.parse()
- [ ] Teste visual funcionando
- [ ] Integrado na página
- [ ] Adicionado ao component-metadata.ts
- [ ] Performance otimizada (lazy loading se necessário)

### **Checklist de Página**

- [ ] Layout base aplicado
- [ ] Componentes importados corretamente
- [ ] Dados vindo de schemas.ts
- [ ] Responsividade testada
- [ ] SEO básico (title, meta)
- [ ] Performance otimizada (Core Web Vitals)
- [ ] Acessibilidade implementada
- [ ] Meta tags dinâmicas configuradas

---

## 🎨 Design System Quick Reference

### **Cores Principais** (do Tailwind config)

```
Primary: #your-primary-color
Secondary: #your-secondary-color
Background: #your-bg-color
Text: #your-text-color
```

### **Fontes**

```
Display: 'DM Serif Text' (títulos)
Body: 'Inter' (textos)
```

### **Breakpoints Mobile-First**

```
sm: 640px   # Tablet pequeno
md: 768px   # Tablet
lg: 1024px  # Desktop pequeno
xl: 1280px  # Desktop grande
```

---

## 🔄 Estado Atual vs. Próximos Passos

### **✅ Concluído:**

- Schemas Zod implementados (fonte única da verdade)
- Componentes: Hero, Carrossel, PackageCard, CalculadoraExtras
- Páginas: Home, Pacotes migradas
- Storybook configurado e funcionando
- Sistema de alertas AI-friendly implementado
- Monitoramento de performance configurado
- Documentação completa (JSDoc, metadados, exemplos)
- Convenções de commit semânticas estabelecidas

### **🎯 Prioridade Atual:**

- Ajustes visuais e refinamentos
- Correspondência com design original
- Testes de responsividade

### **📋 Backlog:**

- Migração de tema base do Tailwind
- Configuração de variáveis de ambiente
- Início da Fase 2 (backend Cloudflare D1)
- Deploy no Vercel
- Configuração de domínio fotosdotap.com.br
- Implementação de formulário de contato
- Integração com Google Analytics

---

## 💡 Dicas para Máxima Eficiência

### **1. Sempre Forneça Contexto Completo**

Quando pedir ajuda, inclua:

- Arquivo específico que está editando
- Objetivo da mudança
- Padrão que deve seguir (Ex: "como Hero.tsx")
- Onde está definido o schema relacionado

### **2. Use Referências Existentes**

- "Implementar como Hero.tsx mas para depoimentos"
- "Seguir padrão do PackageCard.tsx"
- "Usar schema similar ao carrosselSchema"

### **3. Seja Específico sobre Responsividade**

- "Mobile-first, como nos outros componentes"
- "Breakpoint md: 2 colunas, lg: 3 colunas"
- "Fonte responsiva: text-2xl md:text-4xl"

### **4. Mencione Integração com Storybook**

- "Incluir story com args baseados no schema"
- "Documentar no Storybook com tags autodocs"
- "Criar variantes Default e WithData"

### **5. Consulte Arquivos de Contexto**

- "Verificar business-dictionary.ts para terminologia"
- "Consultar project-context.ts para informações do projeto"
- "Usar examples.ts para dados de exemplo"
- "Verificar performance-monitoring.ts para métricas"
- "Consultar ai-assistance-alerts.ts para verificações"

---

**📝 Última Atualização:** Janeiro 2025  
**🎯 Versão:** 2.0 (Migração Next.js)  
**👥 Contribuidores:** Equipe de desenvolvimento + AI Assistant  
**🏆 Status:** 100% Aderência aos Princípios de Máxima Assistência de IA
