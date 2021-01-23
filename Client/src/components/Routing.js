import {useEffect,useContext} from 'react';
import {Route,Switch,useHistory} from 'react-router-dom';
import Menu from './Menu/Menu';
import SuccessPage from './Success/SuccessPage'
import Payment from "./Checkout/Payment";
import {UserDetailsContext} from "../App"
import SignIn from './Auth/Login/SignIn';
import RegForm from './Auth/Registration/RegForm';
import Profile from './Profile/Profile';

//render component based on the nav link
function Routing(){
    //grab dispatch and state from context provider
    const {state,dispatch} = useContext(UserDetailsContext);
    const history = useHistory();

    //on mounting of component check if user data already is availabe in localstorage
    useEffect(() => {
        //grab user data from localstorage
        let userDetails = null;
        if(localStorage.getItem("user") === "undefined"){
            userDetails = null;
        }else{
           userDetails = JSON.parse(localStorage.getItem("user"));
        }
        //update redux state
        dispatch({type:"SET_USER_DETAILS",payload:userDetails})

        //based on the userData obtained from localstorage
        if(userDetails === null){
        //redirect to sign in page
        history.push('/signin')
        }
        else{
        //redirect to menu
        history.push('/menu')
        }
    }, [])

    return(
        <Switch>
            <Route path = "/signin" component={SignIn}/>
            <Route path = '/signup' component={RegForm}/>
            <Route path = '/successpage/:id/:empid' component={SuccessPage}/>
            <Route path = "/menu" component={Menu}/>
            <Route path = "/payment/:totalprice" component={Payment}/>
            <Route path = "/profile" component={Profile}/>
        </Switch>
    )
}

export default Routing