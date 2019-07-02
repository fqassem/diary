import React from "react";
import styled from "styled-components";
import BlogPost from "../components/BlogPost";

const BlogPostWrapper = styled.div``;

const BlogPostList = styled.ul`
  list-style-type: none;
  padding-left: 0;

  li {
    margin: 2rem;
  }
`;

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      error: null
    };
  }

  componentDidMount() {
    fetch("/posts/all")
      .then(response => response.json())
      .then(data => this.setState({ posts: data.posts }))
      .catch(error => this.setState({ error: "Failed to fetch posts" }));
  }

  render() {
    const { posts, error } = this.state;
    return (
      <BlogPostWrapper>
        <h2>Your Blog</h2>
        <BlogPostList>
          {error ? (
            <div>{error}</div>
          ) : (
            posts.map(post => (
              <li>
                <BlogPost
                  title={post.title}
                  content={post.content}
                  datePublished={post.datePublished}
                />
              </li>
            ))
          )}
        </BlogPostList>
      </BlogPostWrapper>
    );
  }
}
export default Blog;
