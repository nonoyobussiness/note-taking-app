import { useState, useEffect } from "react";
import type { ColorTheme, FontTheme, Note } from "../App";
import SearchIcon from "./../assets/images/icon-search.svg?react";
import SettingIcon from "./../assets/images/icon-settings.svg?react";
import ChevronIcon from "./../assets/images/icon-chevron-right.svg?react";
import ThemeIcon from "./../assets/images/icon-sun.svg?react";
import FontThemeIcon from "./../assets/images/icon-font.svg?react";
import LockIcon from "./../assets/images/icon-show-password.svg?react";
import LogoutIcon from "./../assets/images/icon-logout.svg?react";
import HomeIcon from "./../assets/images/icon-home.svg?react";
import ArchiveIcon from "./../assets/images/icon-archive.svg?react";
import TagIcon from "./../assets/images/icon-tag.svg?react";
import Logo from "./../assets/images/logo.svg?react";
import { useNavigate } from "react-router-dom";

const iconClass = "icon-theme w-6 h-6";

type LayoutProps = {
    sidebar: React.ReactNode;
    notelist: React.ReactNode;
    editor: React.ReactNode;
    colorTheme: ColorTheme;
    setColorTheme: (t: ColorTheme) => void;
    fontTheme: FontTheme;
    setFontTheme: (f: FontTheme) => void;
    tags: string[];
    archivedNotes?: Note[];
    onSelectNote?: (id: string) => void;
    activeNoteId?: string | null;
};

