import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/home';
import Admin from './pages/admin';
import SuperAdmin from './pages/superAdmin';
import User from './pages/user';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/superAdmin" element={<SuperAdmin />} />
					<Route path="/user" element={<User />} />
				</Routes>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			</div>
		</Router>
	);
}

export default App;
