import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


import './map.css'


const InnerMap = withGoogleMap(( props ) => {
  console.log("here!!!!!!!!!!1",props.spaces)
  return(
    <GoogleMap
    id="map"
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
            onClick={()=>props.onClick_marker_handler(index)}
            position={{lat: item.lat, lng: item.lng}} icon={`${process.env.PUBLIC_URL}/picture/red_cloud.png`} />
        )
      }
    </GoogleMap>
  )
});

const Map = (props) => {
  console.log(props.spaces)
  return(
    <InnerMap
      onClick_marker_handler={props.onClick_marker_handler}
      spaces={props.spaces}
      containerElement={<div />}
      mapElement={<div className="map" />}
      marker={{ position: { lat: props.lat, lng: props.lng } }}
    />
  )
};



export default Map;
