  import { useState } from "react";
  import { Editor } from "./components/Editor";
  import { Layout } from "./components/Layout";
  import { Notelist } from "./components/Notelist";
  import { Sidebar } from "./components/Sidebar";

  export type Note = {
    id:string,
    title:string,
    tags:string[],
    lastEdited:string,
    content:string,
  };

  export default function App() {
    
    const [notes,setNotes] = useState<Note[]>([]);
    const [activeNoteId,setActiveNoteId] = useState<string | null>(null);
    const activeNote = notes.find(n => n.id === activeNoteId) ?? null;
    function createNewNote(){
      const newnote: Note = {
        id:crypto.randomUUID(),
        title: "Untitled",
        content:"",
        tags:[],
        lastEdited:new Date().toLocaleString(),
      };
      setNotes(prev => [newnote,...prev]);
      setActiveNoteId(newnote.id);
    }

    return (
      <Layout
      sidebar = {<Sidebar/>} 

      notelist={<Notelist
        notes={notes}
        activeNoteId = {activeNoteId}
        onSelect = {setActiveNoteId}
        onCreateNode={createNewNote} />
      }
      editor={<Editor note={activeNote} onChange={(updatedNote)=>{
        setNotes(notes=>notes.map(n=>n.id===updatedNote.id ? updatedNote:n));
      }} />} />
    )
  }
