"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileOpen]);

  const navLinks = [
    { id: "01", name: "ABOUT", href: "#about", desc: "System identity" },
    { id: "02", name: "PROJECTS", href: "#projects", desc: "Execution logs" },
    { id: "03", name: "HISTORY", href: "#experience", desc: "Historical data" },
    { id: "04", name: "CONTACT", href: "#contact", desc: "Secure channel" },
  ];

  return (
    <>
      {/* 1. THE TOP HEADER BAR */}
      <header 
        id="top"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          
          {/* LOGO AREA */}
          <Link href="/" onClick={() => setIsMobileOpen(false)} className="group flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tighter text-white">
              mk
            </span>
            <span className="h-5 w-3 animate-pulse bg-[#6b21a8]"></span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.slice(0, 3).map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="group relative flex items-center justify-center overflow-hidden px-2 py-1"
              >
                <span className="mr-2 translate-x-4 font-mono text-purple-500 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                  [
                </span>
                <span className="font-mono text-sm tracking-widest text-neutral-400 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {link.name}
                </span>
                <span className="ml-2 -translate-x-4 font-mono text-purple-500 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                  ]
                </span>
                <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-[#6b21a8] shadow-[0_0_10px_#6b21a8] transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-4">
            
            <button 
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-400 transition-all hover:bg-white/10 hover:text-white sm:flex"
            >
              <span className="text-[10px] text-neutral-500">SEARCH</span>
              <kbd className="rounded bg-neutral-800 px-1.5 py-0.5 font-sans font-semibold text-neutral-300 shadow">
                Ctrl K
              </kbd>
            </button>

            <Link 
              href="#contact"
              className="group relative hidden items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-400 transition-all hover:bg-green-500/20 md:inline-flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              HIRE ME
            </Link>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 md:hidden"
            >
              <span className={`h-[2px] w-5 bg-white transition-all duration-300 ${isMobileOpen ? "translate-y-[7px] rotate-45 bg-red-400" : ""}`}></span>
              <span className={`h-[2px] w-5 bg-white transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-[2px] w-5 bg-white transition-all duration-300 ${isMobileOpen ? "-translate-y-[7px] -rotate-45 bg-red-400" : ""}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* 🔴 2. THE NEW MOBILE APP BOTTOM SHEET (Moved outside the Header!) */}
      
      {/* Dark Blur Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-neutral-950/60 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* The Glass Panel Sliding Up */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[70] w-full rounded-t-3xl border-t border-white/10 bg-neutral-900/95 p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          isMobileOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* iOS Style Drag Indicator Pill */}
        <div className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-white/20"></div>

        {/* Clean, Elegant Link Rows */}
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMobileOpen(false)}
              className="group flex items-center justify-between border-b border-white/5 py-5 transition-colors last:border-0 hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#6b21a8] opacity-70 transition-opacity group-hover:opacity-100">
                  {link.id}
                </span>
                <span className="font-display text-2xl font-semibold text-neutral-300 transition-all group-hover:text-white group-hover:tracking-wider">
                  {link.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden font-mono text-[10px] text-neutral-600 transition-colors group-hover:text-neutral-400 sm:block">
                  {link.desc}
                </span>
                <span className="text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-purple-400">
                  →
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}