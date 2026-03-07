import Note from "../models/Note.js";

export const getNotes = async (req,res)=>{
    try{
        const notes = await Note.find({user:req.user});
        res.json(notes);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
export const createNote = async(req,res)=>{
    try{
        const {title, content}=req.body;
        const note = await Note.create({
            title,content,user:req.user
        });
        res.status(201).json(note);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
export const updateNote = async(req,res)=>{
    try{
        const {title, content} = req.body;

        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({
                message:"Note not found"
            });
        }
        if(note.user.toString() !== req.user){
            return res.status(401).json({
                message:"Not authorized"
            });
        }
        note.title = title || note.title;
        note.content = content || note.content;

        const updatedNote = await note.save();
        res.json(updatedNote);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
export const deleteNote = async(req,res)=>{
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({
                message:"Note not found"
            });
        }
        if(note.user.toString() !== req.user){
            return res.status(401).json({message:"Not authorized"});
        }
        await note.deleteOne();

        res.json({message:"Note deleted succesfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};