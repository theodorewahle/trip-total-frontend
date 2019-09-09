import React from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';


export default class CurrrentTrip extends React.Component {
    render() {
        return (
            <div>
            <Card>
              <CardBody>
                <CardTitle>$2.27</CardTitle>
                <CardSubtitle>0h 34m</CardSubtitle>
                <CardText>14 miles driven</CardText>
                <CardText>2.7 gallons of fuel</CardText>
                <Button>End Trip</Button>
              </CardBody>
            </Card>
          </div>
        )
    }
}