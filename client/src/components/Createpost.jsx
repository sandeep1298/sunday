import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

toast.configure()
export default function Createpost(){
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if(url){

        
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                photo:url
            })

        }).then(res=>res.json())
        .then(data =>{
             if(data.error){
                 toast.error(data.error,{position:toast.POSITION.TOP_CENTER});
            }
             else{
                 toast.success("Post Created Successfully",{position:toast.POSITION.TOP_CENTER});
                 history.push('/')
             } 
        }).catch(err=>{
            console.log(err)
        })
        }
    }, [url])

    const postDetails =()=>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","sandeep-insta")
        data.append("cloud_name","sandeep1298")
        fetch("https://api.cloudinary.com/v1_1/sandeep1298/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data =>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
       
    const handlesubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <>
        <div className="container mt-5 pt-3 flex-center">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handlesubmit}>
                        <div className="md-form">
                            <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required/>
                        </div>
                        <div className="md-form">
                            <input type="text" className="form-control" value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Body" required/>
                        </div>
                        <div className="md-form">
                                <input type="file" className=" form-control"  onChange={(e)=>setImage(e.target.files[0])} required/>
                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" onClick={()=>postDetails()} className="btn btn-indigo font-weight-bold">POST</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}