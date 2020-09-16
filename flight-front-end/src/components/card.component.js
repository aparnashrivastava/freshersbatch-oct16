import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        height:400,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  }));

export default function SimpleCard() {
  const classes = useStyles1();
 

  return (
      <div>
      <h2 align="center">Salient Features</h2>
    <Grid container spacing={3}>
    
    <Grid item xs={4} sm={4}>
    <Paper className={classes.paper}>
    
        <h2 align="left">User-Friendly Online Flight Booking System</h2>
        <br></br>
     <hr></hr> 
     <br/><br/>
        <p>Convinient search for airline tickets and easy booking</p>
    </Paper>
</Grid>
    <Grid item xs={4} sm={4}>
    <Paper className={classes.paper}>
    
    <h2 align="left">Easy Payment Methods</h2>
    <br/><br/> &nbsp;
     <hr></hr> 
     <br/><br/>
        <p>
         Payment Options Applicable to many credit cards like VISA, MASTERCARD etc
        </p>
    </Paper>
  </Grid>

  <Grid item xs={4} sm={4}>
    <Paper className={classes.paper}>
    
    <h2 align="left">Security Of Your Credentials And Easy Login</h2>
    <br></br>
     <hr></hr> 
     <br/><br/>
        <p>
         The passwords that you provide to our system are hashed, so that others cant get access to your accounts
        </p>
        <p>
            You can easily login via google and get access to our services easily
        </p>
    </Paper>
  </Grid>
  
  </Grid>
  </div>
  );
}