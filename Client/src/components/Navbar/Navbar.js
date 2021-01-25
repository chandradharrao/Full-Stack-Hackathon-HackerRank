import {Link} from 'react-router-dom'
import {useContext} from 'react';
import { UserDetailsContext } from '../../App';
import "./Navbar.css"

function Navbar(){
  //grab the dispatch and state from the context
  const {state,dispatch} = useContext(UserDetailsContext);

  //the Links that need to be dispalyed acc to user data on localstorage
  function renderLinks(){
    if(state != null){
      //if he is signed in
      return [
        <li className='nav-item'key="1"><Link className='nav-links' to="/menu">What's Cooking Today?</Link></li>,
        <li className='nav-item'key="3"><Link className='nav-links' to="/profile">Profile</Link></li>,
        <li className='nav-item'key="2" onClick={()=>{dispatch({type:"DEL_USER_DETAILS"})}}><Link className='nav-links' to="/signin">Logout</Link></li>
      ]
    }else{
      //if not signed in
      return [
        <li className='nav-item'key="1"><Link className='nav-links' to="/signin">Sign In</Link></li>,
        <li className='nav-item'key="2"><Link className='nav-links' to="/signup">Register</Link></li>
      ]
    }
  }

  return(
    <nav className="navbar">
        <div className="navbar-container">
            <Link className="navbar-logo" to={state===null?"/signin":"/menu"}><i class="fas fa-mug-hot"></i> Office Cafe</Link>
            <ul className='nav-menu'>
              {renderLinks()}
            </ul>
        </div>
    </nav>
    )
}

export default Navbar;
