const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const braintree=require("braintree");
const app = express();
require('dotenv').config();


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://localhost:27017/flight_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

     

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}






// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});




// routes
require('./routes/payment.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./Flights/routes/flight.routes')(app);
require('./Seats/routes/seat.routes')(app);
require('./Booking/routes/book.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 4545;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});