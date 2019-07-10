import React from "react";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import firebase from "../../firebase";
import BlogPost from "../../components/BlogPost";

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
    try {
      const allPosts = await firebase.getPostsForCurrentUser();
      console.log(allPosts);

      if(allPosts) {
        this.setState({
          posts: allPosts
        });
      }
    } catch (e) {
      this.setState({
        error: e.toString()
      });
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { posts, error, loading } = this.state;
    return (
      <Grid>
        <Typography component="h1" variant="h3">My Diary</Typography>
        {error && <div>{error}</div>}
        {loading ? (
          <div>Loading</div>
        ) : posts.length === 0 ? (
          <div>
            You have no posts! <Link to="/create">Write a Post</Link>
          </div>
        ) : (
          <List>
            {/* // Index is fine as key since this list doesn't change except when remounted */}
            {posts.map((post, idx) => (
              <ListItem key={idx}>
                <BlogPost
                  title={post.title}
                  content={post.content}F
                  datePublished={
                    post.timestamp ? formatDate(post.timestamp) : "..."
                  }
                />
              <Divider variant="inset" component="li" />
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    );
  }
}
export default Blog;
