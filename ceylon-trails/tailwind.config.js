// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Your existing animation
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        // NEW: Added the float-up animation for the contact page
        'float-up': {
          '0%': { 
            transform: 'translateY(30px)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0)', 
            opacity: '1' 
          },
        },
      },
      animation: {
        // Your existing animation
        'fade-in-down': 'fade-in-down 0.8s ease-out',
        // NEW: Added the float-up animation for the contact page
        // The 'forwards' keyword ensures the element stays in its final state after animating
        'float-up': 'float-up 0.8s ease-out forwards',
      }
    },
  },
  plugins: [],
}