const {z}=require("zod");
const regVali=z.object({
    User_name:z
    .string({required_error:"User Name Feild Can't be Empty"})
    .trim()
    .min(5,{message:"User Name feild Should Be More Than 5 Letters"})
    .max(20,{message:"User Name feild Should Be Less Than 20 Letters"}),
    Email:z
    .string({required_error:"Email Feild Can't be Empty"})
    .email()
    .min(5,{message:"Email feild Should Be More Than 5 Letters"})
    .max(40,{message:"Email feild Should Be Less Than 40 Letters"}),
    Contact:z
    .string({required_error:"Contact Feild Can't be Empty"})
    .trim()
    .min(10,{message:"Contact feild Should Be More Than 10 Letters"})
    .max(10,{message:"Contact feild Should Be Less Than 10 Letters"}),
    Password:z
    .string({required_error:"Password Feild Can't be Empty"})
    .trim()
    .min(8,{message:"Password feild Should Be More Than 8 Letters"})
    .max(20,{message:"Password feild Should Be Less Than 20 Letters"})
})
module.exports=regVali;