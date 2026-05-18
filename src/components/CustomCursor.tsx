"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] items-center justify-center hidden md:flex"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.25 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.5,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Soft glow effect behind the flower */}
        <div className="absolute inset-0 bg-pink-200 blur-md rounded-full opacity-40 scale-150"></div>
        
        {/* Flower Icon with Hue Rotate Chameleon Effect */}
        <motion.div
          animate={{
            filter: [
              "hue-rotate(0deg)", 
              "hue-rotate(60deg)", 
              "hue-rotate(120deg)", 
              "hue-rotate(0deg)"
            ]
          }}
          transition={{
            duration: isHovering ? 1.5 : 4, // Faster color change on hover
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Flower2 
            size={32} 
            className="text-pink-500 drop-shadow-md relative z-10" 
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
