import {useState} from 'react';
import {Link,useHistory} from 'react-router-dom'

function SignIn(){
    const [username, setUsername] = useState("Enter Username");
    const [password, setPassword] = useState("Enter password");
    const history = useHistory();

    function onChangeHandler(event) {
        if(event.target.name === "username"){
            setUsername(event.target.value);
        }else if(event.target.name === 'password'){
            setPassword(event.target.value);
        }
    }

    function onClickHandler(){
        //make a post request to server sign in
        const reqOptions = {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                username,
                password
            })
        };
        fetch("/sigin",reqOptions).then(res=>res.json()).then((data)=>{
            if(data.success){
                //make a toast with success massage
                //store token and user info present in response in local storage
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                //navigate user to menu
                history.push('/menu');
            }else{
                //make toast with failure message
                console.log(data.error + " : " + data.message);
            }
        });
    }

    return(
        <div>
            <div>
                <div className="container">
                    <h2>Login</h2>
                    <form>
                        <div className="input-field">
                            <input type="text" value ={username} onChange={(event)=>{onChangeHandler(event)}} name="username"/>
                        </div>
                        <div className="input-field">
                            <input type="password" value={password} onChange={(event)=>{onChangeHandler(event)}} name="password"/>
                        </div>
                        <div className="input-field">
                            <button className="btn" onClick={onClickHandler}>SignIn</button>
                        </div>
                        <Link to="/registrationform">Dont have an account?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;