const mongoose=require("mongoose");
const x=new mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Text:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("notes",x);