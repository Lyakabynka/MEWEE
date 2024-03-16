import {
    CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuthStore } from "../../../entities";
import { useFormik } from 'formik'; // Import Formik library
import * as Yup from 'yup'; // Import Yup for validation
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import './index.css'
import { useTranslation } from "react-i18next";

export function LoginForm() {

    const {t} = useTranslation();
    const { login, resetErrorInfo, isLoading, errorMessage } = useAuthStore();
    const navigate = useNavigate();

    const LOGIN_SCHEMA = Yup.object().shape({
        email: Yup.string().min(3, 'error_email_too_short').max(99, 'error_email_too_long').required('error_email_required'),
        password: Yup.string().min(4, 'error_short_password').max(30, 'error_long_password').required('error_password_required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LOGIN_SCHEMA,
        validateOnChange: true, // Disable validation on change
        validateOnBlur: true, // Enable validation on blur
        
        onSubmit: (values) => {
            console.log(values);
        }
    });
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login({ email: formik.values.email, password: formik.values.password }).then();

        if (errorMessage?.length == 0)
            navigate('/profile');
    };

    useEffect(() => {
        //formik.validateForm();
        resetErrorInfo();
    }, []);

    return (
        <div>
            <div className="login-form-container">

                <div className='login-or-block'>
        <div></div>
        <span>{t('or')}</span>
        <div></div>
      </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            required
                            autoComplete="email"
                            name="email"
                            id="email"
                            placeholder={t('email') + '*'}
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && <span className="error">{t(formik.errors.email)}</span>}
                        <input
                            required
                            name="password"
                            placeholder={t('password') + '*'}
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && <span className="error">{t(formik.errors.password)}</span>}
                    </div>
                    <button type="submit">{t('login')}</button>
                    <div className="link-container">
                        <Link href="/auth">{t('forgot_password')}?</Link>
                    </div>
                    {errorMessage && <span className="error">{t(errorMessage)}</span>}
                    {isLoading && <div className="loading-container"><CircularProgress /></div>}
                </form>
            </div>
        </div>
    );
}
{/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
<LockOutlinedIcon />
</Avatar> */}