/**
 * Sistema de Monitoramento de Performance - Fotos do Tap
 * 
 * Este arquivo centraliza métricas de performance e ferramentas de monitoramento
 * para garantir que a aplicação mantenha os padrões de qualidade estabelecidos
 * e facilite a assistência de IA na otimização.
 * 
 * @fileoverview Monitoramento de performance e métricas de qualidade
 * @author Fotos do Tap
 * @version 1.0.0
 */

// ==========================================
// MÉTRICAS DE PERFORMANCE
// ==========================================

/**
 * Interface para métricas de Core Web Vitals
 */
interface CoreWebVitals {
  /** Largest Contentful Paint (deve ser < 2.5s) */
  lcp: number;
  /** First Input Delay (deve ser < 100ms) */
  fid: number;
  /** Cumulative Layout Shift (deve ser < 0.1) */
  cls: number;
  /** First Contentful Paint (deve ser < 1.5s) */
  fcp: number;
  /** Time to Interactive (deve ser < 3.8s) */
  tti: number;
}

/**
 * Interface para métricas de qualidade
 */
interface QualityMetrics {
  /** Lighthouse Performance Score (0-100) */
  lighthousePerformance: number;
  /** Lighthouse Accessibility Score (0-100) */
  lighthouseAccessibility: number;
  /** Lighthouse SEO Score (0-100) */
  lighthouseSEO: number;
  /** Lighthouse Best Practices Score (0-100) */
  lighthouseBestPractices: number;
  /** Bundle Size em KB */
  bundleSize: number;
  /** Tempo de carregamento da primeira página */
  firstPageLoad: number;
}

/**
 * Interface para métricas de negócio
 */
interface BusinessMetrics {
  /** Taxa de rejeição (deve ser < 40%) */
  bounceRate: number;
  /** Tempo médio na sessão (deve ser > 2min) */
  sessionDuration: number;
  /** Páginas por sessão (deve ser > 2) */
  pagesPerSession: number;
  /** Taxa de conversão (deve ser > 5%) */
  conversionRate: number;
}

// ==========================================
// THRESHOLDS E OBJETIVOS
// ==========================================

/**
 * Thresholds de performance estabelecidos
 */
export const PERFORMANCE_THRESHOLDS = {
  coreWebVitals: {
    lcp: { target: 2.5, warning: 4.0, unit: 'seconds' },
    fid: { target: 100, warning: 300, unit: 'milliseconds' },
    cls: { target: 0.1, warning: 0.25, unit: 'score' },
    fcp: { target: 1.5, warning: 2.0, unit: 'seconds' },
    tti: { target: 3.8, warning: 5.0, unit: 'seconds' }
  },
  
  lighthouse: {
    performance: { target: 90, warning: 70, unit: 'score' },
    accessibility: { target: 95, warning: 80, unit: 'score' },
    seo: { target: 95, warning: 80, unit: 'score' },
    bestPractices: { target: 90, warning: 70, unit: 'score' }
  },
  
  business: {
    bounceRate: { target: 40, warning: 60, unit: 'percentage' },
    sessionDuration: { target: 120, warning: 60, unit: 'seconds' },
    pagesPerSession: { target: 2, warning: 1, unit: 'pages' },
    conversionRate: { target: 5, warning: 2, unit: 'percentage' }
  },
  
  technical: {
    bundleSize: { target: 500, warning: 1000, unit: 'kb' },
    firstPageLoad: { target: 2000, warning: 4000, unit: 'milliseconds' }
  }
} as const;

// ==========================================
// FUNÇÕES DE MONITORAMENTO
// ==========================================

/**
 * Verifica se uma métrica está dentro do threshold aceitável
 */
export function isMetricHealthy(
  value: number, 
  threshold: { target: number; warning: number; unit: string }
): 'healthy' | 'warning' | 'critical' {
  if (value <= threshold.target) return 'healthy';
  if (value <= threshold.warning) return 'warning';
  return 'critical';
}

/**
 * Analisa Core Web Vitals e retorna status geral
 */
