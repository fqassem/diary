import React from "react";
import styled from "styled-components";

import firebase from "../../firebase";

import { BLOG } from "../../constants/routes";
import SignInForm from "./SignInForm";

const SignInWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  @media (min-width: 40em) {
    width: 60%;
  }
`;

const SignInTitle = styled.h2`
  text-align: center;
`;

class SignIn extends React.Component {
  signIn = async (email, password) => {
     try {
       await firebase.signIn(email, password);
        this.props.history.push(BLOG);
     } catch(e) {
       throw new Error(e);
     }
  };

  render() {
    return (
      <SignInWrapper>
        <SignInTitle>Sign In</SignInTitle>
        <SignInForm signIn={this.signIn} />
      </SignInWrapper>
    );
  }
}

export default SignIn;
