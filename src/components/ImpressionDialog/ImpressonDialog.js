import React, {Component} from 'react';
import firebase from 'firebase';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import './ImpressionDialog.css'

class ImpressionDialog extends Component{
  constructor(props){
    super();
    this.state={
      overview: props.overview,
      test: []
    }
  }
  onClick_close_handler = () => {
    this.props.close()
  }
  componentWillReceiveProps(props){
    this.setState({ impression_overview: props.overview })
  }
  render(){
    let test = [];
    this.props.overview.forEach(element => {
      /**アイコンのURL 書き込み主の名前 口コミ 星評価 日付け 作業時間 */
      let icon_pict, user_name, impression, rating = '', date, time;
      /**投稿者の情報取得 */
      firebase.firestore().collection('users').doc(element.user_id).get()
        .then((doc)=>{
          let contributor_data = doc.data();
          icon_pict = contributor_data.icon_url;
          user_name = contributor_data.name;
        })
        .catch((err)=>{
          icon_pict = `${process.env.PUBLIC_URL}/picture/unknown_icon.png`;
          user_name = "unknown";
        })
      
      impression  = element.comment;
      for (let i = 0; i < 5; i++) {
        if(element.rating > i ) {
          rating += '★'
        } else {
          rating += '☆'
        }
      }
      console.log(icon_pict, user_name)
      date        = element.date;
      time        = element.time;
      test.push(
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={icon_pict} />
          </ListItemAvatar>
          <ListItemText
          primary={user_name ? user_name : 'unknown'}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {date + "　" + time}時間もくもくしました！
              </Typography>
              {rating + " — "+ impression}
            </React.Fragment>
          }
        />
        </ListItem>
      )
    });
    return(
      <Dialog
        open={this.props.open}
        scroll={'paper'}
      >
        <DialogTitle>"テスト"の口コミ</DialogTitle>
        <DialogContent>
          <List>
            {test.map((element)=>{
              return element
            })}
          </List>
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