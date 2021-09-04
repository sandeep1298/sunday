import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'

export default function UserProfile(){
    const [userProfile, setProfile] = useState(null)
   
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
        useEffect(() => {
         fetch(`/user/${userid}`,{
             headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             }
        }).then(res=>res.json())
         .then(result=>{
            setProfile(result)
         })
     }, []);

     const followUser=()=>{
         fetch('/follow',{
             method:"put",
             headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 followId:userid
             })
         }).then(res=>res.json())
         .then(data =>{
            
             dispatch({type:"UPDATE", payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user", JSON.stringify(data))
             setProfile((prevState)=>{
                 return{
                 ...prevState,
                 user:{
                     ...prevState.user,
                     followers:[...prevState.user.followers,data._id]
                    }
                 }
             })
             setShowFollow(false)
         })
     }

     const unfollowUser=()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data =>{
            
            dispatch({type:"UPDATE", payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item => item !== data._id)
                return{
                ...prevState,
                user:{
                    ...prevState.user,
                    followers:newFollower
                   }
                }
            })
            setShowFollow(true)
        })
    }
    return(
        <>
        {userProfile ? 
            <div>
            <div className="container mt-3 pt-4 ">
                <div className="row ">
                    <div className="col-lg-3 col-md-4 col-sm-12 col-12 image-center">
                        <img className=" img-fluid" src="https://images.unsplash.com/photo-1608397717231-4a2883be7ad2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWNsYXJlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile" style={{width:"160px", height:"160px", borderRadius:"80px"}}/>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12 col-12 mt-3 name-center">
                        <h3 className="pt-3 pl-3 font-weight-bold">{userProfile.user.name}</h3>
                        <h3 className="pt-3 pl-3 font-weight-bold">{userProfile.user.email}</h3>
                        <h5 className="pt-2"> {userProfile.posts.length} posts <span>  {userProfile.user.followers.length} followers</span>  <span>  {userProfile.user.following.length} following</span></h5>
                        {showfollow?
                            <button className="btn btn-blue text-white "  onClick={()=>followUser()}>Follow</button>
                            :
                            <button className="btn btn-blue text-white "  onClick={()=>unfollowUser()}>UnFollow</button>
                        }
                   
                   
                   
                    </div>
                    
                </div>
                <hr className="border-dark"/>
                <div className="gallery">
                {
                    userProfile.posts.map(item =>{
                        return(
                            <img key={item._id} className=" img-fluid item" src={item.photo} alt={item.title} />
                        );
                    })
                }
                </div>
            </div>
        </div>
            
            :   <div className="flex-center mt-5 pt-5">
                <div className="spinner-border text-secondary " role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>}
       
        </>
    );
}