import React, {Component} from 'react';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './ReportItem.css'

class ReportItem extends Component{
  constructor() {
    super();
    this.state={
      index_open_flag: false
    }
  }
  click_item_handler = () => {
    console.log("clicked item")
    this.setState({ index_open_flag: !this.state.index_open_flag})
  }
  render(){
    return(
      <div>
        <ListItem button onClick={this.click_item_handler}>
          <ListItemText primary={this.props.done} />
        </ListItem>
        <Collapse in={this.state.index_open_flag} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button>
              <ListItemText primary={this.props.place} />
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }
}

export default ReportItem;