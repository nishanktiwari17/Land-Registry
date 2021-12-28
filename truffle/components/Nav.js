import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function Nav() {

    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }
    return (
        <div className="div">
        <nav> 
            <h3>Land Registry</h3>
            <ul className="nav-links"> 
               <Link style={navStyle} to='/'> <li className="li-style">Home</li></Link> 
               <Link style={navStyle} to='/superAdmin'> <li className="li-style">Super Admin</li> </Link>
                <Link style={navStyle} to='/admin'><li className="li-style">Admin</li> </Link>
                <Link style={navStyle} to='/user'> <li className="li-style">User</li> </Link>
            </ul>
        </nav>
        </div>
    )
}

export default Nav;
