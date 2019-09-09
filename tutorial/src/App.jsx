import React, {Component} from 'react';
import axios from 'axios';
import Smartcar from '@smartcar/auth';

import Connect from './components/Connect';
import Vehicle from './components/Vehicle';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicle: {},
    };

    this.authorize = this.authorize.bind(this);

    this.onComplete = this.onComplete.bind(this);

    // TODO: Authorization Step 1: Initialize the Smartcar object
    this.smartcar = new Smartcar({
      clientId: process.env.REACT_APP_CLIENT_ID,
      redirectUri: 'https://javascript-sdk.smartcar.com/redirect-2.0.0?app_origin=http://localhost:3000',
      scope: ['required:read_vehicle_info', 'required:read_location', 'required:read_odometer'],
      testMode: true,
      onComplete: this.onComplete,
    });
    
  }

  onComplete(err, code, status) {
    // TODO: Authorization Step 3: Receive the authorization code
    console.log(code);
      // TODO: Request Step 1: Obtain an access token
      return axios
        .get(`${process.env.REACT_APP_SERVER}/exchange?code=${code}`);
  }


  authorize() {
    // TODO: Authorization Step 2a: Launch Connect
    this.smartcar.openDialog({forcePrompt: true});
  }
  
  render() {
    // TODO: Authorization Step 2b: Render the Connect component
    return <Connect onClick={this.authorize} />;
  }
}

export default App;
