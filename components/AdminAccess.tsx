"use client";
import { useState } from "react";
import { verifyAdmin } from "@/app/actions/verifyAdmin";

export default function AdminAccess() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Call the highly secure Server Action
    const isValid = await verifyAdmin(password);
    
    setLoading(false);
    if (isValid) {
      window.location.href = "/studio";
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPassword("");
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-neutral-900 transition-all hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] ml-4"
        title="Admin Studio Access"
      >
        <span className="absolute inset-0 rounded-full bg-red-500 opacity-0 group-hover:animate-ping transition-opacity"></span>
        <svg className="h-4 w-4 text-neutral-500 group-hover:text-red-400 transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowModal(false)}></div>
          
          <div className="relative w-full max-w-sm bg-neutral-950 border border-red-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.15)] animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors rounded-full hover:bg-white/10 p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h3 className="font-mono font-bold text-red-500 mb-2 flex items-center gap-2 text-lg tracking-widest uppercase">
               <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
               RESTRICTED AREA
            </h3>
            <p className="text-xs text-neutral-400 font-sans mb-6 leading-relaxed">Are you the system administrator? Please enter the override passkey to access the Sanity Content Studio.</p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Passkey..."
                  className={`w-full bg-black/50 border ${error ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10 focus:border-red-500/50'} rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none transition-all`}
                  autoFocus
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-red-800' : 'bg-red-600 hover:bg-red-500'} text-white font-mono text-xs font-bold tracking-widest py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]`}
              >
                {loading ? 'VERIFYING...' : 'AUTHORIZE OVERRIDE'}
              </button>
            </form>

            {error && (
               <div className="mt-4 text-center text-[10px] font-mono tracking-widest py-2 rounded-lg border text-red-400 border-red-500/50 bg-red-500/10 animate-in fade-in zoom-in duration-200">
                 ACCESS DENIED. INVALID PASSKEY.
               </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
