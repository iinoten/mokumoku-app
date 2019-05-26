import React, {Component} from 'react';

import WordCard from '../../components/WordCard/WordCard'
import StartButton from '../../components/StartButton/StartButton'
import CancelButton from '../../components/CancelButton/CancelButton'

import Count from '../../container/Count'

class MokumokuPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      count_s: 0,
      count_min: 0,
      count_h: 0,
      count_proceed: false,
      have_count: false,

      counting_now: false,

      cancelable_count: 10
    }
  }

  decrement_cancelable_count = () => {
    if(this.state.cancelable_count > 0){this.setState({ cancelable_count: this.state.cancelable_count-1})}
  }
  count_up = () => {
    console.log("もくもくたいまー",this.state.count_h, this.state.count_min, this.state.count_s)
    this.setState({ count_s: this.state.count_s +1});
    if(this.state.count_s === 60) {
      this.setState({
        count_min: this.state.count_min +1,
        count_s: 0
      }) 
    } else if(this.state.count_min === 60) {
      this.setState({
        count_h: this.state.count_h +1,
        count_min: 0
      }) 
    }
  }
  onClick_start_button_handler = () => {
    console.log("clicked start button!!!")
    this.setState({counting_now: !this.state.counting_now})
      this.mokumoku_timer = setInterval(this.count_up, 1000);
  }
  reset_count = () => {
    this.setState({
      count_h:0,
      count_min:0,
      count_s:0,
    })
    this.setState({counting_now: !this.state.counting_now})
  }

  onClick_stop_button_handler = () => {
    console.log("clicked stop button!!!")
    clearInterval(this.mokumoku_timer);
    this.setState({
      counting_now: !this.state.counting_now
    })
  }
  render(){
    return(
      <div>
        <WordCard />
        <Count />
        {this.state.counting_now? 
          <CancelButton 
            onClick={this.onClick_stop_button_handler} />
          :
          <StartButton onClick={this.onClick_start_button_handler}/>
        }
      </div>
    );
  }
}

export default MokumokuPage;