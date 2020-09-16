const controller = require("../controllers/seat.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "*"
    );
    next();
  });

      

  app.get("/api/seat/seat-status/flightName/:flightName/dateOfJourney/:dateOfJourney", controller.findSeatByFlightNameAndDate);
  app.put("/api/seat/seat-reserve", controller.reserveSeat);
  app.get("/api/seat/seat-find/flightName/:flightName/dateOfJourney/:dateOfJourney", controller.findSeat);
  app.post("/api/seat/seat-status-check", controller.findSeatAvailability);
};