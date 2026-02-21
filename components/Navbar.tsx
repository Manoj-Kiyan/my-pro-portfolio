"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // This detects if the user has scrolled down to activate the glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-neutral-950/60 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-white tracking-tighter">
            mk
          </span>
          {/* The blinking cursor effect */}
          <span className="h-5 w-3 bg-[#6b21a8] animate-pulse"></span>
        </Link>

        {/* MAIN NAVIGATION (Hidden on super small phones, visible on desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest text-neutral-400">
          <Link href="#about" className="hover:text-[#6b21a8] transition-colors duration-300">
            // ABOUT
          </Link>
          <Link href="#projects" className="hover:text-[#6b21a8] transition-colors duration-300">
            // WORK
          </Link>
          <Link href="#news" className="hover:text-[#6b21a8] transition-colors duration-300">
            // NEWS
          </Link>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* Fake "Command Palette" Button (We will make this work later!) */}
          <button className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-400 transition-all hover:bg-white/10 hover:text-white">
            <span className="text-[10px] text-neutral-500">SEARCH</span>
            <kbd className="rounded bg-neutral-800 px-1.5 py-0.5 font-sans font-semibold text-neutral-300 shadow">
              Ctrl K
            </kbd>
          </button>

          {/* "Available for Work" Status Indicator */}
          <Link 
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400 transition-all hover:bg-green-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            HIRE ME
          </Link>
        </div>

      </div>
    </header>
  );
}