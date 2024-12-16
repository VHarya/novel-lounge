import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1680px',
        '3xl': '1920px',
      },
      colors: {
        'background': '#1A1A1A',
        'background-alt': '#222222',
        'foreground': '#2F2F2F',
        'foreground-alt': '#252525',
        'accent': '#219EBC',
      },
      fontFamily: {
        'inter': 'inter, sans-serif',
        'joan': 'joan, serif',
        'lexend': 'Lexend, serif'
      }
    }
  },

  plugins: [forms]
} satisfies Config;
