import type { Note } from "../App";
import TagIcon from "./../assets/images/icon-tag.svg?react";
import ArchiveIcon from "./../assets/images/icon-archive.svg?react";
import DeleteIcon from "./../assets/images/icon-delete.svg?react";

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
        <div className="flex h-full">
            <div className="flex flex-col p-6 gap-4 w-4/6 border-r border-slate-700 h-full ">
                <input className="font-bold text-3xl text-white bg-transparent outline-none" value={note.title} onChange={e => onChange({...note,title:e.target.value})} ></input>
                <div className="flex flex-row gap-3 m-3 items-center w-1/4">
                    <TagIcon className="w-5 h-5 invert" ></TagIcon>
                    <p className="text-neutral-400" >Tags</p>
                    <div className="ml-auto ">
                        {note.tags.map(tag => (
                            <span key={tag} className="rounded-lg text-white px-2 py-1">{tag}</span>
                        ))}
                    </div>
                </div>
                <textarea value={note.content} className="flex-1 bg-transparent outline-none resize-none font-normal" onChange={e=>onChange({...note,content:e.target.value})} ></textarea>
            </div>
            <div className="flex-1 flex flex-col px-6 py-8 text-white font-semibold gap-4 ">
                <button className="bg-transparent border border-slate-600 flex items-center gap-3 rounded-lg px-3 py-4" >
                    <ArchiveIcon className="w-6 h-6 invert" ></ArchiveIcon>
                    <p >Archive Note</p>
                </button>
                <button className="bg-transparent border border-slate-600 flex items-center gap-3 rounded-lg px-3 py-4" >
                    <DeleteIcon className="w-6 h-6 invert" ></DeleteIcon>
                    <p >Delete Note</p>
                </button>
            </div>
        </div>
        

    )
}