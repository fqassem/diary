import React from "react";
import styled from "styled-components";
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoadingScreen from './components/LoadingScreen';
import firebase from "./firebase";
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

const AuthenticatedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user !== null ? (
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

const RedirectIfAuthed = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Redirect
          to={{
            pathname: routes.BLOG,
            state: { from: props.location }
          }}
        />
      ) : (
          <Component {...props} />
        )
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isAuthReady: false,
      isSignedIn: false
    };
  }

  componentDidMount() {
    this.removeAuthObserver = firebase.auth.onAuthStateChanged(user => {
      this.setState({
        isAuthReady: true,
        isSignedIn: !!user,
        user
      });
    });
  }

  componentWillUnmount() {
    this.removeAuthObserver();
  }

  render() {
    const { user, isSignedIn, isAuthReady } = this.state;

    return (
      <Router>
        <CssBaseline />
        <SiteContainer>
          <Header>
            <Menu title={"Diary"} 
             isSignedIn={isSignedIn} 
             user={user}
             onSignOutClick={firebase.signOut} 
            />
          </Header>
          {!isAuthReady &&
      <LoadingScreen  />
    }
    {isAuthReady &&
          <Switch>
            <RedirectIfAuthed
              exact
              user={user}
              path={routes.HOME}
              component={Home}
            />
            <RedirectIfAuthed
              exact
              user={user}
              path={routes.SIGN_IN}
              component={SignIn}
            />
            <RedirectIfAuthed
              exact
              user={user}
              path={routes.SIGN_UP}
              component={SignUp}
            />
            <AuthenticatedRoute
              user={user}
              path={routes.BLOG}
              component={Blog}
            />
            <AuthenticatedRoute
              user={user}
              path={routes.CREATE}
              component={CreatePost}
            />
            <Route component={NotFound} />
          </Switch>
    }
        </SiteContainer>
      </Router>
    );
  }
}

export default App;
