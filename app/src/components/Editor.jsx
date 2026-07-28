function Editor() {
  return (
    <div className="flex-1 bg-[#0e1525] p-0">
      <div className="bg-[#1e293b] px-4 py-2 text-sm border-b border-slate-700">App.jsx</div>
      <textarea className="w-full h-[90%] bg-transparent text-white p-6 outline-none resize-none font-mono text-sm"
      placeholder="// Start coding here..."
      defaultValue={"function App() {\n console.log('Project Mentor by Shiva');\n}"}
      />
    </div>
  );
}
export default Editor;