export function analyzeCoreWebVitals(metrics: CoreWebVitals): {
  status: 'healthy' | 'warning' | 'critical';
  issues: string[];
  score: number;
} {
  const issues: string[] = [];
  let criticalCount = 0;
  let warningCount = 0;
  
  // Analisa LCP
  const lcpStatus = isMetricHealthy(metrics.lcp, PERFORMANCE_THRESHOLDS.coreWebVitals.lcp);
  if (lcpStatus === 'critical') {
    issues.push(`LCP muito alto: ${metrics.lcp}s (target: ${PERFORMANCE_THRESHOLDS.coreWebVitals.lcp.target}s)`);
    criticalCount++;
  } else if (lcpStatus === 'warning') {
    issues.push(`LCP acima do ideal: ${metrics.lcp}s`);
    warningCount++;
  }
  
  // Analisa FID
  const fidStatus = isMetricHealthy(metrics.fid, PERFORMANCE_THRESHOLDS.coreWebVitals.fid);
  if (fidStatus === 'critical') {
    issues.push(`FID muito alto: ${metrics.fid}ms (target: ${PERFORMANCE_THRESHOLDS.coreWebVitals.fid.target}ms)`);
    criticalCount++;
  } else if (fidStatus === 'warning') {
    issues.push(`FID acima do ideal: ${metrics.fid}ms`);
    warningCount++;
  }
  
  // Analisa CLS
  const clsStatus = isMetricHealthy(metrics.cls, PERFORMANCE_THRESHOLDS.coreWebVitals.cls);
  if (clsStatus === 'critical') {
    issues.push(`CLS muito alto: ${metrics.cls} (target: ${PERFORMANCE_THRESHOLDS.coreWebVitals.cls.target})`);
    criticalCount++;
  } else if (clsStatus === 'warning') {
    issues.push(`CLS acima do ideal: ${metrics.cls}`);
    warningCount++;
  }
  
  // Determina status geral
  let status: 'healthy' | 'warning' | 'critical' = 'healthy';
  if (criticalCount > 0) status = 'critical';
  else if (warningCount > 0) status = 'warning';
  
  // Calcula score (0-100)
  const totalMetrics = 3;
  const healthyMetrics = totalMetrics - criticalCount - warningCount;
  const score = Math.round((healthyMetrics / totalMetrics) * 100);
  
  return { status, issues, score };
}

/**
 * Analisa métricas de Lighthouse
 */
export function analyzeLighthouseMetrics(metrics: QualityMetrics): {
  status: 'healthy' | 'warning' | 'critical';
  issues: string[];
  averageScore: number;
} {
  const issues: string[] = [];
  let criticalCount = 0;
  let warningCount = 0;
  let totalScore = 0;
  
  const scores = [
    { name: 'Performance', value: metrics.lighthousePerformance },
    { name: 'Accessibility', value: metrics.lighthouseAccessibility },
    { name: 'SEO', value: metrics.lighthouseSEO },
    { name: 'Best Practices', value: metrics.lighthouseBestPractices }
  ];
  
  scores.forEach(({ name, value }) => {
    const threshold = PERFORMANCE_THRESHOLDS.lighthouse[name.toLowerCase() as keyof typeof PERFORMANCE_THRESHOLDS.lighthouse];
    const status = isMetricHealthy(value, threshold);
    
    if (status === 'critical') {
      issues.push(`${name} muito baixo: ${value} (target: ${threshold.target})`);
      criticalCount++;
    } else if (status === 'warning') {
      issues.push(`${name} abaixo do ideal: ${value}`);
      warningCount++;
    }
    
    totalScore += value;
  });
  
  const averageScore = Math.round(totalScore / scores.length);
  
  let status: 'healthy' | 'warning' | 'critical' = 'healthy';
  if (criticalCount > 0) status = 'critical';
  else if (warningCount > 0) status = 'warning';
  
  return { status, issues, averageScore };
}

/**
 * Analisa métricas de negócio
 */
