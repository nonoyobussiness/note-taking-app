import type { ColorTheme } from "../App";
import HomeIcon from "./../assets/images/icon-home.svg?react";
import ArchiveIcon from "./../assets/images/icon-archive.svg?react";
import RightChevronIcon from "./../assets/images/icon-chevron-right.svg?react";
import TagIcon from "./../assets/images/icon-tag.svg?react";
import Logo from "./../assets/images/logo.svg?react";

type SidebarProps = {
    tags: string[];
    colorTheme: ColorTheme;
};

const iconClass = "icon-theme w-5 h-5";

export function Sidebar({ tags, colorTheme }: SidebarProps) {
    const isDark = colorTheme === "dark";
    /* Logo: light theme = keep built-in colors (blue + dark text); dark theme = invert for visibility */
    const logoClass = isDark ? "[&>svg]:invert" : "";
    return (
        <aside className="h-full p-5">
            <div className={`mb-5 ${logoClass}`}>
                <Logo className="w-30 h-18" />
            </div>
            <div className={`mb-5 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                <NavItem label="All Notes" active icon={<HomeIcon />} iconClass={iconClass} isDark={isDark} />
                <NavItem label="Archived Notes" icon={<ArchiveIcon />} iconClass={iconClass} isDark={isDark} />
            </div>
            <p className={`m-3 ${isDark ? "text-slate-400" : "text-neutral-500"}`}>Tags</p>
            {tags.map(t => (
                <TagItem key={t} label={t} iconClass={iconClass} isDark={isDark} />
            ))}
        </aside>
    );
}
type NavItemProps = {
    label: string;
    active?: boolean;
    icon?: React.ReactNode;
    iconClass?: string;
    isDark?: boolean;
};

function NavItem({ label, active = false, icon, iconClass = "icon-theme w-5 h-5", isDark = false }: NavItemProps) {
    return (
        <div className={`flex group items-center rounded-xl px-6 py-4 cursor-pointer ${active ? (isDark ? "bg-slate-800" : "bg-gray-200") : (isDark ? "hover:bg-slate-800" : "hover:bg-gray-100")}`}>
            <div className="flex items-center gap-2">
                {icon && <span className={`${iconClass} ${active ? (isDark ? "text-blue-400" : "text-blue-600") : ""}`}>{icon}</span>}
                <span>{label}</span>
            </div>
            <span className={`ml-auto transition-opacity ${!active ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                <RightChevronIcon className={`${iconClass} w-6 h-6`} />
            </span>
        </div>
    );
}

type TagItemProps = {
    label: string;
    active?: boolean;
    iconClass?: string;
    isDark?: boolean;
};

function TagItem({ label, active = false, iconClass = "icon-theme w-6 h-6", isDark = false }: TagItemProps) {
    return (
        <div className={`flex rounded-xl items-center p-4 gap-2 cursor-pointer ${active ? (isDark ? "bg-slate-800" : "bg-gray-200") : (isDark ? "hover:bg-slate-800" : "hover:bg-gray-100")}`}>
            <TagIcon className={iconClass} />
            {label}
        </div>
    );
}