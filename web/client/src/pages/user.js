import React from 'react';
import { useState, useEffect } from 'react';
import {
	Button,
	Grid,
	Container,
	Box,
	Card,
	CardContent,
	TextField,
	MenuItem,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import contract from 'contract/contract_data.json';
import validator from 'aadhaar-validator';

const abi = contract.contract_abi;
const address = contract.contract_address;

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
		borderStyle: 'none',
		borderColor: 'blue',
		// border: 'none',
		// boxShadow: 'none',
	},
}));

function User() {
	const classes = useStyles();
	const [district, setDistrict] = useState('');
	const [dochash, setdochash] = useState('');
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [area, setArea] = useState('');
	const [purchaseEpoch, setpurchaseEpoch] = useState('');
	const [survey, setSurvey] = useState('');
	const [price, setPrice] = useState('');
	const [avail, setAvail] = useState(false);
	const [currentAccount, setCurrentAccount] = useState(null);
	const [error, setError] = useState(false);

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

	const newUser = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);
		const valid = validator.isValidNumber(dochash);
		if (valid) {
			if (name && district && dochash) {
				web3.eth.getAccounts().then(function (accounts) {
					const acc = accounts[0];

					con.methods
						.regUser(name, dochash, district)
						.send({
							from: acc,
						})
						.then(function (result) {
							toast.success('User Registered Successfully.');
						})
						.catch(function (err) {
							console.log(err);
						});
				});
			} else {
				toast.error('New User: Invalid User Data');
			}
		} else {
			toast.error('New User: Invalid Aadhaar Number');
		}
	};

	const newLand = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (survey && location && area > 0 && purchaseEpoch > 0 && district) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.regLand(survey, location, area, purchaseEpoch, district)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Land Registered Successfully.');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('New Land: Invalid Land Data');
		}
	};

	const availCheckTrue = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (survey) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.makeAvailable(survey)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Land Availability staus - True');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Land Availability: Invalid Land Data');
		}
	};

	const availCheckFalse = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (survey) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];
				con.methods
					.cancelAvailable(survey)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Land Availability staus - False');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Land Availability: Invalid Land Data');
		}
	};

	const buyRequest = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (survey && price > 0) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.requestToBuy(survey, price)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Land Buy Request Successfull.');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Land Buy: Invalid Land Data');
		}
	};

	const approveSell = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (survey) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.approveSell(survey)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Land Approve Sell Request Successfull.');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Land Approve Sell: Invalid Land Data');
		}
	};

	const confirmSell = () => {
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (survey) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.confirmSell(survey)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Land Confirm Sell Request Successfull.');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Land Confirm Sell: Invalid Land Data');
		}
	};

	useEffect(() => {
		checkWalletIsConnected();
		//handleClick();
	}, []);

	return (
		<div>
			<h1>User</h1>
			<Button
				onClick={handleClick}
				className={classes.button}
				variant="contained"
			>
				Connect Metamask
			</Button>
			<div style={{ margin: 0, padding: 60, paddingTop: 0 }}>
				<Box
					sx={{
						paddingTop: 0,
						backgroundColor: 'background.default',
						minHeight: '100%',
						py: 3,
					}}
				>
					<Container pl={4} pr={4} maxWidth={false}>
						<h2 style={{ textAlign: 'left' }}>New User</h2>
						<Card className={classes.card}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Full Name"
											variant="outlined"
											onChange={(e) => {
												setName(e.target.value);
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
											onChange={handleChange}
											value={district}
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
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Aadhar number"
											variant="outlined"
											onChange={(e) => {
												setdochash(e.target.value);
											}}
										/>
									</Grid>
								</Grid>
								<Button
									variant="contained"
									className={classes.button}
									onClick={newUser}
								>
									Submit
								</Button>
							</CardContent>
						</Card>
						<h2 style={{ textAlign: 'left' }}>New Land</h2>
						<Card className={classes.card}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Survey Number"
											variant="outlined"
											onChange={(e) => {
												setSurvey(e.target.value);
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
											onChange={handleChange}
											value={district}
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
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Location"
											variant="outlined"
											onChange={(e) => {
												setLocation(e.target.value);
											}}
										/>
									</Grid>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Area"
											variant="outlined"
											onChange={(e) => {
												setArea(e.target.value);
											}}
										/>
									</Grid>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Purchase Epoch"
											variant="outlined"
											onChange={(e) => {
												setpurchaseEpoch(
													e.target.value
												);
											}}
										/>
									</Grid>
								</Grid>
								<Button
									variant="contained"
									className={classes.button}
									onClick={newLand}
								>
									Submit
								</Button>
							</CardContent>
						</Card>
						<h2 style={{ textAlign: 'left' }}>
							Set Land Availability Status
						</h2>
						<Card className={classes.card}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Survey Number"
											variant="outlined"
											onChange={(e) => {
												setSurvey(e.target.value);
											}}
										/>
									</Grid>
									<Grid>
										<Button
											variant="contained"
											className={classes.button}
											onClick={availCheckTrue}
										>
											Available
										</Button>
									</Grid>
									<Grid>
										<Button
											variant="contained"
											className={classes.button}
											style={{ marginLeft: '6px' }}
											onClick={availCheckFalse}
										>
											Not Available
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
						<h2 style={{ textAlign: 'left' }}>
							Request to Buy Land
						</h2>
						<Card className={classes.card}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Survey Number"
											variant="outlined"
											onChange={(e) => {
												setSurvey(e.target.value);
											}}
										/>
									</Grid>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Price"
											variant="outlined"
											onChange={(e) => {
												setPrice(e.target.value);
											}}
										/>
									</Grid>

									<Grid>
										<Button
											variant="contained"
											className={classes.button}
											style={{ alignItems: 'left' }}
											onClick={buyRequest}
										>
											Submit
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
						<h2 style={{ textAlign: 'left' }}>
							Approve Sell of land
						</h2>
						<Card className={classes.card}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Survey Number"
											variant="outlined"
											onChange={(e) => {
												setSurvey(e.target.value);
											}}
										/>
									</Grid>
									<Grid>
										<Button
											variant="contained"
											className={classes.button}
											style={{ alignItems: 'left' }}
											onClick={approveSell}
										>
											Submit
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
						<h2 style={{ textAlign: 'left' }}>
							Confirm Sell of land
						</h2>
						<Card className={classes.card}>
							<CardContent>
								<Grid container spacing={2}>
									<Grid item xs>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Survey Number"
											variant="outlined"
											onChange={(e) => {
												setSurvey(e.target.value);
											}}
										/>
									</Grid>
									<Grid>
										<Button
											variant="contained"
											className={classes.button}
											style={{ alignItems: 'left' }}
											onClick={confirmSell}
										>
											Submit
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Container>
				</Box>
			</div>
		</div>
	);
}

export default User;
