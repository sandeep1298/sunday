import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../App'
export default function Profile(){
    const [mypics, setPics] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    useEffect(() => {
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    }, []);
    return(
        <>
        <div>
            <div className="container mt-3 pt-4 ">
                <div className="row ">
                    <div className="col-lg-3 col-md-4 col-sm-12 col-12 image-center">
                        <img className=" img-fluid" src="https://images.unsplash.com/photo-1608397717231-4a2883be7ad2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWNsYXJlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile" style={{width:"160px", height:"160px", borderRadius:"80px"}}/>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12 col-12 mt-3 name-center">
                        <h3 className="pt-3 pl-3 font-weight-bold">{state?state.name:"loading"}</h3>
                        <h3 className="pt-3 pl-3 font-weight-bold">{state?state.email:"loading"}</h3>
                        <h5 className="pt-2"> {mypics.length} posts <span>  {state?state.followers.length:"0"} followers</span>  <span>  {state?state.following.length:"0"} following</span></h5>
                    </div>
                </div>
                <hr className="border-dark"/>
                <div className="gallery">
                {
                    mypics.map(item =>{
                        return(
                            <img key={item._id} className=" img-fluid item" src={item.photo} alt={item.title} />
                        );
                    })
                }
                </div>
            </div>
        </div>
        </>
    );
}