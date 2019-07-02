import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, Blog, CreatePost, NotFound } from "./pages";

const Menu = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/blog">About</Link>
    </li>
    <li>
      <Link to="/create">Create Post</Link>
    </li>
  </ul>
);

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <Menu />
        </header>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/create" component={CreatePost} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
