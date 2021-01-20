import {useParams,Link,useHistory} from 'react-router-dom';
import {useEffect} from 'react';

function SuccessPage(){
    let params = useParams();
    let id = params.id;
    let history = useHistory();

    useEffect(()=>{
        setTimeout(() => {
            history.push("/menu");
        }, 5000);
    },[])

    //let URL = 'end point to get user data given id of user' + id;
    return(
        <div>
            <div className="container">
            <h2 className="header">Successful Registration</h2>
            <img src = ".../..public/idCard.png" alt="success"></img>
            <div className="card horizontal"></div>
                <div className="card-stacked">
                    <div className="card-content">
                        <h5 className="reg-id">Registration ID : {id}</h5>
                        <p>Redirecting to menu ....</p>
                        <Link to="/signin" className="waves-effect waves-light btn">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage;
