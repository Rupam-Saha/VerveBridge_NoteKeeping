const regVali=require("../validation/registervalidate");
const check=()=>async(req,res,next)=>{
    try{
        const x=await regVali.parseAsync(req.body);
        next();
    }
    catch(error){
        //console.log(error);
        res.status(500).json(error.issues[0].message);
    }
}
module.exports=check;