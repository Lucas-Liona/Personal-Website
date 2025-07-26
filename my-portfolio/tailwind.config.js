/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#0891b2", // Cyan-600
        secondary: "#0e7490", // Cyan-700
        dark: "#0f172a", // Slate-900
        light: "#f1f5f9", // Slate-100
      },
      backgroundColor: {
        dark: {
          DEFAULT: '#0f172a', // Slate-900
          '100': '#1e293b', // Slate-800
          '200': '#334155', // Slate-700
          '300': '#475569', // Slate-600
        },
        light: {
          DEFAULT: '#f1f5f9', // Slate-100
          '100': '#f8fafc', // Slate-50
          '200': '#e2e8f0', // Slate-200
          '300': '#cbd5e1', // Slate-300
        },
      },
      textColor: {
        dark: {
          DEFAULT: '#0f172a', // Slate-900
          '100': '#1e293b', // Slate-800
          '200': '#334155', // Slate-700
          '300': '#475569', // Slate-600
        },
        light: {
          DEFAULT: '#f1f5f9', // Slate-100
          '100': '#f8fafc', // Slate-50
          '200': '#e2e8f0', // Slate-200
          '300': '#cbd5e1', // Slate-300
        },
      },
      borderColor: {
        dark: {
          DEFAULT: '#0f172a', // Slate-900
          '100': '#1e293b', // Slate-800
          '200': '#334155', // Slate-700
          '300': '#475569', // Slate-600
        },
        light: {
          DEFAULT: '#f1f5f9', // Slate-100
          '100': '#f8fafc', // Slate-50
          '200': '#e2e8f0', // Slate-200
          '300': '#cbd5e1', // Slate-300
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
    },
  },
  plugins: [],
}