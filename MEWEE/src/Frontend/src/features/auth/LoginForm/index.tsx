import {
    CircularProgress,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useAuthStore, useErrors, useThemeStore} from "../../../entities";
import { useFormik } from 'formik'; // Import Formik library
import * as Yup from 'yup'; // Import Yup for validation
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import './index.css'
import { useTranslation } from "react-i18next";
import { LOGIN_SCHEMA } from "../../../shared";

export function LoginForm() {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const [errors, setErrors, setAutoClearErrors] = useErrors();
    const { login, isLoading } = useAuthStore();
    const { currentTheme } = useThemeStore();

    const [showPassword, setShowPassword] = useState({password: false});

    const [isHoverButton, setIsHoverButton] = useState(false);
    const [isActiveButton, setIsActiveButton] = useState(false);
    const [isHoverLink, setIsHoverLink] = useState(false);
    const [isActiveLink, setIsActiveLink] = useState(false);

    const buttonStyle = {
        backgroundColor: isActiveButton
            ? currentTheme?.authPages.loginPage.buttonActiveBackground
            : (isHoverButton && !isActiveButton)
                ? currentTheme?.authPages.loginPage.buttonHoverBackground
                : currentTheme?.authPages.loginPage.buttonBackground,
        color: isActiveButton
            ? currentTheme?.authPages.loginPage.buttonActiveColor
            : (isHoverButton && !isActiveButton)
                ? currentTheme?.authPages.loginPage.buttonHoverColor
                : currentTheme?.authPages.loginPage.buttonColor,
    };
    const linkStyle = {
        color: isActiveLink
            ? currentTheme?.authPages.loginPage.linkActiveColor
            : (isHoverLink && !isActiveLink)
                ? currentTheme?.authPages.loginPage.linkHoverColor
                : currentTheme?.authPages.loginPage.linkColor,
    };
    const inputStyle = {
        backgroundColor: currentTheme?.authPages.loginPage.inputBackground,
    };

    const togglePasswordVisibility = (fieldName: keyof typeof showPassword) => {
        setShowPassword(prevState => ({
            ...prevState,
            [fieldName]: !prevState[fieldName]
        }));
    };

    const formik = useFormik({

        initialValues: { email: '', password: '', },
        validationSchema: LOGIN_SCHEMA,
        validateOnChange: true, 
        validateOnBlur: true, 
        
        onSubmit: () => { login(onResponse, { email: formik.values.email, password: formik.values.password }); },
    });
  
    const onResponse = (errors: string[]) =>
    {
        setAutoClearErrors(errors);
  
        console.log(errors);
        if (errors.length == 0)
            navigate('/profile');
    }

    const emailError = formik.errors.email;
    const passwordError = formik.errors.password

    return (
        <div>
                        <div className="form-container">


            <div className='login-or-block'>
                    <div style={{borderColor: currentTheme?.authPages.loginPage.lineColor}}></div>
                    <span style={{color: currentTheme?.authPages.loginPage.lineColorText}}>{t('or')}</span>
                    <div style={{borderColor: currentTheme?.authPages.loginPage.lineColor}}></div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                        <div className="input-container">
                            <label className={`label-style ${emailError ? 'label-error' : ''}`}>
                                <input
                                    required
                                    autoComplete="email"
                                    name="email"
                                    id="email"
                                    placeholder={t('email') + '*'}
                                    autoFocus
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className={`"text-style-1 input-login ${emailError ? 'input-error' : ''}`}
                                    style={inputStyle}
                                />
                            </label>
                            {formik.errors.email && <div className="error">{t(formik.errors.email)}</div>}
                        </div>
                        <div className="input-container">
                            <label className={`label-style ${passwordError ? 'label-error' : ''}`}>
                                <input
                                    required
                                    name="password"
                                    placeholder={t('password') + '*'}
                                    type={showPassword.password ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={`"text-style-1 input-login password-input ${passwordError ? 'input-error' : ''}`}
                                    style={inputStyle}
                                />
                                <span
                                    className={`show-password-toggle ${showPassword.password ? 'password-icon-active' : 'password-icon-default'}`}
                                    onClick={() => togglePasswordVisibility('password')}/>
                            </label>
                            {formik.errors.password && <div className="error">{t(formik.errors.password)}</div>}
                        </div>
                    </div>
                    <button className="login-style text-style-2" type="submit"
                            style={buttonStyle}
                            onMouseEnter={() => setIsHoverButton(true)}
                            onMouseLeave={() => {
                                setIsHoverButton(false);
                                setIsActiveButton(false);
                            }}
                            onMouseDown={() => setIsActiveButton(true)}
                            onMouseUp={() => setIsActiveButton(false)}>{t('login')}
                    </button>
                    <div className="link-container">
                        <Link href="/recovery/email">
                            <span className="text-style-1 link"
                                  style={linkStyle}
                                  onMouseEnter={() => setIsHoverLink(true)}
                                  onMouseLeave={() => {
                                      setIsHoverLink(false);
                                      setIsActiveLink(false);
                                  }}
                                  onMouseDown={() => setIsActiveLink(true)}
                                  onMouseUp={() => setIsActiveLink(false)}>
                                {t('forgot_password')}?</span></Link>
                    </div>
                    {(errors && errors.length > 0) && errors.map((error, index) => (
                        <span key={index} className="error">{t(error)}</span>
                    ))}
                    {isLoading && <CircularProgress></CircularProgress>}
                </form>
            </div>
        </div>
    );
}