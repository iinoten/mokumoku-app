import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './ImpressionDialog.css'

class ImpressionDialog extends Component{
  onClick_close_handler = () => {
    this.props.close()
  }
  render(){
    return(
      <Dialog
        open={this.props.open}
        scroll={'paper'}
      >
        <DialogTitle>"テスト"の口コミ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            口コミ評価口コミ評価口コミ評価口コミ評価口コミ評価
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