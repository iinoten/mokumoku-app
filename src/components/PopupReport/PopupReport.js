import React, {Component} from 'react';
import Rating from 'material-ui-rating'

import './PopupReport.css'

/*マテリアルUI導入*/
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class PopupReport extends Component{
  onClick_submit_button = () => {
    this.props.onClick_submit()
  }
  render(){
    return(
      <div>
        <Dialog open={this.props.open}aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{this.props.mokumoku_h}時間{this.props.mokumoku_min}分，おつかれさまでした</DialogTitle>
        <DialogContent>
          <DialogContentText>
            もくもくの成果はどうでしたか？ フォームに記録しましょう!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="もくもくした場所の名前"
            helperText="例：スターバックス，コワーキングスペースの名前"
            fullWidth
            autoComplete="off"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="もくもくしたこと"
            helperText="例：学校の課題を進めました! プログラミングの勉強をしました"
            fullWidth
            autoComplete="off"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="もくもくした感想"
            helperText="例：静かな場所で集中できました"
            fullWidth
            multiline
            autoComplete="off"
          />
          場所の評価
          <Rating
          value={3}
          max={5}
          onChange={(value) => console.log(`Rated with value ${value}`)}
        />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.onClick_submit_button}>
            完了!
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default PopupReport;