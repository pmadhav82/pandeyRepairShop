
const Note = require("../modules/Note");
const asyncHandeler = require("express-async-handler");

// @desc Get all notes
// @route GET /note
// @access Private
const getAllNotes = asyncHandeler(async (req,res)=>{
    const notes = await Note.find().sort({completed:1}).populate({path:"user",select:"username"}).lean().exec();
    if(!notes?.length){
        return res
        .status(400)
        .json({message:"No notes are found"})
    }




    res.json(notes);
})


// @desc Creat a new Note
// @route POST /note
// @access Private
const createNewNote = asyncHandeler(async (req,res)=>{
const {text, title, user} = req.body;

if(!text || !title  || !user){
    return res
    .status(400)
    .json({message:"All fields are required"})
}

// create new note3
const newNoteObj = {
    title,
    text,
    user
    
}

const newNote = await Note.create(newNoteObj)
if(newNote){
    return res
    .status(201)
    .json({message:"New note is created"})
}else{
    res
    .status(400)
    .json({message:"Invalid note data received"})
}


res.status(400).json({message:"Something went wrong..."})

})

// @desc Update a Note
// @route PUT /note
// @access Private
const updateNote = asyncHandeler(async (req,res)=>{
const {id, title, text, user, completed} = req.body;
if(!id || !user || !title || !text || typeof completed!== "boolean"){
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

// @desc Delete a Note
// @route DELETE /note
// @access Private
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