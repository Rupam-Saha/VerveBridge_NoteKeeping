import picture from "../image/back.webp";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Register=()=>{
    const navi=useNavigate();
    const [data,setdata]=useState({
        User_name:"",
        Email:"",
        Contact:"",
        Password:""
    })
    const changFunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const submitfun=async (e)=>{
        console.log(data);
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4002/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            });
            //console.log(respo);
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                setdata({
                    User_name:"",
                    Email:"",
                    Contact:"",
                    Password:""
                })
                navi("/login");
            }
            else if(respo.status==500){
                Swal.fire({
                    text:x,
                    icon:"error",
                    background:"white"
                })
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
            <div className="pic">
                <img src={picture}/>
            </div>
            <div className="regi2">
                <div className="name">
                    <p><b>USER NAME</b></p>
                    <input
                    type="text"
                    placeholder="Enter Your Name"
                    name="User_name"
                    value={data.User_name}
                    onChange={changFunc}
                    />
                </div>
                <div className="ema">
                    <p><b>EMAIL</b></p>
                    <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="Email"
                    value={data.Email}
                    onChange={changFunc}
                    />
                </div>
                <div className="con">
                    <p><b>CONTACT</b></p>
                    <input
                    type="text"
                    placeholder="Enter Your Number"
                    name="Contact"
                    value={data.Contact}
                    onChange={changFunc}
                    />
                </div>
                <div className="pwd">
                    <p><b>PASSWORD</b></p>
                    <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="Password"
                    value={data.Password}
                    onChange={changFunc}
                    />
                </div>
                <div className="sayani">
                    <button onClick={submitfun}><span >REGISTER</span></button>
                </div>
                <div className="note">
                    <p>Alrady Have An Account ?? <b onClick={()=>{navi("/login")}}>Login</b></p>
                </div>
            </div>
        </div>
        </>
    )
}