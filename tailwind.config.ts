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
        'background-alt': '#1F1F1F',
        'foreground': '#2F2F2F',
        'foreground-alt': '#282828',
        'accent': '#18748C',
        'success': '#059669',
        'warning': '#d97706',
        'error': '#b91c1c',
      },
      fontFamily: {
        'ibm': '"IBM Plex Sans", sans-serif',
        'lexend': '"Lexend Deca", sans-serif',
      }
    },
    typography: ({ theme }) => ({
      default: {
        css: {
          '--tw-prose-body': theme('colors.white'),
          '--tw-prose-headings': theme('colors.white'),
          '--tw-prose-lead': theme('colors.white'),
          '--tw-prose-links': theme('colors.white'),
          '--tw-prose-bold': theme('colors.white'),
          '--tw-prose-counters': theme('colors.white'),
          '--tw-prose-bullets': theme('colors.white'),
          '--tw-prose-hr': theme('colors.white'),
          '--tw-prose-quotes': theme('colors.white'),
          '--tw-prose-quote-borders': theme('colors.white'),
          '--tw-prose-captions': theme('colors.white'),
          '--tw-prose-code': theme('colors.white'),
          '--tw-prose-pre-code': theme('colors.white'),
          '--tw-prose-pre-bg': theme('colors.white'),
          '--tw-prose-th-borders': theme('colors.white'),
          '--tw-prose-td-borders': theme('colors.white'),
          '--tw-prose-invert-body': theme('colors.white'),
          '--tw-prose-invert-headings': theme('colors.white'),
          '--tw-prose-invert-lead': theme('colors.white'),
          '--tw-prose-invert-links': theme('colors.white'),
          '--tw-prose-invert-bold': theme('colors.white'),
          '--tw-prose-invert-counters': theme('colors.white'),
          '--tw-prose-invert-bullets': theme('colors.white'),
          '--tw-prose-invert-hr': theme('colors.white'),
          '--tw-prose-invert-quotes': theme('colors.white'),
          '--tw-prose-invert-quote-borders': theme('colors.white'),
          '--tw-prose-invert-captions': theme('colors.white'),
          '--tw-prose-invert-code': theme('colors.white'),
          '--tw-prose-invert-pre-code': theme('colors.white'),
          '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
          '--tw-prose-invert-th-borders': theme('colors.white'),
          '--tw-prose-invert-td-borders': theme('colors.white'),
        },
      },
    }),
  },

  plugins: [
    forms,
    require('@tailwindcss/typography'),
  ]
} satisfies Config;
