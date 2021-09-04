import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useHistory } from 'react-router-dom';

toast.configure()
export default function Signup(){
    const history = useHistory()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    //for posting data//
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid email address",{position:toast.POSITION.TOP_CENTER});
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })

        }).then(res=>res.json())
        .then(data =>{
             if(data.error){
                 toast.error(data.error,{position:toast.POSITION.TOP_CENTER});
            }
             else{
                 toast.success(data.message,{position:toast.POSITION.TOP_CENTER});
                 history.push('/login')
             } 
        }).catch(err=>{
            console.log(err)
        })
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <>
        <div className="container mt-5 pt-5 flex-center">
            <div className="card">
                <h1 className="text-center card-header text-white secondary-color instagram">Instagram</h1>
                <div className="card-body">
                    <form onSubmit={handlesubmit}>
                        <div className="md-form">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="md-form">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="md-form">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" onClick={()=>PostData()} className="btn btn-skyblue text-white">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <NavLink to="/login" className="font-weight-bold text-dark"><span className="text-default">Click Here</span> if already have an Account</NavLink>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}