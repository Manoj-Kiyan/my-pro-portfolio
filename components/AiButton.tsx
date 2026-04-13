"use client";

export default function AiButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-ai-agent"))}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 px-6 font-mono text-xs font-medium text-neutral-300 transition-all duration-300 hover:scale-105 hover:text-white focus:outline-none shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] active:scale-95"
    >
      {/* 🔴 The Razor-Thin Spinning Border */}
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#3b82f6_50%,#a855f7_100%)] opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

      {/* The Inner Dark Background (Creates the 1px border effect) */}
      <span className="absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-300 group-hover:bg-neutral-900/90" />

      {/* The Button Content */}
      <span className="relative flex items-center gap-2">
        <svg
          className="h-4 w-4 text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <span className="font-semibold tracking-widest">ASK_AI</span>
      </span>
    </button>
  );
}