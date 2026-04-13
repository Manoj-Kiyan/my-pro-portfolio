"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "ai" | "user" | "system";
  text: string;
}

export default function AiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // UI States
  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash"); // Defaulting to Flash!
  const [showModelSelect, setShowModelSelect] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔴 THE SCROLL BUG FIX: Lock the body scroll when Chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function just in case the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModelSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen for the trigger from the Hero Button
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      if (messages.length === 0) bootSequence();
    };
    window.addEventListener("open-ai-agent", handleOpen);
    return () => window.removeEventListener("open-ai-agent", handleOpen);
  }, [messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const bootSequence = () => {
    setMessages([{ id: "sys-1", sender: "system", text: "ESTABLISHING SECURE NEURAL LINK..." }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { id: "ai-1", sender: "ai", text: "Connection established. I am MK Intelligence. You can select my processing core using the '+' icon. How may I assist you today?" }
      ]);
    }, 1200);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, model: selectedModel })
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "system", text: "NETWORK ERROR: COULD NOT REACH AI CORE." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setInput("Listening...");
    } else {
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)}></div>

      <div className="relative w-full max-w-3xl h-[85vh] max-h-[800px] flex flex-col bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        
        {/* Sleek Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-neutral-900/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
               <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">MK Intelligence</h3>
              <p className="font-mono text-[10px] text-green-400">CORE: {selectedModel.toUpperCase()}</p>
            </div>
          </div>
          
          <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar bg-neutral-950">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              
              {msg.sender === "system" && (
                <div className="w-full text-center my-4">
                  <span className="font-mono text-[10px] text-neutral-600 tracking-widest uppercase">{msg.text}</span>
                </div>
              )}

              {msg.sender === "ai" && (
                <div className="flex items-start gap-4 max-w-[90%] md:max-w-[80%]">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="font-sans text-base text-neutral-200 leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              )}

              {msg.sender === "user" && (
                <div className="bg-neutral-800 text-white rounded-3xl rounded-tr-sm px-5 py-3 max-w-[85%] md:max-w-[70%] shadow-sm">
                  <p className="font-sans text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start max-w-[80%]">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                  <svg className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <div className="flex items-center gap-1.5 px-2">
                  <span className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* The Input Area */}
        <div className="p-4 md:p-6 bg-neutral-950 border-t border-white/5 relative">
          
          {/* Model Selector Drop-Up Menu */}
          {showModelSelect && (
            <div ref={dropdownRef} className="absolute bottom-24 left-6 bg-neutral-800 border border-white/10 rounded-xl p-2 shadow-2xl z-50 animate-in slide-in-from-bottom-2">
              <div className="font-mono text-[10px] text-neutral-500 px-3 py-1 mb-1 uppercase tracking-widest border-b border-white/5 pb-2">Select Core</div>
              {/* 🔴 UPGRADED UI TEXT */}
              {["GPT-4o", "Gemini 2.5 Flash", "Claude 3.5"].map((m) => (
                <button 
                  key={m}
                  onClick={() => { setSelectedModel(m); setShowModelSelect(false); }}
                  className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors font-sans flex items-center justify-between ${selectedModel === m ? 'bg-purple-500/20 text-purple-300' : 'text-neutral-300 hover:bg-white/5'}`}
                >
                  {m}
                  {selectedModel === m && <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-end w-full max-w-4xl mx-auto bg-neutral-800 border border-white/10 rounded-3xl overflow-hidden focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all shadow-sm pl-2 pr-2 pb-1.5 pt-1.5">
            <button 
              onClick={() => setShowModelSelect(!showModelSelect)}
              className="p-2.5 text-neutral-400 hover:text-purple-400 transition-colors rounded-full hover:bg-white/5 flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={`Message MK Intelligence (${selectedModel})...`}
              className="w-full max-h-[200px] min-h-[44px] bg-transparent resize-none py-2.5 px-2 text-base text-white font-sans focus:outline-none custom-scrollbar placeholder-neutral-500"
              rows={1}
            />

            <div className="flex items-center gap-1 pb-0.5">
              <button 
                onClick={toggleVoice}
                className={`p-2 transition-colors rounded-full flex-shrink-0 ${isListening ? 'text-red-400 bg-red-500/10 animate-pulse' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              </button>

              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping || isListening}
                className="p-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-30 disabled:bg-neutral-700 disabled:text-neutral-400 rounded-full transition-all flex items-center justify-center h-9 w-9 flex-shrink-0 mr-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </button>
            </div>
          </div>
          
          <div className="text-center mt-3">
             <span className="font-sans text-[10px] text-neutral-500">MK Intelligence can make mistakes. Consider verifying important information.</span>
          </div>
        </div>

      </div>
    </div>
  );
}