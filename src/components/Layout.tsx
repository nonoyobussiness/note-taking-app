import { useState,useEffect } from "react";
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

type LayoutProps = {
    sidebar: React.ReactNode;
    notelist: React.ReactNode;
    editor: React.ReactNode;
    onMobileEdit?: ()=>void;
};

export function Layout({ sidebar, notelist, editor }: LayoutProps) {
    const [settingsModal, setSettingsModal] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<"colorTheme" | "textTheme" | null>(null);
    const [mobileView, setMobileView] = useState<"home" | "editor" | "search" | "archive" | "tags" | "settings">("home");
    useEffect(() => {
        const handler = () => setMobileView("editor");
        window.addEventListener("open-editor", handler);
        return () => window.removeEventListener("open-editor", handler);
    }, []);


    return (
        <div className="bg-slate-900 h-screen w-screen text-slate-100 flex flex-col md:flex-row overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden h-full md:flex w-[300px] border-r border-slate-700">
                {sidebar}
            </aside>

            <div className="flex flex-col flex-1 min-h-0">
                {/* Desktop Header */}
                <header className="hidden md:flex pt-9 pb-6 px-8 border-b border-slate-700">
                    <h1 className="text-3xl text-white font-semibold">All Notes</h1>
                    <div className="flex gap-10 items-center ml-auto mr-6 w-auto">
                        <div className="border hidden md:flex items-center border-slate-700 px-4 py-3 gap-3 rounded-lg w-80">
                            <SearchIcon className="w-6 h-6 invert" />
                            <input
                                type="text"
                                placeholder="Search by title, content or tags..."
                                className="outline-none bg-transparent w-full text-md"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setSettingsModal(prev => !prev)}
                                className="hover:bg-slate-800 p-2 rounded-lg"
                            >
                                <SettingIcon className="invert w-7 h-7" />
                            </button>
                            {settingsModal && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setSettingsModal(false)}
                                    />
                                    <div className="absolute right-0 mt-3 w-60 bg-slate-800 rounded-lg shadow-lg z-50">
                                        <SettingModal
                                            onHover={() => setOpenSubMenu("colorTheme")}
                                            onClick={() => setOpenSubMenu(prev => prev === "colorTheme" ? null : "colorTheme")}
                                            hasDropDown
                                            icon={<ThemeIcon />}
                                            name="Color Theme"
                                        />
                                        <SettingModal
                                            onHover={() => setOpenSubMenu("textTheme")}
                                            onClick={() => setOpenSubMenu(prev => prev === "textTheme" ? null : "textTheme")}
                                            hasDropDown
                                            icon={<FontThemeIcon />}
                                            name="Font Theme"
                                        />
                                        <SettingModal icon={<LockIcon />} name="Change Password" />
                                        <SettingModal
                                            className="border-t border-slate-600"
                                            icon={<LogoutIcon />}
                                            name="Logout"
                                        />
                                    </div>
                                    {openSubMenu === "colorTheme" && (
                                        <div
                                            onMouseEnter={() => setOpenSubMenu("colorTheme")}
                                            onMouseLeave={() => setOpenSubMenu(null)}
                                            className="absolute top-20 right-[235px] z-50 mr-2 w-40 bg-slate-800 rounded-lg shadow-lg"
                                        >
                                            <button
                                                className="w-full px-4 py-2 text-left hover:bg-slate-600"
                                                onClick={() => {
                                                    setOpenSubMenu(null);
                                                    setSettingsModal(false);
                                                }}
                                            >
                                                Light
                                            </button>
                                            <button
                                                className="w-full px-4 py-2 text-left hover:bg-slate-600"
                                                onClick={() => {
                                                    setOpenSubMenu(null);
                                                    setSettingsModal(false);
                                                }}
                                            >
                                                Dark
                                            </button>
                                        </div>
                                    )}
                                    {openSubMenu === "textTheme" && (
                                        <div
                                            className="absolute top-20 right-[235px] z-50 mr-2 w-40 bg-slate-800 rounded-lg shadow-lg"
                                            onMouseEnter={() => setOpenSubMenu("textTheme")}
                                            onMouseLeave={() => setOpenSubMenu(null)}
                                        >
                                            <button className="w-full px-4 py-2 text-left hover:bg-slate-600">Sans</button>
                                            <button className="w-full px-4 py-2 text-left hover:bg-slate-600">Serif</button>
                                            <button className="w-full px-4 py-2 text-left hover:bg-slate-600">Mono</button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between bg-white">
                    <div className="flex flex-col gap-2">
                        <div className="w-screen h-auto bg-slate-100 rounded-lg flex items-center justify-start">
                            <span className="text-white text-xl w-5 h-5 m-5"><Logo  /></span>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex flex-1 min-h-0 overflow-hidden">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex flex-1">
                        <div className="w-1/5 border-r border-slate-700 overflow-y-auto p-4">
                            {notelist}
                        </div>
                        <div className="flex-1 w-full h-full overflow-y-auto">
                            {editor}
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex-1 overflow-y-auto bg-white pb-20">
                        {mobileView === "home" && (
                            <div className="h-full">
                                <h1 className="text-2xl font-bold text-black m-4">All Notes</h1>
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
                                <div className="flex items-center border border-gray-300 px-4 py-3 gap-3 rounded-lg">
                                    <SearchIcon className="w-6 h-6" />
                                    <input
                                        type="text"
                                        placeholder="Search by title, content or tags..."
                                        className="outline-none bg-transparent w-full text-md text-black"
                                    />
                                </div>
                            </div>
                        )}
                        {mobileView === "archive" && (
                            <div className="p-4 text-black">
                                <h2 className="text-2xl font-bold mb-4">Archived Notes</h2>
                                <p className="text-gray-500">No archived notes yet.</p>
                            </div>
                        )}
                        {mobileView === "tags" && (
                            <div className="p-4 text-black">
                                <h2 className="text-2xl font-bold mb-4">Tags</h2>
                                <p className="text-gray-500">No tags yet.</p>
                            </div>
                        )}
                        {mobileView === "settings" && (
                            <div className="p-4 text-black">
                                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                                <div className="space-y-2">
                                    <button className="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
                                        Color Theme
                                    </button>
                                    <button className="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
                                        Font Theme
                                    </button>
                                    <button className="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
                                        Change Password
                                    </button>
                                    <button className="w-full text-left p-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
                    <div className="flex justify-around items-center">
                        <button
                            onClick={() => setMobileView("home")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "home" ? "text-blue-500" : "text-gray-400"}`}
                        >
                            <HomeIcon className={`w-6 h-6 ${mobileView === "home" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("search")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "search" ? "text-blue-500" : "text-gray-400"}`}
                        >
                            <SearchIcon className={`w-6 h-6 ${mobileView === "search" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("archive")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "archive" ? "text-blue-500" : "text-gray-400"}`}
                        >
                            <ArchiveIcon className={`w-6 h-6 ${mobileView === "archive" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("tags")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "tags" ? "text-blue-500" : "text-gray-400"}`}
                        >
                            <TagIcon className={`w-6 h-6 ${mobileView === "tags" ? "" : "opacity-50"}`} />
                        </button>
                        <button
                            onClick={() => setMobileView("settings")}
                            className={`flex flex-col items-center py-2 px-4 ${mobileView === "settings" ? "text-blue-500" : "text-gray-400"}`}
                        >
                            <SettingIcon className={`w-6 h-6 ${mobileView === "settings" ? "" : "opacity-50"}`} />
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
};

function SettingModal({ icon, name, className, hasDropDown, onClick, onHover }: settingModalProps) {
    return (
        <div onMouseEnter={onHover} className={`flex flex-col gap-3 ${className}`}>
            <button onClick={onClick} className="flex gap-2 hover:bg-slate-600 px-5 py-3 cursor-pointer transition-colors">
                <span className="w-6 h-6 invert">{icon}</span>
                <p className="text-white">{name}</p>
                {hasDropDown && <span className="ml-auto invert w-6 h-6"><ChevronIcon /></span>}
            </button>
        </div>
    );
}