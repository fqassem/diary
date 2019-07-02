import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import BlogPost from "../components/BlogPost";

const BlogPostWrapper = styled.div``;

const BlogPostTitle = styled.h2`
  text-align: center;
`;

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
        <BlogPostTitle>My Diary</BlogPostTitle>
        {error && <div>{error}</div>}
        {posts.length === 0 ? (
          <div>
            You have no posts! <Link to="/create">Write a Post</Link>
          </div>
        ) : (
          <BlogPostList>
            {/* // Index is fine as key since this list doesn't change except when remounted */}
            {posts.map((post, idx) => (
              <li key={idx}>
                <BlogPost
                  title={post.title}
                  content={post.content}
                  datePublished={post.datePublished}
                />
              </li>
            ))}
          </BlogPostList>
        )}
      </BlogPostWrapper>
    );
  }
}
export default Blog;
