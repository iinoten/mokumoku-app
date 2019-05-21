import React, {Component} from 'react';
import './App.css';
import NowPlace from './container/NowPlace'

import firebase from 'firebase'

var appId = process.env.REACT_APP_API_URL;
console.log("id:",appId)
class App extends Component{
  constructor(props){
    super(props)
      //firebase.initializeApp({
      //})
    }
    componentDidMount(){
      console.log("hello")
    }
    render(){
      return(
      <div className="App">
        <NowPlace />
    </div>
    );
  }
}

export default App;
