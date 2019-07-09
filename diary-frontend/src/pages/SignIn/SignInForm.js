
import React from 'react';
import validate from 'validate.js';
import { withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import constraints from '../../constraints';

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
      })
    } finally {
      this.setState({
        sending: false
      })
    }
  }

  render() {
    const { email, sending, password, errors } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form>
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
            <Button color="primary" disabled={(!email || !password) || sending} variant="contained" onClick={this.handleSignIn}>Sign In</Button>
          </div>
        </div>
      </Container>
    );
  }
}

export { SignInForm }
export default withRouter(SignInForm);
