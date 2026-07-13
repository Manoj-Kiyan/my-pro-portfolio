"use client";

import { useRef } from "react";

export default function AboutSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 lg:gap-24 relative z-10">
      
      {/* 🔴 LEFT SIDE: The Massive 3D Holo-Badge & Projector */}
      <div className="perspective-1000 w-full lg:w-1/2 flex justify-center relative">
        
        {/* 🔴 THE FIX: Massive Seamless Volumetric Glow! (No sharp edges) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,rgba(59,130,246,0.05)_40%,transparent_70%)] blur-3xl pointer-events-none -z-20 animate-pulse"></div>

        {/* The Holographic Projector Base */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] -z-10 pointer-events-none flex items-center justify-center" style={{ transform: 'rotateX(75deg)', perspective: '1000px' }}>
           <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-[spin_8s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-purple-500 rounded-full blur-[4px] -translate-x-1/2 -translate-y-1/2"></div>
           </div>
           <div className="absolute inset-8 rounded-full border-2 border-dashed border-blue-500/40 animate-[spin_12s_linear_infinite_reverse]"></div>
           <div className="absolute inset-16 rounded-full bg-purple-600/20 border border-purple-400/50 shadow-[0_0_50px_rgba(168,85,247,0.8)] animate-pulse"></div>
        </div>

        {/* The 3D Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transition: "transform 0.1s ease-out",
            transformStyle: "preserve-3d",
          }}
          className="group relative w-full max-w-[380px] rounded-3xl border border-white/20 bg-black/50 backdrop-blur-2xl p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-crosshair mt-[-20px]"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-white/10 pb-8" style={{ transform: "translateZ(40px)" }}>
            <div>
              <h3 className="text-xs font-mono text-purple-400 tracking-widest font-bold">CLEARANCE: LEVEL 9</h3>
              <h2 className="text-5xl font-display font-bold text-white mt-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">MK</h2>
            </div>
            <div className="h-16 w-16 rounded-full border-2 border-purple-500 bg-neutral-950 flex items-center justify-center shadow-[0_0_20px_rgba(107,33,168,0.8)] relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/20 animate-pulse"></div>
              <span className="text-2xl relative z-10">👾</span>
            </div>
          </div>

          <div className="mt-10 space-y-6 font-mono text-sm" style={{ transform: "translateZ(50px)" }}>
            <div className="flex justify-between items-end border-b border-white/5 pb-3">
              <span className="text-neutral-500 text-xs tracking-widest">ROLE</span>
              <span className="text-white text-right font-sans font-semibold text-xs leading-tight">Java Developer<br/>QA Automation Engineer<br/>Full Stack Developer</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-3">
              <span className="text-neutral-500 text-xs tracking-widest">CORE_STACK</span>
              <span className="text-purple-300 font-bold">Java, Selenium, SQL</span>
            </div>
            <div className="flex justify-between items-end pb-3">
              <span className="text-neutral-500 text-xs tracking-widest">SYS_STATUS</span>
              <span className="text-green-400 flex items-center gap-3 font-bold tracking-widest">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                </span>
                ONLINE
              </span>
            </div>
          </div>

          <div className="mt-12 flex justify-center opacity-70 hover:opacity-100 transition-opacity duration-300" style={{ transform: "translateZ(30px)" }}>
            <a 
              href="https://wa.me/918248992657" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 group/qr cursor-pointer"
              title="Scan or click to chat on WhatsApp"
            >
              {/* Left Barcode Aesthetic */}
              <div className="h-8 w-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#fff_4px,#fff_8px)] opacity-40"></div>
              
              {/* The Scannable WhatsApp QR Code */}
              <div className="p-1 bg-white rounded shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover/qr:shadow-[0_0_25px_rgba(34,197,94,0.7)] group-hover/qr:scale-110 transition-all duration-300">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/918248992657&color=000000&bgcolor=ffffff" 
                  alt="Scan to WhatsApp" 
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Right Barcode Aesthetic */}
              <div className="h-8 w-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#fff_4px,#fff_8px)] opacity-40"></div>
            </a>
          </div>
        </div>
      </div>

      {/* 🔴 RIGHT SIDE: The Restored Terminal Text */}
      <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#6b21a8]/30 bg-[#6b21a8]/10 px-5 py-2.5">
          <span className="text-xs font-mono text-purple-400">~/system/whoami.exe</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.1] text-white">
          Delivering <br className="hidden lg:block"/> scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Web</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Automation</span>.
        </h2>
        <p className="text-neutral-400 font-sans text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
          Results-oriented IT graduate with strong proficiency in Core Java, Selenium Automation Testing, Full Stack Web Development, and Oracle SQL. Demonstrated ability to design and deliver end-to-end solutions.
        </p>
        
        {/* KEY STRENGTHS SECTION */}
        <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2 max-w-lg mx-auto lg:mx-0">
          {["Problem-Solving", "Quick Learner", "Team Collaboration", "Attention to Detail", "Analytical Thinking", "Communication", "Adaptability", "Time Management"].map((strength) => (
             <span key={strength} className="rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-mono text-neutral-300 border border-white/10 hover:bg-white/10 transition-colors">
               {strength}
             </span>
          ))}
        </div>
      </div>

    </div>
  );
}