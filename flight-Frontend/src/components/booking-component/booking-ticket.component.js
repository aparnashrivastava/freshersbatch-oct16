import React, { Component } from 'react';




import 'braintree-web';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';






class PaymentDetails extends Component {
  instance;
   
  state = {
    clientToken: null,
    
  };

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get(
        'http://localhost:4545/api/braintree/v1/getToken'
      );
      const clientToken = response.data.clientToken;

      this.setState({ clientToken });
    } catch (err) {
      console.error(err);
    }
  }

  async buy() {
    try {
      // Send the nonce to your server
      const { nonce } = await this.instance.requestPaymentMethod();
      const response = await axios.post(
        'http://localhost:4545/api/braintree/v1/sandbox',
        nonce
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        
        <div>

          

          <DropIn
            options={{
              authorization: this.state.clientToken
            }}
            onInstance={(instance) => (this.instance = instance)}
          />
          <button onClick={this.buy.bind(this)}>Confirm Payment</button>
        </div>
      );
    }
  }
}

export default PaymentDetails;