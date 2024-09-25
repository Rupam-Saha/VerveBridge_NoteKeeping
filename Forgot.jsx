import { useState } from "react";
import { useNavigate } from "react-router-dom";
import picture from "../image/back.webp";
import Swal from "sweetalert2";
import "./forgot.css";
export const Forgot=()=>{
    const navi=useNavigate();
    const [data,setdata]=useState({
        Email:"",
        Password:""
    });
    const func=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const func1=async (e)=>{
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4002/forgotpassword",{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)  
            })
            console.log(respo);
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
                navi("/login");
            }
            else{
                Swal.fire({
                    text:x.msg,
                    icon:"error",
                    background:"white"
                })
            }
        }
        catch(error){
            Swal.fire({
                text:"Error",
                icon:"error",
                background:"white"
            })
        }
    }
    return(
        <>
        <div className="head">
            <h1><b><u>WELCOME TO NOTEWORLD</u></b></h1>
        </div>
        <div className="middle">
            <div className="pic" id="pict">
                <img src={picture}/>
            </div>
            <div className="regi1" id="log">
                <div className="ema">
                    <p><b>EMAIL</b></p>
                    <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="Email"
                    value={data.Email}
                    onChange={func}
                    />
                </div>
                <div className="name">
                    <p><b>NEW PASSWORD</b></p>
                    <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="Password"
                    value={data.Password}
                    onChange={func}
                    />
                </div>
                <div className="sayani">
                    <button onClick={func1}><span id="ab">UPDATE</span></button>
                    <button onClick={()=>{navi("/login")}}><span id="ab">BACK</span></button>
                </div>
            </div>
        </div>
        </>
    )
}