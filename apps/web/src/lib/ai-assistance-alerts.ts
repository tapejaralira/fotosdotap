/**
 * Sistema de Alertas para Máxima Assistência de IA - Fotos do Tap
 * 
 * Este arquivo implementa verificações automáticas para garantir que o código
 * sempre siga os padrões estabelecidos para máxima assistência de IA.
 * 
 * @fileoverview Alertas e verificações para padrões AI-friendly
 * @author Fotos do Tap
 * @version 1.0.0
 */

import { PERFORMANCE_THRESHOLDS } from './performance-monitoring';

// ==========================================
// TIPOS DE ALERTAS
// ==========================================

/**
 * Tipos de alertas que podem ser gerados
 */
export type AlertType = 
  | 'missing_jsdoc'
  | 'missing_schema_validation'
  | 'manual_typescript_type'
  | 'missing_storybook_story'
  | 'missing_tests'
  | 'performance_degradation'
  | 'accessibility_issue'
  | 'seo_issue'
  | 'business_logic_violation'
  | 'naming_convention_violation';

/**
 * Severidade do alerta
 */
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Interface para um alerta
 */
interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  file?: string;
  line?: number;
  component?: string;
  recommendations: string[];
  aiContext: string;
  createdAt: Date;
  resolved?: boolean;
  resolvedAt?: Date;
}

// ==========================================
// VERIFICADORES AUTOMÁTICOS
// ==========================================

/**
 * Verifica se um componente tem JSDoc completo
 */
export function checkJSDocCompleteness(
  componentCode: string,
  componentName: string
): Alert | null {
  const hasJSDoc = /\/\*\*[\s\S]*?\*\//.test(componentCode);
  const hasParamTags = /@param/.test(componentCode);
  const hasReturnsTag = /@returns/.test(componentCode);
  
  if (!hasJSDoc || !hasParamTags || !hasReturnsTag) {
    return {
      id: `jsdoc_${componentName}_${Date.now()}`,
      type: 'missing_jsdoc',
      severity: 'medium',
      title: `JSDoc incompleto no componente ${componentName}`,
      description: `O componente ${componentName} não possui documentação JSDoc completa, dificultando a assistência de IA.`,
      component: componentName,
      recommendations: [
        'Adicionar bloco JSDoc completo com /** ... */',
        'Incluir @param para todas as props',
        'Incluir @returns para descrever o retorno',
        'Adicionar @example com exemplo de uso',
        'Documentar casos de uso específicos'
      ],
      aiContext: `Componente ${componentName} precisa de documentação JSDoc para facilitar manutenção assistida por IA.`,
      createdAt: new Date()
    };
  }
  
  return null;
}

/**
 * Verifica se um componente usa validação de schema Zod
 */
