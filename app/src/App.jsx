import { useState } from "react";
import Editor from "./components/Editor";
import AIAssistant from "./components/AIAssistant";

// 1. CODE INITIALIZATION - Clean ga separate chesam
const INITIAL_CODE = `// Project Mentor - Shiva
console.log('Project Mentor by Shiva');
console.log('Hello AI IDE!');

const sum = (a, b) => a + b;
console.log('Sum:', sum(2, 3));
`;

function App() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState("Click 'Run ▶' to see output...");

  // 2. RUN LOGIC - Safe & Clean
  const runCode = () => {
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push({ type: 'log', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') });
    };
    console.error = (...args) => {
      logs.push({ type: 'error', text: args.join(' ') });
    };

    try {
      // Clean unwanted exports for runner
      const executableCode = code.replace(/export\s+default.*$/gm, '');
      new Function(executableCode)();
      setOutput(logs);
    } catch (err) {
      setOutput([{ type: 'error', text: `Error: ${err.message}` }]);
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  };

  // 3. OUTPUT DISPLAY - Professional UI
  const OutputLine = ({ log }) => (
    <div className={log.type === 'error' ? 'text-red-400' : 'text-green-400'}>
      {log.text}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">
      <div className="h-12 bg-[#1e293b] flex items-center justify-between px-4 border-b border-slate-700">
        <div className="font-bold tracking-wide">Project Mentor ⚡</div>
        <button onClick={runCode} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded font-bold transition">
          Run ▶
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Editor code={code} setCode={setCode} />
          
          {/* REFACTORED OUTPUT DISPLAY */}
          <div className="h-36 bg-[#020617] border-t border-slate-700 p-3 font-mono text-sm overflow-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-xs uppercase">Console Output</span>
              <button onClick={() => setOutput([])} className="text-xs text-gray-500 hover:text-white">Clear</button>
            </div>
            <div className="space-y-1">
              {Array.isArray(output) ? (
                output.length === 0 ? <span className="text-gray-600">No output yet...</span> : output.map((log, i) => <OutputLine key={i} log={log} />)
              ) : (
                <div className="text-gray-500">{output}</div>
              )}
            </div>
          </div>
        </div>
        <AIAssistant code={code} />
      </div>
    </div>
  );
}

export default App;
