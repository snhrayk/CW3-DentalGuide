/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        baseColor: "#F6F9FA",
        main: "#45AAF5",
        sub: "#F2F2F2",
        artist: "rgba(246, 249, 250, 0.60)",
      },
      boxShadow: {
        "main-shadow": "0px 2px 8px 0px rgba(0, 0, 0, 0.10)",
      },
      dropShadow: {
        "btn-shadow": "0px 1px 2px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        graph: "linear-gradient(180deg, #45AAF5 0%, #3E9ADE 100%)",
        "home-gradient": "linear-gradient(180deg, #F6F9FA 0%, #f2f2f2 100%)",
        "account-icon": "url('../public/img/butterfly.jpg')",
        sunny: "url('../public/img/sunny.jpg')",
        cloudy: "url('../public/img/cloudy.jpg')",
        rain: "url('../public/img/rain.jpg')",
        snow: "url('../public/img/snow.jpg')",
        thunder: "url('../public/img/thunder.jpg')",
        dental: "url('../public/img/dental.jpg')",
        toothPaste: "url('../public/img/toothPaste.jpg')",
        toothBrush: "url('../public/img/toothBrush.jpg')",
        dentalFloss: "url('../public/img/dentalFloss.jpg')",
      },
      borderColor: {
        "border-main": "#45AAF5",
      },
      backdropBlur: {
        "btn-blur": "5px",
      },
    },
  },
  plugins: [require("daisyui")],
};
