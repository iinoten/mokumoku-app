import React from "react";
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


import './map.css'


const InnerMap = withGoogleMap(( props ) => {
  console.log(props)
  return(
    <GoogleMap
      defaultZoom={20}
      defaultCenter={{lat: props.marker.position.lat, lng: props.marker.position.lng}}
      center={{lat: props.marker.position.lat, lng: props.marker.position.lng}}
    >
      <Marker
        position={{ lat: props.marker.position.lat, lng: props.marker.position.lng }}
      />
    </GoogleMap>
  )
});

const Map = ({lat, lng} ) => {
  console.log(lat, lng)
  return(
    <InnerMap
      containerElement={<div />}
      mapElement={<div className="map" />}
      marker={{ position: { lat: lat, lng: lng } }}
    />
  )
};



export default Map;
