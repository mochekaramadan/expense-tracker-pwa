/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eff6ff',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          },
          success: {
            500: '#10b981',
            600: '#059669',
          },
          danger: {
            500: '#ef4444',
            600: '#dc2626',
          }
        },
        animation: {
          'slide-up': 'slideUp 0.3s ease-out',
          'fade-in': 'fadeIn 0.2s ease-in',
          'bounce-in': 'bounceIn 0.5s ease-out',
        },
        keyframes: {
          slideUp: {
            '0%': { transform: 'translateY(100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          bounceIn: {
            '0%': { transform: 'scale(0.3)', opacity: '0' },
            '50%': { transform: 'scale(1.05)' },
            '70%': { transform: 'scale(0.9)' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          }
        }
      },
    },
    plugins: [],
  }