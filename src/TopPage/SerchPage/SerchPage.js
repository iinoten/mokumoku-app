import React, {Component} from 'react';
import firebase from 'firebase'

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
      mokumoku_place: [],

      popup_data: {
        place_title: '',
        all_time: 0,
        rating: 0,
        address: ''
      }
    }
  }
  componentDidMount(){
    firebase.firestore().collection('mokumoku_space').get()
      .then((doc)=>{
        let place_data = [];
        doc.forEach((doc)=>{
          place_data.push({
            id: doc.id,
            data: doc.data()
          })
          console.log(doc.id)
        })
        console.log("test",place_data)
        this.setState({mokumoku_place: place_data})
      })
      .catch((err)=>console.log(err))
  }
  onClick_marker_handler = (index) => {
    console.log("clicked marker", this.state.mokumoku_place[index])
    let place_data = this.state.mokumoku_place[index];
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
        var average = function(arr, fn) {
          return sum(arr, fn)/arr.length;
        };
        let all_time = [];
          place_data.data.impressions.map((item)=>
            all_time.push(item.time)
          )
      let all_rating = []
      place_data.data.impressions.map((item)=>
        all_rating.push(item.rating)
      )
    let ave_rating = average(all_rating)
    console.log(ave_rating)
    let ave_time = average(all_time)
    this.setState({
      popup_open_flag: true,
      popup_data: {
        place_title: place_data.data.name,
        ave_time: ave_time,
        rating: ave_rating,
        address: place_data.data.address
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
        <Map 
          onClick_marker_handler={this.onClick_marker_handler} 
          spaces={this.state.mokumoku_place} 
          id="map" 
          lat={this.state.lat} lng={this.state.lng} />
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