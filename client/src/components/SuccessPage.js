import {useParams,Link} from 'react-router-dom';
import {useState} from 'react';

function SuccessPage(){
    const [successEle,setSuccessEle] = useState(null);
    let params = useParams();
    let id = params.id;
    let empid = params.empid;
    //let URL = 'end point to get user data given id of user' + id;
    const theEle = <div className="container">
        <h2 className="header">Successful Registration</h2>
        <div className="card horizontal"></div>
        <div class="card-stacked">
            <div class="card-content">
                <ul class="collection with-header">
                    <li className="collection-item">Username : {id}</li>
                    <li className="collection-item">Password : {empid}</li>
                    <Link to="/menu" class="waves-effect waves-light btn">Menu</Link>
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
