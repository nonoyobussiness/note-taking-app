type LayoutProps = {
    sidebar:React.ReactNode;
    notelist:React.ReactNode;
    editor:React.ReactNode;
};

export function Layout({sidebar,notelist,editor}:LayoutProps){
    return(
        <div className="bg-slate-900 h-screen w-screen text-slate-100">
            <aside className="h-full w-[300px] border-r border-slate-800" >{sidebar}</aside>
            
        </div>
    )
}