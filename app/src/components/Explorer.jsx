function Explorer() {
  return (
    <div className="w- bg-[#1e293b] text-slate-300 p-4 border-r border-slate-700">
      <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Explorer</h3>
      <p className="p-1.5 hover:bg-slate-700 cursor-pointer rounded">📂 src</p>
      <p className="p-1.5 hover:bg-slate-700 cursor-pointer rounded ml-4">📄 App.jsx</p>
      <p className="p-1.5 hover:bg-slate-700 cursor-pointer rounded ml-4">📄 main.jsx</p>
    </div>
  );
}
export default Explorer;