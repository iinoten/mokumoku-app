import React, {Component} from 'react';

import Map from '../../components/map'
import PopupCard from '../../components/PopupCard/PopupCard'

import './SerchPage.css'

class SerchPage extends Component{
  constructor(props){
    super();
    this.state={
      lat: 35.6846829,
      lng: 139.6969829,
    
      popup_open_flag: false,
      mokumoku_place: [{lat: 35.6847829, lng: 139.6970829, place_name: 'ギークハウス新宿', star_value: 3.5}]
    }
  }
  onClick_marker_handler = (title, address, rating, ave_time) => {
    console.log(title, address, rating, ave_time)
    this.setState({popup_open_flag: true})
  }
  onClick_pop_close_button_handler = () => {
    this.setState({popup_open_flag: false})
    console.log("close")
  }
  render(){
    console.log(this.state.popup_open_flag)
    return(
      <div>
        <Map onClick_marker_handler={this.onClick_marker_handler} spaces={this.state.mokumoku_place} id="map" lat={this.state.lat} lng={this.state.lng} />
        <PopupCard close_handler={this.onClick_pop_close_button_handler} open_flag={this.state.popup_open_flag} title={"ギークハウス新宿1"} ave_time={3.5} rating={4} address={"〒160-0022 東京都新宿区新宿２丁目１４−１０"}/>
      </div>
    );
  }
}

export default SerchPage;