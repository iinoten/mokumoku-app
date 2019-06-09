import React, {Component} from 'react';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

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
    console.log("clicked item", this.props.time)
    this.setState({ index_open_flag: !this.state.index_open_flag})
  }
  render(){
    return(
      <div>
        <ListItem button onClick={this.click_item_handler}>
          <ListItemText primary={this.props.done} secondary={this.props.time} />
          {this.state.index_open_flag ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.index_open_flag} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem style={{paddingLeft: '30px'}}>
              <ListItemText 
                primary={<Typography variant="body1">{this.props.place}</Typography>}
                secondary={this.props.date} />
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }
}

export default ReportItem;