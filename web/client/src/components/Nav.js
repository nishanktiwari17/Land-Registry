import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
	const navStyle = {
		color: 'white',
		linkStyle: 'none',
	};
	return (
		<nav>
			<h3>Land Registry</h3>
			<ul className="nav-links">
				<Link to="/" style={navStyle}>
					<li>Home</li>
				</Link>
				<Link to="/superAdmin" style={navStyle}>
					<li>Super Admin</li>
				</Link>
				<Link to="/admin" style={navStyle}>
					<li>Admin</li>
				</Link>
				<Link to="/user" style={navStyle}>
					<li>User</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Nav;
