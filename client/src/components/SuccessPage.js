import {useParams,Link,useHistory} from 'react-router-dom';
import {useState,useEffect} from 'react';

function SuccessPage(){
    const [successEle,setSuccessEle] = useState(null);
    const history = useHistory();
    let params = useParams();
    let id = params.id;
    let empid = params.empid;

    /*useEffect(()=>{
        setTimeout(() => {
            history.push("/client/src/components/SignIn.js");
        }, 5000);
    },[])*/

    //let URL = 'end point to get user data given id of user' + id;
    const theEle = <div className="container">
        <h2 className="header">Successful Registration</h2>
        <div className="card horizontal"></div>
        <div class="card-stacked">
            <div class="card-content">
                <ul class="collection with-header">
                    <li className="collection-item">Your Username : {id}</li>
                    <li className="collection-item">Your Password : {empid}</li>
                    <Link to="/signin" class="waves-effect waves-light btn">Sign In</Link>
                </ul>
            </div>
        </div>
    </div>
    setSuccessEle(theEle);
    return(
        <div>
            {successEle}
        </div>
    )
}

export default SuccessPage;
