import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useErrors, useRecoveryStore, useThemeStore } from '../../../../../../entities';
import { CircularProgress } from '@mui/material';
import { CodeItem } from '../../../components/codeitem';
import styles from "./confirmation_form.module.scss";

export const RecoveryEmailConfirmationForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const {t} = useTranslation();
  const { verificateCode, isLoading } = useRecoveryStore();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const [otp, setOtp] = useState(new Array(8).fill(''));

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit:()=>  {  verificateCode(onVerificationSentResponse, { code: otp.join("") }); } }
  );
  const onVerificationSentResponse = (errors: string[]) =>
    {
        setAutoClearErrors(errors);

        if (errors.length == 0)
        {
            onNext();
        }
    }
  const codeError = formik.errors.code;
    return (
        <div className={styles.div}>
            <form onSubmit={formik.handleSubmit}>
                <header>{t('confirm_email')}</header>
                <main>
                    <CodeItem otp={otp} setOtp={setOtp}/>
                    {formik.errors.code && <div className={styles.error}>{t(formik.errors.code)}</div>}
                </main>
                <footer>
                    <button type="submit">{t('verify') + " " + t('code')}</button>
                    <button>{t('go_back')}</button>
                </footer>
                {isLoading && <CircularProgress></CircularProgress>}
            </form>

            {(errors && errors.length > 0) && errors.map((error, index) => (
                <span key={index} className={styles.error}>{t(error)}</span>
            ))}
        </div>
    );
};