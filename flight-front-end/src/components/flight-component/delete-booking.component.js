import React, { useState,useEffect } from "react";
import FlightDataService from "../../services/flight.service";
import { Link } from "react-router-dom";
import bookService from "../../services/book.service";
import TextField from '@material-ui/core/TextField';
const DelFlight =props => {
  
  const initialState = {
    bookingId:""
  };
const [currentBooking, setCurrentBooking] = useState(initialState);

const [submitted, setSubmitted] = useState(false);





  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBooking({ ...currentBooking, [name]: value });
  };

  const deleteBooking = () => {
    var data = {
      bookingId: currentBooking.bookingId,
      
    };

    bookService.removeBook(data)
      .then(response => {
        setCurrentBooking({
          bookingId:response.data.bookingId
        });
        setSubmitted(true);
        
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
           <h4>You cancelled your booking successfully...Respective amount will be back in your account soon!!!</h4>
          <Link  to={"/user"}className="btn btn-success" >
            Back to Home Page
          </Link>
        </div>
      ) : (
        <div>

          <div className="form-group">
            
          <TextField
              variant="outlined"
              label="Enter Your Booking Id"
              type="text"
              className="form-control"
              id="bookingId"
              required
              placeholder="Booking Id"
              value={currentBooking.bookingId}
              onChange={handleInputChange}
              name="bookingId"
            />
          </div>

            <br/><br/><br/>

          <button onClick={deleteBooking} className="btn btn-success">
            Cancel Your Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default DelFlight;