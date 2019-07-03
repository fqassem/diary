import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import RichTextEditor from "react-rte";
import firebase from '../../firebase';

const CreatePostLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CreatePostError = styled.p`
  color: red;
  margin: 1rem 0;
`;

const CreatePostInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;

  @media (min-width: 40em) {
    min-width: 250px;
    max-width: 600px;
  }
`;

const StyledTextEditor = styled(RichTextEditor)`
  margin-bottom: 2rem;

  .DraftEditor-root {
    min-height: 110px;
  }
`;

const SubmitButton = styled.input`
  padding: 1rem;
  border: 1px solid black;
`;

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      titleError: false,

      content: RichTextEditor.createEmptyValue(),
      contentError: false,

      formError: false,

      sent: false,
      sending: false,
      error: null
    };

    this.blogPostRef = firebase.getCollection("posts");
  }

  validateForm = e => {
    e.preventDefault();

    const { title, content } = this.state;

    const titleError = title.trim().length <= 0;
    const contentError = !content
      .getEditorState()
      .getCurrentContent()
      .hasText();
    const formError = titleError || contentError;

    this.setState(
      {
        titleError,
        contentError,
        formError
      },
      e => this.handleFormSubmit(e)
    );
  };

  handleFormSubmit = async e => {
    const { title, content, formError } = this.state;

    if (!formError) {
      this.setState({ formError: false, sending: true });

      try {
        await this.blogPostRef.add({
          title,
          content: content.toString("html"),
          datePublished: firebase.getServerTimestamp()
        });
        this.setState({ sending: false });
        return this.props.history.push("/blog");
      } catch (error) {
        this.setState({ sent: false, sending: false, error: error.message });
      }
    }
  };

  render() {
    const { titleError, contentError } = this.state;
    return (
      <form action="#">
        {titleError && <CreatePostError>Please enter a title</CreatePostError>}
        <CreatePostLabel htmlFor="title">Title</CreatePostLabel>
        <CreatePostInput
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />

        {contentError && (
          <CreatePostError>
            Please enter some content for the post
          </CreatePostError>
        )}
        <CreatePostLabel htmlFor="message">Content</CreatePostLabel>
        <StyledTextEditor
          id="content"
          name="content"
          value={this.state.content}
          onChange={value => this.setState({ content: value })}
        />

        <div>
          <div>
            {this.state.error && (
              <CreatePostError>
                An error occurred while creating your post. Please try again.
              </CreatePostError>
            )}
          </div>

          {this.state.formError && (
            <CreatePostError>Please fix the form errors above.</CreatePostError>
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

export { CreatePostForm };
export default withRouter(CreatePostForm);
