import type { Note } from "../App";
import TagIcon from "./../assets/images/icon-tag.svg?react";
import ArchiveIcon from "./../assets/images/icon-archive.svg?react";
import DeleteIcon from "./../assets/images/icon-delete.svg?react";
import ClockIcon from "./../assets/images/icon-clock.svg?react";
import { TagInput } from "./TagInput";
import { useState, useEffect } from "react";
import StatusIcon from "./../assets/images/icon-status.svg?react";
import RestoreIcon from "./../assets/images/icon-restore.svg?react";
import ArrowLeft from "./../assets/images/icon-arrow-left.svg?react";

import Modal from "./Modal";

type EditorProps = {
    note: Note | null;
    onChange: (note: Note) => void;
    toggleArchive: (id:string) =>void;
    onDelete: (id:string) => void;
};

export function Editor({ note, onChange, toggleArchive, onDelete }: EditorProps) {
    const [draft, setDraft] = useState<Note | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [showArchiveModal,setShowArchiveModal] = useState(false);

    useEffect(() => {
        setDraft(note);
        setHasUnsavedChanges(false);
    }, [note?.id]);

    
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
        if (hasUnsavedChanges) {
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
    <div className="h-full w-full md:text-white text-black">
        {/* ================= MOBILE EDITOR ================= */}
        <div className="md:hidden flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <button
            onClick={() => {handleCancel; window.dispatchEvent(new CustomEvent("close-editor"));}}
            className="text-neutral-600 flex gap-1 items-center"
            >
                <ArrowLeft className="w-5 h-5 opacity-50"/>
                <span>Go Back</span>
            </button>

            

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-5 h-5 opacity-50"
                        >
                        <DeleteIcon />
                    </button>

                    <button
                        onClick={() => setShowArchiveModal(true)}
                        className="w-5 h-5 opacity-50"
                        >
                        {draft.isArchived ? <RestoreIcon /> : <ArchiveIcon />}
                    </button>

                </div>
                <button
                    onClick={() => {handleCancel; window.dispatchEvent(new CustomEvent("close-editor"));}}
                    disabled={!hasUnsavedChanges}
                    className="text-neutral-600 disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    onClick={() => {handleSave; window.dispatchEvent(new CustomEvent("close-editor"));}}
                    disabled={!hasUnsavedChanges}
                    className="text-blue-600 font-semibold disabled:opacity-50"
                >
                    Save Note
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Title */}
            <input
            placeholder="Enter a title..."
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
            className="w-full bg-transparent outline-none text-2xl font-bold placeholder-neutral-500 mb-4"
            />

            {/* Meta */}
            <div className="space-y-2 pb-4 border-b border-slate-700">
            <div className="flex items-center gap-2 text-neutral-800 text-sm">
                <TagIcon className="w-4 h-4 opacity-75" />
                <p className="text-neutral-700">Tags:</p>
                <TagInput note={draft} onChange={setDraft} />
            </div>

            <div className="flex items-center gap-2 text-neutral-700 text-sm">
                <ClockIcon className="w-4 h-4 opacity-75" />
                <p className="text-neutral-700">Last edited:</p>
                {draft.lastEdited || "Not yet saved"}
            </div>
            </div>

            {/* Editor */}
            <textarea
            placeholder="Start typing your note here..."
            value={draft.content}
            onChange={e => setDraft({ ...draft, content: e.target.value })}
            className="w-full min-h-[60vh] bg-transparent outline-none resize-none mt-4 text-base placeholder-slate-500"
            />
        </div>
        </div>

        {/* ================= DESKTOP EDITOR (UNCHANGED) ================= */}
        <div className="hidden md:flex h-full">
        {/* Left editor */}
        <div className="flex flex-col p-6 gap-3 w-[900px] border-r border-slate-700 h-full">
            <input
            className="font-bold text-3xl bg-transparent outline-none"
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
            />

            <div className="flex flex-col border-b border-slate-700 p-4 gap-4">
            <div className="flex gap-3 items-center w-[300px]">
                <TagIcon className="w-5 h-5 invert" />
                <p className="text-neutral-400">Tags:</p>
                <TagInput note={draft} onChange={setDraft} />
            </div>

            {draft.isArchived && (
                <div className="flex gap-3 items-center w-[300px]">
                <StatusIcon className="w-5 h-5 invert" />
                <p className="text-neutral-400">Status:</p>
                <p>Archived</p>
                </div>
            )}

            <div className="flex gap-3 items-center w-[300px]">
                <ClockIcon className="w-5 h-5 invert" />
                <p className="text-neutral-400">Last edited:</p>
                <p>{draft.lastEdited}</p>
            </div>
            </div>

            <textarea
            value={draft.content}
            onChange={e => setDraft({ ...draft, content: e.target.value })}
            className="bg-transparent border-b border-slate-700 outline-none resize-none p-4 h-3/4"
            />

            <div className="flex gap-3 p-3">
            <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className={`py-3 px-5 rounded-xl ${
                hasUnsavedChanges
                    ? "bg-blue-600 hover:bg-blue-400"
                    : "bg-blue-600/50 cursor-not-allowed"
                }`}
            >
                Save Note
            </button>

            <button
                onClick={handleCancel}
                disabled={!hasUnsavedChanges}
                className="py-3 px-5 rounded-xl bg-slate-700"
            >
                Cancel
            </button>
            </div>
        </div>

        {/* Right actions */}
        <div className="flex-1 flex flex-col px-6 py-8 gap-4">
            <button
            onClick={() => setShowArchiveModal(true)}
            className="border border-slate-600 rounded-lg px-3 py-4 flex gap-3"
            >
            {(!note?.isArchived) ? ( <> <ArchiveIcon className="w-6 h-6 invert" />
            <span>Archive Note</span> </>) : (<> <RestoreIcon className="w-6 h-6 invert" ></RestoreIcon> <span>Restore</span></>)}
            </button> 

            <button
            onClick={() => setShowDeleteModal(true)}
            className="border border-slate-600 rounded-lg px-3 py-4 flex gap-3"
            >
            <DeleteIcon className="w-6 h-6 invert" />
            Delete Note
            </button>
        </div>
        </div>

        {/* Modals unchanged */}
        {showDeleteModal && (
        <Modal
            title="Delete Note"
            icon={<DeleteIcon />}
            confirmText="Are you sure you want to permanently delete this note?"
            buttonType="Delete"
            onConfirm={() => {
            onDelete(draft.id);
            setShowDeleteModal(false);
            }}
            onCancel={() => setShowDeleteModal(false)}
        />
        )}

        {showArchiveModal && (
        <Modal
            title="Archive Note"
            icon={<ArchiveIcon />}
            confirmText="Are you sure you want to archive this note?"
            buttonType="Archive"
            onConfirm={() => {
            toggleArchive(draft.id);
            setDraft({ ...draft, isArchived: !draft.isArchived });
            setShowArchiveModal(false);
            }}
            onCancel={() => setShowArchiveModal(false)}
        />
        )}
    </div>
    );

}