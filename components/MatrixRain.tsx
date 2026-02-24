"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    const draw = () => {
      // Creates the fading trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // The green text
      ctx.fillStyle = "#22c55e"; 
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset drops to the top to create the staggered rain
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33); // 30 FPS for that authentic retro feel
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[999999] cursor-pointer bg-black" onClick={onClose}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-black/90 px-8 py-4 border border-green-500 text-green-500 font-mono text-xl md:text-3xl animate-pulse shadow-[0_0_40px_rgba(34,197,94,0.6)]">
          SYSTEM OVERRIDE. CLICK ANYWHERE TO EXIT.
        </div>
      </div>
    </div>
  );
}