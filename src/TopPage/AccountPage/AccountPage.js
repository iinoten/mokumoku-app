import React, {Component} from 'react';
import firebase from 'firebase'

import SignInScreen from '../../components/SignInScreen/SignInScreen'
import ReadyLogin from '../../components/ReadyLogin/ReadyLogin'

import ReportDialog from '../../components/ReportDialog/ReportDialog'
import './AccountPage.css'

class AccountPage extends Component{
  constructor(){
    super();
    this.state={
      loading: true,
      user: null,

      user_photoURL: '',
      user_name: '',
      user_profile: '',
      dialog_open: false,
      dialog_data: []
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        let user_photoURL = user.photoURL.replace('normal.jpg', '400x400.jpg')
        let user_name = user.displayName;
        this.setState({ user_photoURL, user_name })
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
            console.log("get Error:", err)
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

  onClick_report_bar = () => {
    this.setState({dialog_open: !this.state.dialog_open})
    //console.log("clicked report bar", this.props.uid)
  }
  onClick_config_bar = () => {
    console.log("clicked config bar")
  }
  onClick_description_bar = () => {
    console.log('clicked description bar')
  }

  onClick_dialog_button_handler = () => {
    this.setState({dialog_open: !this.state.dialog_open})
  }
  componentWillReceiveProps() {
  }

  render(){
      if (this.state.loading)return <div>loading</div>;
    return (
      <div>
        <ReportDialog 
          open={this.state.dialog_open} 
          onClick_dialog_button_handler={this.onClick_dialog_button_handler}
          uid={this.state.user}/>
        <br />
        {this.state.user ?
          (<ReadyLogin 
            onClick_config_bar={this.onClick_config_bar}
            onClick_report_bar={this.onClick_report_bar}
            onClick_description_bar={this.onClick_description_bar}
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