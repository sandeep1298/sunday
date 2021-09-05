import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from '../App'

export default function Navbar(){
    const {state,dispatch} =useContext(UserContext)
    const history = useHistory()
    const renderList =()=>{
        if(state){
            return[
                <li className="nav-item">
                <NavLink to="/profile" className="nav-link waves-effect waves-light" >
                    Profile
                </NavLink>
                </li>,
                <li className="nav-item">
                <NavLink to="/createpost" className="nav-link waves-effect waves-light" >
                    Create Posts
                </NavLink>
                </li>,
                <li className="nav-item">
                <NavLink to="/myfollowingpost" className="nav-link waves-effect waves-light" >
                    My Following Posts and likes
                </NavLink>
                </li>,
                <li className="nav-item">
                <button type="submit" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }} className="btn btn-amber btn-md">Logout</button>
                </li>
               
            ]
        }else{
            return [
                <li className="nav-item">
                <NavLink to="/login" className="nav-link waves-effect waves-light">
                    Login
                </NavLink>
                </li>,
                <li className="nav-item">
                <NavLink to="/signup" className="nav-link waves-effect waves-light">
                    Signup
                </NavLink>
                </li>
            ]
        }
    }
    return(
    <>
    <nav className="mb-1 navbar navbar-expand-lg sticky-top navbar-dark pink-color">
    <NavLink className="navbar-brand" to={state?"/":"/login"}><h2 className=" instagram">Instagram</h2></NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
    
    <ul className="navbar-nav ml-auto nav-flex-icons">
        {renderList()}
    </ul>
    </div>
    </nav>

    </>
    );
}