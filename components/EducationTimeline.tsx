"use client";

export default function EducationTimeline() {
  const timelineData = [
    {
      id: 1,
      year: "CGPA: 7.89",
      role: "B.Tech - Information Technology",
      institution: "University College of Engineering, BIT Campus, Tiruchirappalli",
      type: "DEGREE",
      description: "Graduated in Information Technology with a strong foundation in core computer science principles and software development.",
      color: "text-green-400",
      border: "border-green-500/30",
      bg: "bg-green-500/10"
    },
    {
      id: 2,
      year: "Score: 80.7%",
      role: "Higher Secondary Certificate",
      institution: "Kalaimagal Matric Hr. Secondary School, Thiruchitrambalam",
      type: "HSC",
      description: "Completed higher secondary education with a focus on mathematics and science.",
      color: "text-[#6b21a8]",
      border: "border-[#6b21a8]/30",
      bg: "bg-[#6b21a8]/10"
    },
    {
      id: 3,
      year: "Score: 87.6%",
      role: "Secondary School Leaving Cert.",
      institution: "Kalaimagal Matric Hr. Secondary School, Thiruchitrambalam",
      type: "SSLC",
      description: "Completed secondary education, building strong fundamentals for future academic pursuits.",
      color: "text-indigo-400",
      border: "border-indigo-500/30",
      bg: "bg-indigo-500/10"
    },
    {
      id: 4,
      year: "Completed",
      role: "Professional Certifications",
      institution: "QSpider, Chennai Vadapalani",
      type: "CERTIFIED",
      description: "Completed specialized training in Core Java & Advanced Java (JDBC, Hibernate), Selenium WebDriver with Java (Automation Testing), and Oracle SQL.",
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10"
    }
  ];

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-32 overflow-hidden">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-[400px] w-[200px] -translate-y-1/2 bg-purple-600/20 blur-[120px]"></div>

      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-white">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">History.</span>
        </h2>
        <p className="mt-4 font-mono text-sm text-neutral-500">~/user/mk/records.log</p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative mx-auto max-w-4xl">
        
        {/* The Vertical Laser Line */}
        <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-indigo-500 to-transparent md:left-1/2 md:-ml-[2px] rounded-full opacity-50 shadow-[0_0_15px_rgba(107,33,168,0.8)]"></div>

        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative flex flex-col md:flex-row items-center justify-between group ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              
              {/* Timeline Dot (The glowing node) */}
              <div className="absolute left-8 md:left-1/2 h-4 w-4 -translate-x-[6px] md:-translate-x-1/2 rounded-full bg-neutral-950 border-2 border-purple-500 shadow-[0_0_10px_rgba(107,33,168,0.8)] transition-all duration-300 group-hover:bg-purple-500 group-hover:scale-150 z-10"></div>

              {/* Empty Space for the other side (Desktop only) */}
              <div className="hidden md:block md:w-5/12"></div>

              {/* Content Card */}
              <div className="ml-16 md:ml-0 w-full md:w-5/12">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-md p-6 transition-all duration-300 hover:bg-neutral-800/80 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  
                  {/* Top Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest ${item.color} ${item.border} ${item.bg}`}>
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-neutral-500">{item.year}</span>
                  </div>

                  {/* Text Content */}
                  <h3 className="mb-1 font-display text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.role}
                  </h3>
                  <h4 className="mb-4 font-sans text-sm font-semibold text-neutral-400">
                    @ {item.institution}
                  </h4>
                  <p className="font-sans text-sm leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}