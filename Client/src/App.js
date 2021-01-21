import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Routing from './components/Routing';
//import the reducer function and the state
import {UserDetailsState,UserDetailsReducer} from "./reducers/userDetailsReducer"
import {createContext,useReducer} from 'react';
import { json } from 'body-parser';
//import Cookies from "js-cookie";

//create context(returns an obj with 2 values : consumer and provider)
//context will provide consumers access to state and dispatch function
export const UserDetailsContext = createContext()

function App() {
  //grab the dispatch method and curr state to be passed on as value to consumers
  const [state,dispatch] = useReducer(UserDetailsReducer,UserDetailsState);

  //check closing of tab
  window.addEventListener("beforeunload",(event)=>{
    event.preventDefault();
    //check for cookie of rememeber me
    //const remCookie = Cookies.get("rememeberMe");
    const remCookie = JSON.parse(localStorage.getItem("rememberMe")).bool;
    if(!remCookie){
      //clear the userDetails state and local storage
      dispatch({type:"DEL_USER_DETAILS"});
    }
  })

  return (
    <UserDetailsContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserDetailsContext.Provider>
  );
}

export default App;
