"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

// Define what a News Item looks like (now including fileUrl for PDFs)
interface NewsItem {
  _id: string;
  headline: string;
  image: any;
  fileUrl: string; // For PDFs!
  summary: string;
  publishedAt: string;
}

export default function NewsGrid({ news }: { news: NewsItem[] }) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Lock the background scrolling when the Letter Pad is open
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedNews]);

  return (
    <>
      {/* 1. THE GRID OF CLICKABLE CARDS */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.length > 0 ? (
          news.map((item: NewsItem) => (
            <article 
              key={item._id} 
              // 🔴 THE MAGIC: Make the whole card clickable!
              onClick={() => setSelectedNews(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-[#6b21a8]/50 hover:bg-[#6b21a8]/10 hover:-translate-y-2"
            >
              {/* Image Area (Only shows if an image exists) */}
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
                {/* PDF Badge Indicator */}
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

      {/* 🔴 2. THE "LETTER PAD" / AD BOARD MODAL */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${
          selectedNews ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Dark blurred background (Click to close) */}
        <div 
          className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
          onClick={() => setSelectedNews(null)}
        ></div>

        {/* The Glass Document Sheet */}
        <div 
          className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-[#6b21a8]/40 bg-neutral-900/95 shadow-[0_0_50px_rgba(107,33,168,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            selectedNews ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
          }`}
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedNews(null)}
            className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-red-500 border border-white/10"
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
          /* SCENARIO 2: IMAGE UPLOADED */
          selectedNews?.image ? (
            <div className="relative h-64 w-full border-b border-white/10 sm:h-[40vh]">
              <Image 
                src={urlFor(selectedNews.image).width(1200).height(800).url()} 
                alt={selectedNews.headline} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
            </div>
          ) : 
          /* SCENARIO 3: TEXT ONLY (Ad Board Header) */
          (
            <div className="h-24 w-full border-b border-[#6b21a8]/30 bg-gradient-to-r from-[#6b21a8]/20 to-transparent flex items-end px-8 pb-4">
               <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">Classified Memo</span>
            </div>
          )}

          {/* Modal Text Content (The Letter Pad) */}
          <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
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
          
          {/* Modal Footer */}
          <div className="border-t border-white/10 bg-neutral-950/80 px-8 py-4 flex justify-between items-center font-mono text-[10px] text-neutral-500">
            <span>// END OF TRANSMISSION</span>
            <span>AUTH: MANOJ KIYAN</span>
          </div>
        </div>
      </div>
    </>
  );
}