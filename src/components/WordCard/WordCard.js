import React, {Component} from 'react';

import './WordCard.css'

/**マテリアルアイコン導入 */
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

/*マテリアルUI導入*/


class WordCard extends Component{

  render(){
    return(
      <Card className="word-card">
        <CardContent>
          <Typography variant="h5" component="h2">
          Just Do It !!
          </Typography>
          <Typography component="p">
          Shia LaBeouf
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default WordCard;