const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const x=new mongoose.Schema({
    User_name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Contact:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});
x.methods.getToken=function(){
    try{
        return(
            jwt.sign({
                user_id:this._id.toString(),
                user_email:this.Email
            },process.env.secret_key)
        )
    }
    catch(error){
        console.log(error);
    }
}
module.exports=mongoose.model("register",x);