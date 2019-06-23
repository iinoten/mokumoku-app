import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import './App.css';

import MokumokuPage from './TopPage/MokumokuPage/MokumokuPage'
import SerchPage from './TopPage/SerchPage/SerchPage'
import AccountPage from './TopPage/AccountPage/AccountPage'

import BottomBar from './components/BottomBar/BottomBar'


import firebase from 'firebase'
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      lat: null,
      lng: null,
    }
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    });
    var new_uid;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("ログイン済")
          // User is signed in.
          new_uid = user.uid;
          console.log(user.uid)
          this.state = {uid: user.uid}
        } else {
          // No user is signed in.
        }
      });
  }
  change_coordinate = (lat, lng) =>{
    this.setState({
      lat: lat,
      lng: lng
    });
  }
  componentDidMount(){
    console.log("appjs DidMount", this.state.uid)
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude})
      })
      navigator.geolocation.watchPosition((position)=>{
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude})
      })
    }
    firebase.auth().onAuthStateChanged((user)=>{
      this.setState({uid: user.uid})
    })
  }
  render(){
    console.log()
    return(
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/account' render={()=> <AccountPage test={"正解!!"} update_uid={this.update_uid} uid={this.state.uid} />} />
            {this.state.uid ? <Route path='/mokumoku' render={()=> <MokumokuPage uid={this.state.uid} />} /> : null }
            <Route path='/search' render={()=> <SerchPage lat={this.state.lat} lng={this.state.lng} />} />
            {this.state.uid?<Redirect from='/' to='mokumoku' />:<Redirect from='/' to='account' />}
            <Redirect from='/' to='mokumoku' />
          </Switch>
          <BottomBar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
