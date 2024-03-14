import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components'; 
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import Header from './header/Header';
import LoginPage from './pages/login/LoginPage';
import './AuthLayout.css'
import RegistrationPage from './pages/registration/RegistrationPage';

const AuthLayout = () => {
  const location = useLocation();

  const { t } = useTranslation(); // Translation hook

  // Determine which component to render based on the current pathname
  let content = null;
  switch (location.pathname) {
    case '/auth/registration':
      content = <RegistrationPage />;
      break;
      case '/auth/login':
        content = <LoginPage />;
        break;
    // Add more cases for other routes as needed
    default:
      // Handle cases where the route doesn't match any known paths
      content = null;
  }

  return (
    <div>
        <div className='auth-main-container'>
            <Header />
            <div className='auth-content-holder'>
                <div className='auth-title-holder'>
                    <span className='auth-title-text'>MEWEE</span>
                    <span className='auth-sub-title-text'>{t('title-description')}</span>
                </div>
                <div className='auth-content-container'>
                    { content }
                </div>
            </div>
        </div>
      
    </div>
  );
};

export default AuthLayout;
