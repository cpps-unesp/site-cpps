import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2197C5',       // Azul principal
        secondary: '#347D9B',     // Azul secundário
        accent: '#00ACF0',        // Azul claro para destaques
        neutral: '#2E3F46',       // Cinza azulado neutro
        'base-100': '#ffffff',    // Fundo claro
        'base-200': '#f1f5f9',    // Fundo secundário
        'base-content': '#1f2937' // Cor do texto padrão
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'] // Fonte padrão
      }
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        cpps: {
          primary: '#2197C5',
          secondary: '#347D9B',
          accent: '#00ACF0',
          neutral: '#2E3F46',
          'base-100': '#ffffff',
          'base-200': '#f1f5f9',
          'base-content': '#1f2937'
        }
      },
    ]
  }
};

export default config;
