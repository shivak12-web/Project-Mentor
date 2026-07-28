function Navbar() {
  const runCode = () => {
    // Editor lo unna code ni alert lo chupistam (next level lo console capture chestam)
    alert("Run clicked! Next step lo code output panel add chestam.");
  };

  return (
    <div className="h-10 bg-[#1e293b] flex items-center justify-between px-4 border-b border-slate-700">
      <div className="font-bold">Project Mentor</div>
      <button onClick={runCode} className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm font-bold">
        Run ▶
      </button>
    </div>
  );
}
export default Navbar;