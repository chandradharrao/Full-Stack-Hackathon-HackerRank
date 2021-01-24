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
                            <img src = {state.imgURL} alt="profile pic" style={{height:"100%",width:"100%"}} ></img>
                        </div>
                    </div>
                    <div className="profile-content">
                        <h1 id="profile-name">{state.name}</h1>
                        <div className="profile-data">
                            <h4>Organization: <span className="detail">{state.orgName}</span></h4>
                            <h4>Registration Date: <span className="detail">{state.regDate}</span></h4>
                            <h4>Employee ID: <span className="detail">{state.empID}</span></h4>
                            <h4>Registration ID : <span className="detail">{state.regID}</span></h4>
                            <h4>Email: <span className="detail">{state.email}</span></h4>
                            <h4>Mobile numer: <span className="detail">{state.mobNo}</span></h4>
                        </div>
                    </div>
                </div>
                <div className="recent-card">
                    <h1 id="profile-name">Recent Orders</h1>
                    <h1 id="coming-soon">Coming Soon!!</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile;