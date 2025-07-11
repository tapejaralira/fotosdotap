/**
 * Comentários de Fluxo e Contexto de Negócio
 * 
 * Este arquivo documenta os fluxos críticos do sistema, decisões arquiteturais
 * e o contexto necessário para compreender o domínio de fotografia profissional.
 * 
 * @fileoverview Documentação de fluxos e contexto para assistência de IA
 * @author Fotos do Tap
 * @version 1.0.0
 */

// ==========================================
// FLUXOS PRINCIPAIS DO SISTEMA
// ==========================================

/**
 * FLUXO 1: Visualização da Página Inicial
 * 
 * Contexto: Cliente potencial visita o site para conhecer os serviços
 * 
 * Etapas:
 * 1. Usuário acessa "/" (página inicial)
 * 2. Sistema renderiza Hero com título e subtítulo principais
 * 3. Sistema carrega e exibe Carrossel com fotos do portfólio
 * 4. Sistema exibe cards dos pacotes disponíveis (PackageCard)
 * 5. Sistema exibe Calculadora de Extras para estimativa rápida
 * 6. Usuário pode navegar pelos pacotes ou calcular extras
 * 
 * Componentes envolvidos:
 * - Hero (seção principal)
 * - Carrossel (galeria de fotos)
 * - PackageCard (cards dos pacotes)
 * - CalculadoraExtras (calculadora interativa)
 * 
 * Dados necessários:
 * - HOME_HERO (título e subtítulo)
 * - HOME_CAROUSEL (imagens do portfólio)
 * - PACKAGES (pacotes disponíveis)
 * - DEFAULT_EXTRA_PRICING (preços das fotos extras)
 * 
 * Considerações de UX:
 * - Carrossel deve ser responsivo e acessível
 * - Cards devem destacar o pacote mais popular
 * - Calculadora deve dar feedback imediato
 * - Design mobile-first para dispositivos móveis
 */

/**
 * FLUXO 2: Seleção e Contratação de Pacote
 * 
 * Contexto: Cliente interessado quer contratar um pacote específico
 * 
 * Etapas:
 * 1. Cliente visualiza pacotes na home ou página /pacotes
 * 2. Cliente analisa features, preços e benefícios de cada pacote
 * 3. Cliente identifica pacote "highlighted" (mais popular)
 * 4. Cliente clica em CTA do pacote desejado
 * 5. [FUTURO] Sistema redireciona para formulário de contato
 * 6. [FUTURO] Sistema valida dados e envia proposta
 * 
 * Dados críticos por pacote:
 * - id: identificador único para tracking
 * - title: nome comercial do pacote
 * - description: valor proposicional claro
 * - price: preço em reais (sempre positivo)
 * - features: benefícios específicos (array não vazio)
 * - image: foto representativa (URL válida)
 * - highlighted: destaque visual para conversão
 * 
 * Regras de negócio:
 * - Preços devem ser sempre positivos
 * - Features não podem estar vazias
 * - Imagens devem ser URLs válidas
 * - Apenas um pacote pode estar highlighted por vez
 */

/**
 * FLUXO 3: Cálculo de Fotos Extras
 * 
 * Contexto: Cliente quer estimar custo de fotos adicionais
 * 
 * Etapas:
 * 1. Cliente seleciona tipo de pacote (basic/premium)
 * 2. Cliente define quantidade de fotos extras (0-999)
 * 3. Sistema aplica tabela de preços diferenciada:
 *    - Até 5 fotos: preço unitário higher
 *    - Acima de 5 fotos: preço unitário lower (desconto por volume)
 * 4. Sistema calcula breakdown detalhado:
 *    - Quantidade na faixa 1-5 fotos
 *    - Quantidade na faixa 6+ fotos  
 *    - Subtotais por faixa
 *    - Total geral
 * 5. Sistema exibe resultado com transparência total
 * 
 * Lógica de preços:
 * - BASIC até 5: R$ 15,00/foto
 * - BASIC acima 5: R$ 12,00/foto
 * - PREMIUM até 5: R$ 20,00/foto
 * - PREMIUM acima 5: R$ 15,00/foto
 * 
 * Exemplo de cálculo (BASIC, 8 fotos):
 * - 5 fotos × R$ 15,00 = R$ 75,00
 * - 3 fotos × R$ 12,00 = R$ 36,00
 * - Total: R$ 111,00
 * 
 * Validações:
 * - packageType deve ser 'basic' ou 'premium'
 * - extraPhotos deve estar entre 0 e 999
 * - Preços sempre positivos
 * - Breakdown sempre consistente com total
 */

