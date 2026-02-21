"use client";

import { useRef, useState } from "react";

export default function AboutSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // 🔴 THE MAGIC: This calculates the exact 3D tilt based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation limits (Max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    // Snap back to perfectly flat when mouse leaves
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-6 py-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-16">
        
        {/* LEFT SIDE: The 3D Holo-Badge */}
        <div 
          className="perspective-1000 w-full md:w-1/2 flex justify-center"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: "transform 0.1s ease-out",
              transformStyle: "preserve-3d",
            }}
            className="group relative w-full max-w-sm rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-crosshair"
          >
            {/* Inner Glare Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

            {/* Badge Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6" style={{ transform: "translateZ(30px)" }}>
              <div>
                <h3 className="text-xs font-mono text-[#6b21a8] tracking-widest">CLEARANCE: LEVEL 9</h3>
                <h2 className="text-4xl font-display font-bold text-white mt-1">MK</h2>
              </div>
              <div className="h-16 w-16 rounded-full border border-purple-500/50 bg-neutral-950 flex items-center justify-center shadow-[0_0_15px_rgba(107,33,168,0.5)]">
                <span className="text-2xl">👾</span>
              </div>
            </div>

            {/* Badge Stats */}
            <div className="mt-8 space-y-6 font-mono text-sm" style={{ transform: "translateZ(40px)" }}>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-neutral-500 text-xs">ROLE</span>
                <span className="text-white text-right font-sans font-semibold">Creative Developer<br/>Cyber Analyst</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="text-neutral-500 text-xs">CORE_STACK</span>
                <span className="text-purple-300">Java, JS, SQL</span>
              </div>
              <div className="flex justify-between items-end pb-2">
                <span className="text-neutral-500 text-xs">SYSTEM_STATUS</span>
                <span className="text-green-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-ping absolute"></span>
                  <span className="h-2 w-2 rounded-full bg-green-500 relative"></span>
                  ONLINE
                </span>
              </div>
            </div>

            {/* Cyber Barcode Footer */}
            <div className="mt-10 flex justify-center opacity-30" style={{ transform: "translateZ(20px)" }}>
              <div className="h-8 w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,#fff_3px,#fff_6px)]"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Text Terminal */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6b21a8]/30 bg-[#6b21a8]/10 px-4 py-2">
            <span className="text-xs font-mono text-purple-400">~/system/whoami.exe</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Design</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Logic</span>.
          </h2>
          <p className="text-neutral-400 font-sans text-lg leading-relaxed">
            I engineer high-performance digital experiences. Whether it's developing dynamic client platforms, designing secure database architectures, or building immersive 3D environments, I thrive on solving complex technical challenges.
          </p>
        </div>

      </div>
    </section>
  );
}