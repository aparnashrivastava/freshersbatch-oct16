const controller = require("../controllers/flight.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "*"
    );
    next();
  });

      

  app.post("/api/flight/add-flight", controller.addFlight);
  app.post("/api/flight/delete-flight",controller.deleteFlight);
  app.put("/api/flight/update-flight",controller.modifyFlight);
  app.get("/api/flight/get-all-flights",controller.findAllFlights);
  app.get("/api/flight/get-all-flights-by-src-and-dest/src/:src/dest/:dest",controller.findFlightsBySrcAndDest);
  app.get("/api/flight/:flightName", controller.findOneFlight);
};