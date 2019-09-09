import React from 'react'
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardFooter, Row, Container } from 'reactstrap';
import axios from 'axios'

export default class Vehicle extends React.Component {
  state = {
    expanded: false
  }


  toggleRental = async (vehicleId, rentalOngoing) => {
    if (!rentalOngoing) {
      await axios.post('http://localhost:8000/trip/start', { vehicleId })
    } else {
      await axios.patch('http://localhost:8000/trip/end', { vehicleId })
      await this.props.getAllTrips()
    }
    this.props.getAllVehicles()
  }

  render() {
    const { make, model, year, isBeingRented, id } = this.props.vehicle

    return (
      <Card style={{ marginBottom: 16, backgroundColor : isBeingRented ? 'green' : 'white' }}>
        <CardBody>
          <Container>
          <Row style={{ display: 'flex', justifyContent: 'space-between'}}>
            <CardTitle>{`${year} ${make} ${model}`}</CardTitle>
          <Button onClick={() => this.toggleRental(id, isBeingRented)}>{isBeingRented ? 'End Rental' : 'Start Rental' }</Button></Row>
          </Container>
        </CardBody>
        { this.state.expanded && (
            <CardFooter className="text-muted">Footer
            
            
            </CardFooter>
        )}
      </Card>
    )
  }
}