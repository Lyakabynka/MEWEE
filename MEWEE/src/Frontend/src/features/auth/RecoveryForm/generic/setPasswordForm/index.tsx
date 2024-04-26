import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useErrors, useRecoveryStore, useThemeStore } from '../../../../../entities';
import { CircularProgress } from '@mui/material';
import { SET_NEW_PASSWORD_SCHEMA } from '../../../../../shared/exportSharedMorules';

export const RecoverySetPasswordForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const {t} = useTranslation();
  const { setNewPassword, isLoading } = useRecoveryStore();
  const [errors, setErrors, setAutoClearErrors] = useErrors();
  const { currentTheme } = useThemeStore();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false
});

const togglePasswordVisibility = (fieldName: keyof typeof showPassword) => {
    setShowPassword(prevState => ({
        ...prevState,
        [fieldName]: !prevState[fieldName]
    }));
};

const [isHoverButton, setIsHoverButton] = useState(false);
const [isActiveButton, setIsActiveButton] = useState(false);

const buttonStyle = {
    backgroundColor: isActiveButton
        ? currentTheme?.authPages.commonElements.buttonActiveBackground
        : (isHoverButton && !isActiveButton)
            ? currentTheme?.authPages.commonElements.buttonHoverBackground
            : currentTheme?.authPages.commonElements.buttonBackground,
    color: isActiveButton
        ? currentTheme?.authPages.commonElements.buttonActiveColor
        : (isHoverButton && !isActiveButton)
            ? currentTheme?.authPages.commonElements.buttonHoverColor
            : currentTheme?.authPages.commonElements.buttonColor,
};
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validationSchema: SET_NEW_PASSWORD_SCHEMA,
    onSubmit:() =>  {  setNewPassword(onVerificationSentResponse, { password: formik.values.password }); } }
  );
  const onVerificationSentResponse = (errors: string[]) =>
    {
        setAutoClearErrors(errors);

        if (errors.length == 0)
        {
            onNext();
        }
    }
const passwordError = formik.touched.password && formik.errors.password;
const confirmPasswordError = formik.touched.confirm_password && formik.errors.confirm_password;
  return (
    <div className="">
        <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
                    <div className="input-container">
                        <label className={`label-style ${passwordError ? 'label-error' : ''}`}>
                            <input
                                type={showPassword.password ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder={t('password') + '*'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`text-style-1 input-short input-registration password-input ${passwordError ? 'input-error' : ''}`}
                                style={{ backgroundColor: currentTheme?.authPages.commonElements.inputBackground }}
                            />
                            <span
                                className={`show-password-toggle ${showPassword.password ? 'password-icon-active' : 'password-icon-default'}`}
                                onClick={() => togglePasswordVisibility('password')} />
                        </label>
                        {formik.touched.password && formik.errors.password &&
                            <div className="error">{t(formik.errors.password)}</div>}
                    </div>
                    <div className="input-container">
                        <label className={`label-style ${confirmPasswordError ? 'label-error' : ''}`}>
                            <input
                                type={showPassword.confirm_password ? 'text' : 'password'}
                                id="confirm_password"
                                name="confirm_password"
                                placeholder={t('confirm_password') + '*'}
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`text-style-1 input-short input-registration password-input ${confirmPasswordError ? 'input-error' : ''}`}
                                style={{ backgroundColor: currentTheme?.authPages.commonElements.inputBackground }}
                            />
                            <span
                                className={`show-password-toggle ${showPassword.confirm_password ? 'password-icon-active' : 'password-icon-default'}`}
                                onClick={() => togglePasswordVisibility('confirm_password')} />
                        </label>
                        {formik.touched.confirm_password && formik.errors.confirm_password &&
                            <div className="error">{t(formik.errors.confirm_password)}</div>}
                    </div>
                </div>
          
          <div className="input-group">
          <button className="registration-style text-style-2" type="submit"
                        style={buttonStyle}
                        onMouseEnter={() => setIsHoverButton(true)}
                        onMouseLeave={() => {
                            setIsHoverButton(false);
                            setIsActiveButton(false);
                        }}
                        onMouseDown={() => setIsActiveButton(true)}
                        onMouseUp={() => setIsActiveButton(false)}>{t('send')}
                    </button>
                    {isLoading && <CircularProgress></CircularProgress>}
          </div>
        </form>
        
        {(errors && errors.length > 0) && errors.map((error, index) => (
            <span key={index} className="error">{t(error)}</span>
        ))}

    </div>
  );
};