import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav>
        <div className="nav-wrapper red darken-3">
          <div className="container">
              <Link to="/signin" className="brand-logo">Office Cafe</Link>
              <ul className="right">
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/signup">Register</Link></li>
                <li><Link to="/menu">Menu</Link></li>
              </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;

/*const [logo,setLogo] = useState(localStorage.getItem("jwt"));
  const [signin,setSignin] = useState(localStorage.getItem("jwt"));
  const [reg,setReg] = useState(localStorage.getItem("jwt"));
  const [home,setHome] = useState(localStorage.getItem("jwt"));
  const [logout,setLogout] = useState(localStorage.getItem(""));

  if(localStorage.getItem("jwt") === null){
    setLogo("/signin");
    setSignin("/signin");
    setReg("/signin");
    setHome("/home")
  }*/
