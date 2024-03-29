import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

import kitty from '../chatkitty';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        failed,
        setFailed,
        login: async (nickname) => {
          setLoading(true);

          const result = await kitty.startSession({
            username: nickname,
          });

          setLoading(false);

          if (result.failed) {
            setFailed(true);
          }
        },
        logout: async () => {
          await kitty.endSession();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
