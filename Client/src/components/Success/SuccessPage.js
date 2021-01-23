import {useParams} from 'react-router-dom';

function SuccessPage(){
    let params = useParams();
    let id = params.id;

    //let URL = 'end point to get user data given id of user' + id;
    return(
        <div className="container" id="success-container">
            <div className="card" id="success-card">
                <div className="card-header" id="success-header">
                    <img src = "https://res.cloudinary.com/chandracloudinarystorage123/image/upload/v1611199154/success_hl3vkb.png" alt="success"></img>
                </div>
                <div className="card-content" id="success-content">
                    <h3>Success!!</h3>
                    <h4>Thank you for Registering!!</h4>
                    <h4 className="reg-id">Registration ID : {id}</h4>
                    <h4>Please considering placing an order through our app!!</h4>
                </div>
                <div className="card-footer">
                    <img src="https://res.cloudinary.com/chandracloudinarystorage123/image/upload/v1611200881/lunch-box_jtwr0t.png" alt="tasty food"></img>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage;
