/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Strict monochrome system — no hue anywhere. Every "accent" is
        // expressed through weight, opacity, fill vs. outline, never color.
        black: {
          DEFAULT: '#000000',
        },
        surface: {
          0: '#000000', // page background
          1: '#0a0a0a', // card / panel background
          2: '#121212', // nested / hovered surface
          3: '#1a1a1a', // topmost elevated surface (modals, popovers)
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.16)',
          subtle: 'rgba(255,255,255,0.05)',
        },
        ink: {
          DEFAULT: '#ffffff', // primary text — pure white
          secondary: 'rgba(255,255,255,0.64)',
          tertiary: 'rgba(255,255,255,0.40)',
          disabled: 'rgba(255,255,255,0.24)',
        },
      },
      spacing: {
        // Tailwind's default scale only has .5/1.5/2.5/3.5 fractional
        // steps; several components use 4.5 / 5.5 for finer control, so
        // extend the scale rather than hunting every call site.
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '22px',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
}
