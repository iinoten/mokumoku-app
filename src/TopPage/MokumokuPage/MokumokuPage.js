import React, {Component} from 'react';
import firebase from 'firebase'
import axios from 'axios'
import update from 'immutability-helper'

import WordCard from '../../components/WordCard/WordCard'
import StartButton from '../../components/StartButton/StartButton'
import CancelButton from '../../components/CancelButton/CancelButton'

import PopupReport from '../../components/PopupReport/PopupReport'
import ConfirmAlert from '../../components/ConfirmAlert/ConfirmAlert'

const sec_delay = 1

var perfect_address;

class MokumokuPage extends Component{
  constructor(props){
    super(props);
    console.log(props)
    console.log("at constructor", this.props.uid)
    this.state = {
      count_s: 0,
      count_min: 0,
      count_h: 0,
      have_count: false,

      counting_now: false,

      cancelable_count: 10, //これ20秒とかにしたほうがいいかもしれん

      form_open: false,
      confirm_open: false,

      uid: props.uid,
      now_address: '',
      now_position: {lat: null, lng: null},

      near_place: []
    }
  }

  decrement_cancelable_count = () => {
    if(this.state.cancelable_count > 0){this.setState({ cancelable_count: this.state.cancelable_count-1})}
  }
  count_up = () => {
    this.setState({ count_s: this.state.count_s +1});
    if(this.state.count_s === 60) {
      this.setState({
        count_min: this.state.count_min +1,
        count_s: 0
      }) 
    } else if(this.state.count_min === 60) {
      this.setState({
        count_h: this.state.count_h +1,
        count_min: 0
      }) 
    }
  }
  count_down_cancelable = () => {
    if(this.state.cancelable_count > 0){this.setState({ cancelable_count: this.state.cancelable_count -1 })}
  }
  get_near_mokumoku_place = (lat) => {  //付近の場所を取得
    firebase.firestore().collection('mokumoku_space').get()
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          let places_data = doc.data();
          if(
            ((this.props.lat+0.001) >= places_data.position.lat) && ( places_data.position.lat >= (this.props.lat-0.001))
            &&
            ( (this.props.lng+0.001) >= places_data.position.lng ) && ( places_data.position.lng >= (this.props.lng-0.001))
          ) {
            this.setState({
              near_place: update(this.state.near_place, {
                $push: [{
                  name: places_data.name,
                  id: doc.id
                }]
              })
            })
          }
        })
      })
      .catch((err => {
        console.log("Failed get places data:", err);
      }))
  }
  //既存の場所にレビューを追加
  add_review_location_existing = (place_id, comment, rating, time) => {
    this.setState({near_place: []})
    let hiduke = new Date();
    firebase.firestore().collection('mokumoku_space').doc(place_id).get()
      .then((doc) => {
        let place_data = doc.data();
        console.log(place_data)
        place_data.impressions = [...place_data.impressions, {
          comment,
          rating,
          time: (time.h + Math.round(time.min/6)),
          user_id: this.state.uid,
          date: hiduke.getFullYear() + '/' + (hiduke.getMonth()+1) + '/' + hiduke.getDate()
        }]
        console.log("あたらしくつくった", place_data)
        firebase.firestore().collection('mokumoku_space').doc(place_id).set(place_data)
          .catch((err)=>console.log("既存の場所にレビューを保存できませんでした", err))
      })
      .catch((err)=>console.log("既存の場所にレビューを追加できませんでした", err))
      this.setState({ form_open:!this.state.form_open})
  }
  onClick_start_button_handler = () => {
    if(this.state.now_position.lat && this.state.now_position.lng){
      let uid;
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({uid: user.uid})
          uid = user.uid;
        }
      })
      if(this.state.uid){
        this.get_near_mokumoku_place();
        console.log("UID!!!!!!!!!!!!!!!!!!!!!!!!!!!",this.state.uid)
        this.setState({
          counting_now: !this.state.counting_now,
          cancelable_count: 10
        })
          this.mokumoku_timer = setInterval(this.count_up, sec_delay);
          this.count_down_cancelable_interval = setInterval(this.count_down_cancelable, sec_delay);
      } else {
        alert("先にaccountページでログインの確認をしてください")
      }
    } else {
      alert('システム設定から，位置情報取得の許可をしてください')
    }
  }
  onClick_cancel_button_handler=()=>{
    clearInterval(this.count_down_cancelable_interval)
    clearInterval(this.mokumoku_timer)
    this.setState({
      now_position: null,
      count_h:0,
      count_min:0,
      count_s:0,
      cancelable_count:10,

      counting_now: !this.state.counting_now
    })
  }
  onClick_stop_button_handler = () => {
    this.setState({
      confirm_open: !this.state.confirm_open
    })
  }
  
  onClick_confirm_canccel_button = () => {
    this.setState({ confirm_open: !this.state.confirm_open })
  }
  onClick_confirm_ok_button=()=>{
    clearInterval(this.mokumoku_timer);
    this.setState({ 
      counting_now: !this.state.counting_now,
      confirm_open: !this.state.confirm_open,
      form_open: !this.state.form_open,
    })
  }
  onClick_inference_chip = (id, comment, rating, time) => {
    console.log("click chip:", id, comment, rating, time)
    firebase.firestore().collection('mokumoku_space').doc(id).get()
      .then((doc)=>{

      })
  }
  onClick_mokumoku_form_submit = (done,  time_h, time_min, place_id, rating, impression, place_name) => {
    console.log("えらーーーーーー", Boolean(navigator.geolocation))
    let time = new Date();
    this.setState({near_place: []})
    var temp_now_address;
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({now_position: {lat: position.coords.latitude, lng: position.coords.longitude}})
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=' + process.env.REACT_APP_GOOGLE_MAPS_API + '&latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false')
          .then((res)=>{
            let address_name = res.data.results
            this.setState({now_address: address_name[0].formatted_address})
            temp_now_address = address_name[0].formatted_address;
            perfect_address = address_name[0].formatted_address
          })
          .catch((err) => {
            console.log("Error:",err)
          })
    })
    
    this.setState({ form_open:!this.state.form_open})
    if(this.state.uid){
    firebase.firestore().collection('users').doc(this.state.uid).get()
      .then((doc) => {
        let hiduke = new Date();
        let temp_user_data = doc.data();
        temp_user_data.mokumoku_history.unshift({
          place_id,
          date: hiduke.getFullYear() + "/" + (hiduke.getMonth()+1) + "/" + hiduke.getDay() + " " + hiduke.getHours() + ":" + hiduke.getMinutes(),
          time: {
            h: time_h,
            min: time_min
          },
          done,
          rating,
          impression
        })
        firebase.firestore().collection('users').doc(this.state.uid).set(temp_user_data)
          .then(()=>console.log("success save user data"))
          .catch((err)=>console.log('Error save user data', err))
      })
      .catch((err) => {
        console.log("Get Error", err)
      })
    }
    firebase.firestore().collection('mokumoku_space').doc(place_id).get()
      .then((doc)=>{
        if(!doc.data()){
          firebase.firestore().collection('mokumoku_space').doc(place_id).set({
            position: {lat:this.props.lat, lng: this.props.lng},
            impressions: [{
              comment: impression,
              date: time.getFullYear() + '/' + (time.getMonth()+1) + '/' + time.getDate(),
              rating,
              user_id: this.state.uid,
              time: (time_h + Math.round(time_min/6)),
            }],
            address: perfect_address,
            name: place_name
          })
          .then(console.log("save place data"))
          .catch(err=>console.log("Error, cant save place data", err))
        }
      })
      .catch((err)=>console.log(err))
  }
  componentDidMount(){
    console.log("didmount", this.props.uid)
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({now_position: {lat: position.coords.latitude, lng: position.coords.longitude}})
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=' + process.env.REACT_APP_GOOGLE_MAPS_API + '&latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false')
          .then((res)=>{
            let address_name = res.data.results
            this.setState({now_address: address_name[0].formatted_address})
          })
          .catch((err) => {
            console.log("Error:",err)
          })
    })
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({now_position: {lat: position.coords.latitude, lng: position.coords.longitude}})
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=' + process.env.REACT_APP_GOOGLE_MAPS_API + '&latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false')
          .then((res)=>{
            let address_name = res.data.results
            this.setState({now_address: address_name[0].formatted_address})
            perfect_address = address_name[0].formatted_address;
          })
          .catch((err) => {
            console.log("Error:",err)
          })
      }
    )
  }
  render(){
    return(
      <div>
        <WordCard />
        <PopupReport 
          open={this.state.form_open}
          onClick_submit={this.onClick_mokumoku_form_submit}
          add_review={this.add_review_location_existing}
          mokumoku_h={this.state.count_h}
          mokumoku_min={this.state.count_min}
          near_place={this.state.near_place}
          onClick_inference_chip={this.onClick_inference_chip}
          rating={3}/>
        <ConfirmAlert 
          mokumoku_h={this.state.count_h}
          mokumoku_min={this.state.count_min}
          open={this.state.confirm_open}
          onClick_ok={this.onClick_confirm_ok_button}
          onClick_cancel={this.onClick_confirm_canccel_button}/>
        {this.state.counting_now? 
          <CancelButton 
            cancelable_count={this.state.cancelable_count}
            onClick_stop_button={this.onClick_stop_button_handler}
            onCick_cancel_button={this.onClick_cancel_button_handler} />
          :
          <StartButton onClick={this.onClick_start_button_handler}/>
        }
      </div>
    );
  }
}

export default MokumokuPage;