/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'orbit-flight': 'orbitFlight 6s infinite ease-in-out',
        'flap-left': 'flapLeft 0.4s infinite ease-in-out',
        'flap-right': 'flapRight 0.4s infinite ease-in-out',
      },
      keyframes: {
        orbitFlight: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(100px, -50px)' },
          '50%': { transform: 'translate(0, -100px)' },
          '75%': { transform: 'translate(-100px, -50px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        flapLeft: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-45deg)' },
        },
        flapRight: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(45deg)' },
        },
      },
    },
  },
  plugins: [],
}
