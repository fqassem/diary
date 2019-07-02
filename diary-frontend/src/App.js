import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from './components/Menu';
import * as routes from './constants/routes';

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
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <SiteContainer>
        <Header>
          <Menu />
        </Header>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.BLOG} component={Blog} />
          <Route path={routes.CREATE} component={CreatePost} />
          <Route component={NotFound} />
        </Switch>
      </SiteContainer>
    </Router>
  );
};

export default App;
