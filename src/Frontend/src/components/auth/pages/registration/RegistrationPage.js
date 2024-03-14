import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import './RegistrationPage.css';
import useForm from '../../../../utils/useForm';
import { useNavigate } from "react-router-dom";
import AuthController from '../../../../controllers/auth/AuthController.ts';
import { AuthType } from '../../../../entities/enums/AuthType.ts';
const RegistrationPage = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { formData, errors, response, handleChange, handleSubmit } = useForm(
    //RegistrationValidator,
    new AuthController(AuthType.Registration)
  );

  return (
    <div className=''>
      <div className='reg-buttons-container'>
        <button className='reg-reg-btn' onClick={()=>navigate('/auth/registration')}>{t('registration')}</button>
        <button className='reg-login-btn' onClick={()=>navigate('/auth/login')}>{t('login')}</button>
      </div>
      <div className='reg-glogin-btn'>
        <GoogleOAuthProvider clientId="69695918227-9tscrt9n1lot1o8pjsd0st2qhsnsej5p.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      </div>
      <div className='reg-or-block'>
        <div></div>
        <span>{t('or')}</span>
        <div></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='reg-fields-container'>
          <div className='reg-fio-container'>
            <input type='text' name='username' value={formData.username || ''} onChange={handleChange} placeholder={t('name')} />
            {errors.username && <p>{t(errors.username)}</p>}
            <input type='text' name='surname' value={formData.surname || ''} onChange={handleChange} placeholder={t('surname')} />
            {errors.surname && <p>{t(errors.surname)}</p>}
          </div>
          <input type='text' name='email' value={formData.email || ''} onChange={handleChange} placeholder={t('email')} />
          {errors.email && <p>{t(errors.email)}</p>}
          <div className='reg-fio-container'>
            <input type='password' name='password' value={formData.password || ''} onChange={handleChange} placeholder={t('password')} />
            {errors.password && <p>{t(errors.password)}</p>}
            <input type='password' name='confirm_password' value={formData.confirm_password || ''} onChange={handleChange} placeholder={t('repeat-password')} />
            {errors.confirm_password && <p>{t(errors.confirm_password)}</p>}
          </div>
          <div className='reg-fio-container'>
            <button type='submit'>Click</button>
            <input type='checkbox' name='policyAgree' checked={formData.policyAgree || false} onChange={handleChange} />
            <span>{t('agree-with-policy')}</span>
            {errors.agreeToPolicy && <p>{t(errors.agreeToPolicy)}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
//      {response.message != '' && <p>{response.status}# {t(response.message)}</p>}