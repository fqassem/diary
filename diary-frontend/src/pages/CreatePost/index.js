import React from "react";
import styled from "styled-components";
import CreatePostForm from "./CreatePostForm";

const CreatePostWrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 40em) {
    width: 60%;
  }
`;

const CreatePostTitle = styled.h2`
  text-align: center;
`;

class CreatePost extends React.Component {
  render() {
    return (
      <CreatePostWrapper>
        <CreatePostTitle>Create an Entry</CreatePostTitle>
        <CreatePostForm />
      </CreatePostWrapper>
    );
  }
}

export default CreatePost;
