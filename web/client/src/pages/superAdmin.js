import React from 'react';
import {
	Box,
	Container,
	Grid,
	TextField,
	Card,
	Button,
	MenuItem,
	CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import contract from 'contract/contract_data.json';
import Web3 from 'web3';

const abi = contract.contract_abi;
const address = contract.contract_address;

// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// const con = new web3.eth.Contract(abi, address);

const useStyles = makeStyles(() => ({
	button: {
		textAlign: 'center',
		marginTop: '15px',
		background: 'rgb(73, 79, 82) !important',
		color: 'white',
	},
	saveButton: {
		marginRight: '10px!important',
		width: '100px',
	},
	card: {
		marginTop: '20px',
	},
}));

function SuperAdmin() {
	const classes = useStyles();
	const [district, setDistrict] = useState('');
	const [currentAccount, setCurrentAccount] = useState(null);
	const [publicAddress, setPublicAddress] = useState('');
	const [name, setName] = useState('');
	const checkWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log('Make sure you have Metamask installed!');
			return;
		} else {
			console.log("Wallet exists! We're ready to go!");
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account: ', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
	};

	const handleClick = () => {
		const { ethereum } = window;

		if (!ethereum) {
			alert('Please install Metamask!');
		}

		try {
			const accounts = ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log('Found an account! Address: ', accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (event) => {
		setDistrict(event.target.value);
	};

	const createAdmin = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);
		if (address && name && district) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.createModifyAdmin(address, name, district)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Admin Created/Modified Successfully');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('New Admin: Invalid Admin Data');
		}
	};

	useEffect(() => {
		checkWalletIsConnected();
		//handleClick();
	}, []);

	return (
		<div>
			<h1>Super Admin</h1>
			<Button
				onClick={handleClick}
				className={classes.button}
				variant="contained"
			>
				Connect Metamask
			</Button>
			<div style={{ margin: 0, padding: 0 }}>
				<title>Create Modify</title>
				<Box
					sx={{
						backgroundColor: 'background.default',
						minHeight: '100%',
						py: 3,
					}}
				>
					<Container pl={4} pr={4} maxWidth={false}>
						<h2 style={{ textAlign: 'left' }}>
							Create/Modify Admin
						</h2>
						<Card>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Account Address"
											variant="outlined"
											onChange={(evt) => {
												setPublicAddress(
													evt.target.value
												);
											}}
										/>
									</Grid>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											value={name}
											label="Name"
											variant="outlined"
											onChange={(evt) => {
												setName(evt.target.value);
												console.log(name);
											}}
										/>
									</Grid>
									<Grid item xs>
										<TextField
											fullWidth
											required
											select
											id="district"
											name="district"
											label="District"
											variant="outlined"
											value={district}
											onChange={handleChange}
										>
											{[
												'Thane',
												'Raigad',
												'Pune',
												'Mumbai',
											].map((option) => (
												<MenuItem
													key={option}
													value={option}
												>
													{option}
												</MenuItem>
											))}
										</TextField>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
						<Button
							variant="contained"
							className={classes.button}
							onClick={createAdmin}
						>
							Submit
						</Button>
					</Container>
				</Box>
			</div>
		</div>
	);
}

export default SuperAdmin;
