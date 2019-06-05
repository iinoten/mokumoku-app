import React, {Component} from 'react';
import firebase from 'firebase'

import SignInScreen from '../../components/SignInScreen/SignInScreen'
import ReadyLogin from '../../components/ReadyLogin/ReadyLogin'

import './AccountPage.css'

class AccountPage extends Component{
  constructor(){
    super();
    this.state={
      loading: true,
      user: null,

      user_photoURL: '',
      user_name: '',
      user_profile: ''
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("hello",user.photoURL.replace('normal.jpg', '400x400.jpg'))
      let user_photoURL = user.photoURL.replace('normal.jpg', '400x400.jpg')
      console.log(user)
      let user_name = user.displayName;
      this.setState({ user_photoURL, user_name })
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
        <br />
        {this.state.user ?
          (<ReadyLogin 
            user_name={this.state.user_name}
            user_photoURL={this.state.user_photoURL}
          />) :
          (<SignInScreen />)
        }
      </div>
    );
  }
}

export default AccountPage;