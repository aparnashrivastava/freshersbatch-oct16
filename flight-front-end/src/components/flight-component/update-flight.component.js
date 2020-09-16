import React, { useState, useEffect } from "react";
import FlightDataService from "../../services/flight.service";
import { Link } from "react-router-dom";
const Flight = props => {
  const initialFlightState = {
  flightName: "",
	src:"",
	dest:"",
	arrivalTime:"",
	deptTime:"",
	fare: 0

  };
 
  const [currentFlight, setCurrentFlight] = useState(initialFlightState);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const getFlight = flightName => {
    FlightDataService.getAFlight(flightName)
      .then(response => {
        setCurrentFlight(response.data);

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFlight(props.match.params.flightName);
  }, [props.match.params.flightName]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentFlight({ ...currentFlight, [name]: value });
  };

  

  const updateFlight = () => {
    var data = {
      flightName: currentFlight.flightName,
      src: currentFlight.src,
      dest: currentFlight.dest,
      arrivalTime: currentFlight.arrivalTime,
      deptTime: currentFlight.deptTime,
      fare:currentFlight.fare
    };

    
    FlightDataService.modifyFlight(data)
      .then(response => {
        setCurrentFlight({
          flightName: response.data.flightName,
          src: response.data.src,
          dest: response.data.dest,
          arrivalTime: response.data.arrivalTime,
          deptTime: response.data.deptTime,
          fare: response.data.fare
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
 

 
  return (
    <div>
      {currentFlight ? (
        <div className="edit-form">
          {submitted ? (
        <div>
          <h4>You updated successfully!</h4>
          <Link  to={"/admin"}className="btn btn-success" >
            Back to Admin Home Page
          </Link>
        </div>
      ) : (
<div>
          <h4>Flight Details</h4>
          <form>

          <div className="form-group">
            <label htmlFor="flightName">Flight Name</label>
            <input
              type="text"
              className="form-control"
              id="flightName"
              required
              value={currentFlight.flightName}
              onChange={handleInputChange}
              name="flightName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="src">Source</label>
            <input
              type="text"
              className="form-control"
              id="src"
              required
              value={currentFlight.src}
              onChange={handleInputChange}
              name="src"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dest">Destination</label>
            <input
              type="text"
              className="form-control"
              id="dest"
              required
              value={currentFlight.dest}
              onChange={handleInputChange}
              name="dest"
            />
          </div>

          <div className="form-group">
            <label htmlFor="arrivalTime">Arrival Time</label>
            <input
              type="text"
              className="form-control"
              id="arrivalTime"
              required
              value={currentFlight.arrivalTime}
              onChange={handleInputChange}
              name="arrivalTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deptTime">Departure Time</label>
            <input
              type="text"
              className="form-control"
              id="deptTime"
              required
              value={currentFlight.deptTime}
              onChange={handleInputChange}
              name="deptTime"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fare">Fare</label>
            <input
              type="text"
              className="form-control"
              id="fare"
              required
              value={currentFlight.fare}
              onChange={handleInputChange}
              name="fare"
            />
          </div>

          </form>


          <button
            type="submit"
            className="btn btn-success"
            onClick={updateFlight}
          >
            Update
          </button>
          <p>{message}</p>
          
        
        </div>
      )}
        </div>
      
      ) : (
        <div>
          <br />
          
        </div>
      )}
    </div>
  );



  
};

export default Flight;






















// import React, { useState } from "react";

// import FlightDataService from "../../services/flight.service";

// const AddFlight = () => {
  
//   const initialFlightState = {
    
//flightName: "",
// 	src:"",
// 	des//   t:"",
// 	arrivalTime:"",
// 	deptTime:"",
// 	fare: 0

// };
//   const [flight, setFlight] = useState(initialFlightState);
//   const [submitted, setSubmitted] = useState(false);

//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setFlight({ ...flight, [name]: value });
//   };

//   const updateFlight = () => {
//     var data = {
//       flightName: flight.flightName,
//       src: flight.src,
//       dest: flight.dest,
//       arrivalTime: flight.arrivalTime,
//       deptTime: flight.deptTime,
//       fare:flight.fare
//     };

//     FlightDataService.modifyFlight(data)
//       .then(response => {
//         setFlight({
//           flightName: response.data.flightName,
//           src: response.data.src,
//           dest: response.data.dest,
//           arrivalTime: response.data.arrivalTime,
//           deptTime: response.data.deptTime,
//           fare: response.data.fare
//         });
//         setSubmitted(true);
//         console.log(response.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   const newFlight = () => {
//     setFlight(initialFlightState);
//     setSubmitted(false);
//   };

//   return (
//     <div className="submit-form">
//       {submitted ? (
//         <div>
//           <h4>You updated the flight successfully!</h4>
//           <button className="btn btn-success" onClick={newFlight}>
//             Add Flight
//           </button>
//         </div>
//       ) : (
//         <div>

//           <div className="form-group">
//             <label htmlFor="flightName">Flight Name You Wish To Update</label>
//             <input
//               type="text"
//               className="form-control"
//               id="flightName"
//               required
//               value={flight.flightName}
//               onChange={handleInputChange}
//               name="flightName"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="src">Source</label>
//             <input
//               type="text"
//               className="form-control"
//               id="src"
//               required
//               value={flight.src}
//               onChange={handleInputChange}
//               name="src"
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="dest">Destination</label>
//             <input
//               type="text"
//               className="form-control"
//               id="dest"
//               required
//               value={flight.dest}
//               onChange={handleInputChange}
//               name="dest"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="arrivalTime">Arrival Time</label>
//             <input
//               type="text"
//               className="form-control"
//               id="arrivalTime"
//               required
//               value={flight.arrivalTime}
//               onChange={handleInputChange}
//               name="arrivalTime"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="deptTime">Departure Time</label>
//             <input
//               type="text"
//               className="form-control"
//               id="deptTime"
//               required
//               value={flight.deptTime}
//               onChange={handleInputChange}
//               name="deptTime"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="fare">Fare</label>
//             <input
//               type="text"
//               className="form-control"
//               id="fare"
//               required
//               value={flight.fare}
//               onChange={handleInputChange}
//               name="fare"
//             />
//           </div>


//           <button onClick={updateFlight} className="btn btn-success">
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddFlight;