import React, {Component} from 'react';
import firebase from 'firebase'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List'
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
import ListSubHeader from '@material-ui/core/ListSubheader';
//import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button/Button';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ReportItem from '../ReportItem/ReportItem'

import './ReportDialog.css'

var sample_report = [
  {
    done: "仕事の勉強",
    place: "ハッカースペース新宿",
    time: {h: 2, min: 30},
    date: "2019/6/9 17:54"
  },
  {
    done: "仕事の勉強",
    place: "ハッカースペース新宿",
    time: {h: 0, min: 30},
    date: "2019/6/9 17:54"
  },
  {
    done: "仕事の勉強",
    place: "ハッカースペース新宿",
    time: {h: 2, min: 30},
    date: "2019/6/9 17:54"
  },
  {
    done: "仕事の勉強",
    place: "ハッカースペース新宿",
    time: {h: 2, min: 30},
    date: "2019/6/9 17:54"
  },
  {
    done: "仕事の勉強",
    place: "ハッカースペース新宿",
    time: {h: 2, min: 30},
    date: "2019/6/9 17:54"
  }
]

class ReportDialog extends Component{
  constructor(){
    super();
    this.state={
      open: false,
      list_open: false,
      work_log: []
    }
  }
  componentDidMount(){
    console.log(this.props.uid)
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handle_click_list = () => {
    this.setState({ list_open: !  this.state.list_open })
  }
  onClick_dialog_button_handler = () => {
    this.props.onClick_dialog_button_handler()
  }
  componentWillReceiveProps(){
    let tmp_work_log = [];
    if(this.props.uid){
      firebase.firestore().collection('users').doc(this.props.uid).get()
        .then((doc)=>{
          console.log(doc.data())
          doc.data().mokumoku_history.map((item, i)=>{
            tmp_work_log.unshift({
              time: {h: item.time.h, min: item.time.min},
              done: item.done,
              date: (item.date? item.date : null),
              place: item.place_id
            })
          })
        })
        .catch((err)=>{
          console.log("Failed get user mokumoku data", err)
        })
      this.setState({work_log: tmp_work_log})
    }
  }
  render(){
    console.log(this.state.work_log)
    return(
      <div>
        <Dialog 
          maxWidth="sm"
          fullWidth={true}
          open={this.props.open} 
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <List 
              component="nav"
              subheader={
                <ListSubHeader component="div">もくもくレポート</ListSubHeader>
              }
            >
            <div style={{overflow: "auto", maxHeight: '40vh'}}>
              {
                sample_report.map((item, i)=>{
                  return (
                    <div>
                      <ReportItem
                        time={(item.time.h ? item.time.h + "時間" : null) + item.time.min + "分"}
                        place={item.place}
                        done={item.done}
                        date={item.date}
                      />
                    </div>
                  )
                })
              }
            </div>
            </List>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.onClick_dialog_button_handler}>
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  }
}

export default ReportDialog;