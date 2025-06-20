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
    },
  },
  plugins: [],
};
