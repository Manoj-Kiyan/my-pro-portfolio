"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface NewsItem {
  _id: string;
  headline: string;
  image: any;
  fileUrl: string; 
  summary: string;
  publishedAt: string;
}

export default function NewsGrid({ news }: { news: NewsItem[] }) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // 🔴 NEW: Refs and State for the Click-and-Drag Panning feature!
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Lock background scrolling
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedNews]);

  const handleClose = () => {
    setSelectedNews(null);
    setTimeout(() => setIsZoomed(false), 500); 
  };

  // 🔴 NEW: Mouse event functions for Click-and-Drag panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed || !scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setStartY(e.pageY - scrollContainerRef.current.offsetTop);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setScrollTop(scrollContainerRef.current.scrollTop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const y = e.pageY - scrollContainerRef.current.offsetTop;
    const walkX = (x - startX) * 1.5; // Drag speed multiplier
    const walkY = (y - startY) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
    scrollContainerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* THE GRID OF CLICKABLE CARDS */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.length > 0 ? (
          news.map((item: NewsItem) => (
            <article 
              key={item._id} 
              onClick={() => setSelectedNews(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-[#6b21a8]/50 hover:bg-[#6b21a8]/10 hover:-translate-y-2"
            >
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
              
              <div className={`absolute bottom-0 p-6 z-10 w-full ${!item.image ? "relative h-full flex flex-col justify-end" : ""}`}>
                <div className="mb-3 flex items-center justify-between font-mono text-xs tracking-wider">
                  <span className="text-[#6b21a8]">
                    {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-purple-400">
                    OPEN_FILE ↵
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-display font-bold leading-tight text-white transition-colors duration-300 group-hover:text-purple-300">
                  {item.headline}
                </h3>
                <p className="line-clamp-2 text-sm text-neutral-300 font-sans">
                  {item.summary}
                </p>
                {item.fileUrl && (
                  <span className="mt-3 inline-block rounded bg-red-500/20 px-2 py-1 font-mono text-[10px] text-red-400 border border-red-500/30">
                    PDF_ATTACHED
                  </span>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-3 py-20 text-center text-neutral-500">
            <p className="font-sans">No news published yet.</p>
          </div>
        )}
      </div>

      {/* THE "LETTER PAD" MODAL */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 overscroll-contain ${
          selectedNews ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Dark blurred background */}
        <div 
          className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-pointer"
          onClick={handleClose}
        ></div>

        <div 
          className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-[#6b21a8]/40 bg-neutral-900/95 shadow-[0_0_50px_rgba(107,33,168,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] overscroll-contain ${
            selectedNews ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
          }`}
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-red-500 hover:rotate-90 border border-white/10"
          >
            ✕
          </button>

          {/* SCENARIO 1: PDF UPLOADED */}
          {selectedNews?.fileUrl ? (
            <iframe 
              src={selectedNews.fileUrl} 
              className="w-full h-[50vh] border-b border-white/10 bg-white"
              title="PDF Viewer"
            />
          ) : 
          /* SCENARIO 2: IMAGE VIEWER (NOW WITH CLICK & DRAG!) */
          selectedNews?.image ? (
            <div 
              // 🔴 Attached the ref and mouse events here! Added overscroll-none to kill the scroll leak!
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseUpOrLeave}
              onMouseUp={handleMouseUpOrLeave}
              onMouseMove={handleMouseMove}
              className={`relative w-full border-b border-white/10 bg-neutral-950 transition-all duration-500 custom-scrollbar overscroll-none ${
                isZoomed ? "h-[65vh] overflow-auto cursor-grab active:cursor-grabbing" : "h-64 sm:h-[40vh] overflow-hidden"
              }`}
            >
              <div className={`relative transition-all duration-500 mx-auto pointer-events-none ${
                isZoomed ? "h-[1200px] w-[150%] sm:w-[120%]" : "h-full w-full"
              }`}>
                <Image 
                  src={urlFor(selectedNews.image).url()} 
                  alt={selectedNews.headline} 
                  fill 
                  className={`transition-all duration-500 ${
                    isZoomed ? "object-contain object-top" : "object-contain p-4 sm:p-8"
                  }`}
                  draggable={false} // Prevents the browser from trying to "save" the image when you drag
                />
              </div>

              {/* Floating Zoom Button */}
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-purple-500/50 bg-black/70 px-4 py-2 font-mono text-[10px] text-white backdrop-blur-md transition-all hover:bg-[#6b21a8] hover:text-white shadow-[0_0_15px_rgba(107,33,168,0.5)]"
              >
                {isZoomed ? (
                  <><span>✕</span> MINIMIZE</>
                ) : (
                  <><span>⛶</span> FULL RES & ZOOM</>
                )}
              </button>
            </div>
          ) : 
          /* SCENARIO 3: TEXT ONLY */
          (
            <div className="h-24 w-full border-b border-[#6b21a8]/30 bg-gradient-to-r from-[#6b21a8]/20 to-transparent flex items-end px-8 pb-4">
               <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">Classified Memo</span>
            </div>
          )}

          {/* Text Content */}
          <div className="p-8 overflow-y-auto custom-scrollbar flex-1 overscroll-contain">
            <div className="mb-4 inline-flex items-center gap-2 rounded border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-[10px] text-purple-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              PUBLISHED: {selectedNews && new Date(selectedNews.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            
            <h2 className="mb-6 font-display text-3xl font-bold text-white sm:text-4xl">
              {selectedNews?.headline}
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="font-sans text-base md:text-lg leading-relaxed text-neutral-300 whitespace-pre-wrap">
                {selectedNews?.summary}
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 bg-neutral-950/80 px-8 py-4 flex justify-between items-center font-mono text-[10px] text-neutral-500">
            <span>// END OF TRANSMISSION</span>
            <span>AUTH: MANOJ KIYAN</span>
          </div>
        </div>
      </div>
    </>
  );
}