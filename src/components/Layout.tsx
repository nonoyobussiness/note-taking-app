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
                <header className="p-10 border-b border-slate-700 ">
                    <h1 className="text-2xl text-white font-semibold">All Notes</h1>
                </header>
                <div className="flex flex-1">
                    <div className="w-[400] border-r border-slate-700 overflow-y-auto">{notelist}</div>
                    <div className="flex-1">{editor}</div>
                </div>
            </div>
            
        </div>
    )
}