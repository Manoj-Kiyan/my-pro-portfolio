"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("DIRECTORY_NOT_FOUND");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        const position = Math.floor(Math.random() * "DIRECTORY_NOT_FOUND".length);
        const newText = "DIRECTORY_NOT_FOUND".substring(0, position) + randomChar + "DIRECTORY_NOT_FOUND".substring(position + 1);
        setGlitchText(newText);
        
        setTimeout(() => {
          setGlitchText("DIRECTORY_NOT_FOUND");
        }, 100);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    // 🔴 THE FIX: 'fixed inset-0 z-[9999]' forces it to cover the Navbar completely!
    <main className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-neutral-950 font-mono text-white selection:bg-red-500/30">
      <CustomCursor />

      {/* Red Warning Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[120px] animate-pulse"></div>
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-red-800/10 blur-[100px] animate-pulse"></div>

      {/* Background Matrix/Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* 🔴 ALIGNMENT FIX: Perfectly centered container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-2xl">
        
        {/* Warning Header */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase">Critical System Error</span>
        </div>

        {/* The Massive 404 - Fixed overlapping */}
        <div className="relative flex justify-center items-center h-32 md:h-48 mb-6">
           <h1 className="absolute font-display text-[7rem] font-bold tracking-tighter text-red-500 opacity-60 animate-pulse md:text-[10rem] -translate-x-1">404</h1>
           <h1 className="absolute font-display text-[7rem] font-bold tracking-tighter text-blue-500 opacity-60 animate-pulse delay-75 md:text-[10rem] translate-x-1">404</h1>
           <h1 className="relative font-display text-[7rem] font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(239,68,68,0.4)] md:text-[10rem]">404</h1>
        </div>

        {/* Dynamic Glitch Text */}
        <h2 className="mt-4 mb-6 text-xl font-bold tracking-widest text-red-400 sm:text-2xl">
          [{glitchText}]
        </h2>

        <p className="max-w-md text-sm leading-relaxed text-neutral-400 mb-10 mx-auto">
          The routing protocol has failed. The node you are attempting to access does not exist within the current MK-OS mainframe architecture.
        </p>

        {/* The Reboot Button */}
        <Link 
          href="/"
          className="group relative inline-flex items-center gap-4 overflow-hidden rounded-lg border border-red-500/50 bg-red-500/10 px-8 py-4 text-sm font-bold tracking-widest text-white transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] cursor-none"
        >
          <span className="absolute inset-0 w-0 bg-red-500 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            REBOOT SYSTEM
          </span>
        </Link>
        
        {/* Terminal decorative text */}
        <div className="mt-16 text-center w-full max-w-md border-t border-white/10 pt-4 flex justify-between mx-auto">
           <p className="text-[10px] text-neutral-600">ERR_CODE: 0x00000404</p>
           <p className="text-[10px] text-neutral-600 animate-pulse">STATUS: OFFLINE</p>
        </div>

      </div>
    </main>
  );
}