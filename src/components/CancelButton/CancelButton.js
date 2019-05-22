import React, {Component} from 'react';

import './CancelButton.css'
  /*マテリアルUI導入*/
import Button from '@material-ui/core/Button'

  
  class CancelButton extends Component{
    render(){
      return(
        <Button 
          variant="outlined" 
          size="medium" 
          color="primary" 
          className="cancel-button" 
          id="cancel-button"
        >
          おわる
        </Button>
      );
    }
  }
  
  export default CancelButton;