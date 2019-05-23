import React, {Component} from 'react';

import './StartButton.css'

/*マテリアルUI導入*/
import Button from '@material-ui/core/Button'

/**マテリアルアイコン導入 */

class StartButton extends Component{
  render(){
    return( 
      <Button
          variant="contained"
          size="large"
          color="primary"
          aria-label="Add"
          className="start-button"
          id="start-button"
        >
          はじめる
        </Button>

    );
  }
}

export default StartButton;