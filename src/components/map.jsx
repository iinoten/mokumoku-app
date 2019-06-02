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
        props.spaces.map( (item, index) =>
          <Marker 
            id={index}
            onClick={props.onClick_marker_handler}
            position={{lat: item.lat, lng: item.lng}} icon={`${process.env.PUBLIC_URL}/picture/red_cloud.png`} />
        )
      }9
    </GoogleMap>
  )
});

const Map = ({lat, lng, spaces, onClick_marker_handler} ) => {
  console.log(spaces)
  return(
    <InnerMap
      onClick_marker_handler={onClick_marker_handler}
      spaces={spaces}
      containerElement={<div />}
      mapElement={<div className="map" />}
      marker={{ position: { lat: lat, lng: lng } }}
    />
  )
};



export default Map;
