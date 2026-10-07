import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Server, Wrench, Layers, Sparkles, Bot } from "lucide-react";
import TiltCard from "./TiltCard";
import { userData } from "../data/userData";

const categoryIcons = {
  Frontend: Code,
  "AI Tools & Workflows": Bot,
  "Backend & Database": Server,
  "Tools & Integrations": Wrench,
  Default: Layers,
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", ...userData.skills.map((s) => s.category)];

  const filteredSkills =
    activeTab === "All"
      ? userData.skills
      : userData.skills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="relative border-t border-slate-200 dark:border-slate-800/80 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Skills &amp; Technologies
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-lg">
              The tools, frameworks, and workflows I use to turn ideas into robust production systems.
            </p>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-1.5 shadow-sm dark:shadow-none backdrop-blur-md"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                  activeTab === cat
                    ? "text-white dark:text-slate-950"
                    : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {activeTab === cat && (
                  <motion.span
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-xl bg-emerald-600 dark:bg-emerald-400 shadow-md shadow-emerald-500/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Skills Cards Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((group, groupIdx) => {
              const Icon = categoryIcons[group.category] || categoryIcons.Default;
              return (
                <motion.div
                  layout
                  key={group.category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: groupIdx * 0.05 }}
                >
                  <TiltCard className="glass-card rounded-2xl p-6 relative overflow-hidden h-full">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 transition-all"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                          {group.category}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {group.items.length} tools &amp; frameworks
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item, i) => (
                        <motion.span
                          key={item}
                          whileHover={{ scale: 1.08, y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="cursor-default inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-none transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:hover:text-emerald-300"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
