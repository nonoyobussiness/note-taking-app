import type { ColorTheme, Note } from "./../App";
import PlusLogo from "./../assets/images/icon-plus.svg?react";

type NoteListProps = {
    notes: Note[];
    activeNoteId: string | null;
    colorTheme: ColorTheme;
    onSelect: (id: string) => void;
    onCreateNote: () => void;
};

export function Notelist({ notes, activeNoteId, colorTheme, onSelect, onCreateNote }: NoteListProps) {
    const isDark = colorTheme === "dark";
    return (
        <div className="h-full flex flex-col">
            <div className="h-full p-2 md:p-2 gap-3 md:gap-5 flex flex-col">
                {/* Desktop: Blue button with theme-aware hover */}
                <button
                    className="hidden md:block bg-blue-600 text-center text-white py-3 px-12 rounded-xl cursor-pointer transition-colors hover:bg-blue-500"
                    onClick={onCreateNote}
                >
                    + Create New Note
                </button>

                {notes.length === 0 && (
                    <div className={`p-3 rounded-lg border ${isDark ? "bg-slate-700 border-slate-600 text-slate-100" : "bg-gray-200 border-gray-300 text-gray-800"}`}>
                        You don't have any notes yet. Start a new note to capture your thoughts and ideas.
                    </div>
                )}

                {notes.map(note => (
                    <NotePreview
                        key={note.id}
                        note={note}
                        active={note.id === activeNoteId}
                        isDark={isDark}
                        onClick={() => onSelect(note.id)}
                    />
                ))}
            </div>

            {/* Mobile FAB (Floating Action Button) */}
            <button
                onClick={onCreateNote}
                className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:bg-blue-600 transition-colors z-40"
            >
                <PlusLogo className="w-5 h-5 invert" />
            </button>
        </div>
    );
}

type NotePreviewProps = {
    note: Note;
    active: boolean;
    isDark: boolean;
    onClick: () => void;
};

function NotePreview({ note, active, isDark, onClick }: NotePreviewProps) {
    const activeBg = active ? (isDark ? "bg-slate-700" : "bg-blue-100") : "bg-transparent";
    const hoverBg = isDark ? "hover:bg-slate-700" : "hover:bg-gray-50";
    const textColor = active ? (isDark ? "text-white" : "text-gray-900") : (isDark ? "text-white" : "text-gray-900");
    const mutedColor = isDark ? "text-neutral-400" : "text-gray-500";
    const tagBg = isDark ? "bg-neutral-600" : "bg-gray-200";
    const borderClass = isDark ? "border-slate-700" : "border-gray-200";
    return (
        <div
            onClick={onClick}
            className={`flex flex-col justify-start gap-2 p-3 border-b rounded-lg cursor-pointer transition-colors ${borderClass} ${activeBg} ${!active ? hoverBg : ""} ${textColor}`}
        >
            <h1 className="font-semibold text-lg md:text-xl">
                {note.title === "" ? "Untitled" : note.title}
            </h1>
            <div className="flex flex-wrap gap-1">
                {note.tags.map(tag => (
                    <span
                        key={tag}
                        className={`rounded-full md:rounded-lg text-xs px-2 py-1 ${tagBg}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <p className={`${mutedColor} text-sm`}>
                {note.lastEdited}
            </p>
        </div>
    );
}