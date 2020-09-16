const mongoose = require("mongoose");

const Flight = mongoose.model(
  "Flight",
  new mongoose.Schema({
    flightName:{ type:String,required:true},
    src: { type:String,required:true},
    dest: { type:String,required:true},
    arrivalTime:{ type:String,required:true},
    deptTime:{ type:String,required:true},
    fare:{ type:Number},
    
      
    
  })
);

module.exports = Flight;