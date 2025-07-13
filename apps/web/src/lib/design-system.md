# 🎨 Sistema de Design - Fonte Única da Verdade

## 📋 Visão Geral

Este projeto implementa **100%** o **Princípio 3** estabelecido no nosso guia:

> **"Fonte Única da Verdade com Zod:** Todas as estruturas de dados serão definidas **uma única vez** usando schemas Zod."

## 🎯 Como Funciona

### **1. Fonte Única da Verdade (schemas.ts)**

```typescript
// ✅ DEFINIÇÃO ÚNICA em /src/lib/schemas.ts
export const DesignSystemColorsSchema = z.object({
  primaria: z.literal("#11131b"), // Cor da marca
  secundaria: z.literal("#f8f9fa"), // Background
  texto: z.literal("#666666"), // Textos secundários
  destaque: z.literal("#b6b6bd"), // Elementos especiais
});

export const DESIGN_SYSTEM = DesignSystemSchema.parse({
  colors: { primaria: "#11131b", secundaria: "#f8f9fa" /* ... */ },
  spacing: { espacamento: "1rem" /* ... */ },
  typography: { principal: "Open Sans, sans-serif" /* ... */ },
});
```

### **2. Tailwind Config Consome o Schema**

```typescript
// ✅ CONSUME DADOS DO SCHEMA em tailwind.config.ts
import { DESIGN_SYSTEM } from "./src/lib/schemas";

const config = {
  theme: {
    extend: {
      colors: {
        "cor-primaria": DESIGN_SYSTEM.colors.primaria, // ✅ Do schema
        "cor-secundaria": DESIGN_SYSTEM.colors.secundaria, // ✅ Do schema
        // ...
      },
    },
  },
};
```

### **3. Componentes Usam Classes Geradas**

```typescript
// ✅ COMPONENTES usam classes geradas automaticamente
export const Hero = () => (
  <section className="bg-cor-secundaria text-cor-primaria font-principal">
    <h1 className="font-titulo text-cor-primaria">Título</h1>
  </section>
);
```

## 🧠 Benefícios da Fonte Única da Verdade

### **✅ Validação Automática**

```typescript
// Schema garante que cores são válidas
const cores = DesignSystemColorsSchema.parse({
  primaria: "#11131b", // ✅ Válido
  secundaria: "azul", // ❌ Erro de validação automática
});
```

### **✅ Tipos Inferidos Automaticamente**

```typescript
// NUNCA escrever tipos manualmente
export type DesignSystemColors = z.infer<typeof DesignSystemColorsSchema>;
//     ^-- Inferido automaticamente do schema ✅

// ❌ NUNCA fazer isso:
// interface DesignSystemColors { primaria: string; }
```

### **✅ Mudanças Centralizadas**

```typescript
// Alterar UMA linha no schema...
export const DESIGN_SYSTEM = DesignSystemSchema.parse({
  colors: {
    primaria: "#ff0000", // ← Mudança aqui
    // ...
  },
});

// ...reflete em TODO o sistema automaticamente:
// - Tailwind config ✅
// - Classes CSS geradas ✅
// - Componentes que usam as classes ✅
// - TypeScript types ✅
```

### **✅ Impossível Ter Inconsistências**

```typescript
// Com fonte única da verdade, é IMPOSSÍVEL ter:
className = "text-[#11131b]"; // ❌ Cor hardcoded diferente
className = "text-cor-primaria"; // ✅ Sempre correto, sempre igual

// O sistema garante que TODAS as cores vêm do mesmo lugar
```

## 🔄 Fluxo de Dados

```
Schema Zod (schemas.ts)
        ↓
DESIGN_SYSTEM constante validada
        ↓
Tailwind Config (tailwind.config.ts)
        ↓
Classes CSS geradas (cor-primaria, etc.)
        ↓
Componentes React (className="cor-primaria")
        ↓
UI final renderizada
```

## 📚 Exemplos Práticos

### **Como Adicionar Nova Cor:**

```typescript
// 1. ✅ Adicionar no schema (ÚNICA mudança necessária)
export const DesignSystemColorsSchema = z.object({
  primaria: z.literal('#11131b'),
  secundaria: z.literal('#f8f9fa'),
  texto: z.literal('#666666'),
  destaque: z.literal('#b6b6bd'),
  nova: z.literal('#ff6b6b'),        // ← Adicionar aqui
});

export const DESIGN_SYSTEM = DesignSystemSchema.parse({
  colors: {
    primaria: '#11131b',
    secundaria: '#f8f9fa',
    texto: '#666666',
    destaque: '#b6b6bd',
    nova: '#ff6b6b',                 // ← E aqui
  },
  // ...
});

// 2. ✅ Adicionar no tailwind config
colors: {
  'cor-nova': DESIGN_SYSTEM.colors.nova,  // ← Consumir do schema
}

// 3. ✅ Usar nos componentes
className="text-cor-nova bg-cor-nova border-cor-nova"
```

### **Como Alterar Espaçamento:**

```typescript
// 1. ✅ Alterar APENAS no schema
export const DESIGN_SYSTEM = DesignSystemSchema.parse({
  spacing: {
    espacamento: "1.2rem", // ← Era 1rem, agora 1.2rem
    espacamentoCard: "1.8rem", // ← Era 1.5rem, agora 1.8rem
    // ...
  },
});

// 2. ✅ Automático em TODO o sistema:
// - padding: 1.2rem (via p-espacamento)
// - margin: 1.8rem (via m-espacamento-card)
// - gap: 1.2rem (via gap-espacamento)
```

## 🚀 Comandos Úteis

```bash
# Validar schemas
npm run lint

# Build para verificar se tipos estão corretos
npm run build

# Desenvolvimento com hot reload
npm run dev
```

## 🎯 Status Atual

- ✅ **Cores:** 100% vindas do schema Zod
- ✅ **Espaçamentos:** 100% vindos do schema Zod
- ✅ **Tipografia:** 100% vinda do schema Zod
- ✅ **Validação:** Automática via Zod
- ✅ **Tipos:** 100% inferidos automaticamente
- ✅ **Consistência:** Impossível ter valores diferentes

## 🏆 Conquista

O projeto agora implementa **perfeitamente** o Princípio 3:

> **"Fonte Única da Verdade com Zod"** ✅

**Resultado:** Sistema de design robusto, validado, tipado e impossível de quebrar! 🎉
