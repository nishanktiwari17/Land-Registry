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
	ButtonGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import contract from 'contract/contract_data.json';
import Web3 from 'web3';
import { toast } from 'react-toastify';

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
	},
	buttonGroup: {
		textAlign: 'center',
		marginTop: '15px',
		//background: 'primary !important',
		color: 'primary',
	},
}));

function Admin() {
	const classes = useStyles();
	const [district, setDistrict] = useState('');
	const [dochash, setdochash] = useState('');
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [area, setArea] = useState('');
	const [purchaseEpoch, setpurchaseEpoch] = useState('');
	const [survey, setSurvey] = useState('');
	const [isVerified, setIsVerified] = useState(true);
	const [currentAccount, setCurrentAccount] = useState(null);

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

	const verificationUser = () => {
		setIsVerified(true);
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (address && name && district && dochash) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.modifyUser(address, name, dochash, district, isVerified)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('User Verified Successfully.');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Verify User: Invalid User Data');
		}
	};

	const verificationLand = () => {
		setIsVerified(true);
		const ethereum = window.ethereum;
		const web3 = new Web3(ethereum);
		const con = new web3.eth.Contract(abi, address);

		if (survey && location && area > 0 && purchaseEpoch > 0) {
			web3.eth.getAccounts().then(function (accounts) {
				const acc = accounts[0];

				con.methods
					.modifyLand(
						survey,
						location,
						area,
						purchaseEpoch,
						isVerified
					)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success('Land Verified Successfully.');
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Verify Land: Invalid Land Data');
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
					.approveAdmin(survey)
					.send({
						from: acc,
					})
					.then(function (result) {
						toast.success(
							'Admin Land Approve Sell Request Successfull.'
						);
					})
					.catch(function (err) {
						console.log(err);
					});
			});
		} else {
			toast.error('Admin Land Approve Sell: Invalid Land Data');
		}
	};

	useEffect(() => {
		checkWalletIsConnected();
		//handleClick();
	}, []);

	return (
		<div>
			<h1>Admin</h1>
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
						<h2 style={{ textAlign: 'left' }}>Verify User</h2>
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
											label="Aadhar hash"
											variant="outlined"
											onChange={(e) => {
												setdochash(e.target.value);
											}}
										/>
									</Grid>
								</Grid>
								<ButtonGroup>
									<Button
										variant="contained"
										className={classes.button}
										onClick={verificationUser}
									>
										Accept
									</Button>
									<Button
										variant="contained"
										className={classes.buttonGroup}
										style={{ marginLeft: '6px' }}
									>
										Reject
									</Button>
								</ButtonGroup>
							</CardContent>
						</Card>
						<h2 style={{ textAlign: 'left' }}>Verify Land</h2>
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
								<ButtonGroup>
									<Button
										variant="contained"
										className={classes.button}
										onClick={verificationLand}
									>
										Accept
									</Button>
									<Button
										variant="contained"
										className={classes.buttonGroup}
										style={{ marginLeft: '6px' }}
									>
										Reject
									</Button>
								</ButtonGroup>
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
											onClick={() => {
												toast.success('Hello mc');
											}}
											variant="contained"
											className={classes.button}
											onClick={approveSell}
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

export default Admin;
