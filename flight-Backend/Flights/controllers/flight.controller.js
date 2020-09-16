const Flight = require("../models/flight.model");

exports.addFlight = (req, res) => {
    // Validate request
    if (!req.body.flightName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const flight = new Flight({
      flightName: req.body.flightName,
      src: req.body.src,
      dest:req.body.dest,
      arrivalTime:req.body.arrivalTime,
      deptTime:req.body.deptTime,
      fare:req.body.fare
    });
  
    // Save Tutorial in the database
    flight
      .save(flight)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Flight."
        });
      });
  };

exports.deleteFlight = (req, res) => {
   if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
  const name = req.body.flightName;
  console.log(name);
    Flight.deleteOne({flightName:name}).then(() => {
        res.send({message:"Flight removed successfully"})
    }).catch(err => {
        if(err){
            throw err;
        }
    });
}

exports.modifyFlight = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const flightName = req.body.flightName;
  
    Flight.findOneAndUpdate({flightName:flightName}, req.body)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Flight with name=${flightName}. Maybe Flight was not found!`
          });
        } else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Flight with name=" + flightName
        });
      });
  }; 
  
  
  exports.findAllFlights = (req, res) => {
      
    Flight.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
 
  exports.findOneFlight = (req, res) => {
    const flightName = req.params.flightName;
  
    Flight.findOne({flightName:flightName})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Flight with name " + flightName });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Flight with name=" + flightName });
      });
  };




  exports.findFlightsBySrcAndDest = (req, res) => {

    const src=req.params.src;
    const dest=req.params.dest;
    Flight.find({ $and: [ {src:src},{dest:dest} ] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };



        
 