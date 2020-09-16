import  { useState, useEffect } from "react";
import seatService from "../../services/seat.service";
import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }
}));

const Seatss = props => {
  
  const classes = useStyles1();
  const [status, setStatus] = useState([]);
  
  useEffect(() => {
    retrieveSeats();
  }, []);

  const retrieveSeats = () => {
    seatService.checkASeat(props.flightName,props.dateOfJourney).then(response =>{
      setStatus(response.data);
    })
}

  return (
      
    <div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {status &&
          status.map((stat) => (
          <Grid item xs={1}>
          <Paper className={classes.paper}>{stat.id}<br/>{stat.isReserved}</Paper>
        </Grid>
      
          ))}
        
        </Grid>
      </div>
    </div>
    );
  }
export default Seatss;














