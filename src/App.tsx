import { Layout } from "./components/Layout";
import { Notelist } from "./components/Notelist";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <Layout
    sidebar = {<Sidebar/>} 
    notelist={<div className="h-full p-4 text-slate-400">{<Notelist/>}</div>}
    editor={<div className="h-full p-6 text-slate-400">Editor</div>} />
  );
}
