import http from "../services/http-common";

 
const checkASeat = (flightName,dateOfJourney) => {
   
  return http.get(`/seat/seat-find/flightName/${flightName}/dateOfJourney/${dateOfJourney}`);
}
const checkStatus=(flightName,dateOfJourney)=>{
  return http.get(`/seat/seat-status/flightName/${flightName}/dateOfJourney/${dateOfJourney}`);
   
}

const checkSeatStatus=(data)=>{
  return http.post("/seat/seat-status-check",data);
}

const reserveSeat=(data)=>{
return http.put(`/seat/seat-reserve`,data);
}

export default {
    checkASeat,
    checkStatus,
    checkSeatStatus,
    reserveSeat
};