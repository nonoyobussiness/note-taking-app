import type { Note } from "../App";
import TagIcon from "./../assets/images/icon-tag.svg?react";
import ArchiveIcon from "./../assets/images/icon-archive.svg?react";
import DeleteIcon from "./../assets/images/icon-delete.svg?react";
import ClockIcon from "./../assets/images/icon-clock.svg?react";
import { TagInput } from "./TagInput";
import { useState, useEffect } from "react";

type EditorProps = {
    note: Note | null;
    onChange: (note: Note) => void;
};

export function Editor({ note, onChange }: EditorProps) {
    const [draft, setDraft] = useState<Note | null>(note);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        setDraft(note);
        setHasUnsavedChanges(false);
    }, [note?.id]);

    // Track changes
    useEffect(() => {
        if (!note || !draft) return;
        const changed = 
            note.title !== draft.title || 
            note.content !== draft.content ||
            JSON.stringify(note.tags) !== JSON.stringify(draft.tags);
        setHasUnsavedChanges(changed);
    }, [draft, note]);

    const handleSave = () => {
        if (!draft) return;
        const updated = {
            ...draft,
            lastEdited: new Date().toLocaleString(),
        };
        onChange(updated);
        setDraft(updated);
        setHasUnsavedChanges(false);
    };

    const handleCancel = () => {
        if (hasUnsavedChanges && !confirm('Discard unsaved changes?')) {
            return;
        }
        setDraft(note);
        setHasUnsavedChanges(false);
    };

    if (!draft) {
        return (
            <div className="h-full flex items-center justify-center text-neutral-500">
                Select a Note
            </div>
        );
    }

    return (
        <div className="flex h-full">
            <div className="flex flex-col p-6 gap-3 w-[900px] border-r border-slate-700 h-full">
                <input
                    className="font-bold text-3xl text-white bg-transparent outline-none"
                    value={draft.title}
                    onChange={e => setDraft({ ...draft, title: e.target.value })}
                />
                <div className="flex flex-col border-b border-slate-700 w-full p-4 gap-4">
                    <div className="flex flex-row gap-3 mx-3 items-center w-[300px]">
                        <TagIcon className="w-5 h-5 invert" />
                        <p className="text-neutral-400">Tags</p>
                        <div className="ml-auto">
                            <TagInput note={draft} onChange={setDraft} />
                        </div>
                    </div>
                    <div className="flex gap-3 mx-3 items-center w-[300px]">
                        <ClockIcon className="w-5 h-5 invert" />
                        <p className="text-neutral-400">Last edited</p>
                        <div className="ml-auto">
                            {draft.lastEdited}
                        </div>
                    </div>
                </div>

                <textarea
                    value={draft.content}
                    className="bg-transparent border-b border-slate-700 outline-none resize-none p-4 font-normal h-3/4"
                    onChange={e => setDraft({ ...draft, content: e.target.value })}
                />
                <div className="flex gap-3 p-3">
                    <button
                        onClick={handleSave}
                        disabled={!hasUnsavedChanges}
                        className={`py-3 px-5 rounded-xl text-center transition-colors ${
                            hasUnsavedChanges
                                ? 'bg-blue-600 hover:bg-blue-400 text-white cursor-pointer'
                                : 'bg-blue-600/50 text-white/50 cursor-not-allowed'
                        }`}
                    >
                        Save Note
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={!hasUnsavedChanges}
                        className={`py-3 px-5 rounded-xl transition-colors ${
                            hasUnsavedChanges
                                ? 'bg-slate-700 hover:bg-slate-500 text-white cursor-pointer'
                                : 'bg-slate-700/50 text-white/50 cursor-not-allowed'
                        }`}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className="flex-1 flex flex-col px-6 py-8 text-white font-semibold gap-4">
                <button className="bg-transparent hover:bg-slate-600 border border-slate-600 flex items-center gap-3 cursor-pointer transition-colors rounded-lg px-3 py-4">
                    <ArchiveIcon className="w-6 h-6 invert" />
                    <p>Archive Note</p>
                </button>
                <button className="bg-transparent hover:bg-slate-600 border cursor-pointer transition-colors border-slate-600 flex items-center gap-3 rounded-lg px-3 py-4">
                    <DeleteIcon className="w-6 h-6 invert" />
                    <p>Delete Note</p>
                </button>
            </div>
        </div>
    );
}