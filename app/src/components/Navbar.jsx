function Navbar() {
  return (
    <nav className="h- bg-[#1e293b] text-white flex justify-between items-center px-6 border-b border-slate-700">
      <h2 className="font-bold text-lg">Project Mentor</h2>
      <button className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700">Run ▶</button>
    </nav>
  );
}
export default Navbar;