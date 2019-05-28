import React, {Component} from 'react';

import WordCard from '../../components/WordCard/WordCard'
import StartButton from '../../components/StartButton/StartButton'
import CancelButton from '../../components/CancelButton/CancelButton'

import PopupReport from '../../components/PopupReport/PopupReport'
import ConfirmAlert from '../../components/ConfirmAlert/ConfirmAlert'

import Count from '../../container/Count'

const sec_delay = 100

class MokumokuPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      count_s: 0,
      count_min: 0,
      count_h: 0,
      have_count: false,

      counting_now: false,

      cancelable_count: 10, //これ20秒とかにしたほうがいいかもしれん

      form_open: false,
      confirm_open: false,
    }
  }

  decrement_cancelable_count = () => {
    if(this.state.cancelable_count > 0){this.setState({ cancelable_count: this.state.cancelable_count-1})}
  }
  count_up = () => {
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
  count_down_cancelable = () => {
    if(this.state.cancelable_count > 0){this.setState({ cancelable_count: this.state.cancelable_count -1 })}
  }
  onClick_start_button_handler = () => {
    this.setState({
      counting_now: !this.state.counting_now,
      cancelable_count: 10
    })
      this.mokumoku_timer = setInterval(this.count_up, sec_delay);
      this.count_down_cancelable_interval = setInterval(this.count_down_cancelable, sec_delay);
  }
  onClick_cancel_button_handler=()=>{
    clearInterval(this.count_down_cancelable_interval)
    clearInterval(this.mokumoku_timer)
    this.setState({
      count_h:0,
      count_min:0,
      count_s:0,
      cancelable_count:10,

      counting_now: !this.state.counting_now
    })
  }
  onClick_stop_button_handler = () => {
    console.log("clicked stop button!!!")
    this.setState({
      confirm_open: !this.state.confirm_open
    })
  }
  
  onClick_confirm_canccel_button = () => {
    this.setState({ confirm_open: !this.state.confirm_open })
  }
  onClick_confirm_ok_button=()=>{
    clearInterval(this.mokumoku_timer);
    this.setState({ 
      counting_now: !this.state.counting_now,
      confirm_open: !this.state.confirm_open,
      form_open: !this.state.form_open,
    })
    console.log("confirm ok", this.state.cancelable_count)
  }

  onClick_mokumoku_form_submit = () => {
    this.setState({ form_open:!this.state.form_open})
  }
  render(){
    return(
      <div>
        <WordCard />
        <PopupReport 
          open={this.state.form_open}
          onClick_submit={this.onClick_mokumoku_form_submit}
          mokumoku_h={this.state.count_h}
          mokumoku_min={this.state.count_min}/>
        <ConfirmAlert 
          open={this.state.confirm_open}
          onClick_ok={this.onClick_confirm_ok_button}
          onClick_cancel={this.onClick_confirm_canccel_button}/>
        {this.state.counting_now? 
          <CancelButton 
            cancelable_count={this.state.cancelable_count}
            onClick_stop_button={this.onClick_stop_button_handler}
            onCick_cancel_button={this.onClick_cancel_button_handler} />
          :
          <StartButton onClick={this.onClick_start_button_handler}/>
        }
      </div>
    );
  }
}

export default MokumokuPage;