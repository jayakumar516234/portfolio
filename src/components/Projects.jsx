import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, FolderCode, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import TiltCard from "./TiltCard";
import { userData } from "../data/userData";

export default function Projects() {
  const projects = userData.projects;

  return (
    <section id="projects" className="relative border-t border-slate-200 dark:border-slate-800/80 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Featured Work</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Recent Projects
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-lg">
              A curated selection of applications, tools, and platforms I've engineered.
            </p>
          </motion.div>
        </div>

        {/* 3D Tilt Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title + idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <TiltCard className="glass-card group flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 transition-colors duration-300">
                {/* Ambient glow on hover */}
                <div className="absolute top-0 right-0 h-44 w-44 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl group-hover:from-emerald-500/25 transition-all" />

                <div>
                  {/* Header with Project Icon & Actions */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/25 transition-all duration-300"
                    >
                      <FolderCode className="h-6 w-6" />
                    </motion.div>

                    <div className="flex items-center gap-2">
                      {project.link && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm dark:shadow-none transition-all hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white"
                          aria-label="GitHub Repository"
                          title="View Source Code"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm dark:shadow-none transition-all hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400"
                          aria-label="Live Demo"
                          title="Live Demo"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="mt-6 font-display text-2xl font-bold text-slate-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech & Links */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-3 py-1 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 shadow-sm dark:shadow-none cursor-default"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    {project.demo && (
                      <motion.a
                        whileHover={{ x: 3 }}
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                      >
                        <span>Explore Live</span>
                        <ExternalLink className="h-3 w-3" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
