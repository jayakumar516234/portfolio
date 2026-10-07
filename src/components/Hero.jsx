import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Copy,
  Check,
  Code2,
  Terminal,
  FolderGit2,
  Layers,
  Send,
  Download,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import TiltCard from "./TiltCard";
import { userData } from "../data/userData";
import { useTheme } from "../context/ThemeContext";

const roles = [
  userData.role,
  "Frontend Engineer",
  "React Specialist",
  "UI/UX Enthusiast",
  "Problem Solver",
];

const floatingTechPills = [
  { name: "⚡ React 18", pos: "top-10 -right-4 md:right-10", delay: 0, color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
  { name: "🚀 Next.js", pos: "top-36 -left-6 md:left-4", delay: 1.5, color: "text-purple-400 border-purple-500/40 bg-purple-500/10" },
  { name: "🎨 Tailwind CSS", pos: "bottom-20 -right-6 md:right-4", delay: 0.8, color: "text-sky-400 border-sky-500/40 bg-sky-500/10" },
  { name: "⚡ Node.js", pos: "bottom-6 left-12 md:left-24", delay: 2.2, color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { bgMood } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(userData.email);
    setCopied(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10b981", "#34d399", "#67e8f9", "#ffffff"],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-36 md:pb-28 overflow-visible"
    >
      {/* Floating Animated Badges in Background */}
      <div className="hidden lg:block pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {floatingTechPills.map((pill, idx) => (
          <motion.div
            key={pill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              y: [0, -14, 0],
              rotate: [0, idx % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: 5 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pill.delay,
            }}
            className={`absolute ${pill.pos} rounded-full border px-3.5 py-1.5 text-xs font-mono font-bold shadow-lg backdrop-blur-md ${pill.color}`}
          >
            {pill.name}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Details & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Top Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="badge-glow inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </motion.span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 backdrop-blur-md shadow-sm dark:shadow-none">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              {userData.location}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="mt-6 max-w-2xl">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="text-gradient font-black">{userData.name}</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full opacity-75"></span>
              </span>
            </h1>

            {/* Dynamic Rotating Role */}
            <div className="mt-4 flex items-center gap-2 text-xl font-medium text-slate-800 dark:text-slate-100 md:text-2xl">
              <span>Specialized in</span>
              <div className="relative inline-flex h-8 md:h-9 overflow-hidden">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="font-bold text-gradient"
                >
                  {roles[roleIndex]}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Tagline Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-200 md:text-lg"
          >
            {userData.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#projects"
              className="btn-cyber-primary group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={userData.resumeUrl}
              download="Jaya_Kumar_Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3.5 text-sm font-bold text-emerald-700 dark:text-emerald-300 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-emerald-500/20 hover:scale-[1.02]"
              title="Download Jaya Kumar's Resume (PDF)"
            >
              <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
              <span>Download CV</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-900/90 px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              <Send className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Contact</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/90 px-4 py-3.5 text-sm font-medium text-slate-800 dark:text-slate-200 transition hover:border-emerald-500/40 hover:text-emerald-700 dark:hover:text-emerald-300 shadow-sm dark:shadow-none"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                  <span>{userData.email}</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: High-Impact Avatar Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <TiltCard className="relative group max-w-sm w-full">
            {/* Ambient Avatar Glow Halo */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-teal-400/25 to-cyan-500/30 blur-2xl opacity-80 group-hover:opacity-100 transition duration-500" />

            <div className="relative glass-card rounded-3xl p-4 sm:p-5 border overflow-hidden">
              {/* Image Frame with Gradient Border */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-square shadow-inner ring-1 ring-white/15">
                <img
                  src={userData.avatarUrl}
                  alt={userData.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating Profile Details Badge inside Avatar Card */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                    <span>{userData.name}</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 fill-emerald-500/20" />
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                    React &amp; Next.js Specialist
                  </p>
                </div>

                <span className="badge-glow rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  2+ Yrs Exp
                </span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* 3D Tilt Stats Cards */}
      <div className="mt-16 w-full grid grid-cols-2 gap-4 sm:grid-cols-4">
        <TiltCard className="glass-card rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-slate-950 dark:text-white">React.js</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">Frontend Specialist</p>
            </div>
          </div>
        </TiltCard>

        <TiltCard className="glass-card rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-slate-950 dark:text-white">E-Com &amp; F&amp;B</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">Live Platforms</p>
            </div>
          </div>
        </TiltCard>

        <TiltCard className="glass-card rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <FolderGit2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-slate-950 dark:text-white">{userData.projects.length}+</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">Core Projects</p>
            </div>
          </div>
        </TiltCard>

        <TiltCard className="glass-card rounded-2xl p-5 border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-slate-950 dark:text-white">Clean Code</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">RBAC &amp; Stripe</p>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
