
const Book = require("../models/book.model");

exports.addBookingDetails = (req, res) => {
    // Validate request
    if (!req.body.flightName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const book = new Book({
      bookingId:req.body.bookingId,
      userName:req.body.userName,
      flightName: req.body.flightName,
      src: req.body.src,
      dest:req.body.dest,
      arrivalTime:req.body.arrivalTime,
      deptTime:req.body.deptTime,
      fare:req.body.fare,
      seatNo:req.body.seatNo
    });
  
    // Save Tutorial in the database
    book
      .save(book)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving the booking Details."
        });
      });
  };

  
  exports.findAllBookings = (req, res) => {
      
    Book.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving booking details."
        });
      });
  };


  exports.findOneBooking = (req, res) => {
    const bookingId = req.params.bookingId;
  
    Book.findOne({bookingId:bookingId})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found details with name " + bookingId });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Flight with name=" + bookingId });
      });
  };
 
  exports.findBookingOfUser = (req, res) => {
    const userName = req.body.userName;
  
    Book.find({userName:userName})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found details with name " + bookingId });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Bookings with name=" + userName });
      });
  };
  exports.deleteBook = (req, res) => {
    if (!req.body) {
       return res.status(400).send({
         message: "Data to delete can not be empty!"
       });
     }
   
   const name = req.body.bookingId;
   Book.deleteOne({bookingId:name}).then(() => {
         res.send({message:"Flight removed successfully"})
     }).catch(err => {
         if(err){
             throw err;
         }
     });
 }




 



        
 