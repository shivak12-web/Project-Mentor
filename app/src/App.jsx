import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import AIAssistant from "./components/AIAssistant";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const TEMPLATES = {
  todo: `// Todo App - Modern UI
import {useState} from 'react'
function TodoApp(){
  const [todos,setTodos]=useState(['Learn React','Build Project Mentor']);
  return <div className="p-6 max-w-md mx-auto">
    <h1 className="text-2xl font-bold mb-4">✅ My Todos</h1>
    {todos.map((t,i)=><div key={i} className="p-3 bg-slate-100 rounded mb-2">{t}</div>)}
  </div>
}
export default TodoApp`,
  portfolio: `// Portfolio Template
function Portfolio(){
  return <div className="min-h-screen bg-black text-white p-8">
    <h1 className="text-5xl font-bold">Shiva Kumar</h1>
    <p className="text-xl text-gray-400 mt-2">Full Stack AI Dev | Hyderabad</p>
  </div>
}
export default Portfolio`,
  ecommerce: `// E-commerce Card
function Product(){
  return <div className="p-4 border rounded-lg max-w-xs">
    <img src="https://picsum.photos/300" className="rounded"/>
    <h2 className="font-bold mt-2">Stylish Shoes</h2>
    <p className="text-green-600 font-bold">₹1999</p>
    <button className="bg-black text-white w-full py-2 mt-2 rounded">Add to Cart</button>
  </div>
}
export default Product`
};

const THEMES = {
  dark: "bg-[#0f172a] text-white",
  light: "bg-white text-black",
  neon: "bg-[#0a0a0a] text-[#39ff14] border-[#39ff14]"
};

const INITIAL_CODE = `// Project Mentor - Shiva ⚡
console.log('Project Mentor by Shiva');
console.log('Level 1 Features Added!');

const sum = (a, b) => a + b;
console.log('Sum:', sum(2, 3));
`;

function App() {
  const [code, setCode] = useState(() => localStorage.getItem('pm_code') || INITIAL_CODE);
  const [output, setOutput] = useState("Click 'Run ▶' to see output...");
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('pm_history')||'[]'));
  const [theme, setTheme] = useState('dark');

  useEffect(()=>{ localStorage.setItem('pm_code', code); }, [code]);

const runCode = () => {
    // JSX unte - console lo run cheyaddu - preview chupincham
    if (code.includes('<') && code.includes('>')) {
      setOutput([{type:'log', text:'⚡ JSX/HTML Code - Live Preview Ready! Console cannot run JSX directly.'}]);
      const newHist = [{time:new Date().toLocaleTimeString(), code:code.slice(0,50)},...history].slice(0,10);
      setHistory(newHist);
      localStorage.setItem('pm_history', JSON.stringify(newHist));
      return;
    }
    const logs = [];
    const oLog = console.log; const oErr = console.error;
    console.log = (...a) => logs.push({type:'log', text:a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ')});
    console.error = (...a) => logs.push({type:'error', text:a.join(' ')});
    try {
      const exec = code.replace(/export\s+default.*$/gm,'');
      new Function(exec)();
      setOutput(logs);
      const newHist = [{time:new Date().toLocaleTimeString(), code:code.slice(0,50)},...history].slice(0,10);
      setHistory(newHist);
      localStorage.setItem('pm_history', JSON.stringify(newHist));
    } catch(err){ setOutput([{type:'error', text:`Error: ${err.message}`}]); }
    finally { console.log=oLog; console.error=oErr; }
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    zip.file("App.jsx", code);
    zip.file("README.md", "# Project Mentor by Shiva\nBuilt with Groq AI");
    const blob = await zip.generateAsync({type:"blob"});
    saveAs(blob, "project-mentor.zip");
  };

  const enhancePrompt = () => {
    const enhanced = `// Enhanced with Tailwind + Modern UI + Responsive + Dark Mode\n${code}\n// Make it production-ready, beautiful, animated`;
    setCode(enhanced);
  };

  return (
    <div className={`h-screen flex flex-col ${THEMES[theme]}`}>
      {/* HEADER - LEVEL 1 UPGRADED */}
      <div className="h-14 bg-[#1e293b] flex items-center justify-between px-3 border-b border-slate-700 gap-2 overflow-x-auto">
        <div className="font-bold">Project Mentor ⚡ <span className="text-xs text-green-400 ml-2">LEVEL 1 LIVE</span></div>

        <div className="flex items-center gap-2">
          {/* TEMPLATES */}
          <select onChange={e=>e.target.value && setCode(TEMPLATES[e.target.value])} className="bg-slate-800 text-xs px-2 py-1.5 rounded">
            <option value="">📋 Templates</option>
            <option value="todo">Todo App</option>
            <option value="portfolio">Portfolio</option>
            <option value="ecommerce">E-commerce</option>
          </select>

          {/* THEME */}
          <select value={theme} onChange={e=>setTheme(e.target.value)} className="bg-slate-800 text-xs px-2 py-1.5 rounded">
            <option value="dark">🌙 Dark</option>
            <option value="light">☀️ Light</option>
            <option value="neon">💚 Neon</option>
          </select>

          <button onClick={enhancePrompt} className="bg-purple-600 hover:bg-purple-500 px-3 py-1.5 rounded text-xs font-bold">✨ Enhance</button>
          <button onClick={downloadZip} className="bg-green-600 hover:bg-green-500 px-3 py-1.5 rounded text-xs font-bold">📥 ZIP</button>
          <button onClick={runCode} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded font-bold">Run ▶</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Editor code={code} setCode={setCode} />
          <div className="h-36 bg-[#020617] border-t border-slate-700 p-3 font-mono text-sm overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-xs uppercase">Console | History: {history.length}</span>
              <button onClick={()=>setOutput([])} className="text-xs text-gray-500 hover:text-white">Clear</button>
            </div>
            <div className="space-y-1">
              {Array.isArray(output)? (output.length===0? <span className="text-gray-600">No output...</span> : output.map((log,i)=><div key={i} className={log.type==='error'?'text-red-400':'text-green-400'}>{log.text}</div>)) : <div className="text-gray-500">{output}</div>}
            </div>
          </div>
        </div>
        <AIAssistant code={code} />
      </div>
    </div>
  );
}
export default App;