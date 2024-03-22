import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { AuthHeaderForm } from "../../../../features";
import './AuthLayout.css';
import { useNavigate } from 'react-router-dom';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation(); // Call useTranslation hook
  const navigate = useNavigate();

  return (
    <div className='auth-page-container'>
      <AuthHeaderForm />
      <div className='auth-content-holder'>
        <div className='auth-title-holder'>
          <span className='auth-title-text'>MEWEE</span>
          <span className='auth-sub-title-text'>{t('title-description')}</span>
        </div>
        <div className='auth-content-container'>
          {children}
        </div>
      </div>
    </div>
  );
};
