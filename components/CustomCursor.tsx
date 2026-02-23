"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      
      if (target.closest("a") || target.closest("button") || target.closest("input")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      // 🔴 FIX: Generates a completely unique ID so React never crashes again!
      if (Math.random() > 0.5) { 
        const colors = ["#3b82f6", "#60a5fa", "#ffffff", "#93c5fd"]; // Blue & White Sparkles
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const newParticle = {
          id: Date.now() + Math.random(), 
          x: e.clientX + (Math.random() * 20 - 10),
          y: e.clientY + (Math.random() * 20 - 10),
          color: randomColor,
        };
        
        setParticles((prev) => [...prev, newParticle]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 500);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. THE SPARKLE TRAIL */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none fixed z-[9997] h-1 w-1 rounded-full animate-ping"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            opacity: 0.8,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* 2. THE BLUE FEATHER CURSOR */}
      <div 
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-transform duration-75"
        style={{
          // 🔴 THE HOTSPOT FIX: We changed the math here! (-6px and -36px)
          // This pulls the feather UP and LEFT so the exact sharp bottom tip 
          // becomes the part that clicks on buttons, just like a pen!
          transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 36}px) scale(${isHovered ? 1.2 : 1}) rotate(-15deg)`,
          transformOrigin: "bottom left",
        }}
      >
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        >
          <defs>
            <linearGradient id="featherGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="45%" stopColor="#3b82f6" />
              <stop offset="65%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          
          <path 
            d="M21.928 2.072a3.5 3.5 0 0 0-4.95 0l-7.778 7.778a2 2 0 0 0-.472.784l-2.062 6.186a1 1 0 0 0 1.265 1.265l6.186-2.062a2 2 0 0 0 .784-.472l7.778-7.778a3.5 3.5 0 0 0 0-4.95l-4.75-4.75z" 
            fill="url(#featherGrad)" 
            stroke="#000000"
            strokeWidth="0.5"
          />
          <path d="M14 10L3.5 20.5" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* 3. MAGNETIC HOVER GLOW */}
      <div 
        className={`pointer-events-none fixed left-0 top-0 z-[9998] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
          isHovered 
            ? "scale-[1.2] border-blue-400/50 bg-blue-500/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
            : "scale-0 border-transparent opacity-0"
        }`}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />
    </>
  );
}