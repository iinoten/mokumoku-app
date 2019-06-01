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
    
  }
  render(){
    return(
      <div></div>
    );
  }
}

export default GetAddress;