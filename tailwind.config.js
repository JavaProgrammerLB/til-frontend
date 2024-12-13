/** @type {import('tailwindcss').Config} */
export const mode = 'jit';
export const content = ['./src/**/*.{html,ts}'];
export const theme = {
  extend: {
    typography: ({ theme }) => ({
      custom: {
        css: {
          '--tw-prose-headings': theme('colors.typography.primary'),
          '--tw-prose-links': theme('colors.sky.800'),
          '--tw-prose-bold': theme('colors.typography.primary'),
        },
      },
    }),
    screens: {
      xs: '375px',
    },
    borderWidth: {
      1: '1px',
    },
    colors: {
      divider: 'var(--divider)',
      typography: {
        primary: 'var(--typography-primary)',
      },
    },
  },
};
export const daisyui = {
  themes: [
    {
    },
  ],
};
export const plugins = [require('@tailwindcss/typography'), require('daisyui')];
