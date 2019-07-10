
import React from 'react';
import validate from 'validate.js';
import { Link, withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles'

import {SIGN_UP} from '../../constants/routes';
import withSnackbar from '../../hoc/withSnackbar';
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
  createAccount: {
    marginTop: theme.spacing.unit * 2
  }
});

const INITIAL_STATE = {
  email: "",

  password: "",

  errors: false,

  sent: false,
  sending: false,
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const errors = validate({
      email,
      password
    }, {
        email: constraints.email,
        password: constraints.password
      });

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({
        errors: null,
        sending: true
      }, () => this.signInUser(email, password)
      )
    }
  }

  signInUser = async (email, password) => {
    try {
      await this.props.signIn(email, password);
    } catch(e) {
      this.setState({
        errors: e
      });
      this.props.showSnackbar(e.message);
    } finally {
      this.setState({
        sending: false
      });
    }
  }

  render() {
    const { email, sending, password, errors } = this.state;
    const { classes } = this.props;

    return (
      <Grid component="main" maxWidth="xs" className={classes.main}>
        <div className={classes.paper}>
          <Avatar className={styles.avatar}>
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
          </form>
          <div>
            <Button color="primary" disabled={(!email || !password) || sending} variant="contained" onClick={this.handleSignIn} className={classes.submit}>Sign In</Button>
          </div>
          <Typography className={classes.createAccount} variant="subtitle1">
            Don't have an account? <Link to={SIGN_UP}>Create one here!</Link>
          </Typography>
        </div>
      </Grid>
    );
  }
}

export { SignInForm };
export default withStyles(styles)(withSnackbar(withRouter(SignInForm)));
