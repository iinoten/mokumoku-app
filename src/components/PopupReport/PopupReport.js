import React, {Component} from 'react';
import Rating from 'material-ui-rating'
import firebase from 'firebase';

import './PopupReport.css'

/*マテリアルUI導入*/
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip'

class PopupReport extends Component{
  constructor(props){
    super();
    this.state={
      rating: props.rating,
      form_place_name: '',
      form_do_phrase: '',
      form_impression: '',
      inference_place: null,

      add_review_mode: false, //trueで既存の場所にレビューの追加をするように
      inference_place_id: null,
    }
  }
  onClick_submit_button = () => {
    //新規の場所を追加
    if(!this.state.add_review_mode){
      let place_unique_id = this.get_Unique_Str()
      this.props.onClick_submit(
        this.state.form_do_phrase,  //なにをもくもくしたか
        this.props.mokumoku_h,      //何時間もくもくしたか
        this.props.mokumoku_min,    //何分もくもくしたか
        place_unique_id,
        this.state.rating,
        this.state.form_impression, //場所の感想
        this.state.form_place_name, //場所の名前
      )
    } else {
      //既存の場所にレビューを追加
      this.props.add_review(this.state.inference_place_id, this.state.form_impression)
    }
  }
  onClick_star_rating = (rating) => {
    this.setState({ rating })
  }
  onChange_place_name_form = (e) => {
    this.setState({form_place_name: e.target.value})
  }
  onChange_do_phrase_form = (e) => {
    this.setState({form_do_phrase: e.target.value})
  }
  onChange_form_impression = (e) => {
    this.setState({ form_impression: e.target.value})
  }
  get_Unique_Str = (myStrong) => {
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
   }
   onClick_inference_delete_button = () => {
     console.log("clicked delete button")
     this.setState({ 
       inference_place: null,
       add_review_mode: false
      })
   }
   onClick_inference_chip = (data) => {
     this.props.onClick_inference_chip(data.id);
     this.setState({
       inference_place: <Chip label={data.name} onDelete={this.onClick_inference_delete_button} variant="outlined" />,
       add_review_mode: true,
       inference_place_id: data.id
     })
   }
  render(){
    let anti_place_chip = [];
    for (let i = 0; i < this.props.near_place.length; i++) {
       const element = this.props.near_place[i]; 
       anti_place_chip.push(<Chip className="anti-place-chip" label={element.name} key={i} onClick={() => this.onClick_inference_chip(element)} />) 
    }
    return(
      <div>
        <Dialog open={this.props.open}aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{this.props.mokumoku_h}時間{this.props.mokumoku_min}分，おつかれさまでした</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.mokumoku_h + this.props.mokumoku_min}もくもくの成果はどうでしたか？ フォームに記録しましょう!
          </DialogContentText>
          {
            this.state.inference_place ?
              <div id="inference-input-chip">{this.state.inference_place}</div>
            :
              <TextField
                value={this.state.form_place_name}
                onChange={e=>this.onChange_place_name_form(e)}
                autoFocus
                margin="dense"
                id="name"
                label="もくもくした場所の名前"
                helperText="例：スターバックス，コワーキングスペースの名前"
                fullWidth
                autoComplete="off"
              />
          }
          もしかして：{anti_place_chip}
          <TextField
            value={this.state.form_do_phrase}
            onChange={e=>this.onChange_do_phrase_form(e)}
            autoFocus
            margin="dense"
            id="name"
            label="もくもくしたこと"
            helperText="例：学校の課題を進めました! プログラミングの勉強をしました"
            fullWidth
            autoComplete="off"
          />
          <TextField
            value={this.state.form_impression}
            onChange={e=>this.onChange_form_impression(e)}
            autoFocus
            margin="dense"
            id="name"
            label="もくもくした感想"
            helperText="例：静かな場所で集中できました"
            fullWidth
            multiline
            autoComplete="off"
          />
          場所の評価
          <Rating
          value={this.state.rating}
          max={5}
          onChange={(value) => this.onClick_star_rating(value)}
        />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.onClick_submit_button}>
            完了!
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default PopupReport;