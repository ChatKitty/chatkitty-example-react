import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';

import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  roundness: 2,
  colors: {
    primary: '#5b3a70',
    accent: '#50c878',
    background: '#f7f9fb',
  },
});