export function analyzeBusinessMetrics(metrics: BusinessMetrics): {
  status: 'healthy' | 'warning' | 'critical';
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let criticalCount = 0;
  let warningCount = 0;
  
  // Analisa Bounce Rate (menor é melhor)
  const bounceRateStatus = isMetricHealthy(metrics.bounceRate, PERFORMANCE_THRESHOLDS.business.bounceRate);
  if (bounceRateStatus === 'critical') {
    issues.push(`Taxa de rejeição muito alta: ${metrics.bounceRate}%`);
    recommendations.push('Melhorar conteúdo da página inicial para engajar visitantes');
    criticalCount++;
  } else if (bounceRateStatus === 'warning') {
    issues.push(`Taxa de rejeição alta: ${metrics.bounceRate}%`);
    recommendations.push('Revisar UX da página inicial');
    warningCount++;
  }
  
  // Analisa Session Duration (maior é melhor)
  const sessionDurationStatus = isMetricHealthy(metrics.sessionDuration, PERFORMANCE_THRESHOLDS.business.sessionDuration);
  if (sessionDurationStatus === 'critical') {
    issues.push(`Tempo de sessão muito baixo: ${metrics.sessionDuration}s`);
    recommendations.push('Adicionar mais conteúdo relevante e interativo');
    criticalCount++;
  } else if (sessionDurationStatus === 'warning') {
    issues.push(`Tempo de sessão baixo: ${metrics.sessionDuration}s`);
    recommendations.push('Melhorar navegação e conteúdo');
    warningCount++;
  }
  
  // Analisa Pages per Session (maior é melhor)
  const pagesPerSessionStatus = isMetricHealthy(metrics.pagesPerSession, PERFORMANCE_THRESHOLDS.business.pagesPerSession);
  if (pagesPerSessionStatus === 'critical') {
    issues.push(`Páginas por sessão muito baixo: ${metrics.pagesPerSession}`);
    recommendations.push('Adicionar mais páginas relevantes e melhorar navegação');
    criticalCount++;
  } else if (pagesPerSessionStatus === 'warning') {
    issues.push(`Páginas por sessão baixo: ${metrics.pagesPerSession}`);
    recommendations.push('Melhorar links internos e call-to-actions');
    warningCount++;
  }
  
  // Analisa Conversion Rate (maior é melhor)
  const conversionRateStatus = isMetricHealthy(metrics.conversionRate, PERFORMANCE_THRESHOLDS.business.conversionRate);
  if (conversionRateStatus === 'critical') {
    issues.push(`Taxa de conversão muito baixa: ${metrics.conversionRate}%`);
    recommendations.push('Revisar formulários de contato e CTAs');
    criticalCount++;
  } else if (conversionRateStatus === 'warning') {
    issues.push(`Taxa de conversão baixa: ${metrics.conversionRate}%`);
    recommendations.push('Otimizar formulários e adicionar mais CTAs');
    warningCount++;
  }
  
  let status: 'healthy' | 'warning' | 'critical' = 'healthy';
  if (criticalCount > 0) status = 'critical';
  else if (warningCount > 0) status = 'warning';
  
  return { status, issues, recommendations };
}

// ==========================================
// FERRAMENTAS DE OTIMIZAÇÃO
// ==========================================

/**
 * Gera relatório de performance completo
 */
export function generatePerformanceReport(
  coreWebVitals: CoreWebVitals,
  qualityMetrics: QualityMetrics,
  businessMetrics: BusinessMetrics
): {
  overallStatus: 'healthy' | 'warning' | 'critical';
  summary: string;
  details: {
    coreWebVitals: ReturnType<typeof analyzeCoreWebVitals>;
    lighthouse: ReturnType<typeof analyzeLighthouseMetrics>;
    business: ReturnType<typeof analyzeBusinessMetrics>;
  };
  recommendations: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
} {
  const cwvAnalysis = analyzeCoreWebVitals(coreWebVitals);
  const lighthouseAnalysis = analyzeLighthouseMetrics(qualityMetrics);
  const businessAnalysis = analyzeBusinessMetrics(businessMetrics);
  
  // Determina status geral
  const statuses = [cwvAnalysis.status, lighthouseAnalysis.status, businessAnalysis.status];
  const criticalCount = statuses.filter(s => s === 'critical').length;
  const warningCount = statuses.filter(s => s === 'warning').length;
  
  let overallStatus: 'healthy' | 'warning' | 'critical' = 'healthy';
  if (criticalCount > 0) overallStatus = 'critical';
  else if (warningCount > 0) overallStatus = 'warning';
  
  // Gera resumo
  let summary = '';
  if (overallStatus === 'healthy') {
    summary = '✅ Performance excelente! Todos os indicadores estão dentro dos parâmetros ideais.';
  } else if (overallStatus === 'warning') {
    summary = '⚠️ Performance boa, mas há oportunidades de melhoria identificadas.';
  } else {
    summary = '🚨 Performance crítica! Ação imediata necessária para melhorar indicadores.';
  }
  
  // Coleta todas as recomendações
  const allRecommendations = [
    ...businessAnalysis.recommendations,
    ...cwvAnalysis.issues.map(issue => `Otimizar: ${issue}`),
    ...lighthouseAnalysis.issues.map(issue => `Corrigir: ${issue}`)
  ];
  
  // Determina prioridade
  let priority: 'low' | 'medium' | 'high' | 'critical' = 'low';
  if (criticalCount >= 2) priority = 'critical';
  else if (criticalCount === 1) priority = 'high';
  else if (warningCount >= 2) priority = 'medium';
  
  return {
    overallStatus,
    summary,
    details: {
      coreWebVitals: cwvAnalysis,
      lighthouse: lighthouseAnalysis,
      business: businessAnalysis
    },
    recommendations: allRecommendations,
    priority
  };
}

/**
 * Sugere otimizações baseadas em métricas
 */
