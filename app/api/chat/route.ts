import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, model, apiKey, apiProvider } = await req.json();

    let aiResponseText = "";

    // 🔴 1. GEMINI API LOGIC (UPGRADED TO GEMINI 2.5 FLASH FOR FREE TIER SPEED!)
    if (model === "Gemini 2.5 Flash") {
      const isCustomKey = apiProvider === "Gemini" && apiKey;
      const GEMINI_API_KEY = isCustomKey ? apiKey : process.env.GEMINI_API_KEY; 
      
      // Changed URL to use gemini-2.5-flash
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are MK Intelligence, Manoj Kiyan's highly advanced AI assistant. Answer this user query professionally and concisely: ${message}` }] }]
        })
      });
      const data = await response.json();
      
      if (data.error) {
        aiResponseText = `Gemini API Error: ${data.error.message || (typeof data.error === 'string' ? data.error : JSON.stringify(data.error))}`;
      } else {
        aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini systems are currently rebooting.";
        aiResponseText += `\n\n*(System Note: Powered by ${isCustomKey ? "your custom key" : "MK's master key"} via Gemini)*`;
      }
    } 
    
    // 🔴 2. OPENAI (CHATGPT) LOGIC
    else if (model === "GPT-4o") {
      const isCustomKey = apiProvider === "OpenAI" && apiKey;
      const OPENAI_API_KEY = isCustomKey ? apiKey : process.env.OPENAI_API_KEY;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are MK Intelligence, Manoj Kiyan's highly advanced AI assistant." },
            { role: "user", content: message }
          ]
        })
      });
      const data = await response.json();
      
      if (data.error) {
        aiResponseText = `OpenAI API Error: ${data.error.message || (typeof data.error === 'string' ? data.error : JSON.stringify(data.error))}`;
      } else {
        aiResponseText = data.choices?.[0]?.message?.content || "GPT systems are currently rebooting.";
        aiResponseText += `\n\n*(System Note: Powered by ${isCustomKey ? "your custom key" : "MK's master key"} via OpenAI)*`;
      }
    }
    
    // 🔴 3. GROQ (Llama 3) LOGIC
    else if (model === "Groq (Llama 3)") {
      const isCustomKey = apiProvider === "Groq" && apiKey;
      const GROQ_API_KEY = isCustomKey ? apiKey : process.env.GROQ_API_KEY;
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: "You are MK Intelligence, Manoj Kiyan's highly advanced AI assistant." },
            { role: "user", content: message }
          ]
        })
      });
      const data = await response.json();
      
      if (data.error) {
        aiResponseText = `Groq API Error: ${data.error.message || (typeof data.error === 'string' ? data.error : JSON.stringify(data.error))}`;
      } else {
        aiResponseText = data.choices?.[0]?.message?.content || "Groq systems are currently rebooting.";
        aiResponseText += `\n\n*(System Note: Powered by ${isCustomKey ? "your custom key" : "MK's master key"} via Groq)*`;
      }
    }
    
    // Fallback
    else {
      aiResponseText = `I am currently running in offline simulation mode. You selected ${model}. To activate real-time responses, MK needs to configure this model.`;
    }

    return NextResponse.json({ response: aiResponseText });

  } catch (error) {
    console.error("AI Core Error:", error);
    return NextResponse.json({ response: "System Error: The neural link was interrupted." }, { status: 500 });
  }
}