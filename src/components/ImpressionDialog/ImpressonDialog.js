import React, {Component} from 'react';
import firebase from 'firebase';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './ImpressionDialog.css'

class ImpressionDialog extends Component{
  constructor(props){
    super();
    console.log(props.overview)
    this.state={
      overview: props.overview,
      test: []
    }
  }
  onClick_close_handler = () => {
    this.props.close()
    console.log("power!!!!!!",this.props.overview)
  }
  componentDidMount(){
    console.log("hhhhhhhhhhhhhhhhhhh",Boolean([].length))
  }
  componentWillReceiveProps(props){
    console.log("~~~~~~~~~~~~~~~~~~~",props)
    this.setState({ impression_overview: props.overview })
  }
  getDerivedStateFromProps(){
    console.log("power!!!!!!",this.props.overview)
    console.log("fdjkgsduijgfioengiuh")
  }
  render(){
    let test = [];
    this.props.overview.forEach(element => {
      /**アイコンのURL 書き込み主の名前 口コミ 星評価 日付け 作業時間 */
      let icon_pict, user_name, impression, rating, date, time;
      /**投稿者の情報取得 */
      firebase.firestore().collection('users').doc(element.user_id).get()
        .then((doc)=>{
          let contributor_data = doc.data();
          icon_pict = contributor_data.icon_url ? contributor_data.icon_url : `${process.env.PUBLIC_URL}/picture/unknown_picture.png`;
          user_name = contributor_data.user_name ? contributor_data.user_name : 'unknown';
        })
        .catch((err)=>{
          console.log("Failed get contributor data:", err);
          icon_pict = `${process.env.PUBLIC_URL}/picture/unknown_picture.png`;
          user_name = 'unknown';
        })
      
      impression  = element.comment;
      rating      = element.rating;
      date        = element.date;
      time        = element.time;
      console.log(element)
      test.push(element.comment)
    });
    return(
      <Dialog
        open={this.props.open}
        scroll={'paper'}
      >
        <DialogTitle>"テスト"の口コミ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              test.map((element)=>{
                return element
              })
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.onClick_close_handler}
          >閉じる</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ImpressionDialog;