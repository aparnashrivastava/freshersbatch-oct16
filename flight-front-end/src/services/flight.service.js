import http from "../services/http-common";

 const getAllFlights = () => {
   return http.get("/flight/get-all-flights");
 };

const getAFlight = flightName => {
   return http.get(`/flight/${flightName}`);
 };

const createFlight = data => {
  return http.post("/flight/add-flight", data);
};

const modifyFlight = data => {
  console.log(http.put("/flight/update-flight", data));
  return http.put("/flight/update-flight", data);
};

const removeFlight = data => {
  console.log(http.post("/flight/delete-flight",data));
  return http.post("/flight/delete-flight",data);
};

// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };

const findBySrcAndDest = (src,dest) => {
  console.log(http.get(`/flight/get-all-flights-by-src-and-dest/src/${src}/dest/${dest}`));
  return http.get(`/flight/get-all-flights-by-src-and-dest/src/${src}/dest/${dest}`);
};

export default {
  getAllFlights,
  createFlight,
  modifyFlight,
  removeFlight,
  findBySrcAndDest,
  getAFlight
};