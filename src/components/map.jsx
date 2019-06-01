import React from "react";
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import FiberManualRecordRounded from '@material-ui/icons/FiberManualRecordRounded'


import './map.css'


const InnerMap = withGoogleMap(( props ) => {
  console.log("here!!!!!!!!!!1",props.spaces)
  return(
    <GoogleMap
      defaultZoom={20}
      defaultCenter={{lat: props.marker.position.lat, lng: props.marker.position.lng}}
      center={{lat: props.marker.position.lat, lng: props.marker.position.lng}}
    >
      <Marker
        position={{ lat: props.marker.position.lat, lng: props.marker.position.lng }}
      />
      {
        props.spaces.map( item =>
          <Marker position={{lat: item.lat, lng: item.lng}} icon={`${process.env.PUBLIC_URL}/picture/red_cloud.png`} />
        )
      }
    </GoogleMap>
  )
});

const Map = ({lat, lng, spaces} ) => {
  console.log(spaces)
  return(
    <InnerMap
      spaces={spaces}
      containerElement={<div />}
      mapElement={<div className="map" />}
      marker={{ position: { lat: lat, lng: lng } }}
    />
  )
};



export default Map;
