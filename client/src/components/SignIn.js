import {useState} from 'react';
import {Link} from 'react-router-dom'

function SignIn(){

    return(
        <div>
            <div>
                <h2>Login</h2>
                <input type="text" value ={} onChange={} name="username"/>
                <input type="text" value={} onChange={} name="password"/>
                <input type="button" value="SignIn" onClick={}/>
                <Link to="/registrationform">Dont have an account?</Link>
            </div>
        </div>
    )
}