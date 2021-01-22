/* eslint react/prop-types: 0 */
/* eslint react/jsx-props-no-spreading: 0 */
/* eslint react/jsx-curly-newline: 0 */

import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default GuardedRoute;
