import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Vehicle from "./Vehicle";

export default class VehicleList extends React.Component {
  render() {
    const { vehicles } = this.props;

    const vehiclesBeingRented = vehicles.filter(
      vehicle => vehicle.isBeingRented
    );
    const vehiclesNotBeingRented = vehicles.filter(
      vehicle => !vehicle.isBeingRented
    );

    return (
      <Container>
        <Col>
          <Row>
            <Col>
              <h1 style={{ marginBottom: 16 }}>Vehicles</h1>
            </Col>
            <Col>
              <Button onClick={this.props.onClick}>Add New Car(s)</Button>
            </Col>
          </Row>
          {vehiclesBeingRented.length > 0 && (
            <div>
              <h3>Rentals In Progress</h3>
              {vehiclesBeingRented.map(vehicle => (
                <Vehicle
                  vehicle={vehicle}
                  getAllVehicles={this.props.getAllVehicles}
                  getAllTrips={this.props.getAllTrips}
                />
              ))}
            </div>
          )}
          <h3>Not Currently Being Rented</h3>
          {vehiclesNotBeingRented.map(vehicle => (
            <Vehicle
              vehicle={vehicle}
              getAllVehicles={this.props.getAllVehicles}
              getAllTrips={this.props.getAllTrips}
            />
          ))}
        </Col>
      </Container>
    );
  }
}
