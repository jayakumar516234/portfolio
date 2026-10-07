import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const BG_MOODS = [
  {
    id: "emerald",
    name: "Emerald Cyber",
    color: "#10b981",
    light: "#34d399",
    secondary: "#06b6d4",
    glow: "rgba(16, 185, 129, 0.35)",
    glowSubtle: "rgba(16, 185, 129, 0.15)",
    bg: "#030712",
    gradient: "from-emerald-400 via-teal-300 to-cyan-400",
    textGradient: "linear-gradient(135deg, #ffffff 15%, #6ee7b7 60%, #10b981 100%)",
  },
  {
    id: "violet",
    name: "Cosmic Nebula",
    color: "#a855f7",
    light: "#c084fc",
    secondary: "#ec4899",
    glow: "rgba(168, 85, 247, 0.35)",
    glowSubtle: "rgba(168, 85, 247, 0.15)",
    bg: "#060414",
    gradient: "from-purple-400 via-fuchsia-300 to-indigo-400",
    textGradient: "linear-gradient(135deg, #ffffff 15%, #d8b4fe 60%, #a855f7 100%)",
  },
  {
    id: "cyan",
    name: "Electric Ocean",
    color: "#06b6d4",
    light: "#38bdf8",
    secondary: "#3b82f6",
    glow: "rgba(6, 182, 212, 0.35)",
    glowSubtle: "rgba(6, 182, 212, 0.15)",
    bg: "#020a16",
    gradient: "from-cyan-400 via-sky-300 to-blue-400",
    textGradient: "linear-gradient(135deg, #ffffff 15%, #67e8f9 60%, #06b6d4 100%)",
  },
  {
    id: "amber",
    name: "Solar Blaze",
    color: "#f59e0b",
    light: "#fbbf24",
    secondary: "#f97316",
    glow: "rgba(245, 158, 11, 0.35)",
    glowSubtle: "rgba(245, 158, 11, 0.15)",
    bg: "#0e0703",
    gradient: "from-amber-400 via-orange-300 to-rose-400",
    textGradient: "linear-gradient(135deg, #ffffff 15%, #fcd34d 60%, #f59e0b 100%)",
  },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme) return savedTheme;
      return "dark";
    }
    return "dark";
  });

  const [bgMood, setBgMood] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-bg-mood") || "emerald";
    }
    return "emerald";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const activeMood = BG_MOODS.find((m) => m.id === bgMood) || BG_MOODS[0];

    root.setAttribute("data-theme-mood", bgMood);
    root.style.setProperty("--accent-primary", activeMood.color);
    root.style.setProperty("--accent-light", activeMood.light);
    root.style.setProperty("--accent-secondary", activeMood.secondary);
    root.style.setProperty("--accent-glow", activeMood.glow);
    root.style.setProperty("--accent-glow-subtle", activeMood.glowSubtle);
    root.style.setProperty("--accent-text-gradient", activeMood.textGradient);

    localStorage.setItem("portfolio-bg-mood", bgMood);
  }, [bgMood]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const cycleBgMood = () => {
    setBgMood((prev) => {
      const idx = BG_MOODS.findIndex((m) => m.id === prev);
      const nextIdx = (idx + 1) % BG_MOODS.length;
      return BG_MOODS[nextIdx].id;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme, bgMood, setBgMood, cycleBgMood }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
