import type { Note } from "./../App";
import PlusLogo from "./../assets/images/icon-plus.svg?react"

type NoteListProps = {
    notes: Note[];
    activeNoteId: string | null;
    onSelect: (id: string) => void;
    onCreateNote: () => void;
};

export function Notelist({ notes, activeNoteId, onSelect, onCreateNote }: NoteListProps) {
    return (
        <div className="h-full flex flex-col">
            <div className="h-full p-2 md:p-2 gap-3 md:gap-5 flex flex-col">
                {/* Desktop: Blue button, Mobile: Hidden (FAB instead) */}
                <button
                    className="hidden md:block bg-blue-600 text-center text-white py-3 px-12 rounded-xl cursor-pointer transition-colors hover:bg-blue-400"
                    onClick={onCreateNote}
                >
                    + Create New Note
                </button>

                {notes.length === 0 && (
                    <div className="bg-slate-200 border-slate-300 md:bg-slate-700 p-3 rounded-lg text-slate-100 md:text-slate-100 text-black">
                        You don't have any notes yet. Start a new note to capture your thoughts and ideas.
                    </div>
                )}

                {notes.map(note => (
                    <NotePreview
                        key={note.id}
                        note={note}
                        active={note.id === activeNoteId}
                        onClick={() => onSelect(note.id)}
                    />
                ))}
            </div>

            {/* Mobile FAB (Floating Action Button) */}
            <button
                onClick={onCreateNote}
                className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:bg-blue-600 transition-colors z-40"
            >
                <PlusLogo className="w-5 h-5"/>
            </button>
        </div>
    );
}

type NotePreviewProps = {
    note: Note;
    active: boolean;
    onClick: () => void;
};

function NotePreview({ note, active, onClick }: NotePreviewProps) {
    return (
        <div
            onClick={onClick}
            className={`flex flex-col justify-start gap-2 p-3 md:p-3 border-b md:border-b border-slate-700 md:border-slate-700 border-gray-200 rounded-lg cursor-pointer transition-colors 
            ${active
                    ? "bg-slate-700 md:bg-slate-700 bg-gray-100"
                    : "hover:bg-slate-700 md:hover:bg-slate-700 hover:bg-gray-50 bg-white md:bg-transparent"
                }
            text-black md:text-white`}
        >
            <h1 className="text-black md:text-white font-semibold text-lg md:text-xl">
                {note.title === "" ? "Untitled" : note.title}
            </h1>
            <div className="flex flex-wrap gap-1">
                {note.tags.map(tag => (
                    <span
                        key={tag}
                        className="rounded-full md:rounded-lg text-black md:text-white text-xs bg-gray-200 md:bg-neutral-600 px-2 py-1"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <p className="text-gray-500 md:text-neutral-500 text-sm md:text-normal">
                {note.lastEdited}
            </p>
        </div>
    );
}