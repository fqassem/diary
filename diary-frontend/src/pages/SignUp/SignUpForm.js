import React from "react";
import styled from "styled-components";

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
    title: "",
    titleError: false,

    password: "",
    passwordError: false,

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
    const { email, password } = this.state;
    // do some validation here
    const formError = emailError || passwordError;

    this.setState(
      {
        emailError,
        contentError,
        formError
      },
      e => this.handleFormSubmit(e)
    );
  };

  handleFormSubmit = async e => {
    const { email, password, formError } = this.state;

    if (!formError) {
      this.setState({ formError: false, sending: true });

          firebase 
          .SignUp(email, password);
        this.setState({ sent: false, sending: false, error: error.message });
      
    }
  };

  render() {
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
        <SignUpLabel htmlFor="title">Username</SignUpLabel>
        <SignUpInput
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
              <SignUpError>
                An error occurred while SignUpg you in. Please try again.
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
