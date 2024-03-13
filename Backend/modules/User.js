const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
username:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
},
roles:[{type:String, default:"Employee"}],
isActive:{
    type:Boolean,
    default:true
}


},
{capped:{size:1024,max:4},
timestamps:true}
)

module.exports = mongoose.model("users", userSchema);