import React, { useEffect, useState } from 'react';
import { Navbar, Routing } from '../widgets';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSignalRStore } from '../entities/index';
import { useAuthStore } from '../entities';

import { useTranslation } from 'react-i18next';
import { themes } from '../themes';

import './App.css';

import backgroundImage from '../background.svg';

const App: React.FC = () => {

  const { t, i18n } = useTranslation();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0); 
  const theme = themes[currentThemeIndex]; 

  const { establishConnection, closeConnection } = useSignalRStore();
  const { id, isLoggedIn } = useAuthStore();


  const cycleThemes = () => setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);


  useEffect(() => {
    if (isLoggedIn && id !== null && isLoggedIn === true) establishConnection(id);
    else if (isLoggedIn) closeConnection();
  }, [isLoggedIn, id]);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="auth-top-content">
          <button onClick={cycleThemes}>Next Theme</button>
          <button onClick={() => i18n.changeLanguage('ua')}>Ukranian</button>
        </div>
        <div
          style={{
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '100vh', 
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