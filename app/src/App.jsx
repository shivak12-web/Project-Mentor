import { useState } from "react";
import Editor from "./components/Editor";
import AIAssistant from "./components/AIAssistant";

function App() {
  const [code, setCode] = useState(`// Welcome to Project Mentor - Shiva
function App() {
  console.log('Project Mentor by Shiva');
  return <h1>Hello AI IDE!</h1>
}
export default App;`);
  const [output, setOutput] = useState("");

   const runCode = () => {
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(" "));

      const func = new Function(code);
      func();

      console.log = originalLog;
      setOutput(logs.join("\n") || "Code executed - no console output");
    } catch (e) {
      setOutput("Error: " + e.message);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">
      <div className="h-12 bg-[#1e293b] flex items-center justify-between px-4 border-b border-slate-700">
        <div className="font-bold">Project Mentor</div>
        <button onClick={runCode} className="bg-blue-600 hover:bg-blue-700 px-5 py-1.5 rounded font-bold">Run ▶</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Side */}
        <div className="flex-1 flex flex-col">
          <Editor code={code} setCode={setCode} />
          <div className="h-32 bg-black border-t border-slate-700 p-3 text-sm font-mono overflow-auto">
            <div className="text-gray-400">Output:</div>
            <div className="text-green-400 whitespace-pre-wrap">{output}</div>
          </div>
        </div>
        {/* AI Side */}
        <AIAssistant code={code} />
      </div>
    </div>
  );
}
export default App;