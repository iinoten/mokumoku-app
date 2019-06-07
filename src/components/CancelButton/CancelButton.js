import React, {Component} from 'react';

import './CancelButton.css'
  /*マテリアルUI導入*/
import Button from '@material-ui/core/Button'

  
  class CancelButton extends Component{
    constructor(props) {
      super();
    }
    onClick_stop_button_handler = () => {
      this.props.onClick_stop_button()
    }
    onClick_cancel_button_handler = () => {
      this.props.onCick_cancel_button()
    }
    render(){
      let cancel_Button = 
        <Button 
          variant="outlined" 
          size="medium" 
          color="primary" 
          className="cancel-button" 
          id="cancel-button"
          onClick={this.onClick_cancel_button_handler}>
            キャンセルする({this.props.cancelable_count }) 
          </Button>;
      let finish_Button =
        <Button 
          variant="outlined" 
          size="medium" 
          color="primary" 
          className="cancel-button" 
          id="cancel-button"
          onClick={this.onClick_stop_button_handler}>
          おわる 
        </Button>;
      return(
        <div>
        {this.props.cancelable_count ? cancel_Button : finish_Button}
        </div>
      );
    }
  }

  
  
  export default CancelButton;