import {useParams,useHistory} from 'react-router-dom';
import "./Success.css";

function SuccessPage(){
    let params = useParams();
    let id = params.id;
    let history = useHistory()

    return(
        <div className="card">
            <div className="image-container">
                <img src = "https://res.cloudinary.com/chandracloudinarystorage123/image/upload/v1611199154/success_hl3vkb.png" alt="success" style={{height:"128px",width:"128px"}}></img>
            </div>
            <h1 className="title">Success</h1> 
            <h3 className="reg-msg">Thank you for Registering</h3>
            <h3 className="reg-msg">Unique Registration ID <span className="reg-id">{id}</span></h3>
            <h3 className="reg-msg">Hurry Up!</h3>
            <input type="button" className="btn" value="Place Order" onClick={()=>history.push("/menu")}></input>
        </div>
    )
}

export default SuccessPage;
