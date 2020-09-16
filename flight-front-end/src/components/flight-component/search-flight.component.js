import React, { useState } from "react";
import TableRow from '@material-ui/core/TableRow';
import FlightDataService from "../../services/flight.service";
import seatService from "../../services/seat.service";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import {Link} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    width:3000
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const AddFlight = () => {
  
    const [flights, setFlights] = useState([]);
    const classes = useStyles();
    const [searchSrc, setSearchSrc] = useState("");
    const [searchDest, setSearchDest] = useState("");
    const [dateOfJourney,setDate]=useState("")
    const onChangeSearchSrc = e => {
        const searchSrc = e.target.value;
        setSearchSrc(searchSrc);
      };

      const onChangeSearchDest = e => {
        const searchDest = e.target.value;
        setSearchDest(searchDest);
      };

      const onChangeDate = e => {
        const dateOfJourney = e.target.value;
        setDate(dateOfJourney);
      };
     

  const searchFlight = () => {
    
    FlightDataService.findBySrcAndDest(searchSrc,searchDest)
      .then(response => {
        setFlights(response.data);
        console.log("flights are")
        console.log(flights);
    
        
      })
      .catch(err => {
        console.log(err);
      });
  };

 const handleLinkClick=(flightName,dateOfJourney)=>{
   seatService.checkStatus(flightName,dateOfJourney)

 }

  return (
    <div>
    <div className="form-inline">
      
        <div className="form-group">

          <div className="form-group" >
            
            <TextField
            variant="outlined"
            label="Enter Source"
              type="text"
              className="form-control"
              id="src"
              required
              value={searchSrc}
              onChange={onChangeSearchSrc}
              name="src"
            />
          </div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="form-group">
            
            <TextField
            variant="outlined"
            label="Enter Destination"
              type="text"
              className="form-control"
              id="dest"
              required
              value={searchDest}
              onChange={onChangeSearchDest}
              name="dest"
            />
          </div>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="form-group">
            
            <TextField
            variant="outlined"
              label="Date Of Journey"
              type="text"
              className="form-control"
              id="dateOfJourney"
              required
              value={dateOfJourney}
              onChange={onChangeDate}
              name="dateOfJourney"
            />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={searchFlight} className="btn btn-primary">
            Search Available Flights
          </button>
</div>
</div>
<br/><br/><br/><br/>

          <div className="col-md-6">
        <h4>List Of Available Flights</h4>

        <TableContainer size="medium" width="2000px">
      <Table  aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>FlightName</StyledTableCell>
            <StyledTableCell align="right">Source</StyledTableCell>
            <StyledTableCell align="right">Destination</StyledTableCell>
            <StyledTableCell align="right">Arrival Time</StyledTableCell>
            <StyledTableCell align="right">Departure Time</StyledTableCell>
            <StyledTableCell align="right">Fare</StyledTableCell>
            <StyledTableCell align="right">Book your Flight</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight) => (
            <StyledTableRow key={flight.flightName}>
              <TableCell component="th" scope="row">
                {flight.flightName}
              </TableCell>
              <StyledTableCell align="right">{flight.src}</StyledTableCell>
              <StyledTableCell align="right">{flight.dest}</StyledTableCell>
              <StyledTableCell align="right">{flight.arrivalTime}</StyledTableCell>
              <StyledTableCell align="right">{flight.deptTime}</StyledTableCell>
              <StyledTableCell align="right">{flight.fare}</StyledTableCell>
              <Link
              to={"/book-flight/"+flight.flightName+"/dateOfJourney/"+dateOfJourney} onClick={handleLinkClick(flight.flightName,dateOfJourney)}
              className="btn btn-success" 
              
            >
              Book Flight 
            </Link>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
     </div>  
  );
};

export default AddFlight;


