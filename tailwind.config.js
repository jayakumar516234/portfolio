/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0F19",
        cardBg: "rgba(17, 24, 39, 0.7)",
        cardBorder: "rgba(255, 255, 255, 0.08)",
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        cyanGlow: "#06b6d4",
        indigoGlow: "#6366f1",
        amberGlow: "#f59e0b",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "blob-pulse": "blobPulse 12s infinite ease-in-out alternate",
        "blob-pulse-slow": "blobPulseSlow 16s infinite ease-in-out alternate",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        blobPulse: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(30px, -40px) scale(1.15)" },
          "100%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        blobPulseSlow: {
          "0%": { transform: "translate(0px, 0px) scale(1.1)" },
          "50%": { transform: "translate(-40px, 30px) scale(0.9)" },
          "100%": { transform: "translate(25px, -30px) scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.8 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
