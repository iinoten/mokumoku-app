import React, {Component} from 'react';
import './BottomBar.css'

/*マテリアルUI導入*/
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

/**マテリアルアイコン導入 */
import FaceRounded from '@material-ui/icons/FaceRounded'
import ComputerOutlined from '@material-ui/icons/ComputerOutlined'
import PlaceOutlined from '@material-ui/icons/PlaceOutlined'

const styles = {
  root: {
    width: 500,
  },
};
class BottomBar extends Component{
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render(){
    const { value } = this.state;
    return(
      <BottomNavigation
        className="bottom-bar"
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="account" icon={<FaceRounded />} />
        <BottomNavigationAction label="mokumoku" icon={<ComputerOutlined />} />
        <BottomNavigationAction label="serch" icon={<PlaceOutlined />} />
      </BottomNavigation>
    );
  }
}

export default BottomBar;