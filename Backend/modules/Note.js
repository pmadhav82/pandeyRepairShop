const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const noteSchema = new mongoose.Schema(
    {
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
},
completed:{
    type:Boolean,
    default:false
},
text:{
    type:String,
    required:true
},
title:{
    type:String,
    required:true
}

},
{
    timestamps:true,
    capped:{size:1024, max:50}
}




)





module.exports = mongoose.model("notes", noteSchema);