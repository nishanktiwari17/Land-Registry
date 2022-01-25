import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
	const navStyle = {
		color: 'white',
		linkStyle: 'none',
		textDecoration: 'none'
	};
	const imgStyle = {
	    height: 20,
		width: 20,
		paddingRight: 0
	}
	const headingStyle = {
		padding: 0,
		margin: 0,
		paddingRight: 0
	}
	return (
		<nav>
		<img src="../logo.svg" alt="" style={imgStyle} />
			<ul className="nav-links">
			<li><h3 style={headingStyle}>Land Registry</h3></li>
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
