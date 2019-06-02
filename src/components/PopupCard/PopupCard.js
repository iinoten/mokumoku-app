import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import OutsideClickHandler from 'react-outside-click-handler';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined'
import AvTimer from '@material-ui/icons/Timer'

import StarRatingComponent from 'react-star-rating-component';

import './PopupCard.css'

class PopupCard extends Component{
  constructor(props){
    super();
    console.log(props.open_flag)
    this.state={
      copied: false,
      report_dialog: false
    }
  }
  onClick_copy_button = () => {
    this.setState({copied: true, report_dialog: true})
    setTimeout(()=>this.setState({report_dialog: false}), 1000)
  }
  onClick_close_button_handler = () => {
    this.props.close_handler()
  }
  componentDidMount(){
    this.setState({popup_open: this.props.open_flag})
  }
  render(){
    console.log(this.state.popup_open)
    return(
      <div>
      <Dialog
        open={this.state.report_dialog}
      >
        <DialogContent>
          <DialogContentText>
            コピーしました
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Card id="popup-card" style={{display: this.props.open_flag ? '' : 'none'}}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.title}
          </Typography>
          <div><StarRatingComponent
              name="評価"
              value={this.props.rating}
            /></div>
          <AvTimer color="action"/>みんなの平均もくもく時間：{this.props.ave_time}時間
          <div>
            <Typography variant="body2" component="p">
            <LocationOnOutlined color="action"/>
            {this.props.address}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="medium" onClick={console.log()}>詳細を見る</Button>
          <CopyToClipboard
            text={this.props.address}
            onCopy={this.onClick_copy_button}>
            <Button size="medium">住所をコピーする</Button>
          </CopyToClipboard>
          <Button size="medium" onClick={this.onClick_close_button_handler}>閉じる</Button>
        </CardActions>
      </Card>
      </div>
    );
  }
}

export default PopupCard;