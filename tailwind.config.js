/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'orbit-flight': 'orbitFlight 8s infinite ease-in-out',
        'flap-left': 'flapLeft 0.5s infinite ease-in-out',
        'flap-right': 'flapRight 0.5s infinite ease-in-out',
      },
      keyframes: {
        orbitFlight: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(120px, -80px) scale(1.1)' },
          '50%': { transform: 'translate(0, -150px) scale(1)' },
          '75%': { transform: 'translate(-120px, -80px) scale(1.1)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        flapLeft: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-50deg)' },
        },
        flapRight: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(50deg)' },
        },
      },
    },
  },
  plugins: [],
}
