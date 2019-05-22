import React, {Component} from 'react';

import Map from '../components/map'
import { GoogleMap } from 'react-google-maps';
import axios from 'axios'

class NowPlace extends Component{
  constructor(props){
    super(props);
    this.state={
      lat: 0,
      lng: 0
    }
  }
  get_position = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({ 
          lat: position.coords.latitude, 
          lng: position.coords.longitude 
        })
        //https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCQKM0wFvX4rvb_E0qErN5i6DZa7yMT6TM&latlng=55.755826,37.6173&sensor=false
        this.props.change_coordinate(position.coords.latitude, position.coords.longitude);
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=' + process.env.REACT_APP_GOOGLE_MAPS_API + '&latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false')
          .then((res)=>{
            let address_name = res.data.results
            let full_address
            for (let i = 0; i < address_name.length; i++) {
              full_address += address_name[i].formatted_address;
              console.log(address_name[i].formatted_address)
            }
            console.log( "住所は",address_name[9].formatted_address)
          })
          .catch((err) => {
            console.log("Error:",err)
          })
      },
      (err) => {
        console.log("Failed get positon:", err)
      }
    )
  }
  componentDidMount(){
    this.get_position()
  }
  render(){
    return(
      <div>
        <Map lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}

export default NowPlace;