/**
 * FLUXO 4: Navegação Responsiva
 * 
 * Contexto: Sistema deve funcionar perfeitamente em todos os dispositivos
 * 
 * Breakpoints do Tailwind:
 * - sm: 640px (tablets pequenos)
 * - md: 768px (tablets)
 * - lg: 1024px (desktops pequenos)
 * - xl: 1280px (desktops)
 * - 2xl: 1536px (desktops grandes)
 * 
 * Comportamentos por componente:
 * 
 * Hero:
 * - Mobile: título menor, texto centralizado
 * - Desktop: título grande, texto à esquerda
 * 
 * Carrossel:
 * - Mobile: uma imagem por vez, touch/swipe
 * - Desktop: múltiplas imagens, navegação por botões
 * 
 * PackageCards:
 * - Mobile: cards empilhados verticalmente
 * - Tablet: 2 cards por linha
 * - Desktop: 3+ cards horizontalmente
 * 
 * CalculadoraExtras:
 * - Mobile: campos empilhados, botões grandes
 * - Desktop: layout em grid, mais compacto
 */

// ==========================================
// CONTEXTO DE NEGÓCIO E DOMÍNIO
// ==========================================

/**
 * ENTENDENDO O NEGÓCIO DE FOTOGRAFIA
 * 
 * Fotos do Tap é um estúdio de fotografia profissional especializado
 * em eventos sociais, com foco em casamentos e ensaios de casal.
 * 
 * Diferenciais competitivos:
 * 1. Fotografia autoral (estilo único, não engessado)
 * 2. Acompanhamento completo (consultoria pré-evento)
 * 3. Flexibilidade de pacotes (basic/premium)
 * 4. Transparência de preços (calculadora pública)
 * 5. Entrega digital moderna (galeria online)
 * 
 * Personas principais:
 * 
 * 1. Noivos (25-35 anos):
 *    - Buscam fotógrafo para casamento
 *    - Priorizam qualidade vs. preço
 *    - Querem ver portfolio antes de contratar
 *    - Precisam de prazo de entrega definido
 * 
 * 2. Profissionais (30-45 anos):
 *    - Executivos, empreendedores, influencers
 *    - Querem fotos para LinkedIn, site, redes
 *    - Buscam agilidade e profissionalismo
 *    - Dispostos a pagar premium por qualidade
 * 
 * 3. Famílias (25-50 anos):
 *    - Ensaios familiares, gestantes, newborn
 *    - Foco em momentos naturais e espontâneos
 *    - Orçamento mais limitado
 *    - Valorizam quantidade de fotos entregues
 */

/**
 * ESTRATÉGIA DE PREÇOS
 * 
 * A estrutura de preços é desenhada para:
 * 1. Facilitar a decisão do cliente (2 opções claras)
 * 2. Incentivar o upgrade para premium
 * 3. Monetizar fotos extras de forma transparente
 * 4. Competir por valor, não por preço
 * 
 * Pacote Completo (R$ 500):
 * - Posicionamento: "Vale cada centavo"
 * - Target: Clientes que querem o melhor
 * - Margem: ~70% (alto valor agregado)
 * - Estratégia: Destacar como "mais popular"
 * 
 * Pacote Flexível (R$ 200):
 * - Posicionamento: "Experimente primeiro"
 * - Target: Clientes indecisos ou orçamento limitado
 * - Margem: ~40% (volume de conversão)
 * - Estratégia: Gateway drug para o completo
 * 
 * Fotos Extras:
 * - Premium vs. Basic: 33% mais caro
 * - Escala de volume: 20% desconto após 5 fotos
 * - Transparência: Calculadora pública
 * - Estratégia: Upsell pós-sessão
 */

/**
 * JORNADA DO CLIENTE
 * 
 * 1. DESCOBERTA (Awareness):
 *    - Cliente pesquisa "fotógrafo casamento Manaus"
 *    - Encontra site via SEO, redes sociais ou indicação
 *    - Primeira impressão: Hero + Carrossel
 * 
 * 2. CONSIDERAÇÃO (Interest):
 *    - Navega pelos pacotes
 *    - Usa calculadora para estimar custos
 *    - Compara com concorrentes
 *    - Avalia portfolio no carrossel
 * 
 * 3. DECISÃO (Desire):
 *    - Escolhe pacote preferido
 *    - Clica no CTA principal
 *    - [FUTURO] Preenche formulário de contato
 * 
 * 4. CONTRATAÇÃO (Action):
 *    - [FUTURO] Recebe proposta personalizada
 *    - [FUTURO] Negocia detalhes via WhatsApp
 *    - [FUTURO] Assina contrato e paga sinal
 * 
 * 5. EXPERIÊNCIA (Retention):
 *    - Consultoria pré-ensaio
 *    - Sessão de fotos
 *    - Seleção e edição
 *    - Entrega via galeria online
 *    - [FUTURO] Upsell de produtos físicos
 */

// ==========================================
// DECISÕES ARQUITETURAIS
// ==========================================

