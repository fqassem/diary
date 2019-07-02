import React from "react";
import styled from "styled-components";

const CreatePostWrapper = styled.div`
  margin: 0 auto;
  @media (min-width: 40em) {
    width: 60%;
  }
`;

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

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      titleError: false,

      content: "",
      contentError: false,

      formError: false,

      sent: false,
      sending: false,
      error: null
    };
  }

  validateForm = e => {
    e.preventDefault();

    const { title, content } = this.state;

    const titleError = title.trim().length <= 0;
    const contentError = content.trim().length <= 0;
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

  handleCaptchaResponseChange = recaptchaCode => {
    this.setState({
      recaptchaCode
    });
  };

  handleFormSubmit = async e => {
    const { title, content, formError } = this.state;

    if (!formError) {
      const formData = {
        title: title.trim(),
        content: content.trim()
      };

      this.setState({ formError: false, sending: true });

      try {
        const response = await fetch(`/posts/createPost`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          return this.props.history.push("/blog");
        } else {
          throw new Error("Could not create post");
        }
      } catch (error) {
        this.setState({ sent: false, sending: false, error: error.message });
      }
    }
  };

  render() {
    const { titleError, contentError } = this.state;
    return (
      <CreatePostWrapper>
        <h2>Create A Post</h2>
        <form action="#">
          {titleError && (
              <CreatePostError>Please enter a title</CreatePostError>
          )}
          <CreatePostLabel htmlFor="title">Title</CreatePostLabel>
          <CreatePostInput
            type="text"
            id="title"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />

          {contentError && (
            <CreatePostError>
              Please enter some content for the post
            </CreatePostError>
          )}
          <CreatePostLabel htmlFor="message">Content</CreatePostLabel>
          <CreatePostInput
            as="textarea"
            id="content"
            name="content"
            placeholder="Enter your content here"
            onChange={e => this.setState({ content: e.target.value })}
            value={this.state.content}
          />

          <div>
            <div>
              {this.state.error && (
                <CreatePostError>
                  An error occurred while creating your post. Please try again.
                </CreatePostError>
              )}
            </div>

            {this.state.formError && <CreatePostError>Please fix the form errors above.</CreatePostError>}
            <div>
              <input
                type="submit"
                onClick={e => this.validateForm(e)}
                value="Send"
                disabled={
                  this.state.sending || this.state.sent || this.formError
                }
              />
            </div>
          </div>
        </form>
      </CreatePostWrapper>
    );
  }
}

export default CreatePost;
