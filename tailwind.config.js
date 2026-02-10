/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    './components/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    './layouts/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2197C5',
        secondary: '#347D9B',
        accent: '#00ACF0',
        neutral: '#2E3F46',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Lovelo', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
};
