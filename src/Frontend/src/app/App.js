import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import AuthLayout from '../components/auth/AuthLayout';
import { ThemeProvider, createGlobalStyle } from 'styled-components'; 
import { lightTheme, darkTheme } from '../themes'; // Import the theme objects
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: Arial, sans-serif;
  }
  .auth-sub-title-text
  {
    color: ${(props) => props.theme.colors.text};
  }
  input[type="text"], input[type="password"]
  {
    background-color:${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

`;

const App = () => {

  const { t, i18n } = useTranslation(); // Translation hook
  const [currentTheme, setCurrentTheme] = useState('light'); // State to track current theme

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light'); // Toggle between light and dark themes
  };

  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div className='auth-top-content'>
            <button onClick={toggleTheme}>{t('toggleTheme')}</button>
            <button onClick={() => i18n.changeLanguage('ua')}>UA</button>
        </div>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout />} />
          {/* Add more routes for other parts of your application */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
