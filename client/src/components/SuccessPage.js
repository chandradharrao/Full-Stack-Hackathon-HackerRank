import {useParams} from 'react-router-dom';
import {useState} from 'react';
//import axios from 'axios';

function SuccessPage(){
    const [successEle,setSuccessEle] = useState(null);
    let params = useParams();
    let id = params.id;
    //let URL = 'end point to get user data given id of user' + id;
    const theEle = <div>
            <h3>Successfull Registration</h3>
            <p>Your Registration ID is : {id}</p>
        </div>
    setSuccessEle(theEle);
    /*axios.get(URL).then((res)=>{
        //res will contain all user data and date of registration
        //{name:name,email,email,..,regDate:regDate,id:id}
        //let temp = [];
        //const keys = ["Name","Organization name","Employee ID","Mobile Number","Email","Employee Card","Registration Date"];
        //use res.id if we are displaying user data on submission,else no need
    })*/

    return(
        <div>
            {successEle}
        </div>
    )
}

export default SuccessPage;