import React, {Component} from 'react';

/**マテリアルアイコン導入 */
import CloudOutlined from '@material-ui/icons/CloudOutlined'
import CloudQueueTwoTone from '@material-ui/icons/CloudQueueTwoTone'

import './Cloud.css'

class Cloud extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div>{this.props.light ? <div className="cloud"/> : <div className="sitenai_cloud" />}</div>
    );
  }
}

export default Cloud;