/**
 * @file Componente Calculadora para calcular preços de fotos extras.
 * @author Fotos do Tap
 * @see /frontend/static/js/calculadoraExtras.js
 * @see /frontend/www/content/pacotes-content.html
 */

"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Define as propriedades do componente Calculadora.
 * @interface CalculadoraProps
 * @property {string} [className] - Classes CSS adicionais para customização.
 */
interface CalculadoraProps {
  className?: string;
}

/**
 * Estrutura de preços para fotos extras baseada no sistema original.
 * @constant
 */
const TABELA_PRECOS = [
  { min: 1, max: 5, preco: 12.00, descricao: "Primeiras 5 fotos" },
  { min: 6, max: 15, preco: 10.00, descricao: "Próximas 10 fotos" },
  { min: 16, max: 30, preco: 8.00, descricao: "Próximas 15 fotos" },
  { min: 31, max: Infinity, preco: 6.00, descricao: "Acima de 30 fotos" },
];

/**
 * Calcula o preço total e detalhes baseado na quantidade de fotos.
 * @param {number} quantidade - Quantidade de fotos extras
 * @returns {ResultadoCalculo} Objeto com total e detalhes do cálculo
 */
const calcularPreco = (quantidade: number): ResultadoCalculo => {
  let total = 0;
  const detalhes: DetalheCalculo[] = [];
  let fotosRestantes = quantidade;

  for (const faixa of TABELA_PRECOS) {
    if (fotosRestantes <= 0) break;

    const fotosNesteFaixa = Math.min(
      fotosRestantes, 
      faixa.max === Infinity ? fotosRestantes : faixa.max - faixa.min + 1
    );
    
    if (fotosNesteFaixa > 0) {
      const subtotal = fotosNesteFaixa * faixa.preco;
      total += subtotal;
      
      detalhes.push({
        descricao: faixa.descricao,
        quantidade: fotosNesteFaixa,
        preco: faixa.preco,
        subtotal
      });
      
      fotosRestantes -= fotosNesteFaixa;
    }
  }

  return { total, detalhes };
};

/**
 * Interface para os detalhes do cálculo de cada faixa de preço.
 */
interface DetalheCalculo {
  descricao: string;
  quantidade: number;
  preco: number;
  subtotal: number;
}

/**
 * Interface para o resultado do cálculo.
 */
interface ResultadoCalculo {
  total: number;
  detalhes: DetalheCalculo[];
}

/**
 * Componente Calculadora para calcular preços de fotos extras.
 * Permite ao usuário inserir uma quantidade e ver o cálculo automático
 * com base na tabela de preços progressivos.
 * 
 * Características:
 * - Cálculo automático em tempo real
 * - Tabela de preços progressivos
 * - Detalhamento do cálculo por faixa de preço
 * - Interface responsiva
 *
 * @component
 * @param {CalculadoraProps} props - As propriedades do componente
 * @returns {React.ReactElement} O elemento calculadora renderizado
 * 
 * @example
 * ```tsx
 * <Calculadora />
 * ```
 */
export const Calculadora: React.FC<CalculadoraProps> = ({ className }) => {
  const [quantidade, setQuantidade] = useState<number>(0);
  const [resultado, setResultado] = useState<ResultadoCalculo>({ total: 0, detalhes: [] });

  // Recalcula quando a quantidade muda
  useEffect(() => {
    if (quantidade >= 0) {
      const novoResultado = calcularPreco(quantidade);
      setResultado(novoResultado);
    }
  }, [quantidade]);

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novaQuantidade = parseInt(e.target.value) || 0;
    setQuantidade(Math.max(0, Math.min(100, novaQuantidade))); // Limita entre 0 e 100
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Input da quantidade */}
      <div>
        <label 
          htmlFor="quantidadeFotos" 
          className="block text-sm font-medium mb-2 text-foreground"
        >
          Quantidade de fotos extras:
        </label>
        <input
          id="quantidadeFotos"
          type="number"
          min="0"
          max="100"
          value={quantidade}
          onChange={handleQuantidadeChange}
          className={cn(
            "w-full px-4 py-2 text-lg",
            "border border-input rounded-md",
            "bg-background text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "transition-colors duration-200"
          )}
          placeholder="Digite a quantidade..."
        />
      </div>

      {/* Detalhes do cálculo */}
      {quantidade > 0 && resultado.detalhes.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-foreground mb-3">Detalhamento:</h4>
          <ul className="space-y-2">
            {resultado.detalhes.map((item, index) => (
              <li key={index} className={cn(
                "flex justify-between items-center",
                "text-sm text-muted-foreground",
                "py-1"
              )}>
                <span>
                  {item.descricao}: {item.quantidade} × R$ {item.preco.toFixed(2)}
                </span>
                <span className="font-medium">
                  R$ {item.subtotal.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Total */}
      <div className={cn(
        "text-center py-4",
        "border-t border-border",
        "bg-primary/5 rounded-md"
      )}>
        <div className={cn(
          "text-2xl md:text-3xl font-bold",
          "text-primary"
        )}>
          Total: R$ {resultado.total.toFixed(2)}
        </div>
        {quantidade > 0 && (
          <div className="text-sm text-muted-foreground mt-1">
            {quantidade} foto{quantidade !== 1 ? 's' : ''} extra{quantidade !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};
