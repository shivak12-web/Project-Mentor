import Editor from "@monaco-editor/react";

function EditorComponent() {
  return (
    <div className="flex-1 bg-[#0e1525] flex flex-col">
      {/* File Tab */}
      <div className="bg-[#1e293b] px-4 py-2 text-sm border-b border-slate-700 text-slate-300 flex justify-between">
        <span>App.jsx</span>
        <span className="text-xs">JavaScript</span>
      </div>

      {/* Monaco Editor - Idhe VS Code lo undedi */}
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={`// Welcome to Project Mentor - Shiva
function App() {
  console.log('Project Mentor by Shiva');
  return <h1>Hello AI IDE!</h1>
}

export default App;
`}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          padding: { top: 15 }
        }}
      />
    </div>
  );
}

export default EditorComponent;