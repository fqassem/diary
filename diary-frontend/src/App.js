import React from "react";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import firebase from "./firebase";
import * as routes from "./constants/routes";
import { SignIn, SignUp, Home, Blog, CreatePost, NotFound } from "./pages";

import Menu from "./components/Menu";

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
        <Menu
            isSignedIn={isSignedIn}
            user={user}
            onSignOutClick={firebase.signOut}
          />
        <Container>
          {!isAuthReady &&
            <LoadingScreen />
          }
          {isAuthReady &&
            <>
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
            </>
          }
        </Container>
        <Footer />
      </Router>
    );
  }
}

export default App;
