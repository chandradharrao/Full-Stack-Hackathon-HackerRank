import {useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserDetailsContext} from "../../../App"
import { toast } from 'react-toastify';
import "./Signin.css"
import axios from "axios";
//import 'react-toastify/dist/ReactToastify.css'
toast.configure();

function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [load,setLoad] = useState("");
    const [rem,setRem] = useState(localStorage.getItem("rememberMe") === null?false:JSON.parse(localStorage.getItem("rememberMe")).bool);
    const history = useHistory();
    //destructure the state and dispatch function from context provider's value
    const {state,dispatch} = useContext(UserDetailsContext);

    function onChangeHandler(event) {
        if(event.target.name === "username"){
            setUsername(event.target.value);
        }else if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
    }

    //func to remeber me
    function rememebrMeFunc(e){
        setRem(e.target.checked);
        console.log(e.target.checked);
        localStorage.setItem("rememberMe",JSON.stringify({bool:e.target.checked}))
    }

    function onClickHandler(event){
        //prevent default action of reloading
        event.preventDefault()
        //debugger;
        //make a post request to server sign in
        /*const reqOptions = { 
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}, 
            credentials: 'include',
            method: 'POST', 
            body: JSON.stringify({
            username,
            password,
            rememberMe : rem
        })
    }*/
        const reqOptions = {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                username,
                password
            })
        };
        console.log("Trying to fetch...")
        //debugger;
        fetch("/login",reqOptions).then(res=>{return res.json()}).then((data)=>{
            console.log("Made fetch req and recieved res")
            //debugger;
            //loading
            setLoad(<div className="progress">
                        <div className="indeterminate"></div>
                    </div>)
            console.log(data);
            if(data.success){
                //make a toast with success massage
                toast.success(data.message);

                //store token and user info present in response in local storage
                localStorage.setItem("jwt",data.token);
                console.log(data.user);
                localStorage.setItem("user",JSON.stringify(data.user));
                console.log("Successfull login.....")

                //only dispatch is allowed to change state by dispatching action
                //store user data in redux state
                dispatch({type:"SET_USER_DETAILS",payload:data.user})
                
                //navigate user to menu
                setTimeout(()=>{
                    history.push('/menu');
                },1000)
            }else{
                setLoad(null);
                //make toast with failure message
                toast.error(data.message);
                console.log(data.error + " : " + data.message);
            }
        });
    }

    return(
        <div className="container-login">
            {load}
            <div className="loginWrapper">
                <div className='form-content-left'>
                    <img className='form-img' src='/cafeLogo.jpg' alt="logo"/>
                </div>
                <div className="form-content-right">
                    <form>
                        <h1 className="login">Login</h1>
                        <div className="input-field">
                            <input type="text" value ={username} onChange={(event)=>{onChangeHandler(event)}} name="username" placeholder="Employee ID"/>
                        </div>
                        <div className="input-field">
                            <input type="password" value={password} onChange={(event)=>{onChangeHandler(event)}} name="password" placeholder="Password"/>
                        </div>
                        <div className="input-field">
                            <button className="submit" onClick={(event)=>onClickHandler(event)}>SignIn</button>
                        </div>
                        <br/>
                        
                        <span className="remember">Remember Me</span> <br/>
                        <input className="flipswitch" type="checkbox" checked={rem} onChange={(e)=>rememebrMeFunc(e)}/>
                        <br/> <br/>
                        <Link className="already" to="/signup">Dont have an account?</Link>
                       
                    </form>
                </div>
            </div>
        </div> 
    )
}

export default SignIn;


/*
,'Authorization': `Bearer ${localStorage.getItem("jwt")}`
*/

/*
1610385286469
1235
*/