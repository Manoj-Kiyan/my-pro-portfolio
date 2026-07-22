"use client";
import { useState, useEffect } from "react";

export default function AiButton() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configStatus, setConfigStatus] = useState<{type: "success" | "error" | null, msg: string}>({ type: null, msg: "" });
  return (
    <div className="flex items-center gap-6">
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

      <button 
        onClick={() => setShowConfigModal(true)}
        className="text-[11px] font-mono text-neutral-500 hover:text-purple-400 transition-colors hidden md:block underline decoration-neutral-800 hover:decoration-purple-400/50 underline-offset-4"
      >
        Configure custom API key?
      </button>

      {/* 🔴 CONFIGURATION POPUP MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowConfigModal(false)}></div>
          
          <div className="relative w-full max-w-sm bg-neutral-950 border border-purple-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(107,33,168,0.3)] animate-in zoom-in-95 duration-200">
            
            <button onClick={() => setShowConfigModal(false)} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors rounded-full hover:bg-white/10 p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h3 className="font-sans font-semibold text-white mb-6 flex items-center gap-2">
               <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
               LLM Configuration
            </h3>

            <div className="mb-4">
              <label className="block font-mono text-[10px] text-purple-400 mb-1.5 uppercase tracking-widest">Select Core</label>
              <select 
                id="modal-model-select"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-sans focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer"
                defaultValue="Gemini"
              >
                 <option value="Gemini">Google Gemini (Free)</option>
                 <option value="OpenAI">OpenAI (GPT)</option>
                 <option value="Groq">Groq (Llama 3)</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block font-mono text-[10px] text-purple-400 mb-1.5 uppercase tracking-widest">Access Key</label>
              <input 
                type="password" 
                id="modal-api-key"
                placeholder="Enter API Key..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-purple-500/50 placeholder-neutral-600"
              />
            </div>

            <button 
              onClick={() => {
                const model = (document.getElementById('modal-model-select') as HTMLSelectElement)?.value;
                const key = (document.getElementById('modal-api-key') as HTMLInputElement)?.value.trim();
                
                let isValid = false;
                if (!key) {
                  setConfigStatus({ type: "error", msg: "KEY REQUIRED" });
                  return;
                }
                
                if (model === "Gemini" && key.startsWith("AIza")) isValid = true;
                else if (model === "OpenAI" && key.startsWith("sk-")) isValid = true;
                else if (model === "Groq" && key.startsWith("gsk_")) isValid = true;
                
                if (!isValid) {
                  setConfigStatus({ type: "error", msg: `INVALID ${model.toUpperCase()} KEY` });
                } else {
                  localStorage.setItem('mk_api_provider', model);
                  localStorage.setItem('mk_api_key', key);
                  setConfigStatus({ type: "success", msg: "NEURAL LINK SAVED!" });
                  window.dispatchEvent(new Event('api-key-updated'));
                  setTimeout(() => {
                    setShowConfigModal(false);
                    setConfigStatus({ type: null, msg: "" });
                  }, 1500);
                }
              }}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold tracking-widest py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              SAVE_CONFIG
            </button>

            {configStatus.msg && (
              <div className={`mt-4 text-center text-[10px] font-mono tracking-widest py-2 rounded-lg border animate-in fade-in zoom-in duration-200 ${configStatus.type === 'success' ? 'text-green-400 border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'text-red-400 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]'}`}>
                {configStatus.msg}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}