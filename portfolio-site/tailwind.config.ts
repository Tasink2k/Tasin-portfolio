const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B1420",
        surface: "#101B2D",
        "surface-raised": "#152540",
        border: "#22344A",
        amber: {
          DEFAULT: "#E8A33D",
          soft: "#F0C079",
        },
        teal: {
          DEFAULT: "#3FA9A0",
          soft: "#6FC4BC",
        },
        ink: "#EDF1F5",
        muted: "#8B99AC",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "gauge-sweep": {
          "0%": { strokeDashoffset: "283" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "gauge-sweep": "gauge-sweep 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
