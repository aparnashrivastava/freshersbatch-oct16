import React,{ useState, useEffect } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import bookService from '../../services/book.service';
import PaymentDetails from './booking-ticket.component';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function TicketDetails(props) {
  const classes = useStyles();
  const initialFlightState = {
    bookingId:"",
    userName:"",
    flightName:"",
    src:"",
    dest:"",
    arrivalTime:"",
    deptTime:"",
    fare:0,
    seatNo:0
  
    };
  const [currentBooking, setBook] = useState(initialFlightState);
  const bookingId=props.match.params.bookingId;
  

  useEffect(() => {
    retrieveBookings(bookingId);
  }, []);

  
  const retrieveBookings = (bookingId) => {
    bookService.retrieveBooking(bookingId)
      .then(response => {
        setBook(response.data);
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const generatePDF = () => {
    // initialize jsPDF
    
    const doc = new jsPDF();
    doc.text(20,10,"--------------------Dont forget to bring this ticket to ur respective airport-------------------");
    doc.text(20,30,"Your Flight Ticket");
    doc.text(20,50,`Booking ID: ${currentBooking.bookingId}`);
    doc.text(20,70,`User Name: ${ currentBooking.userName}`);
    doc.text(20,90,`Flight Name: ${currentBooking.flightName}`  );
    doc.text(20,110,`Source: ${currentBooking.src}`);
    doc.text(20,130,`Destination :${currentBooking.dest}`);
    doc.text(20,150,`Fare: ${currentBooking.fare}`);
    doc.text(20,170,`Seat No: ${currentBooking.seatNo}`);    
    doc.text(20,190,"***********************************Thank you for using TraveloPedia");
    doc.save(`report_${currentBooking.bookingId}.pdf`);
  };


  return (
      <div>
      
    <Card className={classes.root}>
      <CardActionArea>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Your Booking Details
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           User Name: {currentBooking.userName}<br/><br/><br/>
           Booking ID: {currentBooking.bookingId}<br/><br/><br/>
           Flight Name: {currentBooking.flightName}<br/><br/><br/>
           Source: {currentBooking.src}<br/><br/><br/>
           Destination: {currentBooking.dest}<br/><br/><br/>
           Fare: {currentBooking.fare}<br/><br/><br/>
           Seat No: {currentBooking.seatNo}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="btn btn-primary" onClick={generatePDF}>
          Download Ticket
        </Button>
        <Link  className="btn btn-primary" to={"/user"}>
          Back to Your Home Page
        </Link>
      </CardActions>
    </Card>
    <PaymentDetails/>

   
    </div>
  );
}