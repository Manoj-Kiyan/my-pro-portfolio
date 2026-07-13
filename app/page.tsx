import { client } from "@/sanity/client"; 
import HeroAnimation from "@/components/HeroAnimation";
import NewsAnimation from "@/components/NewsAnimation";
import FloatingShape from "@/components/FloatingShape";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import EducationTimeline from "@/components/EducationTimeline";
import Footer from "@/components/Footer";
import NewsGrid from "@/components/NewsGrid"; 
import Link from "next/link";
import AiAgent from "@/components/AiAgent"; 
import AiButton from "@/components/AiButton"; // 🔴 Imported the new interactive button!

export const revalidate = 0;

async function getNews() {
  const query = `*[_type == "newsItem"] | order(publishedAt desc) {
    _id,
    headline,
    image,
    "fileUrl": file.asset->url, 
    summary,
    publishedAt
  }`;
  return client.fetch(query, {}, { cache: 'no-store' });
}

export default async function Home() {
  const news = await getNews();

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-[#6b21a8] selection:text-white pb-20 md:pb-0 overflow-x-hidden">
      
      {/* 🔴 SECTION 1: THE PRECISION BENTO DASHBOARD */}
      <section id="top" className="relative min-h-screen w-full flex flex-col justify-center pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute top-[10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]"></div>
        <div className="pointer-events-none absolute bottom-[10%] right-[10%] -z-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[150px]"></div>
        <FloatingShape />

        <div className="w-full relative z-10 flex flex-col gap-6">
          
          {/* 🟢 TOP ROW: Text Grid (Left) & Photo Grid (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            
            {/* Box 1: Hero Text & AI Button (Takes up 2 columns) */}
            <div className="lg:col-span-2 rounded-[2rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl p-10 md:p-14 flex flex-col justify-center relative overflow-hidden group hover:bg-neutral-900/60 transition-all duration-500">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50"></div>
              
              <h1 className="hero-title font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white leading-[0.9]">
                MANOJ KIYAN MK
              </h1>
              
              <h2 className="mt-6 font-mono text-base md:text-lg text-purple-400 tracking-widest flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-purple-500 animate-pulse rounded-full shadow-[0_0_10px_#a855f7]"></span>
                {"< FULL_STACK_DEVELOPER & QA_AUTOMATION_ENGINEER />"}
              </h2>
              
              <p className="mt-8 max-w-lg font-sans text-neutral-400 leading-relaxed text-sm md:text-base">
                Passionate about writing clean, maintainable code and contributing to high-impact software products at scale. Actively seeking a challenging role to create measurable value. 
              </p>
              
              {/* 🔴 THE FIX: Using the Client Component Button instead of raw HTML! */}
              <div className="mt-10 flex gap-4">
                 <AiButton />
              </div>
            </div>

            {/* Box 2: The Orbital Photo (Takes up 1 column) */}
            <div className="lg:col-span-1 rounded-[2rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl p-10 flex items-center justify-center relative overflow-hidden group hover:bg-neutral-900/60 transition-all duration-500 min-h-[300px]">
              <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 z-10">
                {/* Spinning Orbital Rings */}
                <div className="absolute inset-0 rounded-full border border-white/5 border-t-purple-500 animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border border-white/5 border-b-blue-500 animate-[spin_3s_linear_infinite_reverse]"></div>
                
                {/* The Photo Container */}
                <div className="absolute inset-5 rounded-full bg-neutral-800 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                   <img 
                    src="/MK.jpeg" 
                    alt="Manoj Kiyan" 
                    className="w-full h-full object-cover transition-all duration-500 cursor-crosshair hover:scale-105" 
                  />
                   {/* Optional: Removed the purple overlay to keep the photo colors 100% natural */}
                </div>

                {/* Live Status Node */}
                <div className="absolute bottom-4 right-4 h-5 w-5 rounded-full bg-green-500 border-4 border-neutral-900 shadow-[0_0_15px_#22c55e] animate-pulse"></div>
              </div>
            </div>

          </div>

          {/* 🟢 BOTTOM ROW: Network Grid (Left) & Core Stack Grid (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Box 3: Network Status */}
            <div className="rounded-[2rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-between group hover:bg-neutral-900/60 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[200%] w-full -translate-y-full animate-[scan_3s_linear_infinite] pointer-events-none"></div>

              <div className="flex justify-between items-start relative z-10">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Network_Status</span>
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                </span>
              </div>
              
              <div className="flex items-end justify-between h-14 w-full mt-6 opacity-40 group-hover:opacity-80 transition-opacity duration-500 gap-1.5 px-2 relative z-10">
                 {[40, 70, 30, 90, 50, 80, 20, 60, 100, 40, 70, 50].map((height, i) => (
                    <div key={i} className="w-full bg-green-500 rounded-t-sm animate-pulse" style={{ height: `${height}%`, animationDelay: `${i * 0.1}s`, animationDuration: '1s' }}></div>
                 ))}
              </div>

              <div className="relative z-10 mt-6 border-t border-white/5 pt-4">
                <h3 className="font-mono text-2xl text-white font-bold tracking-tight">SYS_ONLINE</h3>
                <p className="font-mono text-[10px] text-green-400 mt-2 flex items-center gap-2 tracking-widest uppercase">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Chennai, IND Base
                </p>
              </div>
            </div>

            {/* Box 4: Tech Radar */}
            <div className="rounded-[2rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-between group transition-all duration-500 relative overflow-hidden min-h-[300px]">
               {/* Radar Sweep Background */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(107,33,168,0.3)_360deg)] animate-[spin_4s_linear_infinite] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
               
               <div className="flex justify-between items-start relative z-10">
                 <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Core_Stack</span>
                 <span className="font-mono text-[10px] text-purple-400 animate-pulse border border-purple-500/30 px-2 py-1 rounded">Scanning...</span>
               </div>
               
               {/* 🔴 NEW: Creative Central Radar / Hologram Visual */}
               <div className="relative flex-1 flex items-center justify-center w-full my-8 z-10">
                 {/* Concentric Radar Rings */}
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-[120px] h-[120px] rounded-full border border-purple-500/20 absolute animate-[ping_3s_linear_infinite]"></div>
                   <div className="w-[180px] h-[180px] rounded-full border border-purple-500/10 absolute animate-[ping_4s_linear_infinite]"></div>
                   <div className="w-[240px] h-[240px] border border-dashed border-white/5 rounded-full absolute animate-[spin_10s_linear_infinite]"></div>
                 </div>
                 
                 {/* Glowing Center Core */}
                 <div className="relative w-16 h-16 rounded-2xl bg-neutral-950 border border-purple-500/30 shadow-[0_0_30px_rgba(107,33,168,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-purple-500/20 rounded-2xl animate-pulse"></div>
                    <svg className="w-8 h-8 text-purple-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                 </div>
                 
                 {/* Floating Nodes */}
                 <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 <div className="absolute bottom-4 right-1/4 w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]"></div>
                 <div className="absolute top-10 right-8 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
               </div>
               
               {/* The Tech Pills */}
               <div className="flex flex-wrap justify-center gap-3 relative z-10 mt-auto">
                  {["Core Java", "Selenium", "SQL", "HTML5", "CSS3", "JavaScript"].map((tech) => (
                    <div key={tech} className="relative group/tech">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md blur opacity-0 group-hover/tech:opacity-75 transition duration-300"></div>
                      <span className="relative flex rounded-md border border-white/10 bg-black/80 px-4 py-1.5 font-mono text-[11px] font-semibold text-neutral-300 backdrop-blur-md transition-colors group-hover/tech:text-white group-hover/tech:border-purple-500/50">
                        {tech}
                      </span>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔴 SECTION 2: THE ABOUT SECTION */}
      <section id="about" className="relative w-full py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        <AboutSection />
      </section>

      {/* SECTION 3: LATEST UPDATES */}
      <section id="news" className="relative mx-auto max-w-7xl px-6 py-32 border-t border-white/5">
        <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"></div>
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px]"></div>

        <div className="mb-16 flex items-center gap-4">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
            Latest Updates
          </h2>
        </div>

        <NewsAnimation>
          <NewsGrid news={news} />
        </NewsAnimation>
      </section>

      {/* SECTION 4 & 5 & 6: PROJECTS, EXPERIENCE, CONTACT */}
      <div id="projects"><ProjectsGrid /></div>
      <div id="experience"><EducationTimeline /></div>
      <div id="contact"><Footer /></div>

      {/* 🔴 SECTION 7: THE AI SYSTEM MODAL */}
      <AiAgent />

    </main>
  );
}