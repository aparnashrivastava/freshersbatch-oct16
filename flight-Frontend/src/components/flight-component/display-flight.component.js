import React, { useState, useEffect } from "react";
import FlightDataService from "../../services/flight.service";
import { Link } from "react-router-dom";

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  
  

  useEffect(() => {
    retrieveFlights();
  }, []);

  
  const retrieveFlights = () => {
    FlightDataService.getAllFlights()
      .then(response => {
        setFlights(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

 

  

 

  return (
    <div className="col-md-6">
        <h4>List Of Flights</h4>

        <ul className="list-group">
          {flights &&
            flights.map((flight) => (
              <li
                className={
                  "list-group-item " 
                }
                
              >
                {flight.flightName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {flight.src}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {flight.dest}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {flight.arrivalTime}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {flight.deptTime}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link
              to={"/flight/" + flight.flightName}
              className="btn btn-success" 
            >
              Edit Flight 
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link
              to={"/del-flight/" + flight.flightName}
              className="btn btn-danger" 
            >
              Delete Flight 
            </Link>
              </li>
            ))}
        </ul>
      </div>
  );
};

export default FlightList;