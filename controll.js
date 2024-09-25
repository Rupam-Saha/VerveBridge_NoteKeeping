const regSchema=require("../models/register-model");
const noteSchema=require("../models/note-model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const register=async (req,res)=>{
    try{
        const data=req.body;
        const ser=await regSchema.findOne({Email:data.Email});
        if(ser){
            res.status(200).json({msg:"This Email Id Is Present"});
        }
        else{
            const newpwd=await bcrypt.hash(data.Password,10);
            const x=await regSchema.create({User_name:data.User_name,Email:data.Email,Contact:data.Contact,Password:newpwd});
            res.status(200).json({msg:"Registered Successfully"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const login=async (req,res)=>{
    try{
        const data=req.body;
        const ch=await regSchema.findOne({Email:data.Email});
        if(ch){
            const ch1=await bcrypt.compare(data.Password,ch.Password);
            if(ch1){
                res.status(200).json({msg:"Login Successfully",token:ch.getToken()});
            }
            else{
                res.status(400).json({msg:"Wrong Password"});
            }
        }
        else{
            res.status(400).json({msg:"This Email Id is Not Registered"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const forgot=async (req,res)=>{
    try{
        const data=req.body;
        const ch=await regSchema.findOne({Email:data.Email});
        if(ch){
            const newpwd=await bcrypt.hash(data.Password,10);
            const x=await regSchema.updateOne({Email:data.Email},{$set:{Password:newpwd}});
            res.status(200).json({msg:"Update Password Succefully"});
        }
        else{
            res.status(400).json({msg:"This Email Id Is Not Valid"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const getname=async(req,res)=>{
    try{
        const token=req.header("Authorization");
        const veri=jwt.verify(token,process.env.secret_key);
        //console.log(veri);
        const User_name=await regSchema.findOne({Email:veri.user_email});
        res.status(200).json(User_name);
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const addnote=async(req,res)=>{
    try{
        const data=req.body;
        if(data.Title.length==0 && data.Text.length==0){
            res.status(400).json({msg:"Can't Add Empty Note"});
        }
        else if(data.Title.length==0){
            res.status(400).json({msg:"Please Type A Title For Save The Note"});
        }
        else if(data.Text.length==0){
            res.status(400).json({msg:"Please Type Text With In The Note"});
        }
        else{
            const x=await noteSchema.create({Email:data.Email,Title:data.Title,Text:data.Text});
            res.status(200).json({msg:"Note Added Successfully"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const allnote=async (req,res)=>{
    try{
        const token=req.header("Authorization");
        const veri=jwt.verify(token,process.env.secret_key);
        const data=await noteSchema.find({Email:veri.user_email});
        res.status(200).json(data);
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const persoinfo=async(req,res)=>{
    try{
        const token=req.header("Authorization");
        const veri=jwt.verify(token,process.env.secret_key);
        const data=await regSchema.findOne({Email:veri.user_email});
        const data1=await noteSchema.find({Email:veri.user_email});
        const x=data1.length;
        res.status(200).json({Email:data.Email,User_name:data.User_name,Contact:data.Contact,TotalNotes:x});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const editinfo=async (req,res)=>{
    try{
        const data=req.body;
        const veri=jwt.verify(data.token,process.env.secret_key);
        const x=await regSchema.updateOne({_id:veri.user_id},{$set:{Email:data.Email,User_name:data.User_name,Contact:data.Contact}});
        const y=await noteSchema.updateOne({Email:veri.user_email},{$set:{Email:data.Email}});
        const z=await regSchema.findOne({Email:data.Email});
        res.status(200).json({msg:"Updated Successfully",token:z.getToken()});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const delnote=async (req,res)=>{
    try{
        const id=req.body.id;
        const x=await noteSchema.deleteOne({_id:id});
        res.status(200).json({msg:"Deleted Successfully"});
    }
    catch(error){
        res.status(200).json({msg:"Error"});
    }
}
const editnote=async(req,res)=>{
    try{
        const data=req.body;
        if(data.Text!=0 && data.Title!=0){
            const x=await noteSchema.updateOne({_id:data.id},{$set:{Text:data.Text,Title:data.Title}});
            res.status(200).json({msg:"Updated Successfully"});
        }
        else{
            res.status(400).json({msg:"Can't Add Empty Note"});
        }
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const getnote=async(req,res)=>{
    try{
        const id=req.params.id;
        const x=await noteSchema.findOne({_id:id});
        res.status(200).json({Text:x.Text,Title:x.Title});
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
const search=async(req,res)=>{
    try{
        const title=req.body.Title;
        const token=req.body.token;
        const veri=jwt.verify(token,process.env.secret_key); 
        const data=await noteSchema.find({Title:title,Email:veri.user_email});
        res.status(200).json(data);
    }
    catch(error){
        res.status(400).json({msg:"Error"});
    }
}
module.exports={register,login,forgot,getname,addnote,allnote,persoinfo,editinfo,delnote,editnote,getnote,search};