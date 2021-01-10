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
