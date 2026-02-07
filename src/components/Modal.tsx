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
        <div className="inset-0 z-50 bg-black/20 fixed justify-center items-center">
            <div className="flex flex-col bg-slate-800">
                <div className="flex gap-3">
                    {icon && <span className="invert w-5 h-5">{icon}</span>}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-lg font-semibold text-white" >{title}</h1>
                        <p className="text-slate-100">{confirmText}</p>
                    </div>
                </div>
                <div className="border-t border-slate-600 p-4">
                    <div className="ml-auto gap-3 flex ">
                        <button onClick={onCancel} className="p-4 bg-slate-400 text-slate-700 rounded-lg" >Cancel</button>
                        <button onClick={onConfirm} className={`p-4 text-slate-700 rounded-lg ${buttonType === "Delete" ? "bg-red-600" : "bg-blue-600" }`} >{buttonType}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}