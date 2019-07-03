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
      error: null,
      loading: true
    };
  }

  async componentDidMount() {
    console.log('ALL POSTS');
    try {
      const allPosts = await firebase.getPostsForCurrentUser();

      if(allPosts) {
        this.setState({
          posts: allPosts
        });
      }
    } catch (e) {
      this.setState({
        error: e.toString()
      });
    } finally{
      this.setState({ loading: false })
    }
  }

  render() {
    const { posts, error, loading } = this.state;
    return (
      <BlogPostWrapper>
        <BlogPostTitle>My Diary</BlogPostTitle>
        {error && <div>{error}</div>}
        {loading ? (
          <div>Loading</div>
        ) : posts.length === 0 ? (
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