export function Layout({ sidebar, notelist, editor, colorTheme, setColorTheme, fontTheme, setFontTheme, tags, archivedNotes = [], onSelectNote, activeNoteId }: LayoutProps) {
    const [settingsModal, setSettingsModal] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<"colorTheme" | "textTheme" | null>(null);
    const [mobileSettingsSub, setMobileSettingsSub] = useState<"colorTheme" | "fontTheme" | null>(null);
    const [mobileView, setMobileView] = useState<"home" | "editor" | "search" | "archive" | "tags" | "settings">("home");
    const navigate = useNavigate();
    useEffect(() => {
        const handler = () => setMobileView("editor");
        window.addEventListener("open-editor", handler);
        return () => window.removeEventListener("open-editor", handler);
    }, []);
    useEffect(() => {
        const handler = () => setMobileView("home");
        window.addEventListener("close-editor", handler);
        return () => window.removeEventListener("close-editor", handler);
    }, []);

    const openLogin = () =>{
        navigate("/login");
    };



    const isDark = colorTheme === "dark";
    return (
        <div
            className={`h-screen w-screen flex flex-col md:flex-row overflow-hidden ${isDark ? "bg-slate-900 text-slate-100" : "bg-gray-100 text-gray-900"}`}
        >
            {/* Desktop Sidebar */}
            <aside className={`hidden h-full md:flex w-[300px] border-r ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                {sidebar}
            </aside>

            <div className="flex flex-col flex-1 min-h-0">
                {/* Desktop Header */}
                <header className={`hidden md:flex pt-9 pb-6 px-8 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                    <h1 className={`text-3xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>All Notes</h1>
                    <div className="flex gap-10 items-center ml-auto mr-6 w-auto">
                        <div className={`border hidden md:flex items-center px-4 py-3 gap-3 rounded-lg w-80 ${isDark ? "border-slate-700" : "border-gray-300"}`}>
                            <SearchIcon className={`${iconClass}`} />
                            <input
                                type="text"
                                placeholder="Search by title, content or tags..."
                                className={`outline-none bg-transparent w-full text-md ${isDark ? "text-slate-100 placeholder-slate-400" : "text-gray-900 placeholder-gray-500"}`}
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setSettingsModal(prev => !prev)}
                                className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-800" : "hover:bg-gray-200"}`}
                            >
                                <SettingIcon className={`${iconClass} w-7 h-7`} />
                            </button>
                            {settingsModal && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setSettingsModal(false)}
                                    />
                                    <div className={`absolute right-0 mt-3 w-60 rounded-lg shadow-lg border z-50 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
                                        <SettingModal isDark={isDark} onHover={() => setOpenSubMenu("colorTheme")} onClick={() => setOpenSubMenu(prev => prev === "colorTheme" ? null : "colorTheme")} hasDropDown icon={<ThemeIcon />} name="Color Theme" />
                                        <SettingModal isDark={isDark} onHover={() => setOpenSubMenu("textTheme")} onClick={() => setOpenSubMenu(prev => prev === "textTheme" ? null : "textTheme")} hasDropDown icon={<FontThemeIcon />} name="Font Theme" />
                                        <SettingModal isDark={isDark} icon={<LockIcon />} name="Change Password" />
                                        <SettingModal isDark={isDark} onClick = {openLogin} className={isDark ? "border-t border-slate-600" : "border-t border-gray-200"} icon={<LogoutIcon />} name="Logout" />
                                    </div>
                                    {openSubMenu === "colorTheme" && (
                                        <div
                                            onMouseEnter={() => setOpenSubMenu("colorTheme")}
                                            onMouseLeave={() => setOpenSubMenu(null)}
                                            className={`absolute top-20 right-[235px] z-50 mr-2 w-40 rounded-lg shadow-lg border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}
                                        >
                                            <button
                                                className={`w-full px-4 py-2 text-left ${isDark ? "hover:bg-slate-600" : "hover:bg-gray-100"} ${colorTheme === "light" ? (isDark ? "bg-slate-600" : "bg-gray-100") : ""}`}
                                                onClick={() => { setColorTheme("light"); setOpenSubMenu(null); setSettingsModal(false); }}
                                            >
                                                Light
                                            </button>
                                            <button
                                                className={`w-full px-4 py-2 text-left ${isDark ? "hover:bg-slate-600" : "hover:bg-gray-100"} ${colorTheme === "dark" ? (isDark ? "bg-slate-600" : "bg-gray-100") : ""}`}
                                                onClick={() => { setColorTheme("dark"); setOpenSubMenu(null); setSettingsModal(false); }}
                                            >
                                                Dark
                                            </button>
                                        </div>
                                    )}
                                    {openSubMenu === "textTheme" && (
                                        <div
                                            className={`absolute top-20 right-[235px] z-50 mr-2 w-40 rounded-lg shadow-lg border ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}
                                            onMouseEnter={() => setOpenSubMenu("textTheme")}
                                            onMouseLeave={() => setOpenSubMenu(null)}
                                        >
                                            <button className={`w-full px-4 py-2 text-left ${isDark ? "hover:bg-slate-600" : "hover:bg-gray-100"} ${fontTheme === "sans" ? (isDark ? "bg-slate-600" : "bg-gray-100") : ""}`} onClick={() => { setFontTheme("sans"); setOpenSubMenu(null); setSettingsModal(false); }}>Sans</button>
                                            <button className={`w-full px-4 py-2 text-left ${isDark ? "hover:bg-slate-600" : "hover:bg-gray-100"} ${fontTheme === "serif" ? (isDark ? "bg-slate-600" : "bg-gray-100") : ""}`} onClick={() => { setFontTheme("serif"); setOpenSubMenu(null); setSettingsModal(false); }}>Serif</button>
                                            <button className={`w-full px-4 py-2 text-left ${isDark ? "hover:bg-slate-600" : "hover:bg-gray-100"} ${fontTheme === "mono" ? (isDark ? "bg-slate-600" : "bg-gray-100") : ""}`} onClick={() => { setFontTheme("mono"); setOpenSubMenu(null); setSettingsModal(false); }}>Mono</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Mobile Header */}
                <header className={`md:hidden flex items-center justify-between border-b ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"}`}>
                    <div className="flex flex-col gap-2">
                        <div className={`w-screen h-auto rounded-lg flex items-center justify-start ${isDark ? "bg-slate-800" : "bg-gray-100"}`}>
                            <span className={`text-xl w-5 h-5 m-5 ${isDark ? "[&>svg]:invert" : "[&>svg]:text-gray-900"}`}><Logo /></span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex flex-1 min-h-0 overflow-hidden">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex flex-1">
                        <div className={`w-1/5 border-r overflow-y-auto p-4 ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                            {notelist}
                        </div>
                        <div className="flex-1 w-full h-full overflow-y-auto">
                            {editor}
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className={`md:hidden flex-1 overflow-y-auto pb-20 ${isDark ? "bg-slate-900 text-slate-100" : "bg-white text-gray-900"}`}>
                        {mobileView === "home" && (
                            <div className="h-full">
                                <h1 className="text-2xl font-bold m-4">All Notes</h1>
                                {notelist}
                            </div>
                        )}

                        {mobileView === "editor" && (
                            <div className="h-full">
                            {editor}
                            </div>
                        )}

                        {mobileView === "search" && (
                            <div className="p-4">
                                <div className={`flex items-center border px-4 py-3 gap-3 rounded-lg ${isDark ? "border-slate-600" : "border-gray-300"}`}>
                                    <SearchIcon className={`${iconClass}`} />
                                    <input
                                        type="text"
                                        placeholder="Search by title, content or tags..."
                                        className="outline-none bg-transparent w-full text-md"
                                    />
                                </div>
                            </div>
                        )}
                        {mobileView === "archive" && (
                            <div className="p-4">
                                <h2 className="text-2xl font-bold mb-4">Archived Notes</h2>
                                {archivedNotes.length === 0 ? (
                                    <p className={isDark ? "text-slate-400" : "text-gray-500"}>No archived notes yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {archivedNotes.map(note => (
                                            <li
                                                key={note.id}
                                                onClick={() => { onSelectNote?.(note.id); setMobileView("editor"); window.dispatchEvent(new CustomEvent("open-editor")); }}
                                                className={`p-3 rounded-lg cursor-pointer ${activeNoteId === note.id ? (isDark ? "bg-slate-700" : "bg-blue-100") : isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`}
                                            >
                                                <p className="font-medium">{note.title || "Untitled"}</p>
                                                <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>{note.lastEdited}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {mobileView === "tags" && (
                            <div className="p-4">
                                <h2 className="text-2xl font-bold mb-4">Tags</h2>
                                {tags.length === 0 ? (
                                    <p className={isDark ? "text-slate-400" : "text-gray-500"}>No tags yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {tags.map(tag => (
                                            <li key={tag} className={`flex items-center gap-2 p-3 rounded-lg ${isDark ? "bg-slate-800" : "bg-gray-100"}`}>
                                                <TagIcon className={`${iconClass} w-5 h-5`} />
                                                <span>{tag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {mobileView === "settings" && (
                            <div className="p-4">
                                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                                <div className="space-y-2">
                                    <MobileSettingsRow label="Color Theme" icon={<ThemeIcon />} onClick={() => setMobileSettingsSub("colorTheme")} isDark={isDark} />
                                    {mobileSettingsSub === "colorTheme" && (
                                        <div className="pl-4 space-y-1">
                                            <button className={`w-full text-left p-3 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`} onClick={() => { setColorTheme("light"); setMobileSettingsSub(null); }}>Light</button>
                                            <button className={`w-full text-left p-3 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`} onClick={() => { setColorTheme("dark"); setMobileSettingsSub(null); }}>Dark</button>
                                        </div>
                                    )}
                                    <MobileSettingsRow label="Font Theme" icon={<FontThemeIcon />} onClick={() => setMobileSettingsSub(mobileSettingsSub === "fontTheme" ? null : "fontTheme")} isDark={isDark} />
                                    {mobileSettingsSub === "fontTheme" && (
                                        <div className="pl-4 space-y-1">
                                            <button className={`w-full text-left p-3 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`} onClick={() => { setFontTheme("sans"); setMobileSettingsSub(null); }}>Sans</button>
                                            <button className={`w-full text-left p-3 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`} onClick={() => { setFontTheme("serif"); setMobileSettingsSub(null); }}>Serif</button>
                                            <button className={`w-full text-left p-3 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`} onClick={() => { setFontTheme("mono"); setMobileSettingsSub(null); }}>Mono</button>
                                        </div>
                                    )}
                                    <button className={`w-full text-left p-4 rounded-lg flex gap-2 items-center ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`}>
                                        <LockIcon className={`${iconClass} w-5 h-5`} />
                                        Change Password
                                    </button>
                                    <button onClick={openLogin} className={`w-full text-left p-4 rounded-lg flex gap-2 items-center ${isDark ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-100 text-red-600 hover:bg-red-200"}`}>
                                        <LogoutIcon className={`${iconClass} w-5 h-5`} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t px-4 py-2 z-50 ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"}`}>
                    <div className="flex justify-around items-center">
                        <button
                            onClick={() => setMobileView("home")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "home" ? "text-blue-500" : isDark ? "text-slate-500" : "text-gray-400"}`}
                        >
                            <HomeIcon className={`${iconClass} ${mobileView === "home" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("search")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "search" ? "text-blue-500" : isDark ? "text-slate-500" : "text-gray-400"}`}
                        >
                            <SearchIcon className={`${iconClass} ${mobileView === "search" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("archive")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "archive" ? "text-blue-500" : isDark ? "text-slate-500" : "text-gray-400"}`}
                        >
                            <ArchiveIcon className={`${iconClass} ${mobileView === "archive" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("tags")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "tags" ? "text-blue-500" : isDark ? "text-slate-500" : "text-gray-400"}`}
                        >
                            <TagIcon className={`${iconClass} ${mobileView === "tags" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("settings")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "settings" ? "text-blue-500" : isDark ? "text-slate-500" : "text-gray-400"}`}
                        >
                            <SettingIcon className={`${iconClass} ${mobileView === "settings" ? "" : "opacity-50"}`} />
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}

type settingModalProps = {
    icon: React.ReactNode;
    name: string;
    className?: string;
    hasDropDown?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    isDark?: boolean;
};

function SettingModal({ icon, name, className, hasDropDown, onClick, onHover, isDark = false }: settingModalProps) {
    return (
        <div onMouseEnter={onHover} className={`flex flex-col gap-3 ${className}`}>
            <button onClick={onClick} className={`flex gap-2 px-5 py-3 cursor-pointer transition-colors text-left ${isDark ? "hover:bg-slate-600 text-white" : "hover:bg-gray-100 text-gray-900"}`}>
                <span className="w-6 h-6 icon-theme">{icon}</span>
                <p>{name}</p>
                {hasDropDown && <span className="ml-auto icon-theme w-6 h-6"><ChevronIcon /></span>}
            </button>
        </div>
    );
}

function MobileSettingsRow({ label, icon, onClick, isDark }: { label: string; icon: React.ReactNode; onClick: () => void; isDark?: boolean }) {
    return (
        <button onClick={onClick} className={`w-full text-left p-4 rounded-lg flex gap-2 items-center ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"}`}>
            <span className={`${iconClass} w-5 h-5`}>{icon}</span>
            {label}
        </button>
    );
}