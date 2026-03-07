import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:false
        },
        content:{
            type:String,
            required:false
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },{
        timestamps:true
    }
);
const Note = mongoose.model("Note",noteSchema);

export default Note;