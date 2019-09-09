import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import CarIcon from "./car_icon.svg";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCVHqjiyBIj_4dkzmddfFv_OZEe1z3jxoQ",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const google = window.google;
  var icon = {
    url: CarIcon,
    scaledSize: new google.maps.Size(31, 43)
  };
  return (
    <GoogleMap defaultZoom={6} defaultCenter={{ lat: 39.5501, lng: -105.7821 }}>
      {props.vehicles.map(vehicle => {
        return (
          <Marker
            position={{ lat: vehicle.coords[0], lng: vehicle.coords[1] }}
            options={{ icon }}
          />
        );
      })}
    </GoogleMap>
  );
});

export default class MyFancyComponent extends React.PureComponent {
  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  render() {
    return <MyMapComponent vehicles={this.props.vehicles} />;
  }
}
