module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 100s linear infinite',
      },
      boxShadow: {
        neon: '0 0 5px 0 #5142f5',
      },
    },
  },
  plugins: [require('daisyui')],
};
