import {useState} from 'react';
import "./Profile.css"

function Profile(){
    const [state] = useState(JSON.parse(localStorage.getItem("user")))
    return(
        <div className = "profile-container">
            <div className="profile-wrapper">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className = "profile-img">
                            <img src = {state.imgURL} alt="profile pic" ></img>
                        </div>
                    </div>
                    <div className="profile-content">
                        <h1 id="profile-name">{state.name}</h1>
                        <div className="profile-data">
                            <h4>Organization: {state.orgName}</h4>
                            <h4>Registration Date : {state.regDate}</h4>
                            <h4>Employee ID: {state.empID}</h4>
                            <h4>Registration ID : {state.regID}</h4>
                            <h4>Email: {state.email}</h4>
                            <h4>Mobile numer: {state.mobNo}</h4>
                        </div>
                    </div>
                </div>
                <div className="recent-card">
                    <h1 id="profile-name">Recent Orders</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile;