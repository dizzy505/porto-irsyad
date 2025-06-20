/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scrollbar: {
        DEFAULT: {
          size: '8px',
          track: 'transparent',
          thumb: '#4B5563',
          hover: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        accent: {
          DEFAULT: '#7c3aed', // purple
          light: '#a78bfa',
          dark: '#4c1d95',
        },
        gradientFrom: '#2563eb', // blue-600
        gradientTo: '#7c3aed',   // purple-600
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      },
    },
  },
  plugins: [],
};
