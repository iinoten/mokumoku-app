import React, {Component} from 'react';

import Map from '../components/map'

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