import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import firebase from './firebase';
import GlobalStyle from "./globalStyles";
import * as routes from "./constants/routes";
import { SignIn, SignUp, Home, Blog, CreatePost, NotFound } from "./pages";

import Menu from "./components/Menu";

const SiteContainer = styled.div`
  display: grid;
  grid-gap: 1rem 4rem;
  padding: 1.5rem 1rem;
  margin: 0 auto;
  grid-template-columns: 1fr;

  max-width: 60em;
`;

const Header = styled.header``;

const AuthenticatedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.SIGN_IN,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    const { authUser } = this.state;

    return (
      <Router>
        <GlobalStyle />
        <SiteContainer>
          <Header>
            <Menu  authUser={authUser} />
          </Header>
          <Switch>
            <Route exact path={routes.HOME} component={Home} />
            <Route exact path={routes.SIGN_IN} component={SignIn} />
            <Route exact path={routes.SIGN_UP} component={SignUp} />
            <AuthenticatedRoute
              authUser={authUser}
              path={routes.BLOG}
              component={Blog}
            />
            <AuthenticatedRoute
              authUser={authUser}
              path={routes.CREATE}
              component={CreatePost}
            />
            <Route component={NotFound} />
          </Switch>
        </SiteContainer>
      </Router>
    );
  }
}

export default App;
