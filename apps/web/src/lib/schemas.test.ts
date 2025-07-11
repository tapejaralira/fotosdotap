/**
 * Testes Automatizados dos Schemas Zod
 * 
 * Este arquivo centraliza todos os testes dos schemas Zod para garantir
 * robustez da validação de dados e facilitar manutenção assistida por IA.
 * 
 * @fileoverview Testes automatizados para validação de schemas
 * @author Fotos do Tap
 * @version 1.0.0
 */

import { describe, it, expect } from 'vitest';
import {
  PackageSchema,
  ExtraPricingSchema,
  ExtraCalculationInputSchema,
  CarouselSchema,
  HeroSchema,
  type Package,
  type ExtraPricing,
  type ExtraCalculationInput,
  type Carousel,
  type Hero,
  PACKAGES,
  DEFAULT_EXTRA_PRICING,
  HOME_CAROUSEL,
  HOME_HERO,
} from './schemas';

describe('Schema Validation Tests', () => {
  // === PACKAGE SCHEMA TESTS ===
  describe('PackageSchema', () => {
    it('should validate a complete valid package', () => {
      const validPackage = {
        id: 'wedding-complete',
        title: 'Casamento Completo',
        description: 'Cobertura completa do seu grande dia com pós-produção.',
        price: 3500,
        features: ['8h de cobertura', '300 fotos tratadas', 'Álbum físico'],
        image: 'https://example.com/wedding.webp',
        highlighted: true
      };

      const result = PackageSchema.safeParse(validPackage);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Casamento Completo');
        expect(result.data.features).toHaveLength(3);
        expect(result.data.highlighted).toBe(true);
      }
    });

    it('should validate package with default highlighted value', () => {
      const packageWithoutHighlighted = {
        id: 'basic',
        title: 'Básico',
        description: 'Pacote básico para eventos pequenos',
        price: 1000,
        image: 'https://example.com/basic.webp',
        features: ['2h cobertura', '50 fotos']
      };

      const result = PackageSchema.safeParse(packageWithoutHighlighted);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.highlighted).toBe(false); // default value
      }
    });

    it('should reject invalid price types', () => {
      const invalidPackage = {
        id: 'test',
        title: 'Test',
        description: 'Test package',
        price: '1000', // string instead of number
        image: 'https://example.com/test.webp',
        features: ['test']
      };

      const result = PackageSchema.safeParse(invalidPackage);
      expect(result.success).toBe(false);
    });

    it('should reject negative prices', () => {
      const invalidPackage = {
        id: 'test',
        title: 'Test',
        description: 'Test package',
        price: -100,
        image: 'https://example.com/test.webp',
        features: ['test']
      };

      const result = PackageSchema.safeParse(invalidPackage);
      expect(result.success).toBe(false);
    });

    it('should reject empty features array', () => {
      const invalidPackage = {
        id: 'test',
        title: 'Test',
        description: 'Test package',
        price: 1000,
        image: 'https://example.com/test.webp',
        features: []
      };

      const result = PackageSchema.safeParse(invalidPackage);
      expect(result.success).toBe(false);
    });

    it('should reject invalid image URL', () => {
      const invalidPackage = {
        id: 'test',
        title: 'Test',
        description: 'Test package',
        price: 1000,
        image: 'not-a-url',
        features: ['test']
      };

      const result = PackageSchema.safeParse(invalidPackage);
      expect(result.success).toBe(false);
    });
  });

  // === HERO SCHEMA TESTS ===
  describe('HeroSchema', () => {
    it('should validate complete hero data', () => {
      const validHero = {
        title: 'Fotos do Tap',
        subtitle: 'Fotografia autoral que eterniza momentos únicos',
        className: 'hero-custom'
      };

      const result = HeroSchema.safeParse(validHero);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Fotos do Tap');
        expect(result.data.className).toBe('hero-custom');
      }
    });

    it('should validate hero without optional className', () => {
      const minimalHero = {
        title: 'Fotos do Tap',
        subtitle: 'Momentos únicos eternizados'
      };

      const result = HeroSchema.safeParse(minimalHero);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.className).toBeUndefined();
      }
    });

    it('should reject empty title', () => {
      const invalidHero = {
        title: '',
        subtitle: 'Valid subtitle'
      };

      const result = HeroSchema.safeParse(invalidHero);
      expect(result.success).toBe(false);
    });

    it('should reject missing subtitle', () => {
      const invalidHero = {
        title: 'Valid title'
      };

      const result = HeroSchema.safeParse(invalidHero);
      expect(result.success).toBe(false);
    });
  });

  // === CAROUSEL SCHEMA TESTS ===
  describe('CarouselSchema', () => {
    it('should validate complete carousel', () => {
      const validCarousel = {
        images: [
          { src: 'https://example.com/1.webp', alt: 'Foto 1', index: 0 },
          { src: 'https://example.com/2.webp', alt: 'Foto 2', index: 1 },
          { src: 'https://example.com/3.webp', alt: 'Foto 3', index: 2 }
        ],
        autoPlay: true,
        autoPlayInterval: 3000
      };

      const result = CarouselSchema.safeParse(validCarousel);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.images).toHaveLength(3);
        expect(result.data.autoPlayInterval).toBe(3000);
      }
    });

    it('should use default values', () => {
      const minimalCarousel = {
        images: [
          { src: 'https://example.com/1.webp', alt: 'Foto 1', index: 0 },
          { src: 'https://example.com/2.webp', alt: 'Foto 2', index: 1 }
        ]
      };

      const result = CarouselSchema.safeParse(minimalCarousel);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.autoPlay).toBe(true); // default
        expect(result.data.autoPlayInterval).toBe(5000); // default
      }
    });

    it('should reject negative index', () => {
      const invalidCarousel = {
        images: [
          { src: 'https://example.com/1.webp', alt: 'Foto 1', index: -1 }
        ]
      };

      const result = CarouselSchema.safeParse(invalidCarousel);
      expect(result.success).toBe(false);
    });

    it('should reject invalid image URL', () => {
      const invalidCarousel = {
        images: [
          { src: 'not-a-url', alt: 'Foto 1', index: 0 }
        ]
      };

      const result = CarouselSchema.safeParse(invalidCarousel);
      expect(result.success).toBe(false);
    });
  });

  // === EXTRA PRICING SCHEMA TESTS ===
  describe('ExtraPricingSchema', () => {
    it('should validate complete pricing configuration', () => {
      const validPricing = {
        basicUp5: 15,
        basicOver5: 12,
        premiumUp5: 20,
        premiumOver5: 15
      };

      const result = ExtraPricingSchema.safeParse(validPricing);
      expect(result.success).toBe(true);
    });

    it('should reject negative prices', () => {
      const invalidPricing = {
        basicUp5: -15,
        basicOver5: 12,
        premiumUp5: 20,
        premiumOver5: 15
      };

      const result = ExtraPricingSchema.safeParse(invalidPricing);
      expect(result.success).toBe(false);
    });

    it('should reject zero prices', () => {
      const invalidPricing = {
        basicUp5: 0,
        basicOver5: 12,
        premiumUp5: 20,
        premiumOver5: 15
      };

      const result = ExtraPricingSchema.safeParse(invalidPricing);
      expect(result.success).toBe(false);
    });
  });

  // === EXTRA CALCULATION INPUT SCHEMA TESTS ===
  describe('ExtraCalculationInputSchema', () => {
    it('should validate basic package type', () => {
      const validInput = {
        packageType: 'basic' as const,
        extraPhotos: 10
      };

      const result = ExtraCalculationInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should validate premium package type', () => {
      const validInput = {
        packageType: 'premium' as const,
        extraPhotos: 25
      };

      const result = ExtraCalculationInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject invalid package type', () => {
      const invalidInput = {
        packageType: 'invalid',
        extraPhotos: 10
      };

      const result = ExtraCalculationInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject negative extra photos', () => {
      const invalidInput = {
        packageType: 'basic' as const,
        extraPhotos: -5
      };

      const result = ExtraCalculationInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject too many extra photos', () => {
      const invalidInput = {
        packageType: 'basic' as const,
        extraPhotos: 1000
      };

      const result = ExtraCalculationInputSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  // === DATA VALIDATION TESTS ===
  describe('Predefined Data Validation', () => {
    it('should validate all PACKAGES data', () => {
      PACKAGES.forEach((pkg, index) => {
        const result = PackageSchema.safeParse(pkg);
        expect(result.success).toBe(true);
        if (!result.success) {
          console.error(`Package ${index} failed validation:`, result.error);
        }
      });
    });

    it('should validate DEFAULT_EXTRA_PRICING data', () => {
      const result = ExtraPricingSchema.safeParse(DEFAULT_EXTRA_PRICING);
      expect(result.success).toBe(true);
    });

    it('should validate HOME_CAROUSEL data', () => {
      const result = CarouselSchema.safeParse(HOME_CAROUSEL);
      expect(result.success).toBe(true);
    });

    it('should validate HOME_HERO data', () => {
      const result = HeroSchema.safeParse(HOME_HERO);
      expect(result.success).toBe(true);
    });
  });

  // === TYPE INFERENCE TESTS ===
  describe('Type Inference Tests', () => {
    it('should properly infer Package type from schema', () => {
      const package1: Package = {
        id: 'test',
        title: 'Test Package',
        description: 'A test package for validation',
        price: 1000,
        image: 'https://example.com/test.webp',
        features: ['feature1'],
        highlighted: true
      };

      // This should compile without errors, proving type inference works
      expect(package1.id).toBe('test');
      expect(package1.features).toHaveLength(1);
      expect(package1.highlighted).toBe(true);
    });

    it('should properly infer Hero type from schema', () => {
      const hero1: Hero = {
        title: 'Test Hero',
        subtitle: 'Test subtitle'
      };

      // This should compile without errors, proving type inference works
      expect(hero1.title).toBe('Test Hero');
      expect(hero1.subtitle).toBe('Test subtitle');
    });

    it('should properly infer ExtraCalculationInput type', () => {
      const input: ExtraCalculationInput = {
        packageType: 'premium',
        extraPhotos: 15
      };

      expect(input.packageType).toBe('premium');
      expect(input.extraPhotos).toBe(15);
    });
  });

  // === EDGE CASES TESTS ===
  describe('Edge Cases', () => {
    it('should handle maximum numeric values', () => {
      const expensivePackage = {
        id: 'premium',
        title: 'Premium',
        description: 'Most expensive package',
        price: Number.MAX_SAFE_INTEGER,
        image: 'https://example.com/premium.webp',
        features: ['everything'],
        highlighted: false
      };

      const result = PackageSchema.safeParse(expensivePackage);
      expect(result.success).toBe(true);
    });

    it('should handle special characters in strings', () => {
      const packageWithSpecialChars = {
        id: 'special-chars',
        title: 'Pacote Açaí & Café ñ 100%',
        description: 'Descrição com ácéntos é çãràctères especiais',
        price: 500,
        image: 'https://example.com/special.webp',
        features: ['Características únicas'],
        highlighted: true
      };

      const result = PackageSchema.safeParse(packageWithSpecialChars);
      expect(result.success).toBe(true);
    });

    it('should handle very long valid URLs', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000) + '.webp';
      const carousel = {
        images: [
          { src: longUrl, alt: 'Long URL test', index: 0 }
        ]
      };

      const result = CarouselSchema.safeParse(carousel);
      expect(result.success).toBe(true);
    });
  });
});

