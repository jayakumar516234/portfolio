import { motion } from "framer-motion";
import { Sparkles, Cpu, Zap, HeartHandshake, GraduationCap, Award, CheckCircle } from "lucide-react";
import TiltCard from "./TiltCard";
import { userData } from "../data/userData";

const highlights = [
  {
    icon: Zap,
    title: "E-Commerce & F&B Expertise",
    desc: "Engineered scalable shopping platforms, real-time ordering, dynamic catalogs, and Stripe payments.",
  },
  {
    icon: Cpu,
    title: "Modern React Ecosystem",
    desc: "React.js, Next.js, TypeScript, Tailwind CSS, Material UI, and REST API architectures.",
  },
  {
    icon: Sparkles,
    title: "AI-Augmented Development",
    desc: "Leveraging ChatGPT, Claude AI, and Antigravity AI for rapid architecture, debugging, and accelerated delivery.",
  },
  {
    icon: HeartHandshake,
    title: "Performance & UX Focused",
    desc: "Optimized Core Web Vitals, created reusable component systems, and responsive designs.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-slate-200 dark:border-slate-800/80 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Section Header & Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About Me</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Building scalable React applications with precision.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-200 md:text-lg">
              {userData.about}
            </p>

            {/* Code Quote Box */}
            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/95 p-5 font-mono text-xs text-slate-800 dark:text-slate-100 backdrop-blur-md shadow-sm dark:shadow-2xl">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-400">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[10px] text-slate-500 dark:text-slate-400">developerProfile.ts</span>
              </div>
              <p className="text-pink-600 dark:text-pink-400 font-bold">
                const <span className="text-cyan-600 dark:text-cyan-300">jayaKumar</span>: <span className="text-amber-600 dark:text-amber-300 font-semibold">ReactDeveloper</span> = &#123;
              </p>
              <p className="pl-4 text-slate-700 dark:text-slate-200">
                <span className="text-indigo-600 dark:text-indigo-300">focus</span>: <span className="text-emerald-600 dark:text-emerald-400">["E-Commerce", "F&B", "Admin Portals"]</span>,
              </p>
              <p className="pl-4 text-slate-700 dark:text-slate-200">
                <span className="text-indigo-600 dark:text-indigo-300">coreStack</span>: <span className="text-emerald-600 dark:text-emerald-400">["React", "Next.js", "TypeScript"]</span>,
              </p>
              <p className="pl-4 text-slate-700 dark:text-slate-200">
                <span className="text-indigo-600 dark:text-indigo-300">aiTools</span>: <span className="text-emerald-600 dark:text-emerald-400">["ChatGPT", "Claude", "Antigravity"]</span>,
              </p>
              <p className="pl-4 text-slate-700 dark:text-slate-200">
                <span className="text-indigo-600 dark:text-indigo-300">paymentIntegrations</span>: <span className="text-emerald-600 dark:text-emerald-400">["Stripe"]</span>,
              </p>
              <p className="text-pink-600 dark:text-pink-400 font-bold">&#125;;</p>
            </div>
          </motion.div>

          {/* Value Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TiltCard className="glass-card rounded-2xl p-6 relative overflow-hidden h-full group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all duration-300 shadow-inner">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.desc}
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education & Certifications Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Education Card */}
          <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">EDUCATION</p>
              <h4 className="mt-1 font-display text-base font-bold text-slate-950 dark:text-white">
                {userData.education[0].degree}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                {userData.education[0].institution} • {userData.education[0].duration}
              </p>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="glass-card rounded-2xl p-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">CERTIFICATIONS</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {userData.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/90 px-2.5 py-1 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 shadow-sm"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
