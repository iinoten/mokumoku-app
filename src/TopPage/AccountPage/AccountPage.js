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
      let user_photoURL = user.photoURL.replace('normal.jpg', '400x400.jpg')
      let user_name = user.displayName;
      this.setState({ user_photoURL, user_name })
      if(user){
        firebase.firestore().collection('users').doc(user.uid).get()
          .then((doc)=>{
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
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          user: user.uid
        })
        this.props.update_uid(user.uid)
      }
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