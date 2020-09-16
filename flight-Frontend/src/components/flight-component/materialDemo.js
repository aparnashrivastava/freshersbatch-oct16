import React, { useState,useEffect} from "react";
import FlightDataService from "../../services/flight.service";
import MaterialTable from 'material-table';


export default function MaterialTableDemo()  {
    const [flights, setFlights] = useState([]);
    var result=[];
useEffect(() => {
    retrieveFlights();
  }, []);
const retrieveFlights = () => {
    FlightDataService.getAllFlights()
      .then(response => {
        setFlights(response.data);
        //console.log(response.data);
        
            //console.log(result);  
      })
      .catch(e => {
        console.log(e);
      });
  };


  const [state,setState]=useState({
    columns:[
        { title: 'Flight Name', field: 'flightName' },
        { title: 'Source', field: 'src' },
        { title: 'Destination', field: 'dest' },
        { title: 'Arrival Time', field: 'arrivalTime' },
        { title: 'Departure Time', field: 'deptTime' },
        { title: 'Fare', field: 'fare' },
    ],

    data:flights
    
})

return (
    <MaterialTable
      title="Flight Details"
      columns={state.columns}
      data={flights}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                FlightDataService.createFlight(newData);
                data.push(newData);
                
                window.location.reload();
                return { ...prevState, data };
                
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                 
                  console.log(newData);
                  data[data.indexOf(oldData)] = newData;
                  FlightDataService.modifyFlight(newData);
                 
                 
                 
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                FlightDataService.removeFlight(oldData);
                window.location.reload();
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );

}


