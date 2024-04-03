import {
    CircularProgress,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import { useAuthStore, useErrors } from "../../../entities";
import { useFormik } from 'formik';
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

    const [showPassword, setShowPassword] = useState({password: false});

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
                    <div></div>
                    <span>{t('or')}</span>
                    <div></div>
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
                                        className={`"text-style-1 ${emailError ? 'input-error' : ''}`}
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
                                        className={`"text-style-1 password-input ${passwordError ? 'input-error' : ''}`}
                                    />
                                    <span
                                        className={`show-password-toggle ${showPassword.password ? 'password-icon-active' : 'password-icon-default'}`}
                                        onClick={() => togglePasswordVisibility('password')}/>
                                </label>
                                {formik.errors.password && <div className="error">{t(formik.errors.password)}</div>}
                            </div>
                        </div>
                    <button className="login-style" type="submit"><span className="text-style-2 authorize">{t('login')}</span></button>
                    <div className="link-container">
                        <Link href="/auth"><span className="text-style-1 link">{t('forgot_password')}?</span></Link>
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