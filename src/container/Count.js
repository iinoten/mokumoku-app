import React, {Component} from 'react';

class Count extends Component{
  constructor(props){
    super(props);
    this.state = { 
      count_s: 0,
      count_min: 0,
      count_h: 0,
      count_proceed: true
    }
  }
  count_up = () => {
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
    console.log("toggle")
  }
  componentDidMount(){
    setInterval(this.count_up, 5)
  }
  render(){
    return(
      <div onClick={this.toggle_count}><h1>{this.state.count_h}時間{this.state.count_min}分{this.state.count_s}秒</h1></div>
    );
  }
}

export default Count;