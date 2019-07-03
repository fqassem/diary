import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import BlogPost from "../../components/BlogPost";

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

const formatDate = timestamp => {
  return timestamp.toDate().toLocaleDateString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      error: null
    };

    this.postsRef = firebase.getCollection("posts");
  }

  componentDidMount() {
    this.postsRef
      .get()
      .then(querySnapshot => {
        const allPosts = querySnapshot.docs.map(doc => {
          return Object.assign({}, doc.data(), { id: doc.id });
        });
        this.setState({
          posts: allPosts
        });
      })
      .catch(error =>
        this.setState({
          error: error.toString()
        })
      );
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
                  datePublished={
                    post.timestamp ? formatDate(post.timestamp) : "..."
                  }
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
