import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import OutsideClickHandler from 'react-outside-click-handler';
import firebase from 'firebase';

import ImpressionDialog from '../ImpressionDialog/ImpressonDialog'

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
    super(props);
    this.state={
      copied: false,
      report_dialog: false,
      star_rating: props.rating,
      impression_dialog_open: false,

      impression_overview: []
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
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }
  open_overview = () => {
    this.setState({impression_dialog_open: true})
    console.log("id is here:", this.props.id)
    firebase.firestore().collection('mokumoku_space').doc(this.props.id).get()
      .then((doc) => {
        console.log("all impression is,", doc.data().impressions)
        this.setState({impression_overview: doc.data().impressions})
      })
  }
  close_overview = () => {
    this.setState({impression_dialog_open: false})
  }
  render(){
    return(
      <div>
        <ImpressionDialog 
          overview={this.state.impression_overview}
          open={this.state.impression_dialog_open}
          close={this.close_overview}
        />
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
              changeRating={(e)=>this.changeRating}
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
          <Button size="medium" onClick={this.open_overview}>詳細を見る</Button>
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