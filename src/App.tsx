import { useState, useEffect, useMemo } from "react";
import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";
import { Notelist } from "./components/Notelist";
import { Sidebar } from "./components/Sidebar";

const COLOR_THEME_KEY = "note-app-color-theme";
const FONT_THEME_KEY = "note-app-font-theme";
const JWT_KEY = "jwt";

export type ColorTheme = "light" | "dark";
export type FontTheme = "sans" | "serif" | "mono";

export type Note = {
    id: string;
    title: string;
    tags: string[];
    lastEdited: string;
    content: string;
    isArchived: boolean;
};

function formatDate(value: string) {
    return new Date(value).toLocaleString();
}

function useAuthToken() {
    return useMemo(() => localStorage.getItem(JWT_KEY), []);
}

export default function App() {
    const token = useAuthToken();
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [colorTheme, setColorTheme] = useState<ColorTheme>(() =>
        (localStorage.getItem(COLOR_THEME_KEY) as ColorTheme) ?? "dark"
    );
    const [fontTheme, setFontTheme] = useState<FontTheme>(() =>
        (localStorage.getItem(FONT_THEME_KEY) as FontTheme) ?? "sans"
    );
    const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

    useEffect(() => {
        localStorage.setItem(COLOR_THEME_KEY, colorTheme);
        document.documentElement.classList.toggle("dark", colorTheme === "dark");
    }, [colorTheme]);

    useEffect(() => {
        localStorage.setItem(FONT_THEME_KEY, fontTheme);
        document.body.classList.remove("font-sans", "font-serif", "font-mono");
        document.body.classList.add(`font-${fontTheme}`);
    }, [fontTheme]);

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
            return;
        }

        const fetchNotes = async () => {
            const res = await fetch("/api/notes", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401) {
                localStorage.removeItem(JWT_KEY);
                window.location.href = "/login";
                return;
            }

            const data = await res.json();
            setNotes(
                data.map((note: Note) => ({
                    ...note,
                    lastEdited: formatDate(note.lastEdited),
                }))
            );
        };

        fetchNotes().catch(() => {
            // no-op for now
        });
    }, [token]);

    async function authedRequest(path: string, options: RequestInit = {}) {
        if (!token) {
            throw new Error("Not authenticated");
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        };

        const res = await fetch(path, { ...options, headers });

        if (!res.ok) {
            throw new Error(`Request failed (${res.status})`);
        }

        return res;
    }

    async function toggleArchive(id: string) {
        const current = notes.find((note) => note.id === id);
        if (!current) return;

        const res = await authedRequest(`/api/notes/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ isArchived: !current.isArchived }),
        });

        const updated = await res.json();
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id
                    ? { ...updated, lastEdited: formatDate(updated.lastEdited) }
                    : note
            )
        );
    }

    async function deleteNote(id: string) {
        await authedRequest(`/api/notes/${id}`, { method: "DELETE" });
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        if (activeNoteId === id) setActiveNoteId(null);
    }

    async function createNewNote() {
        const res = await authedRequest("/api/notes", {
            method: "POST",
            body: JSON.stringify({ title: "", content: "", tags: [], isArchived: false }),
        });

        const created = await res.json();
        const newnote: Note = {
            ...created,
            lastEdited: formatDate(created.lastEdited),
        };

        setNotes((prev) => [newnote, ...prev]);
        setActiveNoteId(newnote.id);
    }

    const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

    const archivedNotes = notes.filter((n) => n.isArchived);

    return (
        <Layout
            colorTheme={colorTheme}
            setColorTheme={setColorTheme}
            fontTheme={fontTheme}
            setFontTheme={setFontTheme}
            tags={allTags}
            archivedNotes={archivedNotes}
            onSelectNote={setActiveNoteId}
            activeNoteId={activeNoteId}
            sidebar={<Sidebar tags={allTags} colorTheme={colorTheme} />}
            notelist={
                <Notelist
                    notes={notes}
                    activeNoteId={activeNoteId}
                    colorTheme={colorTheme}
                    onSelect={(id) => {
                        setActiveNoteId(id);
                        window.dispatchEvent(new CustomEvent("open-editor"));
                    }}
                    onCreateNote={() => {
                        createNewNote().catch(() => {
                            // no-op for now
                        });
                        window.dispatchEvent(new CustomEvent("open-editor"));
                    }}
                />
            }
            editor={
                <Editor
                    note={activeNote}
                    colorTheme={colorTheme}
                    toggleArchive={(id) => {
                        toggleArchive(id).catch(() => {
                            // no-op for now
                        });
                    }}
                    onDelete={(id) => {
                        deleteNote(id).catch(() => {
                            // no-op for now
                        });
                    }}
                    onChange={(updatedNote) => {
                        authedRequest(`/api/notes/${updatedNote.id}`, {
                            method: "PATCH",
                            body: JSON.stringify({
                                title: updatedNote.title,
                                content: updatedNote.content,
                                tags: updatedNote.tags,
                                isArchived: updatedNote.isArchived,
                            }),
                        })
                            .then((res) => res.json())
                            .then((serverNote) => {
                                setNotes((existing) =>
                                    existing.map((n) =>
                                        n.id === serverNote.id
                                            ? { ...serverNote, lastEdited: formatDate(serverNote.lastEdited) }
                                            : n
                                    )
                                );
                            })
                            .catch(() => {
                                // no-op for now
                            });
                    }}
                />
            }
        />
    );
}
