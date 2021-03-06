import React, {Component} from 'react';
import { withRouter } from 'react-router';

import './BottomBar.css'

/*マテリアルUI導入*/
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withStyles } from "@material-ui/core/styles";

/**マテリアルアイコン導入 */
import FaceRounded from '@material-ui/icons/FaceRounded'
import ComputerOutlined from '@material-ui/icons/ComputerOutlined'
import PlaceOutlined from '@material-ui/icons/PlaceOutlined'

const styles = {
  root: {
    color: "gray",
    "&$selected": {
      color: "#31893d",
    }
  },
  selected: {}
};
class BottomBar extends Component{
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  onClick_Account_nav=()=>{
    this.props.history.push('/account');
  }
  onClick_Mokumoku_nav=()=>{
    this.props.history.push('/mokumoku');
  }
  onClick_Serch_nav=()=>{
    this.props.history.push('/search');
  }
  render(){
    const actionClasses = this.props.classes;
    return(
      <BottomNavigation value={this.state.value} showLabels={true} onChange={this.handleChange} className="bottom-bar" >
          <BottomNavigationAction
            classes={actionClasses}
            label="Account"
            icon={<FaceRounded/>}
            onClick={this.onClick_Account_nav}
          />

          <BottomNavigationAction
            classes={actionClasses}
            label="Mokumoku"
            icon={<ComputerOutlined/>}
            onClick={this.onClick_Mokumoku_nav}
          />

          <BottomNavigationAction
            classes={actionClasses}
            label="Serch"
            icon={<PlaceOutlined />}
            onClick={this.onClick_Serch_nav}
          />
        </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(BottomBar));