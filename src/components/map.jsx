import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


import './map.css'


const InnerMap = withGoogleMap(( props ) => {
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
        props.spaces.map( (item, index) => {
          console.log(item)
          let sum = function(arr, fn) { //合計値割り出し
            if (fn) {
                return sum(arr.map(fn));
            }
            else {
              return arr.reduce(function(prev, current, i, arr) {
                      return prev+current;
              });
            }
          };
          let average = function(arr, fn) {
            return sum(arr, fn)/arr.length;
          };
          let all_rating = [];
          item.data.impressions.map((impression)=>
            all_rating.push(impression.rating)
          )
          let ave_rating = Math.round(average(all_rating))
          console.log(ave_rating)
          return(
            <div className="mokumoku_marker">
              <Marker 
                key={index}
                id={index}
                className="mokumoku-marker"
                onClick={()=>props.onClick_marker_handler(index)}
                position={{lat: item.data.position.lat, lng: item.data.position.lng}} 
                icon={`${process.env.PUBLIC_URL}/picture/` + ave_rating + '_pin.png'} />
            </div>
          )}
        )
      }
    </GoogleMap>
  )
});

const Map = (props) => {
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