export function checkSchemaValidation(
  componentCode: string,
  componentName: string
): Alert | null {
  const hasSchemaImport = /from ['"]@\/lib\/schemas['"]/.test(componentCode);
  const hasSchemaValidation = /\.parse\(/.test(componentCode);
  
  if (!hasSchemaImport || !hasSchemaValidation) {
    return {
      id: `schema_${componentName}_${Date.now()}`,
      type: 'missing_schema_validation',
      severity: 'high',
      title: `Validação de schema ausente no componente ${componentName}`,
      description: `O componente ${componentName} não usa validação de schema Zod, comprometendo a fonte única da verdade.`,
      component: componentName,
      recommendations: [
        'Importar schema do arquivo /lib/schemas.ts',
        'Usar schema.parse() para validar props',
        'Inferir tipos TypeScript do schema',
        'Nunca definir tipos manualmente',
        'Adicionar testes para validação de schema'
      ],
      aiContext: `Componente ${componentName} deve usar schemas Zod como fonte única da verdade para máxima assistência de IA.`,
      createdAt: new Date()
    };
  }
  
  return null;
}

/**
 * Verifica se há tipos TypeScript definidos manualmente
 */
export function checkManualTypeScriptTypes(
  componentCode: string,
  componentName: string
): Alert | null {
  const hasManualInterface = /interface\s+\w+\s*{/.test(componentCode);
  const hasManualType = /type\s+\w+\s*=/.test(componentCode);
  
  if (hasManualInterface || hasManualType) {
    return {
      id: `manual_types_${componentName}_${Date.now()}`,
      type: 'manual_typescript_type',
      severity: 'high',
      title: `Tipos TypeScript definidos manualmente em ${componentName}`,
      description: `O componente ${componentName} define tipos TypeScript manualmente em vez de inferir dos schemas Zod.`,
      component: componentName,
      recommendations: [
        'Remover interfaces/types definidos manualmente',
        'Usar z.infer<typeof SchemaName> para inferir tipos',
        'Definir schema Zod primeiro, depois inferir tipo',
        'Manter fonte única da verdade nos schemas',
        'Atualizar imports para usar tipos inferidos'
      ],
      aiContext: `Componente ${componentName} deve inferir tipos dos schemas Zod para manter consistência e facilitar assistência de IA.`,
      createdAt: new Date()
    };
  }
  
  return null;
}

/**
 * Verifica se um componente visual tem story no Storybook
 */
export function checkStorybookStory(
  componentName: string,
  hasStoryFile: boolean
): Alert | null {
  if (!hasStoryFile) {
    return {
      id: `storybook_${componentName}_${Date.now()}`,
      type: 'missing_storybook_story',
      severity: 'medium',
      title: `Story do Storybook ausente para ${componentName}`,
      description: `O componente ${componentName} não possui story no Storybook, dificultando desenvolvimento isolado.`,
      component: componentName,
      recommendations: [
        'Criar arquivo .stories.tsx para o componente',
        'Incluir story Default com props de exemplo',
        'Adicionar stories para diferentes variações',
        'Usar dados de exemplo do /lib/examples.ts',
        'Configurar controles para props principais'
      ],
      aiContext: `Componente ${componentName} precisa de story no Storybook para desenvolvimento assistido por IA.`,
      createdAt: new Date()
    };
  }
  
  return null;
}

/**
 * Verifica se um componente tem testes
 */
export function checkComponentTests(
  componentName: string,
  hasTestFile: boolean,
  hasComplexLogic: boolean
): Alert | null {
  if (hasComplexLogic && !hasTestFile) {
    return {
      id: `tests_${componentName}_${Date.now()}`,
      type: 'missing_tests',
      severity: 'medium',
      title: `Testes ausentes para ${componentName}`,
      description: `O componente ${componentName} possui lógica complexa mas não tem testes, comprometendo confiabilidade.`,
      component: componentName,
      recommendations: [
        'Criar arquivo de teste com Vitest',
        'Testar props validadas pelo schema',
        'Testar casos de uso principais',
        'Usar dados de exemplo do /lib/examples.ts',
        'Implementar testes de acessibilidade'
      ],
      aiContext: `Componente ${componentName} com lógica complexa precisa de testes para garantir robustez e facilitar refatoração assistida por IA.`,
      createdAt: new Date()
    };
  }
  
  return null;
}

/**
 * Verifica se há violações de convenções de nomenclatura
 */
export function checkNamingConventions(
  fileName: string,
  componentName: string
): Alert | null {
  const violations: string[] = [];
  
  // Verifica PascalCase para componentes
  if (!/^[A-Z][a-zA-Z]*$/.test(componentName)) {
    violations.push('Nome do componente deve ser PascalCase');
  }
  
  // Verifica kebab-case para utilitários
  if (fileName.includes('lib/') && !/^[a-z][a-z-]*\.ts$/.test(fileName)) {
    violations.push('Arquivos de utilitários devem usar kebab-case');
  }
  
  // Verifica camelCase para hooks
  if (fileName.includes('hooks/') && !/^use[A-Z][a-zA-Z]*\.ts$/.test(fileName)) {
    violations.push('Hooks devem começar com "use" e usar camelCase');
  }
  
  if (violations.length > 0) {
    return {
      id: `naming_${componentName}_${Date.now()}`,
      type: 'naming_convention_violation',
      severity: 'low',
      title: `Violação de convenção de nomenclatura em ${componentName}`,
      description: `O arquivo ${fileName} não segue as convenções de nomenclatura estabelecidas.`,
      file: fileName,
      component: componentName,
      recommendations: violations.map(v => `Corrigir: ${v}`),
      aiContext: `Arquivo ${fileName} deve seguir convenções de nomenclatura para facilitar navegação e manutenção assistida por IA.`,
      createdAt: new Date()
    };
  }
  
  return null;
}

// ==========================================
// VERIFICADORES DE PERFORMANCE
// ==========================================

/**
 * Verifica se há degradação de performance
 */
export function checkPerformanceDegradation(
  currentMetrics: { lcp: number; fid: number; cls: number }
): Alert[] {
  const alerts: Alert[] = [];
  
  // Verifica Core Web Vitals
  if (currentMetrics.lcp > PERFORMANCE_THRESHOLDS.coreWebVitals.lcp.warning) {
    alerts.push({
      id: `perf_lcp_${Date.now()}`,
      type: 'performance_degradation',
      severity: 'high',
      title: 'LCP degradado',
      description: `LCP aumentou para ${currentMetrics.lcp}s, acima do threshold de ${PERFORMANCE_THRESHOLDS.coreWebVitals.lcp.warning}s.`,
      recommendations: [
        'Otimizar imagens para WebP',
        'Implementar lazy loading',
        'Considerar CDN para assets',
        'Verificar bundle size'
      ],
      aiContext: 'Performance degradada detectada. IA pode ajudar a identificar e corrigir otimizações necessárias.',
      createdAt: new Date()
    });
  }
  
  if (currentMetrics.fid > PERFORMANCE_THRESHOLDS.coreWebVitals.fid.warning) {
    alerts.push({
      id: `perf_fid_${Date.now()}`,
      type: 'performance_degradation',
      severity: 'medium',
      title: 'FID degradado',
      description: `FID aumentou para ${currentMetrics.fid}ms, acima do threshold de ${PERFORMANCE_THRESHOLDS.coreWebVitals.fid.warning}ms.`,
      recommendations: [
        'Reduzir JavaScript não crítico',
        'Implementar code splitting',
        'Otimizar event listeners',
        'Verificar third-party scripts'
      ],
      aiContext: 'Interatividade degradada detectada. IA pode ajudar a otimizar JavaScript e melhorar FID.',
      createdAt: new Date()
    });
  }
  
  return alerts;
}

// ==========================================
// VERIFICADORES DE ACESSIBILIDADE
// ==========================================

/**
 * Verifica problemas de acessibilidade
 */
export function checkAccessibilityIssues(
  componentCode: string,
  componentName: string
): Alert[] {
  const alerts: Alert[] = [];
  
  // Verifica imagens sem alt
  const imgTags = componentCode.match(/<img[^>]*>/g) || [];
  imgTags.forEach((imgTag, index) => {
    if (!imgTag.includes('alt=')) {
      alerts.push({
        id: `a11y_img_${componentName}_${index}_${Date.now()}`,
        type: 'accessibility_issue',
        severity: 'medium',
        title: `Imagem sem alt text em ${componentName}`,
        description: `Imagem encontrada sem atributo alt, comprometendo acessibilidade.`,
        component: componentName,
        recommendations: [
          'Adicionar alt text descritivo',
          'Usar alt="" para imagens decorativas',
          'Considerar aria-label para imagens complexas',
          'Testar com leitores de tela'
        ],
        aiContext: `Componente ${componentName} tem imagem sem alt text. IA pode ajudar a gerar descrições apropriadas.`,
        createdAt: new Date()
      });
    }
  });
  
  // Verifica botões sem aria-label
  const buttonTags = componentCode.match(/<button[^>]*>/g) || [];
  buttonTags.forEach((buttonTag, index) => {
    if (!buttonTag.includes('aria-label=') && !buttonTag.includes('>.*</button>')) {
      alerts.push({
        id: `a11y_button_${componentName}_${index}_${Date.now()}`,
        type: 'accessibility_issue',
        severity: 'low',
        title: `Botão sem aria-label em ${componentName}`,
        description: `Botão encontrado sem aria-label, pode comprometer acessibilidade.`,
        component: componentName,
        recommendations: [
          'Adicionar aria-label descritivo',
          'Usar texto visível no botão',
          'Considerar role="button" para elementos customizados',
          'Testar navegação por teclado'
        ],
        aiContext: `Componente ${componentName} tem botão sem aria-label. IA pode ajudar a gerar labels apropriados.`,
        createdAt: new Date()
      });
    }
  });
  
  return alerts;
}

// ==========================================
// VERIFICADORES DE SEO
// ==========================================

/**
 * Verifica problemas de SEO
 */
export function checkSEOIssues(
  pageCode: string,
  pageName: string
): Alert[] {
  const alerts: Alert[] = [];
  
  // Verifica meta tags
  if (!pageCode.includes('metadata')) {
    alerts.push({
      id: `seo_metadata_${pageName}_${Date.now()}`,
      type: 'seo_issue',
      severity: 'medium',
      title: `Meta tags ausentes em ${pageName}`,
      description: `A página ${pageName} não possui meta tags configuradas.`,
      file: pageName,
      recommendations: [
        'Adicionar export const metadata',
        'Incluir title e description',
        'Adicionar Open Graph tags',
        'Configurar structured data',
        'Otimizar para palavras-chave relevantes'
      ],
      aiContext: `Página ${pageName} precisa de meta tags para SEO. IA pode ajudar a gerar títulos e descrições otimizados.`,
      createdAt: new Date()
    });
  }
  
  // Verifica heading hierarchy
  const headings = pageCode.match(/<h[1-6][^>]*>/g) || [];
  const headingLevels = headings.map(h => parseInt(h.match(/<h([1-6])/)?.[1] || '0'));
  
  if (headingLevels.length > 0) {
    let previousLevel = 0;
    for (let i = 0; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i];
      if (currentLevel - previousLevel > 1) {
        alerts.push({
          id: `seo_headings_${pageName}_${i}_${Date.now()}`,
          type: 'seo_issue',
          severity: 'low',
          title: `Hierarquia de headings incorreta em ${pageName}`,
          description: `Heading h${currentLevel} encontrado sem heading h${currentLevel - 1} anterior.`,
          file: pageName,
          recommendations: [
            'Corrigir hierarquia de headings',
            'Usar apenas um h1 por página',
            'Manter sequência lógica h1 > h2 > h3',
            'Evitar pular níveis de heading'
          ],
          aiContext: `Página ${pageName} tem hierarquia de headings incorreta. IA pode ajudar a reorganizar a estrutura.`,
          createdAt: new Date()
        });
        break;
      }
      previousLevel = currentLevel;
    }
  }
  
  return alerts;
}

// ==========================================
// SISTEMA DE GESTÃO DE ALERTAS
// ==========================================

/**
 * Classe para gerenciar alertas
 */
export class AIAssistanceAlertManager {
  private alerts: Alert[] = [];
  
  /**
   * Adiciona um novo alerta
   */
  addAlert(alert: Alert): void {
    this.alerts.push(alert);
  }
  
  /**
   * Resolve um alerta
   */
  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      alert.resolvedAt = new Date();
    }
  }
  
  /**
   * Retorna alertas ativos
   */
  getActiveAlerts(): Alert[] {
    return this.alerts.filter(a => !a.resolved);
  }
  
  /**
   * Retorna alertas por severidade
   */
  getAlertsBySeverity(severity: AlertSeverity): Alert[] {
    return this.alerts.filter(a => a.severity === severity && !a.resolved);
  }
  
  /**
   * Retorna alertas por tipo
   */
  getAlertsByType(type: AlertType): Alert[] {
    return this.alerts.filter(a => a.type === type && !a.resolved);
  }
  
  /**
   * Gera relatório de alertas
   */
  generateAlertReport(): {
    total: number;
    active: number;
    bySeverity: Record<AlertSeverity, number>;
    byType: Record<AlertType, number>;
    criticalIssues: Alert[];
    recommendations: string[];
  } {
    const activeAlerts = this.getActiveAlerts();
    
    const bySeverity: Record<AlertSeverity, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };
    
    const byType: Record<AlertType, number> = {
      missing_jsdoc: 0,
      missing_schema_validation: 0,
      manual_typescript_type: 0,
      missing_storybook_story: 0,
      missing_tests: 0,
      performance_degradation: 0,
      accessibility_issue: 0,
      seo_issue: 0,
      business_logic_violation: 0,
      naming_convention_violation: 0
    };
    
    activeAlerts.forEach(alert => {
      bySeverity[alert.severity]++;
      byType[alert.type]++;
    });
    
    const criticalIssues = activeAlerts.filter(a => a.severity === 'critical');
    
    const recommendations = [
      'Resolver alertas críticos primeiro',
      'Implementar validação de schema em todos os componentes',
      'Adicionar JSDoc completo',
      'Criar stories do Storybook para componentes visuais',
      'Corrigir problemas de acessibilidade',
      'Otimizar performance conforme necessário'
    ];
    
    return {
      total: this.alerts.length,
      active: activeAlerts.length,
      bySeverity,
      byType,
      criticalIssues,
      recommendations
    };
  }
}

// ==========================================
// FUNÇÕES DE INTEGRAÇÃO COM IA
// ==========================================

/**
 * Gera contexto para IA sobre alertas
 */
export function getAlertContext(): {
  totalAlerts: number;
  criticalAlerts: number;
  commonIssues: string[];
  bestPractices: string[];
} {
  return {
    totalAlerts: 0, // Será preenchido pelo manager
    criticalAlerts: 0, // Será preenchido pelo manager
    commonIssues: [
      'Falta de JSDoc em componentes',
      'Validação de schema ausente',
      'Tipos TypeScript definidos manualmente',
      'Stories do Storybook ausentes',
      'Problemas de acessibilidade',
      'Meta tags SEO ausentes'
    ],
    bestPractices: [
      'Sempre documentar componentes com JSDoc',
      'Usar schemas Zod como fonte única da verdade',
      'Inferir tipos TypeScript dos schemas',
      'Criar stories para componentes visuais',
      'Implementar testes para lógica complexa',
      'Seguir convenções de nomenclatura',
      'Priorizar acessibilidade e SEO',
      'Monitorar performance continuamente'
    ]
  };
}

export type { Alert }; 