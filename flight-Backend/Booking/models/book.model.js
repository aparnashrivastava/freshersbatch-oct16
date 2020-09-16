const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    bookingId:{type:String,required:true},
    userName:{type:String,required:true},
    flightName:{ type:String,required:true},
    src: { type:String,required:true},
    dest: { type:String,required:true},
    arrivalTime:{ type:String,required:true},
    deptTime:{ type:String,required:true},
    fare:{ type:Number,required:true},
    seatNo:{type:Number,required:true}
    
      
    
  })
);

module.exports = Book;