/**
 * ESCOLHA DO NEXT.JS
 * 
 * Motivos:
 * 1. SEO nativo (pages router + SSG/SSR)
 * 2. Performance otimizada (Image, Font optimization)
 * 3. TypeScript first-class citizen
 * 4. Ecosistema maduro (Tailwind, Storybook)
 * 5. Deploy simples (Vercel)
 * 
 * Trade-offs:
 * - Bundle size maior que Vite
 * - Curva de aprendizado para iniciantes
 * - Lock-in do ecosistema React
 */

/**
 * ESCOLHA DO ZOD COMO FONTE ÚNICA DA VERDADE
 * 
 * Problemas resolvidos:
 * 1. Sincronização entre tipos TS e validação runtime
 * 2. Inconsistências entre frontend e backend
 * 3. Documentação desatualizada de APIs
 * 4. Bugs por dados inválidos em produção
 * 
 * Benefícios:
 * 1. Tipos TypeScript inferidos automaticamente
 * 2. Validação robusta em runtime
 * 3. Documentação sempre sincronizada
 * 4. Testes automatizados de schemas
 * 5. Facilita onboarding de novos desenvolvedores
 * 
 * Padrão adotado:
 * ```typescript
 * // ❌ NUNCA fazer assim
 * interface User {
 *   name: string;
 *   email: string;
 * }
 * 
 * // ✅ SEMPRE fazer assim
 * const UserSchema = z.object({
 *   name: z.string().min(1),
 *   email: z.string().email(),
 * });
 * 
 * type User = z.infer<typeof UserSchema>;
 * ```
 */

/**
 * ESCOLHA DO TAILWIND CSS
 * 
 * Vantagens para este projeto:
 * 1. Design system consistente via classes utilitárias
 * 2. Mobile-first responsividade
 * 3. Tree-shaking automático (CSS unused removido)
 * 4. Customização via tailwind.config.ts
 * 5. Integração nativa com Next.js
 * 
 * Configuração customizada:
 * - Fonte: DM Serif Text (elegância para fotografia)
 * - Cores: Paleta neutra + accent dourado
 * - Breakpoints: Padrão do Tailwind
 * - Espaçamentos: Sistema de 8px
 */

/**
 * ESTRUTURA DE COMPONENTES
 * 
 * Hierarquia adotada:
 * 
 * /src/components/
 *   ui/           # Componentes básicos reutilizáveis
 *   home/         # Componentes específicos da home
 *   layout/       # Componentes de layout (header, footer)
 * 
 * Padrões obrigatórios:
 * 1. Props tipadas via Zod schemas
 * 2. JSDoc completo para todas as funções
 * 3. Mobile-first development
 * 4. Acessibilidade (a11y) considerada
 * 5. Storybook stories para componentes visuais
 * 
 * Exemplo de componente modelo:
 * ```
 * // Componente para exibir cards de pacotes fotográficos
 * // @param props Props validadas pelo PackageSchema  
 * // @returns JSX.Element com card responsivo e acessível
 * export function PackageCard(props: Package) {
 *   const validatedProps = PackageSchema.parse(props);
 *   // ... implementação
 * }
 * ```
 */

// ==========================================
// GUIDELINES PARA IA
// ==========================================

/**
 * QUANDO MODIFICAR SCHEMAS
 * 
 * SEMPRE:
 * 1. Atualizar o schema Zod primeiro
 * 2. Deixar os tipos TypeScript serem inferidos
 * 3. Rodar testes para verificar breaking changes
 * 4. Atualizar dados de exemplo se necessário
 * 5. Documentar mudanças no JSDoc
 * 
 * NUNCA:
 * 1. Definir tipos TypeScript manualmente
 * 2. Fazer mudanças breaking sem considerar impacto
 * 3. Esquecer de validar dados existentes
 * 4. Remover campos sem deprecation period
 */

/**
 * QUANDO ADICIONAR COMPONENTES
 * 
 * CHECKLIST:
 * 1. ✓ Props tipadas via Zod
 * 2. ✓ JSDoc completo
 * 3. ✓ Mobile-first CSS
 * 4. ✓ Acessibilidade básica
 * 5. ✓ Storybook story (se visual)
 * 6. ✓ Testes unitários (se lógica complexa)
 * 7. ✓ Exemplos no /lib/examples.ts
 */

/**
 * CONVENÇÕES DE NOMENCLATURA
 * 
 * Arquivos:
 * - PascalCase para componentes: Hero.tsx
 * - kebab-case para utilitários: business-dictionary.ts
 * - camelCase para hooks: useScrollDirection.ts
 * 
 * Variáveis e funções:
 * - camelCase: calculateExtraPrice()
 * - SCREAMING_SNAKE_CASE para constantes: DEFAULT_EXTRA_PRICING
 * 
 * Schemas Zod:
 * - PascalCase + "Schema": PackageSchema
 * - Tipos inferidos sem "Schema": Package (não PackageType)
 */

export {}; // Força este arquivo a ser um módulo
