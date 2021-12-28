import { Navbar } from 'responsive-navbar-react';
import 'responsive-navbar-react/dist/index.css';

function Nav() {
	const props = {
		items: [
			{
				text: 'Home',
				link: '/',
			},
			{
				text: 'Super Admin',
				link: '/superAdmin',
			},
			{
				text: 'Admin',
				link: '/admin',
			},
			{
				text: 'User',
				link: '/user',
			},
		],
		logo: {
			text: 'Land Registry',
		},
		style: {
			barStyles: {
				background: 'rgb(73, 79, 82)',
			},
			sidebarStyles: {
				background: '#222',
				buttonColor: 'white',
			},
		},
	};
	return (
		<div className="home">
			<Navbar {...props} />
		</div>
	);
}
export default Nav;
