"use client";

import { useState, useRef, useEffect } from "react";

interface Log {
  id: number;
  text: string;
  color: string;
}

export default function TerminalContact() {
  // Initial terminal boot text
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, text: "mk-os v2.0.4 initialized.", color: "text-neutral-500" },
    { id: 2, text: "> ./secure_comm.sh", color: "text-purple-400" },
    { id: 3, text: "Enter your email address to establish connection:", color: "text-green-400" },
  ]);
  
  const [input, setInput] = useState("");
  const [step, setStep] = useState<"email" | "message" | "sending" | "done">("email");
  const [email, setEmail] = useState("");
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the bottom when new text appears
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Focus the input when clicking anywhere on the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const addLog = (text: string, color: string = "text-white") => {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), text, color }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const userInput = input.trim();
      setInput("");

      // Echo what the user typed
      addLog(`guest@mk-os:~$ ${userInput}`, "text-neutral-300");

      if (step === "email") {
        // Quick email validation
        if (!userInput.includes("@") || !userInput.includes(".")) {
          addLog("ERROR: Invalid email format. Try again.", "text-red-500");
          addLog("Enter your email address:", "text-green-400");
          return;
        }
        setEmail(userInput);
        setStep("message");
        addLog("Email verified. Secure channel opened.", "text-purple-400");
        addLog("Enter your message:", "text-green-400");
      
      } else if (step === "message") {
        setStep("sending");
        addLog("Message received.", "text-purple-400");
        
        // 🔴 THE MAGIC: Cinematic Hacker Sending Sequence!
        addLog("> Encrypting payload (AES-256)...", "text-neutral-500");
        
        setTimeout(() => {
          addLog("> Establishing secure tunnel...", "text-neutral-500");
        }, 800);

        setTimeout(() => {
          addLog("> Transmitting data to mk_mainframe...", "text-neutral-500");
        }, 1600);

        setTimeout(() => {
          addLog("[SUCCESS] Transmission complete. MK will contact you soon.", "text-green-400");
          setStep("done");
          
          // Fallback to safely open their email client so it actually sends to you!
          setTimeout(() => {
            window.location.href = `mailto:contact@mk.dev?subject=New Transmission from ${email}&body=${userInput}`;
          }, 1500);

        }, 2600);
      }
    }
  };

  return (
    <div 
      onClick={handleTerminalClick}
      className="w-full max-w-lg cursor-text overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 shadow-[0_0_30px_rgba(107,33,168,0.15)] backdrop-blur-md transition-all hover:border-[#6b21a8]/50"
    >
      {/* Mac/Linux Terminal Header */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
        <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
        <span className="ml-2 font-mono text-[10px] text-neutral-500">guest@mk-os:~</span>
      </div>

      {/* Terminal Body */}
      <div className="h-64 overflow-y-auto p-4 font-mono text-sm custom-scrollbar sm:text-base">
        
        {/* Render all past logs */}
        <div className="flex flex-col gap-2">
          {logs.map((log) => (
            <div key={log.id} className={`${log.color} break-words`}>
              {log.text}
            </div>
          ))}
        </div>

        {/* The Active Input Line */}
        {step !== "sending" && step !== "done" && (
          <div className="mt-2 flex items-center text-white">
            <span className="mr-2 text-purple-500">guest@mk-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white focus:outline-none"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        )}

        {/* Invisible div to force auto-scroll to bottom */}
        <div ref={endOfMessagesRef} className="h-1" />
      </div>
    </div>
  );
}