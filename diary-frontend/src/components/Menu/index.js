import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  withRouter
} from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import PersonIcon from '@material-ui/icons/Person';

import * as routes from '../../constants/routes';

const styles = (theme) => ({
 button: {
   textTransform: 'none',
   fontWeight: '500',
 }
});

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        anchorEl: null
      }
    };
  }

  openMenu = (event) => {
    const anchorEl = event.currentTarget;

    this.setState({
      menu: {
        anchorEl
      }
    });
  };

  closeMenu = () => {
    this.setState({
      menu: {
        anchorEl: null
      }
    });
  };

  handleSignOutClick = () => {
    this.closeMenu();
    this.props.onSignOutClick();
  };

  toCreatePost = () => {
    this.props.history.push(routes.CREATE);
  }

  toBlog = () => {
    this.props.history.push(routes.BLOG);
  }

  toHome = () => {
    this.props.history.push(routes.HOME);
  }

  onSignInClick = () => {
    this.props.history.push(routes.SIGN_IN);
  }

  onSignUpClick = () => {
    this.props.history.push(routes.SIGN_UP);
  }

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { title, isSignedIn, user } = this.props;

    const { menu } = this.state;

    return (
      <AppBar color="transparent" position="static" style={{boxShadow: 'none'}} >
        <Toolbar variant="regular">
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">{title}</Typography>

          {isSignedIn &&
            <React.Fragment>
              <IconButton color="inherit" onClick={this.openMenu}>
                {user.photoURL ? <Avatar alt="Avatar" src={user.photoURL} /> : <PersonIcon />}
              </IconButton>

              <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={this.closeMenu}>

                <MenuItem onClick={this.toBlog}>Blog</MenuItem>
                <MenuItem onClick={this.toCreatePost}>Create Post</MenuItem>

                <MenuItem onClick={this.handleSignOutClick}>Sign out</MenuItem>
              </Menu>
            </React.Fragment>
          }

          {!isSignedIn &&
            <React.Fragment>
              <Button className={classes.button} onClick={this.toHome}>Home</Button>
              <Button className={classes.button} onClick={this.onSignUpClick}>Sign Up</Button>
              <Button className={classes.button} onClick={this.onSignInClick}>Sign In</Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,

  title: PropTypes.string.isRequired,
  isSignedIn: PropTypes.bool.isRequired,

  onSignOutClick: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(Bar));
