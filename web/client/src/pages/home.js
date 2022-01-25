import React from 'react';
import {Button, Hidden} from '@material-ui/core';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    textAlign: 'center',
    marginTop: '15px',
    background: 'rgb(73, 79, 82) !important',
    color: 'white'
  },
  newButton: {
    display: 'hidden'
  },
  saveButton: {
    marginRight: '10px!important',
    width: '100px'
  },
  card: {
    marginTop: '20px',
    borderStyle: 'none',
    borderColor: 'blue',
    // border: 'none',
    // boxShadow: 'none',
   
  },
}));

function Home() {
    const classes = useStyles();
    const [currentAccount, setCurrentAccount] = useState(null);
    const [connected, setConnected] = useState(false);
    const checkWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          console.log("Make sure you have Metamask installed!");
          return;
        } else {
          console.log("Wallet exists! We're ready to go!")
        }
    
        const accounts = await ethereum.request({ method: 'eth_accounts' });
    
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account: ", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }

    const handleClick = () => {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Please install Metamask!");
        }
    
        try {
          const accounts = ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Found an account! Address: ", accounts[0]);
          setCurrentAccount(accounts[0]);
          setConnected(true);
        } catch (err) {
          console.log(err)
        }};

        useEffect(() => {
            checkWalletIsConnected();
            //handleClick();
          }, [connected])

    return (
        <div>
              <h1 color='primary'> Welcome to Decentralized Land Registry System </h1> 
          { connected ? <Button className={classes.newButton}></Button> : <Button onClick={handleClick} className={classes.button} variant="contained" >Connect Metamask</Button> }
        </div>
    )
}

export default Home;
