"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,         // 0.1 is the absolute sweet spot. Higher = faster & sharper.
        smoothWheel: true, // Enables smooth scrolling for mouse wheels
        syncTouch: true,   // Forces mobile touch to be instantly responsive
      }}
    >
      {children}
    </ReactLenis>
  );
}