const express=require("express");
const {register, login, forgot, getname, addnote, allnote, persoinfo, editinfo, delnote, editnote, getnote, search}=require("../controller/controll");
const check=require("../middleware/register");
const r=express.Router();
r.route("/register").post(check(),register);
r.route("/login").post(login);
r.route("/forgotpassword").patch(forgot);
r.route("/getname").get(getname);
r.route("/addnote").post(addnote);
r.route("/allnote").get(allnote);
r.route("/personalinfo").get(persoinfo);
r.route("/editinfo").patch(editinfo);
r.route("/deletenote").delete(delnote);
r.route("/editnote").patch(editnote);
r.route("/getnote/:id").get(getnote);
r.route("/search").post(search);
module.exports=r;