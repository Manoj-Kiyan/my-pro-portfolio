"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function NewsAnimation({ children }: { children: React.ReactNode }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".news-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Animation starts when top of section hits 80% of viewport
        toggleActions: "play none none reverse", // Play on enter, reverse on leave
      },
      y: 50, // Move up by 50px
      opacity: 0, // Start invisible
      duration: 0.8,
      stagger: 0.2, // Delay 0.2s between each card
      ease: "power3.out"
    });
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}