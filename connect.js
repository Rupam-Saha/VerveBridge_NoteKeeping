const mongoose=require("mongoose");
const connectTodb=async()=>{
    try{
        await mongoose.connect(process.env.url);
        console.log("connected successfully");
    }
    catch(error){
        console.log("Not connected");
    }
}
module.exports=connectTodb;