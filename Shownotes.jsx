import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./shownotes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash,faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
export const Shownotes=()=>{
    const navi=useNavigate();
    const [data,setdata]=useState([]);
    const func=async()=>{
        try{
            const respo=await fetch("http://localhost:4002/allnote",{
                method:"GET",
                headers:{"Authorization":localStorage.getItem("token")}
            });
            //console.log(respo);
            const x=await respo.json();
            setdata(x);
            //console.log(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func();
    },[])
    const funcback=()=>{
        navi("/home");
    }
    const del=(id)=>{
        Swal.fire({
            text:"Are You Sure??",
            icon:"question",
            showCancelButton:true,
            showConfirmButton:true,
            cancelButtonText:"No",
            confirmButtonText:"Yes",
            background:"white"
        }).then((x)=>{
            if(x.isConfirmed){
                delfunc(id);
            }
        })
    }
    const delfunc=async(id)=>{
        try{
            const respo=await fetch("http://localhost:4002/deletenote",{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:id})
            });
            const x=await respo.json();
            if(respo.status==200){
                Swal.fire({
                    text:x.msg,
                    icon:"success",
                    background:"white"
                })
                func();
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
    const editfunc=(id)=>{
        navi(`/editnote/${id}`);
    }
    if(data.length!=0){
    return(
        <>
        <h1><center><u>ALL NOTES</u></center></h1>
        {
            data.map((cur,index)=>{
                return(
                    <div className="note2" key={index}>
                    <div className="a">
                    <span><b>TITLE</b></span>
                    <input
                    name="Title"
                    type="text"
                    value={cur.Title}
                    />
                    </div>
                    <div className="b">
                    <span><b>TEXT</b></span>
                    <input
                    name="Text"
                    type="text"
                    value={cur.Text}
                    />
                    </div>
                    <div className="icon">
                    <FontAwesomeIcon icon={faPenToSquare} id="delet" onClick={()=>{editfunc(cur._id)}} /><span id="d1"><b>EDIT</b></span>
                    <FontAwesomeIcon icon={faTrash} id="delet" onClick={()=>{del(cur._id)}}/><span id="d1"><b>DELETE</b></span>
                    </div>
                </div>
                )
            })
        }
        <div className="sayani">
            <center><button onClick={funcback} id="x"><span>BACK</span></button></center>
        </div>
        </>
    )}
    else{
        return(
            <>
            <h1>EMPTY NOTES PLEASE ADD NOTE KINDLY</h1>
            <div className="sayani">
            <center><button onClick={funcback} id="x"><span>BACK</span></button></center>
            </div>
            </>
        )
    }
}