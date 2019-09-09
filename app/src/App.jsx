import React, {Component} from 'react';
import axios from 'axios';
import Smartcar from '@smartcar/auth';

import TripsTable from './components/TripsTableWithFiltering';
import Vehicle from './components/Vehicle';
import VehicleList from './components/VehicleList'
import CurrentTrip from './components/CurrentTrip'

import { Container, Col, Row } from 'reactstrap'
import {Promise} from "bluebird";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicle: {},
      allVehicles: [], 
      allTrips: []
    };

    this.authorize = this.authorize.bind(this);

    this.onComplete = this.onComplete.bind(this);

    this.smartcar = new Smartcar({
      clientId: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_REDIRECT_URI,
      scope: ['required:read_vehicle_info', 'required:read_odometer'],
      testMode: true,
      onComplete: this.onComplete,
    });
  }

  getAllVehicles = async () => {
    const vehicleList = await axios.get("http://localhost:8000/vehicle/all")
    this.setState({ allVehicles : vehicleList.data })
  }

  getAllTrips = async () => {
    const tripList = await axios.get("http://localhost:8000/trip/")
    this.setState({ allTrips : tripList.data.trips })
  }

  componentDidMount() {
    this.getAllVehicles()
    this.getAllTrips()
  }

  onComplete(err, code, status) {
    return axios
      .get(`${process.env.REACT_APP_SERVER}/exchange?code=${code}`)
      .then(_ => {

        return axios.get(`${process.env.REACT_APP_SERVER}/vehicleList`);
      })
      .then(async res => {
        const addedVehicles = await Promise.map(res.data, async vehicle => {
          const vehicResponse = await axios.post('http://localhost:8000/vehicle/add', vehicle)
          return vehicResponse.data
        })
        
        this.getAllVehicles()
        
      });
  }

  authorize() {
    this.smartcar.openDialog({forcePrompt: true});
  }

  render() {
  return (
    <Container>
      <Row>
      <Col>
      <TripsTable data={this.state.allTrips}  />
      </Col>
      <Col>
        <VehicleList vehicles={this.state.allVehicles} onClick={this.authorize} getAllVehicles={this.getAllVehicles} getAllTrips={this.getAllTrips}/>
      </Col>
      </Row>
    </Container>
  )
  }
}

export default App;
