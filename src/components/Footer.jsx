import { ArrowUp, Code2 } from "lucide-react";
import { userData } from "../data/userData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 py-10 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        {/* Brand & Rights */}
        <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
          <p className="font-display text-base font-bold text-slate-950 dark:text-white">
            {userData.name}
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} {userData.name}. Designed &amp; engineered for performance.
          </p>
        </div>

        {/* Built With & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <Code2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>React • Tailwind • Motion</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none transition hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
