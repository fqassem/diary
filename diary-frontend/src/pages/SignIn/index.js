import React from "react";
import styled from "styled-components";
import SignInForm from "./SignInForm";

const SignInWrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 40em) {
    width: 60%;
  }
`;

const SignInTitle = styled.h2`
  text-align: center;
`;

class SignIn extends React.Component {
  render() {
    return (
      <SignInWrapper>
        <SignInTitle>Sign In</SignInTitle>
        <SignInForm />
      </SignInWrapper>
    );
  }
}

export default SignIn;
