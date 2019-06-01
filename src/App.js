import React, {Component} from 'react';
import './App.css';

import MokumokuPage from './TopPage/MokumokuPage/MokumokuPage'
import SerchPage from './TopPage/SerchPage/SerchPage'

import BottomBar from './components/BottomBar/BottomBar'


import firebase from 'firebase'
var appId = process.env.REACT_APP_API_URL;
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      lat: 35.693825,
      lng: 139.703356,
    }
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    })
    firebase.firestore().collection('test').doc('test').get()
      .then((doc)=>{})
  }
  change_coordinate = (lat, lng) =>{
    this.setState({
      lat: lat,
      lng: lng
    });
  }
  render(){
    return(
      <div className="App">
        <SerchPage />
        <BottomBar />
      </div>
    );
  }
}

export default App;
