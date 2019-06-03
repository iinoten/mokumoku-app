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
      this.setState({
        loading: false,
        user: user
      });
    });
  }
  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }
  logout(){
    firebase.auth().signOut()
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user.uid)
    });
  }

  render(){
      if (this.state.loading) return <div>loading</div>;
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