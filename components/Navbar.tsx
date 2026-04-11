"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    
    if (href === "#top" || href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetId = href.substring(1); 
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // 🔴 UPDATES perfectly linked to #news
  const navLinks = [
    { name: "HOME", href: "#top", icon: <HomeIcon /> },
    { name: "ABOUT", href: "#about", icon: <UserIcon /> },
    { name: "UPDATES", href: "#news", icon: <ZapIcon /> },
    { name: "PROJECTS", href: "#projects", icon: <CodeIcon /> },
    { name: "EXPERIENCE", href: "#experience", icon: <BriefcaseIcon /> },
  ];

  return (
    <>
      {/* 💻 DESKTOP SIDEBAR */}
      <nav className="group hidden md:flex fixed left-0 top-0 z-50 h-screen w-20 flex-col justify-between overflow-hidden
        bg-black/10 backdrop-blur-[40px] border-r border-white/5 
        transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:w-[260px] hover:bg-black/40 hover:shadow-[30px_0_80px_rgba(0,0,0,0.6)] py-8">
        
        <div className="absolute inset-0 bg-transparent -z-20" style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}></div>

        {/* Ambient Glows */}
        <div className="absolute top-[20%] left-0 w-[200px] h-[300px] bg-purple-600/20 blur-[80px] rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 -z-10 pointer-events-none" style={{ transform: "translateZ(0)" }}></div>
        <div className="absolute bottom-[20%] left-0 w-[200px] h-[300px] bg-blue-600/20 blur-[80px] rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 -z-10 pointer-events-none" style={{ transform: "translateZ(0)" }}></div>

        {/* Laser Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent group-hover:via-blue-500/50 transition-all duration-700 pointer-events-none"></div>

        {/* Inner Content Wrapper */}
        <div className="flex flex-col h-full justify-between overflow-hidden w-full relative z-10">
          
          {/* TOP SECTION */}
          <div className="flex flex-col w-[260px] px-4 gap-6">
            
            {/* Logo */}
            <div className="flex items-center whitespace-nowrap px-2 mb-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-white/10 text-white font-mono font-bold text-sm shadow-[0_0_20px_rgba(107,33,168,0.4)] backdrop-blur-md">
                MK
              </div>
              <span className="ml-5 font-display font-bold text-sm tracking-widest text-white opacity-0 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 group-hover:opacity-100">
                SYS_CORE
              </span>
            </div>

            {/* Search Button */}
            <button 
              onClick={openSearch}
              className="group/btn relative flex items-center whitespace-nowrap rounded-xl px-3 py-3 w-[220px] text-neutral-400 transition-all hover:text-white hover:bg-white/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 rounded-xl"></div>
              <div className="shrink-0 relative z-10"><SearchIcon /></div>
              <div className="ml-6 flex items-center opacity-0 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 group-hover:opacity-100 relative z-10 w-full justify-between pr-2">
                <span className="font-mono text-xs tracking-widest font-semibold text-neutral-300 group-hover/btn:text-white">SEARCH</span>
                <kbd className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-sans text-[10px] text-neutral-500 shadow-inner">Ctrl K</kbd>
              </div>
            </button>

            {/* Navigation Links */}
            <div className="flex w-full flex-col gap-2 mt-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group/link relative flex items-center whitespace-nowrap rounded-xl px-3 py-3 w-[220px] text-neutral-400 transition-all hover:text-white hover:bg-white/5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/link:opacity-100 rounded-xl"></div>
                  <div className="shrink-0 relative z-10 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:text-purple-300">{link.icon}</div>
                  <span className="ml-6 font-mono text-xs tracking-widest font-semibold text-neutral-400 opacity-0 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 group-hover:opacity-100 group-hover/link:text-white relative z-10">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* BOTTOM SECTION - 🔴 CONTACT perfectly linked to Terminal Mail (#contact) */}
          <div className="flex w-[260px] flex-col px-4 relative z-10">
            <Link 
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="group/hire relative flex items-center whitespace-nowrap rounded-xl px-3 py-4 w-[220px] text-green-500 transition-all hover:text-green-300 hover:bg-green-500/10 overflow-hidden"
            >
              <div className="shrink-0 flex h-6 w-6 items-center justify-center relative z-10 pl-1">
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_15px_#22c55e]"></span>
              </div>
              <span className="ml-7 font-mono text-xs tracking-widest font-bold opacity-0 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 group-hover:opacity-100 relative z-10">
                INITIATE_CONTACT
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 📱 MOBILE NAV - Completely fixed spacing so nothing goes missing! */}
      <nav className={`md:hidden fixed bottom-4 left-4 right-4 z-[100] flex h-16 items-center rounded-2xl border border-white/10 bg-black/80 px-4 backdrop-blur-[30px] transition-all duration-300 ${scrolled ? 'shadow-[0_0_40px_rgba(0,0,0,0.8)]' : ''}`}>
        
        {/* Evenly spaced layout ensures all icons fit perfectly without scrolling */}
        <div className="flex items-center justify-between w-full">
          
          {/* Main Links */}
          {navLinks.map((link) => (
             <Link 
               key={link.name} 
               href={link.href} 
               onClick={(e) => handleLinkClick(e, link.href)}
               className="text-neutral-500 hover:text-white transition-colors p-2"
             >
               {link.icon}
             </Link>
          ))}

          {/* The Contact (Mail) Button - Fixed and Locked! */}
          <Link 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="text-green-500 hover:text-green-400 transition-colors p-2 relative"
          >
            <MailIcon />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
          </Link>

          {/* Search Button */}
          <button onClick={openSearch} className="text-neutral-500 hover:text-white transition-colors p-2">
            <SearchIcon />
          </button>
        </div>

      </nav>
    </>
  );
}

// --- PREMIUM SVG ICONS ---
function HomeIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>; }
function UserIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>; }
function ZapIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>; }
function BriefcaseIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>; }
function CodeIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>; }
function MailIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>; }
function SearchIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>; }