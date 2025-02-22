/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all React components
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/src/assets/hero.jpg')", // Adjust the path to your image
      },
    },
  },
  plugins: [],
};
