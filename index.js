require("dotenv").config();
const express=require("express");
const app=express();
const connectTodb=require("./connection/connect");
const r=require("./route/route");
const cors=require("cors");
const corsOption={
    origin:"http://localhost:5173",
    methods:"POST,GET,PATCH,DELETE,HEAD,PUT",
    Credential:true
}
const port=process.env.port;
app.use(express.json());
app.use(cors(corsOption));
app.use("",r);
connectTodb().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at ${port}`);
    })
})
