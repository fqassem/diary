import React from "react";
import styled from "styled-components";

import firebase from "../../firebase";

import { SIGN_IN } from "../../constants/routes";
import SignUpForm from "./SignUpForm";

const SignUpWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: 40em) {
    width: 60%;
  }
`;

const SignUpTitle = styled.h2`
  text-align: center;
`;

class SignUp extends React.Component {
  signUp = async (email, password) => {
    try {
      await firebase.signUp(email, password);
      this.props.history.push(SIGN_IN);
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    return (
      <SignUpWrapper>
        <SignUpTitle>Sign Up</SignUpTitle>
        <SignUpForm signUp={this.signUp} />
      </SignUpWrapper>
    );
  }
}

export default SignUp;
