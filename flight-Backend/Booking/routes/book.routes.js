const controller = require("../controller/book.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "*"
    );
    next();
  });

      

  app.post("/api/book/book-flight", controller.addBookingDetails);
  app.get("/api/book/get-all-bookings",controller.findAllBookings);
  app.get("/api/book/get-detail/:bookingId",controller.findOneBooking);
  app.post("/api/book/delete-booking",controller.deleteBook);
  app.post("/api/book/find-booking-by-user",controller.findBookingOfUser);
};