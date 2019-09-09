import React from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import Vehicle from "./Vehicle";
import CarMap from "./CarMap";

export default class VehicleList extends React.Component {
  state = { view: "list" };

  onRadioBtnClick = view => {
    this.setState({ view });
  };

  render() {
    const { vehicles } = this.props;

    const vehiclesBeingRented = vehicles.filter(
      vehicle => vehicle.isBeingRented
    );
    const vehiclesNotBeingRented = vehicles.filter(
      vehicle => !vehicle.isBeingRented
    );

    console.log("this.props.vehicles", this.props.vehicles);
    return (
      <Container>
        <Col>
          <Row
            style={{
              marginBottom: 16,
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Col>
              <h1>Vehicles</h1>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ButtonGroup style={{ marginRight: 16 }}>
                <Button
                  color="primary"
                  onClick={() => this.onRadioBtnClick("list")}
                  active={this.state.view === "list"}
                >
                  List
                </Button>
                <Button
                  color="primary"
                  onClick={() => this.onRadioBtnClick("map")}
                  active={this.state.view === "map"}
                >
                  Map
                </Button>
              </ButtonGroup>
              <Button color="success" onClick={this.props.onClick}>
                Add
              </Button>
            </Col>
          </Row>

          {this.state.view === "list" && (
            <div>
              {vehiclesBeingRented.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Rentals In Progress</h3>

                  <Container style={{ maxHeight: 300, overflowY: "scroll" }}>
                    {vehiclesBeingRented.map(vehicle => (
                      <Vehicle
                        vehicle={vehicle}
                        getAllVehicles={this.props.getAllVehicles}
                        getAllTrips={this.props.getAllTrips}
                      />
                    ))}
                  </Container>
                </div>
              )}

              <h3 style={{ marginBottom: 16 }}>Not Currently Being Rented</h3>
              <Container style={{ maxHeight: 400, overflowY: "scroll" }}>
                {vehiclesNotBeingRented.map(vehicle => (
                  <Vehicle
                    vehicle={vehicle}
                    getAllVehicles={this.props.getAllVehicles}
                    getAllTrips={this.props.getAllTrips}
                  />
                ))}
              </Container>
            </div>
          )}

          {this.state.view === "map" && <CarMap vehicles={vehicles} />}
        </Col>
      </Container>
    );
  }
}
