module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  // Theme toggle SVG/icon sizing and dynamic knob-position classes are injected from
  // public/scripts/theme-toggle.js, which Tailwind does not scan
  safelist: ['w-5', 'h-5', 'justify-center', 'justify-end'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              backgroundColor: '#f1f5f9',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              color: '#0f172a',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#0f172a',
              color: '#e2e8f0',
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
            },
            pre: {
              backgroundColor: '#0b1220',
              color: '#cbd5e1',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
