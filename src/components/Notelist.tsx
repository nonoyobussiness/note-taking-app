import type {Note} from "./../App"

type NoteListProps = {
    notes:Note[];
    activeNoteId:string | null;
    onSelect:(id:string)=>void;
};


export function Notelist({notes,activeNoteId,onSelect}:NoteListProps){
    return(
        <div className="h-full flex flex-col ">
            
            <div className="h-full pt-2 gap-3 flex flex-col">
                <button className="bg-blue-600 text-center text-white py-3 px-12 rounded-xl cursor-pointer transition-colors hover:bg-blue-400" >+ Create New Note </button>
                {notes.map(note=>(
                    <NotePreview
                    key={note.id}
                    note = {note}
                    active={note.id===activeNoteId}
                    onClick={()=>onSelect(note.id)} />
                ))}
            </div>
        </div>
    );
}

type NotePreviewProps = {
    note:Note;
    active:boolean;
    onClick:()=>void;
};

function NotePreview({note,active,onClick}:NotePreviewProps){
    return(
        <div onClick={onClick} className={`flex flex-col justify-start gap-2 p-3 rounded-lg cursor-pointer transition-colors ${active ? "bg-slate-700" : "hover:bg-slate-700"}`}>
            <h1 className="text-white font-semibold text-xl">{note.title}</h1>
            <div className="flex flex-wrap gap-1">
                {note.tags.map(tag => (
                    <span key={tag} className="rounded-lg text-white text-xs bg-neutral-600 px-2 py-1">{tag}</span>
                ))}
            </div>
            <p className="text-neutral-500 text-normal">{note.lastEdited}</p>
        </div>
    )

}