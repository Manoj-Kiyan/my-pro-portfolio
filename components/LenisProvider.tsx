"use client";
import { useEffect, useRef, type ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const rafId = useRef<number | null>(null);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      const mod = await import("lenis");
      const Lenis = (mod && (mod as any).default) ?? mod;
      if (cancelled) return;
      const lenis = new Lenis({ smooth: true, duration: 1.2, lerp: 0.1 });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId.current = requestAnimationFrame(raf);
      }

      rafId.current = requestAnimationFrame(raf);
      (window as any).lenis = lenis;
    };

    setup();

    return () => {
      cancelled = true;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (lenisRef.current && typeof lenisRef.current.destroy === "function") {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
