import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import GlobalStyle from "./globalStyles";
import { Home, Blog, CreatePost, NotFound } from "./pages";

const SiteContainer = styled.div`
  display: grid;
  grid-gap: 1rem 4rem;
  padding: 1.5rem 1rem;
  margin: 0 auto;
  grid-template-columns: 1fr;

  max-width: 60em;
`;

const Header = styled.header`
  width: 100%;
  margin: 0 auto;
  text-align: right;

  ul {
    list-style-type: none;
    li {
      display: inline-block;
      margin: 1rem;
    }
  }
`;

const Menu = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/blog">Blog</Link>
    </li>
    <li>
      <Link to="/create">Create Post</Link>
    </li>
  </ul>
);

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <SiteContainer>
        <Header>
          <Menu />
        </Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/create" component={CreatePost} />
          <Route component={NotFound} />
        </Switch>
      </SiteContainer>
    </Router>
  );
};

export default App;