export function suggestOptimizations(
  coreWebVitals: CoreWebVitals,
  qualityMetrics: QualityMetrics
): string[] {
  const suggestions: string[] = [];
  
  // Sugestões baseadas em LCP
  if (coreWebVitals.lcp > PERFORMANCE_THRESHOLDS.coreWebVitals.lcp.target) {
    suggestions.push('Otimizar imagens para WebP e implementar lazy loading');
    suggestions.push('Considerar CDN para assets estáticos');
    suggestions.push('Implementar preload para recursos críticos');
  }
  
  // Sugestões baseadas em FID
  if (coreWebVitals.fid > PERFORMANCE_THRESHOLDS.coreWebVitals.fid.target) {
    suggestions.push('Reduzir JavaScript não crítico');
    suggestions.push('Implementar code splitting');
    suggestions.push('Otimizar event listeners');
  }
  
  // Sugestões baseadas em CLS
  if (coreWebVitals.cls > PERFORMANCE_THRESHOLDS.coreWebVitals.cls.target) {
    suggestions.push('Definir dimensões explícitas para imagens');
    suggestions.push('Evitar inserção dinâmica de conteúdo acima do fold');
    suggestions.push('Usar font-display: swap para fontes');
  }
  
  // Sugestões baseadas em Lighthouse
  if (qualityMetrics.lighthousePerformance < PERFORMANCE_THRESHOLDS.lighthouse.performance.target) {
    suggestions.push('Minificar CSS, JS e HTML');
    suggestions.push('Remover recursos não utilizados');
    suggestions.push('Otimizar ordem de carregamento');
  }
  
  if (qualityMetrics.lighthouseAccessibility < PERFORMANCE_THRESHOLDS.lighthouse.accessibility.target) {
    suggestions.push('Adicionar alt text em todas as imagens');
    suggestions.push('Melhorar contraste de cores');
    suggestions.push('Implementar navegação por teclado');
  }
  
  if (qualityMetrics.lighthouseSEO < PERFORMANCE_THRESHOLDS.lighthouse.seo.target) {
    suggestions.push('Adicionar meta tags completas');
    suggestions.push('Implementar structured data');
    suggestions.push('Otimizar títulos e descrições');
  }
  
  return suggestions;
}

// ==========================================
// INTEGRAÇÃO COM IA
// ==========================================

/**
 * Gera contexto para IA sobre performance
 */
export function getPerformanceContext(): {
  thresholds: typeof PERFORMANCE_THRESHOLDS;
  currentMetrics?: {
    coreWebVitals: CoreWebVitals;
    qualityMetrics: QualityMetrics;
    businessMetrics: BusinessMetrics;
  };
  recommendations: string[];
} {
  return {
    thresholds: PERFORMANCE_THRESHOLDS,
    recommendations: [
      'Sempre verificar Core Web Vitals antes de deploy',
      'Monitorar métricas de negócio semanalmente',
      'Implementar alertas para degradação de performance',
      'Manter bundle size abaixo de 500KB',
      'Otimizar imagens automaticamente no build',
      'Usar lazy loading para componentes não críticos'
    ]
  };
}

/**
 * Valida se uma mudança pode impactar performance
 */
export function validatePerformanceImpact(
  changeType: 'component' | 'page' | 'feature' | 'dependency',
  changeDescription: string
): {
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  metricsToMonitor: string[];
} {
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  const recommendations: string[] = [];
  const metricsToMonitor: string[] = [];
  
  switch (changeType) {
    case 'component':
      if (changeDescription.includes('image') || changeDescription.includes('carousel')) {
        riskLevel = 'medium';
        recommendations.push('Implementar lazy loading para imagens');
        recommendations.push('Otimizar imagens para WebP');
        metricsToMonitor.push('LCP', 'CLS');
      }
      break;
      
    case 'page':
      riskLevel = 'medium';
      recommendations.push('Verificar Core Web Vitals após deploy');
      recommendations.push('Monitorar tempo de carregamento');
      metricsToMonitor.push('FCP', 'LCP', 'TTI');
      break;
      
    case 'feature':
      if (changeDescription.includes('calculation') || changeDescription.includes('form')) {
        riskLevel = 'low';
        recommendations.push('Otimizar cálculos para evitar bloqueio');
        metricsToMonitor.push('FID');
      }
      break;
      
    case 'dependency':
      riskLevel = 'high';
      recommendations.push('Verificar impacto no bundle size');
      recommendations.push('Testar performance antes e depois');
      metricsToMonitor.push('Bundle Size', 'FCP', 'LCP');
      break;
  }
  
  return { riskLevel, recommendations, metricsToMonitor };
}

export type {
  CoreWebVitals,
  QualityMetrics,
  BusinessMetrics
}; 