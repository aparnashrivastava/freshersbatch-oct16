import React, { useState, useEffect } from "react";
import FlightDataService from "../../services/flight.service";
import { Link } from "react-router-dom";
import makeAnimated from 'react-select/animated';
import Seatss from "./Seats";
import Select from 'react-select';
import bookService from "../../services/book.service";
import authService from "../../services/auth.service";
import seatService from "../../services/seat.service";
import { Grid } from "@material-ui/core";

const BookASeat = props => {
  const initialFlightState = {
    flightName: "",
	  dateOfJourney:""
  };
  const animatedComponents = makeAnimated();
  var seatData;
  var SeatNos=[{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},
               {value:5,label:5},{value:6,label:6},{value:7,label:7},{value:8,label:8},
               {value:9,label:9},{value:10,label:10},{value:11,label:11},{value:12,label:12},
               {value:13,label:13},{value:14,label:14},{value:15,label:15},{value:16,label:16},
               {value:17,label:17},{value:18,label:18},{value:19,label:19},{value:20,label:20},
               {value:21,label:21},{value:22,label:22},{value:23,label:23},{value:24,label:24},
               {value:25,label:25}];
  
  const [currentFlight, setCurrentFlight] = useState(initialFlightState);
  const flight=props.match.params.flightName;
  const date =props.match.params.dateOfJourney;
  const [selectedValue,setValue]=useState('');
  
  const handleSelect=(e)=>{
    setValue(e);
  }

  const getFlight = flightName => {
    FlightDataService.getAFlight(flightName)
      .then(response => {
        setCurrentFlight(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlight(props.match.params.flightName);
  }, [props.match.params.flightName]);

  
  const checkBookingStatus=()=>{
    if(selectedValue===null){
      window.alert("Please select a seat and then proceed for booking");
      return; 
    }

    for(var i=0;i<selectedValue.length;i++){
      var selectedId=selectedValue[i].value; 
        seatData={
          flightName:currentFlight.flightName,
          dateOfJourney:date,
          id:selectedValue[i].value
        }
      seatService.checkSeatStatus(seatData).then(response=>{
        if(response.data==="Reserved"){
          window.alert("Sorry, This particular seat is already booked...Refer to seat status and select another seat");
          return;
        }else{
          seatService.reserveSeat(seatData);
          var bookingId=currentFlight.fare+currentFlight.src+currentFlight.dest+selectedId;
          var data={
            bookingId:currentFlight.fare+currentFlight.src+currentFlight.dest+selectedId,
            userName:authService.getCurrentUser().username,
            flightName:currentFlight.flightName,
            src:currentFlight.src,
            dest:currentFlight.dest,
            arrivalTime:currentFlight.arrivalTime,
            deptTime:currentFlight.deptTime,
            fare:currentFlight.fare,
            seatNo:selectedId
          }
          console.log(data);
          bookService.createBooking(data).then(response=>{
            localStorage.setItem("booking", JSON.stringify(response.data));
          });
          props.history.push(`/make-payment/${bookingId}`);
          window.location.reload();
        }
      })
    }
}
return (
    <div>
      <h2>Your Flight Details</h2>
      <Grid container spacing={3}>
         
          <Grid item xs={3}>
          <label htmlFor="flightName">Flight Name</label>
          <input
            type="text"
            id="flightName"
            required
            value={currentFlight.flightName}
            name="flightName"
          />
          </Grid>
        
          <Grid item xs={3}>
          <label htmlFor="src">Source</label>
          <input
            type="text"
            id="src"
            required
            value={currentFlight.src}
            name="src"
          />
          </Grid>
        

         <Grid item xs={6}>
         <label htmlFor="dest">Destination</label>
         <input
          type="text"
          id="dest"
          required
          value={currentFlight.dest}
          name="dest"
        />
        </Grid >

        <Grid item xs={3}>
        <label htmlFor="arrivalTime">Arrival Time</label>
        <input
        type="text"
        id="arrivalTime"
        required
        value={currentFlight.arrivalTime}
        name="arrivalTime"
        />
        </Grid>

        <Grid item xs={3}>
        <label htmlFor="deptTime">Departure Time</label>
        <input
          type="text"
          id="deptTime"
          required
          value={currentFlight.deptTime}
          name="deptTime"
        />
        </Grid>
        
        <Grid item xs={3}>
        <label htmlFor="fare">Fare</label>
        <input
          type="text"
          id="fare"
          required
          value={currentFlight.fare}
          name="fare"
        />
        </Grid>

        <Grid item xs={3}>
        <label htmlFor="dateOfJourney">Date Of Journey</label>
        <input
          type="text"
          id="dateOfJourney"
          required
          value={date}
          name="dateOfJourney"
        />
        </Grid>  
         
        <Grid item xs={6}>
        <label>Select Your Seats</label>
        <Select
          value={SeatNos.find(obj => obj.value === selectedValue)}
          onChange={handleSelect} 
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={SeatNos}
        />
        </Grid>
      </Grid>

      <h3>Check Seat Status</h3>
        
        <Seatss flightName={flight} dateOfJourney={date}/> 
        <br/><br/>
        <Link
          onClick={checkBookingStatus}
          className="btn btn-success"
        >
        Book Your Seats
        </Link>
  </div>
);



  
};

export default BookASeat;






















