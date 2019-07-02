import React from "react";
import styled from "styled-components";

const HomeWrapper = styled.div``;

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
          Here, you can create and read your previous diary entries to your 
          heart's content
        </FrontPageContent>
      </HomeWrapper>
    );
  }
}
export default Home;
