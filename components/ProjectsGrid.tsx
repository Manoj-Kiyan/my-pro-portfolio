"use client";

export default function ProjectsGrid() {
  const projects = [
    {
      id: "01",
      title: "EV Recharge Bunk Booking",
      category: "Full Stack Web App",
      description: "Built a real-time EV slot booking platform with separate Admin and User modules, using Firebase Auth and Firestore for live data.",
      tech: ["HTML5", "CSS3", "JS", "Firebase", "Google Maps API"],
      accent: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
      gradient: "from-cyan-500/20 to-blue-600/20 group-hover:from-cyan-500/40 group-hover:to-blue-600/40"
    },
    {
      id: "02",
      title: "LinkedIn Automation",
      category: "Test Automation",
      description: "Built an automation script in Java and Selenium to extract LinkedIn profile and search data across multiple pages.",
      tech: ["Java", "Selenium", "XPath", "CSS Selectors"],
      accent: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]",
      gradient: "from-yellow-500/20 to-orange-600/20 group-hover:from-yellow-500/40 group-hover:to-orange-600/40"
    },
    {
      id: "03",
      title: "AI-Powered Quiz Game",
      category: "AI & Web Dev",
      description: "Interactive quiz app that generates trivia questions, choices, and scoring from user prompts using a generative AI API.",
      tech: ["JS", "HTML5", "CSS3", "REST APIs"],
      accent: "group-hover:shadow-[0_0_30px_rgba(107,33,168,0.4)]",
      gradient: "from-purple-500/20 to-indigo-600/20 group-hover:from-purple-500/40 group-hover:to-indigo-600/40"
    },
    {
      id: "04",
      title: "Professional Portfolio",
      category: "Frontend Dev",
      description: "Designed and built a personal portfolio site with smooth animations, mobile-first responsive layout, and basic SEO practices.",
      tech: ["HTML5", "CSS3", "JS", "Tailwind/Bootstrap"],
      accent: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]",
      gradient: "from-green-500/20 to-emerald-600/20 group-hover:from-green-500/40 group-hover:to-emerald-600/40"
    },
    {
      id: "05",
      title: "Food Ordering & Travel App",
      category: "Frontend Dev",
      description: "Built the frontend for a combined portal, converting Figma wireframes into responsive Bootstrap pages with simple navigation.",
      tech: ["HTML5", "CSS3", "JS", "Bootstrap", "Figma"],
      accent: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]",
      gradient: "from-red-500/20 to-orange-600/20 group-hover:from-red-500/40 group-hover:to-orange-600/40"
    }
  ];

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-24">
      
      {/* Section Header */}
      <div className="mb-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
          <span className="text-xs font-mono text-neutral-400">~/system/projects.sh</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Outputs.</span>
        </h2>
      </div>

      {/* The Interactive Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article 
            key={project.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-3 ${project.accent}`}
          >
            {/* Animated Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 pointer-events-none -z-10 ${project.gradient}`}></div>
            
            {/* Top Area: ID and Category */}
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-2xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                {project.id}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {project.category}
              </span>
            </div>

            {/* Middle Area: Title and Description */}
            <div className="flex-grow">
              <h3 className="mb-3 text-2xl font-display font-bold text-white">
                {project.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                {project.description}
              </p>
            </div>

            {/* Bottom Area: Tech Stack & View Button */}
            <div className="mt-auto">
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span 
                    key={index}
                    className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-neutral-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <button className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-white/10">
                <span>INITIALIZE_VIEW</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}