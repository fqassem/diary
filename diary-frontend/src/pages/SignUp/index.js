import React from "react";
import styled from "styled-components";

import SignUpForm from "./SignUpForm";

const SignUpWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: 40em) {
    width: 60%;
  }
`;

const SignInTitle = styled.h2`
  text-align: center;
`;

class SignUp extends React.Component {
  render() {
    return (
      <SignUpWrapper>
        <SignInTitle>Sign Up</SignInTitle>
        <SignUpForm />
      </SignUpWrapper>
    );
  }
}

export default SignUp;
