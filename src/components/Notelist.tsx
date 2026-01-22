export function Notelist(){
    return(
        <div className="h-full flex flex-col">
            <header className="p-4 border-b border-slate-700">
                <h1 className="text-2xl text-white font-semibold">All Notes</h1>
            </header>
            <div className="h-full pt-5 gap-3 flex flex-col">
                <button className="bg-blue-600 text-center text-white py-3 px-12 rounded-xl cursor-pointer transition-colors hover:bg-blue-400" >+ Create New Note </button>
                <NotePreview title="React Performance" tags={["Dev", "React"]} lastEdited="26/10/2025" ></NotePreview>
                <NotePreview title="Japan Travel Planning" tags={["Travel", "Personal"]} lastEdited="01/09/2024" ></NotePreview>
                <NotePreview title="React Performance" tags={["Dev", "React"]} lastEdited="26/10/2025" ></NotePreview>
                <NotePreview title="Japan Travel Planning" tags={["Travel", "Personal"]} lastEdited="01/09/2024" ></NotePreview>
                <NotePreview title="React Performance" tags={["Dev", "React"]} lastEdited="26/10/2025" ></NotePreview>
                <NotePreview title="Japan Travel Planning" tags={["Travel", "Personal"]} lastEdited="01/09/2024" ></NotePreview>
                

            </div>

        </div>
    )
}

type NotePreviewProps = {
    title:string;
    tags:string[];
    lastEdited:string;
    active?:boolean;
};

function NotePreview({title,tags,lastEdited,active=false}:NotePreviewProps){
    return(
       <div className={`flex flex-col justify-start gap-2 p-3 rounded-lg cursor-pointer transition-colors ${active ? "bg-slate-700" : "hover:bg-slate-700"}`}>
           <h1 className="text-white font-semibold text-xl">{title}</h1>

           <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
                <span key={tag} className="rounded-lg text-white text-xs bg-neutral-600 px-2 py-1">{tag}</span>
            ))}
           </div>

           <p className="text-neutral-500 text-normal">{lastEdited}</p>
       </div>

    )

}