import SearchIcon from "./../assets/images/icon-search.svg?react";

type LayoutProps = {
    sidebar:React.ReactNode;
    notelist:React.ReactNode;
    editor:React.ReactNode;
};

export function Layout({sidebar,notelist,editor}:LayoutProps){
    return(
        <div className="bg-slate-900 h-screen w-screen text-slate-100 flex">
            <aside className="h-full w-[300px] border-r border-slate-700" >{sidebar}</aside>
            <div className="flex flex-col flex-1">
                <header className="pt-9 pb-6 px-8 border-b border-slate-700 flex ">
                    <h1 className="text-3xl text-white font-semibold">All Notes</h1>
                    <div className="ml-auto border flex items-center border border-slate-700 px-4 py-4 gap-3 w-1/4 rounded-lg ">
                        <SearchIcon className="w-6 h-6 invert" ></SearchIcon>
                        <input type="text" placeholder="Search by title, content or tags..." className="outline-none bg-transparent w-full text-md " />

                    </div>
                </header>
                <div className="flex flex-1">
                    <div className="w-1/5 border-r border-slate-700 overflow-y-auto p-4 ">{notelist}</div>
                    <div className="flex-1 h-full">{editor}</div>
                </div>
            </div>
            
        </div>
    )
}