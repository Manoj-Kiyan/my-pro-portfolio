import { client } from "@/sanity/client"; 
import HeroAnimation from "@/components/HeroAnimation";
import NewsAnimation from "@/components/NewsAnimation";
import FloatingShape from "@/components/FloatingShape";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import EducationTimeline from "@/components/EducationTimeline";
import Footer from "@/components/Footer";
import NewsGrid from "@/components/NewsGrid"; 

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
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-[#6b21a8] selection:text-white">
      
      {/* SECTION 1: HERO */}
      <HeroAnimation>
        <section id="top" className="relative flex h-[80vh] w-full flex-col items-center justify-center border-b border-neutral-900 overflow-hidden text-center">
          <FloatingShape />
          <h1 className="hero-title relative z-10 font-display text-7xl font-bold uppercase tracking-tighter text-white md:text-[9rem] leading-[0.9]">
            MANOJ KIYAN <br /> MK
          </h1>
          <p className="hero-subtext relative z-10 mt-8 max-w-lg font-sans text-xl text-neutral-400">
            ⓒBLUE FEATHER'Z
          </p>
        </section>
      </HeroAnimation>

      {/* SECTION 2: ABOUT ME */}
      <div id="about">
        <AboutSection />
      </div>

      {/* SECTION 3: LATEST UPDATES */}
      <section id="news" className="relative mx-auto max-w-7xl px-6 py-32 overflow-hidden">
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

      {/* SECTION 4: PROJECTS */}
      <div id="projects">
        <ProjectsGrid />
      </div>

      {/* SECTION 5: EXPERIENCE */}
      <div id="experience">
        <EducationTimeline />
      </div>

      {/* 🔴 THE FIX: Removed the extra Contact section! The Footer is now the only one. */}
      {/* SECTION 6: THE 3D FOOTER (Now holds the #contact ID) */}
      <div id="contact">
        <Footer />
      </div>

    </main>
  );
}