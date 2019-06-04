import React, {Component} from 'react';
import firebase from 'firebase'

import SignInScreen from '../../components/SignInScreen/SignInScreen'

import './AccountPage.css'

class AccountPage extends Component{
  constructor(){
    super();
    this.state={
      loading: true,
      user: null
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("hello",user)
      if(user){
        firebase.firestore().collection('users').doc(user.uid).get()
          .then((doc)=>{
            console.log(Boolean(doc.data()));
            if(!doc.data()){
              firebase.firestore().collection('users').doc(user.uid).set({
                name: user.displayName,
                total_mokumoku_time: 0,
                mokumoku_history: [],
                profile: {
                  self_profile: '',
                  sns_ID: {
                    twitter: '',
                    github: '',
                    facebook: ''
                  }
                }
              })
            }
          })
          .catch((err)=>{
            console("get Error:", err)
          })
        }
      });
              this.setState({
                loading: false,
                //user: user.uid
              });
  }
  logout = () => {
    firebase.auth().signOut().then(this.setState({user: null}))
    console.log("logout")
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      console.log("state change ",user)
      this.setState({
        user: user.uid
      })
    });
  }

  render(){
      if (this.state.loading)return <div>loading</div>;
    return (
      <div>
        Username: {this.state.user && this.state.user.displayName}
        <br />
        {this.state.user ?
          (<button onClick={this.logout}>Logout</button>) :
          (<SignInScreen />)
        }
      </div>
    );
  }
}

export default AccountPage;