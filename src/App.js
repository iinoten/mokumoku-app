import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import './App.css';

import MokumokuPage from './TopPage/MokumokuPage/MokumokuPage'
import SerchPage from './TopPage/SerchPage/SerchPage'
import AccountPage from './TopPage/AccountPage/AccountPage'

import BottomBar from './components/BottomBar/BottomBar'


import firebase from 'firebase'
var appId = process.env.REACT_APP_API_URL;
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      lat: 35.693825,
      lng: 139.703356,
      uid: ''
    }
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    })
    firebase.firestore().collection('test').doc('test').get()
      .then((doc)=>{})
  }
  update_uid = (uid) => {
    this.setState({ uid })
    console.log(uid)
  }
  change_coordinate = (lat, lng) =>{
    this.setState({
      lat: lat,
      lng: lng
    });
  }
  render(){
    return(
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/account' render={()=> <AccountPage test={"正解!!"} update_uid={this.update_uid} />} />
            <Route path='/mokumoku' render={()=> <MokumokuPage uid={this.state.uid} />} />
            <Route path='/search' render={()=> <SerchPage />} />
            <Redirect from='/' to='mokumoku' />
          </Switch>
          <BottomBar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
