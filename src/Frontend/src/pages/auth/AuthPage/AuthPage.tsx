import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { AuthHeaderForm } from "../../../features";
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        <div className="buttons-container">
            <div onClick={() => navigate("/auth/login")} className="button-c">
                <a >{t('login')}</a>
            </div>
            <div onClick={() => navigate("/auth/register")} className="button-c">
                <a>{t('registration')}</a>
            </div>
        </div>
          {children}
        </div>
      </div>
    </div>
  );
};