import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass,faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
export const Searchnote=()=>{
    const navi=useNavigate();
    const [title,settitle]=useState("");
    const [data,setdata]=useState([]);
    const chanfunc=(e)=>{
        settitle(e.target.value);
    }
    const submitfun=async(e)=>{
        try{
            const respo=await fetch("http://localhost:4002/search",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"Title":title,token:localStorage.getItem("token")})
            })
            const x=await respo.json();
            if(respo.status==200){
                setdata(x);
            }
            else{
                console.log(x.msg);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const funcback1=()=>{
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
                setdata([]);
                //settitle("");
                navi("/searchnote");
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
    if(data.length==0){
    return(
        <>
        <div className="bn">
        <div className="dip">
            <input
            type="text"
            placeholder="Enter The title"
            name="Title"
            id="ser"
            value={title}
            onChange={chanfunc}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} id="fg" onClick={submitfun}/>
        </div>
        {
            (title.length==0)?
            <center><h2 id="sas">No Note Present</h2></center>:
            <center><h2>No Note Present</h2></center>
        }
        <div className="sayani">
            <center><button onClick={funcback1} id="x"><span>BACK</span></button></center>
        </div>
        </div>
        </>)}
    else{
        return(
        <>
        <div className="dip">
            <input
            type="text"
            placeholder="Enter The title"
            name="Title"
            id="ser"
            value={title}
            onChange={chanfunc}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} id="fg" onClick={submitfun}/>
        </div>
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
                    <FontAwesomeIcon icon={faPenToSquare} id="delet" onClick={()=>{editfunc(cur._id)}}/><span id="d1"><b>EDIT</b></span>
                    <FontAwesomeIcon icon={faTrash} id="delet" onClick={()=>{del(cur._id)}}/><span id="d1"><b>DELETE</b></span>
                    </div>
                </div>
                )
            })
        }
        <div className="sayani">
            <center><button onClick={funcback1} id="x"><span>BACK</span></button></center>
        </div>
        </>
    )}
}
