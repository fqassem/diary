import React from "react";
import styled from "styled-components";
import firebase from '../../firebase';

const SignInLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const SignInError = styled.p`
  color: red;
  margin: 1rem 0;
`;

const SignInInput = styled.input`
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
    title: "",
    titleError: false,

    password: "",
    passwordError: false,

    formError: false,

    sent: false,
    sending: false,
    error: null
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        ...INITIAL_STATE
    };
  }

  validateForm = e => {
    e.preventDefault();
    const { email, password, emailError, passwordError } = this.state;
    // do some validation here
    const formError = emailError || passwordError;

    this.setState(
      {
        emailError,
        passwordError,
        formError
      },
      e => this.handleFormSubmit(e)
    );
  };

  handleFormSubmit = async e => {
    const { email, password, formError, error } = this.state;

    if (!formError) {
      this.setState({ formError: false, sending: true });

          firebase 
          .signIn(email, password);
        this.setState({ sent: false, sending: false, error: error.message });
      
    }
  };

  render() {
    const { emailError, passwordError } = this.state;
    return (
      <form action="#">
        {emailError && <SignInError>Please enter a valid email</SignInError>}
        <SignInLabel htmlFor="email">Username</SignInLabel>
        <SignInInput
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />

        {passwordError && (
          <SignInError>Please enter a valid password</SignInError>
        )}
        <SignInLabel htmlFor="title">Username</SignInLabel>
        <SignInInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />

        <div>
          <div>
            {this.state.error && (
              <SignInError>
                An error occurred while signing you in. Please try again.
              </SignInError>
            )}
          </div>

          {this.state.formError && (
            <SignInError>Please fix the form errors above.</SignInError>
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

export default SignInForm;
