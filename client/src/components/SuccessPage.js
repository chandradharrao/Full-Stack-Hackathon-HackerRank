import {useParams,Link} from 'react-router-dom';

function SuccessPage(){
    let params = useParams();
    let id = params.id;
    let empid = params.empid;

    /*useEffect(()=>{
        setTimeout(() => {
            history.push("/client/src/components/SignIn.js");
        }, 5000);
    },[])*/

    //let URL = 'end point to get user data given id of user' + id;
    return(
        <div>
            <div className="container">
            <h2 className="header">Successful Registration</h2>
            <div className="card horizontal"></div>
                <div class="card-stacked">
                    <div class="card-content">
                        <ul class="collection with-header">
                            <li className="collection-item">Your Username : {id}</li>
                            <li className="collection-item">Your Password : {empid}</li>
                        </ul>
                        <Link to="/signin" class="waves-effect waves-light btn">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage;
