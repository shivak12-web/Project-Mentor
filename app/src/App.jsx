import { useState } from "react";
import Editor from "./components/Editor";
import AIAssistant from "./components/AIAssistant";

function App() {
  const [code, setCode] = useState("console.log('Project Mentor by Shiva');\nconsole.log('Hello AI IDE!');");
  const [output, setOutput] = useState("");
  const runCode = () => {
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(" "));
      const fn = new Function(code);
      fn();
      console.log = originalLog;
      setOutput(logs.join("\n"));
    } catch (e) {
      setOutput("Error: " + e.message);
    }
  };
  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">
      <div className="h-12 bg-[#1e293b] flex items-center justify-between px-4 border-b border-slate-700">
        <div className="font-bold">Project Mentor</div>
        <button onClick={runCode} className="bg-blue-600 px-5 py-1.5 rounded">Run ▶</button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Editor code={code} setCode={setCode} />
          <div className="h-32 bg-black border-t p-3 text-sm font-mono overflow-auto">
            <div className="text-gray-400">Output:</div>
            <div className="text-green-400 whitespace-pre-wrap">{output}</div>
          </div>
        <AIAssistant code={code} />
      </div>
    </div>
  );
}
export default App;
