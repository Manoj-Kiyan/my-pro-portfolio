"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  if (!isOpen) return null;

  const links = [
    { name: "HOME", href: "#top", icon: "🏠" },
    { name: "ABOUT ME", href: "#about", icon: "👤" },
    { name: "PROJECTS", href: "#projects", icon: "💻" },
    { name: "EXPERIENCE", href: "#experience", icon: "⏳" },
    { name: "CONTACT", href: "#contact", icon: "✉️" },
  ];

  const filteredLinks = links.filter(link => 
    link.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔴 THE MAGIC SMOOTH SCROLL FUNCTION
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Stop the default instant jump
    setIsOpen(false);   // Close the holographic menu

    // Wait exactly 150ms for the menu to fade away, then glide to the section
    setTimeout(() => {
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 150); 
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 sm:pt-40">
      <div 
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl border border-[#6b21a8]/50 bg-neutral-900/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(107,33,168,0.3)] transition-all p-4 mx-4">
        
        <div className="flex items-center border-b border-white/10 pb-4">
          <span className="text-purple-500 mr-3 animate-pulse">❯</span>
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none font-mono text-lg"
            placeholder="Search command or jump to..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <kbd className="ml-3 hidden rounded border border-white/20 bg-white/5 px-2 py-1 font-sans text-[10px] text-neutral-400 sm:block">
            ESC
          </kbd>
        </div>

        <div className="mt-4 max-h-72 overflow-y-auto custom-scrollbar">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 font-mono">
            System Links
          </h3>
          <ul className="space-y-2 font-mono text-sm">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    // 🔴 Using our custom smooth scroll function here!
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group flex items-center justify-between rounded-lg px-4 py-3 text-neutral-300 transition-all hover:bg-[#6b21a8]/20 hover:text-white hover:translate-x-1 border border-transparent hover:border-[#6b21a8]/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="opacity-70 group-hover:opacity-100">{link.icon}</span>
                      <span>{link.name}</span>
                    </div>
                    <span className="text-purple-500 opacity-0 transition-opacity group-hover:opacity-100">
                      ↵
                    </span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-neutral-500 flex flex-col items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <span>Command not found: "{searchQuery}"</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}