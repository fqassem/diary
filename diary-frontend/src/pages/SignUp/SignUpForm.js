
import React from 'react';
import validate from 'validate.js';
import { withRouter } from "react-router-dom";
import withSnackbar from '../../hoc/withSnackbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles'

import { SIGN_IN } from "../../constants/routes";

import constraints from '../../constraints';

const styles = theme => ({
  main: {
      width: 'auto',
      display: 'block',
      margin: '0 auto',
      maxWidth: '500px',
      minHeight: '100vh'
  },
  paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing.unit * 2,
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%',
      marginTop: theme.spacing.unit,
  },
  submit: {
      marginTop: theme.spacing.unit * 2,
  },
  resetPassword: {
    marginTop: theme.spacing.unit * 2
  }
});

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: "",

  errors: null,
  sent: false,
  sending: false
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;

    const errors = validate({
      email,
      password,
      confirmPassword
    }, {
        email: constraints.email,
        password: constraints.password,
        confirmPassword: constraints.confirmPassword
      });

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({
        errors: null,
        sending: true
      }, () => this.signUpUser(email, password)
      )
    }
  }

  signUpUser = async (email, password) => {
    try {
      await this.props.signUp(email, password);
      this.props.history.push(SIGN_IN);
    } catch (e) {
      this.setState({
        errors: e,
      });
      this.props.showSnackbar(e.message);
    } finally {
      this.setState({
        sending: false
      })
    }
  }

  render() {
    const { email, password, confirmPassword, sending, errors } = this.state;
    const { classes } = this.props;

    return (
      <Grid container component="main" maxWidth="xs" className={classes.main}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form className={classes.form}>
            <TextField
              autoComplete="email"
              error={!!(errors && errors.email)}
              fullWidth
              helperText={(errors && errors.email) ? errors.email[0] : ''}
              margin="normal"
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="E-mail address"
              required
              type="email"
              value={email}
            />
            <TextField
              autoComplete="current-password"
              error={!!(errors && errors.password)}
              fullWidth
              helperText={(errors && errors.password) ? errors.password[0] : ''}
              margin="normal"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Password"
              required
              type="password"
              value={password}
            />

            <TextField
              autoComplete="confirm-password"
              error={!!(errors && errors.confirmPassword)}
              fullWidth
              helperText={(errors && errors.confirmPassword) ? errors.confirmPassword[0] : ''}
              margin="normal"
              onChange={e => this.setState({ confirmPassword: e.target.value })}
              placeholder="Confirm Password"
              required
              type="password"
              value={confirmPassword}
            />
          </form>
          <div>
            <Button color="primary" disabled={(!email || !password || !confirmPassword) || sending} variant="contained" onClick={this.handleSignUp} className={classes.submit}>Sign Up</Button>
          </div>
        </div>
      </Grid>
    );
  }
}

export { SignUpForm }
export default withStyles(styles)(withSnackbar(withRouter(SignUpForm)));
