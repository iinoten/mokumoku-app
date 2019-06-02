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
      mokumoku_place: [{
        lat: 35.6847829, lng: 139.6970829, 
        place_name: 'ギークハウス新宿', 
        star_value: 3, 
        ave_time: 2.4,
        address: "〒160-0022 東京都新宿区新宿２丁目１４−１０"
      }],

      popup_data: {
        place_title: '',
        ave_time: 0,
        rating: 0,
        address: ''
      }
    }
  }
  onClick_marker_handler = (index) => {
    console.log("clicked marker", this.state.mokumoku_place[index].place_name)
    this.setState({
      popup_open_flag: true,
      popup_data: {
        place_title: this.state.mokumoku_place[index].place_name,
        ave_time: this.state.mokumoku_place[index].ave_time,
        rating: this.state.mokumoku_place[index].star_value,
        address: this.state.mokumoku_place[index].address
      }
    })
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
        <PopupCard 
          close_handler={this.onClick_pop_close_button_handler} 
          open_flag={this.state.popup_open_flag} 
          title={this.state.popup_data.place_title} 
          ave_time={this.state.popup_data.ave_time} 
          rating={this.state.popup_data.rating} 
          address={this.state.popup_data.address} />
      </div>
    );
  }
}

export default SerchPage;