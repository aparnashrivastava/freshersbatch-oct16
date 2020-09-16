import React, { useState,useEffect } from "react";
import FlightDataService from "../../services/flight.service";
import authService from "../../services/auth.service";
import bookService from "../../services/book.service";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




const UserBooking = () => {
  
 
  const [status,setStatus] = useState([]);
  
  const classes = useStyles();
 
  useEffect(() => {
    getDetails();
  }, []);


  const getDetails = () => {
    var data = {
      userName: authService.getCurrentUser().username,
    };

    bookService.getBookingByUserName(data)
      .then(response => {
        setStatus(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Flight Name</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Destination</TableCell>
            <TableCell align="right">Arrival Time</TableCell>
            <TableCell align="right">Departure Time</TableCell>
            <TableCell align="right">Fare</TableCell>
            <TableCell align="right">Seat No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status.map((row) => (
            <TableRow key={row.bookingId}>
              <TableCell component="th" scope="row">
                {row.bookingId}
              </TableCell>
              <TableCell align="right">{row.userName}</TableCell>
              <TableCell align="right">{row.flightName}</TableCell>
              <TableCell align="right">{row.src}</TableCell>
              <TableCell align="right">{row.dest}</TableCell>
              <TableCell align="right">{row.arrivalTime}</TableCell>
              <TableCell align="right">{row.deptTime}</TableCell>
              <TableCell align="right">{row.fare}</TableCell>
              <TableCell align="right">{row.seatNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserBooking;