import "./addnote.css";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
export const Addnote=()=>{
    const navi=useNavigate();
    const [email,setemail]=useState("");
    const func=async ()=>{
        try{
            const respo=await fetch("http://localhost:4002/getname",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            })
            if(respo.status==200){
                const x=await respo.json();
                setemail(x.Email);
                console.log(x.Email);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func()
    },[]);
    const [data,setdata]=useState({
        Title:"",
        Text:""
    });
    const func1=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const func2=async(e)=>{
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4002/addnote",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({Email:email,Title:data.Title,Text:data.Text})
            });
            console.log(respo);
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
                setdata({
                    Title:"",
                    Text:""
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
        <div className="note2">
            <div className="c">
                <span><b>EMAIL</b></span>
                <input
                name="Email"
                value={email}
                />
            </div>
            <div className="a">
                <span><b>TITLE</b></span>
                <input
                name="Title"
                type="text"
                placeholder="Enter The Title"
                value={data.Title}
                onChange={func1}
                />
            </div>
            <div className="b">
                <span><b>TEXT</b></span>
                <input
                name="Text"
                type="text"
                placeholder="Enter The Text"
                value={data.Text}
                onChange={func1}
                />                
            </div>
        </div>
        <div className="sayani"><center>
            <button onClick={func2}><span id="ab">ADD</span></button>
            <button onClick={()=>{navi("/home")}}><span id="ab">BACK</span></button></center>
        </div>
        </>
    )
}