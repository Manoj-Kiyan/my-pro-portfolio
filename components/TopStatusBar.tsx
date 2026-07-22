"use client";
import { useState, useEffect } from "react";

export default function TopStatusBar() {
  const [time, setTime] = useState<Date | null>(null);
  const [text, setText] = useState("");
  const fullText = "ENGINEERING THE FUTURE, ONE LINE AT A TIME.";
  
  // Real-time clock tick
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Force scroll to top on page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // If there's a hash in the URL, remove it so it doesn't jump back down
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

  // Terminal Typewriter Effect
  useEffect(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);
    return () => clearInterval(typeTimer);
  }, []);

  if (!time) return null; // Avoid hydration mismatch on initial server render

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 py-4 border border-white/5 bg-neutral-900/40 backdrop-blur-xl rounded-[2rem] shadow-[0_0_40px_rgba(107,33,168,0.15)] relative overflow-hidden group transition-all duration-500 hover:bg-neutral-900/60">
      
      {/* 🔴 Sparkling / Grid Background Design */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)]"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

      {/* Left Side: Typewriter Slogan */}
      <div className="relative z-10 flex items-center gap-4 w-full md:w-auto">
         <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
         <span className="font-mono text-xs md:text-sm text-purple-300 font-semibold tracking-widest uppercase text-shadow-sm">
           {text}
           <span className="animate-[pulse_0.8s_infinite] ml-1 bg-purple-500 w-2 h-4 inline-block align-middle opacity-80"></span>
         </span>
      </div>

      {/* Right Side: Real Date & Time + Contact Icon */}
      <div className="relative z-10 flex items-center gap-6 mt-4 md:mt-0">
         
         <div className="flex flex-col items-end font-display">
           <div className="text-xl md:text-2xl font-bold text-white tracking-widest drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
             {time.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
           </div>
           <div className="text-[10px] md:text-xs font-mono text-neutral-400 uppercase tracking-widest mt-1">
             {time.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
           </div>
         </div>

         <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>

         <div className="flex items-center gap-3">
           {/* WhatsApp */}
           <a 
             href="https://wa.me/918248992657" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 border border-white/5 transition-all duration-300 hover:scale-110 hover:border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.05)] hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]"
             title="WhatsApp"
           >
             <svg className="w-5 h-5 text-neutral-400 group-hover:text-green-500 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
             </svg>
           </a>

           {/* LinkedIn */}
           <a 
             href="https://www.linkedin.com/in/manoj-kiyan-m-326b8a406" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 border border-white/5 transition-all duration-300 hover:scale-110 hover:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.05)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
             title="LinkedIn"
           >
             <svg className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
               <rect x="2" y="9" width="4" height="12"></rect>
               <circle cx="4" cy="4" r="2"></circle>
             </svg>
           </a>

           {/* Mail / Contact Form */}
           <button 
             onClick={() => {
               const element = document.getElementById('contact');
               if (element) {
                 element.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }
             }}
             className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 border border-white/5 transition-all duration-300 hover:scale-110 hover:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
             title="Initiate Contact"
           >
             <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] animate-pulse border-2 border-neutral-950"></span>
             <svg className="w-5 h-5 text-neutral-400 group-hover:text-purple-400 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
               <polyline points="22,6 12,13 2,6"></polyline>
             </svg>
           </button>
         </div>
         
      </div>
    </div>
  );
}
