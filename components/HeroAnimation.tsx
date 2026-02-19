"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HeroAnimation({ children }: { children: React.ReactNode }) {
  const container = useRef(null);

  useGSAP(() => {
    // 1. Reveal the Heading (Slide Up + Skew)
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5,
      skewY: 7,
      stagger: 0.2
    });

    // 2. Fade in the Subtext
    gsap.from(".hero-subtext", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      delay: 1.2
    });
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}