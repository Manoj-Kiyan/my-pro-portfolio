"use client";

import { useState, useEffect } from "react";

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  
  // States for the typing effect
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  useEffect(() => {
    // 1. Start typing line 1
    const t1 = setTimeout(() => setLine1("> INITIALIZING_CYBER_OS... [OK]"), 400);
    // 2. Start typing line 2
    const t2 = setTimeout(() => setLine2("> AUTHENTICATING_USER: mk... [VERIFIED]"), 1200);
    // 3. Start typing line 3 (in your signature purple)
    const t3 = setTimeout(() => setLine3("> ACCESS_GRANTED. WELCOME."), 2000);

    // 4. Start fading out the whole black screen
    const t4 = setTimeout(() => setIsFading(true), 3200);

    // 5. Completely remove it from the page so they can click the website
    const t5 = setTimeout(() => setIsVisible(false), 3800);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); 
      clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  // If the animation is totally done, don't render anything!
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-2xl px-8 font-mono text-sm sm:text-base md:text-lg">
        {/* Terminal Window Graphic */}
        <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 text-xs text-neutral-500">terminal_root@bluefeatherz</span>
        </div>

        {/* Typing Text */}
        <div className="flex flex-col gap-3">
          <p className="text-green-400">{line1}</p>
          <p className="text-green-400">{line2}</p>
          <p className="text-[#6b21a8] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(107,33,168,0.8)]">
            {line3}
          </p>
        </div>

        {/* Blinking Hacker Cursor */}
        <div className="mt-4 h-5 w-3 animate-pulse bg-white/70"></div>
      </div>
    </div>
  );
}