import React, { useEffect, useState } from 'react';
import { Navbar, Routing } from '../widgets';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSignalRStore, useThemeStore } from '../entities/index';
import { useAuthStore } from '../entities';

import { useTranslation } from 'react-i18next';
import { themes } from '../themes';

import './App.css';

import backgroundImage from '../background.svg';

const App: React.FC = () => {

  
  //const { establishConnection, closeConnection } = useSignalRStore();
  //const { id, isLoggedIn } = useAuthStore();
  
  const { getCurrentTheme  } = useThemeStore();
  const theme = getCurrentTheme() || themes[0];

  // useEffect(() => {
  //   if (isLoggedIn && id !== null && isLoggedIn === true) establishConnection(id);
  //   else if (isLoggedIn) closeConnection();
  // }, [isLoggedIn, id]);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center top 0px',
          }}
        >

          <Routing />
        </div>
      </ThemeProvider>
  );
}

export default App;
          //<Navbar />