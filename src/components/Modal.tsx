type modalProps ={
    title:string,
    icon:React.ReactNode,
    confirmText:string,
    buttonType:string,
    onConfirm:()=>void,
    onCancel:()=>void,
};

export default function Modal({title,icon,confirmText,onConfirm,onCancel,buttonType} : modalProps){
    return(
        <div className="inset-0 z-50 bg-black/20 fixed flex justify-center items-center">
            <div className="flex flex-col bg-slate-800 gap-3 p-4 w-1/4 rounded-xl">
                <div className="flex gap-3 ">
                    {icon && <span className="invert w-6 h-6 px-3 py-1 mr-4 ">{icon}</span>}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-lg font-semibold text-white" >{title}</h1>
                        <p className="text-slate-100 ">{confirmText}</p>
                    </div>
                </div>
                <div className="border-t border-slate-600 p-4">
                    <div className="ml-auto gap-3 flex justify-end ">
                        <button onClick={onCancel} className="px-4 py-3 bg-slate-600 text-neutral rounded-lg cursor-pointer transition-colors hover:bg-slate-400" >Cancel</button>
                        <button onClick={onConfirm} className={`px-4 py-3 text-white rounded-lg cursor-pointer transition-colors ${buttonType === "Delete" ? "bg-red-600 hover:bg-red-400" : "bg-blue-600 hover:bg-blue-400" }`} >{buttonType} Note</button>
                    </div>
                </div>
            </div>
        </div>
    )
}