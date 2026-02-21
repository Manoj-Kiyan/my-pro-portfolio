"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import Link from "next/link";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05], 
      markerColor: [0.42, 0.13, 0.66], 
      glowColor: [0.1, 0.0, 0.2], 
      markers: [
        { location: [20.5937, 78.9629], size: 0.1 } 
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <footer id="contact" className="relative w-full overflow-hidden border-t border-white/10 bg-neutral-950 pt-24 pb-12">
      
      {/* Container to align text and globe side-by-side */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 lg:flex-row lg:items-center">
        
        {/* LEFT SIDE: Contact Info */}
        <div className="relative z-10 w-full lg:w-1/2">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping absolute"></span>
            <span className="h-2 w-2 rounded-full bg-green-500 relative"></span>
            <span className="text-xs font-mono text-green-400">STATUS: ACCEPTING_NEW_MISSIONS</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter text-white leading-[0.9]">
            Let's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
              Talk.
            </span>
          </h2>

          <p className="mt-8 max-w-md font-sans text-lg text-neutral-400">
            Ready to build high-performance digital experiences? Drop me a line in the terminal.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 font-mono text-sm">
            <Link href="mailto:contact@mk.dev" className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-6 py-3 transition-all hover:bg-white/10 hover:border-purple-500/50">
              <span className="text-purple-400">~/email</span>
              <span className="ml-2 text-white">contact@mk.dev</span>
            </Link>
            <Link href="https://github.com" target="_blank" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 transition-all hover:bg-white/10 hover:-translate-y-1">
              GITHUB
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 transition-all hover:bg-white/10 hover:-translate-y-1">
              LINKEDIN
            </Link>
          </div>
        </div>

        {/* 🔴 THE FIX: RIGHT SIDE GLOBE */}
        <div className="relative flex w-full justify-center lg:w-1/2">
          {/* aspect-square ensures it is mathematically a perfect circle, never stretched! */}
          {/* lg:-mt-24 pulls it beautifully into your green circle space */}
          <div className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] aspect-square lg:-mt-24">
            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: "100%",
                contain: "layout paint size", // This tells the browser to strictly contain the 3D drawing
              }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 mx-auto mt-16 max-w-7xl border-t border-white/10 px-6 pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-neutral-600">
        <p>© {new Date().getFullYear()} MK. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 md:mt-0 flex items-center gap-2">
          <span>ENCRYPTED CONNECTION</span>
          <span className="h-1 w-1 rounded-full bg-green-500"></span>
        </p>
      </div>
    </footer>
  );
}