module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      primary: {
        light: "#306EC1",
        medium: "#004aad",
        dark: "#003884",
      },
      secondary: {
        light: "#653273",
        dark: "#731050",
      },
      error: "#E23636",
      warn: "#EDB95E",
      success: "#82DD55",
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
