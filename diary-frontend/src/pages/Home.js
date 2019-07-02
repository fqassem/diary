import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeWrapper = styled.div`
`;

const Header = styled.h2`
  text-align: center;
`;

const FrontPageContent = styled.p`
  text-align: center;
`;

class Home extends React.Component {
  render() {
    return (
      <HomeWrapper>
        <Header>Welcome to Your Diary</Header>
        <FrontPageContent>
          Here, you can <Link to="/create">create</Link> and{' '}
          <Link to="/blog">read your previous diary entries</Link> to your
          heart's content
        </FrontPageContent>
      </HomeWrapper>
    );
  }
}
export default Home;
