import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Download, ArrowUpRight, Sun, Moon, Palette } from "lucide-react";
import { useTheme, BG_MOODS } from "../context/ThemeContext";
import { userData } from "../data/userData";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme, bgMood, cycleBgMood, setBgMood } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "skills", "experience", "projects", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstName = userData.name.split(" ")[0] || "Portfolio";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-[#030712]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md dark:shadow-black/40 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Brand Logo */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-950 dark:text-white"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
            <img
              src={userData.avatarUrl}
              alt={userData.name}
              className="h-full w-full rounded-[10px] object-cover"
            />
          </div>
          <span className="font-display text-lg tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
            {firstName}
            <span className="text-emerald-600 dark:text-emerald-400">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 p-1.5 shadow-sm dark:shadow-none backdrop-blur-md md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-emerald-700 dark:text-emerald-300 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-emerald-500/15 border border-emerald-500/30"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions (Theme & Mood Switcher, Availability, Resume) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Glow Mood Switcher (Dark Mode Accent) */}
          <button
            onClick={cycleBgMood}
            className="group relative flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm transition hover:border-emerald-500/40 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Cycle ambient glow theme"
            title={`Ambient Glow: ${BG_MOODS.find((m) => m.id === bgMood)?.name || "Emerald Cyber"}`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-950 transition-colors duration-300 group-hover:scale-110"
              style={{ backgroundColor: BG_MOODS.find((m) => m.id === bgMood)?.color || "#10b981" }}
            />
            <Palette className="h-3.5 w-3.5 opacity-70 group-hover:text-emerald-500 transition-colors" />
            <span className="hidden lg:inline text-[11px] font-semibold opacity-80">
              {BG_MOODS.find((m) => m.id === bgMood)?.name.split(" ")[0]}
            </span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 shadow-sm transition hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle dark/light theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Availability Badge */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-500"></span>
            </span>
            Available
          </div>

          {/* Resume Download Button */}
          <a
            href={userData.resumeUrl}
            download="Jaya_Kumar_Resume.pdf"
            className="hidden items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 px-4 py-1.5 text-sm font-medium text-slate-800 dark:text-slate-200 shadow-sm transition hover:border-emerald-500/40 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-white sm:flex group"
            title="Download Jaya Kumar's Resume (PDF)"
          >
            <Download className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 md:hidden hover:text-slate-950 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-6 py-6 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-base font-medium text-slate-800 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Ambient Mood Palette */}
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Ambient Theme Mood
                </div>
                <div className="flex items-center gap-2">
                  {BG_MOODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setBgMood(m.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                        bgMood === m.id
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                      {m.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for work
                </div>
                <a
                  href={userData.resumeUrl}
                  download="Jaya_Kumar_Resume.pdf"
                  className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
