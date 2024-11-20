/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        'extension-width': '23rem',
      },
      maxWidth: {
        'extension-width': '23rem',
      },
      maxHeight: {
        'extension-height': '35rem',
      },
      height: {
        'extension-height': '35rem',
      },
      backgroundImage: {
        'extension-background-gradient':
          'conic-gradient(from 200deg, #10101a,#1c1c2e)',
      },
      backgroundColor: {
        solution: '#2f7d31',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'hint-size': '24px',
        'heading-size': '36px',
        'tagline-size': '15px',
        'focusmode-size': '17px',
        'footer-size-left': '11px',
        'footer-size-right': '14px',
      },
      colors: {
        'heading-gradient': {
          start: '#4A90E2',
          end: '#50E3C2',
        },
        'tagline-color': '#C3C8D4',
        hint: {
          locked: 'crimson',
          unlocked: '#2E3856',
        },
        'footer-color': {
          left: '#8A8F98',
          right: '#C7C7C7',
        },
        'response-color': '#1c1c2e',
      },
      scale: {
        'hint-scale': '1.03',
      },
    },
  },
  plugins: [],
};
