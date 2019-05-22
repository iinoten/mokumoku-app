import React, {Component} from 'react';

import axios from 'axios'

class GetAddress extends Component{
  constructor(props){
    super(props);
    this.state = {
      lat: props.lat,
      lng: props.lng
    }
  }
  componentDidMount(){
    console.log(this.state.lat + ','+ this.state.lng )
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=' + process.env.REACT_APP_GOOGLE_MAPS_API + '&latlng=' + this.state.lat + ','+ this.state.lng + '139.790788&sensor=false')
      .then((res)=>{
        let address_name = res.data.results
        address_name.reverse()
        let full_address
        for (let i = 0; i < address_name.length; i++) {
          full_address += address_name[i].formatted_address;
        }
        console.log( "住所は",address_name[9].formatted_address)
      })
      .catch((err) => {
        console.log("Error:",err)
      })
  }
  render(){
    return(
      <div></div>
    );
  }
}

export default GetAddress;