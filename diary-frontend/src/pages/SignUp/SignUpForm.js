import React from "react";
import styled from "styled-components";
import firebase from "../../firebase";
import { SIGN_IN } from '../../constants/routes';

const SignUpLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SignUpError = styled.p`
  color: red;
  margin: 1rem 0;
`;

const SignUpInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;

  @media (min-width: 40em) {
    min-width: 250px;
    max-width: 600px;
  }
`;

const SubmitButton = styled.input`
  padding: 1rem;
  border: 1px solid black;
`;

const INITIAL_STATE = {
  email: "",
  emalError: false,

  password: "",
  passwordError: false,

  confirmPassword: "",
  confirmPasswordError: false,

  formError: false,

  sent: false,
  sending: false,
  error: null
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  validateForm = e => {
    e.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      emailError,
      passwordError,
      confirmPasswordError
    } = this.state;
    // do some validation here
    const formError = emailError || passwordError || confirmPasswordError;

    this.setState(
      {
        emailError,
        passwordError,
        confirmPasswordError,
        formError
      },
      e => this.handleFormSubmit(e)
    );
  };

  handleFormSubmit = async e => {
    const { email, password, formError, error } = this.state;

    if (!formError) {
      this.setState({ formError: false, sending: true });

      firebase.signUp(email, password)
      .then(authUser => {
        this.props.history.push(SIGN_IN);
      })
      .catch(error => {
        this.setState({ error });
      });
    }
  };

  render() {
    const { emailError, passwordError, confirmPasswordError} = this.state;
    return (
      <form action="#">
        {emailError && <SignUpError>Please enter a valid email</SignUpError>}
        <SignUpLabel htmlFor="email">Username</SignUpLabel>
        <SignUpInput
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />

        {passwordError && (
          <SignUpError>Please enter a valid password</SignUpError>
        )}
        <SignUpLabel htmlFor="password">Password</SignUpLabel>
        <SignUpInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />


        {confirmPasswordError && (
          <SignUpError>Your password doesn't match</SignUpError>
        )}
        <SignUpLabel htmlFor="password">Confirm Password</SignUpLabel>
        <SignUpInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          onChange={e => this.setState({ confirmPassword: e.target.value })}
        />

        <div>
          <div>
            {this.state.error && (
              <SignUpError>
                An error occurred while signing you in. Please try again.
              </SignUpError>
            )}
          </div>

          {this.state.formError && (
            <SignUpError>Please fix the form errors above.</SignUpError>
          )}
          <div>
            <SubmitButton
              type="submit"
              onClick={e => this.validateForm(e)}
              value="Send"
              disabled={this.state.sending || this.state.sent || this.formError}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
