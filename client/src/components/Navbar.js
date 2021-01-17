import {Link} from 'react-router-dom'
import {useContext} from 'react';
import { UserDetailsContext } from '../App';

function Navbar(){
  //grab the dispatch and state from the context
  const {state,dispatch} = useContext(UserDetailsContext);

  //the Links that need to be dispalyed acc to user data on localstorage
  function renderLinks(){
    if(state != null){
      //if he is signed in
      return [
        <li key="1"><Link to="/menu">Menu</Link></li>,
        <li key="2" onClick={()=>{dispatch({type:"DEL_USER_DETAILS"})}}><Link to="/signin">Logout</Link></li>
      ]
    }else{
      //if not signed in
      return [
        <li key="1"><Link to="/signin">Sign In</Link></li>,
        <li key="2"><Link to="/signup">Register</Link></li>
      ]
    }
  }

  return(
    <nav>
      <div className="nav-wrapper red darken-3">
        <div className="navbar">
            <Link to={state===null?"/signin":"/menu"} className="brand-logo">Office Cafe</Link>
            <ul className="right">
              {renderLinks()}
            </ul>
        </div>
      </div>
    </nav>
    )
}

export default Navbar;
