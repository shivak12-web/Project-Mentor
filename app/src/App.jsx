import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Explorer from "./components/Explorer";
import Editor from "./components/Editor";

function App() {
  return (
    <div className="h-screen flex flex-col bg-[#0e1525] text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Explorer />
        <Editor />
      </div>
    </div>
  );
}

export default App;