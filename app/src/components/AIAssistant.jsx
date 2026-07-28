import { useState } from "react";

function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi Shiva! 👋 Nenu nee Project Mentor AI. Code lo help kavala?" }
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if(!input) return;
    setMessages([...messages, {role:"user", text:input}, {role:"ai", text: `Nee code: "${input}" - idi baga explain chestanu! (Next lo Gemini API connect chestam)`}]);
    setInput("");
  }

  return (
    <div className="w- bg-[#0f172a] border-l border-slate-700 flex flex-col">
      <div className="p-3 bg-[#1e293b] font-bold text-sm">🤖 AI Assistant</div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
        {messages.map((m,i)=>(
          <div key={i} className={m.role==='ai'? "bg-slate-800 p-2 rounded" : "bg-blue-600 p-2 rounded text-right"}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-slate-700 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask AI..." className="flex-1 bg-slate-800 px-3 py-2 rounded outline-none text-sm" />
        <button onClick={send} className="bg-blue-600 px-3 rounded">➤</button>
      </div>
    </div>
  );
}
export default AIAssistant;