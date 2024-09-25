import pic from "../image/im.jpg";
import "./home.css";
import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
export const Home=()=>{
    const [name,setname]=useState("");
    const navi=useNavigate();
    const func=async()=>{
        try{
            const respo=await fetch("http://localhost:4002/getname",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            })
            if(respo.status==200){
                const x=await respo.json();
                setname(x.User_name);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func()
    },[])
    const func1=()=>{
        navi("/addnote");
    }
    const func2=()=>{
        navi("/allnotes");
    }
    const func4=()=>{
        Swal.fire({
            text:"Are You Want To Logout??",
            icon:"question",
            background:"white",
            showCancelButton:true,
            showConfirmButton:true,
            cancelButtonText:"No",
            confirmButtonText:"Yes"
        }).then((x)=>{
            if(x.isConfirmed){
                localStorage.removeItem("token");
                navi("/");
            }
        })
    }
    const func5=()=>{
        navi("/personalinfo");
    }
    const func3=()=>{
        navi("/searchnote");
    }
    return(
        <>
        <h1><b>Hii {name} Welcome To Noteworld</b></h1>
        <div className="bod">
            <div className="p">
                <img src={pic}/>
            </div>
            <div className="listi">
                <h2 onClick={func1}><b>ADD NOTE</b></h2>
                <h2 onClick={func2}><b>ALL NOTES</b></h2>
                <h2 onClick={func3}><b>SEARCH NOTE</b></h2>
                <h2 onClick={func5}><b>PERSONAL INFO</b></h2>
                <h2 onClick={func4}><b>LOGOUT</b></h2>
            </div>
        </div>
        </>
    )
}