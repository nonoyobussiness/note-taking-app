
import HomeIcon from "./../assets/images/icon-home.svg?react";
import ArchiveIcon from "./../assets/images/icon-archive.svg?react";
import RightChevronIcon from "./../assets/images/icon-chevron-right.svg?react";
import TagIcon from "./../assets/images/icon-tag.svg?react";
import Logo from "./../assets/images/logo.svg?react";



export function Sidebar(){
    return(
        <aside className="h-full p-5">
            <div className="mb-5 ">
                <Logo className="w-30 h-18 "/>  
            </div>
            <div className=" mb-5 border-b border-slate-800">

                <NavItem label="All Notes" icon= {<HomeIcon></HomeIcon>}  ></NavItem>
                <NavItem label="Archived Notes" icon={<ArchiveIcon/>} ></NavItem>
            </div>
            <p className="text-neutral-500 m-3">Tags</p>
            <TagItem label="Cooking" ></TagItem>
            <TagItem label="Dev" ></TagItem>
            <TagItem label="Fitness" ></TagItem>
            <TagItem label="Health" ></TagItem>
            <TagItem label="Personal" ></TagItem>
            <TagItem label="React" ></TagItem>
            <TagItem label="Recipes" ></TagItem>
            <TagItem label="Shopping" ></TagItem>
            <TagItem label="Travel" ></TagItem>
            <TagItem label="TypeScript" ></TagItem>

        </aside>
    )

}
type NavItemProps = {
    label:string,
    active? : boolean,
    icon? : React.ReactNode,
};

function NavItem({label,active = false,icon}:NavItemProps) {
    return(
        <div className={`flex group items-center rounded-xl px-6 py-4 cursor-pointer ${active ? "bg-slate-800 " : "hover:bg-slate-800"} `}>
            <div className="flex items-center gap-2 ">
                {icon && <span className={`w-5 h-5 invert ${active && "text-blue-400"}`}>{icon}</span>}
                <span>{label}</span>
            </div>
            <span className={`ml-auto transition-opacity ${!active ? "opacity-0 group-hover:opacity-100" : "opacity-100"} `}>
                <RightChevronIcon className="w-6 h-6 invert" />
            </span>
            
        </div>
    )
}

type TagItemProps = {
    label:string,
    active?:boolean,
};

function TagItem({label, active = false}:TagItemProps){
    return(
        <div className={`flex rounded-xl items-center p-4 gap-2 cursor-pointer ${active ? "bg-slate-800" : "hover:bg-slate-800"} `}>
            <TagIcon className="w-6 h-6 invert"/>
            {label}
        </div>
    )
}