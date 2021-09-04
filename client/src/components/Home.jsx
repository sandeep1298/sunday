import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from '../App'
export default function Home(){
    const [data, setData] = useState([]);
    const {state,dispatch} = useContext(UserContext)
    useEffect(() => {
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result =>{
           setData(result.posts)
       })
      
    }, []);

    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result =>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
            
        }).catch(err =>{
            console.log(err)
        })
    }

    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result =>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err =>{
            console.log(err)
        })
    }

    const makeComment =(text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
        .then(result =>{
            const newData = data.map(item=>{
                if(item._id === result._id){
                    return result
                }else{
                    return item
                }
                
            })
            setData(newData)
        }).catch(err =>{
            console.log(err)
        })
    }
    const deletePost =(postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result =>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
    return(
        <>
        <div className="container mt-5 pt-4 flex-center d-flex flex-column">
        {
            data.map(item =>{
                return(
                    <div className="card mt-5" key={item._id}>
                    <h4 className="card-header font-weight-bold text-center bg-warning-blue text-capitalize"><NavLink to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</NavLink>{item.postedBy._id === state._id
                    && <i className="far fa-trash-alt float-right hovericons" onClick={()=>deletePost(item._id)}></i>
                    }  </h4>
                    <div className="card-body">
                        <img src={item.photo} width="100%" height="100%" alt="pictures"/>
                        <div className="mt-3">
                            <i className="fas fa-heart fa-2x text-danger"></i>
                            {item.likes.includes(state._id)
                                ?
                                <i className="far fa-thumbs-down fa-2x pl-2 hovericons" onClick={()=>{unlikePost(item._id)}}></i>
                                :
                                <i className="far fa-thumbs-up fa-2x pl-2 hovericons" onClick={()=>{likePost(item._id)}}></i>
                            }
                            
                            
                            
                            <h5>{item.likes.length} likes</h5>
                            <h5>{item.title}</h5>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record =>{
                                    return(
                                        <h5 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h5>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value,item._id)
                            }}>
                            <div className="md-form">
                            <input type="text" placeholder="Add a Comment" className="form-control"/>
                        </div>
                        {/*<div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-6 col-6">
                                <div className="md-form">
                                <input type="text" placeholder="Add a Comments" className="form-control"/>
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-6 col-6">
                                <i className="fas fa-plus" onClick={(e)=>makeComment(e.target[0].value,item._id)}></i>
                            </div>
                    </div>*/}
                            </form>
                        </div>
                    </div>
                </div>
                );
            })
        }
            
            {/*<div className="card mt-3">
                <h4 className="card-header">Sandeep</h4>
                <div className="card-body">
                    <img src="https://images.unsplash.com/photo-1621798744342-f170329d259c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" width="100%" height="100%" alt="bird"/>
                    <div className="mt-3">
                        <i className="fas fa-heart fa-2x text-danger"></i>
                        <h5>Title</h5>
                        <p>This is amazing post</p>
                        <div className="md-form">
                        <input type="text" placeholder="Add a Comment" className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mt-3">
                <h4 className="card-header">Sandeep</h4>
                <div className="card-body">
                    <img src="https://images.unsplash.com/photo-1621798744342-f170329d259c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" width="100%" height="100%" alt="bird"/>
                    <div className="mt-3">
                        <i className="fas fa-heart fa-2x text-danger"></i>
                        <h5>Title</h5>
                        <p>This is amazing post</p>
                        <div className="md-form">
                        <input type="text" placeholder="Add a Comments" className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mt-3">
                <h4 className="card-header">Sandeep</h4>
                <div className="card-body">
                    <img src="https://images.unsplash.com/photo-1621798744342-f170329d259c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" width="100%" height="100%" alt="bird"/>
                    <div className="mt-3">
                        <i className="fas fa-heart fa-2x text-danger"></i>
                        <h5>Title</h5>
                        <p>This is amazing post</p>
                        <div className="md-form">
                        <input type="text" placeholder="Add a Comments" className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>*/}
        </div>
        </>
    );
}
