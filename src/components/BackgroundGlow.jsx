import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const moodConfig = {
  emerald: {
    topBlob: "from-emerald-500/25 via-teal-500/15 to-transparent",
    leftBlob: "bg-indigo-600/15 dark:bg-indigo-500/15",
    rightBlob: "bg-cyan-500/15 dark:bg-emerald-500/15",
    bottomBlob: "bg-emerald-600/10 dark:bg-emerald-500/10",
    particleColor: "bg-emerald-400",
  },
  violet: {
    topBlob: "from-violet-500/25 via-purple-500/15 to-transparent",
    leftBlob: "bg-fuchsia-600/15 dark:bg-purple-500/15",
    rightBlob: "bg-indigo-500/15 dark:bg-violet-500/15",
    bottomBlob: "bg-violet-600/10 dark:bg-purple-500/10",
    particleColor: "bg-violet-400",
  },
  cyan: {
    topBlob: "from-cyan-500/25 via-sky-500/15 to-transparent",
    leftBlob: "bg-blue-600/15 dark:bg-teal-500/15",
    rightBlob: "bg-sky-500/15 dark:bg-cyan-500/15",
    bottomBlob: "bg-teal-600/10 dark:bg-cyan-500/10",
    particleColor: "bg-cyan-400",
  },
  amber: {
    topBlob: "from-amber-500/25 via-orange-500/15 to-transparent",
    leftBlob: "bg-rose-600/15 dark:bg-amber-500/15",
    rightBlob: "bg-yellow-500/15 dark:bg-orange-500/15",
    bottomBlob: "bg-amber-600/10 dark:bg-amber-500/10",
    particleColor: "bg-amber-400",
  },
};

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${(i * 17) % 95}%`,
  left: `${(i * 23) % 95}%`,
  size: (i % 3) + 2,
  duration: 4 + (i % 5),
  delay: (i % 4) * 0.8,
}));

export default function BackgroundGlow() {
  const { bgMood = "emerald" } = useTheme();
  const currentMood = moodConfig[bgMood] || moodConfig.emerald;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70" />
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />

      {/* Floating Animated Ambient Particles / Cosmic Dust */}
      <div className="hidden sm:block absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.1, y: 0 }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              y: [0, -25, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className={`absolute rounded-full ${currentMood.particleColor} blur-[0.5px]`}
          />
        ))}
      </div>

      {/* Top Center Radiant Glow Beam */}
      <motion.div
        key={`top-${bgMood}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b ${currentMood.topBlob} rounded-full blur-[140px] pointer-events-none`}
      />

      {/* Floating Left Mesh Blob */}
      <motion.div
        key={`left-${bgMood}`}
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute top-1/4 -left-28 w-[450px] h-[450px] ${currentMood.leftBlob} rounded-full blur-[150px] pointer-events-none`}
      />

      {/* Floating Right Mesh Blob */}
      <motion.div
        key={`right-${bgMood}`}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 70, -50, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute top-2/3 -right-28 w-[480px] h-[480px] ${currentMood.rightBlob} rounded-full blur-[160px] pointer-events-none`}
      />

      {/* Bottom Center Subtle Glow */}
      <motion.div
        key={`bottom-${bgMood}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] ${currentMood.bottomBlob} rounded-full blur-[160px] pointer-events-none`}
      />
    </div>
  );
}
