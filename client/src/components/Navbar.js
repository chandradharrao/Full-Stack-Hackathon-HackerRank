import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <div>
            <p><Link to="/registrationform">Registration Form</Link></p>
            <p><Link to="/menu">Menu Chart</Link></p>
        </div>
    )
}

export default Navbar;