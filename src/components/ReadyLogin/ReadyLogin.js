import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ShowChart from '@material-ui/icons/ShowChart'
import SettingsTwoTone from '@material-ui/icons/SettingsTwoTone'
import LiveHelpOutlined from '@material-ui/icons/LiveHelpOutlined'

import './ReadyLogin.css'



class ReadyLogin extends Component{
  render(){
    return(
      <div>
        <Grid container justify="center" alignItems="center">
          <Avatar 
            alt="Remy Sharp" 
            src={this.props.user_photoURL} 
            style={{margin: 10, width: 120, height: 120, marginTop: 50}}
          />
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Typography variant="h6">{this.props.user_name}</Typography>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <List>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ShowChart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="もくもくレポート" secondary="最近のもくもく，今までのもくもくした履歴" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <SettingsTwoTone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="設定" secondary="アカウントプロフィールの変更や各種の設定" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <LiveHelpOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="このサービスについて" secondary="もくもくappについて" />
              </ListItem>
          </List>
        </Grid>
      </div>
    );
  }
}

export default ReadyLogin;