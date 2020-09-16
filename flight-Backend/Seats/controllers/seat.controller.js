
const Seats = require("../models/seat.model");
const db = require("../../models");




  exports.findSeatByFlightNameAndDate = (req, res) => {

    
    const flightName=req.params.flightName;
    // console.log(flightName);
    const date=req.params.dateOfJourney;
    // console.log(date)
    const seatArray=[];
for(i=1;i<26;i++)
{
  seatArray.push({id:(i),isReserved:"UnReserved"})
}
    
    
    Seats.find({ $and: [ {flightName:flightName},{dateOfJourney:date} ] })
      .then(data => {
     
        result=[];
        console.log(result);
        console.log(data.length);
        if(data.length==0){
           
            var newSeat=new Seats({
                flightName: flightName,
                dateOfJourney: date,
                Seat: seatArray

            })

            
            newSeat
            .save(newSeat)
            .then(result => {
              res.send(result);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Seat."
              });
            });
            

        }else{
            res.send(data);
            
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Seats."
        });
      });
  };


//for reserving the seats in flight according to the given date


  exports.reserveSeat =  (req,res)=> {
      
      const id=req.body.id;
      const flightName=req.body.flightName;
      const date=req.body.dateOfJourney;
    console.log(id+flightName+date);
    
    Seats.findOne({ $and: [ {flightName:flightName},{dateOfJourney:date} ] })
    .then(data => {
       
        if (!data) {
          res.status(404).send({
            message: `Cannot update Seat with name=${flightName}. Maybe Flight was not found!`
          });
        } else {
           
           const seatArray=data.Seat
           
        const changeArray={_id:data.Seat[id-1]._id,id:id,isReserved:"Reserved"};
           
        seatArray[id-1]=changeArray;
       
         Seats.updateOne({ $and: [ {flightName:flightName},{dateOfJourney:date} ] },{$set:{Seat:seatArray}}).then(data=>{
             res.send(data);
         }) 

        }
    
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Flight with name=" + flightName
        });
      });
  };

  
  exports.findSeat =  (req,res)=> {
      
    
    const flightName=req.params.flightName;
    console.log(flightName);
    const date=req.params.dateOfJourney;
    console.log(date);
  
  Seats.findOne({ $and: [ {flightName:flightName},{dateOfJourney:date} ] })
  .then(data => {
     
      if (!data) {
        res.status(404).send({
          message: `Cannot update Seat with name=${flightName}. Maybe Flight was not found!`
        });
      } else {
         
           data=data.Seat;

           res.send(data);
        

      }
  
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Flight with name=" + flightName
      });
    });
};



exports.findSeatAvailability =  (req,res)=> {
      
  const id=req.body.id;
  const flightName=req.body.flightName;
  const date=req.body.dateOfJourney;


Seats.findOne({ $and: [ {flightName:flightName},{dateOfJourney:date} ] })
.then(data => {
   
    if (!data) {
      res.status(404).send({
        message: `Cannot update Seat with name=${flightName}. Maybe Flight was not found!`
      });
    } else {
      
       data=data.Seat[id-1].isReserved;
       res.send(data);
     } 

    })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Flight with name=" + flightName
    });
  });
};





        
 