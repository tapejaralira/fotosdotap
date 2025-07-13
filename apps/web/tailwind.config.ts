import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import { DESIGN_SYSTEM } from './src/lib/schemas'

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // === CORES DA FONTE ÚNICA DA VERDADE (Schema Zod) ===
        'cor-primaria': DESIGN_SYSTEM.colors.primaria,
        'cor-secundaria': DESIGN_SYSTEM.colors.secundaria, 
        'cor-texto': DESIGN_SYSTEM.colors.texto,
        'cor-destaque': DESIGN_SYSTEM.colors.destaque,
        
        // Aliases para compatibilidade com código existente
        'brand': DESIGN_SYSTEM.colors.primaria,
        'neutral': DESIGN_SYSTEM.colors.texto, 
        'highlight': DESIGN_SYSTEM.colors.destaque,
        'page-bg': DESIGN_SYSTEM.colors.secundaria,
        
        // Cores shadcn/ui
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // === ESPAÇAMENTOS DA FONTE ÚNICA DA VERDADE (Schema Zod) ===
      spacing: {
        'espacamento': DESIGN_SYSTEM.spacing.espacamento,
        'espacamento-card': DESIGN_SYSTEM.spacing.espacamentoCard, 
        'espacamento-div': DESIGN_SYSTEM.spacing.espacamentoDiv,
        'espacamento-pequeno': DESIGN_SYSTEM.spacing.espacamentoPequeno,
      },
      
      // Border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)", 
        sm: "calc(var(--radius) - 4px)",
        'input': '0.7rem',
        'card': '1rem',
        'pequeno': '0.5rem',
        'arredondada': '30px',
        'borda-arredondada': '30px',
      },
      
      // === FONTES DA FONTE ÚNICA DA VERDADE (Schema Zod) ===
      fontFamily: {
        'principal': [DESIGN_SYSTEM.typography.principal],
        'titulo': [DESIGN_SYSTEM.typography.titulo],
        sans: [DESIGN_SYSTEM.typography.principal],
        serif: [DESIGN_SYSTEM.typography.titulo],
      },
      
      // Alturas
      height: {
        'header': '80px',
      },
      
      // Larguras máximas  
      maxWidth: {
        'largura-maxima': '1200px',
        'container': '1200px',
      },
      
      // Sombras
      boxShadow: {
        'sombra': '0 4px 8px rgba(10, 10, 10, 0.44)',
      },
      
      // Transições
      transitionDuration: {
        'rapida': '0.2s',
      },
      
      // Blur
      blur: {
        'efeito': '3px',
      },
      
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config
