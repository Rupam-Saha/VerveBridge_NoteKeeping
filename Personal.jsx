import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./personal.css";
export const Personal=()=>{
    const [data,setdata]=useState({});
    const navi=useNavigate();
    const func=async ()=>{
        try{
            const respo=await fetch("http://localhost:4002/personalinfo",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            });
            const x=await respo.json();
            setdata(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[]);
    const backfunc=()=>{
        navi("/home");
    }
    const fun=()=>{
        navi("/editinfo");
    }
    return(
        <>
        <div className="regi3">
                <div className="name">
                    <p><b>USER NAME</b></p>
                    <input
                    type="text"
                    name="User_name"
                    value={data.User_name}
                    />
                </div>
                <div className="ema">
                    <p><b>EMAIL</b></p>
                    <input
                    type="email"
                    name="Email"
                    value={data.Email}
                    />
                </div>
                <div className="con">
                    <p><b>CONTACT</b></p>
                    <input
                    type="text"
                    name="Contact"
                    value={data.Contact}
                    />
                </div>
                <div className="total">
                <p><b>NUMBER OF NOTES</b></p>
                    <input
                    type="text"
                    value={data.TotalNotes}
                    />                    
                </div>
                <div className="sayani">
                    <button onClick={fun}><FontAwesomeIcon icon={faPenToSquare}/><span id="ab">EDIT</span></button>
                    <button onClick={backfunc}><span id="ab">BACK</span></button>
                </div>
        </div>
        </>
    )
}