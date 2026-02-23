import { client } from "@/sanity/client"; 
import HeroAnimation from "@/components/HeroAnimation";
import NewsAnimation from "@/components/NewsAnimation";
import FloatingShape from "@/components/FloatingShape";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import EducationTimeline from "@/components/EducationTimeline";
import Footer from "@/components/Footer";
// 🔴 THE NEW IMPORT: This is where your missing grid lines went! 
import NewsGrid from "@/components/NewsGrid"; 

// Tells Next.js to NEVER cache this page. Always show live data!
export const revalidate = 0;

// 2. Fetch Data (Upgraded to fetch PDFs and NEVER cache so you don't have to refresh!)
async function getNews() {
  const query = `*[_type == "newsItem"] | order(publishedAt desc) {
    _id,
    headline,
    image,
    "fileUrl": file.asset->url, 
    summary,
    publishedAt
  }`;
  // Force Next.js to fetch fresh data instantly
  return client.fetch(query, {}, { cache: 'no-store' });
}

export default async function Home() {
  const news = await getNews();

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-[#6b21a8] selection:text-white">
      
      {/* SECTION 1: HERO */}
      <HeroAnimation>
        <section className="relative flex h-[80vh] w-full flex-col items-center justify-center border-b border-neutral-900 overflow-hidden text-center">
          
          <FloatingShape />

          <h1 className="hero-title relative z-10 font-display text-7xl font-bold uppercase tracking-tighter text-white md:text-[9rem] leading-[0.9]">
            MANOJ KIYAN <br /> MK
          </h1>
          
          <p className="hero-subtext relative z-10 mt-8 max-w-lg font-sans text-xl text-neutral-400">
            ⓒBLUE FEATHER'Z
          </p>

        </section>
      </HeroAnimation>

      {/* SECTION 2: ABOUT ME (HOLO-BADGE) */}
      <AboutSection />

      {/* SECTION 3: LATEST UPDATES */}
      <section className="relative mx-auto max-w-7xl px-6 py-32 overflow-hidden">
        
        {/* Glowing Orbs for the Smoked Glass effect */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"></div>
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px]"></div>

        <div className="mb-16 flex items-center gap-4">
          <span className="relative flex h-3 w-3">
            {/* The Green Blinking Dot */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
            Latest Updates
          </h2>
        </div>

        {/* 🔴 THE MAGIC UPGRADE: Your old code is safely inside this component now! */}
        <NewsAnimation>
          <NewsGrid news={news} />
        </NewsAnimation>

      </section>

      {/* SECTION 4: PROJECTS GRID */}
      <ProjectsGrid />

      {/* SECTION 5: EDUCATION & EXPERIENCE TIMELINE */}
      <EducationTimeline />

      {/* SECTION 6: THE 3D FOOTER */}
      <Footer />

    </main>
  );
}