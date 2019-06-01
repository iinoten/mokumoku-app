import React, {Component} from 'react';

import Map from '../../components/map'
import PopupCard from '../../components/PopupCard/PopupCard'

import './SerchPage.css'

class SerchPage extends Component{
  constructor(props){
    super(props);
    this.state={
      lat: 35.6846829,
      lng: 139.6969829,

      mokumoku_place: [{lat: 35.6847829, lng: 139.6970829, place_name: 'ギークハウス新宿', star_value: 3.5}]
    }
  }
  render(){
    return(
      <div>
        <Map spaces={this.state.mokumoku_place} id="map" lat={this.state.lat} lng={this.state.lng} />
        <PopupCard title={"ギークハウス新宿1"} ave_time={3.5} rating={4} address={"〒160-0022 東京都新宿区新宿２丁目１４−１０"}/>
      </div>
    );
  }
}

export default SerchPage;