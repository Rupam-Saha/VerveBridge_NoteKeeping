import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const Editinfo=()=>{
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
    const chanfunc=(e)=>{
        let nm=e.target.name;
        let val=e.target.value;

        setdata({
            ...data,
            [nm]:val
        })
    }
    const submitfun=async(e)=>{
        e.preventDefault();
        try{
            const respo=await fetch("http://localhost:4002/editinfo",{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"Email":data.Email,"User_name":data.User_name,"Contact":data.Contact,"token":localStorage.getItem("token")})
            })
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                });
                func();
                localStorage.removeItem("token");
                localStorage.setItem("token",x.token);
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
        <div className="regi3">
                <div className="name">
                    <p><b>USER NAME</b></p>
                    <input
                    type="text"
                    name="User_name"
                    value={data.User_name}
                    onChange={chanfunc}
                    />
                </div>
                <div className="ema">
                    <p><b>EMAIL</b></p>
                    <input
                    type="email"
                    name="Email"
                    value={data.Email}
                    onChange={chanfunc}
                    />
                </div>
                <div className="con">
                    <p><b>CONTACT</b></p>
                    <input
                    type="text"
                    name="Contact"
                    value={data.Contact}
                    onChange={chanfunc}
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
                    <button onClick={submitfun}><span id="ab">UPDATE</span></button>
                    <button onClick={()=>{navi("/personalinfo")}}><span id="ab">BACK</span></button>
                </div>
        </div>
        </>
    )
}