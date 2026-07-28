import { useState, useRef, useEffect } from "react";

function AIAssistant({ code }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi Shiva! 👋 Code kanipistundi. 'Explain' kottu - short ga chepta." }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (customPrompt) => {
    const promptText = customPrompt || input;
    if (!promptText.trim()) return;

    const userMsg = { role: "user", text: promptText };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    let finalPrompt = promptText;
    if (promptText.toLowerCase().includes("explain") || promptText.toLowerCase().includes("bug")) {
      finalPrompt = `Explain this code in very short, developer style (max 5 bullet points). No long paragraphs. Focus on logic only:\n\n${code}`;
    }

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: "You are a senior developer. Explain code in short, logical points only. Max 5 bullets. No essay. Format: - What it does, - Logic flow, - Output. Keep under 60 words." },
            { role: "user", content: finalPrompt }
          ]
        })
      });
      const data = await res.json();
      if (data.error) {
        setMessages(prev => [...prev, { role: "ai", text: "Error: " + data.error.message }]);
        setLoading(false);
        return;
      }
      const aiText = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "Error: " + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w- bg-[#1e293b] border-l border-slate-700 flex flex-col">
      <div className="p-3 font-bold border-b border-slate-700">⚡ Groq AI</div>

      <div className="flex gap-2 p-2 border-b border-slate-700/50">
        <button onClick={() => sendMessage("Type Your Question...")} className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 rounded font-bold">Explain</button>
        <button onClick={() => sendMessage("find bug")} className="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-1 rounded">Find Bug</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`p-2.5 rounded text-sm whitespace-pre-wrap leading-5 ${m.role === "user"? "bg-blue-600 ml-6" : "bg-slate-800 mr-2 border border-slate-600"}`}>{m.text}</div>
        ))}
        {loading && <div className="text-xs text-gray-400 animate-pulse">Groq typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 flex gap-2 border-t border-slate-700">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Ask about your code..." className="flex-1 bg-slate-800 rounded px-3 py-2 text-sm outline-none" />
        <button onClick={() => sendMessage()} className="bg-blue-600 px-3 rounded">▶</button>
      </div>
    </div>
  );
}
export default AIAssistant;