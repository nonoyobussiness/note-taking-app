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
    isArchived:boolean,
  };
  export default function App() {
    
    const [notes,setNotes] = useState<Note[]>([]);
    const [activeNoteId,setActiveNoteId] = useState<string | null>(null);
    const activeNote = notes.find(n => n.id === activeNoteId) ?? null;
    
    function toggleArchive(id: string){
      setNotes(prevNotes => prevNotes.map(note=>note.id===id ? {
        ...note, isArchived: !note.isArchived, lastEdited: new Date().toLocaleString()} : note))
      }
    function deleteNote(id:string){
      setNotes(prevNotes => prevNotes.filter(note => note.id!== id));
      if(activeNoteId === id) setActiveNoteId(null);
    }
    function createNewNote(){
      const newnote: Note = {
        id:crypto.randomUUID(),
        title: "",
        content:"",
        tags:[],
        lastEdited:new Date().toLocaleString(),
        isArchived:false,
      };
      setNotes(prev => [newnote,...prev]);
      setActiveNoteId(newnote.id);
    }
    const allTags = Array.from(
      new Set(notes.flatMap(note=>note.tags))
    );
    return (
      <Layout
      sidebar = {<Sidebar tags={allTags}/>} 
      notelist={<Notelist
        notes={notes}
        activeNoteId = {activeNoteId}
        onSelect = {setActiveNoteId}
        onCreateNote={createNewNote} />
      }
      editor={<Editor note={activeNote} toggleArchive={toggleArchive} onDelete = {deleteNote} onChange={(updatedNote)=>{
        setNotes(notes=>notes.map(n=>n.id===updatedNote.id ? updatedNote:n));
      }}  />} />
    )
  }
