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
      have_count: false
    }
  }

  count_up = () => {
    console.log(this.state.count_h, this.state.count_min, this.state.count_s)
    if(this.state.count_proceed){this.setState({ count_s: this.state.count_s +1})}
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
  toggle_count = () => {
    this.setState({ count_proceed: !this.state.count_proceed })
    if(this.state.count_proceed){console.log("stop")}
    else{console.log("start")}
  }
  componentDidMount(){
  }
  onClick_start_button_handler = () => {
    this.toggle_count()
    if(!this.state.have_count){
      setInterval(this.count_up, 1000)
      this.setState({have_count: true})
    }
  }
  render(){
    return(
      <div>
        <WordCard />
        <Count />
        <StartButton onClick={this.onClick_start_button_handler}/>
      </div>
    );
  }
}

export default MokumokuPage;