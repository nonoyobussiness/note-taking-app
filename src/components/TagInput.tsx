import type { Note } from "../App";
import { useState } from "react";
import { useEffect } from "react";

type Props ={
    note:Note,
    onChange: (note:Note)=>void;
};

export function TagInput({note, onChange}: Props){
    const [value,setValue]=useState("");
    useEffect(() => {
        setValue(note.tags.join(", "));
        }, [note.id]); 

    function updateTags(input:string){
        const tags = input.split(",").map(t=>t.trim()).filter(t=>t!=="");
        onChange({
            ...note,
            tags,
        });
    }
    return(
        <input
            value={value}
            onChange={e=>{
                const input = e.target.value;
                setValue(input);
                updateTags(input);
            }} className="bg-transparent outline-none "></input>
    )
}