/**
 * Test utilities for creating mock data
 */
export const createMockPackage = (overrides: Partial<Package> = {}): Package => ({
  id: 'mock-package',
  title: 'Mock Package',
  description: 'A mock package for testing',
  price: 1000,
  image: 'https://example.com/mock.webp',
  features: ['mock feature'],
  highlighted: false,
  ...overrides
});

export const createMockHero = (overrides: Partial<Hero> = {}): Hero => ({
  title: 'Mock Hero',
  subtitle: 'Mock subtitle',
  ...overrides
});

export const createMockCarousel = (overrides: Partial<Carousel> = {}): Carousel => ({
  images: [
    { src: 'https://example.com/1.webp', alt: 'Mock 1', index: 0 },
    { src: 'https://example.com/2.webp', alt: 'Mock 2', index: 1 }
  ],
  autoPlay: true,
  autoPlayInterval: 5000,
  ...overrides
});

export const createMockExtraPricing = (overrides: Partial<ExtraPricing> = {}): ExtraPricing => ({
  basicUp5: 15,
  basicOver5: 12,
  premiumUp5: 20,
  premiumOver5: 15,
  ...overrides
});

/**
 * Batch validation utility for testing multiple records
 */
export const validateBatch = <T>(
  schema: { safeParse: (item: unknown) => { success: boolean; data?: T } },
  items: unknown[]
): { valid: T[]; invalid: unknown[] } => {
  const valid: T[] = [];
  const invalid: unknown[] = [];

  items.forEach(item => {
    const result = schema.safeParse(item);
    if (result.success && result.data) {
      valid.push(result.data);
    } else {
      invalid.push(item);
    }
  });

  return { valid, invalid };
};
