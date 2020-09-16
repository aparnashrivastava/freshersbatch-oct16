const db = require("../models");

const Flight=db.flight

checkDuplicateFlights = (req, res, next) => {
  // Username
  Flight.findOne({
    flightName: req.body.flightName
  }).exec((err, flight) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (flight) {
      res.status(400).send({ message: "The Flight with this name is already added !!!" });
      return;
    }

    
  });
};



const verifyDuplicateFlight = {
    checkDuplicateFlights
};

module.exports = verifyDuplicateFlight;