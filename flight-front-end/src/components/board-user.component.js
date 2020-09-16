import React, { Component } from "react";

import UserService from "../services/user.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UserBooking from "../components/flight-component/add-flight.component";

import Login from "../components/login.component";
import Register from "../components/register.component";
import SearchList from "../components/flight-component/search-flight.component";
import BookASeat from "../components/seat-component/book-seat.component";
import TicketDetails from "./booking-component/ticket-generation.component";
import DelFlight from "./flight-component/delete-booking.component";




export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        {/* <header className="jumbotron">
           <h3>{this.state.content}</h3> 

        </header> */}

<Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/book_ticket"} className="nav-link">
                  Book Flight
                </Link>
              </li>

              
                <li className="nav-item">
                  <Link to={"/delete_ticket"} className="nav-link">
                  Cancel Flight
                  </Link>
                </li>
              

              
                <li className="nav-item">
                  <Link to={"/find-user-bookings"} className="nav-link">
                    Your Booking History
                  </Link>
                </li>
              
            </div>

            
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/book_ticket"]} component={SearchList} />
              <Route exact path="/delete_ticket" component={DelFlight} />
              
              <Route path="/book-flight/:flightName/dateOfJourney/:dateOfJourney" component={BookASeat} />
              <Route path="/make-payment/:bookingId" component={TicketDetails} />
              <Route path="/find-user-bookings" component={UserBooking} />
            </Switch>
          </div>
        </div>
      </Router>

      </div>
    );
  }
}
