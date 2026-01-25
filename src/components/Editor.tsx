import type { Note } from "../App";

type EditorProps = {
    note:Note | null;
    onChange:(note:Note) => void;
};

export function Editor({note,onChange}:EditorProps){
    if(!note){
        return(
            <div className="h-full flex items-center justify-center text-neutral-500 ">Select a Note</div>
        )
    }
    return(
        <div className="flex flex-col p-6 gap-4">
            <input className="font-bold text-3xl text-white" value={note.title} onChange={e => onChange({...note,title:e.target.value})} ></input>
            <textarea value={note.content} className="flex-1 bg-transparent outline-none resize-none" onChange={e=>onChange({...note,content:e.target.value})} ></textarea>

        </div>

    )
}