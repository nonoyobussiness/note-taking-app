import type { Note } from "../App";
import TagIcon from "./../assets/images/icon-tag.svg?react";
import ArchiveIcon from "./../assets/images/icon-archive.svg?react";
import DeleteIcon from "./../assets/images/icon-delete.svg?react";
import ClockIcon from "./../assets/images/icon-clock.svg?react";

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
            <div className="flex flex-col p-6 gap-3 w-[900px] border-r border-slate-700 h-full ">
                <input className="font-bold text-3xl text-white bg-transparent outline-none" value={note.title} onChange={e => onChange({...note,title:e.target.value})} ></input>
                <div className="flex flex-col border-b border-slate-700 w-full p-4 gap-4">
                    <div className="flex flex-row gap-3 mx-3 items-center w-60">
                        <TagIcon className="w-5 h-5 invert" ></TagIcon>
                        <p className="text-neutral-400" >Tags</p>
                        <div className="ml-auto ">
                            {note.tags.map(tag => (
                                <span key={tag} className="rounded-lg text-white px-2 py-1">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 mx-3 items-center w-60 ">
                            <ClockIcon className="w-5 h-5 invert"></ClockIcon>
                            <p className="text-neutral-400">Last edited</p>
                            <div className="ml-auto">
                                {note.lastEdited}
                            </div>
                    </div>
                </div>
                
                <textarea value={note.content} className=" bg-transparent border-b border-slate-700 outline-none resize-none p-4 font-normal h-3/4" onChange={e=>onChange({...note,content:e.target.value})} ></textarea>
                <div className="flex gap-3 p-3">
                    <button className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-400 text-white text-center cursor-pointer transition-colors" >Save Note</button>
                    <button className="py-3 px-5 rounded-xl bg-slate-700 hover:bg-slate-500 text-white cursor-pointer transition-colors" >Cancel</button>
                </div>
            </div>
            <div className="flex-1 flex flex-col px-6 py-8 text-white font-semibold gap-4 ">
                <button className="bg-transparent hover:bg-slate-600 border border-slate-600 flex items-center gap-3 cursor-pointer transition-colors rounded-lg px-3 py-4" >
                    <ArchiveIcon className="w-6 h-6 invert" ></ArchiveIcon>
                    <p >Archive Note</p>
                </button>
                <button className="bg-transparent hover:bg-slate-600 border cursor-pointer transition-colors border-slate-600 flex items-center gap-3 rounded-lg px-3 py-4" >
                    <DeleteIcon className="w-6 h-6 invert" ></DeleteIcon>
                    <p >Delete Note</p>
                </button>
            </div>
        </div>
        
    )
}