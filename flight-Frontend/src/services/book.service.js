import http from "../services/http-common";

 const getAllBookings = () => {
   return http.get("/book/get-all-bookings");
 };


const createBooking = data => {
  return http.post("/book/book-flight", data);
};

const retrieveBooking=(bookingId)=>{
  return http.get(`/book/get-detail/${bookingId}`)
}

const getCurrentBooking=()=> {
    console.log(JSON.parse(localStorage.getItem("bookings")));
    return JSON.parse(localStorage.getItem("bookings"));
  }
  const removeBook = data => {
    console.log(http.post("/book/delete-booking",data));
    return http.post("/book/delete-booking",data);
  };

const getBookingByUserName = data =>{
  return http.post("/book/find-booking-by-user",data);
}

export default {
  getAllBookings,
  createBooking,
  getCurrentBooking,
  retrieveBooking,
  removeBook,
  getBookingByUserName
  
};