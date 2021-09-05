import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink,useHistory } from 'react-router-dom';
import {UserContext} from '../App'

toast.configure()
export default function Login(){
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid email address",{position:toast.POSITION.TOP_CENTER});
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })

        }).then(res=>res.json())
        .then(data =>{
            console.log(data)
             if(data.error){
                 toast.error(data.error,{position:toast.POSITION.TOP_CENTER});
            }
             else{
                 localStorage.setItem("jwt", data.token)
                 localStorage.setItem("user", JSON.stringify(data.user))
                 dispatch({type:"USER", payload:data.user})
                 toast.success("Loggedin Successfully",{position:toast.POSITION.TOP_CENTER});
                 history.push('/')
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
                <h1 className="text-center card-header text-white secondary-color  instagram">Instagrams and kilograms</h1>
                <div className="card-body">
                    <form onSubmit={handlesubmit}>
                        <div className="md-form">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="md-form">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" onClick={PostData} className="btn btn-skyblue text-white">LOGIN</button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <NavLink to="/signup" className="font-weight-bold text-dark">Don't have an account <span className="text-default">Click here to Register</span></NavLink>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
