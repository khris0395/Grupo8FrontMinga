/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // Para los fondos
    'bg-gray-400',
    'bg-green-200',
    'bg-orange-200',
    'bg-red-200',
    'bg-purple-200',

    // Para hover
    'hover:bg-gray-600',
    'hover:bg-green-600',
    'hover:bg-orange-600',
    'hover:bg-red-600',
    'hover:bg-purple-600',

    // Para checked
    'checked:bg-gray-800',
    'checked:bg-green-800',
    'checked:bg-orange-800',
    'checked:bg-red-800',
    'checked:bg-purple-800',

    // Para bordes
    'border-gray-800',
    'border-green-800',
    'border-orange-800',
    'border-red-800',
    'border-purple-800',

    // para texto
    'text-gray-800',
    'text-green-800',
    'text-orange-800',
    'text-red-800',
    'text-purple-800',
  ],
  plugins: [],
};
