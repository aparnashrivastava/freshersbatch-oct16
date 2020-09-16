const mongoose = require("mongoose");

const Seats = mongoose.model(
  "Seats",
  new mongoose.Schema({
    
    flightName:{type:String,required:true},
    dateOfJourney:{ type:String,required:true},
   Seat: [ {
     id:{type:Number},
     isReserved:{type:String},
    
  }]
      
    
  })
);

module.exports = Seats;