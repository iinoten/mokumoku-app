import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubHeader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button/Button';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './ReportDialog.css'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class ReportDialog extends Component{
  constructor(){
    super();
    this.state={
      open: false,
      list_open: false
    }
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handle_click_list = () => {
    this.setState({ list_open: !  this.state.list_open })
  }
  render(){
    return(
      <div>
        <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
          <DialogContent>
            <List 
              component="nav"
              subheader={
                <ListSubHeader component="div">もくもくレポート</ListSubHeader>
              }
            >
              <ListItem>
                <ListItemText primary="勉強" />
              </ListItem>
              <ListItem>
                <ListItemText primary="勉強" />
              </ListItem>
              <ListItem button onClick={this.handle_click_list}>
                <ListItemText primary="勉強" />
                {this.state.list_open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.list_open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button >
                    <ListItemText primary="Starred" />
                  </ListItem>
                </List>
              </Collapse>

            </List>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={console.log("clicked")}>
              完了!
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  }
}

export default ReportDialog;