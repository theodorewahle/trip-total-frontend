import TableView from 'react-table-view'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { Container, Button } from 'reactstrap'
export default class TripsTable extends Component {

    
    render() {    
      const endedTrips = this.props.data.filter(trip => !trip.inProgress)
      const tripsToDisplay = endedTrips.map(trip => ({
        "vehicle" : trip.vehicleId,
        "miles" : trip.milesOfDepreciation,
        "cost" : `$${trip.depreciationCost ? trip.depreciationCost.toFixed(2) : 0}`,
        "start" : moment(trip.startDate).format('lll'),
        "end" : moment(trip.endDate).format('lll'),

      }))
      return (
        <Container>
            <h1>Past Trips</h1>
            <Button  onClick={this.props.addTrip}>Add Trip</Button>
          <TableView data={tripsToDisplay}  />
        </Container>
      )
    }
  }