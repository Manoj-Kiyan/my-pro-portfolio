"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MatrixRain from "./MatrixRain"; 

// 🔴 THE AUDIO UNLOCKER: Forces Chrome/Edge to allow sounds!
let audioCtx: AudioContext | null = null;

const unlockAudio = () => {
  if (typeof window !== "undefined") {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }
  return audioCtx;
};

// 🔊 CYBER AUDIO 1: The Subtle Hover Tick (Volume increased!)
const playHoverSound = () => {
  try {
    const ctx = unlockAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime); // 10% Volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05); 
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

// 🔊 CYBER AUDIO 2: The Command Center Bootup (Volume increased!)
const playBootSound = () => {
  try {
    const ctx = unlockAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15); 
    gain.gain.setValueAtTime(0.15, ctx.currentTime); // 15% Volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
};

// 🔊 CYBER AUDIO 3: The Error Glitch (Volume increased!)
const playErrorSound = () => {
  try {
    const ctx = unlockAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3); 
    gain.gain.setValueAtTime(0.2, ctx.currentTime); // 20% Volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 👾 EASTER EGG STATES
  const [showMatrix, setShowMatrix] = useState(false);
  const [secretMessage, setSecretMessage] = useState("");

  useEffect(() => {
    // 🔴 Attach the unlocker to the first click anywhere on the website!
    const unlockOnce = () => {
      unlockAudio();
      window.removeEventListener("click", unlockOnce);
      window.removeEventListener("keydown", unlockOnce);
    };
    window.addEventListener("click", unlockOnce);
    window.addEventListener("keydown", unlockOnce);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) playBootSound(); 
          return !prev;
        });
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
      playBootSound(); 
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
      window.removeEventListener("click", unlockOnce);
      window.removeEventListener("keydown", unlockOnce);
    };
  }, []);

  const links = [
    { name: "HOME", href: "#top", icon: "🏠" },
    { name: "ABOUT ME", href: "#about", icon: "👤" },
    { name: "PROJECTS", href: "#projects", icon: "💻" },
    { name: "EXPERIENCE", href: "#experience", icon: "⏳" },
    { name: "CONTACT", href: "#contact", icon: "✉️" },
  ];

  const filteredLinks = links.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSecretMessage(""); 
    
    if (e.key === "Enter") {
      const query = searchQuery.toLowerCase().trim();
      
      if (query === "sudo matrix") {
        setIsOpen(false);
        setSearchQuery("");
        setShowMatrix(true);
        playBootSound(); 
      } 
      else if (query === "whoami") {
        setSecretMessage("ROOT_ACCESS_DENIED: You are just a guest in MK's system.");
        playErrorSound(); // This will be loud and glitchy!
        setSearchQuery("");
      } 
      else if (filteredLinks.length > 0) {
        handleLinkClick(e as any, filteredLinks[0].href);
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    setIsOpen(false);   

    setTimeout(() => {
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 150); 
  };

  return (
    <>
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 sm:pt-40">
          <div 
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl border border-[#6b21a8]/50 bg-neutral-900/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(107,33,168,0.3)] transition-all p-4 mx-4">
            
            <div className="flex items-center border-b border-white/10 pb-4">
              <span className="text-purple-500 mr-3 animate-pulse">❯</span>
              <input
                type="text"
                className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none font-mono text-lg"
                placeholder="Search command or jump to..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                autoFocus
                spellCheck="false"
              />
              <kbd className="ml-3 hidden rounded border border-white/20 bg-white/5 px-2 py-1 font-sans text-[10px] text-neutral-400 sm:block">
                ESC
              </kbd>
            </div>

            <div className="mt-4 max-h-72 overflow-y-auto custom-scrollbar">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 font-mono">
                System Links
              </h3>
              
              {secretMessage && (
                <div className="mb-4 rounded border border-red-500/50 bg-red-500/10 p-3 font-mono text-xs text-red-400">
                  {secretMessage}
                </div>
              )}

              <ul className="space-y-2 font-mono text-sm">
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        onMouseEnter={playHoverSound} // Listen to the ticks!
                        className="group flex items-center justify-between rounded-lg px-4 py-3 text-neutral-300 transition-all hover:bg-[#6b21a8]/20 hover:text-white hover:translate-x-1 border border-transparent hover:border-[#6b21a8]/30"
                      >
                        <div className="flex items-center gap-3">
                          <span className="opacity-70 group-hover:opacity-100">{link.icon}</span>
                          <span>{link.name}</span>
                        </div>
                        <span className="text-purple-500 opacity-0 transition-opacity group-hover:opacity-100">
                          ↵
                        </span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-center text-neutral-500 flex flex-col items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    <span>Command not found: "{searchQuery}"</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}