import {useContext} from 'react';
import { UserDetailsContext } from '../App';
import '../App.css';

function Profile(){
    const {state,dispatch} = useContext(UserDetailsContext);
    
    return(
        <div className = "container">
            <div className="card">
                <div class = "card-header">
                    <img src = {state.imgURL} alt="profile pic"></img>
                </div>
                <div className="card-content">
                    <h3>Welcome {state.name}!</h3>
                    <h4>Organization Name : {state.orgName}</h4>
                    <h4>Registration Date : {state.regDate}</h4>
                    <h4>Employee ID : {state.empID}</h4>
                    <h4>Registration ID : {state.regID}</h4>
                    <h4>Email : {state.email}</h4>
                    <h4>Mobile Number : {state.mobNo}</h4>
                </div>
            </div>
        </div>
    )
}

export default Profile;