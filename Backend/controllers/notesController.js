const User = require("../modules/User");
const Note = require("../modules/Note");
const asyncHandeler = require("express-async-handler");


// get all note

const getAllNotes = asyncHandeler(async (req,res)=>{
    const notes = await Note.find().lean().exec();
    if(!notes?.length){
        return res
        .status(400)
        .json({message:"No notes are found"})
    }


    //add username to each note before sending

    const noteWithUser = Promise.all(notes.map(async (note)=>{
const user = await User.findById(note.user).lean().exec();
return {
    ...note,
    username:user.username
}

res.json(noteWithUser);

    }))
})


// create a new note

const createNewNote = asyncHandeler(async (req,res)=>{
const {text, title, user} = req.body;

if(!text || !title  || !user){
    return res
    .status(400)
    .json({message:"All fields are required"})
}

// create new note
const newNote = Note.create({
    title,
    text,
    user
})

if(newNote){
    return res
    .status(201)
    .json({message:"New note is created"})
}else{
    return res
    .status(400)
    .json({message:"Invalid note data received"})
}

})


const updateNote = asyncHandeler(async (req,res)=>{
const {id, title, text, user, completed} = req.body;

if(!id || !user || !title || !text || !completed ){
    return res
    .status(400)
    .json({message:"All fields are required"})
}
const note = await Note.findById(id).exec();
if(!note){
    return res
    .status(400)
    .json({message:"Note is not found"});
}

note.user = user;
note.title = title;
note.text = text;
note.completed = completed

const updatedNote = await note.save();

res.json({message:`${updatedNote.title} is updated`})
})


const deleteNote = asyncHandeler(async (req,res) =>{
const {id} = req.body;
if(!id){
    return res
    .status(400)
    .json({message:"Id is required"})
}

const note = await Note.findById(id).exec();

if(!note){
    return res 
    .status(400)
    .json({message:"Note is not found"})
}

const deletedNote = await note.deleteOne();
res.json({message:"Note deleted"})
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}