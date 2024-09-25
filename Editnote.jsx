import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
export const Editnote=()=>{
    const [data,setdata]=useState({
        Text:"",
        Title:""
    });
    const navi=useNavigate();
    const id=useParams("id");
    const func=async()=>{
        try{
            const respo=await fetch(`http://localhost:4002/getnote/${id.id}`,{
                method:"GET"
            });
            //console.log(respo);
            const x=await respo.json();
            setdata(x);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        func()
    },[]);
    const changfun=(e)=>{
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
            const respo=await fetch("http://localhost:4002/editnote",{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"id":id.id,"Text":data.Text,"Title":data.Title})
            }) 
            console.log(respo);
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
    return (
        <>
        <div className="note2">
                <div className="a">
                    <p><b>TITLE</b></p>
                    <input
                    type="text"
                    name="Title"
                    value={data.Title}
                    onChange={changfun}
                    />
                </div>
                <div className="b">
                    <p><b>TEXT</b></p>
                    <input
                    type="text"
                    name="Text"
                    value={data.Text}
                    onChange={changfun}
                    />
                </div>
                <div className="sayani">
                    <button onClick={submitfun}><span id="ab">UPDATE</span></button>
                    <button onClick={()=>{navi("/allnotes")}}><span id="ab">BACK</span></button>
                </div>
        </div>
        </>
    )
}