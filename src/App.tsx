  import { useState } from "react";
  import { Editor } from "./components/Editor";
  import { Layout } from "./components/Layout";
  import { Notelist } from "./components/Notelist";
  import { Sidebar } from "./components/Sidebar";

  export type Note = {
    id:string;
    title:string;
    tags:string[];
    lastEdited:string;
    content:string;
  };

  export default function App() {

    const [notes,setNotes] = useState<Note[]>([
      {
        id: "1",
        title: "React Performance",
        tags: ["Dev", "React"],
        lastEdited: "26/10/2025",
        content: "Memoization, lazy loading, etc..."
      },
      {
        id: "2",
        title: "Japan Travel Planning",
        tags: ["Travel", "Personal"],
        lastEdited: "01/09/2024",
        content: "Tokyo, Kyoto, Osaka..." 
      }
    ]);
    const [activeNoteId,setActiveNoteId] = useState<string | null>(null);
    const activeNote = notes.find(n => n.id === activeNoteId) ?? null;


    return (
      <Layout
      sidebar = {<Sidebar/>} 

      notelist={<Notelist
        notes={notes}
        activeNoteId = {activeNoteId}
        onSelect = {setActiveNoteId} />
      }
      editor={<Editor note={activeNote} onChange={(updatedNote)=>{
        setNotes(notes=>notes.map(n=>n.id===updatedNote.id ? updatedNote:n));
      }} />} />
    )
  }
