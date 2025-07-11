/**
 * @file Calculadora para fotos extras dos pacotes.
 * @author Fotos do Tap
 * @see /frontend/static/js/calculadoraExtras.js
 * @see /frontend/www/pacotes.html
 */

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { 
  PackageType, 
  ExtraCalculationInput, 
  ExtraCalculationResult,
  ExtraCalculationInputSchema,
  ExtraCalculationResultSchema,
  DEFAULT_EXTRA_PRICING 
} from '@/lib/schemas';

/**
 * Define as propriedades do componente CalculadoraExtras.
 * @interface CalculadoraExtrasProps
 * @property {string} [className] - Classes CSS adicionais para customização
 */
interface CalculadoraExtrasProps {
  className?: string;
}

/**
 * Calcula o preço total para fotos extras baseado no tipo de pacote e quantidade.
 * Usa validação Zod para garantir entrada e saída corretas.
 * 
 * @param {ExtraCalculationInput} input - Dados de entrada validados pelo schema
 * @returns {ExtraCalculationResult} Resultado do cálculo validado pelo schema
 */
const calcularPreco = (input: ExtraCalculationInput): ExtraCalculationResult => {
  // Valida entrada com schema Zod
  const validInput = ExtraCalculationInputSchema.parse(input);
  
  const { packageType, extraPhotos } = validInput;
  const pricing = DEFAULT_EXTRA_PRICING;
  
  let up5Photos = 0;
  let over5Photos = 0;
  let up5Price = 0;
  let over5Price = 0;
  
  // Define preços baseado no tipo de pacote
  if (packageType === 'basic') {
    up5Price = pricing.basicUp5;
    over5Price = pricing.basicOver5;
  } else {
    up5Price = pricing.premiumUp5;
    over5Price = pricing.premiumOver5;
  }
  
  // Calcula distribuição das fotos por faixa de preço
  if (extraPhotos <= 5) {
    up5Photos = extraPhotos;
    over5Photos = 0;
  } else {
    up5Photos = 5;
    over5Photos = extraPhotos - 5;
  }
  
  const up5Subtotal = up5Photos * up5Price;
  const over5Subtotal = over5Photos * over5Price;
  const totalPrice = up5Subtotal + over5Subtotal;
  
  // Constrói resultado e valida com schema Zod
  const result: ExtraCalculationResult = {
    totalExtras: extraPhotos,
    totalPrice,
    breakdown: {
      up5Photos,
      up5Price,
      up5Subtotal,
      over5Photos,
      over5Price,
      over5Subtotal,
    },
  };
  
  // Valida saída com schema Zod
  return ExtraCalculationResultSchema.parse(result);
};

/**
 * Componente Calculadora para fotos extras dos pacotes.
 * Permite ao usuário calcular o custo adicional de fotos extras
 * baseado no tipo de pacote selecionado.
 * 
 * Características:
 * - Validação de entrada com schemas Zod
 * - Cálculo automático conforme usuario digita
 * - Exibição detalhada do breakdown de preços
 * - Design responsivo mobile-first
 * - Formatação monetária brasileira
 *
 * @component
 * @param {CalculadoraExtrasProps} props - As propriedades do componente
 * @returns {React.ReactElement} O elemento calculadora renderizado
 * 
 * @example
 * ```tsx
 * <CalculadoraExtras className="mt-8" />
 * ```
 */
export const CalculadoraExtras: React.FC<CalculadoraExtrasProps> = ({ 
  className 
}) => {
  const [packageType, setPackageType] = useState<PackageType>('basic');
  const [extraPhotos, setExtraPhotos] = useState<number>(0);
  const [result, setResult] = useState<ExtraCalculationResult | null>(null);

  /**
   * Atualiza o cálculo sempre que os inputs mudam.
   * Usa useCallback para otimização de performance.
   */
  const updateCalculation = useCallback(() => {
    if (extraPhotos > 0) {
      try {
        const input: ExtraCalculationInput = { packageType, extraPhotos };
        const calculationResult = calcularPreco(input);
        setResult(calculationResult);
      } catch (error) {
        console.error('Erro no cálculo:', error);
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [packageType, extraPhotos]);

  // Executa cálculo sempre que inputs mudam
  React.useEffect(() => {
    updateCalculation();
  }, [updateCalculation]);

  /**
   * Formata valor em moeda brasileira.
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className={cn(
      "bg-card rounded-card shadow-sombra p-espacamento-card",
      "max-w-md w-full mx-auto",
      className
    )}>
      {/* Título */}
      <h3 className="text-xl font-bold text-primary mb-4 text-center">
        Calculadora de Fotos Extras
      </h3>

      {/* Seleção do tipo de pacote */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Tipo de Pacote:
        </label>
        <select
          value={packageType}
          onChange={(e) => setPackageType(e.target.value as PackageType)}
          className="w-full px-3 py-2 border border-border rounded-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="basic">Pacote Flexível (Básico)</option>
          <option value="premium">Pacote Completo (Premium)</option>
        </select>
      </div>

      {/* Input de quantidade de fotos */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Quantidade de Fotos Extras:
        </label>
        <input
          type="number"
          min="0"
          max="999"
          value={extraPhotos}
          onChange={(e) => setExtraPhotos(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Ex: 10"
        />
      </div>

      {/* Resultado do cálculo */}
      {result && (
        <div className="mt-6 p-4 bg-primary/5 rounded-input border border-primary/20">
          <h4 className="font-semibold text-primary mb-3">
            Detalhes do Cálculo:
          </h4>
          
          {/* Breakdown detalhado */}
          <div className="space-y-2 text-sm">
            {result.breakdown.up5Photos > 0 && (
              <div className="flex justify-between">
                <span>
                  {result.breakdown.up5Photos} foto(s) × {formatCurrency(result.breakdown.up5Price)}
                </span>
                <span className="font-medium">
                  {formatCurrency(result.breakdown.up5Subtotal)}
                </span>
              </div>
            )}
            
            {result.breakdown.over5Photos > 0 && (
              <div className="flex justify-between">
                <span>
                  {result.breakdown.over5Photos} foto(s) × {formatCurrency(result.breakdown.over5Price)}
                </span>
                <span className="font-medium">
                  {formatCurrency(result.breakdown.over5Subtotal)}
                </span>
              </div>
            )}
            
            <div className="border-t border-primary/20 pt-2 mt-3">
              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Total:</span>
                <span>{formatCurrency(result.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensagem quando não há fotos extras */}
      {extraPhotos === 0 && (
        <div className="mt-6 p-4 bg-muted rounded-input text-center text-muted-foreground">
          Digite a quantidade de fotos extras para ver o preço
        </div>
      )}
    </div>
  );
};
