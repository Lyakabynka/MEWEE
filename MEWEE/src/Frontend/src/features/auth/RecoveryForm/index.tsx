import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useErrors, useRecoveryStore, useThemeStore } from '../../../entities';
import { CircularProgress } from '@mui/material';
import { EMAIL_VALIDATION } from '../../../shared/exportSharedMorules';
import styles from "./recovery_form.module.scss";

export const RecoveryEmailForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const {t} = useTranslation();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const {currentTheme} = useThemeStore();
  const { confirmEmail, isLoading } = useRecoveryStore();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: EMAIL_VALIDATION,
    onSubmit: () => { confirmEmail(onResponse, { email: formik.values.email }); },
  });

    const onResponse = (errors: string[]) =>
    {
        console.log("e:",errors);
        setAutoClearErrors(errors);

        if (errors.length == 0)
            onNext();
    }

    const emailError = formik.errors.email;
    return (
        <div className={styles.div}>
            <form onSubmit={formik.handleSubmit}>
                <header>{t('password_change')}</header>
                <main>
                    <div className={styles.main_div}>
                        <label className={`${emailError ? styles.label_error : ''}`}>
                            <input
                                required
                                autoComplete="email"
                                name="email"
                                id="email"
                                placeholder={t('email') + '*'}
                                autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className={`${emailError ? styles.input_error : ''}`}
                            />
                        </label>
                        {formik.errors.email && <div className={styles.error}>{t(formik.errors.email)}</div>}
                    </div>
                </main>
                <footer>
                    <button type="submit">{t('send') + " " + t('code')}</button>
                    <button>{t('go_back')}</button>
                </footer>
                {(errors && errors.length > 0) && errors.map((error, index) => (
                  <span key={index} className={styles.error}>{t(error)}</span>
                ))}
                {isLoading && <CircularProgress></CircularProgress>}
            </form>

        </div>
    );
};