import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(true);

  // Smooth springs for cursor position
  const mouseX = useSpring(-500, { stiffness: 150, damping: 25 });
  const mouseY = useSpring(-500, { stiffness: 150, damping: 25 });

  useEffect(() => {
    // Only enable on fine pointer devices (desktops)
    if (window.matchMedia("(pointer: fine)").matches) {
      setMounted(true);

      const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    } else {
      setIsPointer(false);
    }
  }, [mouseX, mouseY]);

  if (!mounted || !isPointer) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-0 h-96 w-96 rounded-full bg-emerald-500/[0.04] dark:bg-emerald-400/[0.05] blur-[100px] transition-opacity duration-300"
    />
  );
}
