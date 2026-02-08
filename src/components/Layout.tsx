import { useState } from "react";
import SearchIcon from "./../assets/images/icon-search.svg?react";
import SettingIcon from "./../assets/images/icon-settings.svg?react";
import ChevronIcon from "./../assets/images/icon-chevron-right.svg?react";
import ThemeIcon from "./../assets/images/icon-sun.svg?react";
import FontThemeIcon from "./../assets/images/icon-font.svg?react";
import LockIcon from "./../assets/images/icon-show-password.svg?react";
import LogoutIcon from "./../assets/images/icon-logout.svg?react";

type LayoutProps = {
    sidebar:React.ReactNode;
    notelist:React.ReactNode;
    editor:React.ReactNode;
};

export function Layout({sidebar,notelist,editor}:LayoutProps){
    const [settingsModal, setSettingsModal] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<"colorTheme"|"textTheme"|null>(null);
    return(
        <div className="bg-slate-900 h-screen w-screen text-slate-100 flex">
            <aside className="h-full w-[300px] border-r border-slate-700" >{sidebar}</aside>
            <div className="flex flex-col flex-1">
                <header className="pt-9 pb-6 px-8 border-b border-slate-700 flex ">
                    <h1 className="text-3xl text-white font-semibold">All Notes</h1>
                    <div className="flex gap-10 items-center ml-auto mr-6 w-auto">
                        <div className=" border flex items-center border border-slate-700 px-4 py-3 gap-3 rounded-lg w-80   ">
                            <SearchIcon className="w-6 h-6 invert" ></SearchIcon>
                            <input type="text" placeholder="Search by title, content or tags..." className="outline-none bg-transparent w-full text-md " />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setSettingsModal(prev => !prev)}
                                className="hover:bg-slate-800 p-2 rounded-lg">
                                <SettingIcon className="invert w-7 h-7" />
                            </button>
                            {settingsModal && (
                                <>
                                    <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setSettingsModal(false)}
                                    />
                                    <div className="absolute right-0 mt-3 w-60 bg-slate-800 rounded-lg shadow-lg z-50">
                                        <SettingModal onClick={()=>setOpenSubMenu(prev => prev==="colorTheme"?null : "colorTheme")} hasDropDown icon={<ThemeIcon />} name="Color Theme" />
                                        <SettingModal onClick={()=>setOpenSubMenu(prev => prev==="textTheme" ? null : "textTheme")} hasDropDown icon={<FontThemeIcon />} name="Font Theme" />
                                        <SettingModal icon={<LockIcon />} name="Change Password" />
                                        <SettingModal className ={"border-t border-slate-600 "} icon={<LogoutIcon />} name="Logout" />
                                    </div>
                                    {openSubMenu === "colorTheme" && (
                                        <div className="absolute top-20 right-[235px] z-50 mr-2 w-40 bg-slate-800 rounded-lg shadow-lg">
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
                                        <div className="absolute top-20 right-[235px] z-50 mr-2 w-40 bg-slate-800 rounded-lg shadow-lg">
                                            <button className="w-full px-4 py-2 text-left hover:bg-slate-600">
                                            Sans
                                            </button>
                                            <button className="w-full px-4 py-2 text-left hover:bg-slate-600">
                                            Serif
                                            </button>
                                            <button className="w-full px-4 py-2 text-left hover:bg-slate-600">
                                            Mono
                                            </button>
                                        </div>
                                        )}
                                </>
                                )}
                        </div>
                    </div>
                    
                </header>
                <div className="flex flex-1">
                    <div className="w-1/5 border-r border-slate-700 overflow-y-auto p-4 ">{notelist}</div>
                    <div className="flex-1 w-full h-full">{editor}</div>
                </div>
            </div>
            
        </div>
    )
}       
type settingModalProps = {
    icon:React.ReactNode,
    name:string,
    className?:string,
    hasDropDown?:boolean,
    onClick?: ()=>void;
}

function SettingModal({icon,name, className, hasDropDown, onClick} : settingModalProps){
        return(
            <div className={`flex flex-col gap-3 ${className}`}>
                <button onClick={onClick} className="flex gap-2 hover:bg-slate-600 px-5 py-3 cursor-pointer transition-colors">
                    <span className="w-6 h-6 invert" >{icon}</span>
                    <p className="text-white">{name}</p>
                    {hasDropDown &&
                        <span className="ml-auto invert w-6 h-6 " ><ChevronIcon></ChevronIcon></span>
                    }
                </button>
            </div>
        )
}