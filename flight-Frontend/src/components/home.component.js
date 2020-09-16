import React, { Component } from "react";

import UserService from "../services/user.service";
import Carousel from 'react-bootstrap/Carousel';
import SimpleCard from '../components/card.component'
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
    <div>
      <div className="main-part">
        <header className="jumbotron" >
        <h1 className="head" align="center"><i>Explore the world with <b>Travel<i>O</i>Pedia</b></i></h1>
        <h5 className="head" align="center"><i>..........Book your flight tickets from anywhere around the world</i></h5>
        </header>
        <Carousel>
          <Carousel.Item>
          <img
            className="image"
            src={require('../img/kerala.jpg')}
            alt="First slide"
           />
    <Carousel.Caption>
      <h3>KERALA</h3>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="image"
      src={require('../img/mt-fuji-japan.jpeg')}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>JAPAN</h3>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="image"
      src={require('../img/shimla.jpg')}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>SHIMLA</h3>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="image"
      src={require('../img/singapore-merlion-park.jpg')}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>SINGAPORE</h3>
      
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

      </div>
      <div>
        <hr>
</hr>
<SimpleCard/>
      </div>
      </div>
    );
  }
}
