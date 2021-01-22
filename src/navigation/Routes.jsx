import { Loader } from '@chatscope/chat-ui-kit-react';
import React, { useContext, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import kitty from '../chatkitty';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

import { AuthContext } from './AuthProvider';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(
    () =>
      kitty.onCurrentUserChanged((currentUser) => {
        setUser(currentUser);

        if (initializing) {
          setInitializing(false);
        }

        setLoading(false);
      }),
    [initializing, setUser]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (user ? <HomeScreen /> : <LoginScreen />)}
        />
      </Switch>
    </Router>
  );
}
