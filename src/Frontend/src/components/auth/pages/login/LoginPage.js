import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import './LoginPage.css';

import useForm from '../../../../utils/useForm';
import AuthController from '../../../../controllers/auth/AuthController.ts';
import { AuthType } from '../../../../entities/enums/AuthType.ts';

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Translation hook


  const { formData, errors, response, handleChange, handleSubmit } = useForm(
    new AuthController(AuthType.Login)
  );



  return (
    <div className=''>
      <div className='login-buttons-container'>
      <button className='reg-reg-btn' onClick={()=>navigate('/auth/registration')}>{t('registration')}</button>
        <button className='reg-login-btn' onClick={()=>navigate('/auth/login')}>{t('login')}</button>
      </div>
      <div className='login-glogin-btn'>
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
      <div className='login-or-block'>
        <div></div>
        <span>{t('or')}</span>
        <div></div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className='login-fields-container'>
      {response && <p>LOGGED IN!<br></br>{response.username}<br></br>{response.id}</p>}
          <div className='fio-container'>
            <input type='text' name="email" value={formData.email} onChange={handleChange}  placeholder={t('email')}></input>
            {errors.email && <p>{t(errors.email)}</p>}
            {errors.authorization && <p>{t(errors.authorization)}</p>}
            <input type='password' name="password" value={formData.password} onChange={handleChange} placeholder={t('password')}></input>
            {errors.password && <p>{t(errors.password)}</p>}
          </div>
          <button type='submit'>Click</button>
      </div>
      </form>
    </div>
  );
};

export default LoginPage;