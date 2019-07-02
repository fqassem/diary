import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { SIGN_UP } from "../../constants/routes";
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
  render() {
    return (
      <SignInWrapper>
        <SignInTitle>Sign In</SignInTitle>
        <div>
          Don't have an account? <Link to={SIGN_UP}>Create one!</Link>
        </div>
        <SignInForm />
      </SignInWrapper>
    );
  }
}

export default SignIn;
