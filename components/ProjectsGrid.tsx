"use client";

export default function ProjectsGrid() {
  // Pre-loaded with your actual projects!
  const projects = [
    {
      id: "01",
      title: "HubFire",
      category: "3D Game Development",
      description: "An immersive 3D endless runner mobile game featuring a synthwave aesthetic, high-speed neon grids, and dynamic water obstacles.",
      tech: ["Unity", "C#", "3D Design"],
      accent: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
      gradient: "from-cyan-500/20 to-blue-600/20 group-hover:from-cyan-500/40 group-hover:to-blue-600/40"
    },
    {
      id: "02",
      title: "TVK Client Portal",
      category: "Frontend & UI/UX",
      description: "A high-performance digital dashboard and public-facing portal featuring dynamic data integration, AI-generated visuals, and modern styling.",
      tech: ["Next.js", "Tailwind", "Sanity CMS"],
      accent: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]",
      gradient: "from-yellow-500/20 to-orange-600/20 group-hover:from-yellow-500/40 group-hover:to-orange-600/40"
    },
    {
      id: "03",
      title: "Cyber-OS Architecture",
      category: "Web Application",
      description: "A futuristic, terminal-inspired portfolio and client gateway featuring 3D glassmorphism interactions and custom data schemas.",
      tech: ["React", "TypeScript", "SQL"],
      accent: "group-hover:shadow-[0_0_30px_rgba(107,33,168,0.4)]",
      gradient: "from-purple-500/20 to-indigo-600/20 group-hover:from-purple-500/40 group-hover:to-indigo-600/40"
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