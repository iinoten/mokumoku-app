import React, {Component} from 'react';

  /*マテリアルUI導入*/
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import './ConfirmAlert.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ConfirmAlert extends Component{
  onClose_handler = () => {
    console.log("close confirm popup")
    this.props.onClick_cancel()
  }
  render(){
    return(
    <Dialog
      open={this.props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={this.onClose_handler}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"進捗どうですか"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          2時間もくもくしました．終わりますか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.onClose_handler} color="primary">
          つづける
        </Button>
        <Button onClick={this.onClose_handler} color="primary">
          おわる
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
}

export default ConfirmAlert;