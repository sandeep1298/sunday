import { createContext, useContext, useEffect, useReducer } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import './App.css';
import Createpost from './components/Createpost';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Signup from './components/Signup';
import SubscribedUserPosts from './components/SubscribedUserPosts';
import UserProfile from './components/UserProfile';
import {initialState, reducer} from './reducers/userReducer';

export const UserContext = createContext()

const Routing =()=>{
  const history = useHistory()
 const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    }else{
      history.push('/login')
    }
  }, []);
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/createpost" component={Createpost}/>
      <Route exact path="/profile/:userid" component={UserProfile}/>
      <Route exact path="/myfollowingpost" component={SubscribedUserPosts}/>
    </Switch>
  )
}
function App() {
 const [state,dispatch]= useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <div className="App">
    <Navbar/>
    <Routing/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
