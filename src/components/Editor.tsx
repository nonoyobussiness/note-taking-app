import type { ColorTheme, Note } from "../App";
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
    colorTheme: ColorTheme;
    onChange: (note: Note) => void;
    toggleArchive: (id: string) => void;
    onDelete: (id: string) => void;
};

export function Editor({ note, colorTheme, onChange, toggleArchive, onDelete }: EditorProps) {
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

    const isDark = colorTheme === "dark";
    if (!draft) {
        return (
            <div className={`h-full flex items-center justify-center ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                Select a Note
            </div>
        );
    }

    const iconClass = "icon-theme w-5 h-5";
    return (
    <div className={`h-full w-full ${isDark ? "text-slate-100" : "text-gray-900"}`}>
        {/* ================= MOBILE EDITOR ================= */}
        <div className={`md:hidden flex flex-col h-full ${isDark ? "bg-slate-900" : "bg-white"}`}>
        {/* Top Bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}>
            <button
            onClick={() => { handleCancel(); window.dispatchEvent(new CustomEvent("close-editor")); }}
            className={`flex gap-1 items-center ${isDark ? "text-slate-300" : "text-gray-600"}`}
            >
                <ArrowLeft className="w-5 h-5 opacity-50"/>
                <span>Go Back</span>
            </button>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="opacity-80 hover:opacity-100"
                        >
                        <DeleteIcon className={iconClass} />
                    </button>

                    <button
                        onClick={() => setShowArchiveModal(true)}
                        className="opacity-80 hover:opacity-100"
                        >
                        {draft.isArchived ? <RestoreIcon className={iconClass} /> : <ArchiveIcon className={iconClass} />}
                    </button>

                </div>
                <button
                    onClick={() => { handleCancel(); window.dispatchEvent(new CustomEvent("close-editor")); }}
                    disabled={!hasUnsavedChanges}
                    className={`disabled:opacity-50 ${isDark ? "text-slate-300" : "text-gray-600"}`}
                >
                    Cancel
                </button>

                <button
                    onClick={() => { handleSave(); window.dispatchEvent(new CustomEvent("close-editor")); }}
                    disabled={!hasUnsavedChanges}
                    className={`font-semibold disabled:opacity-50 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                >
                    Save Note
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Title - explicit dark text on light bg for readability */}
            <input
            placeholder="Enter a title..."
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
            className={`w-full bg-transparent outline-none text-2xl font-bold mb-4 ${isDark ? "text-white placeholder-slate-400" : "text-gray-900 placeholder-gray-500"}`}
            />

            {/* Meta */}
            <div className={`space-y-2 pb-4 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}>
            <div className="flex items-center gap-2 text-sm">
                <TagIcon className={`${iconClass} w-4 h-4 opacity-75`} />
                <p className={isDark ? "text-slate-300" : "text-gray-700"}>Tags:</p>
                <TagInput note={draft} onChange={setDraft} />
            </div>

            <div className="flex items-center gap-2 text-sm">
                <ClockIcon className={`${iconClass} w-4 h-4 opacity-75`} />
                <p className={isDark ? "text-slate-300" : "text-gray-700"}>Last edited:</p>
                {draft.lastEdited || "Not yet saved"}
            </div>

            {draft.isArchived && (
                <div className="flex items-center gap-2 text-sm">
                    <StatusIcon className={`${iconClass} w-4 h-4 opacity-75`} />
                    <p className={isDark ? "text-slate-300" : "text-gray-700"}>Status:</p>
                    <p className={isDark ? "text-slate-400" : "text-gray-600"}>Archived</p>
                </div>
            )}
            </div>

            {/* Editor */}
            <textarea
            placeholder="Start typing your note here..."
            value={draft.content}
            onChange={e => setDraft({ ...draft, content: e.target.value })}
            className={`w-full min-h-[60vh] bg-transparent outline-none resize-none mt-4 text-base ${isDark ? "text-slate-100 placeholder-slate-500" : "text-gray-900 placeholder-gray-500"}`}
            />
        </div>
        </div>

        {/* ================= DESKTOP EDITOR ================= */}
        <div className="hidden md:flex h-full">
        {/* Left editor */}
        <div className={`flex flex-col p-6 gap-3 w-[900px] border-r h-full ${isDark ? "border-slate-700" : "border-gray-200"}`}>
            <input
            className={`font-bold text-3xl bg-transparent outline-none ${isDark ? "text-white" : "text-gray-900"}`}
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
            />

            <div className={`flex flex-col border-b p-4 gap-4 ${isDark ? "border-slate-700" : "border-gray-200"}`}>
            <div className="flex gap-3 items-center w-[300px]">
                <TagIcon className={iconClass} />
                <p className={isDark ? "text-neutral-400" : "text-gray-500"}>Tags:</p>
                <TagInput note={draft} onChange={setDraft} />
            </div>

            {draft.isArchived && (
                <div className="flex gap-3 items-center w-[300px]">
                <StatusIcon className={iconClass} />
                <p className={isDark ? "text-neutral-400" : "text-gray-500"}>Status:</p>
                <p className={isDark ? "text-slate-300" : "text-gray-700"}>Archived</p>
                </div>
            )}

            <div className="flex gap-3 items-center w-[300px]">
                <ClockIcon className={iconClass} />
                <p className={isDark ? "text-neutral-400" : "text-gray-500"}>Last edited:</p>
                <p className={isDark ? "text-slate-300" : "text-gray-700"}>{draft.lastEdited}</p>
            </div>
            </div>

            <textarea
            value={draft.content}
            onChange={e => setDraft({ ...draft, content: e.target.value })}
            className={`bg-transparent border-b outline-none resize-none p-4 h-3/4 ${isDark ? "border-slate-700 text-slate-100" : "border-gray-200 text-gray-900"}`}
            />

            <div className="flex gap-3 p-3">
            <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className={`py-3 px-5 rounded-xl text-white ${
                hasUnsavedChanges
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-600/50 cursor-not-allowed"
                }`}
            >
                Save Note
            </button>

            <button
                onClick={handleCancel}
                disabled={!hasUnsavedChanges}
                className={`py-3 px-5 rounded-xl ${isDark ? "bg-slate-700 hover:bg-slate-600 text-slate-100" : "bg-gray-300 hover:bg-gray-400 text-gray-900"}`}
            >
                Cancel
            </button>
            </div>
        </div>

        {/* Right actions */}
        <div className="flex-1 flex flex-col px-6 py-8 gap-4">
            <button
            onClick={() => setShowArchiveModal(true)}
            className={`border rounded-lg px-3 py-4 flex gap-3 ${isDark ? "border-slate-600 text-slate-100 hover:bg-slate-800" : "border-gray-300 text-gray-900 hover:bg-gray-100"}`}
            >
            {(!note?.isArchived) ? ( <> <ArchiveIcon className={iconClass} />
            <span>Archive Note</span> </>) : (<> <RestoreIcon className={iconClass} /> <span>Restore</span></>)}
            </button> 

            <button
            onClick={() => setShowDeleteModal(true)}
            className={`border rounded-lg px-3 py-4 flex gap-3 ${isDark ? "border-slate-600 text-slate-100 hover:bg-slate-800" : "border-gray-300 text-gray-900 hover:bg-gray-100"}`}
            >
            <DeleteIcon className={iconClass} />
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
            title={draft.isArchived ? "Restore Note" : "Archive Note"}
            icon={draft.isArchived ? <RestoreIcon /> : <ArchiveIcon />}
            confirmText={draft.isArchived ? "Are you sure you want to restore this note?" : "Are you sure you want to archive this note?"}
            buttonType={draft.isArchived ? "Restore" : "Archive"}
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