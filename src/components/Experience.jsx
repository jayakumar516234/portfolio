import { motion } from "framer-motion";
import { Calendar, Building, Sparkles, CheckCircle2 } from "lucide-react";
import TiltCard from "./TiltCard";
import { userData } from "../data/userData";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-slate-200 dark:border-slate-800/80 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Career Journey</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-lg">
            Where I've contributed, built scalable solutions, and made measurable impacts.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16 pl-6 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500/50 before:to-slate-300 dark:before:to-slate-800">
          {userData.experience.map((job, idx) => (
            <motion.div
              key={job.company + idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Animated Timeline Node */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-950 shadow-md shadow-emerald-500/30 group-hover:scale-130 transition-transform duration-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500 group-hover:animate-ping" />
              </div>

              {/* Experience Card */}
              <TiltCard className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {job.role}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200">
                      <Building className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-bold text-slate-900 dark:text-slate-100">{job.company}</span>
                      {job.industry && (
                        <>
                          <span className="text-slate-400 dark:text-slate-500">•</span>
                          <span className="text-slate-600 dark:text-slate-300">{job.industry}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <Calendar className="h-3.5 w-3.5" />
                    {job.duration}
                  </span>
                </div>

                {/* Key Points */}
                <ul className="mt-6 space-y-2.5 text-sm text-slate-800 dark:text-slate-200">
                  {job.points.map((point, pIdx) => (
                    <motion.li
                      key={pIdx}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 transition-transform"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span className="leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech Stack */}
                {job.tech && job.tech.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 mr-1">Technologies:</span>
                    {job.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.08 }}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
