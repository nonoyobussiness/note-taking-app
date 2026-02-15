import { useState, useEffect } from "react";
import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";
import { Notelist } from "./components/Notelist";
import { Sidebar } from "./components/Sidebar";

const COLOR_THEME_KEY = "note-app-color-theme";
const FONT_THEME_KEY = "note-app-font-theme";

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

export default function App() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [colorTheme, setColorTheme] = useState<ColorTheme>(() =>
        (localStorage.getItem(COLOR_THEME_KEY) as ColorTheme) ?? "dark"
    );
    const [fontTheme, setFontTheme] = useState<FontTheme>(() =>
        (localStorage.getItem(FONT_THEME_KEY) as FontTheme) ?? "sans"
    );
    const activeNote = notes.find(n => n.id === activeNoteId) ?? null;

    useEffect(() => {
        localStorage.setItem(COLOR_THEME_KEY, colorTheme);
        document.documentElement.classList.toggle("dark", colorTheme === "dark");
    }, [colorTheme]);

    useEffect(() => {
        localStorage.setItem(FONT_THEME_KEY, fontTheme);
        document.body.classList.remove("font-sans", "font-serif", "font-mono");
        document.body.classList.add(`font-${fontTheme}`);
    }, [fontTheme]);

    function toggleArchive(id: string) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id
                    ? {
                        ...note,
                        isArchived: !note.isArchived,
                        lastEdited: new Date().toLocaleString(),
                    }
                    : note
            )
        );
    }

    function deleteNote(id: string) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        if (activeNoteId === id) setActiveNoteId(null);
    }

    function createNewNote() {
        const newnote: Note = {
            id: crypto.randomUUID(),
            title: "",
            content: "",
            tags: [],
            lastEdited: new Date().toLocaleString(),
            isArchived: false,
        };
        setNotes(prev => [newnote, ...prev]);
        setActiveNoteId(newnote.id);
    }

    const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));
    

    const archivedNotes = notes.filter(n => n.isArchived);

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
                createNewNote();
                window.dispatchEvent(new CustomEvent("open-editor"));
              }}
            />
          }
            editor={
                <Editor
                    note={activeNote}
                    colorTheme={colorTheme}
                    toggleArchive={toggleArchive}
                    onDelete={deleteNote}
                    onChange={(updatedNote) => {
                        setNotes(notes => notes.map(n => (n.id === updatedNote.id ? updatedNote : n)));
                    }}
                />
            }
        />
    );
}