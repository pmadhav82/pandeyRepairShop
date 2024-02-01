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
},
ticket:{
    type:Number
}
},
{
    timestamps:true
}


)




noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id:"ticketNum",
    start_seq: 500,
    disable_hooks: true
})

module.exports = mongoose.model("notes", noteSchema);