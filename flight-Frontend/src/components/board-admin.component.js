import React, { Component } from "react";

import UserService from "../services/user.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AllBooking from "../components/booking-component/get-all-bookings.component";



import HandleFlightDetails from "./flight-component/handling-flight-details.component";



export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
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
        
<Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            
            <div className="navbar-nav mr-auto">
              

              
               

              <li className="nav-item">
                  <Link to={"/handle-flight"} className="nav-link">
                    Flight Details
                  </Link>
                </li>
               
              
                <li className="nav-item">
                  <Link to={"/get-all-bookings"} className="nav-link">
                    Booking History
                  </Link>
                </li>

                
            </div>

            
          </nav>

          <div className="container mt-3">
            <Switch>
                <Route path="/handle-flight" component={HandleFlightDetails} />
               {/* <Route exact path="/view_all_booking" component={Register} /> */}
               <Route path="/get-all-bookings" component={AllBooking} />
            </Switch>
          </div>
        </div>
      </Router>
      </div>
    );
  }
}
