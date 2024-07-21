/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        baseColor: "#F6F9FA",
        main: "#45AAF5",
        sub: "#F2F2F2",
      },
      boxShadow: {
        "main-shadow": "0px 2px 8px 0px rgba(0, 0, 0, 0.10)",
      },
      backgroundImage: {
        "home-gradient": "linear-gradient(180deg, #F6F9FA 0%, #f2f2f2 100%)",
      },
    },
  },
  plugins: [require("daisyui")],
};
