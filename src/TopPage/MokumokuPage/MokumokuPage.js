import React, {Component} from 'react';

import WordCard from '../../components/WordCard/WordCard'
import StartButton from '../../components/StartButton/StartButton'
import CancelButton from '../../components/CancelButton/CancelButton'

class MokumokuPage extends Component{
  render(){
    return(
      <div>
        <WordCard />
        <StartButton />
      </div>
    );
  }
}

export default MokumokuPage;