import { client, urlFor } from "@/sanity/client"; 
import Image from "next/image";
import HeroAnimation from "@/components/HeroAnimation";
import NewsAnimation from "@/components/NewsAnimation";
import FloatingShape from "@/components/FloatingShape";
import AboutSection from "@/components/AboutSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import EducationTimeline from "@/components/EducationTimeline";
import Footer from "@/components/Footer";

// 🔴 Tells Next.js to NEVER cache this page. Always show live data!
export const revalidate = 0;

// 1. Define the Interface
interface NewsItem {
  _id: string;
  headline: string;
  image: any;
  summary: string;
  publishedAt: string;
}

// 2. Fetch Data
async function getNews() {
  const query = `*[_type == "newsItem"] | order(publishedAt desc) {
    _id,
    headline,
    image,
    summary,
    publishedAt
  }`;
  return client.fetch(query);
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

      {/* 🔴 SECTION 3: LATEST UPDATES (MOVED UP FOR BETTER UX) */}
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

        {/* NEWS GRID */}
        <NewsAnimation>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.length > 0 ? (
              news.map((item: NewsItem) => (
               <article 
                  key={item._id} 
                  className="news-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:-translate-y-2"
                >
                  {/* Image Area */}
                  {item.image && (
                    <div className="relative h-64 w-full overflow-hidden">
                       <Image 
                         src={urlFor(item.image).width(800).height(600).url()} 
                         alt={item.headline} 
                         fill 
                         className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-90" />
                    </div>
                  )}
                  
                  {/* Text Content */}
                  <div className="absolute bottom-0 p-6 z-10">
                    <div className="mb-3 font-mono text-xs text-[#6b21a8] tracking-wider">
                      {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="mb-2 text-2xl font-display font-bold leading-tight text-white transition-colors duration-300 group-hover:text-purple-300">
                      {item.headline}
                    </h3>
                    <p className="line-clamp-2 text-sm text-neutral-300 font-sans">
                      {item.summary}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center text-neutral-500">
                <p className="font-sans">No news published yet.</p>
                <p className="text-sm mt-2">Go to /studio to add content.</p>
              </div>
            )}
          </div>
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