import { Layout } from "./components/Layout";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  return (
    <Layout
    sidebar = {<Sidebar/>} 
    notelist={<div className="h-full p-4 text-slate-400">Notes List</div>}
    editor={<div className="h-full p-6 text-slate-400">Editor</div>} />
  );
}
