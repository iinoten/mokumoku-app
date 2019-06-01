import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined'
import AvTimer from '@material-ui/icons/Timer'

import StarRatingComponent from 'react-star-rating-component';

import './PopupCard.css'

class PopupCard extends Component{
  constructor(){
    super();
    this.state={
      copied: false
    }
  }
  render(){
    return(
      <Card id="popup-card">
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
          <Button size="medium">詳細を見る</Button>
          <CopyToClipboard
            text={this.props.address}
            onCopy={() => this.setState({copied: true})}>
            <Button size="medium">住所をコピペする</Button>
          </CopyToClipboard>
        </CardActions>
      </Card>
    );
  }
}

export default PopupCard;