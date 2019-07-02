import React from "react";
import BlogPost from "../components/BlogPost";

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
      <ul>
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
      </ul>
    );
  }
}
export default Blog;
